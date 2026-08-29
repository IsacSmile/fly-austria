export const prerender = false;
import type { APIRoute } from 'astro';
import { db, leads } from '../../db';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();

    const name = formData.get('name')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const highestQualification = formData.get('highestQualification')?.toString() || '';
    const targetDegree = formData.get('targetDegree')?.toString() || '';
    const preferredIntake = formData.get('preferredIntake')?.toString() || '';
    const message = formData.get('message')?.toString() || '';

    if (!name || !phone || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const leadId = `lead-${Date.now()}`;

    // Store lead submission in database
    await db.insert(leads).values({
      id: leadId,
      name,
      phone,
      email,
      highestQualification,
      targetDegree,
      preferredIntake,
      message,
    });

    // Redirect to contact page with success state for progressive enhancement
    return redirect('/contact?submitted=true', 303);
  } catch (error) {
    console.error('Error handling lead contact submission:', error);
    return redirect('/contact?error=true', 303);
  }
};
