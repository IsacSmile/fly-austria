export const prerender = false;
import type { APIRoute } from 'astro';
import { db, enquiries } from '../../db';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    let body: Record<string, any> = {};
    const contentType = (request.headers.get('content-type') || '').toLowerCase();
    const isJsonRequest = contentType.includes('application/json') || request.headers.get('accept')?.includes('application/json');

    if (contentType.includes('application/json')) {
      try {
        body = await request.json();
      } catch (e) {}
    } else {
      // Handles multipart/form-data & application/x-www-form-urlencoded
      try {
        const formData = await request.formData();
        body = {
          fullName: formData.get('fullName')?.toString() || formData.get('name')?.toString() || '',
          whatsappNumber: formData.get('whatsappNumber')?.toString() || formData.get('phone')?.toString() || '',
          email: formData.get('email')?.toString() || '',
          highestQualification: formData.get('highestQualification')?.toString() || '',
          targetDegree: formData.get('targetDegree')?.toString() || '',
          preferredIntake: formData.get('preferredIntake')?.toString() || '',
          additionalNotes: formData.get('additionalNotes')?.toString() || formData.get('message')?.toString() || '',
          source: formData.get('source')?.toString() || 'hero_form',
        };
      } catch (e) {
        try {
          const text = await request.text();
          if (text) {
            try {
              body = JSON.parse(text);
            } catch (e2) {
              const params = new URLSearchParams(text);
              body = Object.fromEntries(params.entries());
            }
          }
        } catch (e3) {}
      }
    }

    const fullName = body.fullName || body.name || '';
    const whatsappNumber = body.whatsappNumber || body.phone || '';
    const email = body.email || null;
    const highestQualification = body.highestQualification || null;
    const targetDegree = body.targetDegree || null;
    const preferredIntake = body.preferredIntake || null;
    const additionalNotes = body.additionalNotes || body.message || null;
    const source = body.source || 'hero_form';

    if (!whatsappNumber || (!fullName && source !== 'modal')) {
      if (isJsonRequest) {
        return new Response(JSON.stringify({ error: 'WhatsApp number and name are required.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return redirect('/?error=missing_fields', 303);
    }

    const enquiryId = `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    await db.insert(enquiries).values({
      id: enquiryId,
      fullName: fullName || 'Student Lead',
      whatsappNumber,
      email,
      highestQualification,
      targetDegree,
      preferredIntake,
      additionalNotes,
      source,
      status: 'new',
      adminNotes: null,
      createdAt: now,
      updatedAt: now,
    });

    if (isJsonRequest) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Enquiry saved successfully. Our Kochi consultancy team will contact you on WhatsApp shortly!',
          enquiryId,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return redirect('/contact?submitted=true', 303);
  } catch (error: any) {
    console.error('Error recording enquiry:', error);
    return new Response(JSON.stringify({ error: error?.message || 'Internal server error saving enquiry.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
