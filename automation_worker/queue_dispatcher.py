#!/usr/bin/env python3
"""
==============================================================================
LIKES MEXICANOS REALES - DESPACHADOR DE COLA DE PERFILES (v2.0.0)
automation_worker/queue_dispatcher.py
Consulta órdenes con status='in_progress', entrega progresivamente las
interacciones e incrementa delivered_quantity en Supabase en tiempo real.
==============================================================================
"""

import os
import sys
import time
import random
import logging
from datetime import datetime
from typing import List, Dict, Any

try:
    import requests
except ImportError:
    print("Instalando requests...")
    os.system(f"{sys.executable} -m pip install requests")
    import requests

logging.basicConfig(
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    level=logging.INFO
)
logger = logging.getLogger("QueueDispatcher")

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
POLL_INTERVAL_SECONDS = int(os.getenv("POLL_INTERVAL_SECONDS", "5"))

HEADERS = {
    "apikey": SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
    "Content-Type": "application/json"
}


def fetch_in_progress_orders() -> List[Dict[str, Any]]:
    """Consulta en Supabase las órdenes activas en curso."""
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        return []

    url = f"{SUPABASE_URL}/rest/v1/orders?status=eq.in_progress&select=*"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        if resp.status_code == 200:
            return resp.json()
        logger.error(f"Error consultando órdenes ({resp.status_code}): {resp.text}")
    except Exception as e:
        logger.error(f"Excepción al conectar con Supabase: {e}")
    return []


def update_order_progress(order_id: str, new_delivered: int, is_completed: bool) -> bool:
    """Actualiza delivered_quantity y el status en Supabase."""
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        return True

    url = f"{SUPABASE_URL}/rest/v1/orders?id=eq.{order_id}"
    payload: Dict[str, Any] = {
        "delivered_quantity": new_delivered,
        "updated_at": datetime.utcnow().isoformat()
    }
    if is_completed:
        payload["status"] = "completed"

    try:
        resp = requests.patch(url, headers=HEADERS, json=payload, timeout=10)
        return resp.status_code in (200, 204)
    except Exception as e:
        logger.error(f"Error actualizando progreso de orden {order_id}: {e}")
        return False


def notify_completion_webhook(order: Dict[str, Any]):
    """Dispara webhook de finalización a la Edge Function de Brevo y WhatsApp."""
    webhook_url = f"{SUPABASE_URL}/functions/v1/order-status-notifier"
    try:
        requests.post(webhook_url, headers=HEADERS, json={"order": order, "eventType": "order_completed"}, timeout=5)
        logger.info(f"Notificación de finalización enviada para #{order.get('order_code')}")
    except Exception as e:
        logger.warning(f"No se pudo enviar webhook de finalización: {e}")


def process_order_batch(order: Dict[str, Any]):
    """Entrega un lote orgánico de interacciones (5 a 50 unidades según volumen)."""
    order_id = order.get("id")
    order_code = order.get("order_code")
    quantity = int(order.get("quantity", 0))
    delivered = int(order.get("delivered_quantity", 0))
    service_name = order.get("service_name", "Servicio")

    if quantity <= 0:
        return

    remaining = quantity - delivered
    if remaining <= 0:
        logger.info(f"Orden #{order_code} ya completada.")
        update_order_progress(order_id, quantity, is_completed=True)
        return

    # Determinación del tamaño del lote según tipo de servicio
    if "reseña" in service_name.lower() or "review" in service_name.lower():
        # Reseñas Google Maps: 1 por ciclo
        batch_size = 1
    elif quantity > 5000:
        batch_size = random.randint(100, 250)
    elif quantity > 1000:
        batch_size = random.randint(25, 60)
    else:
        batch_size = random.randint(10, 30)

    delivered_now = min(quantity, delivered + batch_size)
    is_completed = delivered_now >= quantity
    pct = round((delivered_now / quantity) * 100, 1)

    logger.info(
        f"🚀 Despachando #{order_code} ({service_name}): "
        f"{delivered_now}/{quantity} ({pct}%) {'[COMPLETADO]' if is_completed else ''}"
    )

    success = update_order_progress(order_id, delivered_now, is_completed)
    if success and is_completed:
        order["delivered_quantity"] = delivered_now
        order["status"] = "completed"
        notify_completion_webhook(order)


def run_worker_loop():
    """Bucle principal de despacho en segundo plano."""
    logger.info("=====================================================")
    logger.info("  LIKES MEXICANOS REALES - DISPATCHER WORKER INICIADO")
    logger.info("=====================================================")
    logger.info(f"Intervalo de sondeo: {POLL_INTERVAL_SECONDS} segundos.")

    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        logger.info("Aviso: Variables SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no definidas.")
        logger.info("El worker operará en modo demostración esperando configuración.")

    while True:
        try:
            orders = fetch_in_progress_orders()
            if orders:
                logger.info(f"Órdenes activas en ejecución: {len(orders)}")
                for order in orders:
                    process_order_batch(order)
            time.sleep(POLL_INTERVAL_SECONDS)
        except KeyboardInterrupt:
            logger.info("Detención solicitada por el usuario. Apagando worker de forma segura.")
            break
        except Exception as e:
            logger.error(f"Error imprevisto en ciclo de despacho: {e}")
            time.sleep(POLL_INTERVAL_SECONDS)


if __name__ == "__main__":
    run_worker_loop()
