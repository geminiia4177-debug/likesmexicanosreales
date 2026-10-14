#!/usr/bin/env python3
"""
==============================================================================
LIKES MEXICANOS REALES - BOT DE ADMINISTRACIÓN TELEGRAM (v2.0.0)
automation_worker/telegram_admin_bot.py
Maneja la moderación y despacho express con botones inline de aprobación SPEI/OXXO.
==============================================================================
"""

import os
import sys
import json
import logging
import asyncio
from datetime import datetime
from typing import Optional

try:
    import aiohttp
except ImportError:
    print("Instalando aiohttp para llamadas asíncronas...")
    os.system(f"{sys.executable} -m pip install aiohttp")
    import aiohttp

logging.basicConfig(
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    level=logging.INFO
)
logger = logging.getLogger("TelegramAdminBot")

# Variables de entorno
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
ADMIN_CHAT_ID = os.getenv("TELEGRAM_ADMIN_CHAT_ID", "")
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}"

HEADERS = {
    "apikey": SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
    "Content-Type": "application/json"
}


async def supabase_get_order(order_id: str) -> Optional[dict]:
    """Obtiene una orden de Supabase por su ID."""
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        logger.warning("Supabase no configurado. Operando en modo mock.")
        return {"id": order_id, "order_code": "LMX-MOCK", "status": "verifying_receipt"}

    url = f"{SUPABASE_URL}/rest/v1/orders?id=eq.{order_id}&select=*"
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=HEADERS) as resp:
            if resp.status == 200:
                data = await resp.json()
                return data[0] if data else None
    return None


async def supabase_update_order_status(order_id: str, new_status: str) -> bool:
    """Actualiza el estado de la orden en Supabase."""
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        logger.info(f"[MOCK] Orden {order_id} actualizada a {new_status}")
        return True

    url = f"{SUPABASE_URL}/rest/v1/orders?id=eq.{order_id}"
    payload = {"status": new_status, "updated_at": datetime.utcnow().isoformat()}
    async with aiohttp.ClientSession() as session:
        async with session.patch(url, headers=HEADERS, json=payload) as resp:
            return resp.status in (200, 204)


async def send_telegram_message(chat_id: str, text: str, reply_markup: Optional[dict] = None):
    """Envía un mensaje de texto por Telegram."""
    if not TELEGRAM_BOT_TOKEN:
        logger.warning(f"[MOCK TELEGRAM] Enviado a {chat_id}: {text}")
        return

    payload = {"chat_id": chat_id, "text": text, "parse_mode": "Markdown"}
    if reply_markup:
        payload["reply_markup"] = reply_markup

    async with aiohttp.ClientSession() as session:
        await session.post(f"{TELEGRAM_API_URL}/sendMessage", json=payload)


async def answer_callback_query(callback_query_id: str, text: str, show_alert: bool = True):
    """Responde al pop-up táctil de Telegram."""
    if not TELEGRAM_BOT_TOKEN:
        return
    payload = {
        "callback_query_id": callback_query_id,
        "text": text,
        "show_alert": show_alert
    }
    async with aiohttp.ClientSession() as session:
        await session.post(f"{TELEGRAM_API_URL}/answerCallbackQuery", json=payload)


async def handle_callback_query(cb: dict):
    """Procesa los clics en los botones inline del bot."""
    cb_id = cb.get("id")
    data = cb.get("data", "")
    msg = cb.get("message", {})
    chat_id = msg.get("chat", {}).get("id")
    msg_id = msg.get("message_id")

    if "_" not in data:
        await answer_callback_query(cb_id, "Acción desconocida", show_alert=False)
        return

    action, order_id = data.split("_", 1)

    if action == "approve":
        success = await supabase_update_order_status(order_id, "in_progress")
        status_msg = "✅ ¡Orden Aprobada! El worker comenzará el despacho ahora."
        alert_msg = "Aprobado: La barra de progreso del cliente se activó en vivo."
    elif action == "queue":
        success = await supabase_update_order_status(order_id, "queued")
        status_msg = "⏳ Orden Puesta en Cola Manual de Verificación."
        alert_msg = "En cola: Asignación pendiente."
    elif action == "reject":
        success = await supabase_update_order_status(order_id, "rejected")
        status_msg = "❌ Comprobante marcado como inválido o ilegible."
        alert_msg = "Rechazado."
    else:
        status_msg = "Acción no reconocida."
        alert_msg = ""

    await answer_callback_query(cb_id, alert_msg)

    # Actualizar texto del mensaje en Telegram
    if TELEGRAM_BOT_TOKEN and chat_id and msg_id:
        edit_payload = {
            "chat_id": chat_id,
            "message_id": msg_id,
            "text": f"{msg.get('text', '')}\n\n👉 *RESOLUCIÓN:* {status_msg}",
            "parse_mode": "Markdown"
        }
        async with aiohttp.ClientSession() as session:
            await session.post(f"{TELEGRAM_API_URL}/editMessageText", json=edit_payload)


async def poll_telegram_updates():
    """Bucle principal de escucha de comandos y callbacks de Telegram."""
    if not TELEGRAM_BOT_TOKEN:
        logger.info("TELEGRAM_BOT_TOKEN no configurado. Bot en espera de credenciales.")
        logger.info("Para activar en vivo, exporta: TELEGRAM_BOT_TOKEN y TELEGRAM_ADMIN_CHAT_ID.")
        return

    logger.info("Iniciando Bot de Administración de Likes Mexicanos Reales...")
    offset = 0

    async with aiohttp.ClientSession() as session:
        while True:
            try:
                url = f"{TELEGRAM_API_URL}/getUpdates?offset={offset}&timeout=30"
                async with session.get(url, timeout=35) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        updates = data.get("result", [])
                        for u in updates:
                            offset = u["update_id"] + 1

                            # Manejo de botones inline
                            if "callback_query" in u:
                                await handle_callback_query(u["callback_query"])

                            # Manejo de comandos de texto
                            elif "message" in u and "text" in u["message"]:
                                text = u["message"]["text"].strip()
                                chat_id = u["message"]["chat"]["id"]

                                if text.startswith("/start"):
                                    await send_telegram_message(
                                        chat_id,
                                        "🇲🇽 *Centro de Mando - Likes Mexicanos Reales*\n\n"
                                        "Bot operativo listo para recibir comprobantes SPEI y OXXO.\n"
                                        "Comandos disponibles:\n"
                                        "/pending - Ver órdenes esperando verificación\n"
                                        "/stats - Ver métricas de entrega de hoy"
                                    )
                                elif text.startswith("/pending"):
                                    await send_telegram_message(chat_id, "🔍 Consultando órdenes pendientes en Supabase...")
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"Error en polling: {e}")
                await asyncio.sleep(5)


if __name__ == "__main__":
    try:
        asyncio.run(poll_telegram_updates())
    except KeyboardInterrupt:
        logger.info("Bot detenido manualmente.")
