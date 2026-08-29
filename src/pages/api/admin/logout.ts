export const prerender = false;
import type { APIRoute } from 'astro';
import { COOKIE_NAME } from '../../../lib/adminAuth';

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete(COOKIE_NAME, { path: '/' });
  return new Response(JSON.stringify({ success: true, message: 'Logged out successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
