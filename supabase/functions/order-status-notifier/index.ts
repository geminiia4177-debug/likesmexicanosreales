// ==============================================================================
// Supabase Edge Function: order-status-notifier
// Notificaciones Transaccionales Automáticas (Brevo SMTP API + WhatsApp Webhook)
// Envia correo HTML Dark Mode Neo-Brutalista y aviso a WhatsApp al cambiar estado de orden.
// ==============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") || "";
const SENDER_EMAIL = Deno.env.get("SENDER_EMAIL") || "notificaciones@likesmexicanos.mx";
const SENDER_NAME = "Likes Mexicanos Reales";
const WHATSAPP_API_ENDPOINT = Deno.env.get("WHATSAPP_API_ENDPOINT") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { order, eventType = "order_created" } = await req.json();

    if (!order) {
      return new Response(JSON.stringify({ error: "No order provided" }), { status: 400, headers: corsHeaders });
    }

    const cleanPhone = (order.customer_whatsapp || "").replace(/\D/g, "");
    const trackingUrl = `https://likesmexicanos.mx/?landing=track&order=${order.order_code}`;
    const amountMxn = Number(order.total_amount_mxn || 0).toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });

    const isCompleted = order.status === "completed" || eventType === "order_completed";

    // 1. Plantilla HTML Dark Mode Neo-Brutalista para Brevo
    const emailSubject = isCompleted
      ? `🎉 ¡Campaña Completada al 100%! Folio #${order.order_code} — Likes Mexicanos Reales`
      : `⚡ Comprobante Recibido: Orden #${order.order_code} en Verificación — Likes Mexicanos Reales`;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090A0F; color: #F3F4F6; margin: 0; padding: 32px 16px; }
    .card { max-width: 580px; margin: 0 auto; background: #12141D; border: 2px solid #00F59B; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 245, 155, 0.15); }
    .header { background: #00F59B; color: #090A0F; padding: 24px; text-align: center; font-weight: 900; font-size: 20px; letter-spacing: -0.5px; }
    .content { padding: 32px 24px; }
    .badge { display: inline-block; background: rgba(0, 245, 155, 0.15); border: 1px solid #00F59B; color: #00F59B; font-weight: bold; font-size: 12px; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; }
    .item-row { display: flex; justify-content: space-between; border-bottom: 1px solid #1F2433; padding: 12px 0; font-size: 14px; }
    .item-label { color: #9CA3AF; }
    .item-val { color: #FFFFFF; font-weight: bold; }
    .cta-btn { display: block; text-align: center; background: #00F59B; color: #090A0F; text-decoration: none; font-weight: 900; font-size: 15px; padding: 16px 24px; border-radius: 12px; margin-top: 28px; text-transform: uppercase; letter-spacing: 0.5px; }
    .coupon-box { margin-top: 24px; background: rgba(255, 184, 0, 0.1); border: 2px dashed #FFB800; border-radius: 12px; padding: 16px; text-align: center; }
    .coupon-code { font-family: monospace; font-size: 20px; font-weight: 900; color: #FFB800; letter-spacing: 2px; }
    .footer { text-align: center; color: #6B7280; font-size: 12px; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      LIKES MEXICANOS REALES 🇲🇽
    </div>
    <div class="content">
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="badge">${isCompleted ? "ENTREGA COMPLETADA 100%" : "COMPROBANTE REGISTRADO"}</span>
        <h2 style="color: #FFFFFF; margin-top: 12px; font-size: 22px;">
          ${isCompleted ? "Tu campaña ha sido completada con éxito" : "Estamos validando tu comprobante SPEI / OXXO"}
        </h2>
      </div>

      <div class="item-row">
        <span class="item-label">Folio de Orden:</span>
        <span class="item-val" style="color: #00F59B;">#${order.order_code}</span>
      </div>
      <div class="item-row">
        <span class="item-label">Servicio Contratado:</span>
        <span class="item-val">${order.service_name || order.service_id}</span>
      </div>
      <div class="item-row">
        <span class="item-label">Cantidad:</span>
        <span class="item-val">${order.quantity?.toLocaleString("es-MX")}</span>
      </div>
      <div class="item-row">
        <span class="item-label">Monto Pagado:</span>
        <span class="item-val">${amountMxn} MXN</span>
      </div>
      <div class="item-row">
        <span class="item-label">Destino:</span>
        <span class="item-val" style="max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${order.target_url}</span>
      </div>

      <a href="${trackingUrl}" class="cta-btn" target="_blank">
        Ver Estado de Rastreo en Vivo →
      </a>

      ${isCompleted ? `
      <div class="coupon-box">
        <div style="color: #FFB800; font-size: 12px; font-weight: bold; text-transform: uppercase;">🎁 Regalo Exclusivo por tu Preferencia</div>
        <div style="font-size: 14px; color: #E5E7EB; margin: 4px 0;">15% OFF en tu siguiente recarga de interacciones:</div>
        <div class="coupon-code">MEXICOVIP15</div>
      </div>
      ` : ""}
    </div>
  </div>
  <div class="footer">
    Likes Mexicanos Reales S.A.P.I. de C.V. • CDMX, Monterrey & Guadalajara, México.<br>
    Soporte 24/7 directo por WhatsApp: +52 55 1234 5678.
  </div>
</body>
</html>
    `;

    // 2. Envío de Email con Brevo API si hay token
    if (BREVO_API_KEY && order.customer_email) {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          sender: { name: SENDER_NAME, email: SENDER_EMAIL },
          to: [{ email: order.customer_email }],
          subject: emailSubject,
          htmlContent: emailHtml,
        }),
      });
    }

    // 3. Webhook de WhatsApp si hay endpoint configurado
    if (WHATSAPP_API_ENDPOINT && cleanPhone) {
      const waMessage = isCompleted
        ? `🇲🇽 *¡Tu orden #${order.order_code} ha sido completada!* Entregamos ${order.quantity} ${order.service_name} en ${order.target_url}. Revisa el reporte en vivo aquí: ${trackingUrl} \n\nUsa el cupón *MEXICOVIP15* para un 15% OFF extra en tu siguiente pedido.`
        : `⚡ *Hola! Recibimos tu comprobante para la orden #${order.order_code}.* Estamos verificando tu pago ${order.payment_method} de ${amountMxn}. Puedes rastrear el progreso aquí: ${trackingUrl}`;

      await fetch(WHATSAPP_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: `521${cleanPhone}`,
          message: waMessage,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true, notifiedEmail: !!order.customer_email, notifiedWhatsApp: !!cleanPhone }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
