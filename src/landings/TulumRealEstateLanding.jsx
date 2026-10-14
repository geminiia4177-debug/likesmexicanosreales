import React, { useState } from 'react';
import {
  Compass,
  Palmtree,
  Waves,
  ShieldCheck,
  Key,
  TrendingUp,
  Download,
  Phone,
  Check,
  Star,
  Sparkles,
  Building2,
  DollarSign,
  ArrowRight,
  Calculator,
  MapPin,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TulumRealEstateLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || "K'AAN Tulum Sanctuary & Estates";
  const brandCity = city || 'Región 15 & Aldea Zamá, Tulum, Q.Roo';

  // Currency Switcher
  const [currency, setCurrency] = useState('USD');
  const EXCHANGE_RATE = 19.5;

  // Filter State
  const [filterTypology, setFilterTypology] = useState('all');
  const [filterDelivery, setFilterDelivery] = useState('all');

  // ROI Calculator State
  const [nightsBooked, setNightsBooked] = useState(21); // noches al mes
  const [dailyRateUSD, setDailyRateUSD] = useState(280); // USD por noche

  // Interactive Amenities Blueprint State
  const [activeAmenity, setActiveAmenity] = useState('cenote');

  const typologies = [
    {
      id: 'swim_up',
      name: 'Sanctuary Swim-Up Villa',
      specs: '2 Recámaras · 145 m² · Alberca Privada de Chukum',
      usdPrice: 289000,
      delivery: 'Inmediata',
      roiEst: '14.8%',
      image: '/images/tulum.webp',
    },
    {
      id: 'penthouse',
      name: 'Sky Rooftop Penthouse',
      specs: '3 Recámaras · 220 m² · Solárium & Jacuzzi Privado',
      usdPrice: 395000,
      delivery: 'Diciembre 2026',
      roiEst: '16.2%',
      image: '/images/tulum.webp',
    },
    {
      id: 'jungle_loft',
      name: 'Jungle Bio-Loft',
      specs: '1 Recámara · 85 m² · Vista Panorámica al Dosel',
      usdPrice: 185000,
      delivery: 'Verano 2027',
      roiEst: '13.5%',
      image: '/images/tulum.webp',
    },
  ];

  const amenities = {
    cenote: {
      name: 'Cenote Privado Natural',
      desc: 'Formación subterránea natural integrada al desarrollo con filtración orgánica y acceso exclusivo.',
      coord: 'Zona Central Norte',
    },
    spa: {
      name: 'Holistic Spa & Temazcal Ceremonial',
      desc: 'Área de sanación sonora, masajes botánicos mayas y circuito hidrotermal bajo la selva.',
      coord: 'Ala Poniente',
    },
    beachclub: {
      name: 'Membresía Exclusiva Beach Club',
      desc: 'Acceso VIP y camas reservadas frente al mar caribeño de Tulum con concierge 24/7.',
      coord: 'Transportación privada incluida',
    },
    cowork: {
      name: 'Jungle Atelier & Coworking de Fibra Óptica',
      desc: 'Starlink de alta velocidad, salas privadas y cafetería de especialidad chiapaneca.',
      coord: 'Pabellón Principal',
    },
  };

  const formatPrice = (usd) => {
    if (currency === 'MXN') {
      const mxn = usd * EXCHANGE_RATE;
      return `$${mxn.toLocaleString('es-MX')} MXN`;
    }
    return `$${usd.toLocaleString('en-US')} USD`;
  };

  // ROI Math
  const monthlyGrossUSD = nightsBooked * dailyRateUSD;
  const annualGrossUSD = monthlyGrossUSD * 12;
  const netOperatingIncomeUSD = annualGrossUSD * 0.72; // 28% HOA & PM fee
  const selectedUnit = typologies[0];
  const capRate = ((netOperatingIncomeUSD / selectedUnit.usdPrice) * 100).toFixed(1);

  const handleBrochure = () => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    window.open(
      `https://wa.me/${wa}?text=${encodeURIComponent(
        `Hola ${brandName}, deseo recibir el Dossier de Inversión y Masterplan Privado en PDF de ${brandCity}.`
      )}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E1C1A] font-clinical selection:bg-[#2C2926] selection:text-[#FDFBF7]">
      <DemoConversionBar
        currentKey="tulum"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP NOTIFICATION BAR - EDITORIAL MINIMAL */}
      <div className="border-b border-[#E8E4DC] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[#6E6A64] flex items-center justify-between font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#2C2926] inline-block"></span>
          <span>{brandCity}</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrency(currency === 'USD' ? 'MXN' : 'USD')}
            className="hover:text-black transition-colors font-bold tracking-widest text-[10px]"
          >
            MONEDA: [{currency}] (CAMBIAR)
          </button>
          <span className="hidden sm:inline">ENTREGA INMEDIATA & PREVENTA 2026</span>
        </div>
      </div>

      {/* HERO SECTION - 100vh FULL-SCREEN EDITORIAL LUXURY */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden flex flex-col justify-between border-b border-[#E8E4DC]">
        {/* Full-bleed background image with subtle warm tone */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/tulum.webp"
            alt={brandName}
            className="w-full h-full object-cover filter brightness-[0.78] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
        </div>

        {/* Minimal Editorial Header */}
        <div className="relative z-10 px-6 sm:px-12 pt-8 flex items-center justify-between text-white">
          <span className="text-xs uppercase tracking-[0.3em] font-mono opacity-80">
            Architectural Digest Featured · Tulum 2026
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={handleBrochure}
              className="text-xs uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Solicitar Dossier Confidencial
            </button>
          </div>
        </div>

        {/* Bottom Editorial Serif Typography & Property Search Bar */}
        <div className="relative z-10 px-6 sm:px-12 pb-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#C4BDB3] text-xs sm:text-sm uppercase tracking-[0.35em] font-mono mb-3">
              Residencias Bio-Arquitectónicas en Selva
            </p>
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-[0.92] tracking-tight max-w-4xl mb-8">
              {brandName}
            </h1>
          </motion.div>

          {/* Minimalist Property Filter Bar (Zero Radius) */}
          <div className="bg-[#1E1C1A]/90 backdrop-blur-md border border-[#3E3A35] p-3 sm:p-4 text-white grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
            <div className="border-b sm:border-b-0 sm:border-r border-[#3E3A35] pb-2 sm:pb-0 sm:pr-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#9E988F] font-mono block mb-1">
                Tipología
              </label>
              <select
                value={filterTypology}
                onChange={(e) => setFilterTypology(e.target.value)}
                className="bg-transparent text-xs text-white uppercase tracking-wider outline-none w-full font-editorial cursor-pointer"
              >
                <option value="all" className="bg-[#1E1C1A]">Todas las Unidades (1, 2 y 3 Rec.)</option>
                <option value="swim_up" className="bg-[#1E1C1A]">Swim-Up Villa</option>
                <option value="penthouse" className="bg-[#1E1C1A]">Rooftop Penthouse</option>
                <option value="jungle_loft" className="bg-[#1E1C1A]">Jungle Bio-Loft</option>
              </select>
            </div>

            <div className="border-b sm:border-b-0 sm:border-r border-[#3E3A35] pb-2 sm:pb-0 sm:pr-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#9E988F] font-mono block mb-1">
                Fase de Entrega
              </label>
              <select
                value={filterDelivery}
                onChange={(e) => setFilterDelivery(e.target.value)}
                className="bg-transparent text-xs text-white uppercase tracking-wider outline-none w-full font-editorial cursor-pointer"
              >
                <option value="all" className="bg-[#1E1C1A]">Todas las Fases</option>
                <option value="immediate" className="bg-[#1E1C1A]">Inmediata (Llave en Mano)</option>
                <option value="presale" className="bg-[#1E1C1A]">Preventa (2026 - 2027)</option>
              </select>
            </div>

            <div className="border-b sm:border-b-0 sm:border-r border-[#3E3A35] pb-2 sm:pb-0 sm:pr-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#9E988F] font-mono block mb-1">
                Rango Inversión
              </label>
              <div className="text-xs font-mono text-[#D4CDC3]">
                {currency === 'USD' ? 'Desde $185,000 USD' : 'Desde $3,607,500 MXN'}
              </div>
            </div>

            <button
              onClick={handleBrochure}
              className="w-full bg-[#FAF7F0] hover:bg-white text-[#1E1C1A] py-2.5 px-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>Ver Disponibilidad</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXCLUSIVE INTERACTIVE ROI CALCULATOR (USD VACATION RENTAL) */}
      <section className="py-20 px-6 sm:px-12 border-b border-[#E8E4DC] max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#7C776F] font-mono block mb-2">
              Proyección Financiera Validada
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-[#1E1C1A]">
              Simulador de Rendimiento por Rentas Vacacionales
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-[#7C776F] uppercase">Rendimiento Estimado</span>
            <div className="font-editorial text-4xl text-[#1E1C1A]">{capRate}% Cap Rate Neto</div>
          </div>
        </div>

        {/* Two-Column Calculator & Results Box (Zero Border Radius) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#E8E4DC] bg-white">
          {/* Controls (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#E8E4DC]">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-widest font-mono text-[#5A5650]">
                  Tarifa Promedio por Noche en Airbnb / VRBO (USD)
                </span>
                <span className="font-editorial text-2xl font-bold">${dailyRateUSD} USD</span>
              </div>
              <input
                type="range"
                min="180"
                max="650"
                step="10"
                value={dailyRateUSD}
                onChange={(e) => setDailyRateUSD(Number(e.target.value))}
                className="w-full accent-[#1E1C1A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#999] font-mono mt-1">
                <span>$180 USD (Temporada Baja)</span>
                <span>$400 USD (Media)</span>
                <span>$650 USD (Temporada Alta)</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-widest font-mono text-[#5A5650]">
                  Ocupación Mensual (Noches reservadas)
                </span>
                <span className="font-editorial text-2xl font-bold">{nightsBooked} Noches ({(nightsBooked / 30 * 100).toFixed(0)}%)</span>
              </div>
              <input
                type="range"
                min="10"
                max="28"
                step="1"
                value={nightsBooked}
                onChange={(e) => setNightsBooked(Number(e.target.value))}
                className="w-full accent-[#1E1C1A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#999] font-mono mt-1">
                <span>10 Noches (33%)</span>
                <span>20 Noches (67%)</span>
                <span>28 Noches (93%)</span>
              </div>
            </div>

            <div className="p-4 bg-[#F8F5EE] border border-[#E8E4DC] text-xs text-[#5A5650] leading-relaxed">
              * El modelo contempla una tarifa de administración profesional de propiedad (Property Management) del 20% y cuota de mantenimiento de amenidades del 8%.
            </div>
          </div>

          {/* Results Summary (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#FAF7F0] flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#7C776F] block mb-4">
                Desglose Anual Proyectado (Unidad {selectedUnit.name})
              </span>
              <div className="space-y-4 border-b border-[#E8E4DC] pb-6 mb-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#6E6A64]">Ingreso Bruto Mensual:</span>
                  <span className="font-mono font-bold">${monthlyGrossUSD.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#6E6A64]">Ingreso Bruto Anual:</span>
                  <span className="font-mono font-bold">${annualGrossUSD.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-[#1E1C1A] pt-2">
                  <span>Flujo Neto Anual Estimado:</span>
                  <span className="font-editorial text-2xl text-[#1E1C1A]">${Math.round(netOperatingIncomeUSD).toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBrochure}
              className="w-full bg-[#1E1C1A] hover:bg-black text-white py-3.5 px-6 text-xs uppercase tracking-[0.25em] font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>Descargar Modelo Financiero Completo</span>
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE BLUEPRINT & AMENITIES PLAN */}
      <section className="py-20 px-6 sm:px-12 border-b border-[#E8E4DC] max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#7C776F] font-mono block mb-2">
            Masterplan 2.4 Hectáreas
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-[#1E1C1A]">
            Plano Interactivo de Amenidades y Bio-Conservación
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#E8E4DC]">
          {/* Amenity Buttons List (5 Cols) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#E8E4DC] divide-y divide-[#E8E4DC] bg-white">
            {Object.keys(amenities).map((key) => {
              const item = amenities[key];
              const isSelected = activeAmenity === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveAmenity(key)}
                  className={`w-full text-left p-6 transition-all flex items-start justify-between ${
                    isSelected ? 'bg-[#FAF7F0]' : 'hover:bg-[#FDFBF7]'
                  }`}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#8C877E] block mb-1">
                      {item.coord}
                    </span>
                    <h4 className="font-editorial text-xl font-bold text-[#1E1C1A] mb-2">{item.name}</h4>
                    <p className="text-xs text-[#6A655E] leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                  <span className={`text-lg font-mono ml-3 ${isSelected ? 'text-black' : 'text-[#CCC]'}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Visual Blueprint Display (7 Cols) */}
          <div className="lg:col-span-7 bg-[#23201D] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#A8A196] block mb-3">
                Especificación Arquitectónica
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-normal mb-4 text-[#F5F2EB]">
                {amenities[activeAmenity].name}
              </h3>
              <p className="text-sm text-[#C8C2B7] leading-relaxed max-w-lg mb-8 font-light">
                {amenities[activeAmenity].desc}
              </p>
            </div>

            {/* Architectural diagram graphic */}
            <div className="relative z-10 border border-[#4A453F] p-4 bg-[#1A1816]/70 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse"></span>
                <span>UBICACIÓN: {amenities[activeAmenity].coord}</span>
              </div>
              <button
                onClick={handleBrochure}
                className="text-xs underline hover:text-[#00F59B] transition-colors"
              >
                Solicitar renders en alta resolución
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: TYPOLOGIES GALLERY WITH FINE LINES */}
      <section className="py-20 px-6 sm:px-12 border-b border-[#E8E4DC] max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#7C776F] font-mono block mb-2">
              Colección Residencial
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-[#1E1C1A]">
              Unidades Disponibles en Aldea Zamá
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {typologies.map((unit) => (
            <div
              key={unit.id}
              className="border border-[#E8E4DC] bg-white group hover:border-[#1E1C1A] transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={unit.image}
                  alt={unit.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#1E1C1A] text-white text-[10px] font-mono px-2 py-1 uppercase tracking-widest">
                  {unit.delivery}
                </div>
              </div>
              <div className="p-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#7C776F] block mb-1">
                  Retorno Proyectado {unit.roiEst}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1E1C1A] mb-2">{unit.name}</h3>
                <p className="text-xs text-[#6A655E] mb-4">{unit.specs}</p>
                <div className="flex items-center justify-between border-t border-[#E8E4DC] pt-4">
                  <span className="font-editorial text-xl font-bold text-[#1E1C1A]">
                    {formatPrice(unit.usdPrice)}
                  </span>
                  <button
                    onClick={handleBrochure}
                    className="text-xs font-mono uppercase tracking-widest underline hover:text-black transition-colors"
                  >
                    Ficha Técnica →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER - SILENT LUXURY EDITORIAL */}
      <footer className="py-16 px-6 sm:px-12 bg-[#1A1816] text-[#A8A196] text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-[#35302B] pb-12 mb-8">
          <div>
            <h3 className="font-editorial text-3xl text-white mb-2">{brandName}</h3>
            <p className="text-xs text-[#7A746B]">
              Desarrollos respaldados con escritura pública y fideicomiso bancario en Quintana Roo.
            </p>
          </div>
          <button
            onClick={handleBrochure}
            className="bg-white text-black px-6 py-3 uppercase tracking-[0.2em] font-semibold hover:bg-[#FAF7F0] transition-colors"
          >
            Agendar Visita a Showroom Privado
          </button>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between text-[10px] text-[#6A655E] gap-4">
          <span>© 2026 {brandName} · Aldea Zamá / Región 15, Tulum</span>
          <span>DISEÑO EDITORIAL ARQUITECTÓNICO · LIKES MEXICANOS REALES</span>
        </div>
      </footer>
    </div>
  );
}
