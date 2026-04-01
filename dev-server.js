import express from 'express';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_ZTrpUD1o_Nrsh78WjftiDpL1o67gH3hG4';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const TO_EMAIL = process.env.TO_EMAIL || 'clelimserrurerie@gmail.com';

console.log('🔧 Configuration Email:');
console.log('   FROM:', FROM_EMAIL);
console.log('   TO:', TO_EMAIL);
console.log('   API Key:', RESEND_API_KEY.substring(0, 10) + '...\n');

app.post('/.netlify/functions/send-quote', async (req, res) => {
  console.log('\n📨 Nouvelle demande de devis reçue');

  try {
    const { pdfBase64, quoteData, clientData } = req.body;

    if (!pdfBase64 || !quoteData || !clientData) {
      throw new Error('Missing required data');
    }

    console.log('📧 Client:', clientData.name);
    console.log('📧 Email client:', clientData.email);
    console.log('📄 Devis:', quoteData.number);
    console.log('💰 Total:', quoteData.totalTTC, '€');

    const resend = new Resend(RESEND_API_KEY);

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

    console.log('📤 Envoi email à:', TO_EMAIL);

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
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
      console.error('❌ Resend error:', error);
      throw error;
    }

    console.log('✅ Email envoyé avec succès!');
    console.log('   Email ID:', data.id);

    if (process.env.SEND_COPY_TO_CLIENT === 'true' && clientData.email) {
      console.log('📤 Envoi copie au client:', clientData.email);

      await resend.emails.send({
        from: FROM_EMAIL,
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
              📞 06 77 23 58 39<br>
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

      console.log('✅ Copie envoyée au client');
    }

    res.json({
      success: true,
      message: 'Devis envoyé avec succès',
      emailId: data?.id,
    });

  } catch (error) {
    console.error('❌ Error:', error.message);

    res.status(500).json({
      success: false,
      error: error.message || 'Erreur lors de l\'envoi du devis',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur de développement démarré!`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`\n💡 Ce serveur émule les fonctions Netlify pour le développement local`);
  console.log(`📧 Les emails seront envoyés à: ${TO_EMAIL}\n`);
});
