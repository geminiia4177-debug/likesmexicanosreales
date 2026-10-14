import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  ShieldCheck,
  Calendar,
  Phone,
  CheckCircle2,
  Award,
  Clock,
  ArrowRight,
  HeartPulse,
  CreditCard,
  Sliders,
  Eye
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function DentalPolancoLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'Oralé Studio Polanco';
  const brandCity = city || 'Polanco Masaryk, CDMX';

  const [selectedTreatment, setSelectedTreatment] = useState('carillas');
  const [selectedMsi, setSelectedMsi] = useState(12); // 3, 6, 9, 12 MSI
  const [selectedShade, setSelectedShade] = useState('BL1'); // BL1, BL2, BL3, Natural
  const [sliderPosition, setSliderPosition] = useState(50);
  const [appointmentSent, setAppointmentSent] = useState(false);
  const [patient, setPatient] = useState({ name: '', phone: '', date: '' });

  // 1. Shading Matrix with CSS Filters
  const shades = {
    BL1: { name: 'BL1 Hollywood White', desc: 'Blanco máximo deslumbrante estilo alfombra roja', filter: 'brightness(1.18) contrast(1.08) saturate(0.9)' },
    BL2: { name: 'BL2 Blanco Estético', desc: 'Blanco luminoso de alta gama con naturalidad', filter: 'brightness(1.10) contrast(1.04)' },
    BL3: { name: 'BL3 Armonía Natural', desc: 'Tonalidad cálida que emula esmalte joven', filter: 'brightness(1.04) sepia(0.04)' },
    Natural: { name: 'Natural Pearl', desc: 'Translúcido marfil con bordes incisales de perla', filter: 'brightness(1.0) saturate(1.05)' },
  };

  const treatments = {
    carillas: {
      name: 'Carillas de Porcelana E-Max & Feldespáticas',
      priceTotal: 65000, // 8 carillas
      desc: 'Lentes de contacto dental ultrafinas (0.3 mm) personalizadas para corregir forma, tamaño y tonalidad con brillo eterno.',
      duration: '2 sesiones de colocación',
      warranty: '10 años de garantía escrita',
      ideal: 'Dientes manchados, desgaste dental o diastemas.',
    },
    diseno3d: {
      name: 'Diseño Digital de Sonrisa 3D (DSD)',
      priceTotal: 18000,
      desc: 'Escaneo intraoral tridimensional sin pastas molestas. Visualiza tu nueva sonrisa en pantalla y pruébatela antes del tratamiento.',
      duration: '1 sesión de simulación digital',
      warranty: 'Aprobación estética previa al 100%',
      ideal: 'Pacientes que buscan armonización orofacial integral.',
    },
    invisalign: {
      name: 'Ortodoncia Invisible con Alineadores',
      priceTotal: 48000,
      desc: 'Alinea tus dientes discretamente con tecnología computarizada alemana. Cómodos, removibles y sin alambres metálicos.',
      duration: '6 a 14 meses promedio',
      warranty: 'Seguimiento con escáner cada 4 semanas',
      ideal: 'Apiñamiento dental y mordidas desalineadas.',
    },
    laser: {
      name: 'Blanqueamiento Láser Philips Zoom 4',
      priceTotal: 5800,
      desc: 'Aclara hasta 8 tonos en una sola sesión de 60 minutos con protección gingival avanzada y nula sensibilidad dental.',
      duration: '1 sola sesión de 60 min',
      warranty: 'Protocolo de sellado anti-manchas',
      ideal: 'Eventos especiales, bodas o rejuvenecimiento dental.',
    },
  };

  const current = treatments[selectedTreatment];
  const monthlyPayment = Math.round(current.priceTotal / selectedMsi);

  const handleAppointment = (e) => {
    e.preventDefault();
    setAppointmentSent(true);
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola ${brandName} 🦷! Me interesa agendar mi valoración en ${brandCity}:\n\n• Tratamiento: ${current.name} ($${current.priceTotal.toLocaleString('es-MX')} MXN)\n• Tono de Carilla simulado: ${shades[selectedShade].name}\n• Plan de financiamiento: ${selectedMsi} MSI de $${monthlyPayment.toLocaleString('es-MX')} MXN/mes\n• Nombre: ${patient.name || 'Paciente'} (${patient.phone || ''})\n\n¿Tienen disponibilidad para valoración 3D esta semana?`
  );

  return (
    <div className="min-h-screen bg-[#070A0F] text-[#E0E7EF] font-sans selection:bg-cyan-500/30 relative pb-16">
      {/* Demo Conversion Bar */}
      <DemoConversionBar
        currentKey="dental"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-sky-950 text-cyan-200 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-cyan-800/40 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span>Ubicados en {brandCity} • Consulta de Valoración Digital 3D sin Costo • Facilidades hasta 12 Meses sin Intereses</span>
      </div>

      {/* Header */}
      <header className="sticky top-[49px] z-40 bg-[#070A0F]/90 backdrop-blur-md border-b border-cyan-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-colors"
              >
                ← Volver al Portal
              </button>
            )}
            <div className="flex items-center gap-2">
              <HeartPulse className="w-6 h-6 text-cyan-400" />
              <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white">
                {brandName}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#simulador" className="hover:text-cyan-400 transition-colors">Simulador de Tonos</a>
            <a href="#tratamientos" className="hover:text-cyan-400 transition-colors">Calculadora a MSI</a>
            <a href="#agenda" className="hover:text-cyan-400 transition-colors">Cita de Valoración</a>
          </div>

          <a
            href="#agenda"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-900/30 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Valoración sin Costo</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> Clínica Dental de Élite en {brandCity} • 4.97 en Google Reviews
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-black text-white leading-[1.08] tracking-tight">
              La arquitectura de una <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-amber-200">
                sonrisa perfecta
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Diseño de sonrisa de precisión milimétrica mediante escaneo intraoral 3D y carillas de porcelana alemana en {brandCity}. Estética natural, biometría facial y confort sin dolor.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#simulador"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-900/30 transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>Simular Tonos de Blanco E-Max</span>
              </a>

              <a
                href="#tratamientos"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 font-bold text-xs uppercase tracking-wider"
              >
                Ver Mensualidades a Meses Sin Intereses
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_20px_70px_rgba(6,182,212,0.25)]">
              <img
                src="/images/dental.webp"
                alt="Diseño de Sonrisa en Polanco"
                loading="lazy"
                decoding="async"
                style={{ filter: shades[selectedShade].filter }}
                className="w-full h-[460px] object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-black/80 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-cyan-400 font-bold block">Tono Activo en Sonrisa:</span>
                  <span className="text-white font-serif">{shades[selectedShade].name}</span>
                </div>
                <span className="text-[10px] text-slate-400">Porcelana E-Max Alemana</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Simulador de Tonos de Carillas E-Max */}
      <section id="simulador" className="py-16 px-6 bg-[#0B111A] border-y border-cyan-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              Simulador Visual Interactivo
            </span>
            <h2 className="text-3xl font-serif font-black text-white mt-2">
              Elige el Nivel de Blanco para tu Sonrisa
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Haz clic en cada tono para aplicar el filtro calibrado en tiempo real sobre la sonrisa de arriba:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(shades).map(([key, s]) => {
              const active = selectedShade === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedShade(key)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    active
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-black text-base text-cyan-300">{key}</span>
                    <span className={`w-3.5 h-3.5 rounded-full ${key === 'BL1' ? 'bg-white' : key === 'BL2' ? 'bg-slate-100' : key === 'BL3' ? 'bg-amber-100' : 'bg-stone-200'} shadow`} />
                  </div>
                  <div className="font-bold text-xs text-white">{s.name}</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-snug">{s.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Calculadora de Mensualidades a Meses Sin Intereses (MSI) */}
      <section id="tratamientos" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Transparencia &amp; Facilidades Bancarias
              </span>
              <h3 className="text-2xl font-serif font-black text-white">
                Calculadora a Meses Sin Intereses (MSI)
              </h3>
            </div>

            {/* MSI Selector */}
            <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
              {[3, 6, 9, 12].map((msi) => (
                <button
                  key={msi}
                  onClick={() => setSelectedMsi(msi)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    selectedMsi === msi
                      ? 'bg-cyan-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {msi} MSI
                </button>
              ))}
            </div>
          </div>

          {/* Selector de Tratamientos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.entries(treatments).map(([k, t]) => {
              const active = selectedTreatment === k;
              return (
                <button
                  key={k}
                  onClick={() => setSelectedTreatment(k)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    active
                      ? 'bg-cyan-950/40 border-cyan-500 text-white shadow'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-extrabold text-xs text-white truncate">{t.name.split(' ')[0]} {t.name.split(' ')[1]}</div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-1">
                    ${t.priceTotal.toLocaleString('es-MX')} MXN
                  </div>
                </button>
              );
            })}
          </div>

          {/* Card Detallada con desglose de MSI */}
          <div className="p-5 rounded-2xl bg-black/50 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-serif font-black text-white">{current.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{current.desc}</p>
                <div className="flex items-center gap-3 text-xs text-cyan-300 mt-2 font-mono">
                  <span>✓ {current.duration}</span>
                  <span>✓ {current.warranty}</span>
                </div>
              </div>

              <div className="text-center sm:text-right flex-shrink-0">
                <span className="text-xs text-slate-400 block">Mensualidad a {selectedMsi} MSI:</span>
                <div className="font-mono text-3xl font-black text-cyan-400">
                  ${monthlyPayment.toLocaleString('es-MX')} <span className="text-xs text-white">/ mes</span>
                </div>
                <span className="text-[10px] text-slate-500 block">Total: ${current.priceTotal.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                Tarjetas participantes: BBVA, Banamex, Santander, Amex y Mercado Pago
              </span>

              <a
                href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <span>Agendar con {selectedMsi} MSI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-slate-500 border-t border-cyan-900/30">
        <p>© 2026 {brandName} • Diseño Dental de Vanguardia en {brandCity}.</p>
      </footer>
    </div>
  );
}
