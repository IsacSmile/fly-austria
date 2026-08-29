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

    const xmlRows = filtered.map((e: any) => `
      <Row>
        <Cell><Data ss:Type="String">${escapeXml(e.id)}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(e.fullName)}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(e.whatsappNumber)}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(e.email || '')}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(e.highestQualification || '')}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(e.targetDegree || '')}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(e.preferredIntake || '')}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(e.source || '')}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(e.status || '')}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(e.followUpDate || '')}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(e.adminNotes || '')}</Data></Cell>
        <Cell><Data ss:Type="String">${escapeXml(e.createdAt || '')}</Data></Cell>
      </Row>
    `).join('');

    const xmlSpreadsheet = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="FlyAustria Leads">
  <Table>
   <Row ss:StyleID="Header">
    <Cell><Data ss:Type="String">ID</Data></Cell>
    <Cell><Data ss:Type="String">Full Name</Data></Cell>
    <Cell><Data ss:Type="String">WhatsApp</Data></Cell>
    <Cell><Data ss:Type="String">Email</Data></Cell>
    <Cell><Data ss:Type="String">Qualification</Data></Cell>
    <Cell><Data ss:Type="String">Target Degree</Data></Cell>
    <Cell><Data ss:Type="String">Preferred Intake</Data></Cell>
    <Cell><Data ss:Type="String">Source</Data></Cell>
    <Cell><Data ss:Type="String">Status</Data></Cell>
    <Cell><Data ss:Type="String">Follow-Up Date</Data></Cell>
    <Cell><Data ss:Type="String">Admin Notes</Data></Cell>
    <Cell><Data ss:Type="String">Created At</Data></Cell>
   </Row>
   ${xmlRows}
  </Table>
 </Worksheet>
</Workbook>`;

    return new Response(xmlSpreadsheet, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.ms-excel',
        'Content-Disposition': `attachment; filename="flyaustria_leads_${statusFilter}_${Date.now()}.xls"`,
      },
    });
  } catch (err) {
    return new Response('Error generating Excel export', { status: 500 });
  }
};

function escapeXml(unsafe: string | null | undefined): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
