import React, { useState, useMemo, useEffect } from 'react';
import { ShieldCheck, Zap, Sparkles, Check, ArrowRight, MessageSquare, CreditCard, Clock, Star, Gift, Flame, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../config/siteConfig';

const PLATFORM_DATA = {
  instagram: {
    id: 'instagram',
    name: 'Instagram MX',
    icon: '📸',
    color: '#FF005C',
    services: [
      {
        id: 'ig-likes',
        name: 'Likes Mexicanos Reales',
        desc: 'Interacciones de perfiles activos con nombres, fotos y actividad verificada en México.',
        type: 'units',
        min: 500,
        max: 50000,
        step: 500,
        baseUnitPrice: 0.298, // $149 for 500
        popularQty: 1000,
        presets: [500, 1000, 2500, 5000, 10000, 25000],
        deliveryEstimate: 'Comienza en 5-15 min',
      },
      {
        id: 'ig-followers',
        name: 'Seguidores Mexicanos Reales',
        desc: 'Audiencia de alta retención geolocalizada en CDMX, Monterrey, Guadalajara y todo el país.',
        type: 'units',
        min: 500,
        max: 25000,
        step: 500,
        baseUnitPrice: 0.56, // $280 for 500
        popularQty: 2500,
        presets: [500, 1000, 2500, 5000, 10000],
        deliveryEstimate: 'Comienza en 15-30 min',
      },
      {
        id: 'ig-comments',
        name: 'Comentarios Personalizados MX',
        desc: 'Comentarios auténticos en español neutro mexicano adaptados al nicho de tu marca.',
        type: 'comments',
        min: 25,
        max: 500,
        step: 25,
        baseUnitPrice: 7.6, // $190 for 25
        popularQty: 50,
        presets: [25, 50, 100, 200],
        deliveryEstimate: 'Comienza en 20 min',
      },
    ],
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook MX',
    icon: '📘',
    color: '#1877F2',
    services: [
      {
        id: 'fb-followers',
        name: 'Seguidores de Fanpage MX',
        desc: 'Crecimiento de páginas comerciales con perfiles mexicanos activos para generar confianza comercial.',
        type: 'units',
        min: 500,
        max: 25000,
        step: 500,
        baseUnitPrice: 0.58, // $290 for 500
        popularQty: 1000,
        presets: [500, 1000, 2500, 5000, 10000],
        deliveryEstimate: 'Comienza en 15 min',
      },
      {
        id: 'fb-likes',
        name: 'Likes en Post / Foto FB',
        desc: 'Reacciones (Me Gusta, Me Encanta) de cuentas mexicanas en tus publicaciones.',
        type: 'units',
        min: 500,
        max: 20000,
        step: 500,
        baseUnitPrice: 0.32,
        popularQty: 1000,
        presets: [500, 1000, 2500, 5000],
        deliveryEstimate: 'Comienza en 10 min',
      },
    ],
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok Viral MX',
    icon: '🎵',
    color: '#00F59B',
    services: [
      {
        id: 'tt-views',
        name: 'Vistas / Reproducciones MX',
        desc: 'Vistas y reproducciones geolocalizadas para activar el algoritmo de Para Ti en México.',
        type: 'views',
        min: 5000,
        max: 100000,
        step: 5000,
        baseUnitPrice: 0.024, // $120 for 5,000
        popularQty: 10000,
        presets: [5000, 10000, 25000, 50000, 100000],
        deliveryEstimate: 'Comienza en 5 min',
      },
      {
        id: 'tt-followers',
        name: 'Seguidores TikTok México',
        desc: 'Perfiles latinos con actividad para desbloquear directos y link en biografía.',
        type: 'units',
        min: 500,
        max: 20000,
        step: 500,
        baseUnitPrice: 0.52,
        popularQty: 1000,
        presets: [500, 1000, 2500, 5000],
        deliveryEstimate: 'Comienza en 15 min',
      },
    ],
  },
  gmaps: {
    id: 'gmaps',
    name: 'Google Maps 5★',
    icon: '⭐',
    color: '#34A853',
    services: [
      {
        id: 'gm-reviews',
        name: 'Reseñas 5 Estrellas Local Guide',
        desc: 'Opiniones detalladas con texto natural, palabras clave de tu ciudad y perfiles verificados de México.',
        type: 'reviews',
        min: 5,
        max: 100,
        step: 5,
        baseUnitPrice: 26, // $130 for 5
        popularQty: 15,
        presets: [5, 10, 15, 25, 50],
        deliveryEstimate: 'Entrega dosificada (1-3 por día)',
      },
    ],
  },
};

export default function ServiceCalculator({ onOpenCheckout, recommendation }) {
  const [platform, setPlatform] = useState('instagram');
  const [serviceIndex, setServiceIndex] = useState(0);
  const [quantity, setQuantity] = useState(1000);
  const { addItem } = useCart();

  // If recommendation comes from ProfileAuditWidget, apply it
  useEffect(() => {
    if (recommendation) {
      if (recommendation.serviceId?.includes('facebook')) {
        setPlatform('facebook');
        setServiceIndex(0);
      } else if (recommendation.serviceId?.includes('gmaps')) {
        setPlatform('gmaps');
        setServiceIndex(0);
      } else {
        setPlatform('instagram');
        setServiceIndex(recommendation.serviceId?.includes('follower') ? 1 : 0);
      }
      if (recommendation.recommendedQuantity) {
        setQuantity(recommendation.recommendedQuantity);
      }
    }
  }, [recommendation]);

  const currentPlatform = PLATFORM_DATA[platform];
  const currentService = currentPlatform.services[serviceIndex] || currentPlatform.services[0];

  // Adjust quantity when changing service
  const handleSelectService = (idx) => {
    setServiceIndex(idx);
    const targetService = currentPlatform.services[idx];
    setQuantity(targetService.popularQty);
  };

  const handleSelectPlatform = (key) => {
    setPlatform(key);
    setServiceIndex(0);
    setQuantity(PLATFORM_DATA[key].services[0].popularQty);
  };

  // Pricing formula with volume discount
  const calculation = useMemo(() => {
    const minQ = currentService.min;
    const maxQ = currentService.max;
    const clampedQ = Math.max(minQ, Math.min(maxQ, quantity));

    const rawTotal = clampedQ * currentService.baseUnitPrice;

    // Volume discount tiers:
    let discountPct = 0;
    if (clampedQ >= minQ * 10) discountPct = 0.28;
    else if (clampedQ >= minQ * 5) discountPct = 0.20;
    else if (clampedQ >= minQ * 2) discountPct = 0.12;

    const discountedPrice = Math.round(rawTotal * (1 - discountPct));
    const oldPrice = Math.round(rawTotal * 1.35);
    const savings = oldPrice - discountedPrice;

    return {
      finalPrice: discountedPrice,
      oldPrice,
      savings,
      discountPct: Math.round(discountPct * 100),
      clampedQ,
    };
  }, [quantity, currentService]);

  const unitLabel = currentService.type === 'comments'
    ? 'Comentarios'
    : currentService.type === 'views'
    ? 'Vistas'
    : currentService.type === 'reviews'
    ? 'Reseñas 5★'
    : 'Perfiles / Likes';

  const packageSummary = {
    platform: currentPlatform.name,
    service: currentService.name,
    tierLabel: `${calculation.clampedQ.toLocaleString('es-MX')} ${unitLabel}`,
    price: calculation.finalPrice,
    oldPrice: calculation.oldPrice,
    save: `Ahorras $${calculation.savings} MXN`,
    delivery: currentService.deliveryEstimate,
    serviceId: currentService.id,
    quantity: calculation.clampedQ,
  };

  const handleAddToCart = () => {
    addItem({
      id: `${currentPlatform.id}_${currentService.id}_${calculation.clampedQ}`,
      title: `${calculation.clampedQ.toLocaleString('es-MX')} ${currentService.name}`,
      category: currentPlatform.name,
      quantity: 1,
      unitPrice: calculation.finalPrice,
      serviceId: currentService.id,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Likes Mexicanos 🇲🇽, coticé en su web:\n\n• Servicio: ${currentService.name} (${currentPlatform.name})\n• Cantidad: ${calculation.clampedQ.toLocaleString('es-MX')} ${unitLabel}\n• Total cotizado: $${calculation.finalPrice} MXN\n• Ahorro: $${calculation.savings} MXN\n\n¿Tienen disponibilidad para entrega hoy?`
  );

  return (
    <div className="relative bg-[#090D18] border-t border-white/20 border-x border-white/5 border-b border-black/80 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden mt-8 linear-card">
      {/* Background neon ambient (0% GPU blur) */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(0,245,155,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(255,0,92,0.12) 0%, transparent 70%)' }}
      />

      {/* 1. Selector de Plataforma */}
      <div className="mb-8 relative z-10">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">
          1. Selecciona la red social o plataforma en México
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {Object.values(PLATFORM_DATA).map((p) => {
            const active = platform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPlatform(p.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
                  active
                    ? 'bg-white/10 border-[#00F59B] text-white shadow-lg shadow-[#00F59B]/10 scale-[1.02]'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/20'
                }`}
              >
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <div className="font-extrabold text-sm text-white">{p.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">100% Mexicano</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Selector de Servicio Específico */}
      <div className="mb-8 relative z-10">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">
          2. Tipo de Interacción para {currentPlatform.name}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currentPlatform.services.map((svc, idx) => {
            const active = serviceIndex === idx;
            return (
              <button
                key={svc.id}
                onClick={() => handleSelectService(idx)}
                className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                  active
                    ? 'bg-gradient-to-br from-[#00F59B]/15 to-transparent border-[#00F59B] text-white shadow-md'
                    : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-white">{svc.name}</span>
                  {active && <Check className="w-4 h-4 text-[#00F59B] stroke-[3]" />}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{svc.desc}</p>
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span>Entrega: {svc.deliveryEstimate.split(' ')[0]} {svc.deliveryEstimate.split(' ')[1]}</span>
                  <span className="text-slate-500">Desde ${Math.round(svc.min * svc.baseUnitPrice)} MXN</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Slider de Volumen Dinámico & Presets */}
      <div className="mb-8 relative z-10 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-widest block">
              3. Ajusta el tamaño de tu paquete
            </label>
            <span className="text-xs text-slate-400">
              Descuento automático de hasta el 28% por volumen
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#00F59B] font-mono">
              {quantity.toLocaleString('es-MX')}
            </span>
            <span className="text-sm font-bold text-slate-300 font-mono uppercase">
              {unitLabel}
            </span>
            {calculation.discountPct > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#FF005C]/20 text-[#FF005C] border border-[#FF005C]/30 text-[10px] font-bold">
                -{calculation.discountPct}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Range Input */}
        <input
          type="range"
          min={currentService.min}
          max={currentService.max}
          step={currentService.step}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00F59B] focus:outline-none"
        />

        {/* Quick Presets Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 mr-1">Cantidades populares:</span>
          {currentService.presets.map((preset) => (
            <button
              key={preset}
              onClick={() => setQuantity(preset)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all border ${
                quantity === preset
                  ? 'bg-[#00F59B] text-slate-950 border-[#00F59B] shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border-white/5'
              }`}
            >
              {preset.toLocaleString('es-MX')}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Live Summary Box with Checkout, Cart & WhatsApp Button */}
      <div className="p-6 sm:p-7 rounded-2xl bg-black/70 border border-[#00F59B]/30 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 shadow-2xl">
        <div className="space-y-1.5 text-center lg:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#00F59B]/15 text-[#00F59B] text-[11px] font-bold uppercase tracking-wider">
              {currentPlatform.name}
            </span>
            <span className="text-xs text-slate-400">• {currentService.name}</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-black text-white">
            {quantity.toLocaleString('es-MX')} {unitLabel} de México
          </h4>
          <p className="text-xs text-slate-400 max-w-xl">
            {currentService.desc} • Sin contraseñas requeridas • Garantía 30 días contra caídas.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-400 justify-center lg:justify-start">
            <span className="flex items-center gap-1 text-emerald-300">
              <Clock className="w-3.5 h-3.5" /> {currentService.deliveryEstimate}
            </span>
            <span className="flex items-center gap-1 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" /> 30 días de reposición sin caídas
            </span>
            <span className="flex items-center gap-1 text-emerald-300">
              <CreditCard className="w-3.5 h-3.5" /> OXXO Pay &amp; SPEI
            </span>
          </div>
        </div>

        {/* Pricing & Triple CTAs */}
        <div className="text-center lg:text-right flex-shrink-0 space-y-3">
          <div>
            <div className="flex items-baseline justify-center lg:justify-end gap-2">
              <span className="text-3xl sm:text-5xl font-black text-white font-mono">
                ${calculation.finalPrice}
              </span>
              <span className="text-sm font-bold text-[#00F59B]">MXN</span>
            </div>
            {calculation.oldPrice > calculation.finalPrice && (
              <span className="text-xs text-slate-500 line-through block font-mono">
                Precio regular: ${calculation.oldPrice} MXN
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
              title="Agregar al carrito multi-servicio"
            >
              <ShoppingBag className="w-4 h-4 text-[#00F59B]" />
              <span>+ Carrito</span>
            </button>

            {/* Express Checkout 1-Click Button */}
            <button
              onClick={() => onOpenCheckout && onOpenCheckout(packageSummary)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF005C] to-[#7928CA] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-[#FF005C]/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Comprar en 1 Clic</span>
            </button>

            {/* Direct WhatsApp Order */}
            <a
              href={SITE_CONFIG.getWhatsappUrl(
                `Hola Likes Mexicanos 🇲🇽, coticé en su web:\n\n• Servicio: ${currentService.name} (${currentPlatform.name})\n• Cantidad: ${calculation.clampedQ.toLocaleString('es-MX')} ${unitLabel}\n• Total cotizado: $${calculation.finalPrice} MXN\n• Ahorro: $${calculation.savings} MXN\n\n¿Tienen disponibilidad para entrega hoy?`
              )}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#00F59B] to-teal-500 hover:from-[#00F59B]/90 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-[#00F59B]/25 flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 will-change-transform"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp 🇲🇽</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
