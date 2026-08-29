export const prerender = false;
import type { APIRoute } from 'astro';
import { db, blogPosts } from '../../../../db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, coverImage, author, status } = body;

    const id = `blog_${Date.now()}`;
    const now = new Date().toISOString();

    await db.insert(blogPosts).values({
      id,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt,
      content,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
      author: author || 'FlyAustria Admissions Team',
      status: status || 'published',
      publishedAt: now.split('T')[0],
      tags: 'Austria, Study Abroad, Visa',
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
