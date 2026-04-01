const { Resend } = require('resend');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { pdfBase64, quoteData, clientData } = JSON.parse(event.body);

    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = 'clelimserrurerie@gmail.com';

    const urgencyLabel = {
      urgent: 'Urgence immédiate',
      rapide: 'Rapide (sous 24h)',
      normal: 'Standard (sous 48h)',
    }[clientData.urgency] || clientData.urgency;

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
            <h1>Nouveau Devis</h1>
            <p>${quoteData.number}</p>
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
              <span class="label">Adresse:</span> ${clientData.address}, ${clientData.postalCode} ${clientData.city}
            </div>

            <div class="info-row ${clientData.urgency === 'urgent' ? 'urgent' : ''}">
              <span class="label">Urgence:</span> ${urgencyLabel}
            </div>

            <h2>Demande</h2>

            <div class="info-row">
              <span class="label">Catégorie:</span> ${clientData.category}
            </div>

            <div class="info-row">
              <span class="label">Service:</span> ${clientData.service}
            </div>

            <div class="info-row">
              <span class="label">Description:</span><br>
              ${clientData.message.replace(/\n/g, '<br>')}
            </div>

            <h2>Devis</h2>

            <div class="info-row">
              <span class="label">Total HT:</span> ${quoteData.totalHT.toFixed(2)} €
            </div>

            <div class="info-row">
              <span class="label">Total TTC:</span> ${quoteData.totalTTC.toFixed(2)} €
            </div>

            <div class="info-row">
              <span class="label">Date de création:</span> ${quoteData.createdDate}
            </div>

            <div class="info-row">
              <span class="label">Validité:</span> ${quoteData.validityDate}
            </div>
          </div>

          <div class="footer">
            <p>Ce devis a été généré automatiquement.</p>
            <p>Le PDF est joint à cet email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Nouveau devis - ${clientData.name} - ${quoteData.number}`,
      html: emailHTML,
      attachments: [
        {
          filename: `devis-clelim-${quoteData.number}-${clientData.name.replace(/\s+/g, '_')}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    if (process.env.SEND_COPY_TO_CLIENT === 'true' && clientData.email) {
      await resend.emails.send({
        from: fromEmail,
        to: clientData.email,
        subject: `Votre devis Clelim Serrurerie - ${quoteData.number}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Merci pour votre demande !</h2>
            <p>Bonjour ${clientData.name},</p>
            <p>Votre devis a bien été généré. Vous trouverez le document en pièce jointe.</p>
            <p>Nous vous recontacterons très prochainement pour confirmer votre intervention.</p>
            <p><strong>Numéro de devis:</strong> ${quoteData.number}</p>
            <p>Cordialement,<br>L'équipe Clelim Serrurerie</p>
            <p style="font-size: 12px; color: #666;">
              📞 ${process.env.BUSINESS_PHONE || '06 77 23 58 39'}<br>
              ✉️ clelimserrurerie@gmail.com
            </p>
          </body>
          </html>
        `,
        attachments: [
          {
            filename: `devis-clelim-${quoteData.number}-${clientData.name.replace(/\s+/g, '_')}.pdf`,
            content: pdfBuffer,
          },
        ],
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Devis envoyé avec succès',
        emailId: data?.id,
      }),
    };
  } catch (error) {
    console.error('Error sending quote:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Erreur lors de l\'envoi du devis',
      }),
    };
  }
};
