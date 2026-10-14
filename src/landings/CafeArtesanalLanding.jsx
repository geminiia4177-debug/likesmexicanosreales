import React, { useState } from 'react';
import {
  Coffee,
  Check,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Flame,
  Compass,
  RotateCcw,
  Sliders,
  Scale,
  Award,
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function CafeArtesanalLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'ATELIER DEL CAFÉ · TOSTADURÍA';
  const brandCity = city || 'Coatepec, Veracruz · Pluma Hidalgo, Oax';

  // Interactive Recommender: Brewer Method + Flavor Profile + Weight
  const [selectedMethod, setSelectedMethod] = useState('v60');
  const [selectedProfile, setSelectedProfile] = useState('citrico');
  const [grindGrammage, setGrindGrammage] = useState('250g');

  // Matrix of coffee beans matching the 4 brew methods and 2 flavor profiles
  const beanCatalog = {
    'v60-citrico': {
      title: 'Geisha Reserva Los Altos de Chiapas',
      region: 'Siltepec, Chiapas (1,780 msnm)',
      varietal: '100% Geisha · Proceso Lavado Prolongado',
      roast: 'Tueste Claro Nórdico',
      notes: 'Jazmín silvestre, bergamota, té de durazno y miel de azahar',
      acidity: 'Alta / Cítrica brillante',
      body: 'Ligero y sedoso',
      price: '$360 MXN',
      sku: 'GSH-CHP-044',
      badge: 'Micro-Lote Q-Grader 88.5'
    },
    'v60-achocolatado': {
      title: 'Typica Antiguo de Sombra Veracruz',
      region: 'Coatepec, Veracruz (1,520 msnm)',
      varietal: 'Typica & Garnica · Lavado Tradicional',
      roast: 'Tueste Claro-Medio',
      notes: 'Chocolate semiamargo criollo, nuez pecana y azúcar mascabado',
      acidity: 'Media baja / Balanceada',
      body: 'Medio aterciopelado',
      price: '$260 MXN',
      sku: 'TYP-VER-021',
      badge: 'Cosecha Selección 2026'
    },
    'espresso-citrico': {
      title: 'Bourbon Rosado Honey de la Costa',
      region: 'Pluma Hidalgo, Oaxaca (1,650 msnm)',
      varietal: 'Bourbon Rosado · Honey Amarillo',
      roast: 'Tueste Medio Ámbar',
      notes: 'Cereza roja confitada, mandarina madura y caramelo crujiente',
      acidity: 'Media vivaz / Dulce',
      body: 'Cremoso y elástico',
      price: '$320 MXN',
      sku: 'BBN-OAX-089',
      badge: 'Edición Barista Championship'
    },
    'espresso-achocolatado': {
      title: 'Blend Espresso Casa Espresso-Bar',
      region: 'Huatusco & Tapachula (1,450 msnm)',
      varietal: 'Caturra, Bourbon & Mundo Novo',
      roast: 'Tueste Medio Oscuro',
      notes: 'Praliné de avellana, cacao 70%, malvavisco y crema densa',
      acidity: 'Baja / Agradable',
      body: 'Pesado, denso y prolongado',
      price: '$240 MXN',
      sku: 'BLD-MEX-001',
      badge: 'Favorito Espresso'
    },
    'prensa-citrico': {
      title: 'Mundo Novo Natural de la Sierra',
      region: 'Atoyac de Álvarez, Guerrero (1,600 msnm)',
      varietal: 'Mundo Novo · Proceso Natural 24 Días',
      roast: 'Tueste Medio',
      notes: 'Frambuesa madura, flor de jamaica, higo seco y panela',
      acidity: 'Media alta vinoso',
      body: 'Robusto y redondo',
      price: '$290 MXN',
      sku: 'NAT-GRO-012',
      badge: 'Proceso Natural Solar'
    },
    'prensa-achocolatado': {
      title: 'Maragogype Grano Elefante de Altura',
      region: 'Zongolica, Veracruz (1,580 msnm)',
      varietal: 'Maragogype Gigante · Lavado Barrica',
      roast: 'Tueste Medio Intenso',
      notes: 'Trufa de chocolate amargo, madera de cedro y toffee fundido',
      acidity: 'Mínima / Redonda',
      body: 'Extremadamente untuoso',
      price: '$310 MXN',
      sku: 'MRG-VER-055',
      badge: 'Grano Gigante de Colección'
    },
    'americana-citrico': {
      title: 'San Cristóbal Despulpado Dulce',
      region: 'Tenejapa, Chiapas (1,620 msnm)',
      varietal: 'Bourbon & Marsellesa · Lavado Dulce',
      roast: 'Tueste Claro-Medio Diario',
      notes: 'Manzana verde horneada, miel de abeja melipona y lima dulce',
      acidity: 'Cítrica refrescante y limpia',
      body: 'Suave y reconfortante',
      price: '$250 MXN',
      sku: 'FLT-CHP-073',
      badge: 'Ideal Mañanas Ligeras'
    },
    'americana-achocolatado': {
      title: 'Finca El Triunfo Tradición Familiar',
      region: 'Sierra Madre de Chiapas (1,480 msnm)',
      varietal: 'Typica & Catuaí · Lavado Clásico',
      roast: 'Tueste Medio Chocolate',
      notes: 'Cacao puro, piloncillo tostado, galleta de canela y nuez',
      acidity: 'Baja y suave',
      body: 'Cálido y equilibrado',
      price: '$230 MXN',
      sku: 'AMR-CHP-008',
      badge: 'Reserva Cafetalera'
    }
  };

  const key = `${selectedMethod}-${selectedProfile}`;
  const recommendedBean = beanCatalog[key] || beanCatalog['v60-citrico'];

  const handleOrder = (customBean) => {
    const bean = customBean || recommendedBean;
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '525512345678';
    const message = `☕ *PEDIDO CAFÉ DE ESPECIALIDAD - ${brandName}*%0A%0AHola, realicé el diagnóstico de molienda:%0A• *Varietal:* ${bean.title}%0A• *Presentación:* ${grindGrammage}%0A• *Método en casa:* ${selectedMethod.toUpperCase()}%0A• *Perfil:* ${selectedProfile === 'citrico' ? 'Frutal & Cítrico' : 'Achocolatado & Cacao'}%0A• *Precio:* ${bean.price}%0A• *SKU Lote:* ${bean.sku}%0A📍 Entrega solicitada en ${brandCity}. ¿Tienen stock de tueste fresco de esta semana?`;
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F7F3EB] text-[#2A1B12] selection:bg-[#2A1B12] selection:text-[#F7F3EB]">
      {/* Live Customizer Bar */}
      <DemoConversionBar
        currentKey="cafe"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP KINFOLK FOLIO HEADER */}
      <div className="border-b border-[#2A1B12]/20 px-6 sm:px-12 py-3 text-[11px] font-mono-tech uppercase tracking-[0.22em] text-[#2A1B12]/70 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#C25E00] inline-block"></span>
          <span>PUBLICACIÓN INDEPENDIENTE · N° 09 EDICIÓN VERACRUZ & CHIAPAS</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline">TRAZABILIDAD 100% TRANSPARENTE</span>
          <span className="text-[#C25E00] font-semibold">TUESTE EN BATCHES DE 5 KG CADA MARTES</span>
        </div>
      </div>

      {/* HERO SECTION: MAGAZINE COVER LAYOUT */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto border-b border-[#2A1B12]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: 7 Cols - Pure Editorial Masterpiece */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="mb-6">
              <span className="inline-block text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C25E00] font-semibold border-b border-[#C25E00] pb-1 mb-4">
                Tostaduría de Especialidad & Comercio Justo
              </span>
              <h1 className="font-editorial text-5xl sm:text-7xl lg:text-[5.5rem] font-normal leading-[0.92] tracking-tight text-[#2A1B12] mb-6">
                El café no se bebe con prisa. Se comprende desde el grano.
              </h1>
              <p className="text-base sm:text-lg text-[#2A1B12]/80 font-light leading-relaxed max-w-xl mb-10">
                En <strong>{brandName}</strong> trabajamos sin intermediarios con 8 familias cafetaleras en las faldas del volcán San Martín y las alturas de Coatepec. Tostamos en tambor de hierro fundido para exaltar el azúcar de la flor y la frescura de la cereza.
              </p>
            </div>

            {/* Technical Harvest Spec Table (Hero feature requested) */}
            <div className="border border-[#2A1B12]/20 bg-[#F2EDE2] p-6 mb-8">
              <div className="flex items-center justify-between border-b border-[#2A1B12]/15 pb-3 mb-4">
                <span className="text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold text-[#2A1B12]">
                  FICHA TÉCNICA DE COSECHA EN TURNO
                </span>
                <span className="text-[11px] font-mono-tech text-[#C25E00] font-bold">
                  LOTE N° V-2026
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono-tech">
                <div>
                  <span className="text-[10px] text-[#2A1B12]/60 block uppercase">Origen Principal</span>
                  <span className="font-semibold text-[#2A1B12] text-sm">Chiapas / Veracruz</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#2A1B12]/60 block uppercase">Altitud Media</span>
                  <span className="font-semibold text-[#2A1B12] text-sm">1,650 msnm</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#2A1B12]/60 block uppercase">Beneficio</span>
                  <span className="font-semibold text-[#2A1B12] text-sm">Lavado en Manantial</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#2A1B12]/60 block uppercase">Puntaje Catación</span>
                  <span className="font-semibold text-[#C25E00] text-sm">Q-Grader 87.2 pts</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  const el = document.getElementById('recomiendame-un-grano');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#2A1B12] hover:bg-[#C25E00] text-[#F7F3EB] px-8 py-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold transition-colors duration-200 flex items-center gap-3"
              >
                <span>Diagnosticar mi Molienda Ideal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleOrder(beanCatalog['espresso-citrico'])}
                className="border border-[#2A1B12]/30 hover:border-[#2A1B12] text-[#2A1B12] px-6 py-4 text-xs font-mono-tech uppercase tracking-[0.18em] transition-colors"
              >
                Comprar Lote del Mes ($320 MXN)
              </button>
            </div>
          </div>

          {/* Right Column: 5 Cols - Kinfolk Still Life Photo Frame */}
          <div className="lg:col-span-5">
            <div className="border border-[#2A1B12]/20 p-4 bg-[#F2EDE2]">
              <div className="aspect-[3/4] overflow-hidden bg-[#E7E0D3] relative">
                <img
                  src="/images/cafe.webp"
                  alt="Tostaduría de café artesanal"
                  className="w-full h-full object-cover grayscale-[15%] contrast-[1.08] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#F7F3EB] px-3 py-1 text-[10px] font-mono-tech tracking-wider border border-[#2A1B12]/20">
                  SOMBRA DE BOSQUE DE NIEBLA
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#2A1B12]/15 flex justify-between items-baseline text-xs font-mono-tech text-[#2A1B12]/70">
                <span>Finca El Mirador · Huatusco</span>
                <span className="text-[#C25E00] font-bold">100% ARÁBICA DE ALTURA</span>
              </div>
            </div>

            {/* Micro quote below image */}
            <div className="mt-6 px-2 text-xs font-editorial italic text-[#2A1B12]/80 leading-relaxed text-center sm:text-left">
              "El café cultivado bajo sombra madura tres semanas más lento, concentrando azúcares complejos y notas que no existen en los monocultivos industriales."
            </div>
          </div>

        </div>
      </section>

      {/* EXCLUSIVE INTERACTIVE WIDGET: RECOMENDADOR DE GRANO Y MOLIENDA */}
      <section id="recomiendame-un-grano" className="px-6 sm:px-12 py-20 max-w-6xl mx-auto border-b border-[#2A1B12]/20">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C25E00] font-semibold block mb-2">
            Laboratorio Sensorial de Tueste
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-[#2A1B12] leading-tight">
            Recomendador de Grano & Perfil de Molienda.
          </h2>
          <p className="text-sm font-mono-tech text-[#2A1B12]/70 mt-3">
            Elige tu método de extracción habitual y tu paleta aromática preferida. Nuestro maestro tostador te asigna el micro-lote exacto y la molienda calibrada en micrómetros.
          </p>
        </div>

        {/* The Diagnostic Interactive Control Panel */}
        <div className="border border-[#2A1B12]/25 bg-[#F2EDE2] p-6 sm:p-10">
          
          {/* Step 1: Brew Method (Prensa, Espresso, V60, Cafetera Americana) */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono-tech uppercase tracking-[0.18em] font-bold text-[#2A1B12]">
                PASO 1 · SELECCIONA TU CAFETERA O MÉTODO EN CASA:
              </span>
              <span className="text-[11px] font-mono-tech text-[#C25E00]">
                Calibración de molienda
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'v60', name: 'Filtrado / V60 / Chemex', desc: 'Molienda Media-Fina · Taza cristalina y floral' },
                { id: 'espresso', name: 'Máquina Espresso / Moka', desc: 'Molienda Fina Calibrada · Crema densa y persistente' },
                { id: 'prensa', name: 'Prensa Francesa', desc: 'Molienda Gruesa · Mucho cuerpo y aceites aromáticos' },
                { id: 'americana', name: 'Cafetera Americana / Goteo', desc: 'Molienda Media Universal · Extracción limpia y constante' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id)}
                  className={`p-4 text-left border transition-all duration-150 ${
                    selectedMethod === m.id
                      ? 'border-[#2A1B12] bg-[#F7F3EB] shadow-none ring-2 ring-[#2A1B12]'
                      : 'border-[#2A1B12]/20 bg-[#EDE7DA] hover:bg-[#E6DEC8]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#C25E00] font-bold">
                      {selectedMethod === m.id ? '✓ ACTIVO' : 'MÉTODO'}
                    </span>
                    <Coffee className={`w-3.5 h-3.5 ${selectedMethod === m.id ? 'text-[#2A1B12]' : 'text-[#2A1B12]/40'}`} />
                  </div>
                  <div className="font-editorial text-lg font-bold text-[#2A1B12] leading-snug mb-1">
                    {m.name}
                  </div>
                  <p className="text-[11px] font-mono-tech text-[#2A1B12]/70 leading-normal">
                    {m.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Flavor Profile (Achocolatado vs Cítrico) */}
          <div className="mb-10 border-t border-[#2A1B12]/15 pt-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono-tech uppercase tracking-[0.18em] font-bold text-[#2A1B12]">
                PASO 2 · PREFERENCIA DE SABOR Y ACIDEZ:
              </span>
              <span className="text-[11px] font-mono-tech text-[#C25E00]">
                Desarrollo del grano
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedProfile('citrico')}
                className={`p-5 text-left border transition-all ${
                  selectedProfile === 'citrico'
                    ? 'border-[#2A1B12] bg-[#F7F3EB] ring-2 ring-[#2A1B12]'
                    : 'border-[#2A1B12]/20 bg-[#EDE7DA] hover:bg-[#E6DEC8]'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono-tech text-xs uppercase tracking-widest text-[#C25E00] font-bold">
                    Cítrico & Floral (Acidez Brillante)
                  </span>
                  <Sparkles className="w-4 h-4 text-[#C25E00]" />
                </div>
                <div className="font-editorial text-2xl font-normal text-[#2A1B12] my-1">
                  Perfil Frutal & Notas de Jazmín
                </div>
                <p className="text-xs font-mono-tech text-[#2A1B12]/75">
                  Tuestes claros a medios que respetan los azúcares naturales de la cereza, durazno blanco, bergamota y té Earl Grey.
                </p>
              </button>

              <button
                onClick={() => setSelectedProfile('achocolatado')}
                className={`p-5 text-left border transition-all ${
                  selectedProfile === 'achocolatado'
                    ? 'border-[#2A1B12] bg-[#F7F3EB] ring-2 ring-[#2A1B12]'
                    : 'border-[#2A1B12]/20 bg-[#EDE7DA] hover:bg-[#E6DEC8]'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono-tech text-xs uppercase tracking-widest text-[#C25E00] font-bold">
                    Achocolatado & Frutos Secos
                  </span>
                  <Flame className="w-4 h-4 text-[#C25E00]" />
                </div>
                <div className="font-editorial text-2xl font-normal text-[#2A1B12] my-1">
                  Perfil Cacao Criollo & Nuez
                </div>
                <p className="text-xs font-mono-tech text-[#2A1B12]/75">
                  Tuestes medios a profundos con caramelización rica, baja acidez, recuerdos de chocolate amargo, avellana y dulce de piloncillo.
                </p>
              </button>
            </div>
          </div>

          {/* Step 3: Grammage Toggle */}
          <div className="mb-8 border-t border-[#2A1B12]/15 pt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono-tech uppercase tracking-wider text-[#2A1B12]/80">
              Gramaje de bolsa sellada con válvula desgasificadora:
            </span>
            <div className="flex gap-2 font-mono-tech text-xs">
              {['250g', '500g (+70%)', '1 Kg Mayorista'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setGrindGrammage(sz)}
                  className={`px-3 py-1.5 border ${
                    grindGrammage === sz
                      ? 'bg-[#2A1B12] text-[#F7F3EB] border-[#2A1B12]'
                      : 'bg-[#F7F3EB] text-[#2A1B12] border-[#2A1B12]/30 hover:bg-[#EAE2D5]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC RESULT CARD */}
          <div className="border-2 border-[#2A1B12] bg-[#F7F3EB] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2A1B12]/15 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#C25E00] font-bold block">
                  ASIGNACIÓN EXACTA DE MICRO-LOTE
                </span>
                <span className="text-xs font-mono-tech text-[#2A1B12]/70">
                  Calibrado para {selectedMethod.toUpperCase()} · Perfil {selectedProfile.toUpperCase()}
                </span>
              </div>
              <span className="bg-[#2A1B12] text-[#F7F3EB] px-3 py-1 text-[11px] font-mono-tech uppercase tracking-wider">
                {recommendedBean.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#2A1B12] font-semibold mb-2">
                  {recommendedBean.title}
                </h3>
                <p className="text-xs font-mono-tech text-[#C25E00] font-bold mb-4">
                  {recommendedBean.region} · {recommendedBean.varietal}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-tech bg-[#F2EDE2] p-4 border border-[#2A1B12]/15 mb-4">
                  <div>
                    <span className="text-[10px] text-[#2A1B12]/60 block uppercase">Notas de Cata en Taza</span>
                    <span className="font-semibold text-[#2A1B12]">{recommendedBean.notes}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#2A1B12]/60 block uppercase">Curva de Tueste</span>
                    <span className="font-semibold text-[#2A1B12]">{recommendedBean.roast}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#2A1B12]/60 block uppercase">Nivel de Acidez</span>
                    <span className="font-semibold text-[#2A1B12]">{recommendedBean.acidity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#2A1B12]/60 block uppercase">Cuerpo / Densidad</span>
                    <span className="font-semibold text-[#2A1B12]">{recommendedBean.body}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 lg:border-l lg:border-[#2A1B12]/15 lg:pl-8 flex flex-col justify-center">
                <span className="text-[11px] font-mono-tech text-[#2A1B12]/60 uppercase tracking-widest block">
                  Precio por Bolsa ({grindGrammage})
                </span>
                <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#2A1B12] my-2">
                  {recommendedBean.price}
                </div>
                <span className="text-[10px] font-mono-tech text-[#2A1B12]/70 mb-5 block">
                  IVA incluido · Envío a todo México en 24-48 hrs
                </span>

                <button
                  onClick={() => handleOrder(recommendedBean)}
                  className="w-full bg-[#2A1B12] hover:bg-[#C25E00] text-[#F7F3EB] py-4 px-6 text-xs font-mono-tech uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pedir Bolsa por WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* THREE CURRENT SPECIALTY LOTS (TRIVIAL GRID REPLACED BY ARCHITECTURAL TRACEABILITY CARDS) */}
      <section className="px-6 sm:px-12 py-20 max-w-7xl mx-auto border-b border-[#2A1B12]/20">
        <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C25E00] font-semibold block mb-1">
              Catálogo de Micro-Lotes de Temporada
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#2A1B12]">
              Orígenes Únicos de Altura
            </h2>
          </div>
          <span className="text-xs font-mono-tech text-[#2A1B12]/60 uppercase tracking-widest">
            Disponibilidad limitada a 60 bolsas por lote
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: '01',
              title: 'Pluma Hidalgo Tradición',
              state: 'Oaxaca',
              altitude: '1,650 msnm',
              process: 'Lavado con Agua de Manantial',
              notes: 'Miel de monte, naranja agria y cacao criollo',
              price: '$280 MXN',
              roast: 'Medio'
            },
            {
              id: '02',
              title: 'Coatepec Garnica Natural',
              state: 'Veracruz',
              altitude: '1,540 msnm',
              process: 'Natural Secado en Camas Africanas',
              notes: 'Fresa salvaje, licor de caña y chocolate amargo',
              price: '$310 MXN',
              roast: 'Claro Nórdico'
            },
            {
              id: '03',
              title: 'Tapachula Soconusco Honey',
              state: 'Chiapas',
              altitude: '1,700 msnm',
              process: 'Honey Amarillo 18 Días',
              notes: 'Durazno amarillo, canela en rama y caramelo',
              price: '$295 MXN',
              roast: 'Medio Ámbar'
            }
          ].map((lot) => (
            <div key={lot.id} className="border border-[#2A1B12]/20 bg-[#F2EDE2] p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-baseline border-b border-[#2A1B12]/15 pb-2 mb-4 font-mono-tech text-xs">
                  <span className="font-bold text-[#C25E00]">LOTE #{lot.id}</span>
                  <span className="text-[#2A1B12]/60">{lot.state} · {lot.altitude}</span>
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#2A1B12] mb-3">
                  {lot.title}
                </h3>
                <div className="text-xs font-mono-tech space-y-2 mb-6 text-[#2A1B12]/80">
                  <p><strong className="text-[#2A1B12]">Beneficio:</strong> {lot.process}</p>
                  <p><strong className="text-[#2A1B12]">Tueste:</strong> {lot.roast}</p>
                  <p><strong className="text-[#2A1B12]">Notas:</strong> {lot.notes}</p>
                </div>
              </div>

              <div className="border-t border-[#2A1B12]/15 pt-4 flex items-center justify-between">
                <span className="font-editorial text-2xl font-bold text-[#2A1B12]">{lot.price}</span>
                <button
                  onClick={() => handleOrder({ title: lot.title, price: lot.price, sku: `LOT-${lot.id}` })}
                  className="bg-[#2A1B12] hover:bg-[#C25E00] text-[#F7F3EB] px-4 py-2 text-[11px] font-mono-tech uppercase tracking-wider transition-colors"
                >
                  Apartar Lote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY & ROAST LAB STATEMENT */}
      <section className="px-6 sm:px-12 py-20 max-w-5xl mx-auto text-center">
        <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C25E00] font-semibold block mb-3">
          El Manifiesto de {brandName}
        </span>
        <blockquote className="font-editorial text-3xl sm:text-5xl font-normal text-[#2A1B12] leading-snug mb-8">
          "El tostador no inventa sabores; su único deber ético es no arruinar los tres años de lluvia, sol y paciencia que el caficultor sembró en la montaña."
        </blockquote>
        <div className="flex justify-center items-center gap-4 text-xs font-mono-tech text-[#2A1B12]/70 uppercase tracking-widest">
          <span>{brandCity}</span>
          <span>•</span>
          <span>Sello de Calidad Especialidad Mexicana</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2A1B12]/20 py-12 px-6 sm:px-12 bg-[#EFEAE0] text-xs font-mono-tech text-[#2A1B12]/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-editorial text-2xl text-[#2A1B12] font-bold">{brandName}</div>
            <p className="text-[11px] mt-1">{brandCity} · Tostaduría de Café de Especialidad</p>
          </div>
          <div className="text-[10px] tracking-wider text-right">
            <span>COSECHA 2026 · COMERCIO DIRECTO CON PRODUCTORES LOCALES</span>
            <div className="mt-1">PAGO SEGURO POR TRANSFERENCIA O TARJETA</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
