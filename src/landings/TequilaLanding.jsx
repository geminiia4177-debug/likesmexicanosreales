import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Star,
  Check,
  ShoppingBag,
  ArrowRight,
  Flame,
  Droplets,
  Sparkles,
  GlassWater
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TequilaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'TEQUILA REAL DE ARANDAS';
  const brandCity = city || 'Los Altos de Jalisco, México · 2,050 msnm';

  // Expression Selector: blanco, reposado, anejo, extra_anejo
  const [selectedExpression, setSelectedExpression] = useState('reposado');

  const expressions = {
    blanco: {
      name: 'BLANCO CRISTALINO',
      aging: 'Sin barrica · Doble destilación en alambique de cobre',
      notes: 'Notas cítricas de lima mexicana, pimienta blanca y agave cocido fresco.',
      price: '$890 MXN',
      alc: '40% Alc. Vol. · 750 ml',
      batch: 'LOTE B-048 / 2,500 BOTELLAS',
      bgTheme: 'from-[#0A0D12] via-[#0E131A] to-[#0A0D12]',
      accentColor: '#94A3B8',
    },
    reposado: {
      name: 'REPOSADO TRADICIÓN',
      aging: '8 Meses en barricas de roble blanco americano',
      notes: 'Vainilla natural, nuez moscada, caramelo suave y roble tostado fino.',
      price: '$1,150 MXN',
      alc: '40% Alc. Vol. · 750 ml',
      batch: 'LOTE R-089 / 1,800 BOTELLAS',
      bgTheme: 'from-[#140F08] via-[#1F170C] to-[#140F08]',
      accentColor: '#F59E0B',
    },
    anejo: {
      name: 'AÑEJO RESERVA ESPECIAL',
      aging: '24 Meses en barricas ex-bourbon de roble tostado medio',
      notes: 'Chocolate amargo oaxaqueño, frutos secos, tabaco rubio y mantequilla.',
      price: '$1,650 MXN',
      alc: '40% Alc. Vol. · 750 ml',
      batch: 'LOTE A-022 / 950 BOTELLAS',
      bgTheme: 'from-[#180C05] via-[#241308] to-[#180C05]',
      accentColor: '#D97706',
    },
    extra_anejo: {
      name: 'EXTRA AÑEJO GRAN HERENCIA',
      aging: '48 Meses en barrica de roble francés de primer uso',
      notes: 'Complejidad soberbia: ciruela pasa, cuero añejo, avellana y agave balsámico.',
      price: '$2,850 MXN',
      alc: '42% Alc. Vol. · 750 ml',
      batch: 'LOTE EA-007 / 400 BOTELLAS NUMERADAS',
      bgTheme: 'from-[#140606] via-[#1C090A] to-[#140606]',
      accentColor: '#EF4444',
    },
  };

  const currentExp = expressions[selectedExpression];

  const handleOrder = () => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `🥃 *PEDIDO TEQUILA - ${brandName}*%0A%0AQuiero adquirir la expresión: *${currentExp.name}* (${currentExp.price}) de ${brandCity}.%0A¿Tienen envío a domicilio con empaque de regalo de madera?`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div
      className={`min-h-screen text-[#EDE7DE] font-clinical transition-colors duration-700 bg-gradient-to-b ${currentExp.bgTheme}`}
    >
      <DemoConversionBar
        currentKey="tequila"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP REGULATORY STAMP STRIP */}
      <div className="border-b border-amber-500/20 bg-black/40 backdrop-blur-md px-6 py-2 flex justify-between items-center text-[11px] font-mono tracking-[0.25em] text-[#C2A578] uppercase">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-amber-500"></span>
          <span>DENOMINACIÓN DE ORIGEN PROTEGIDA · CRT NOM-1414</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">100% AGAVE AZUL TEQUILANA WEBER</span>
          <span className="text-white font-bold">{currentExp.batch}</span>
        </div>
      </div>

      {/* HERO SECTION: SYMMETRICAL SCROLLYTELLING WITH CENTER BOTTLE & CONNECTING TASTING CALLOUTS */}
      <section className="relative px-6 sm:px-12 py-16 lg:py-24 max-w-7xl mx-auto">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#C2A578] block mb-3">
            Hacienda Fundada en {brandCity}
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white uppercase tracking-tight mb-4">
            {brandName}
          </h1>
          <p className="text-sm text-slate-300 font-light max-w-lg mx-auto">
            Agaves madurados durante 7 a 8 años en tierra roja volcánica. Cocción lenta de 48 horas en hornos de mampostería de piedra.
          </p>
        </div>

        {/* Center Symmetrical Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-8">
          
          {/* Left Callouts (3 Cols) */}
          <div className="lg:col-span-3 space-y-8 text-center lg:text-right order-2 lg:order-1">
            <div className="border-t-2 border-dotted border-amber-500/40 pt-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2A578] block mb-1">
                01. CULTIVO & MADURACIÓN
              </span>
              <h4 className="font-editorial text-xl font-bold text-white mb-1">100% Agave Azul</h4>
              <p className="text-xs text-slate-400">Jima artesanal con coa a ras de piña para evitar notas amargas.</p>
            </div>

            <div className="border-t-2 border-dotted border-amber-500/40 pt-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2A578] block mb-1">
                02. COCCIÓN LENTA
              </span>
              <h4 className="font-editorial text-xl font-bold text-white mb-1">Hornos de Piedra</h4>
              <p className="text-xs text-slate-400">Vapor térmico continuo que carameliza los azúcares naturales del agave.</p>
            </div>
          </div>

          {/* Center Bottle (6 Cols) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center order-1 lg:order-2">
            {/* Stamp-like double border frame */}
            <div className="relative p-6 border-2 border-dashed border-amber-500/30 bg-black/30 backdrop-blur-sm max-w-md w-full">
              <div className="aspect-[3/4] relative overflow-hidden border border-amber-500/30">
                <img
                  src="/images/tequila.webp"
                  alt={brandName}
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Vintage Batch Seal */}
                <div className="absolute top-4 right-4 bg-black/80 border border-amber-500/50 p-2 text-center text-xs font-mono">
                  <span className="text-[#C2A578] block text-[9px] uppercase tracking-widest">Graduación</span>
                  <span className="text-white font-bold">{currentExp.alc.split('·')[0]}</span>
                </div>
              </div>

              {/* Bottom Stamp Label */}
              <div className="mt-4 pt-4 border-t border-amber-500/30 text-center font-mono text-xs">
                <div className="text-[#C2A578] uppercase tracking-[0.2em]">{currentExp.name}</div>
                <div className="text-white font-bold text-xl mt-1">{currentExp.price}</div>
              </div>
            </div>
          </div>

          {/* Right Callouts (3 Cols) */}
          <div className="lg:col-span-3 space-y-8 text-center lg:text-left order-3">
            <div className="border-t-2 border-dotted border-amber-500/40 pt-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2A578] block mb-1">
                03. AÑEJAMIENTO EN ROBLE
              </span>
              <h4 className="font-editorial text-xl font-bold text-white mb-1">Cavas Subterráneas</h4>
              <p className="text-xs text-slate-400">{currentExp.aging}.</p>
            </div>

            <div className="border-t-2 border-dotted border-amber-500/40 pt-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2A578] block mb-1">
                04. PERFIL DE CATA
              </span>
              <h4 className="font-editorial text-xl font-bold text-white mb-1">Notas Sensoriales</h4>
              <p className="text-xs text-slate-400">{currentExp.notes}</p>
            </div>
          </div>

        </div>

        {/* EXCLUSIVE COMPONENT: HORIZONTAL EXPRESSION SELECTOR (CHANGES AMBIENT PALETTE) */}
        <div className="mt-16 border-t border-amber-500/30 pt-10">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C2A578]">
              Seleccionar Expresión de Destilación
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {Object.keys(expressions).map((key) => {
              const exp = expressions[key];
              const isSelected = selectedExpression === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedExpression(key)}
                  className={`p-4 text-center border-2 transition-all font-mono text-xs ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                      : 'border-white/10 hover:border-white/30 bg-black/20'
                  }`}
                >
                  <div className="font-editorial text-base sm:text-lg font-bold text-white mb-1">
                    {exp.name.split(' ')[0]}
                  </div>
                  <div className="text-[#C2A578] font-bold">{exp.price}</div>
                  <div className="text-[10px] text-slate-400 mt-2">{exp.aging.split('·')[0]}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleOrder}
              className="bg-[#C2A578] hover:bg-[#b09262] text-black px-10 py-4 text-xs font-mono uppercase tracking-[0.25em] font-bold transition-all shadow-xl inline-flex items-center gap-3"
            >
              <span>Comprar Botella de {currentExp.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-amber-500/20 text-center text-xs font-mono text-slate-400">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-editorial text-2xl text-white uppercase">{brandName}</div>
          <p>{brandCity} · Evite el exceso. Prohibida la venta a menores de 18 años.</p>
          <p className="text-[10px] text-slate-600">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
