import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_Gv3yW9ed_DcQp6XZbZ5DNqi4vdu4XSg2b';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const TO_EMAIL = process.env.TO_EMAIL || 'clelimserrurerie@gmail.com';

console.log('🧪 Test Resend - Envoi d\'email de devis');
console.log('=====================================\n');

async function testResendEmail() {
  try {
    console.log('📧 Configuration:');
    console.log(`   API Key: ${RESEND_API_KEY.substring(0, 10)}...`);
    console.log(`   From: ${FROM_EMAIL}`);
    console.log(`   To: ${TO_EMAIL}\n`);

    const resend = new Resend(RESEND_API_KEY);

    const emailData = {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: 'Test - Nouveau devis demandé',
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
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">🔒 CLELIM SERRURERIE</h1>
              <p style="margin: 10px 0 0 0;">Nouvelle demande de devis</p>
            </div>

            <div class="content">
              <h2>📋 Détails de la demande</h2>

              <div class="info-section">
                <div class="label">👤 Client</div>
                <div class="value">Jean Test</div>

                <div class="label">📧 Email</div>
                <div class="value">test@example.com</div>

                <div class="label">📱 Téléphone</div>
                <div class="value">06 12 34 56 78</div>

                <div class="label">📍 Adresse</div>
                <div class="value">123 Rue de Test, 75001 Paris</div>
              </div>

              <div class="info-section">
                <div class="label">🔧 Service demandé</div>
                <div class="value">Ouverture de porte claquée</div>

                <div class="label">⏰ Urgence</div>
                <div class="value">Standard</div>

                <div class="label">💰 Montant estimé</div>
                <div class="value">100,00 €</div>
              </div>

              <p style="text-align: center;">
                <strong>📎 Le devis PDF détaillé est joint à cet email.</strong>
              </p>

              <div style="text-align: center;">
                <a href="tel:+33677235839" class="button">
                  📞 Appeler le client: 06 12 34 56 78
                </a>
              </div>
            </div>

            <div class="footer">
              <p>
                <strong>CLELIM SERRURERIE</strong><br>
                60 RUE FRANCOIS IER, 75008 PARIS<br>
                Tél: 06 77 23 58 39 | Email: clelimserrurerie@gmail.com<br>
                SIRET: 90951567800029
              </p>
              <p style="color: #aaa; font-size: 11px;">
                Ceci est un email de test du système de devis automatisé.
              </p>
            </div>
          </body>
        </html>
      `,
      text: `
Nouvelle demande de devis - CLELIM SERRURERIE

Client: Jean Test
Email: test@example.com
Téléphone: 06 12 34 56 78
Adresse: 123 Rue de Test, 75001 Paris

Service: Ouverture de porte claquée
Urgence: Standard
Montant: 100,00 €

Le devis PDF détaillé est joint à cet email.

---
CLELIM SERRURERIE
60 RUE FRANCOIS IER, 75008 PARIS
Tél: 06 77 23 58 39
      `.trim(),
    };

    console.log('📤 Envoi de l\'email de test...\n');

    const result = await resend.emails.send(emailData);

    console.log('📊 Résultat complet:', JSON.stringify(result, null, 2));
    console.log('');

    if (result && result.error) {
      console.error('❌ Erreur Resend:\n');
      console.error(`   Code: ${result.error.statusCode}`);
      console.error(`   Type: ${result.error.name}`);
      console.error(`   Message: ${result.error.message}\n`);

      if (result.error.statusCode === 403) {
        console.error('💡 Solution:');
        console.error('   Cette clé API est liée au compte ubarwane@gmail.com');
        console.error('   Vous devez envoyer les emails de test à: ubarwane@gmail.com');
        console.error('   OU vérifier un domaine sur resend.com/domains\n');
        console.error('   Pour tester avec un autre email:');
        console.error('   TO_EMAIL=ubarwane@gmail.com npm run test:resend\n');
      }

      throw new Error(result.error.message);
    }

    if (result && result.data && result.data.id) {
      console.log('✅ Email envoyé avec succès!\n');
      console.log('📧 Détails:');
      console.log(`   ID: ${result.data.id}`);
      console.log(`   Statut: Envoyé\n`);

      console.log('💡 Vérifications à faire:');
      console.log('   1. Consultez votre boîte mail: ' + TO_EMAIL);
      console.log('   2. Vérifiez aussi le dossier spam');
      console.log('   3. Dashboard Resend: https://resend.com/emails');
      console.log(`   4. Cherchez l'email ID: ${result.data.id}\n`);

      console.log('✨ Test terminé avec succès!');
    } else if (result && result.id) {
      console.log('✅ Email envoyé avec succès!\n');
      console.log('📧 Détails:');
      console.log(`   ID: ${result.id}`);
      console.log(`   Statut: Envoyé\n`);

      console.log('💡 Vérifications à faire:');
      console.log('   1. Consultez votre boîte mail: ' + TO_EMAIL);
      console.log('   2. Vérifiez aussi le dossier spam');
      console.log('   3. Dashboard Resend: https://resend.com/emails');
      console.log(`   4. Cherchez l'email ID: ${result.id}\n`);

      console.log('✨ Test terminé avec succès!');
    } else {
      console.log('\n⚠️  Réponse inattendue de Resend');
      throw new Error('Unexpected response from Resend');
    }

    return result;
  } catch (error) {
    console.error('\n❌ Erreur lors de l\'envoi:\n');

    if (error.statusCode === 401) {
      console.error('🔑 Erreur d\'authentification:');
      console.error('   - Votre clé API Resend est invalide ou expirée');
      console.error('   - Vérifiez votre clé sur: https://resend.com/api-keys');
      console.error('   - Créez une nouvelle clé si nécessaire\n');
    } else if (error.statusCode === 422) {
      console.error('📧 Erreur de validation:');
      console.error('   - L\'adresse email "from" n\'est pas vérifiée');
      console.error('   - Pour les tests, utilisez: onboarding@resend.dev');
      console.error('   - Pour la production, vérifiez votre domaine sur Resend\n');
    } else {
      console.error('Message:', error.message);
      console.error('Code:', error.statusCode || 'N/A');
      console.error('\nDétails:', error);
    }

    console.error('\n💡 Solutions:');
    console.error('   1. Vérifiez votre connexion internet');
    console.error('   2. Vérifiez que RESEND_API_KEY est défini dans .env');
    console.error('   3. Testez avec FROM_EMAIL=onboarding@resend.dev');
    console.error('   4. Consultez la documentation: https://resend.com/docs\n');

    throw error;
  }
}

testResendEmail()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
