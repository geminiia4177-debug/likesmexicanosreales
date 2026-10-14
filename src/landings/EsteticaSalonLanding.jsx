import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Star,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  Scissors,
  Check,
  Plus,
  Minus,
  Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function EsteticaSalonLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'MAISON GLOW · ATELIER BEAUTÉ';
  const brandCity = city || 'Polanco Masaryk & Roma Norte, CDMX';

  // Glow Ritual Package Builder State (multi-category selection)
  const [selectedHair, setSelectedHair] = useState('balayage');
  const [selectedNails, setSelectedNails] = useState('rusa');
  const [selectedFacial, setSelectedFacial] = useState('hydra');

  const hairOptions = {
    none: { name: 'Sin servicio capilar', price: 0, duration: 0, desc: 'Omitir cabello' },
    balayage: { name: 'Balayage Champagne Francés', price: 2650, duration: 180, desc: 'Difuminado orgánico a mano alzada, matiz gloss y plex reparador.' },
    botox: { name: 'Botox Capilar Vegano & Keratina', price: 1850, duration: 120, desc: 'Sellado térmico sin formol, brillo efecto espejo por 3 meses.' },
    corte_styling: { name: 'Corte Visagista & Styling Signature', price: 950, duration: 60, desc: 'Diagnóstico facial morfológico, lavado con masaje y ondas parisinas.' }
  };

  const nailsOptions = {
    none: { name: 'Sin servicio de uñas', price: 0, duration: 0, desc: 'Omitir uñas' },
    rusa: { name: 'Manicura Rusa Milimétrica & Gelish', price: 750, duration: 75, desc: 'Limpieza de cutícula con torno diamantado y esmaltado de alta duración.' },
    soft_gel: { name: 'Extensiones Soft Gel Esculpidas', price: 1150, duration: 105, desc: 'Alargamiento ligero con nivelación natural y diseño minimal chic.' },
    spa_pedi: { name: 'Pedicura Spa Jelly con Parafina', price: 850, duration: 60, desc: 'Exfoliación con sales de lavanda, mascarilla térmica y masaje podal.' }
  };

  const facialOptions = {
    none: { name: 'Sin tratamiento facial', price: 0, duration: 0, desc: 'Omitir facial' },
    hydra: { name: 'HydraFacial Glow & Drenaje Linfático', price: 1450, duration: 60, desc: 'Vortex-cleansing con ácido hialurónico, antioxidantes y máscara LED.' },
    dermapen: { name: 'Microneedling Dermapen con Péptidos', price: 1800, duration: 75, desc: 'Regeneración celular, atenuación de poros y luminosidad inmediata.' },
    lash_lifting: { name: 'Lifting de Pestañas & Laminado de Cejas', price: 890, duration: 60, desc: 'Curvatura natural de pestañas con keratina y diseño orgánico de cejas.' }
  };

  // Calculations
  const hair = hairOptions[selectedHair];
  const nails = nailsOptions[selectedNails];
  const facial = facialOptions[selectedFacial];

  const subtotal = hair.price + nails.price + facial.price;
  const totalDurationMinutes = hair.duration + nails.duration + facial.duration;

  // Combo Discount: if 2 services selected -> 10% off; if 3 services selected -> 20% off
  const activeCount = [selectedHair, selectedNails, selectedFacial].filter((k) => k !== 'none').length;
  let discountPercent = 0;
  if (activeCount === 2) discountPercent = 0.10;
  if (activeCount >= 3) discountPercent = 0.20;

  const discountAmount = Math.round(subtotal * discountPercent);
  const totalFinal = subtotal - discountAmount;

  const formatHours = (mins) => {
    if (mins === 0) return '0 min';
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;
    if (hrs > 0 && rem > 0) return `${hrs}h ${rem}min`;
    if (hrs > 0) return `${hrs} horas`;
    return `${rem} min`;
  };

  const handleBookGlowRitual = () => {
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '525512345678';
    const servicesList = [];
    if (selectedHair !== 'none') servicesList.push(`• Cabello: ${hair.name}`);
    if (selectedNails !== 'none') servicesList.push(`• Uñas: ${nails.name}`);
    if (selectedFacial !== 'none') servicesList.push(`• Facial/Spa: ${facial.name}`);

    const message = `✨ *RESERVA RITUAL GLOW - ${brandName}*%0A%0AHola, armé mi paquete personalizado en su web:%0A${servicesList.join('%0A')}%0A%0A• *Duración estimada:* ${formatHours(totalDurationMinutes)}%0A• *Descuento aplicado:* ${discountPercent * 100}%25 COMBO%0A• *Total cotizado:* $${totalFinal.toLocaleString()} MXN (Ahorras $${discountAmount.toLocaleString()} MXN)%0A📍 Sucursal preferida: ${brandCity}.%0A¿Qué días y horarios tienen disponibles para este ritual?`;
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleSingleService = (title, price) => {
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '525512345678';
    const message = `✨ *CONSULTA SERVICIO - ${brandName}*%0A%0AHola, quiero agendar cita para: *${title}* (${price}) en ${brandCity}.`;
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#292524] selection:bg-[#E8D5CE] selection:text-[#292524] relative overflow-hidden">
      {/* Subtle Aura Radial Background Gradients (Soft Luxury) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#E8D5CE]/40 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 left-[-100px] w-[600px] h-[600px] bg-[#F3E8E2]/50 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-[-100px] w-[500px] h-[500px] bg-[#E8D5CE]/30 rounded-full blur-[130px] pointer-events-none -z-10"></div>

      {/* Demo Customizer Bar */}
      <DemoConversionBar
        currentKey="estetica"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* LUXURY TOP ANNOUNCEMENT */}
      <div className="border-b border-[#292524]/10 px-6 py-2.5 text-center text-xs tracking-[0.2em] font-light text-[#292524]/75">
        <span>RITUALES DE BELLEZA CONSCIENTE · CITAS PRIVADAS EXCLUSIVAS EN {brandCity.toUpperCase()}</span>
      </div>

      {/* HERO SECTION: ASYMMETRIC GALLERY WITH ARCHED IMAGE & TREND FLOATING CARDS */}
      <section className="px-6 sm:px-12 pt-14 pb-20 max-w-7xl mx-auto border-b border-[#292524]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (6 Cols): Typography with italic highlights & pill badges */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8D5CE]/50 border border-[#D4A373]/30 text-xs font-mono-tech tracking-wider text-[#292524] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C58F72]" />
              <span>PARISIAN SPA & HAUTE COIFFURE</span>
            </div>

            <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.02] text-[#292524] mb-6">
              Donde tu belleza natural se vuelve <em className="italic font-normal text-[#C58F72]">arte silencioso</em>.
            </h1>

            <p className="text-base sm:text-lg text-[#292524]/75 font-light leading-relaxed max-w-lg mb-8">
              En <strong>{brandName}</strong> fusionamos visagismo francés, aparatología médica suiza y cosmética botánica vegana. Un santuario diseñado para desconectar de la ciudad y renovar tu presencia.
            </p>

            <div className="flex flex-wrap gap-4 items-center mb-10">
              <button
                onClick={() => {
                  const el = document.getElementById('armador-glow');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#292524] hover:bg-[#C58F72] text-[#FAF6F0] px-8 py-4 rounded-full text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-3"
              >
                <span>Crear Paquete Glow a Medida</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSingleService('Valoración Capilar & Facial', '$0 MXN')}
                className="border border-[#292524]/30 hover:border-[#292524] text-[#292524] px-6 py-4 rounded-full text-xs font-mono-tech uppercase tracking-[0.18em] transition-colors"
              >
                Agendar Diagnóstico Gratuito
              </button>
            </div>

            {/* Quick Micro Badges */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-[#292524]/10 text-xs font-light text-[#292524]/70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C58F72]"></span>
                <span>Atención 1 a 1 sin prisas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C58F72]"></span>
                <span>Productos 100% Cruelty-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C58F72]"></span>
                <span>Champagne de cortesía</span>
              </div>
            </div>
          </div>

          {/* Right Column (6 Cols): Parisian Arch Photo with Floating Glass Tendency Cards */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Arched Photo Frame (rounded-t-full geometry) */}
            <div className="w-[300px] sm:w-[380px] h-[480px] sm:h-[560px] rounded-t-full rounded-b-3xl overflow-hidden border-2 border-[#D4A373]/30 shadow-2xl relative bg-[#FAF6F0]">
              <img
                src="/images/estetica.webp"
                alt="Salón de belleza de lujo"
                className="w-full h-full object-cover object-center filter contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292524]/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-center text-white">
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#E8D5CE] block">
                  TEMPORADA GLOW 2026
                </span>
                <span className="font-editorial text-2xl italic font-normal">
                  Atelier Privé {brandCity}
                </span>
              </div>
            </div>

            {/* Floating Glass Tendency Card 1 (Top Left): Balayage Honey */}
            <div className="absolute top-12 -left-2 sm:-left-6 bg-white/80 backdrop-blur-md border border-white/60 p-4 rounded-2xl shadow-xl max-w-[210px] hidden sm:block animate-pulse duration-1000">
              <span className="text-[9px] font-mono-tech uppercase tracking-widest text-[#C58F72] font-semibold block">
                TENDENCIA N° 1
              </span>
              <h4 className="font-editorial text-base font-bold text-[#292524]">
                Balayage Champagne
              </h4>
              <p className="text-[11px] text-[#292524]/70 leading-snug mt-0.5">
                Iluminación sin efecto raíz, ideal para pieles latinas.
              </p>
            </div>

            {/* Floating Glass Tendency Card 2 (Right Center): HydraFacial */}
            <div className="absolute top-1/2 -right-2 sm:-right-8 bg-white/85 backdrop-blur-md border border-white/60 p-4 rounded-2xl shadow-xl max-w-[210px] hidden sm:block">
              <div className="flex items-center gap-1.5 text-[#C58F72] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[9px] font-mono-tech uppercase tracking-widest font-semibold">
                  CLÍNICA SPA
                </span>
              </div>
              <h4 className="font-editorial text-base font-bold text-[#292524]">
                HydraFacial Glow
              </h4>
              <p className="text-[11px] text-[#292524]/70 leading-snug mt-0.5">
                Piel de porcelana en 60 min. Cero tiempo de recuperación.
              </p>
            </div>

            {/* Floating Glass Tendency Card 3 (Bottom Left): Manicura Rusa */}
            <div className="absolute -bottom-4 left-0 sm:left-4 bg-[#292524] text-[#FAF6F0] p-4 rounded-2xl shadow-2xl max-w-[200px]">
              <span className="text-[9px] font-mono-tech uppercase tracking-widest text-[#D4A373] block">
                DETALLE DE PRECISIÓN
              </span>
              <h4 className="font-editorial text-base font-bold">
                Manicura Rusa
              </h4>
              <p className="text-[10px] text-stone-300 leading-snug mt-0.5">
                Cutículas perfectas e impolutas por más de 4 semanas.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* EXCLUSIVE WIDGET: ARMADOR DE RITUAL / PAQUETE GLOW CON DESCUENTO POR COMBO */}
      <section id="armador-glow" className="px-6 sm:px-12 py-20 max-w-6xl mx-auto border-b border-[#292524]/10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C58F72] font-semibold block mb-2">
            Experiencia Atelier a Medida
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-[#292524]">
            Arma tu propio <em className="italic">Ritual Glow</em>.
          </h2>
          <p className="text-sm text-[#292524]/70 mt-3 font-light leading-relaxed">
            Combina servicios de Cabello, Uñas y Facial. Ahorra 10% al seleccionar 2 áreas, o 20% de descuento total al crear un circuito completo de 3 áreas.
          </p>
        </div>

        {/* 3 Categories Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Category 1: Cabello & Peinado */}
          <div className="bg-white/70 backdrop-blur-sm border border-[#292524]/10 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#292524]/10">
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-[#C58F72]" />
                  <span className="font-mono-tech text-xs uppercase tracking-wider font-bold text-[#292524]">
                    1. CABELLO & COLOR
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech text-[#C58F72]">
                  {hair.duration > 0 ? `${hair.duration} min` : 'Omitido'}
                </span>
              </div>

              <div className="space-y-3">
                {Object.entries(hairOptions).map(([k, opt]) => (
                  <button
                    key={k}
                    onClick={() => setSelectedHair(k)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      selectedHair === k
                        ? 'border-[#292524] bg-[#FAF6F0] shadow-sm ring-1 ring-[#292524]'
                        : 'border-[#292524]/10 bg-white hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-editorial text-base font-bold text-[#292524]">
                        {opt.name}
                      </div>
                      <span className="text-xs font-mono-tech font-semibold text-[#292524] ml-2 shrink-0">
                        {opt.price === 0 ? '$0' : `$${opt.price}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#292524]/60 mt-1 leading-snug">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category 2: Uñas & Manicura */}
          <div className="bg-white/70 backdrop-blur-sm border border-[#292524]/10 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#292524]/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C58F72]" />
                  <span className="font-mono-tech text-xs uppercase tracking-wider font-bold text-[#292524]">
                    2. UÑAS & PEDICURA
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech text-[#C58F72]">
                  {nails.duration > 0 ? `${nails.duration} min` : 'Omitido'}
                </span>
              </div>

              <div className="space-y-3">
                {Object.entries(nailsOptions).map(([k, opt]) => (
                  <button
                    key={k}
                    onClick={() => setSelectedNails(k)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      selectedNails === k
                        ? 'border-[#292524] bg-[#FAF6F0] shadow-sm ring-1 ring-[#292524]'
                        : 'border-[#292524]/10 bg-white hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-editorial text-base font-bold text-[#292524]">
                        {opt.name}
                      </div>
                      <span className="text-xs font-mono-tech font-semibold text-[#292524] ml-2 shrink-0">
                        {opt.price === 0 ? '$0' : `$${opt.price}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#292524]/60 mt-1 leading-snug">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category 3: Facial & Spa */}
          <div className="bg-white/70 backdrop-blur-sm border border-[#292524]/10 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#292524]/10">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#C58F72]" />
                  <span className="font-mono-tech text-xs uppercase tracking-wider font-bold text-[#292524]">
                    3. FACIAL & MIRADA
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech text-[#C58F72]">
                  {facial.duration > 0 ? `${facial.duration} min` : 'Omitido'}
                </span>
              </div>

              <div className="space-y-3">
                {Object.entries(facialOptions).map(([k, opt]) => (
                  <button
                    key={k}
                    onClick={() => setSelectedFacial(k)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      selectedFacial === k
                        ? 'border-[#292524] bg-[#FAF6F0] shadow-sm ring-1 ring-[#292524]'
                        : 'border-[#292524]/10 bg-white hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-editorial text-base font-bold text-[#292524]">
                        {opt.name}
                      </div>
                      <span className="text-xs font-mono-tech font-semibold text-[#292524] ml-2 shrink-0">
                        {opt.price === 0 ? '$0' : `$${opt.price}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#292524]/60 mt-1 leading-snug">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* SUMMARY TICKET & COMBO REWARD */}
        <div className="bg-[#292524] text-[#FAF6F0] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle gold accent ring */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C58F72]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#FAF6F0]/10 text-xs font-mono-tech tracking-wider text-[#E8D5CE]">
                  RESUMEN DE TU EXPERIENCIA
                </span>
                {discountPercent > 0 && (
                  <span className="px-3 py-1 rounded-full bg-[#C58F72] text-xs font-mono-tech tracking-wider text-[#FAF6F0] font-bold animate-pulse">
                    ¡{discountPercent * 100}% DESCUENTO COMBO APLICADO!
                  </span>
                )}
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl font-normal">
                Tu Ritual Personalizado en {brandName}
              </h3>

              <div className="text-xs font-mono-tech space-y-1.5 text-stone-300">
                {selectedHair !== 'none' && <div>• {hair.name} ({formatHours(hair.duration)})</div>}
                {selectedNails !== 'none' && <div>• {nails.name} ({formatHours(nails.duration)})</div>}
                {selectedFacial !== 'none' && <div>• {facial.name} ({formatHours(facial.duration)})</div>}
                {activeCount === 0 && <div className="italic text-stone-400">Selecciona al menos un servicio arriba.</div>}
              </div>

              <div className="flex flex-wrap gap-6 pt-2 text-xs font-mono-tech text-[#E8D5CE]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C58F72]" />
                  <span>Tiempo en cabina: <strong>{formatHours(totalDurationMinutes)}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#C58F72]" />
                  <span>Copa de Prosecco & aromaterapia incluida</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-8 flex flex-col justify-center">
              <div className="flex justify-between items-baseline text-xs font-mono-tech text-stone-400 mb-1">
                <span>Subtotal lista:</span>
                <span>${subtotal.toLocaleString()} MXN</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between items-baseline text-xs font-mono-tech text-[#C58F72] mb-2 font-bold">
                  <span>Ahorro exclusivo combo:</span>
                  <span>-${discountAmount.toLocaleString()} MXN</span>
                </div>
              )}

              <div className="flex justify-between items-baseline my-3 border-t border-white/15 pt-3">
                <span className="text-xs font-mono-tech uppercase tracking-wider text-stone-300">Total del Ritual:</span>
                <span className="font-editorial text-4xl sm:text-5xl font-bold text-[#FAF6F0]">
                  ${totalFinal.toLocaleString()} <span className="text-xs font-mono-tech font-normal text-stone-400">MXN</span>
                </span>
              </div>

              <button
                disabled={activeCount === 0}
                onClick={handleBookGlowRitual}
                className={`w-full py-4 px-6 rounded-full text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                  activeCount > 0
                    ? 'bg-[#C58F72] hover:bg-[#FAF6F0] hover:text-[#292524] text-white shadow-lg cursor-pointer'
                    : 'bg-stone-700 text-stone-500 cursor-not-allowed'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Reservar Ritual por WhatsApp</span>
              </button>
              
              <span className="text-[10px] font-mono-tech text-stone-400 text-center mt-2 block">
                Sin anticipo obligatorio · Cancelación flexible 24h
              </span>
            </div>

          </div>
        </div>

      </section>

      {/* THREE SIGNATURE EXPERIENCES */}
      <section className="px-6 sm:px-12 py-20 max-w-7xl mx-auto border-b border-[#292524]/10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C58F72] font-semibold block mb-2">
            La Carta de Servicios
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-[#292524]">
            Tratamientos que marcan la diferencia.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Colorimetría Visagista',
              subtitle: 'Balayage, Babylights & Gloss',
              time: '180 min',
              price: 'Desde $2,200 MXN',
              desc: 'Estudio de tu tono de piel y forma craneal para iluminar los puntos de luz de tu rostro.',
              tag: 'Best Seller'
            },
            {
              title: 'Ritual HydraFacial Deluxe',
              subtitle: 'Aparatología Médica & Terapia LED',
              time: '60 min',
              price: 'Desde $1,450 MXN',
              desc: 'Extracción sin dolor, infusión de péptidos bioactivos y masaje de drenaje japonés.',
              tag: 'Favorito Red Carpet'
            },
            {
              title: 'Manicura & Esculpido de Precisión',
              subtitle: 'Gelish Ruso & Soft Gel',
              time: '75 min',
              price: 'Desde $750 MXN',
              desc: 'Técnica milimétrica de manicura en seco. Cero levantamientos por hasta 30 días.',
              tag: 'Garantía 14 Días'
            }
          ].map((srv, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm border border-[#292524]/10 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#E8D5CE]/50 text-[10px] font-mono-tech uppercase tracking-wider text-[#C58F72] font-semibold">
                    {srv.tag}
                  </span>
                  <span className="text-xs font-mono-tech text-[#292524]/60">{srv.time}</span>
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#292524] mb-1">
                  {srv.title}
                </h3>
                <div className="text-xs font-mono-tech text-[#C58F72] mb-4">{srv.subtitle}</div>
                <p className="text-xs font-light text-[#292524]/75 leading-relaxed mb-6">
                  {srv.desc}
                </p>
              </div>

              <div className="border-t border-[#292524]/10 pt-4 flex justify-between items-center">
                <span className="font-editorial text-xl font-bold text-[#292524]">{srv.price}</span>
                <button
                  onClick={() => handleSingleService(srv.title, srv.price)}
                  className="px-4 py-2 rounded-full border border-[#292524]/30 hover:bg-[#292524] hover:text-[#FAF6F0] text-xs font-mono-tech transition-colors"
                >
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-14 px-6 sm:px-12 bg-[#FAF6F0] border-t border-[#292524]/10 text-xs font-mono-tech text-[#292524]/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div>
            <div className="font-editorial text-3xl text-[#292524] font-normal tracking-wide">{brandName}</div>
            <p className="text-xs mt-1 text-[#292524]/60">{brandCity} · Haute Beauté & Spa Privé</p>
          </div>
          <div className="text-[11px] space-y-1">
            <p>CITAS CONCRETAS · PROTOCOLOS ESTÉRILES HOSPITALARIOS</p>
            <p className="text-[#292524]/40">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
