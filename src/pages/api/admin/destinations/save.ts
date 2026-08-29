export const prerender = false;
import type { APIRoute } from 'astro';
import { db, universities } from '../../../../db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, germanName, city, tuitionFee, ranking, popularCourses, imageUrl, description, websiteUrl } = body;

    const id = `univ_${Date.now()}`;

    await db.insert(universities).values({
      id,
      name,
      germanName: germanName || name,
      city: city || 'Vienna',
      tuitionFee: tuitionFee || '€726.72 / sem',
      ranking: ranking || 'QS Top 200',
      popularCourses: popularCourses || 'M.Sc Computer Science',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
      websiteUrl: websiteUrl || 'https://univie.ac.at',
      description: description || 'Public University in Austria',
      isFeatured: 1,
      displayOrder: 0,
    });

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
