export const prerender = false;
import type { APIRoute } from 'astro';
import { db, enquiries } from '../../../../db';

export const GET: APIRoute = async ({ url }) => {
  try {
    const statusFilter = url.searchParams.get('status') || 'all';
    const sourceFilter = url.searchParams.get('source') || 'all';

    const allLeads = await db.select().from(enquiries);

    const filtered = allLeads.filter((e: any) => {
      if (statusFilter !== 'all' && e.status !== statusFilter) return false;
      if (sourceFilter !== 'all' && e.source !== sourceFilter) return false;
      return true;
    });

    const headers = ['ID', 'Full Name', 'WhatsApp Number', 'Email', 'Highest Qualification', 'Target Degree', 'Preferred Intake', 'Source', 'Status', 'Follow-Up Date', 'Admin Notes', 'Created At'];
    
    const rows = filtered.map((e: any) => [
      `"${e.id}"`,
      `"${(e.fullName || '').replace(/"/g, '""')}"`,
      `"${(e.whatsappNumber || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.highestQualification || '').replace(/"/g, '""')}"`,
      `"${(e.targetDegree || '').replace(/"/g, '""')}"`,
      `"${(e.preferredIntake || '').replace(/"/g, '""')}"`,
      `"${(e.source || '').replace(/"/g, '""')}"`,
      `"${(e.status || '').replace(/"/g, '""')}"`,
      `"${(e.followUpDate || '').replace(/"/g, '""')}"`,
      `"${(e.adminNotes || '').replace(/"/g, '""')}"`,
      `"${(e.createdAt || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="flyaustria_leads_${statusFilter}_${Date.now()}.csv"`,
      },
    });
  } catch (err) {
    return new Response('Error generating CSV export', { status: 500 });
  }
};
