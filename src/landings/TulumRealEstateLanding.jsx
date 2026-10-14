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
  Calculator
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TulumRealEstateLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || "K'AAN Tulum Estates";
  const brandCity = city || 'Aldea Zamá / Región 15, Tulum, Q.Roo';

  // 1. Currency Switcher (USD <-> MXN)
  const [currency, setCurrency] = useState('USD'); // 'USD' or 'MXN'
  const EXCHANGE_RATE = 19.5; // 1 USD = 19.50 MXN

  // 2. ROI Calculator State
  const [nightsBooked, setNightsBooked] = useState(20);
  const [dailyRateUSD, setDailyRateUSD] = useState(240); // USD

  // 3. Tipología Activa
  const [activeTypology, setActiveTypology] = useState('swim_up');

  // 4. Simulador de Financiamiento Directo
  const [downPaymentTier, setDownPaymentTier] = useState(30); // 30%, 50%, 80%

  const typologies = {
    jungle_loft: {
      name: 'Jungle Loft Garden (1 Recámara)',
      usdPrice: 179000,
      area: '68 m²',
      desc: 'Plunge pool privada de chukum, terraza con vista a vegetación endémica y regadera exterior.',
    },
    swim_up: {
      name: 'Swim-up Condo Luxury (2 Recámaras)',
      usdPrice: 245000,
      area: '105 m²',
      desc: 'Acceso directo desde tu terraza a canal de nado biofílico y lock-off para doble renta simultánea.',
    },
    penthouse: {
      name: 'Sky Penthouse con Rooftop Privado (3 Rec)',
      usdPrice: 340000,
      area: '162 m²',
      desc: 'Rooftop panorámico privado, alberca infinita con vista a la selva maya y asador teppanyaki.',
    },
  };

  const currentUnit = typologies[activeTypology];

  // Helper to format currency
  const formatMoney = (usdVal) => {
    if (currency === 'USD') {
      return `$${usdVal.toLocaleString('en-US')} USD`;
    }
    const mxnVal = Math.round(usdVal * EXCHANGE_RATE);
    return `$${mxnVal.toLocaleString('es-MX')} MXN`;
  };

  // Financing discounts based on down payment
  const discountRate = downPaymentTier === 80 ? 0.08 : downPaymentTier === 50 ? 0.04 : 0;
  const listPriceUSD = currentUnit.usdPrice;
  const finalPriceUSD = Math.round(listPriceUSD * (1 - discountRate));
  const downPaymentAmountUSD = Math.round(finalPriceUSD * (downPaymentTier / 100));
  const duringConstructionUSD = Math.round(finalPriceUSD * 0.40); // 40% durante obra
  const onDeliveryUSD = Math.max(0, finalPriceUSD - downPaymentAmountUSD - duringConstructionUSD);

  // ROI calculations
  const monthlyGrossUSD = nightsBooked * dailyRateUSD;
  const annualGrossUSD = monthlyGrossUSD * 12;
  const netAnnualUSD = Math.round(annualGrossUSD * 0.72); // 72% net after property management
  const capRate = ((netAnnualUSD / listPriceUSD) * 100).toFixed(1);

  // Download Financial Corrida simulation
  const handleDownloadFinancialRun = () => {
    const textContent = `
=====================================================
CORRIDA FINANCIERA & PROYECCIÓN DE PLUSVALÍA 2026
DESARROLLO: ${brandName.toUpperCase()}
UBICACIÓN: ${brandCity}
=====================================================
Fecha: ${new Date().toLocaleDateString('es-MX')}
Unidad Seleccionada: ${currentUnit.name}
Superficie: ${currentUnit.area}
Tipo de Cambio Referencial: 1 USD = $${EXCHANGE_RATE} MXN

ESTRUCTURA DE COMPRA FINANCIADA:
• Precio de Lista Oficial: ${formatMoney(listPriceUSD)}
• Descuento por Pronto Pago (${(discountRate * 100)}%): -${formatMoney(listPriceUSD - finalPriceUSD)}
• PRECIO FINAL DE ADQUISICIÓN: ${formatMoney(finalPriceUSD)}

ESQUEMA DE PAGOS:
1. Enganche Inicial (${downPaymentTier}%): ${formatMoney(downPaymentAmountUSD)}
2. Mensualidades durante obra (40% en 18 meses): ${formatMoney(duringConstructionUSD)} (~${formatMoney(Math.round(duringConstructionUSD / 18))} / mes)
3. Saldo Contra-Entrega Llave en Mano (2026): ${formatMoney(onDeliveryUSD)}

PROYECCIÓN DE RETORNO (CAP RATE):
• Ocupación proyectada: ${nightsBooked} noches/mes (~${Math.round((nightsBooked / 30) * 100)}% anual)
• Tarifa promedio diaria: ${formatMoney(dailyRateUSD)} / noche
• Ingreso Anual Neto Proyectado: ${formatMoney(netAnnualUSD)}
• Cap Rate Anual Estimado: ${capRate}% NETO
=====================================================
Para apartar tu unidad con $5,000 USD reembolsables, contáctanos a través de tu asesor AMPI.
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Corrida_Financiera_${currentUnit.name.replace(/\s+/g, '_')}_${currency}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola ${brandName} 🌴! Deseo apartar información sobre ${currentUnit.name}:\n\n• Moneda: ${currency}\n• Precio con descuento: ${formatMoney(finalPriceUSD)}\n• Esquema de enganche: ${downPaymentTier}% (${formatMoney(downPaymentAmountUSD)})\n• Cap Rate proyectado: ${capRate}%\n• Ubicación: ${brandCity}\n\n¿Me pueden enviar el Master Plan y disponibilidad de entrega 2026?`
  );

  return (
    <div className="min-h-screen bg-[#070B0D] text-[#E2EBE9] font-sans selection:bg-teal-500/30 relative pb-16">
      {/* Demo Conversion Bar */}
      <DemoConversionBar
        currentKey="tulum"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-stone-900 text-teal-200 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-teal-800/40 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-teal-400" />
        <span>Pre-Venta Fase 2 Exclusiva en {brandCity} • Entrega 2026 • Financiamiento Directo a Desarrollador</span>
      </div>

      {/* Header */}
      <header className="sticky top-[49px] z-40 bg-[#070B0D]/90 backdrop-blur-md border-b border-teal-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-teal-300 border border-teal-500/30 flex items-center gap-1.5 transition-colors"
              >
                ← Volver al Portal
              </button>
            )}
            <div className="flex items-center gap-2">
              <Palmtree className="w-6 h-6 text-teal-400" />
              <span className="font-serif tracking-widest text-lg sm:text-xl font-bold text-teal-100 uppercase">
                {brandName}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-stone-300">
            <a href="#tipologias" className="hover:text-teal-300 transition-colors">Tipologías</a>
            <a href="#financiamiento" className="hover:text-teal-300 transition-colors">Financiamiento</a>
            <a href="#roi" className="hover:text-teal-300 transition-colors">Calculadora ROI</a>
          </div>

          {/* 1. Currency Switcher Pill */}
          <div className="flex items-center gap-2">
            <div className="flex bg-black/60 p-1 rounded-xl border border-teal-500/30 text-xs font-mono">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  currency === 'USD' ? 'bg-teal-500 text-stone-950 shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                USD $
              </button>
              <button
                onClick={() => setCurrency('MXN')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  currency === 'MXN' ? 'bg-teal-500 text-stone-950 shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                MXN $
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/60 border border-teal-600/40 text-teal-300 text-xs font-semibold">
              <Compass className="w-4 h-4" /> {brandCity}
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-black text-stone-50 leading-[1.1] tracking-tight">
              Arquitectura ancestral, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-400 to-amber-300">
                rentabilidad garantizada
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Condominios boutique sustentables con acabados en chukum, alberca privada tipo plunge pool y acceso a cenote sagrado natural en {brandCity}.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-lg pt-2 text-center">
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-teal-900/40">
                <span className="block text-2xl font-black text-teal-400">{capRate}%</span>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider">Cap Rate Anual</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-teal-900/40">
                <span className="block text-2xl font-black text-teal-400">{formatMoney(179000).split(' ')[0]}</span>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider">Pre-Venta Desde</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-teal-900/40">
                <span className="block text-2xl font-black text-teal-400">AMPI</span>
                <span className="text-[11px] text-stone-400 uppercase tracking-wider">Certeza Jurídica</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#financiamiento"
                className="px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <span>Simular Financiamiento Directo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleDownloadFinancialRun}
                className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-teal-300 border border-teal-500/30 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Corrida Financiera</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-teal-500/30 shadow-[0_20px_70px_rgba(20,184,166,0.25)]">
              <img
                src="/images/tulum.webp"
                alt="Luxury Real Estate Tulum"
                loading="lazy"
                decoding="async"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B0D] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipologías Section */}
      <section id="tipologias" className="py-16 px-6 bg-[#0B1013] border-t border-teal-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Master Plan 2026</span>
              <h2 className="text-3xl font-serif font-black text-white mt-1">Tipologías Residenciales</h2>
            </div>
            <div className="flex bg-black/60 p-1 rounded-xl border border-white/10">
              {Object.entries(typologies).map(([k, u]) => (
                <button
                  key={k}
                  onClick={() => setActiveTypology(k)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTypology === k ? 'bg-teal-500 text-stone-950 shadow' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {u.name.split(' ')[0]} {u.name.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/70 border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs font-bold">
                {currentUnit.area} Interiores + Plunge Pool
              </span>
              <h3 className="text-2xl font-serif font-black text-white mt-2">{currentUnit.name}</h3>
              <p className="text-xs text-stone-300 max-w-lg mt-1">{currentUnit.desc}</p>
            </div>

            <div className="text-center md:text-right flex-shrink-0">
              <span className="text-xs text-stone-400 block">Valor de Lista ({currency}):</span>
              <div className="font-mono text-3xl sm:text-4xl font-black text-teal-400">
                {formatMoney(currentUnit.usdPrice)}
              </div>
              <span className="text-[10px] text-stone-500 block">Llave en mano con equipamiento completo</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Simulador de Financiamiento Directo */}
      <section id="financiamiento" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-teal-500/40 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                Sin Buró de Crédito • Trato Directo
              </span>
              <h3 className="text-2xl font-serif font-black text-white">
                Simulador de Financiamiento en Obra
              </h3>
            </div>

            {/* Down Payment Tiers */}
            <div className="flex gap-2">
              {[30, 50, 80].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setDownPaymentTier(tier)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                    downPaymentTier === tier
                      ? 'bg-teal-500 text-stone-950 border-teal-500 shadow'
                      : 'bg-white/5 text-stone-400 border-white/10 hover:text-white'
                  }`}
                >
                  Enganche {tier}% {tier === 80 ? '(-8% OFF)' : tier === 50 ? '(-4% OFF)' : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-black/50 border border-stone-800">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Enganche Inicial ({downPaymentTier}%)</span>
              <span className="font-mono text-lg font-black text-teal-400 mt-1 block">
                {formatMoney(downPaymentAmountUSD)}
              </span>
              <span className="text-[10px] text-stone-500 block">Al firmar contrato de promesa</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-stone-800">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">40% en Obra (18 Meses)</span>
              <span className="font-mono text-lg font-black text-white mt-1 block">
                {formatMoney(duringConstructionUSD)}
              </span>
              <span className="text-[10px] text-stone-500 block">~{formatMoney(Math.round(duringConstructionUSD / 18))} / mes</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-stone-800">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Saldo a la Entrega 2026</span>
              <span className="font-mono text-lg font-black text-amber-400 mt-1 block">
                {formatMoney(onDeliveryUSD)}
              </span>
              <span className="text-[10px] text-stone-500 block">Recurso propio o crédito bancario</span>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-stone-400">Precio Total Adquisición con Descuento:</span>
              <div className="font-mono text-2xl font-black text-white">
                {formatMoney(finalPriceUSD)}
              </div>
            </div>

            <div className="flex gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleDownloadFinancialRun}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 border border-white/15"
              >
                <Download className="w-4 h-4 text-teal-400" />
                <span>Descargar Corrida</span>
              </button>

              <a
                href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Apartar Unidad</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-stone-500 border-t border-teal-900/30">
        <p>© 2026 {brandName} • Bienes Raíces Sustentables en {brandCity}.</p>
      </footer>
    </div>
  );
}
