export const prerender = false;
import type { APIRoute } from 'astro';
import { db, enquiries } from '../../../../db';
import { eq } from 'drizzle-orm';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { leadId, status, adminNotes, followUpDate } = body;

    if (!leadId) {
      return new Response(JSON.stringify({ error: 'Missing leadId' }), { status: 400 });
    }

    const now = new Date().toISOString();

    await db
      .update(enquiries)
      .set({
        status: status || 'new',
        adminNotes: adminNotes ?? null,
        followUpDate: followUpDate ?? null,
        updatedAt: now,
      })
      .where(eq(enquiries.id, leadId));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
