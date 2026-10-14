import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const BASE_NOTIFICATIONS = [
  {
    id: 'notif_dental_mty',
    name: 'Clínica Dental',
    city: 'Monterrey, N.L.',
    action: 'acaba de contratar 25 Reseñas Google Maps 5★ hace 4 min (vía SPEI)',
    time: 'hace 4 min',
    tag: 'SPEI Acreditado 🇲🇽',
    tagColor: 'bg-[#00F59B]/20 text-[#00F59B] border-[#00F59B]/40',
    avatar: '🦷',
    packageData: { platform: 'Google Maps', service: 'Reseñas 5★ Local Guide', tierLabel: '25 Reseñas 5★', price: 690, quantity: 25, serviceId: 'gmaps_reviews_mx' },
  },
  {
    id: 'notif_1',
    name: 'Carlos Mendoza',
    city: 'Guadalajara, Jal.',
    action: 'acaba de comprar 1,000 Likes Mexicanos para Facebook',
    time: 'hace 2 min',
    tag: 'Facebook MX',
    tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    avatar: '👨‍💼',
    packageData: { platform: 'Facebook', service: 'Likes Mexicanos Reales', tierLabel: '1,000 Likes MX', price: 199, quantity: 1000, serviceId: 'facebook_likes_mx' },
  },
  {
    id: 'notif_2',
    name: 'Mariana Elizondo',
    city: 'San Pedro, MTY',
    action: 'adquirió 2,500 Seguidores Mexicanos de Instagram',
    time: 'hace 6 min',
    tag: 'Instagram MX',
    tagColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    avatar: '👩‍🦰',
    packageData: { platform: 'Instagram', service: 'Seguidores Mexicanos', tierLabel: '2,500 Seguidores MX', price: 490, quantity: 2500, serviceId: 'instagram_followers_mx' },
  },
  {
    id: 'notif_3',
    name: 'Taquería El Pastor',
    city: 'Roma Norte, CDMX',
    action: 'activó 15,000 Vistas TikTok geolocalizadas',
    time: 'hace 1 min',
    tag: 'TikTok Viral',
    tagColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    avatar: '🌮',
    packageData: { platform: 'TikTok', service: 'Vistas & Likes TikTok', tierLabel: '15,000 Vistas MX', price: 280, quantity: 15000, serviceId: 'tiktok_views_mx' },
  },
];

export default function SocialProofToast({ onSelectToast }) {
  const [notifications, setNotifications] = useState(BASE_NOTIFICATIONS);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Merge with real saved orders from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('lmx_orders_store_v2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const mapped = parsed.slice(0, 3).map((o, idx) => ({
            id: `real_${o.order_code || idx}`,
            name: o.target_handle ? `Cliente ${o.target_handle}` : 'Usuario Verificado',
            city: 'México',
            action: `adquirió ${o.quantity?.toLocaleString() || '1,000'} ${o.service_name} vía ${o.payment_method}`,
            time: 'hace unos momentos',
            tag: 'Orden Real Verificada 🇲🇽',
            tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
            avatar: '⚡',
            packageData: {
              platform: 'México',
              service: o.service_name,
              tierLabel: `${o.quantity} Interacciones`,
              price: o.total_amount_mxn,
              quantity: o.quantity,
              serviceId: o.service_id,
            },
          }));
          setNotifications([...mapped, ...BASE_NOTIFICATIONS]);
        }
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (dismissed) return;

    const firstTimeout = setTimeout(() => {
      setVisible(true);
    }, 3500);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 700);
    }, 35000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [dismissed, notifications.length]);

  if (dismissed || notifications.length === 0) return null;

  const current = notifications[index] || notifications[0];

  const handleCta = (e) => {
    e.stopPropagation();
    if (onSelectToast && current.packageData) {
      onSelectToast(current.packageData);
    }
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-[100] max-w-sm w-[90vw] transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
      }`}
    >
      <div className="relative p-3.5 sm:p-4 rounded-2xl bg-[#0B101D]/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80 flex flex-col gap-2.5 group">
        {/* Glow corner (0% GPU blur) */}
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(255,0,92,0.2) 0%, transparent 70%)' }}
        />

        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg flex-shrink-0 border border-white/10">
            {current.avatar}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-white font-bold text-xs truncate">{current.name}</span>
              <span className="text-[10px] text-slate-400 font-mono">({current.city})</span>
            </div>

            <p className="text-xs text-slate-300 leading-snug line-clamp-2">
              {current.action}
            </p>

            <div className="flex items-center gap-2 mt-1.5">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${current.tagColor}`}>
                {current.tag}
              </span>
              <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-pulse" />
                {current.time}
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
            }}
            className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
            title="Cerrar notificaciones"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CRO-04: Hot CTA inside Toast */}
        <button
          type="button"
          onClick={handleCta}
          className="w-full py-1.5 px-3 rounded-xl bg-[#00F59B]/15 hover:bg-[#00F59B]/25 text-[#00F59B] border border-[#00F59B]/30 font-bold text-xs flex items-center justify-between transition-colors"
        >
          <span>Quiero este mismo paquete</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Micro progress bar */}
        <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00F59B] to-[#FF005C] animate-[shimmer_20s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}
