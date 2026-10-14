import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Award,
  Star,
  ShoppingBag,
  Truck,
  Check,
  ArrowRight,
  Sparkles,
  GlassWater,
  Droplets,
  Flame,
  HelpCircle,
  Lock,
  Plus,
  Minus,
  Gift,
  X
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TequilaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone, isCustomized } = useLandingCustomizer();

  const brandTitle = businessName || 'Hacienda El Alma';
  const brandLocation = city || 'Arandas, Altos de Jalisco, MX';

  // 1. Age Gate Modal (+18 años)
  const [ageVerified, setAgeVerified] = useState(() => {
    try {
      return sessionStorage.getItem('lmx_tequila_age_verified') === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleVerifyAge = (isLegal) => {
    if (isLegal) {
      setAgeVerified(true);
      try {
        sessionStorage.setItem('lmx_tequila_age_verified', 'true');
      } catch (e) {}
    } else {
      window.location.href = 'https://www.google.com';
    }
  };

  const [selectedEdition, setSelectedEdition] = useState('anejo');
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState('');

  // 2. Mix & Match Degustation Box (3 or 6 bottles)
  const [boxSize, setBoxSize] = useState(3); // 3 or 6
  const [boxBottles, setBoxBottles] = useState({ anejo: 1, cristalino: 1, mezcal: 1 });

  // 3. Laser Engraved Gift Message
  const [laserMessage, setLaserMessage] = useState('Para Papá con admiración');

  const editions = {
    anejo: {
      name: `${brandTitle} - Añejo Reserva 24 Meses`,
      subtitle: 'Barrica de Roble Francés & Esencia de Agave Silvestre',
      price: '$1,850 MXN',
      priceNum: 1850,
      abv: '40% Alc. Vol. (750 ml)',
      notes: ['Caramelo tostado', 'Vainilla de Papantla', 'Agave cocido', 'Madera noble'],
      pairing: 'Cortes finos, chocolate amargo oaxaqueño y puros premium.',
      badge: 'Edición Más Galardonada',
    },
    cristalino: {
      name: `${brandTitle} - Diamante Cristalino`,
      subtitle: 'Filtración en Carbón Activo & Pureza Extraordinaria',
      price: '$2,190 MXN',
      priceNum: 2190,
      abv: '38% Alc. Vol. (750 ml)',
      notes: ['Cítricos dulces', 'Flores silvestres', 'Pimienta blanca', 'Sedosidad cristalina'],
      pairing: 'Mariscos de Ensenada, ceviche blanco y quesos artesanales.',
      badge: 'Boutique Exclusiva',
    },
    mezcal: {
      name: `${brandTitle} Ancestral - Mezcal Espadín Silvestre`,
      subtitle: 'Destilado en Alambique de Cobre de San Dionisio, Oaxaca',
      price: '$1,650 MXN',
      priceNum: 1650,
      abv: '46% Alc. Vol. (750 ml)',
      notes: ['Ahumado sutil de leña de mezquite', 'Tierra húmeda', 'Frutos rojos secos'],
      pairing: 'Naranjas criollas con sal de chinicuil y moles tradicionales.',
      badge: 'Producción Limitada',
    },
  };

  const current = editions[selectedEdition];

  // Box calculations
  const totalBoxBottles = boxBottles.anejo + boxBottles.cristalino + boxBottles.mezcal;
  const rawBoxPrice =
    boxBottles.anejo * 1850 + boxBottles.cristalino * 2190 + boxBottles.mezcal * 1650;
  const boxDiscount = Math.round(rawBoxPrice * 0.15); // 15% OFF
  const finalBoxPrice = rawBoxPrice - boxDiscount;

  const updateBottleCount = (key, delta) => {
    setBoxBottles((prev) => {
      const nextCount = Math.max(0, prev[key] + delta);
      const nextTotal = totalBoxBottles - prev[key] + nextCount;
      if (nextTotal > boxSize) return prev;
      return { ...prev, [key]: nextCount };
    });
  };

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
    setNotification(`¡Agregaste 1x ${current.name} al carrito!`);
    setTimeout(() => setNotification(''), 4000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola ${brandTitle} 🇲🇽, quiero ordenar la botella ${current.name} (${current.price}).\n\n• Grabado láser personalizado en botella: "${laserMessage}"\n• Ubicación: ${brandLocation}\n\n¿Tienen entrega inmediata?`
  );

  const whatsappBoxMessage = encodeURIComponent(
    `Hola ${brandTitle} 🇲🇽, quiero ordenar la Caja de Degustación Mix & Match de ${boxSize} botellas:\n- Añejo: ${boxBottles.anejo}\n- Cristalino: ${boxBottles.cristalino}\n- Mezcal: ${boxBottles.mezcal}\n\nTotal con 15% OFF: $${finalBoxPrice} MXN (Ahorro $${boxDiscount} MXN).\nGrabado láser en caja: "${laserMessage}".`
  );

  return (
    <div className="min-h-screen bg-[#070504] text-[#E8DFD8] font-sans selection:bg-amber-600/40 relative">
      {/* Demo Conversion Bar */}
      <DemoConversionBar
        currentKey="tequila"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* 1. Age Gate Modal */}
      {!ageVerified && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
          <div className="relative w-full max-w-md bg-gradient-to-b from-[#18110B] to-[#0A0704] border border-amber-600/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl shadow-amber-950/80">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4 text-2xl font-serif">
              18+
            </div>
            <h3 className="text-2xl font-serif font-black text-amber-100 tracking-tight">
              Bienvenido a {brandTitle}
            </h3>
            <p className="text-xs text-stone-300 mt-2 leading-relaxed">
              Para ingresar a nuestra cava de destilados artesanales mexicanos, debes confirmar que cuentas con la mayoría de edad legal en tu país.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleVerifyAge(false)}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 text-xs font-semibold"
              >
                Soy menor de edad
              </button>
              <button
                onClick={() => handleVerifyAge(true)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-stone-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/20"
              >
                Soy mayor de edad (+18)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 text-amber-200 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-amber-800/40 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Envío express gratuito a toda la República Mexicana en compras de 2 o más botellas | Pagos vía OXXO y SPEI</span>
      </div>

      {/* Navigation */}
      <header className="sticky top-[49px] z-40 bg-[#070504]/90 backdrop-blur-md border-b border-amber-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition-colors"
              >
                ← Volver al Portal
              </button>
            )}
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-500" />
              <span className="font-serif tracking-widest text-lg sm:text-xl font-bold text-amber-100 uppercase">
                {brandTitle}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-stone-300">
            <a href="#ediciones" className="hover:text-amber-400 transition-colors">Colección Añejos</a>
            <a href="#degustacion" className="hover:text-amber-400 transition-colors">Caja Degustación (15% OFF)</a>
            <a href="#grabado" className="hover:text-amber-400 transition-colors">Grabado Láser</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={addToCart}
              className="relative p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-2 text-sm font-semibold"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black text-xs font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 border border-amber-500 text-amber-200 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Hero Section */}
      <section id="ediciones" className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Edition selector */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-400 text-xs font-semibold tracking-wider uppercase">
              <Award className="w-4 h-4" /> 100% Puro de Agave Azul Tequilana Weber • {brandLocation}
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-black text-amber-50 leading-[1.1] tracking-tight">
              La máxima devoción <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-yellow-600">
                al espíritu mexicano
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Destilado en pequeños lotes numerados en {brandLocation}. Madurado lentamente en barricas de roble tostado con denominación de origen protegida.
            </p>

            {/* Selector de Edición */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-stone-400 block mb-3 font-semibold">Seleccionar Edición Maestra:</span>
              <div className="grid grid-cols-3 gap-2.5 max-w-lg">
                {[
                  { id: 'anejo', label: 'Añejo Reserva', tag: 'Top Ventas' },
                  { id: 'cristalino', label: 'Diamante Cristal', tag: 'Boutique' },
                  { id: 'mezcal', label: 'Mezcal Silvestre', tag: 'Oaxaca' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedEdition(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      selectedEdition === item.id
                        ? 'bg-amber-950/80 border-amber-500 shadow-lg shadow-amber-950/40 text-white'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-amber-700/50'
                    }`}
                  >
                    <span className="text-xs block font-bold truncate">{item.label}</span>
                    <span className="text-[10px] text-amber-400/90 font-medium block">{item.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Spec Box */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-amber-900/40 backdrop-blur space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{current.badge}</span>
                  <h3 className="text-xl font-serif font-bold text-white">{current.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-400 font-serif">{current.price}</span>
                  <span className="text-[11px] text-stone-400 block">IVA incluido + Factura</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-stone-400 block mb-2 font-medium">Notas de cata aromáticas:</span>
                <div className="flex flex-wrap gap-2">
                  {current.notes.map(note => (
                    <span key={note} className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-stone-400 flex items-center gap-2">
                <GlassWater className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span><strong className="text-stone-300">Maridaje:</strong> {current.pairing}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={addToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Comprar Ahora ({current.price})
                </button>
                <a
                  href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  Pedir por WhatsApp 🇲🇽
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-stone-400 pt-2">
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-amber-400" /> DHL Express México (1-2 días)</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> OXXO Pay &amp; SPEI Seguro</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Bottle Presentation */}
          <div className="lg:col-span-5 relative space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_20px_70px_rgba(217,119,6,0.2)] group">
              <img
                src="/images/tequila.webp"
                alt="Tequila Artesanal Mexicano"
                loading="lazy"
                decoding="async"
                className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070504] via-transparent to-transparent opacity-80" />
              
              {/* Placa Dorada de Grabado Láser en Vivo */}
              {laserMessage && (
                <div className="absolute top-6 left-6 right-6 p-3 rounded-xl bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-stone-950 font-serif text-center shadow-2xl border border-amber-600/50 rotate-[-1deg] transition-all">
                  <span className="text-[9px] uppercase tracking-widest font-mono text-stone-800 block">Grabado en Madera:</span>
                  <span className="text-xs sm:text-sm font-bold tracking-wide italic">"{laserMessage}"</span>
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-amber-500/20 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-stone-300 ml-1">4.98 / 5</span>
                  </div>
                  <span className="text-xs text-stone-300">Medalla Gran Oro Bruselas 2025</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-400 font-mono font-bold">NOM-1414 CRT</span>
                  <span className="text-[10px] text-stone-400 block">Certificado Auténtico</span>
                </div>
              </div>
            </div>

            {/* 3. Grabador Láser Personalizado */}
            <div id="grabado" className="p-4 rounded-2xl bg-stone-900/90 border border-amber-600/30">
              <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1.5">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                Mensaje de Regalo Grabado en Láser (Gratis):
              </label>
              <input
                type="text"
                maxLength={45}
                value={laserMessage}
                onChange={(e) => setLaserMessage(e.target.value)}
                placeholder="Escribe tu dedicatoria para la botella..."
                className="w-full bg-[#120D09] border border-amber-600/30 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-amber-100 placeholder-stone-500 outline-none"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Previsualización en tiempo real sobre la placa dorada de arriba.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Armador de Caja de Degustación (Mix & Match) */}
      <section id="degustacion" className="py-16 px-6 bg-[#0B0907] border-y border-amber-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
              Personaliza tu Degustación
            </span>
            <h2 className="text-3xl font-serif font-black text-white mt-2">
              Arma tu Caja Mix &amp; Match con 15% OFF
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Combina tus botellas favoritas entre Añejo, Diamante Cristalino y Mezcal Ancestral.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/80 border border-amber-500/30 shadow-2xl">
            {/* Box Size Toggle */}
            <div className="flex justify-center gap-3 mb-6">
              {[3, 6].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setBoxSize(size);
                    setBoxBottles(size === 3 ? { anejo: 1, cristalino: 1, mezcal: 1 } : { anejo: 2, cristalino: 2, mezcal: 2 });
                  }}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    boxSize === size
                      ? 'bg-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/20'
                      : 'bg-white/5 text-stone-400 hover:text-white border border-white/10'
                  }`}
                >
                  Caja de {size} Botellas ({size === 3 ? 'Trilogía' : 'Colección Completa'})
                </button>
              ))}
            </div>

            {/* Bottle pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: 'anejo', name: 'Añejo 24 Meses', price: '$1,850' },
                { key: 'cristalino', name: 'Diamante Cristalino', price: '$2,190' },
                { key: 'mezcal', name: 'Mezcal Ancestral', price: '$1,650' },
              ].map((b) => (
                <div key={b.key} className="p-4 rounded-2xl bg-black/50 border border-amber-900/30 flex items-center justify-between">
                  <div>
                    <h4 className="text-white text-xs font-bold">{b.name}</h4>
                    <span className="text-[11px] text-amber-400 font-mono">{b.price} MXN</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-900 rounded-lg p-1 border border-stone-800">
                    <button
                      onClick={() => updateBottleCount(b.key, -1)}
                      className="p-1 text-stone-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs text-white font-bold w-4 text-center">
                      {boxBottles[b.key]}
                    </span>
                    <button
                      onClick={() => updateBottleCount(b.key, 1)}
                      className="p-1 text-stone-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary strip */}
            <div className="mt-6 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-stone-400">Botellas seleccionadas:</span>
                  <strong className={totalBoxBottles === boxSize ? 'text-emerald-400' : 'text-amber-400'}>
                    {totalBoxBottles} de {boxSize}
                  </strong>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-amber-400 font-serif">
                    ${finalBoxPrice.toLocaleString('es-MX')} MXN
                  </span>
                  <span className="text-xs text-stone-500 line-through">
                    ${rawBoxPrice.toLocaleString('es-MX')} MXN
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">
                    (Ahorras ${boxDiscount.toLocaleString('es-MX')} MXN)
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappBoxMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <span>Ordenar Caja con 15% OFF</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Heritage Band */}
      <section className="border-t border-amber-900/30 bg-stone-950/60 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-3xl font-serif font-black text-amber-400">100%</span>
            <span className="text-xs text-stone-400 uppercase tracking-widest mt-1 block">Agave Azul Tequilana</span>
          </div>
          <div>
            <span className="block text-3xl font-serif font-black text-amber-400">{brandLocation.split(',')[0]}</span>
            <span className="text-xs text-stone-400 uppercase tracking-widest mt-1 block">Origen Protegido MX</span>
          </div>
          <div>
            <span className="block text-3xl font-serif font-black text-amber-400">24 Meses</span>
            <span className="text-xs text-stone-400 uppercase tracking-widest mt-1 block">Añejamiento en Roble</span>
          </div>
          <div>
            <span className="block text-3xl font-serif font-black text-amber-400">Gratis</span>
            <span className="text-xs text-stone-400 uppercase tracking-widest mt-1 block">Envío Nacional DHL</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-stone-500 border-t border-amber-900/20">
        <p>© 2026 {brandTitle} S.A. de C.V. • Hecho en {brandLocation}. Evite el exceso.</p>
      </footer>
    </div>
  );
}
