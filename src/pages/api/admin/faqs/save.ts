export const prerender = false;
import type { APIRoute } from 'astro';
import { db, faqs } from '../../../../db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { category, question, answer } = body;

    const id = `faq_${Date.now()}`;

    await db.insert(faqs).values({
      id,
      category: category || 'General',
      question,
      answer,
      order: 0,
      isPublished: 1,
    });

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
