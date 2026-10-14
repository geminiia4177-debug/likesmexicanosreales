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
  Building2,
  DollarSign,
  ArrowRight,
  Calculator,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TulumRealEstateLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || "K'AAN TULUM SANCTUARY & RESIDENCES";
  const brandCity = city || 'Aldea Zamá · Región 15, Tulum, Q.Roo';

  // Currency Switcher: USD <-> MXN
  const [currency, setCurrency] = useState('USD');
  const EXCHANGE_RATE = 19.5;

  // Filter States
  const [filterTypology, setFilterTypology] = useState('all');
  const [filterDelivery, setFilterDelivery] = useState('all');

  // ROI Calculator States
  const [investmentUSD, setInvestmentUSD] = useState(240000); // Inversión seleccionada
  const [occupancyRate, setOccupancyRate] = useState(68); // % ocupación anual estimada
  const [averageDailyRateUSD, setAverageDailyRateUSD] = useState(290); // Tarifa promedio por noche

  // Proyecciones
  const nightsBookedYear = Math.round((occupancyRate / 100) * 365);
  const annualGrossRentalUSD = nightsBookedYear * averageDailyRateUSD;
  const netRentalIncomeUSD = Math.round(annualGrossRentalUSD * 0.72); // 28% OpEx & PM
  const annualAppreciationRate = 0.094; // 9.4% plusvalía histórica Tulum
  const projectedAppreciationUSD = Math.round(investmentUSD * annualAppreciationRate);
  const totalAnnualReturnUSD = netRentalIncomeUSD + projectedAppreciationUSD;
  const totalROI = ((totalAnnualReturnUSD / investmentUSD) * 100).toFixed(1);

  const formatMoney = (usdVal) => {
    if (currency === 'MXN') {
      const mxn = usdVal * EXCHANGE_RATE;
      return `$${Math.round(mxn).toLocaleString('es-MX')} MXN`;
    }
    return `$${Math.round(usdVal).toLocaleString('en-US')} USD`;
  };

  const typologies = [
    {
      id: 'swim_up',
      name: 'Sanctuary Swim-Up Villa',
      specs: '2 Recámaras · 145 m² · Alberca Privada de Chukum',
      usdPrice: 289000,
      delivery: 'Inmediata',
      roiEst: '15.2% Neto',
      image: '/images/tulum.webp',
    },
    {
      id: 'penthouse',
      name: 'Sky Rooftop Penthouse & Solarium',
      specs: '3 Recámaras · 220 m² · Jacuzzi & Vista al Dosel',
      usdPrice: 395000,
      delivery: 'Diciembre 2026',
      roiEst: '16.8% Neto',
      image: '/images/tulum.webp',
    },
    {
      id: 'jungle_loft',
      name: 'Jungle Bio-Loft Sustentable',
      specs: '1 Recámara · 85 m² · Terraza de Madera Zapote',
      usdPrice: 185000,
      delivery: 'Verano 2027',
      roiEst: '14.1% Neto',
      image: '/images/tulum.webp',
    },
  ];

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
    <div className="min-h-screen bg-[#F5F2EB] text-[#1C1B18] font-clinical selection:bg-[#2C3527] selection:text-[#F5F2EB]">
      <DemoConversionBar
        currentKey="tulum"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP NOTIFICATION BAR - EDITORIAL MINIMAL (NO ROUNDED) */}
      <div className="border-b border-stone-300 bg-[#EAE5DC] px-6 py-2.5 text-[11px] uppercase tracking-[0.25em] text-[#5C574F] flex items-center justify-between font-mono-tech">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#2C3527] inline-block"></span>
          <span>{brandCity}</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrency(currency === 'USD' ? 'MXN' : 'USD')}
            className="hover:text-black font-bold tracking-widest text-[10px] underline underline-offset-2"
          >
            DIVISA: [{currency}] (CAMBIAR)
          </button>
          <span className="hidden sm:inline">ENTREGA INMEDIATA & PREVENTA 2026/2027</span>
        </div>
      </div>

      {/* HERO SECTION - 100vh FULL-SCREEN EDITORIAL LUXURY */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden flex flex-col justify-between border-b border-stone-300">
        {/* Full-bleed background image with warm tone */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/tulum.webp"
            alt={brandName}
            className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B18]/90 via-[#1C1B18]/30 to-black/25" />
        </div>

        {/* Minimal Editorial Top Header */}
        <div className="relative z-10 px-6 sm:px-12 pt-8 flex items-center justify-between text-[#F5F2EB]">
          <span className="text-xs uppercase tracking-[0.3em] font-mono-tech opacity-80">
            Architectural Digest Featured · Tulum Real Estate 2026
          </span>
          <button
            onClick={handleBrochure}
            className="text-xs uppercase tracking-[0.2em] font-mono-tech underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Solicitar Dossier Confidencial
          </button>
        </div>

        {/* Bottom Editorial Typography & Property Filter Bar */}
        <div className="relative z-10 px-6 sm:px-12 pb-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#D6CEBE] text-xs sm:text-sm uppercase tracking-[0.35em] font-mono-tech mb-3">
              Residencias Bio-Arquitectónicas en Selva Virgen
            </p>
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F5F2EB] font-normal leading-[0.92] tracking-tight max-w-4xl mb-8">
              {brandName}
            </h1>
          </motion.div>

          {/* Minimalist Property Filter Bar (Zero Radius rounded-none) */}
          <div className="bg-[#1C1B18]/95 backdrop-blur-md border border-[#3E3A33] p-4 text-white grid grid-cols-1 sm:grid-cols-4 gap-4 items-center rounded-none shadow-none">
            <div className="border-b sm:border-b-0 sm:border-r border-[#3E3A33] pb-2 sm:pb-0 sm:pr-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#A69E91] font-mono-tech block mb-1">
                Tipología
              </label>
              <select
                value={filterTypology}
                onChange={(e) => setFilterTypology(e.target.value)}
                className="bg-transparent text-xs text-[#F5F2EB] uppercase tracking-wider outline-none w-full font-editorial cursor-pointer"
              >
                <option value="all" className="bg-[#1C1B18]">Todas las Unidades (1, 2 y 3 Rec.)</option>
                <option value="swim_up" className="bg-[#1C1B18]">Swim-Up Villa</option>
                <option value="penthouse" className="bg-[#1C1B18]">Sky Penthouse</option>
                <option value="jungle_loft" className="bg-[#1C1B18]">Jungle Bio-Loft</option>
              </select>
            </div>

            <div className="border-b sm:border-b-0 sm:border-r border-[#3E3A33] pb-2 sm:pb-0 sm:pr-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#A69E91] font-mono-tech block mb-1">
                Fase de Entrega
              </label>
              <select
                value={filterDelivery}
                onChange={(e) => setFilterDelivery(e.target.value)}
                className="bg-transparent text-xs text-[#F5F2EB] uppercase tracking-wider outline-none w-full font-editorial cursor-pointer"
              >
                <option value="all" className="bg-[#1C1B18]">Todas las Fases</option>
                <option value="immediate" className="bg-[#1C1B18]">Inmediata (Llave en Mano)</option>
                <option value="presale" className="bg-[#1C1B18]">Preventa (2026 - 2027)</option>
              </select>
            </div>

            <div className="border-b sm:border-b-0 sm:border-r border-[#3E3A33] pb-2 sm:pb-0 sm:pr-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#A69E91] font-mono-tech block mb-1">
                Rango Inversión
              </label>
              <div className="text-xs font-mono-tech text-[#D6CEBE]">
                {formatMoney(185000)} — {formatMoney(395000)}
              </div>
            </div>

            <button
              onClick={handleBrochure}
              className="w-full bg-[#F5F2EB] hover:bg-white text-[#1C1B18] py-3 px-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 rounded-none"
            >
              <span>Ver Unidades Disponibles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXCLUSIVE CALCULADORA INTERACTIVA DE ROI VACACIONAL */}
      <section className="py-20 px-6 sm:px-12 border-b border-stone-300 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#7A7468] font-mono-tech block mb-2">
              Proyección Financiera Validada
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-[#1C1B18]">
              Calculadora Interactiva de ROI Vacacional
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono-tech text-[#7A7468] uppercase block">Retorno Anual Estimado Total</span>
            <div className="font-editorial text-4xl sm:text-5xl text-[#2C3527] font-bold">{totalROI}% Anual</div>
          </div>
        </div>

        {/* Two-Column Calculator & Results Box (Zero Border Radius) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-stone-300 bg-white rounded-none">
          {/* Controls (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-stone-300">
            {/* Slider 1: Monto de Inversión */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-widest font-mono-tech text-[#5C574F]">
                  Monto de Inversión Inicial ({currency})
                </span>
                <span className="font-editorial text-2xl font-bold">{formatMoney(investmentUSD)}</span>
              </div>
              <input
                type="range"
                min="185000"
                max="500000"
                step="5000"
                value={investmentUSD}
                onChange={(e) => setInvestmentUSD(Number(e.target.value))}
                className="w-full accent-[#2C3527] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono-tech mt-1">
                <span>{formatMoney(185000)} (Loft)</span>
                <span>{formatMoney(289000)} (Villa)</span>
                <span>{formatMoney(500000)} (Penthouse)</span>
              </div>
            </div>

            {/* Slider 2: Ocupación Estimada */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-widest font-mono-tech text-[#5C574F]">
                  Ocupación Anual Estimada (Airbnb / VRBO)
                </span>
                <span className="font-editorial text-2xl font-bold">{occupancyRate}% ({nightsBookedYear} Noches/año)</span>
              </div>
              <input
                type="range"
                min="45"
                max="85"
                step="1"
                value={occupancyRate}
                onChange={(e) => setOccupancyRate(Number(e.target.value))}
                className="w-full accent-[#2C3527] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono-tech mt-1">
                <span>45% (Conservador)</span>
                <span>68% (Promedio Aldea Zamá)</span>
                <span>85% (Superhost)</span>
              </div>
            </div>

            {/* Slider 3: Tarifa Promedio Noche */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-widest font-mono-tech text-[#5C574F]">
                  Tarifa Promedio por Noche
                </span>
                <span className="font-editorial text-2xl font-bold">{formatMoney(averageDailyRateUSD)} / noche</span>
              </div>
              <input
                type="range"
                min="190"
                max="550"
                step="10"
                value={averageDailyRateUSD}
                onChange={(e) => setAverageDailyRateUSD(Number(e.target.value))}
                className="w-full accent-[#2C3527] cursor-pointer"
              />
            </div>

            <div className="p-4 bg-[#F5F2EB] border border-stone-300 text-xs text-[#5C574F] leading-relaxed font-mono-tech">
              * El modelo contempla una tarifa de Property Management (20%) y costos operativos (8%). Plusvalía proyectada de 9.4% anual calculada con base en escrituras notariales en Tulum 2021-2026.
            </div>
          </div>

          {/* Results Summary (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 bg-[#EFEBE3] flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono-tech text-[#7A7468] block mb-4">
                Desglose Financiero Anual
              </span>
              
              <div className="space-y-4 border-b border-stone-300 pb-6 mb-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#5C574F]">Ingreso Bruto por Rentas:</span>
                  <span className="font-mono-tech font-bold">{formatMoney(annualGrossRentalUSD)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#5C574F]">Flujo Neto Operativo (72%):</span>
                  <span className="font-mono-tech font-bold text-[#2C3527]">{formatMoney(netRentalIncomeUSD)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#5C574F]">Plusvalía Proyectada (9.4% Anual):</span>
                  <span className="font-mono-tech font-bold text-[#2C3527]">{formatMoney(projectedAppreciationUSD)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-[#1C1B18] pt-3 border-t border-stone-300">
                  <span>Ganancia Total Estimada Año 1:</span>
                  <span className="font-editorial text-2xl text-[#2C3527]">{formatMoney(totalAnnualReturnUSD)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBrochure}
              className="w-full bg-[#1C1B18] hover:bg-black text-[#F5F2EB] py-4 px-6 text-xs uppercase tracking-[0.25em] font-mono-tech font-semibold transition-all flex items-center justify-center gap-2 rounded-none"
            >
              <span>Descargar Modelo Financiero Completo</span>
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: UNIDADES DISPONIBLES (ZERO BORDER RADIUS, FINE 1PX LINES) */}
      <section className="py-20 px-6 sm:px-12 border-b border-stone-300 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#7A7468] font-mono-tech block mb-2">
              Inventario de Lujo Silencioso
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-[#1C1B18]">
              Residencias en Aldea Zamá
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {typologies.map((unit) => (
            <div
              key={unit.id}
              className="border border-stone-300 bg-white group hover:border-[#1C1B18] transition-all rounded-none"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={unit.image}
                  alt={unit.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#1C1B18] text-[#F5F2EB] text-[10px] font-mono-tech px-2.5 py-1 uppercase tracking-widest">
                  {unit.delivery}
                </div>
              </div>
              <div className="p-6">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#7A7468] block mb-1">
                  Retorno Proyectado {unit.roiEst}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#1C1B18] mb-2">{unit.name}</h3>
                <p className="text-xs text-[#5C574F] mb-4">{unit.specs}</p>
                <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                  <span className="font-editorial text-xl font-bold text-[#1C1B18]">
                    {formatMoney(unit.usdPrice)}
                  </span>
                  <button
                    onClick={handleBrochure}
                    className="text-xs font-mono-tech uppercase tracking-widest underline hover:text-black transition-colors"
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
      <footer className="py-16 px-6 sm:px-12 bg-[#1C1B18] text-[#A8A193] text-xs font-mono-tech">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-[#35302B] pb-12 mb-8">
          <div>
            <h3 className="font-editorial text-3xl text-white mb-2">{brandName}</h3>
            <p className="text-xs text-[#7A746B]">
              Desarrollos respaldados con escritura pública y fideicomiso bancario en Quintana Roo.
            </p>
          </div>
          <button
            onClick={handleBrochure}
            className="bg-[#F5F2EB] text-[#1C1B18] px-6 py-3 uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors rounded-none"
          >
            Agendar Visita a Showroom Privado
          </button>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between text-[10px] text-[#6A655E] gap-4">
          <span>© 2026 {brandName} · Aldea Zamá / Región 15, Tulum</span>
          <span>ARQUITECTURA BIOCLIMÁTICA · LIKES MEXICANOS REALES</span>
        </div>
      </footer>
    </div>
  );
}
