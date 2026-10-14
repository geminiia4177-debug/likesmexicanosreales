import React, { useState } from 'react';
import {
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function CalzadoTiendaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'LEÓN STREET LAB · SNEAKERS';
  const brandCity = city || 'León, Guanajuato · Capital Mundial del Calzado';

  // Hero Drop Product State
  const [selectedSize, setSelectedSize] = useState('27 MX');
  const [selectedColorway, setSelectedColorway] = useState('obsidian');

  const colorways = {
    obsidian: { name: 'Obsidian & Neon Green', hex: '#00F59B', label: 'Edición Cyberpunk CDMX' },
    bone: { name: 'Bone White & Agave', hex: '#E2E8F0', label: 'Minimalista Neutro' },
    black: { name: 'Triple Carbon Black', hex: '#1E293B', label: 'Cuero Genuino Encerado' },
  };

  const sizes = ['25 MX', '25.5 MX', '26 MX', '26.5 MX', '27 MX', '27.5 MX', '28 MX', '28.5 MX', '29 MX', '30 MX'];

  const dropProduct = {
    title: 'RUNNER 01 · PIEL FLOR ENTERA & VULCANIZADO',
    code: 'SKU: LSL-MX-2026',
    price: '$2,190 MXN',
    originalPrice: '$2,650 MXN',
    dropCount: 'Últimos 14 Pares',
  };

  const catalog = [
    { id: 1, name: 'Boot Commando León 1974', price: '$2,450 MXN', tag: 'Piel Nubuck', stock: '8 disponibles' },
    { id: 2, name: 'Low Top Street White', price: '$1,890 MXN', tag: 'Suela Eva Confort', stock: 'Últimos pares' },
    { id: 3, name: 'Chelsea Boot Charro Waxed', price: '$2,690 MXN', tag: 'Cosido Goodyear Welt', stock: 'Edición Limitada' },
    { id: 4, name: 'Slip-On Minimalist Urbano', price: '$1,490 MXN', tag: 'Lona + Piel', stock: 'Envío Hoy' },
  ];

  const handleBuy = (itemTitle, size) => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `👟 *COMPRA SNEAKERS - ${brandName}*%0A%0AQuiero apartar el modelo: *${itemTitle || dropProduct.title}*%0A• *Colorway:* ${colorways[selectedColorway].name}%0A• *Talla seleccionada:* ${size || selectedSize}%0A• *Precio:* ${dropProduct.price}%0A📍 Enviar desde ${brandCity}. ¿Tienen pago contra entrega o transferencia?`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0C0E14] text-white font-brutalist-mono selection:bg-[#00F59B] selection:text-black">
      <DemoConversionBar
        currentKey="calzado"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP STREETWEAR DROP TICKER */}
      <div className="bg-[#121622] border-b border-white/10 px-6 py-2.5 flex justify-between items-center text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-ping"></span>
          <span className="text-[#00F59B] font-bold">DROP OFICIAL DISPONIBLE</span>
          <span className="text-slate-400 hidden sm:inline">· {brandCity}</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-slate-300">
          <span>ENVÍO EXPRESS GRATIS A TODO MÉXICO</span>
          <span className="text-white font-bold bg-white/10 px-2 py-0.5">3 & 6 MSI</span>
        </div>
      </div>

      {/* HERO SECTION: DIRECT PRODUCT DROP SHOWCASE (TILTED SNEAKER, SIZES, AND BUY) */}
      <section className="px-6 sm:px-12 py-12 lg:py-20 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left 6 Cols: Floating Angle Sneaker Stage */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#141824] to-[#0E111A] border border-white/10">
            <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase">
              {dropProduct.dropCount}
            </div>

            <motion.div
              animate={{ rotate: [-12, -8, -12], y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="relative my-8 max-w-sm w-full"
            >
              <img
                src="/images/calzado.webp"
                alt={dropProduct.title}
                className="w-full h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] contrast-110"
              />
            </motion.div>

            <div className="w-full pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
              <span>{dropProduct.code}</span>
              <span className="text-[#00F59B]">Auténtica piel de curtido vegetal</span>
            </div>
          </div>

          {/* Right 6 Cols: Drop Spec Sheet & Instant Purchase Panel */}
          <div className="lg:col-span-6">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-bold">
              {brandName}
            </div>

            <h1 className="font-brutalist text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4 leading-tight">
              {dropProduct.title}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-brutalist text-4xl text-[#00F59B] font-black">
                {dropProduct.price}
              </span>
              <span className="text-lg text-slate-500 line-through">
                {dropProduct.originalPrice}
              </span>
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 border border-red-500/30 font-bold">
                AHORRA $460 MXN
              </span>
            </div>

            {/* Colorway Selection */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                Colorway: <span className="text-white">{colorways[selectedColorway].name}</span>
              </label>
              <div className="flex gap-3">
                {Object.keys(colorways).map((key) => {
                  const cw = colorways[key];
                  const isSelected = selectedColorway === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedColorway(key)}
                      className={`px-3 py-1.5 border text-xs font-bold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'border-[#00F59B] bg-white/10 text-white'
                          : 'border-white/10 text-slate-400 hover:border-white/30'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white/40"
                        style={{ backgroundColor: cw.hex }}
                      />
                      <span>{cw.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Size Selector MX 25 - 30 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Selecciona Talla Mexicana:
                </label>
                <span className="text-xs text-[#00F59B] underline cursor-pointer">
                  Guía de Tallas (Fiel a la talla)
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 text-center text-xs font-bold border transition-all ${
                      selectedSize === s
                        ? 'bg-[#00F59B] text-black border-[#00F59B] shadow-[0_0_15px_rgba(0,245,155,0.4)]'
                        : 'bg-[#151926] text-white border-white/10 hover:border-white/30'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Instant Buy CTA Button */}
            <button
              onClick={() => handleBuy(dropProduct.title, selectedSize)}
              className="w-full bg-[#00F59B] hover:bg-[#00d485] text-black py-4 font-brutalist text-base font-black uppercase transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              <span>Comprar en Talla {selectedSize} por WhatsApp</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

        </div>
      </section>

      {/* TECHNICAL GRID WITH VISIBLE DIVIDE LINES */}
      <section className="border-b border-white/10 bg-[#0E111A]">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00F59B]">
              Catálogo de Línea · Hecho a Mano en Guanajuato
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {catalog.map((item) => (
              <div key={item.id} className="p-6 flex flex-col justify-between hover:bg-[#151926] transition-colors">
                <div>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 uppercase tracking-wider text-slate-300 font-mono mb-3 inline-block">
                    {item.tag}
                  </span>
                  <h4 className="font-brutalist text-lg font-black uppercase text-white mb-1">
                    {item.name}
                  </h4>
                  <div className="text-xs text-slate-400 mb-4">{item.stock}</div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="font-bold text-base text-[#00F59B]">{item.price}</span>
                  <button
                    onClick={() => handleBuy(item.name, selectedSize)}
                    className="text-xs underline text-white hover:text-[#00F59B]"
                  >
                    Ver Tallas →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-brutalist text-xl text-white uppercase">{brandName}</div>
          <p>{brandCity} · Envíos con seguro y rastreo por Estafeta y DHL</p>
          <p className="text-[10px]">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
