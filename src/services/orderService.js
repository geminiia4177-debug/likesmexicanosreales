import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const LOCAL_STORAGE_KEY = 'lmx_orders_store_v2';
const LEADS_STORAGE_KEY = 'lmx_landing_leads_v2';

// Helper to get local orders
function getLocalOrders() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Helper to save local orders
function saveLocalOrders(orders) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error caching order locally:', e);
  }
}

// Generate code like LMX-84920
export function generateOrderCode() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `LMX-${num}`;
}

/**
 * Create or persist order in Supabase & Local Cache
 */
export async function createOrder(orderPayload) {
  const orderCode = orderPayload.order_code || generateOrderCode();
  const newOrder = {
    id: crypto.randomUUID ? crypto.randomUUID() : `ord_${Date.now()}`,
    order_code: orderCode,
    service_id: orderPayload.service_id || 'general_mx',
    service_name: orderPayload.service_name || 'Servicio Digital México',
    target_url: orderPayload.target_url || '',
    target_handle: orderPayload.target_handle || '',
    quantity: Number(orderPayload.quantity) || 100,
    delivered_quantity: 0,
    unit_price_mxn: Number(orderPayload.unit_price_mxn) || 0,
    order_bump_added: Boolean(orderPayload.order_bump_added),
    discount_code: orderPayload.discount_code || null,
    total_amount_mxn: Number(orderPayload.total_amount_mxn) || 0,
    payment_method: orderPayload.payment_method || 'SPEI',
    payment_proof_url: orderPayload.payment_proof_url || null,
    customer_whatsapp: orderPayload.customer_whatsapp || '',
    customer_email: orderPayload.customer_email || '',
    requires_cfdi: Boolean(orderPayload.requires_cfdi),
    cfdi_rfc: orderPayload.cfdi_rfc || null,
    custom_comments_payload: orderPayload.custom_comments_payload || null,
    status: 'pending_payment',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Always cache locally so customer never loses it
  const localList = getLocalOrders();
  const existingIdx = localList.findIndex(o => o.order_code === orderCode);
  if (existingIdx >= 0) {
    localList[existingIdx] = { ...localList[existingIdx], ...newOrder };
  } else {
    localList.unshift(newOrder);
  }
  saveLocalOrders(localList);

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([newOrder])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert warning, using local persistence:', error);
      } else if (data) {
        return data;
      }
    } catch (err) {
      console.warn('Error connecting to Supabase, running with offline resilience:', err);
    }
  }

  return newOrder;
}

/**
 * Fetch order by exact order_code
 */
export async function getOrderByCode(orderCode) {
  if (!orderCode) return null;
  const cleanCode = orderCode.trim().toUpperCase();

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_code', cleanCode)
        .single();

      if (!error && data) {
        return data;
      }
    } catch (err) {
      console.warn('Error fetching order from Supabase:', err);
    }
  }

  // Fallback to local storage
  const localList = getLocalOrders();
  const found = localList.find(o => o.order_code === cleanCode);
  return found || null;
}

/**
 * Update payment proof receipt and set status to 'verifying_receipt'
 */
export async function submitPaymentProof(orderCode, proofUrlOrBase64) {
  const cleanCode = orderCode.trim().toUpperCase();
  const updatePayload = {
    payment_proof_url: proofUrlOrBase64,
    status: 'verifying_receipt',
    updated_at: new Date().toISOString(),
  };

  // Update local
  const localList = getLocalOrders();
  const idx = localList.findIndex(o => o.order_code === cleanCode);
  if (idx >= 0) {
    localList[idx] = { ...localList[idx], ...updatePayload };
    saveLocalOrders(localList);
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update(updatePayload)
        .eq('order_code', cleanCode)
        .select()
        .single();

      if (!error && data) return data;
    } catch (err) {
      console.warn('Error updating payment proof in Supabase:', err);
    }
  }

  return localList[idx] || updatePayload;
}

/**
 * Save Landing Lead from Live Customizer
 */
export async function saveLandingLead(leadData) {
  const lead = {
    id: crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`,
    template_key: leadData.template_key || 'tequila',
    business_name: leadData.business_name || '',
    city_mx: leadData.city_mx || '',
    client_whatsapp: leadData.client_whatsapp || '',
    customization_config: leadData.customization_config || {},
    created_at: new Date().toISOString(),
  };

  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(lead);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving local lead:', e);
  }

  if (isSupabaseConfigured) {
    try {
      await supabase.from('landing_leads').insert([lead]);
    } catch (err) {
      console.warn('Supabase lead insert notice:', err);
    }
  }

  return lead;
}

/**
 * Real-time Subscription to order updates
 */
export function subscribeToOrder(orderCode, onUpdate) {
  const cleanCode = orderCode.trim().toUpperCase();

  if (isSupabaseConfigured) {
    const channel = supabase
      .channel(`order-tracking-${cleanCode}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `order_code=eq.${cleanCode}`,
        },
        (payload) => {
          if (payload.new) {
            onUpdate(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  // Fallback storage listener for same-browser simulation
  const handleStorage = (e) => {
    if (e.key === LOCAL_STORAGE_KEY) {
      const orders = getLocalOrders();
      const current = orders.find(o => o.order_code === cleanCode);
      if (current) onUpdate(current);
    }
  };

  window.addEventListener('storage', handleStorage);
  return () => {
    window.removeEventListener('storage', handleStorage);
  };
}
