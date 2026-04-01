const { Resend } = require('resend');
const { generateQuotePDF } = require('./utils/generateQuotePdf.js');
const { generateQuoteNumber } = require('./utils/generateQuoteNumber.js');
const businessConfig = require('./config/business.config.js');

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_Gv3yW9ed_DcQp6XZbZ5DNqi4vdu4XSg2b';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const TO_EMAIL = process.env.TO_EMAIL || 'clelimserrurerie@gmail.com';

console.log('🧪 Test Resend avec PDF - Devis complet');
console.log('=======================================\n');

async function testResendWithPDF() {
  try {
    console.log('📧 Configuration:');
    console.log(`   API Key: ${RESEND_API_KEY.substring(0, 10)}...`);
    console.log(`   From: ${FROM_EMAIL}`);
    console.log(`   To: ${TO_EMAIL}\n`);

    console.log('📄 Génération du PDF de test...');

    const quoteNumber = generateQuoteNumber();
    const createdDate = new Date();
    const validityDate = new Date(createdDate);
    validityDate.setDate(validityDate.getDate() + 30);

    const formatDate = (date) => {
      const d = date.getDate().toString().padStart(2, '0');
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const y = date.getFullYear();
      return `${d}/${m}/${y}`;
    };

    const pdfData = {
      business: {
        ...businessConfig.company,
        certificationMention: businessConfig.legal?.certificationMention || '',
        cgv: businessConfig.cgv || []
      },
      client: {
        name: 'Jean Test',
        email: 'test@example.com',
        phone: '06 12 34 56 78',
        address: '123 Rue de Test',
        postalCode: '75001',
        city: 'Paris'
      },
      quote: {
        number: quoteNumber,
        description: 'Ouverture de porte claquée',
        createdDate: formatDate(createdDate),
        validityDate: formatDate(validityDate),
        totalHT: 100.00,
        totalTVA: 0,
        totalTTC: 100.00,
        notes: businessConfig.quote.notes
      },
      lineItems: [
        {
          description: 'Déplacement sur site',
          quantity: 1,
          unitPrice: 0,
          total: 0
        },
        {
          description: 'Ouverture de porte claquée',
          quantity: 1,
          unitPrice: 100.00,
          total: 100.00
        }
      ],
      includeCGV: true
    };

    const pdfBase64 = generateQuotePDF(pdfData);
    console.log(`   ✅ PDF généré: ${quoteNumber}.pdf\n`);

    const resend = new Resend(RESEND_API_KEY);

    const emailData = {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Nouveau devis ${quoteNumber} - CLELIM SERRURERIE`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #FFC801;
                color: #000;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background-color: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .info-section {
                background-color: white;
                padding: 20px;
                margin: 20px 0;
                border-radius: 8px;
                border-left: 4px solid #FFC801;
              }
              .label {
                font-weight: bold;
                color: #555;
                margin-bottom: 5px;
              }
              .value {
                color: #000;
                margin-bottom: 15px;
              }
              .footer {
                text-align: center;
                color: #888;
                font-size: 12px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
              }
              .button {
                display: inline-block;
                padding: 12px 30px;
                background-color: #FFC801;
                color: #000;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                margin: 20px 0;
              }
              .highlight {
                background-color: #FFF9E6;
                padding: 15px;
                border-radius: 5px;
                margin: 15px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">🔒 CLELIM SERRURERIE</h1>
              <p style="margin: 10px 0 0 0;">Nouvelle demande de devis</p>
            </div>

            <div class="content">
              <div class="highlight">
                <strong>📋 Devis N°:</strong> ${quoteNumber}<br>
                <strong>📅 Date:</strong> ${formatDate(createdDate)}<br>
                <strong>💰 Montant:</strong> 100,00 € TTC
              </div>

              <h2>👤 Informations client</h2>

              <div class="info-section">
                <div class="label">Nom</div>
                <div class="value">Jean Test</div>

                <div class="label">📧 Email</div>
                <div class="value">test@example.com</div>

                <div class="label">📱 Téléphone</div>
                <div class="value">06 12 34 56 78</div>

                <div class="label">📍 Adresse</div>
                <div class="value">123 Rue de Test<br>75001 Paris</div>
              </div>

              <h2>🔧 Détails de l'intervention</h2>

              <div class="info-section">
                <div class="label">Service demandé</div>
                <div class="value">Ouverture de porte claquée</div>

                <div class="label">Description</div>
                <div class="value">
                  • Déplacement sur site<br>
                  • Ouverture de porte claquée
                </div>

                <div class="label">Montant total</div>
                <div class="value" style="font-size: 18px; color: #FFC801; font-weight: bold;">
                  100,00 € TTC
                </div>
              </div>

              <p style="text-align: center; margin: 30px 0;">
                <strong>📎 Le devis PDF détaillé (${quoteNumber}.pdf) est joint à cet email.</strong>
              </p>

              <div style="text-align: center;">
                <a href="tel:+33612345678" class="button">
                  📞 Appeler le client
                </a>
              </div>

              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                <strong>⏰ Prochaines étapes:</strong><br>
                1. Contactez le client dans les plus brefs délais<br>
                2. Confirmez les détails de l'intervention<br>
                3. Planifiez le rendez-vous
              </p>
            </div>

            <div class="footer">
              <p>
                <strong>CLELIM SERRURERIE</strong><br>
                ${businessConfig.company.address}<br>
                ${businessConfig.company.postalCode} ${businessConfig.company.city}<br>
                Tél: ${businessConfig.company.phoneDisplay} | Email: ${businessConfig.company.email}<br>
                SIRET: ${businessConfig.company.siret}
              </p>
              <p style="color: #aaa; font-size: 11px;">
                ${businessConfig.company.status} - ${businessConfig.company.tvaArticle}
              </p>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `${quoteNumber}.pdf`,
          content: pdfBase64,
        },
      ],
    };

    console.log('📤 Envoi de l\'email avec PDF...\n');

    const result = await resend.emails.send(emailData);

    console.log('✅ Email avec PDF envoyé avec succès!\n');
    console.log('📊 Résultat:');
    console.log(`   ID: ${result.data.id}`);
    console.log(`   Devis: ${quoteNumber}`);
    console.log(`   Fichier: ${quoteNumber}.pdf`);
    console.log(`   Destinataire: ${TO_EMAIL}\n`);

    console.log('💡 Vérifications à faire:');
    console.log(`   1. Consultez votre boîte mail: ${TO_EMAIL}`);
    console.log('   2. Vérifiez aussi le dossier spam');
    console.log('   3. Ouvrez la pièce jointe PDF');
    console.log('   4. Dashboard Resend: https://resend.com/emails');
    console.log(`   5. Cherchez l'email ID: ${result.data.id}\n`);

    console.log('✨ Test terminé avec succès!');

    return result;
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'envoi:\n');

    if (error.message && error.message.includes('jsPDF')) {
      console.error('📄 Erreur de génération PDF:');
      console.error('   - Ce test nécessite un environnement navigateur pour jsPDF');
      console.error('   - Utilisez plutôt le test depuis le navigateur\n');
    } else if (error.statusCode === 401) {
      console.error('🔑 Erreur d\'authentification:');
      console.error('   - Votre clé API Resend est invalide ou expirée');
      console.error('   - Vérifiez votre clé sur: https://resend.com/api-keys');
      console.error('   - Créez une nouvelle clé si nécessaire\n');
    } else if (error.statusCode === 422) {
      console.error('📧 Erreur de validation:');
      console.error('   - L\'adresse email "from" n\'est pas vérifiée');
      console.error('   - Pour les tests, utilisez: FROM_EMAIL=onboarding@resend.dev');
      console.error('   - Pour la production, vérifiez votre domaine sur Resend\n');
    } else {
      console.error('Message:', error.message);
      console.error('Code:', error.statusCode || 'N/A');
      if (error.stack) {
        console.error('\nStack trace:', error.stack);
      }
    }

    console.error('\n💡 Solutions:');
    console.error('   1. Utilisez test-resend.js pour tester sans PDF');
    console.error('   2. Testez depuis le navigateur avec le formulaire');
    console.error('   3. Vérifiez que RESEND_API_KEY est défini dans .env');
    console.error('   4. Utilisez FROM_EMAIL=onboarding@resend.dev pour les tests\n');

    throw error;
  }
}

if (require.main === module) {
  testResendWithPDF()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { testResendWithPDF };
