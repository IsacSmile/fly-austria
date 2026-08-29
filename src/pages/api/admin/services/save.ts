export const prerender = false;
import type { APIRoute } from 'astro';
import { db, services } from '../../../../db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { title, description, highlights, icon } = body;

    const id = `srv_${Date.now()}`;
    const now = new Date().toISOString();

    await db.insert(services).values({
      id,
      title,
      description,
      highlights: highlights || '[]',
      icon: icon || '🏛️',
      displayOrder: 0,
      isActive: 1,
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
