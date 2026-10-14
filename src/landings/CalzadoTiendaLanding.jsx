import React, { useState } from 'react';
import {
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Clock,
  Eye,
  Sliders,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function CalzadoTiendaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'LEÓN SNEAKER LAB · STREET DIVISION';
  const brandCity = city || 'León, GTO · CDMX Flagship';

  // State for interactive Hero Drop Sheet
  const [selectedColorway, setSelectedColorway] = useState('safety-orange');
  const [sizeUnit, setSizeUnit] = useState('MX'); // 'MX' | 'US' | 'EUR'
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(4); // default 27.0 MX
  const [shippingZip, setShippingZip] = useState('06700');

  // Colorways
  const colorways = {
    'safety-orange': {
      name: 'Safety Orange / Carbon Ash',
      hex: '#FF5500',
      edition: 'DROP 004 · LIMITED 150 PAIRS',
      desc: 'Piel flor entera de curtido vegetal en León, ripstop balístico 500D y detalles reflejantes 3M.'
    },
    'triple-black': {
      name: 'Triple Blackout Stealth',
      hex: '#09090B',
      edition: 'ALL-WEATHER EDITION',
      desc: 'Cuero nobuk encerado resistente al agua, suela Vibram dentada con tracción urbana.'
    },
    'concrete-bone': {
      name: 'Concrete Bone / Raw Sand',
      hex: '#D4D4D8',
      edition: 'ARCHIVAL PROTOTYPE',
      desc: 'Gamuza de cerdo descarne fino, lengüeta de espuma expuesta y entresuela EVA amortiguada.'
    }
  };

  // Sizes matrix with stock status
  const sizesData = [
    { mx: '25.0', us: '7.0', eur: '40', stock: 2, status: 'ÚLTIMOS 2 PARES' },
    { mx: '25.5', us: '7.5', eur: '40.5', stock: 5, status: 'DISPONIBLE' },
    { mx: '26.0', us: '8.0', eur: '41', stock: 8, status: 'DISPONIBLE' },
    { mx: '26.5', us: '8.5', eur: '42', stock: 4, status: 'ALTA DEMANDA' },
    { mx: '27.0', us: '9.0', eur: '42.5', stock: 3, status: '3 PARES EN LEÓN' },
    { mx: '27.5', us: '9.5', eur: '43', stock: 6, status: 'DISPONIBLE' },
    { mx: '28.0', us: '10.0', eur: '44', stock: 2, status: 'ÚLTIMOS 2 PARES' },
    { mx: '28.5', us: '10.5', eur: '44.5', stock: 1, status: '¡ÚLTIMO PAR!' },
    { mx: '29.0', us: '11.0', eur: '45', stock: 3, status: 'DISPONIBLE' },
    { mx: '29.5', us: '11.5', eur: '46', stock: 1, status: '¡ÚLTIMO PAR!' },
  ];

  const currentSizeObj = sizesData[selectedSizeIndex];
  const activeColor = colorways[selectedColorway];

  const dropProduct = {
    model: 'PROTOTYPE-01 "VULCANO LEÓN"',
    sku: 'LSL-MX-2026-V1',
    price: '$2,390 MXN',
    originalPrice: '$2,850 MXN',
    manufacture: 'Hecho a mano en León, Guanajuato',
    delivery: 'Envío Express 24-48h vía DHL / FedEx'
  };

  const handleBuyNow = () => {
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '525512345678';
    const message = `👟 *COMPRA STREETWEAR DROP - ${brandName}*%0A%0AQuiero ordenar el drop limitado:%0A• *Modelo:* ${dropProduct.model}%0A• *Colorway:* ${activeColor.name}%0A• *Talla:* ${currentSizeObj.mx} MX (${currentSizeObj.us} US / ${currentSizeObj.eur} EUR)%0A• *Precio:* ${dropProduct.price}%0A• *SKU:* ${dropProduct.sku}%0A📍 Enviar a C.P. ${shippingZip} desde ${brandCity}. ¿Tienen pago con Mercado Pago o Transferencia?`;
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] text-[#09090B] font-mono-tech selection:bg-[#FF5500] selection:text-white">
      {/* Demo Customizer Bar */}
      <DemoConversionBar
        currentKey="calzado"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP TECHNICAL TICKER / STOCK TELEMETRY */}
      <div className="bg-[#09090B] text-white px-6 py-2.5 text-xs flex flex-wrap justify-between items-center gap-3 border-b-2 border-[#FF5500]">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping"></span>
          <span className="font-bold tracking-wider text-[#FF5500]">RELEASE EN VIVO:</span>
          <span className="hidden sm:inline">DROP OFICIAL N° 004 · PRODUCCIÓN LIMITADA A MANO</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-zinc-400">
          <span className="hidden md:inline">ORIGEN: CAPITAL DEL CALZADO LEÓN, GTO</span>
          <span className="text-white font-bold bg-[#FF5500]/20 px-2 py-0.5 border border-[#FF5500]/50">
            EN STOCK PARA DESPACHO INMEDIATO
          </span>
        </div>
      </div>

      {/* HERO SECTION: INTERACTIVE PRODUCT DROP SHEET (NO GENERIC 2-COLUMNS) */}
      <section className="border-b border-zinc-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-300">
          
          {/* Left Hero Pane (7 Cols): The Tilted Sneaker Display & Visual Badges */}
          <div className="lg:col-span-7 p-6 sm:p-12 flex flex-col justify-between bg-white relative overflow-hidden">
            
            {/* Top Barcode & Drop Metadata */}
            <div className="flex justify-between items-start gap-4 mb-8">
              <div>
                <div className="inline-block bg-[#FF5500] text-black font-brutalist font-black text-xs px-2.5 py-1 tracking-widest uppercase mb-2">
                  DROP EXCLUSIVO · MÉXICO 2026
                </div>
                <h1 className="font-brutalist text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#09090B] leading-none">
                  {dropProduct.model}
                </h1>
                <p className="text-xs text-zinc-500 mt-1 uppercase">
                  {dropProduct.manufacture} · {dropProduct.sku}
                </p>
              </div>

              {/* Monospace Barcode Stamp */}
              <div className="hidden sm:flex flex-col items-end text-[10px] text-zinc-600 font-mono-tech border border-zinc-300 p-2 bg-[#F4F4F5]">
                <div className="tracking-[4px] font-bold text-black select-none">
                  ||| | |||| | ||| || ||||
                </div>
                <span>MX-LEON-REG-774</span>
              </div>
            </div>

            {/* Sneaker Visual Container with Tilt & Dynamic Colorway Glow */}
            <div className="my-8 py-10 relative flex items-center justify-center">
              {/* Giant Background Typography watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="text-[120px] sm:text-[180px] font-brutalist font-black text-zinc-100 uppercase tracking-tighter leading-none">
                  LEÓN
                </span>
              </div>

              {/* Tilted Sneaker Product Card */}
              <motion.div
                animate={{ rotate: [-4, -6, -4] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-full max-w-[460px] cursor-pointer group"
              >
                <div className="aspect-[4/3] rounded-none border-2 border-[#09090B] bg-[#F4F4F5] p-6 shadow-[8px_8px_0px_#09090B] group-hover:shadow-[12px_12px_0px_#FF5500] transition-all">
                  <img
                    src="/images/calzado.webp"
                    alt={dropProduct.model}
                    className="w-full h-full object-cover filter contrast-[1.08] saturate-[1.1] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-8 left-8 bg-[#09090B] text-white px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
                    COLORWAY: {activeColor.name.split('/')[0]}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Spec Sheet Strip */}
            <div className="grid grid-cols-3 gap-2 border-t border-zinc-200 pt-6 text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">CONSTRUCCIÓN</span>
                <span className="font-bold text-[#09090B]">Goodyear Welt 360°</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">MATERIAL PRINCIPAL</span>
                <span className="font-bold text-[#09090B]">Piel Vacuna Genuina</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase">GARANTÍA TALLA</span>
                <span className="font-bold text-[#FF5500]">Cambio Gratis 30 Días</span>
              </div>
            </div>

          </div>

          {/* Right Hero Pane (5 Cols): Interactive Sizing, Stock Verifier & Direct Checkout Widget */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#F4F4F5] flex flex-col justify-between">
            
            <div>
              {/* Price & Drop Status */}
              <div className="border-b border-zinc-300 pb-6 mb-6">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                      PRECIO OFICIAL DE LANZAMIENTO
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="font-brutalist text-4xl sm:text-5xl font-black text-[#09090B]">
                        {dropProduct.price}
                      </span>
                      <span className="text-sm line-through text-zinc-400 font-bold">
                        {dropProduct.originalPrice}
                      </span>
                    </div>
                  </div>
                  <span className="bg-[#FF5500] text-black font-brutalist font-black text-xs px-2 py-1 uppercase">
                    AHORRAS $460
                  </span>
                </div>
                <p className="text-[11px] text-zinc-600 mt-2">
                  Incluye impuestos y calcetines técnicos edición limitada de regalo.
                </p>
              </div>

              {/* 1. SELECTOR DE COLORWAY */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#09090B]">
                    1. SELECCIONA COLORWAY ({Object.keys(colorways).length})
                  </span>
                  <span className="text-[11px] text-[#FF5500] font-bold">
                    {activeColor.edition}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(colorways).map(([key, col]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedColorway(key)}
                      className={`p-3 text-left border-2 transition-all ${
                        selectedColorway === key
                          ? 'border-[#09090B] bg-white shadow-[3px_3px_0px_#09090B]'
                          : 'border-zinc-300 bg-zinc-200/50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black"
                          style={{ backgroundColor: col.hex }}
                        ></span>
                        <span className="text-[10px] font-bold truncate">
                          {key.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[9px] text-zinc-500 truncate leading-none">
                        {col.name.split('/')[0]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. EXCLUSIVE WIDGET: SELECTOR DE TALLAS MX Y VERIFICADOR DE STOCK */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#09090B]">
                    2. SELECCIONA TU TALLA EXACTA
                  </span>

                  {/* Unit Toggle: MX vs US vs EUR */}
                  <div className="flex border border-zinc-400 bg-zinc-200 text-[10px] font-bold">
                    {['MX', 'US', 'EUR'].map((u) => (
                      <button
                        key={u}
                        onClick={() => setSizeUnit(u)}
                        className={`px-2 py-0.5 transition-colors ${
                          sizeUnit === u
                            ? 'bg-[#09090B] text-white'
                            : 'text-zinc-600 hover:text-black'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing Grid (25.0 to 29.5) */}
                <div className="grid grid-cols-5 gap-1.5">
                  {sizesData.map((s, idx) => {
                    const isSelected = selectedSizeIndex === idx;
                    const label = sizeUnit === 'MX' ? s.mx : sizeUnit === 'US' ? s.us : s.eur;

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`py-3 px-1 text-center border transition-all relative ${
                          isSelected
                            ? 'border-2 border-[#09090B] bg-[#09090B] text-white font-black shadow-[3px_3px_0px_#FF5500]'
                            : 'border-zinc-300 bg-white hover:border-[#09090B] text-[#09090B]'
                        }`}
                      >
                        <span className="text-xs font-bold block">{label}</span>
                        <span className={`text-[8px] block mt-0.5 ${isSelected ? 'text-[#FF5500]' : 'text-zinc-400'}`}>
                          {s.stock <= 2 ? `¡${s.stock}! ` : `${s.stock} pz`}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* LIVE STOCK VERIFICATION BANNER */}
                <div className="mt-3 p-3 bg-white border border-zinc-300 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-[#09090B]">
                      Talla {currentSizeObj.mx} MX ({currentSizeObj.us} US):
                    </span>
                    <span className="text-zinc-600 font-semibold">{currentSizeObj.status}</span>
                  </div>
                  <span className="text-[10px] text-[#FF5500] font-bold">DESPACHO 24H</span>
                </div>
              </div>

              {/* Postal Code & Express Shipping Check */}
              <div className="mb-6 flex gap-2">
                <div className="w-full">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                    CÓDIGO POSTAL DE ENVÍO (MÉXICO):
                  </span>
                  <div className="flex">
                    <input
                      type="text"
                      maxLength={5}
                      value={shippingZip}
                      onChange={(e) => setShippingZip(e.target.value)}
                      className="w-full bg-white border border-zinc-300 px-3 py-2 text-xs font-mono-tech uppercase font-bold text-[#09090B] focus:outline-none focus:border-[#09090B]"
                      placeholder="06700"
                    />
                    <div className="bg-zinc-200 border border-l-0 border-zinc-300 px-3 py-2 text-[10px] font-bold text-zinc-700 flex items-center whitespace-nowrap">
                      GRATIS DHL
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div>
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#09090B] hover:bg-[#FF5500] text-white hover:text-black py-4 px-6 font-brutalist font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-[5px_5px_0px_#FF5500] flex items-center justify-center gap-3 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Apartar Talla {currentSizeObj.mx} MX por WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>
              
              <div className="flex justify-between items-center text-[10px] text-zinc-500 mt-3 uppercase">
                <span>✓ Piel 100% Genuina de León</span>
                <span>✓ Envío con Guía Rastreo</span>
                <span>✓ Pago Contra Entrega en CDMX</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* EXPOSED TECHNICAL GRID: SNEAKER ARCHIVE & MATERIAL LAB */}
      <section className="border-b border-zinc-300 bg-white">
        <div className="max-w-7xl mx-auto divide-y md:divide-y-0 md:divide-x divide-zinc-300 grid grid-cols-1 md:grid-cols-4">
          
          <div className="p-8">
            <span className="text-[10px] text-[#FF5500] font-bold uppercase tracking-widest block mb-2">
              LABORATORIO TÉCNICO 01
            </span>
            <h3 className="font-brutalist text-xl font-black uppercase text-[#09090B] mb-2">
              Suela Vulcanizada
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Horneada a 140°C para fusionar el caucho natural con la vira de piel. Cero despegados ni filtración de agua.
            </p>
          </div>

          <div className="p-8">
            <span className="text-[10px] text-[#FF5500] font-bold uppercase tracking-widest block mb-2">
              LABORATORIO TÉCNICO 02
            </span>
            <h3 className="font-brutalist text-xl font-black uppercase text-[#09090B] mb-2">
              Curtido Vegetal
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Pieles tratadas con corteza de roble y mimosa en tenerías tradicionales de Guanajuato sin cromo tóxico.
            </p>
          </div>

          <div className="p-8">
            <span className="text-[10px] text-[#FF5500] font-bold uppercase tracking-widest block mb-2">
              LABORATORIO TÉCNICO 03
            </span>
            <h3 className="font-brutalist text-xl font-black uppercase text-[#09090B] mb-2">
              Plantilla Ergonómica
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Memoria celular de poliuretano de 6 mm con arco de soporte y tratamiento antibacterial con iones de plata.
            </p>
          </div>

          <div className="p-8 bg-[#F4F4F5] flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-2">
                ASISTENCIA EXPRESS
              </span>
              <h3 className="font-brutalist text-lg font-black uppercase text-[#09090B] mb-1">
                ¿Dudas con tu Talla?
              </h3>
              <p className="text-xs text-zinc-600">
                Escríbenos una foto de tu pie contra una hoja y te indicamos la talla milimétrica exacta.
              </p>
            </div>
            <button
              onClick={handleBuyNow}
              className="mt-4 text-xs font-bold text-[#FF5500] hover:underline flex items-center gap-1 uppercase"
            >
              Consultar con un Asesor Sneakerhead →
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#09090B] text-zinc-400 py-12 px-6 sm:px-12 text-xs border-t-2 border-[#FF5500]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-brutalist text-2xl text-white font-black tracking-tight">{brandName}</div>
            <p className="text-[11px] text-zinc-500 mt-1">{brandCity} · Fabricación Artesanal Mexicana</p>
          </div>
          <div className="text-[10px] text-right space-y-1">
            <p className="text-white font-bold">TODOS LOS DROPS NUMERADOS Y REGISTRADOS</p>
            <p className="text-zinc-500">© 2026 LEÓN SNEAKER LAB · HECHO EN MÉXICO</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
