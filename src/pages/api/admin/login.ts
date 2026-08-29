export const prerender = false;
import type { APIRoute } from 'astro';
import { db, admins } from '../../../db';
import { eq } from 'drizzle-orm';
import { hashPassword, generateSessionToken, COOKIE_NAME, cookieOptions } from '../../../lib/adminAuth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    let email = '';
    let password = '';

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await request.json();
      email = json.email || '';
      password = json.password || '';
    } else {
      try {
        const formData = await request.formData();
        email = formData.get('email')?.toString() || '';
        password = formData.get('password')?.toString() || '';
      } catch (e) {
        // Fallback text parsing if formData parsing fails
        const text = await request.text();
        const params = new URLSearchParams(text);
        email = params.get('email') || '';
        password = params.get('password') || '';
      }
    }

    if (!email || !password) {
      return redirect('/admin/login?error=missing_credentials', 303);
    }

    const envAdminEmail = process.env.ADMIN_EMAIL || 'admin@flyaustria.in';
    const envAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    let isAuthenticated = false;

    // 1. Check DB
    try {
      const inputHash = hashPassword(password);
      const dbAdminList = await db.select().from(admins).where(eq(admins.email, email.toLowerCase())).limit(1);
      if (dbAdminList.length > 0 && dbAdminList[0].passwordHash === inputHash) {
        isAuthenticated = true;
      }
    } catch (dbErr) {
      console.warn('DB admin lookup fallback:', dbErr);
    }

    // 2. Fallback check against env credentials
    if (!isAuthenticated) {
      if (email.toLowerCase() === envAdminEmail.toLowerCase() && password === envAdminPassword) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return redirect('/admin/login?error=invalid_credentials', 303);
    }

    // Set secure admin session cookie
    const token = generateSessionToken(email.toLowerCase());
    cookies.set(COOKIE_NAME, token, cookieOptions);

    if (contentType.includes('application/json')) {
      return new Response(JSON.stringify({ success: true, redirect: '/admin' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return redirect('/admin', 303);
  } catch (error) {
    console.error('Error during admin login:', error);
    return redirect('/admin/login?error=server_error', 303);
  }
};
