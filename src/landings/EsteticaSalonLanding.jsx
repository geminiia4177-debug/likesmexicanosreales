import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Star,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  ArrowRight,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  X,
  Scissors
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function EsteticaSalonLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'LUMINA Beauty & Spa';
  const brandCity = city || 'Polanco Masaryk & Condesa, CDMX';

  // 1. Quiz Diagnóstico Capilar en 3 pasos
  const [hairLength, setHairLength] = useState('medio'); // corto, medio, largo
  const [hairHistory, setHairHistory] = useState('tinte'); // virgen, tinte, decolorado
  const [hairGoal, setHairGoal] = useState('balayage'); // balayage, babylights, keratina

  // Diagnostic modifiers
  const lengthModifier = hairLength === 'largo' ? 400 : hairLength === 'corto' ? -200 : 0;
  const historyModifier = hairHistory === 'decolorado' ? 350 : hairHistory === 'virgen' ? -150 : 0;
  const baseGoalPrice = hairGoal === 'balayage' ? 1850 : hairGoal === 'babylights' ? 1950 : 1550;
  const baseMinutes = (hairGoal === 'keratina' ? 120 : 180) + (hairLength === 'largo' ? 30 : 0);

  const calculatedLookPrice = Math.max(900, baseGoalPrice + lengthModifier + historyModifier);

  const [selectedServices, setSelectedServices] = useState(['uñas']);
  const [appointmentSent, setAppointmentSent] = useState(false);
  const [booking, setBooking] = useState({ name: '', phone: '', date: '', time: '12:00' });
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const catalog = {
    uñas: { name: 'Manicura Rusa & Uñas Soft Gel', price: 550, time: 75, desc: 'Limpieza profunda de cutícula, nivelación y esmaltado semipermanente de larga duración.' },
    pestanas: { name: 'Extensiones de Pestañas 1x1 Efecto Rímel', price: 890, time: 90, desc: 'Fibras ultraligeras de seda, adhesivo hipoalergénico y diseño personalizado.' },
    pedicure: { name: 'Spa Pedicure Relajante con Exfoliación', price: 490, time: 60, desc: 'Tina de hidromasaje, sales aromáticas, retiro de callosidades y masaje con piedras.' },
    facial: { name: 'Limpieza Facial Hidrafacial Profunda', price: 850, time: 60, desc: 'Extracción ultrasónica, peeling enzimático suave y mascarilla de colágeno.' },
  };

  const toggleService = (key) => {
    setSelectedServices(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const servicesTotal = selectedServices.reduce((acc, k) => acc + (catalog[k]?.price || 0), 0);
  const servicesDuration = selectedServices.reduce((acc, k) => acc + (catalog[k]?.time || 0), 0);

  const grandTotal = servicesTotal + calculatedLookPrice;
  const grandDuration = servicesDuration + baseMinutes;

  const handleBooking = (e) => {
    e.preventDefault();
    setAppointmentSent(true);
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola ${brandName} 🌸! Me gustaría agendar mi cita:\n\n• Diagnóstico Capilar: ${hairGoal.toUpperCase()} (Cabello ${hairLength}, historial: ${hairHistory}) — $${calculatedLookPrice} MXN (${baseMinutes} min)\n• Servicios adicionales: ${selectedServices.map(k => catalog[k].name).join(', ') || 'Ninguno'}\n• Fecha deseada: ${booking.date || 'Próximamente'} a las ${booking.time} hrs\n• Nombre: ${booking.name || 'Cliente'} (${booking.phone || ''})\n\n• TOTAL ESTIMADO: $${grandTotal} MXN (~${grandDuration} min)\n¿Tienen espacio disponible en sucursal ${brandCity}?`
  );

  return (
    <div className="min-h-screen bg-[#0C080A] text-[#F5E6EC] font-sans selection:bg-pink-500/30 relative pb-24">
      {/* Demo Conversion Bar */}
      <DemoConversionBar
        currentKey="estetica"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-950 via-rose-950 to-stone-900 text-pink-200 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-pink-900/40 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-pink-400" />
        <span>Bebida de bienvenida &amp; mimosa de cortesía • Sede en {brandCity} • Citas personalizadas</span>
      </div>

      {/* Header */}
      <header className="sticky top-[49px] z-40 bg-[#0C080A]/90 backdrop-blur-md border-b border-pink-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-pink-300 border border-pink-500/30 flex items-center gap-1.5 transition-colors"
              >
                ← Volver al Portal
              </button>
            )}
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-pink-400" />
              <span className="font-serif tracking-widest text-lg sm:text-xl font-bold text-white">
                {brandName}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-stone-300 font-medium">
            <a href="#quiz" className="hover:text-pink-300 transition-colors">Quiz Capilar</a>
            <a href="#cotizador" className="hover:text-pink-300 transition-colors">Arma tu Look</a>
            <a href="#agenda" className="hover:text-pink-300 transition-colors">Agendar Cita</a>
          </div>

          <a
            href="#agenda"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-pink-950/40 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Cita</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-300 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> Studio de Belleza #1 en {brandCity} • 4.98 en Google Reviews
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-black text-white leading-[1.08] tracking-tight">
              Realza tu brillo, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200">
                consiente tu belleza
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Especialistas en diseño de uñas, balayage y pestañas en un espacio diseñado para tu descanso absoluto en {brandCity}. Productos europeos prémium libres de tóxicos y estilistas certificadas.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-lg pt-2 text-center text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-pink-900/40">
                <span className="block text-2xl font-black text-pink-400">+4,800</span>
                <span className="text-stone-400">Clientas Felices</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-pink-900/40">
                <span className="block text-2xl font-black text-pink-400">100%</span>
                <span className="text-stone-400">Plex &amp; Orgánico</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-pink-900/40">
                <span className="block text-2xl font-black text-pink-400">Cero</span>
                <span className="text-stone-400">Anticipo Requerido</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-pink-500/30 shadow-[0_20px_70px_rgba(244,114,182,0.2)]">
              <img
                src="/images/estetica.webp"
                alt="Studio de Belleza Polanco"
                loading="lazy"
                decoding="async"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C080A] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* 1. Quiz Diagnóstico Capilar en 3 Pasos */}
      <section id="quiz" className="py-16 px-6 bg-[#120B0F] border-y border-pink-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-widest px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30">
              Diagnóstico Capilar Inteligente
            </span>
            <h2 className="text-3xl font-serif font-black text-white mt-2">
              Descubre tu Tratamiento Ideal en 3 Pasos
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Calculamos el tiempo de aplicación y la inversión exacta según las condiciones de tu cabello.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-black/50 border border-pink-500/30 space-y-6 shadow-2xl">
            {/* Paso 1: Largo Actual */}
            <div>
              <label className="text-xs font-bold text-pink-300 block mb-2 uppercase tracking-wide">
                Paso 1: ¿Cuál es el largo actual de tu cabello?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'corto', label: 'Corto', sub: 'Arriba de hombros' },
                  { id: 'medio', label: 'Medio', sub: 'A la altura del pecho' },
                  { id: 'largo', label: 'Largo', sub: 'Debajo de cintura' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setHairLength(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      hairLength === item.id
                        ? 'bg-pink-600/30 border-pink-400 text-white shadow'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs">{item.label}</div>
                    <div className="text-[10px] text-stone-400">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Paso 2: Procesos Previos */}
            <div>
              <label className="text-xs font-bold text-pink-300 block mb-2 uppercase tracking-wide">
                Paso 2: ¿Qué procesos previos tiene tu cabello?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'virgen', label: 'Virgen', sub: 'Cero decoloración o tinte' },
                  { id: 'tinte', label: 'Tinte Global', sub: 'Coloración previa' },
                  { id: 'decolorado', label: 'Decolorado', sub: 'Requiere Plex reconstructor' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setHairHistory(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      hairHistory === item.id
                        ? 'bg-pink-600/30 border-pink-400 text-white shadow'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs">{item.label}</div>
                    <div className="text-[10px] text-stone-400">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Paso 3: Efecto Deseado */}
            <div>
              <label className="text-xs font-bold text-pink-300 block mb-2 uppercase tracking-wide">
                Paso 3: ¿Qué resultado buscas lograr?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'balayage', label: 'Balayage Francés', sub: 'Degradado suave sin efecto raíz' },
                  { id: 'babylights', label: 'Babylights & Brillo', sub: 'Micro-mechas ultra finas' },
                  { id: 'keratina', label: 'Keratina Orgánica', sub: 'Alaciado espejo anti-frizz' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setHairGoal(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      hairGoal === item.id
                        ? 'bg-pink-600/30 border-pink-400 text-white shadow'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs">{item.label}</div>
                    <div className="text-[10px] text-stone-400">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resultado del Diagnóstico */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/60 to-stone-900 border border-pink-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-pink-400">Diagnóstico Personalizado:</span>
                <h4 className="text-white font-serif font-black text-lg">
                  {hairGoal === 'balayage' ? 'Balayage Francés con Matiz Gloss' : hairGoal === 'babylights' ? 'Babylights Full Dimension' : 'Keratina Reconstructora Orgánica'}
                </h4>
                <div className="flex items-center gap-3 text-xs text-stone-300 mt-1">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-pink-400" /> Tiempo estimado: {baseMinutes} minutos</span>
                  <span>• Largo: {hairLength}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-serif text-3xl font-black text-pink-400 font-mono">
                  ${calculatedLookPrice} MXN
                </span>
                <span className="text-[10px] text-stone-400 block">Tratamiento protector incluido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cotizador Arma tu Look (Servicios Complementarios) */}
      <section id="cotizador" className="py-16 px-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-serif font-bold text-white mb-2 text-center">
          Complementa tu Cita de Belleza
        </h3>
        <p className="text-xs text-stone-400 text-center mb-8">
          Añade uñas, pestañas o spa pedicure y recíbelos en una sola sesión sin perder tiempo.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(catalog).map(([key, item]) => {
            const active = selectedServices.includes(key);
            return (
              <div
                key={key}
                onClick={() => toggleService(key)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  active
                    ? 'bg-pink-950/30 border-pink-500 shadow-md'
                    : 'bg-white/[0.02] border-white/10 hover:border-pink-500/30'
                }`}
              >
                <div>
                  <h4 className="text-white text-xs font-bold">{item.name}</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">{item.desc}</p>
                  <span className="text-pink-400 font-mono font-bold text-xs mt-1 block">
                    ${item.price} MXN • {item.time} min
                  </span>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${active ? 'bg-pink-500 text-white border-pink-500' : 'border-white/20'}`}>
                  {active && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Barra Flotante Inferior Móvil con Desglose */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#140C10]/95 backdrop-blur-xl border-t border-pink-900/40 px-4 py-3 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 font-semibold">Total Paquete Look:</span>
              <span className="font-mono text-xl sm:text-2xl font-black text-pink-400">
                ${grandTotal} MXN
              </span>
            </div>
            <span className="text-[10px] text-stone-400 hidden sm:inline">
              Duración total aproximada: {grandDuration} minutos ({Math.round(grandDuration / 60)}h)
            </span>
          </div>

          <a
            href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-pink-950/40"
          >
            <span>Confirmar Cita en WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-stone-500 border-t border-pink-900/20">
        <p>© 2026 {brandName} • Exclusividad y Cuidado Capilar en {brandCity}.</p>
      </footer>
    </div>
  );
}
