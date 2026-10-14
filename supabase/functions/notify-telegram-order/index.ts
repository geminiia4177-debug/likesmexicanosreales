// ==============================================================================
// Supabase Edge Function: notify-telegram-order
// Dispara alerta al bot de Telegram del administrador al registrarse un comprobante
// y procesa callbacks de aprobación/rechazo en tiempo real.
// ==============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") || "";
const TELEGRAM_ADMIN_CHAT_ID = Deno.env.get("TELEGRAM_ADMIN_CHAT_ID") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();

    // 1. Manejo de Webhook de Base de Datos Supabase (record insert/update)
    if (payload.record) {
      const order = payload.record;

      // Solo notificar cuando el comprobante entra a verificación
      if (order.status === "verifying_receipt") {
        const cleanPhone = (order.customer_whatsapp || "").replace(/\D/g, "");
        const formattedAmount = Number(order.total_amount_mxn).toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
        });

        const caption = `🔥 *NUEVO PAGO POR VERIFICAR (SPEI / OXXO)*\n\n` +
          `📋 *Folio:* \`#${order.order_code}\`\n` +
          `📦 *Servicio:* ${order.service_name || order.service_id}\n` +
          `🎯 *Cantidad:* ${order.quantity.toLocaleString("es-MX")}\n` +
          `💰 *Monto:* *${formattedAmount}*\n` +
          `💳 *Método:* ${order.payment_method}\n` +
          `🔗 *Link Destino:* ${order.target_url}\n` +
          `👤 *WhatsApp:* [${order.customer_whatsapp}](https://wa.me/521${cleanPhone})\n` +
          `${order.requires_cfdi ? `🧾 *RFC Factura:* \`${order.cfdi_rfc}\`\n` : ""}` +
          `${order.order_bump_added ? `⚡ *Order Bump:* +300 Likes & Garantía 1 Año VIP\n` : ""}` +
          `\n_Selecciona una acción para despachar al instante:_`;

        const inlineKeyboard = {
          inline_keyboard: [
            [
              { text: "✅ Aprobar y Despachar Ahora", callback_data: `approve_${order.id}` },
              { text: "⏳ En Cola Manual", callback_data: `queue_${order.id}` }
            ],
            [
              { text: "❌ Rechazar Comprobante", callback_data: `reject_${order.id}` },
              { text: "💬 Abrir WhatsApp Cliente", url: `https://wa.me/521${cleanPhone}` }
            ]
          ]
        };

        if (TELEGRAM_BOT_TOKEN && TELEGRAM_ADMIN_CHAT_ID) {
          if (order.payment_proof_url && order.payment_proof_url.startsWith("http")) {
            // Enviar foto con pie interactivo
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: TELEGRAM_ADMIN_CHAT_ID,
                photo: order.payment_proof_url,
                caption,
                parse_mode: "Markdown",
                reply_markup: inlineKeyboard,
              }),
            });
          } else {
            // Enviar mensaje de texto
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: TELEGRAM_ADMIN_CHAT_ID,
                text: caption,
                parse_mode: "Markdown",
                reply_markup: inlineKeyboard,
              }),
            });
          }
        }

        return new Response(JSON.stringify({ success: true, notified: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // 2. Manejo de Callback Query desde Bot de Telegram (al presionar un botón inline)
    if (payload.callback_query) {
      const cb = payload.callback_query;
      const data = cb.data as string;
      const [action, orderId] = data.split("_");

      let newStatus = "in_progress";
      let statusText = "✅ Orden Aprobada y Puesta en Ejecución Inmediata";

      if (action === "queue") {
        newStatus = "queued";
        statusText = "⏳ Orden Puesta en Cola Manual de Asignación";
      } else if (action === "reject") {
        newStatus = "rejected";
        statusText = "❌ Comprobante Marcado como Inválido";
      }

      // Actualizar en base de datos Supabase
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (!error && TELEGRAM_BOT_TOKEN) {
        // Responder al callback query de Telegram
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: cb.id,
            text: statusText,
            show_alert: true,
          }),
        });

        // Editar el mensaje original para reflejar el nuevo estado
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageCaption`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: cb.message.chat.id,
            message_id: cb.message.message_id,
            caption: `${cb.message.caption || cb.message.text}\n\n👉 *ESTADO ACTUALIZADO:* ${statusText}`,
            parse_mode: "Markdown",
            reply_markup: { inline_keyboard: [] },
          }),
        });
      }

      return new Response(JSON.stringify({ success: true, updatedStatus: newStatus }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "No actionable event" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
