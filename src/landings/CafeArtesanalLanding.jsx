import React, { useState } from 'react';
import {
  Coffee,
  Star,
  Check,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Clock,
  Compass,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function CafeArtesanalLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'ATELIER DEL CAFÉ · ALTURA MEXICANA';
  const brandCity = city || 'Coatepec, Veracruz & Coyoacán, CDMX';

  // Barista Quick Quiz State: Step 1 (Method), Step 2 (Taste profile)
  const [quizStep, setQuizStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('v60');
  const [selectedProfile, setSelectedProfile] = useState('frutal');

  const quizRecommendations = {
    'v60-frutal': {
      name: 'Geisha Los Altos de Chiapas (Lavado)',
      notes: 'Jazmín, durazno blanco, bergamota y miel de azahar.',
      altitude: '1,750 msnm · Finca La Esmeralda',
      price: '$340 MXN / 250g',
    },
    'v60-chocolate': {
      name: 'Typica Veracruz Tueste Claro-Medio',
      notes: 'Cacao criollo, avellana tostada y azúcar mascabado.',
      altitude: '1,450 msnm · Coatepec',
      price: '$260 MXN / 250g',
    },
    'espresso-frutal': {
      name: 'Bourbon Rosado Honey de Oaxaca',
      notes: 'Cereza madura, caramelo y cuerpo sedoso con acidez brillante.',
      altitude: '1,680 msnm · Pluma Hidalgo',
      price: '$310 MXN / 250g',
    },
    'espresso-chocolate': {
      name: 'Blend Espresso Casa (Veracruz & Chiapas)',
      notes: 'Chocolate semiamargo, nuez de castilla y crema densa avellanada.',
      altitude: '1,500 msnm · Micro-lotes de sombra',
      price: '$240 MXN / 250g',
    },
    'prensa-frutal': {
      name: 'Mundo Novo Natural de Guerrero',
      notes: 'Frutos rojos deshidratados, panela y cuerpo redondo.',
      altitude: '1,600 msnm · Atoyac de Álvarez',
      price: '$290 MXN / 250g',
    },
    'prensa-chocolate': {
      name: 'Maragogype Grano Gigante Veracruzano',
      notes: 'Almendra tostada, toffee y cacao puro con retrogusto prolongado.',
      altitude: '1,400 msnm · Huatusco',
      price: '$280 MXN / 250g',
    },
  };

  const currentRecKey = `${selectedMethod}-${selectedProfile}`;
  const currentRec = quizRecommendations[currentRecKey] || quizRecommendations['v60-frutal'];

  const handleOrder = (productTitle) => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `☕ *PEDIDO CAFÉ DE ESPECIALIDAD - ${brandName}*%0A%0AQuiero ordenar el café recomendado por el barista:%0A• *Varietal:* ${productTitle || currentRec.name}%0A• *Notas:* ${currentRec.notes}%0A• *Molienda:* Recomendada para ${selectedMethod.toUpperCase()}%0A• *Precio:* ${currentRec.price}%0A📍 Enviar a mi domicilio desde ${brandCity}.`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#2C241E] font-clinical selection:bg-[#4A3B32] selection:text-[#F7F4EF]">
      <DemoConversionBar
        currentKey="cafe"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP TRACEABILITY HEADER */}
      <div className="border-b border-[#E6DEC8] px-6 py-2.5 text-xs font-mono uppercase tracking-[0.25em] text-[#7A6B5D] flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#4A3B32]"></span>
          <span>CAFICULTURA DE SOMBRA Y COMERCIO JUSTO</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">ALTITUD 1,400 - 1,800 MSNM</span>
          <span className="text-[#2C241E] font-bold">TUESTE SEMANAL ARTESANAL</span>
        </div>
      </div>

      {/* HERO SECTION: INDEPENDENT MAGAZINE STYLE (KINFOLK EDITORIAL) */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto border-b border-[#E6DEC8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left 7 Cols: Warm Typography with Traceability Tags */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#7A6B5D] mb-6">
              <span className="bg-[#EAE2D5] px-2.5 py-1">Origen Chiapas & Veracruz</span>
              <span className="bg-[#EAE2D5] px-2.5 py-1">Puntaje Q-Grader 86.5+</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal leading-[0.94] tracking-tight text-[#2C241E] mb-6">
              El café como ritual matutino, de la finca a tu taza.
            </h1>

            <p className="text-base sm:text-lg text-[#615247] font-light leading-relaxed max-w-xl mb-8">
              En {brandName} compramos directamente a pequeños productores de Huatusco y Pluma Hidalgo. Tostamos en lotes pequeños de 5 kg cada martes para preservar toda la acidez cítrica y el cuerpo dulce.
            </p>

            {/* Traceability Barcode / Spec Sheet */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#EFE9DE] border border-[#DDD5C5] text-xs font-mono mb-8">
              <div>
                <span className="text-[10px] text-[#8A7969] block">PROCESO</span>
                <span className="font-bold text-[#2C241E]">Lavado & Honey</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7969] block">TUESTE</span>
                <span className="font-bold text-[#2C241E]">Medio Claro</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A7969] block">ENVÍO MÉXICO</span>
                <span className="font-bold text-[#2C241E]">Gratis en $499+</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  const el = document.getElementById('barista-quiz');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#2C241E] hover:bg-black text-[#F7F4EF] px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2"
              >
                <span>Hacer el Quiz de Barista (2 pasos)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Warm Minimalist Image Frame */}
          <div className="lg:col-span-5">
            <div className="border border-[#DDD5C5] bg-[#EFE9DE] p-4">
              <div className="aspect-[4/5] overflow-hidden border border-[#DDD5C5]">
                <img
                  src="/images/cafe.webp"
                  alt={brandName}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>
              <div className="pt-3 text-[11px] font-mono text-[#7A6B5D] flex justify-between">
                <span>Lote #88 · Cosecha 2026</span>
                <span>{brandCity}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* EXCLUSIVE COMPONENT: QUICK 2-STEP BARISTA QUIZ WITH AUTOMATIC BEAN RECOMMENDATION */}
      <section id="barista-quiz" className="py-20 px-6 sm:px-12 max-w-5xl mx-auto border-b border-[#E6DEC8]">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#7A6B5D] block mb-2">
            Diagnóstico Sensorial Interactivo
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#2C241E]">
            ¿Qué grano de especialidad es perfecto para ti?
          </h2>
        </div>

        {/* Quiz Steps Container */}
        <div className="bg-[#EFE9DE] border border-[#DDD5C5] p-6 sm:p-10">
          {/* Step 1: Method */}
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7A6B5D] block mb-3">
              Paso 1: ¿Cómo preparas tu café en casa?
            </span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'v60', name: 'Filtrado / V60 / Chemex', desc: 'Taza limpia y floral' },
                { key: 'espresso', name: 'Máquina Espresso / Moka', desc: 'Taza densa y concentrada' },
                { key: 'prensa', name: 'Prensa Francesa', desc: 'Taza con mucho cuerpo' },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setSelectedMethod(m.key)}
                  className={`p-4 text-left border transition-all text-xs ${
                    selectedMethod === m.key
                      ? 'border-[#2C241E] bg-[#F7F4EF]'
                      : 'border-[#DDD5C5] bg-[#EAE2D5] hover:bg-[#E4DACB]'
                  }`}
                >
                  <div className="font-bold text-[#2C241E] mb-1">{m.name}</div>
                  <div className="text-[10px] text-[#7A6B5D]">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Flavor Profile */}
          <div className="mb-8 border-t border-[#DDD5C5] pt-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7A6B5D] block mb-3">
              Paso 2: ¿Qué perfil de sabor prefieres?
            </span>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'frutal', name: 'Frutal & Cítrico', desc: 'Notas de durazno, jazmín, miel y acidez brillante' },
                { key: 'chocolate', name: 'Chocolate & Nuez', desc: 'Notas de cacao criollo, avellana, caramelo y cuerpo dulce' },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => setSelectedProfile(p.key)}
                  className={`p-4 text-left border transition-all text-xs ${
                    selectedProfile === p.key
                      ? 'border-[#2C241E] bg-[#F7F4EF]'
                      : 'border-[#DDD5C5] bg-[#EAE2D5] hover:bg-[#E4DACB]'
                  }`}
                >
                  <div className="font-bold text-[#2C241E] mb-1">{p.name}</div>
                  <div className="text-[10px] text-[#7A6B5D]">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Output Card */}
          <div className="border border-[#2C241E] bg-[#F7F4EF] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#7A6B5D] block mb-1">
                Tu Café Ideal Personalizado:
              </span>
              <h4 className="font-editorial text-2xl font-bold text-[#2C241E] mb-2">
                {currentRec.name}
              </h4>
              <p className="text-xs text-[#615247] mb-2 max-w-md">
                <strong>Notas de cata:</strong> {currentRec.notes}
              </p>
              <span className="text-[11px] font-mono text-[#8A7969] block">
                {currentRec.altitude}
              </span>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="font-editorial text-2xl font-bold text-[#2C241E] mb-3">
                {currentRec.price}
              </div>
              <button
                onClick={() => handleOrder(currentRec.name)}
                className="bg-[#2C241E] hover:bg-black text-[#F7F4EF] px-6 py-3 text-xs font-mono uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>Pedir Bolsa por WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 text-center text-xs font-mono text-[#7A6B5D]">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-editorial text-2xl text-[#2C241E]">{brandName}</div>
          <p>{brandCity} · Tostaduría de Café de Especialidad</p>
          <p className="text-[10px]">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
