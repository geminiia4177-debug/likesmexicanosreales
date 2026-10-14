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
  GlassWater,
  RotateCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TequilaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'TEQUILA REAL DE ARANDAS';
  const brandCity = city || 'Los Altos de Jalisco, México · 2,050 msnm';

  // Digital Tasting Expression Selector: blanco, reposado, anejo, extra_anejo
  const [selectedExpression, setSelectedExpression] = useState('reposado');

  const expressions = {
    blanco: {
      name: 'BLANCO CRISTALINO',
      barrel: 'Sin barrica · Doble destilación lenta en alambique de cobre',
      aroma: 'Cítricos frescos de lima yucateca, menta, pimienta blanca y agave cocido puro.',
      pairing: 'Mariscos del Pacífico, ceviche verde y quesos frescos de cabra.',
      price: '$890 MXN',
      alc: '40% Alc. Vol. · 750 ml',
      batch: 'LOTE N° 042 / 2,500 BOTELLAS',
      bgTheme: 'from-[#0C0A09] via-[#12161A] to-[#0C0A09]',
      accentColor: '#94A3B8',
    },
    reposado: {
      name: 'REPOSADO TRADICIÓN',
      barrel: '8 Meses en barricas de roble blanco americano tostado suave',
      aroma: 'Vainilla natural, nuez moscada, caramelo suave y roble fino tostado.',
      pairing: 'Carnes asadas al carbón, cortes marmoleados y comida tradicional jalisciense.',
      price: '$1,150 MXN',
      alc: '40% Alc. Vol. · 750 ml',
      batch: 'LOTE N° 089 / 1,800 BOTELLAS',
      bgTheme: 'from-[#0C0A09] via-[#1F140A] to-[#0C0A09]',
      accentColor: '#B45309',
    },
    anejo: {
      name: 'AÑEJO RESERVA ESPECIAL',
      barrel: '24 Meses en barricas de roble francés de segundo uso',
      aroma: 'Chocolate amargo oaxaqueño, frutos secos deshidratados, tabaco rubio y mantequilla.',
      pairing: 'Mole negro, costillas glaseadas y postres de chocolate con cacao criollo.',
      price: '$1,650 MXN',
      alc: '40% Alc. Vol. · 750 ml',
      batch: 'LOTE N° 022 / 950 BOTELLAS',
      bgTheme: 'from-[#0C0A09] via-[#241006] to-[#0C0A09]',
      accentColor: '#D97706',
    },
    extra_anejo: {
      name: 'EXTRA AÑEJO GRAN HERENCIA',
      barrel: '48 Meses en barrica de roble francés de primer uso',
      aroma: 'Complejidad soberbia: ciruela pasa, cuero añejo, avellana tostada y agave balsámico.',
      pairing: 'Puros habanos, quesos maduros y degustación en copa Riedel tequilera.',
      price: '$2,850 MXN',
      alc: '42% Alc. Vol. · 750 ml',
      batch: 'LOTE N° 007 / 400 BOTELLAS NUMERADAS',
      bgTheme: 'from-[#0C0A09] via-[#1C0606] to-[#0C0A09]',
      accentColor: '#EF4444',
    },
  };

  const currentExp = expressions[selectedExpression];

  const handleOrder = () => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `🥃 *PEDIDO TEQUILA ARTESANAL - ${brandName}*%0A%0AQuiero adquirir la expresión de cata:%0A• *Edición:* ${currentExp.name} (${currentExp.price})%0A• *Lote:* ${currentExp.batch}%0A• *Origen:* ${brandCity}%0A¿Tienen envío seguro a mi domicilio con estuche de madera?`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div
      className={`min-h-screen text-[#FDFBF7] font-clinical transition-colors duration-700 bg-gradient-to-b ${currentExp.bgTheme}`}
    >
      <DemoConversionBar
        currentKey="tequila"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP REGULATORY STAMP STRIP */}
      <div className="border-b border-[#B45309]/30 bg-black/50 backdrop-blur-md px-6 py-2.5 flex justify-between items-center text-[11px] font-mono-tech tracking-[0.25em] text-[#C2A578] uppercase">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#B45309]"></span>
          <span>DENOMINACIÓN DE ORIGEN PROTEGIDA · CRT NOM-1414</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-[#4D7C0F] font-bold">100% AGAVE AZUL TEQUILANA WEBER</span>
          <span className="text-white font-bold">{currentExp.batch}</span>
        </div>
      </div>

      {/* HERO SECTION: SYMMETRICAL SCROLLYTELLING WITH CENTER BOTTLE */}
      <section className="relative px-6 sm:px-12 py-16 lg:py-24 max-w-7xl mx-auto">
        {/* Rotating Slow Seal Graphic in Background */}
        <div className="absolute top-10 right-10 pointer-events-none opacity-20 hidden md:block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
            className="w-32 h-32 rounded-full border-2 border-dashed border-[#B45309] flex items-center justify-center font-mono-tech text-[8px] text-center uppercase tracking-widest text-[#B45309]"
          >
            ★ DESTILERÍA ARTESANAL • JALISCO 2026 ★
          </motion.div>
        </div>

        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono-tech uppercase tracking-[0.35em] text-[#C2A578] block mb-3">
            Destilería Tradicional en {brandCity}
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white uppercase tracking-tight mb-4">
            {brandName}
          </h1>
          <p className="text-sm text-slate-300 font-light max-w-lg mx-auto leading-relaxed">
            Agaves madurados de 7 a 8 años en tierra roja volcánica. Doble destilación en alambique de cobre y reposo en cavas subterráneas de piedra.
          </p>
        </div>

        {/* Center Symmetrical Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-6">
          
          {/* Left Callouts (3 Cols) with Fine Connecting Lines */}
          <div className="lg:col-span-3 space-y-10 text-center lg:text-right order-2 lg:order-1">
            <div className="border-t border-[#B45309]/40 pt-4">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#C2A578] block mb-1">
                01. MATERIA PRIMA
              </span>
              <h4 className="font-editorial text-xl font-bold text-white mb-1">100% Agave Azul</h4>
              <p className="text-xs text-slate-400">Jima artesanal con coa de filo vivo para remover hojas verdes y pencas amargas.</p>
            </div>

            <div className="border-t border-[#B45309]/40 pt-4">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#C2A578] block mb-1">
                02. COCCIÓN LENTA
              </span>
              <h4 className="font-editorial text-xl font-bold text-white mb-1">Cocción en Hornos</h4>
              <p className="text-xs text-slate-400">48 Horas de vapor térmico en hornos de mampostería tradicional de piedra.</p>
            </div>
          </div>

          {/* Center Bottle (6 Cols) with Numbered Stamp Frame */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative p-6 border border-[#B45309]/40 bg-black/40 backdrop-blur-md max-w-md w-full shadow-2xl">
              <div className="aspect-[3/4] relative overflow-hidden border border-[#B45309]/30">
                <img
                  src="/images/tequila.webp"
                  alt={brandName}
                  className="w-full h-full object-cover filter contrast-115"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                
                {/* Vintage Batch Seal Badge */}
                <div className="absolute top-4 right-4 bg-black/85 border border-[#B45309] p-2 text-center text-xs font-mono-tech">
                  <span className="text-[#C2A578] block text-[9px] uppercase tracking-widest">Lote Certificado</span>
                  <span className="text-white font-bold">{currentExp.batch.split('/')[0]}</span>
                </div>
              </div>

              {/* Bottom Stamp Label */}
              <div className="mt-4 pt-4 border-t border-[#B45309]/30 text-center font-mono-tech text-xs">
                <div className="text-[#C2A578] uppercase tracking-[0.2em]">{currentExp.name}</div>
                <div className="text-white font-bold text-2xl mt-1">{currentExp.price}</div>
              </div>
            </div>
          </div>

          {/* Right Callouts (3 Cols) with Fine Connecting Lines */}
          <div className="lg:col-span-3 space-y-10 text-center lg:text-left order-3">
            <div className="border-t border-[#B45309]/40 pt-4">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#C2A578] block mb-1">
                03. AÑEJAMIENTO EN BARRICA
              </span>
              <h4 className="font-editorial text-xl font-bold text-white mb-1">Cavas Subterráneas</h4>
              <p className="text-xs text-slate-400">{currentExp.barrel}.</p>
            </div>

            <div className="border-t border-[#B45309]/40 pt-4">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#C2A578] block mb-1">
                04. NOTAS & MARIDAJE
              </span>
              <h4 className="font-editorial text-xl font-bold text-white mb-1">Armonía en Boca</h4>
              <p className="text-xs text-slate-400">{currentExp.aroma}</p>
            </div>
          </div>

        </div>

        {/* EXCLUSIVE WIDGET: CATADOR DIGITAL DE EXPRESIONES (BLANCO, REPOSADO, AÑEJO, EXTRA AÑEJO) */}
        <div className="mt-16 border-t border-[#B45309]/40 pt-12">
          <div className="text-center mb-8">
            <span className="text-xs font-mono-tech uppercase tracking-[0.3em] text-[#C2A578] block mb-1">
              Catador Digital de Expresiones
            </span>
            <h3 className="font-editorial text-3xl font-normal text-white">
              Explora las Cuatro Expresiones del Agave
            </h3>
          </div>

          {/* Horizontal Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            {Object.keys(expressions).map((key) => {
              const exp = expressions[key];
              const isSelected = selectedExpression === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedExpression(key)}
                  className={`p-4 text-center border transition-all font-mono-tech text-xs ${
                    isSelected
                      ? 'border-[#B45309] bg-[#B45309]/20 shadow-[0_0_25px_rgba(180,83,9,0.3)]'
                      : 'border-white/10 hover:border-white/30 bg-black/30'
                  }`}
                >
                  <div className="font-editorial text-lg font-bold text-white mb-1">
                    {exp.name.split(' ')[0]}
                  </div>
                  <div className="text-[#C2A578] font-bold text-sm">{exp.price}</div>
                  <div className="text-[10px] text-slate-400 mt-2">{exp.alc.split('·')[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Interactive Tasting Notes Detail Box */}
          <div className="bg-black/40 border border-[#B45309]/40 p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono-tech">
            <div>
              <span className="text-[#C2A578] uppercase text-[10px] block mb-1">TIPO DE BARRICA</span>
              <p className="text-slate-300 font-light leading-relaxed">{currentExp.barrel}</p>
            </div>
            <div>
              <span className="text-[#C2A578] uppercase text-[10px] block mb-1">NOTAS AROMÁTICAS</span>
              <p className="text-slate-300 font-light leading-relaxed">{currentExp.aroma}</p>
            </div>
            <div>
              <span className="text-[#C2A578] uppercase text-[10px] block mb-1">MARIDAJE RECOMENDADO</span>
              <p className="text-slate-300 font-light leading-relaxed">{currentExp.pairing}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleOrder}
              className="bg-[#B45309] hover:bg-[#92400e] text-white px-10 py-4 text-xs font-mono-tech uppercase tracking-[0.25em] font-bold transition-all shadow-xl inline-flex items-center gap-3"
            >
              <span>Adquirir Botella {currentExp.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-[#B45309]/30 text-center text-xs font-mono-tech text-slate-400">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-editorial text-2xl text-white uppercase">{brandName}</div>
          <p>{brandCity} · Evite el exceso. Prohibida la venta a menores de 18 años.</p>
          <p className="text-[10px] text-slate-600">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
