import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Phone,
  Car,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Gauge,
  Flame,
  Check,
  Zap
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TallerMecanicoLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'CDMX Auto Werks Garage';
  const brandCity = city || 'Del Valle & Santa Fe, CDMX';

  const [vehicleType, setVehicleType] = useState('sedan');
  const [selectedServices, setSelectedServices] = useState(['afinacion']);
  const [selectedSymptom, setSelectedSymptom] = useState('check_engine');
  const [bookingSent, setBookingSent] = useState(false);
  const [booking, setBooking] = useState({ name: '', phone: '', plates: '', date: '' });

  // 1. Detector de Engomado y Verificación por Placa CDMX/EdoMex
  const getVerificationInfo = (plateStr) => {
    if (!plateStr || plateStr.trim().length < 3) return null;
    const clean = plateStr.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const digits = clean.match(/\d/g);
    if (!digits || digits.length === 0) return null;
    const lastDigit = parseInt(digits[digits.length - 1], 10);

    const map = {
      5: { color: 'Amarillo', badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40', period: 'Julio y Agosto (1er Sem) / Enero y Febrero (2do Sem)' },
      6: { color: 'Amarillo', badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40', period: 'Julio y Agosto (1er Sem) / Enero y Febrero (2do Sem)' },
      7: { color: 'Rosa', badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40', period: 'Agosto y Septiembre (1er Sem) / Febrero y Marzo (2do Sem)' },
      8: { color: 'Rosa', badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40', period: 'Agosto y Septiembre (1er Sem) / Febrero y Marzo (2do Sem)' },
      3: { color: 'Rojo', badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40', period: 'Septiembre y Octubre (1er Sem) / Marzo y Abril (2do Sem)' },
      4: { color: 'Rojo', badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40', period: 'Septiembre y Octubre (1er Sem) / Marzo y Abril (2do Sem)' },
      1: { color: 'Verde', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', period: 'Octubre y Noviembre (1er Sem) / Abril y Mayo (2do Sem)' },
      2: { color: 'Verde', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', period: 'Octubre y Noviembre (1er Sem) / Abril y Mayo (2do Sem)' },
      9: { color: 'Azul', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40', period: 'Noviembre y Diciembre (1er Sem) / Mayo y Junio (2do Sem)' },
      0: { color: 'Azul', badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40', period: 'Noviembre y Diciembre (1er Sem) / Mayo y Junio (2do Sem)' },
    };

    return {
      lastDigit,
      ...map[lastDigit],
    };
  };

  const plateInfo = getVerificationInfo(booking.plates);

  const serviceCatalog = {
    afinacion: { name: 'Afinación Mayor con Scanner OBD2', sedan: 1650, suv: 2150, pickup: 2450, desc: 'Bujías platino/iridio, lavado de inyectores por ultrasonido y cuerpo de aceleración.' },
    frenos: { name: 'Servicio de Frenos & Balatas Cerámicas', sedan: 1250, suv: 1650, pickup: 1890, desc: 'Rectificado de discos, purgado DOT4 y cambio de balatas sin rechinidos.' },
    suspension: { name: 'Diagnóstico de Suspensión & Amortiguadores', sedan: 850, suv: 1100, pickup: 1350, desc: 'Revisión de bujes, terminales, rótulas, bieletas y amortiguadores con prueba de carga.' },
    aire: { name: 'Servicio Clima / Aire Acondicionado', sedan: 950, suv: 1200, pickup: 1400, desc: 'Carga de gas ecológico R134a, detección de fugas UV y filtro de cabina anti-polen.' },
    verificacion: { name: 'Pre-Verificación Vehicular CDMX/EdoMex', sedan: 650, suv: 650, pickup: 750, desc: 'Lectura de monitores OBD2, prueba de gases en analizador y garantía de holograma.' },
  };

  // 2. Symptoms Matrix
  const symptoms = [
    { id: 'check_engine', label: 'Testigo Check Engine Encendido', icon: '⚠️', targetService: 'afinacion' },
    { id: 'ruido_frenos', label: 'Ruido o Rechinido al Frenar', icon: '🛑', targetService: 'frenos' },
    { id: 'vibracion', label: 'Vibración en Volante o Golpeteo', icon: '⚙️', targetService: 'suspension' },
    { id: 'clima', label: 'Aire Acondicionado no Enfría', icon: '❄️', targetService: 'aire' },
  ];

  const handleSelectSymptom = (sym) => {
    setSelectedSymptom(sym.id);
    if (!selectedServices.includes(sym.targetService)) {
      setSelectedServices([...selectedServices, sym.targetService]);
    }
  };

  const toggleService = (key) => {
    setSelectedServices(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((sum, key) => {
      const item = serviceCatalog[key];
      return sum + (item ? item[vehicleType] : 0);
    }, 0);
  };

  const total = calculateTotal();

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingSent(true);
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola ${brandName} 🚗! Quiero agendar servicio para mi vehículo:\n\n• Carrocería: ${vehicleType.toUpperCase()}\n• Placa ingresada: ${booking.plates || 'Por confirmar'}${plateInfo ? ` (Engomado ${plateInfo.color}, termina en ${plateInfo.lastDigit})` : ''}\n• Síntoma detectado: ${symptoms.find(s => s.id === selectedSymptom)?.label}\n• Servicios seleccionados: ${selectedServices.map(k => serviceCatalog[k].name).join(', ')}\n• TOTAL ESTIMADO: $${total} MXN\n• Fecha deseada: ${booking.date || 'Lo antes posible'}\n• Cliente: ${booking.name} (${booking.phone})\n\n¿Tienen rampa libre en la sucursal de ${brandCity}?`
  );

  return (
    <div className="min-h-screen bg-[#07090D] text-[#E0E7EF] font-sans selection:bg-red-500/30 relative">
      {/* Demo Conversion Bar */}
      <DemoConversionBar
        currentKey="taller"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-neutral-900 to-stone-900 text-red-200 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-red-900/40 flex items-center justify-center gap-2">
        <Wrench className="w-4 h-4 text-red-400" />
        <span>Garantía por escrito de 6 meses o 10,000 km • Escaneo computarizado OBD2 en minutos • Servicio en {brandCity}</span>
      </div>

      {/* Header */}
      <header className="sticky top-[49px] z-40 bg-[#07090D]/90 backdrop-blur-md border-b border-red-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-red-300 border border-red-500/30 flex items-center gap-1.5 transition-colors"
              >
                ← Volver al Portal
              </button>
            )}
            <div className="flex items-center gap-2">
              <Car className="w-6 h-6 text-red-500" />
              <span className="font-black tracking-tight text-lg sm:text-xl text-white uppercase italic">
                {brandName}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-300 font-medium">
            <a href="#diagnostico" className="hover:text-red-400 transition-colors">Diagnóstico por Testigos</a>
            <a href="#cotizador" className="hover:text-red-400 transition-colors">Cotizador por Vehículo</a>
            <a href="#verificacion" className="hover:text-red-400 transition-colors">Verificación CDMX</a>
          </div>

          <a
            href="#cotizador"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-950/40 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Cotizar mi Auto</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> Taller Mecánico #1 en {brandCity} • 4.95 en Google Reviews
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase leading-[1.05] tracking-tight italic">
              Mecánica de precisión, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 not-italic">
                cero sorpresas en costo
              </span>
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Mantenimiento automotriz con diagnóstico computarizado en {brandCity}. Refacciones originales, mecánicos certificados y reporte en fotos/videos vía WhatsApp en tiempo real.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#diagnostico"
                className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-900/30 transition-all"
              >
                <span>Diagnosticar mi Síntoma / Testigo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#cotizador"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs uppercase tracking-wider"
              >
                Cotizador por Carrocería
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-red-500/30 shadow-[0_20px_70px_rgba(239,68,68,0.2)]">
              <img
                src="/images/taller.webp"
                alt="Taller Mecánico Especializado"
                loading="lazy"
                decoding="async"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Selector Interactivo de Síntomas o Testigos */}
      <section id="diagnostico" className="py-16 px-6 bg-[#0B0F16] border-y border-red-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
              Triaje Automotriz Rápido
            </span>
            <h2 className="text-3xl font-black text-white uppercase italic mt-2">
              ¿Qué testigo o falla presenta tu auto?
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Selecciona el síntoma para precargar el paquete técnico exacto que requiere tu motor o suspensión.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {symptoms.map((sym) => {
              const active = selectedSymptom === sym.id;
              return (
                <button
                  key={sym.id}
                  onClick={() => handleSelectSymptom(sym)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    active
                      ? 'bg-red-600/20 border-red-500 text-white shadow-lg shadow-red-950/40'
                      : 'bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-3xl block mb-2">{sym.icon}</span>
                  <div className="font-extrabold text-xs text-white leading-snug">{sym.label}</div>
                  <div className="text-[10px] text-red-400 font-mono mt-2">
                    {active ? 'Recomendación Activa ✓' : 'Click para activar'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cotizador Dinámico por Carrocería y Validador de Placas */}
      <section id="cotizador" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-red-900/40 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                Cotizador Dinámico Transparente
              </span>
              <h3 className="text-2xl font-black text-white uppercase italic">
                Selecciona tu Carrocería
              </h3>
            </div>

            {/* Carrocería Selector */}
            <div className="flex bg-black/60 p-1 rounded-xl border border-white/10">
              {[
                { id: 'sedan', label: 'Sedán / Hatch' },
                { id: 'suv', label: 'SUV / Crossover' },
                { id: 'pickup', label: 'Pickup / 4x4' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setVehicleType(c.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    vehicleType === c.id
                      ? 'bg-red-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Servicios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(serviceCatalog).map(([key, item]) => {
              const active = selectedServices.includes(key);
              return (
                <div
                  key={key}
                  onClick={() => toggleService(key)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    active
                      ? 'bg-red-950/30 border-red-500 shadow-md'
                      : 'bg-white/[0.02] border-white/10 hover:border-red-500/30'
                  }`}
                >
                  <div>
                    <h4 className="text-white text-xs font-bold">{item.name}</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{item.desc}</p>
                    <span className="text-red-400 font-mono font-bold text-xs mt-1 block">
                      ${item[vehicleType]} MXN ({vehicleType.toUpperCase()})
                    </span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${active ? 'bg-red-500 text-white border-red-500' : 'border-white/20'}`}>
                    {active && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 1. Validador de Placas CDMX/EdoMex & Detector de Engomado */}
          <div className="p-4 rounded-2xl bg-black/50 border border-neutral-800 space-y-3">
            <label className="text-xs font-bold text-white block">
              Ingresa tus Placas para calcular Engomado &amp; Verificación Vehicular:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Ej: ABC-12-34 o MZX-458"
                value={booking.plates}
                onChange={(e) => setBooking({ ...booking, plates: e.target.value.toUpperCase() })}
                className="w-full bg-[#141822] border border-white/15 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase outline-none"
              />

              <input
                type="text"
                placeholder="Tu Nombre"
                value={booking.name}
                onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                className="w-full bg-[#141822] border border-white/15 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />

              <input
                type="tel"
                placeholder="WhatsApp (10 dígitos)"
                value={booking.phone}
                onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                className="w-full bg-[#141822] border border-white/15 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
              />
            </div>

            {plateInfo && (
              <div className="mt-2 p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${plateInfo.badgeBg}`}>
                    Engomado {plateInfo.color} (Terminación {plateInfo.lastDigit})
                  </span>
                  <span className="text-neutral-300">Periodo de Verificación: <strong>{plateInfo.period}</strong></span>
                </div>
                <span className="text-emerald-400 font-mono text-[11px]">Garantía Pre-Verificación disponible</span>
              </div>
            )}
          </div>

          {/* Resumen Total y WhatsApp CTA */}
          <div className="p-4 rounded-2xl bg-black/70 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-neutral-400">Total Cotizado Estimado ({vehicleType.toUpperCase()}):</span>
              <div className="font-mono text-3xl font-black text-white mt-0.5">
                ${total.toLocaleString('es-MX')} <span className="text-red-400 text-sm">MXN</span>
              </div>
              <span className="text-[10px] text-neutral-500 block">Mano de obra, scanner e IVA desglosado</span>
            </div>

            <a
              href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
            >
              <span>Apartar Turno en Taller (${total} MXN)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-neutral-500 border-t border-red-900/30">
        <p>© 2026 {brandName} • Mecánica Automotriz Certificada en {brandCity}.</p>
      </footer>
    </div>
  );
}
