import { Resend } from 'resend';

// Essayer avec TO_EMAIL, sinon fallback sur ubarwane@gmail.com
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_ZTrpUD1o_Nrsh78WjftiDpL1o67gH3hG4';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
let TO_EMAIL = process.env.TO_EMAIL || 'clelimserrurerie@gmail.com';

console.log('🧪 Test Automatique Resend\n');
console.log('📧 Configuration initiale:');
console.log(`   API Key: ${RESEND_API_KEY.substring(0, 10)}...`);
console.log(`   From: ${FROM_EMAIL}`);
console.log(`   To: ${TO_EMAIL}\n`);

async function testResendWithFallback() {
  const resend = new Resend(RESEND_API_KEY);

  console.log('📤 Tentative 1: Envoi à', TO_EMAIL);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: 'Test - CLELIM Serrurerie',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { background: #FFC801; color: #000; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🔒 CLELIM SERRURERIE</h1>
              <p>Email de Test</p>
            </div>
            <div class="content">
              <h2>Test de Configuration Resend</h2>
              <p>Cet email confirme que votre configuration Resend fonctionne correctement.</p>
              <p><strong>Destinataire:</strong> ${TO_EMAIL}</p>
              <p><strong>From:</strong> ${FROM_EMAIL}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      // Si erreur 403 validation, essayer avec ubarwane@gmail.com
      if (error.statusCode === 403 && error.message.includes('own email address')) {
        console.log('⚠️  Erreur 403: Mode test Resend - ne peut envoyer qu\'au propriétaire du compte\n');
        console.log('📤 Tentative 2: Envoi à ubarwane@gmail.com (propriétaire du compte)');

        TO_EMAIL = 'ubarwane@gmail.com';

        const { data: data2, error: error2 } = await resend.emails.send({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          subject: 'Test - CLELIM Serrurerie (Fallback)',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                  .header { background: #FFC801; color: #000; padding: 20px; text-align: center; }
                  .content { padding: 20px; background: #f9f9f9; }
                  .warning { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
                </style>
              </head>
              <body>
                <div class="header">
                  <h1>🔒 CLELIM SERRURERIE</h1>
                  <p>Email de Test (Fallback)</p>
                </div>
                <div class="content">
                  <div class="warning">
                    <strong>⚠️ Note:</strong> Cet email a été envoyé en mode fallback car Resend en mode gratuit
                    ne peut envoyer qu'au propriétaire du compte.
                  </div>
                  <h2>Configuration Actuelle</h2>
                  <p><strong>Destinataire souhaité:</strong> clelimserrurerie@gmail.com</p>
                  <p><strong>Destinataire réel:</strong> ${TO_EMAIL}</p>
                  <p><strong>From:</strong> ${FROM_EMAIL}</p>
                  <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>

                  <h2>Solutions</h2>
                  <ol>
                    <li><strong>Transfert Gmail:</strong> Configurez un transfert automatique de ubarwane@gmail.com vers clelimserrurerie@gmail.com</li>
                    <li><strong>Domaine vérifié:</strong> Vérifiez un domaine sur Resend pour envoyer à n'importe quelle adresse</li>
                  </ol>
                  <p>Consultez <code>RESEND-DOMAIN-SETUP.md</code> pour plus de détails.</p>
                </div>
              </body>
            </html>
          `,
        });

        if (error2) {
          throw error2;
        }

        console.log('✅ Email envoyé avec succès (fallback)!\n');
        console.log('📧 Détails:');
        console.log(`   ID: ${data2.id}`);
        console.log(`   To: ${TO_EMAIL}`);
        console.log(`\n💡 Recommandations:`);
        console.log('   1. Configurez un transfert Gmail: ubarwane@gmail.com → clelimserrurerie@gmail.com');
        console.log('   2. OU vérifiez un domaine sur Resend (voir RESEND-DOMAIN-SETUP.md)');
        console.log(`\n🌐 Dashboard: https://resend.com/emails/${data2.id}`);

        return { success: true, emailId: data2.id, to: TO_EMAIL, fallback: true };
      }

      throw error;
    }

    console.log('✅ Email envoyé avec succès!\n');
    console.log('📧 Détails:');
    console.log(`   ID: ${data.id}`);
    console.log(`   To: ${TO_EMAIL}`);
    console.log(`\n🌐 Dashboard: https://resend.com/emails/${data.id}`);

    return { success: true, emailId: data.id, to: TO_EMAIL, fallback: false };

  } catch (error) {
    console.error('\n❌ Erreur lors de l\'envoi:', error.message);
    console.error('\n💡 Solutions:');
    console.error('   1. Vérifiez que RESEND_API_KEY est correct');
    console.error('   2. Vérifiez votre connexion internet');
    console.error('   3. Consultez https://resend.com/docs');
    throw error;
  }
}

testResendWithFallback()
  .then((result) => {
    console.log('\n✨ Test terminé avec succès!');
    if (result.fallback) {
      console.log('\n⚠️  Note: Mode fallback activé.');
      console.log('   Mettez à jour .env avec: TO_EMAIL=ubarwane@gmail.com');
      console.log('   Ou vérifiez un domaine pour envoyer à clelimserrurerie@gmail.com');
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test échoué');
    process.exit(1);
  });
