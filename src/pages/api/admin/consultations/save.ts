export const prerender = false;
import type { APIRoute } from 'astro';
import { db, consultations } from '../../../../db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { leadId, leadName, dateTime, mode, notes } = body;

    const id = `cons_${Date.now()}`;
    const now = new Date().toISOString();

    await db.insert(consultations).values({
      id,
      leadId: leadId || 'direct',
      leadName: leadName || 'Direct Consultation',
      dateTime: dateTime || now,
      mode: mode || 'WhatsApp Call',
      notes: notes || null,
      outcome: null,
      status: 'scheduled',
      createdAt: now,
    });

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
