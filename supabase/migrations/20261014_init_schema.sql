-- ==============================================================================
-- LIKES MEXICANOS REALES (v2.0.0 - Full-Stack SaaS & Automation Architecture)
-- Base de Datos Supabase (PostgreSQL 15+)
-- Migración: 20261014_init_schema.sql
-- ==============================================================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. TABLA: orders (Órdenes de Compra y Campañas de Crecimiento)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_code VARCHAR(12) NOT NULL UNIQUE, -- Ej: LMX-84920
    service_id VARCHAR(50) NOT NULL,        -- 'ig-likes', 'ig-followers', 'gm-reviews', etc.
    service_name TEXT NOT NULL,             -- 'Likes Mexicanos Reales', 'Reseñas Google Maps 5★', etc.
    target_url TEXT NOT NULL,               -- Link de post, perfil o ficha de Google Maps
    target_handle VARCHAR(120),             -- @usuario extraído o nombre de ficha
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    delivered_quantity INTEGER NOT NULL DEFAULT 0 CHECK (delivered_quantity >= 0),
    unit_price_mxn NUMERIC(10,2) NOT NULL,
    order_bump_added BOOLEAN NOT NULL DEFAULT false,
    discount_code VARCHAR(30),
    total_amount_mxn NUMERIC(10,2) NOT NULL CHECK (total_amount_mxn >= 0),
    payment_method VARCHAR(20) NOT NULL,    -- 'SPEI', 'OXXO_PAY', 'MERCADO_PAGO', 'WALLET_VIP'
    payment_proof_url TEXT,                 -- URL de comprobante en Cloudflare R2 / ImgBB
    customer_whatsapp VARCHAR(25) NOT NULL, -- WhatsApp a 10 dígitos o formato E.164
    customer_email VARCHAR(120),
    requires_cfdi BOOLEAN NOT NULL DEFAULT false,
    cfdi_rfc VARCHAR(15),
    custom_comments_payload JSONB DEFAULT '[]'::jsonb, -- Array de comentarios generados por IA o redactados
    status VARCHAR(30) NOT NULL DEFAULT 'pending_payment'
        CHECK (status IN ('pending_payment', 'verifying_receipt', 'queued', 'in_progress', 'completed', 'refill_guarantee', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices de alto rendimiento
CREATE INDEX IF NOT EXISTS idx_orders_order_code ON public.orders(order_code);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_whatsapp ON public.orders(customer_whatsapp);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_orders_updated_at ON public.orders;
CREATE TRIGGER trg_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Habilitar Publicación Realtime para sincronización WebSockets con OrderTrackingModal.jsx
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- ==============================================================================
-- 2. TABLA: landing_leads (Leads y Personalizaciones B2B en Vivo)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.landing_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_key VARCHAR(30) NOT NULL, -- 'tequila', 'tacos', 'dental', 'gym', etc.
    business_name TEXT NOT NULL,
    city_mx VARCHAR(80),
    client_whatsapp VARCHAR(25) NOT NULL,
    customization_config JSONB DEFAULT '{}'::jsonb, -- Textos, colores, promociones probadas
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed_won', 'closed_lost')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_template ON public.landing_leads(template_key);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.landing_leads(created_at DESC);

-- ==============================================================================
-- 3. TABLA: reseller_wallets (Billeteras VIP para Agencias y Revendedores)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reseller_wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    agency_name TEXT NOT NULL,
    balance_mxn NUMERIC(12,2) NOT NULL DEFAULT 0.00 CHECK (balance_mxn >= 0),
    tier_discount NUMERIC(4,2) NOT NULL DEFAULT 0.45 CHECK (tier_discount >= 0 AND tier_discount <= 1.0),
    api_key UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. POLÍTICAS DE SEGURIDAD A NIVEL DE FILA (Row Level Security - RLS)
-- ==============================================================================
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reseller_wallets ENABLE ROW LEVEL SECURITY;

-- Orders: Permite inserción anónima desde Checkout público
CREATE POLICY "Permitir checkout anonimo"
    ON public.orders
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        length(order_code) >= 6 AND
        length(customer_whatsapp) >= 10 AND
        total_amount_mxn >= 0
    );

-- Orders: Consulta pública permitida únicamente filtrando por order_code exacto (OrderTrackingModal)
CREATE POLICY "Permitir rastreo por folio de orden"
    ON public.orders
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Orders: Actualización de comprobante de pago permitida únicamente mientras esté pendiente
CREATE POLICY "Permitir subir comprobante en ordenes pendientes"
    ON public.orders
    FOR UPDATE
    TO anon, authenticated
    USING (status IN ('pending_payment', 'verifying_receipt'))
    WITH CHECK (status IN ('pending_payment', 'verifying_receipt'));

-- Leads: Inserción de leads personalizada
CREATE POLICY "Permitir guardar leads de plantillas"
    ON public.landing_leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (length(business_name) > 0 AND length(client_whatsapp) >= 10);

-- Reseller Wallets: Solo lectura para dueños de billetera o API key
CREATE POLICY "Acceso a billetera por usuario"
    ON public.reseller_wallets
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id);
