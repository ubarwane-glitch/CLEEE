import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend@3.2.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method Not Allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { pdfBase64, quoteData, clientData } = await req.json();

    if (!pdfBase64 || !quoteData || !clientData) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required data: pdfBase64, quoteData, or clientData" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: "RESEND_API_KEY not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const resend = new Resend(resendApiKey);

    const fromEmail = Deno.env.get("FROM_EMAIL") || "onboarding@resend.dev";
    const toEmail = Deno.env.get("TO_EMAIL") || "clelimserrurerie@gmail.com";
    const sendCopyToClient = Deno.env.get("SEND_COPY_TO_CLIENT") === "true";

    const urgencyLabel: Record<string, string> = {
      urgent: "Urgence immédiate",
      rapide: "Rapide (sous 24h)",
      normal: "Standard (sous 48h)",
    };

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
              <span class="label">Telephone:</span> ${clientData.phone}
            </div>
            <div class="info-row">
              <span class="label">Email:</span> ${clientData.email}
            </div>
            <div class="info-row">
              <span class="label">Adresse:</span> ${clientData.address}, ${clientData.postalCode} ${clientData.city}
            </div>
            <div class="info-row ${clientData.urgency === "urgent" ? "urgent" : ""}">
              <span class="label">Urgence:</span> ${urgencyLabel[clientData.urgency] || clientData.urgency}
            </div>
            <h2>Demande</h2>
            <div class="info-row">
              <span class="label">Categorie:</span> ${clientData.category}
            </div>
            <div class="info-row">
              <span class="label">Service:</span> ${clientData.service}
            </div>
            <div class="info-row">
              <span class="label">Description:</span><br>
              ${(clientData.message || "").replace(/\n/g, "<br>")}
            </div>
            <h2>Devis</h2>
            <div class="info-row">
              <span class="label">Total HT:</span> ${quoteData.totalHT.toFixed(2)} EUR
            </div>
            <div class="info-row">
              <span class="label">Total TTC:</span> ${quoteData.totalTTC.toFixed(2)} EUR
            </div>
            <div class="info-row">
              <span class="label">Date de creation:</span> ${quoteData.createdDate}
            </div>
            <div class="info-row">
              <span class="label">Validite:</span> ${quoteData.validityDate}
            </div>
          </div>
          <div class="footer">
            <p>Ce devis a ete genere automatiquement.</p>
            <p>Le PDF est joint a cet email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const pdfBytes = Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0));
    const pdfArray = Array.from(pdfBytes);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Nouveau devis - ${clientData.name} - ${quoteData.number}`,
      html: emailHTML,
      attachments: [
        {
          filename: `devis-clelim-${quoteData.number}-${clientData.name.replace(/\s+/g, "_")}.pdf`,
          content: pdfArray,
        },
      ],
    });

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message || "Resend API error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (sendCopyToClient && clientData.email) {
      const businessPhone = Deno.env.get("BUSINESS_PHONE") || "06 77 23 58 39";
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
            <p>Votre devis a bien ete genere. Vous trouverez le document en piece jointe.</p>
            <p>Nous vous recontacterons tres prochainement pour confirmer votre intervention.</p>
            <p><strong>Numero de devis:</strong> ${quoteData.number}</p>
            <p>Cordialement,<br>L'equipe Clelim Serrurerie</p>
            <p style="font-size: 12px; color: #666;">
              Tel: ${businessPhone}<br>
              Email: clelimserrurerie@gmail.com
            </p>
          </body>
          </html>
        `,
        attachments: [
          {
            filename: `devis-clelim-${quoteData.number}-${clientData.name.replace(/\s+/g, "_")}.pdf`,
            content: pdfArray,
          },
        ],
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Devis envoye avec succes",
        emailId: data?.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: (error as Error).message || "Erreur lors de l'envoi du devis",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
