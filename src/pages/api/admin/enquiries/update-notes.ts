import type { APIRoute } from 'astro';
import { db, enquiries } from '../../../../db';
import { eq } from 'drizzle-orm';
import { verifySessionToken, COOKIE_NAME } from '../../../../lib/adminAuth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const token = cookies.get(COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { id, adminNotes } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing enquiry id' }), { status: 400 });
    }

    const now = new Date().toISOString();
    await db
      .update(enquiries)
      .set({
        adminNotes: adminNotes || null,
        updatedAt: now,
      })
      .where(eq(enquiries.id, id));

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Admin notes saved successfully.',
        updatedAt: now,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating admin notes:', error);
    return new Response(JSON.stringify({ error: 'Failed to update admin notes' }), { status: 500 });
  }
};
