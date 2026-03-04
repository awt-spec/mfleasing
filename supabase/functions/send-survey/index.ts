import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers, contact, isSummary } = await req.json();
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const contactName = contact?.company || 'Desconocido';
    const contactEmail = contact?.email || '';
    const contactWhatsapp = contact?.whatsapp || '';

    const rows = Object.entries(answers)
      .map(([key, value]) => `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">${key}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${value}</td></tr>`)
      .join('');

    const contactSection = contactEmail ? `
      <div style="margin-bottom:16px;padding:12px;background:#f9fafb;border-radius:8px;">
        <p style="margin:0;font-size:13px;"><strong>Empresa:</strong> ${contactName}</p>
        <p style="margin:4px 0 0;font-size:13px;"><strong>Email:</strong> ${contactEmail}</p>
        ${contactWhatsapp ? `<p style="margin:4px 0 0;font-size:13px;"><strong>WhatsApp:</strong> ${contactWhatsapp}</p>` : ''}
      </div>
    ` : '';

    const subject = isSummary
      ? `📋 Resumen completo - ${contactName} - MF Leasing`
      : `📩 Nueva respuesta de ${contactName} - MF Leasing`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#C42126;padding:20px;border-radius:8px 8px 0 0;">
          <h1 style="color:white;margin:0;font-size:20px;">${isSummary ? 'Resumen completo de encuesta' : 'Nueva respuesta de encuesta'}</h1>
        </div>
        <div style="padding:20px;background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          ${contactSection}
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#f9fafb;">
                <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:left;">Pregunta</th>
                <th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:left;">Respuesta</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <p style="margin-top:16px;color:#6b7280;font-size:12px;">Enviado desde la presentación MF Leasing</p>
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Sysde Leasing <onboarding@resend.dev>',
        to: ['awcuentas@gmail.com'],
        subject,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
