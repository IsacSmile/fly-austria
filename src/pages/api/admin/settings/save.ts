export const prerender = false;
import type { APIRoute } from 'astro';
import { db, settings } from '../../../../db';
import { eq } from 'drizzle-orm';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const now = new Date().toISOString();

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        const id = `set_${key}`;
        try {
          await db.insert(settings).values({ id, key, value, updatedAt: now });
        } catch (e) {
          await db.update(settings).set({ value, updatedAt: now }).where(eq(settings.key, key));
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
};
