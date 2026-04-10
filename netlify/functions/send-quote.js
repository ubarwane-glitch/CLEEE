const { Resend } = require('resend');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  console.log('[SEND-QUOTE] Received request');

  try {
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (parseErr) {
      console.error('[SEND-QUOTE] Body parse error:', parseErr.message);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'Invalid JSON body' }),
      };
    }

    const { clientData } = body;
    console.log('[SEND-QUOTE] Client:', clientData && clientData.name);

    if (!clientData || !clientData.name || !clientData.email || !clientData.phone) {
      console.error('[SEND-QUOTE] Missing required clientData fields');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'Missing required client data' }),
      };
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('[SEND-QUOTE] RESEND_API_KEY not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: 'Email service not configured' }),
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.TO_EMAIL || 'clelimserrurerie@gmail.com';

    const urgencyLabel = {
      urgent: 'Urgence immédiate',
      rapide: 'Rapide (sous 24h)',
      normal: 'Standard (sous 48h)',
    }[clientData.urgency] || clientData.urgency || 'Non précisé';

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #022348; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f5f7fa; }
          .info-row { margin: 10px 0; padding: 10px; background-color: white; border-left: 3px solid #FFC801; }
          .label { font-weight: bold; color: #022348; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .urgent { background-color: #fff3cd; border-left-color: #ff6b6b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouvelle Demande de Devis</h1>
          </div>

          <div class="content">
            <h2>Informations Client</h2>

            <div class="info-row">
              <span class="label">Nom:</span> ${clientData.name}
            </div>

            <div class="info-row">
              <span class="label">Téléphone:</span> ${clientData.phone}
            </div>

            <div class="info-row">
              <span class="label">Email:</span> ${clientData.email}
            </div>

            <div class="info-row">
              <span class="label">Adresse:</span> ${clientData.address || ''}, ${clientData.postalCode || ''} ${clientData.city || ''}
            </div>

            <div class="info-row ${clientData.urgency === 'urgent' ? 'urgent' : ''}">
              <span class="label">Urgence:</span> ${urgencyLabel}
            </div>

            <h2>Demande</h2>

            <div class="info-row">
              <span class="label">Catégorie:</span> ${clientData.category || 'Non précisé'}
            </div>

            <div class="info-row">
              <span class="label">Service:</span> ${clientData.service || 'Non précisé'}
            </div>

            <div class="info-row">
              <span class="label">Description:</span><br>
              ${(clientData.message || '').replace(/\n/g, '<br>')}
            </div>
          </div>

          <div class="footer">
            <p>Cette demande a été soumise via le formulaire en ligne.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log('[SEND-QUOTE] Sending email to:', toEmail, 'from:', fromEmail);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Nouvelle demande de devis - ${clientData.name}`,
      html: emailHTML,
    });

    if (error) {
      console.error('[SEND-QUOTE] Resend error:', JSON.stringify(error));
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: error.message || 'Email sending failed' }),
      };
    }

    console.log('[SEND-QUOTE] Email sent successfully, ID:', data && data.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('[SEND-QUOTE] Unexpected error:', error.message);
    console.error('[SEND-QUOTE] Stack:', error.stack);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message || 'Unexpected server error' }),
    };
  }
};
