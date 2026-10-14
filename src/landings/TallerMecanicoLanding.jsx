import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  Phone,
  Car,
  ArrowRight,
  AlertTriangle,
  Gauge,
  Check,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TallerMecanicoLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'TALLER MECÁNICO AUTOWERKS';
  const brandCity = city || 'Del Valle · Narvarte · Benito Juárez, CDMX';

  // Symptom Quoter State
  const [selectedSymptom, setSelectedSymptom] = useState('check_engine');
  const [mileageRange, setMileageRange] = useState('60000');
  const [clientPlate, setClientPlate] = useState('');

  const symptoms = {
    check_engine: {
      title: 'Testigo Check Engine Encendido',
      code: 'DIAG-OBD2',
      estimate: '$450 - $950 MXN',
      time: '45 minutos',
      desc: 'Escaneo con scanner Snap-On / Bosch de nivel agencia, lectura de sensores O2, MAF y bobinas.',
      badge: 'URGENTE',
    },
    frenos: {
      title: 'Frenos Rechinan o Pedal Esponjoso',
      code: 'BRAKE-PRO',
      estimate: '$1,200 - $2,400 MXN',
      time: '2 horas',
      desc: 'Cambio de balatas cerámicas, rectificado de discos ventilados y purga de líquido DOT-4.',
      badge: 'SEGURIDAD VIAL',
    },
    afinacion: {
      title: 'Afinación Mayor 10,000 / 20,000 km',
      code: 'TUNE-FULL',
      estimate: '$1,850 - $3,200 MXN',
      time: '3 horas',
      desc: 'Aceite 100% sintético Motul/Castrol, 4 bujías de iridio, filtro de aire, aceite, gasolina y lavado de inyectores con tina ultrasónica.',
      badge: 'MANTENIMIENTO',
    },
    suspension: {
      title: 'Tronido en Baches o Dirección Chueca',
      code: 'SUSP-ALIGN',
      estimate: '$1,400 - $3,800 MXN',
      time: '3.5 horas',
      desc: 'Revisión de amortiguadores, rótulas, bieletas, bujes de horquilla y alineación computarizada 3D.',
      badge: 'CONFORT',
    },
  };

  const currentSymptom = symptoms[selectedSymptom];

  const handleBookDiagnostic = () => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `🚗 *COTIZACIÓN TALLER MECÁNICO - ${brandName}*%0A%0A• *Síntoma reportado:* ${currentSymptom.title}%0A• *Código interno:* ${currentSymptom.code}%0A• *Kilometraje aprox:* ${Number(mileageRange).toLocaleString()} km%0A• *Placa:* ${clientPlate || 'A confirmar'}%0A• *Presupuesto estimado:* ${currentSymptom.estimate}%0A📍 ¿Tienen rampa libre hoy en ${brandCity}?`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  const handleUrgentTow = () => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `🚨 *URGENCIA VIAL / GRÚA - ${brandName}*%0A%0AMi vehículo se quedó varado en la zona de ${brandCity}. Necesito asistencia mecánica inmediata o grúa de plataforma.`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#111114] text-[#E4E4E7] font-industrial-mono selection:bg-[#F59E0B] selection:text-black">
      <DemoConversionBar
        currentKey="taller"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP URGENCY / TOWING EMERGENCY BAR */}
      <div className="bg-[#DC2626] text-white px-6 py-2.5 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 animate-bounce" />
          <span>GRÚA DE PLATAFORMA & AUXILIO VIAL 24/7 EN CDMX Y EDOMEX</span>
        </div>
        <button
          onClick={handleUrgentTow}
          className="bg-black hover:bg-slate-900 text-white px-3 py-1 text-[11px] font-black uppercase tracking-widest border border-white/20 transition-all"
        >
          Pedir Grúa Inmediata 🚨
        </button>
      </div>

      {/* HERO SECTION: TELEMETRY DASHBOARD STYLE */}
      <section className="px-6 sm:px-12 py-16 lg:py-20 max-w-7xl mx-auto border-b border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left 7 Cols: Telemetry Headline */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 px-3 py-1 text-xs font-mono font-bold uppercase mb-6">
              <Gauge className="w-3.5 h-3.5" />
              <span>Diagnóstico Automotriz Computarizado Multimarca</span>
            </div>

            <h1 className="font-industrial text-4xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.92] tracking-tight text-white mb-6">
              Mecánica honesta, sin piezas inventadas ni sorpresas.
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-xl mb-8">
              En {brandName} te enviamos fotos y videos de cada pieza desgastada por WhatsApp antes de reemplazarla. 12 meses de garantía por escrito en refacciones y mano de obra.
            </p>

            {/* Industrial Telemetry Indicators */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#18181C] border-t-4 border-[#F59E0B] border-x border-b border-zinc-800 text-xs mb-8">
              <div>
                <span className="text-zinc-500 block text-[10px]">TIEMPO ENTREGA</span>
                <span className="text-white font-bold text-sm">Mismo Día (80%)</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">GARANTÍA</span>
                <span className="text-[#F59E0B] font-bold text-sm">12 Meses o 20,000 km</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">PAGO SEGURO</span>
                <span className="text-white font-bold text-sm">MSI / Tarjeta / Transfer</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  const el = document.getElementById('cotizador-sintomas');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#F59E0B] hover:bg-[#d97706] text-black px-8 py-3.5 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Cotizar por Síntoma de mi Auto</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <div className="text-xs text-zinc-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F59E0B]" />
                <span>{brandCity}</span>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Technical Vehicle Image Stage */}
          <div className="lg:col-span-5">
            <div className="bg-[#18181C] border border-zinc-800 p-3 border-t-4 border-[#F59E0B]">
              <div className="aspect-[4/3] overflow-hidden relative border border-zinc-800">
                <img
                  src="/images/taller.webp"
                  alt={brandName}
                  className="w-full h-full object-cover filter brightness-90 contrast-110"
                />
                <div className="absolute bottom-2 left-2 bg-black/80 text-[#F59E0B] px-2 py-1 text-[10px] font-mono border border-zinc-700">
                  OBD-II SCANNER READY · 2026
                </div>
              </div>
              <div className="pt-3 text-[11px] text-zinc-400 flex justify-between items-center font-mono">
                <span>Rampas Hidráulicas Italianas</span>
                <span className="text-white font-bold">★★★★★ 4.9 (840 autos)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* EXCLUSIVE COMPONENT: INTERACTIVE SYMPTOM & MILEAGE SERVICE QUOTER */}
      <section id="cotizador-sintomas" className="py-20 px-6 sm:px-12 max-w-5xl mx-auto border-b border-zinc-800">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F59E0B] block mb-2">
            Cotizador Rápido Inteligente
          </span>
          <h2 className="font-industrial text-3xl sm:text-5xl font-black uppercase text-white">
            ¿Qué falla o servicio presenta tu vehículo?
          </h2>
        </div>

        <div className="bg-[#18181C] border border-zinc-800 p-6 sm:p-10 border-t-4 border-[#F59E0B]">
          {/* Step 1: Symptom Selector */}
          <div className="mb-8">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-3 font-bold">
              1. Selecciona el problema principal:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(symptoms).map((key) => {
                const s = symptoms[key];
                const isSelected = selectedSymptom === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedSymptom(key)}
                    className={`p-4 text-left border transition-all text-xs ${
                      isSelected
                        ? 'border-[#F59E0B] bg-[#222228] text-white shadow-md'
                        : 'border-zinc-800 bg-[#121215] text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white uppercase text-sm">{s.title}</span>
                      <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 font-mono">
                        {s.code}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#F59E0B] font-bold">{s.estimate}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Mileage Slider & License Plate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-zinc-800 pt-6 mb-8">
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-zinc-400 font-bold uppercase">2. Kilometraje Actual del Auto:</span>
                <span className="text-[#F59E0B] font-bold font-mono text-sm">
                  {Number(mileageRange).toLocaleString()} KM
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={mileageRange}
                onChange={(e) => setMileageRange(e.target.value)}
                className="w-full accent-[#F59E0B] cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1 font-bold">
                Placa (Para verificar engomado / historial):
              </label>
              <input
                type="text"
                placeholder="Ej: ABC-123-D"
                value={clientPlate}
                onChange={(e) => setClientPlate(e.target.value.toUpperCase())}
                className="w-full bg-[#121215] border border-zinc-700 focus:border-[#F59E0B] p-2.5 text-xs text-white outline-none font-mono"
              />
            </div>
          </div>

          {/* Result Telemetry Box */}
          <div className="border border-zinc-700 bg-[#121215] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#F59E0B] text-black px-2 py-0.5 text-[10px] font-black uppercase">
                  {currentSymptom.badge}
                </span>
                <span className="text-xs text-zinc-400">Tiempo de Taller: ~{currentSymptom.time}</span>
              </div>
              <h4 className="font-industrial text-xl font-bold text-white mb-2">
                {currentSymptom.title}
              </h4>
              <p className="text-xs text-zinc-400 max-w-md">{currentSymptom.desc}</p>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                Costo estimado de servicio
              </div>
              <div className="font-industrial text-2xl font-black text-[#F59E0B] mb-3">
                {currentSymptom.estimate}
              </div>
              <button
                onClick={handleBookDiagnostic}
                className="bg-[#F59E0B] hover:bg-[#d97706] text-black px-6 py-3 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Apartar Cita por WhatsApp</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 text-center text-xs font-mono text-zinc-500">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-industrial text-xl text-white uppercase">{brandName}</div>
          <p>{brandCity} · Centro de Diagnóstico Técnico Automotriz</p>
          <p className="text-[10px]">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
