import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  Star,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  ArrowRight,
  Sparkles,
  AlertOctagon,
  Ambulance,
  Navigation,
  X,
  Plus
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function VeterinariaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'Mascota Feliz Hospital & Pet Spa';
  const brandCity = city || 'Condesa & San Jerónimo, CDMX';

  const [petSize, setPetSize] = useState('mediano'); // chico, mediano, grande
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [emergencySymptom, setEmergencySymptom] = useState('intoxicacion');
  const [currentLocation, setCurrentLocation] = useState('CDMX');
  const [gettingLocation, setGettingLocation] = useState(false);

  // Pricing matrix by size
  const groomingPricing = {
    chico: { bano: 280, completo: 420, dental: 650 },
    mediano: { bano: 360, completo: 540, dental: 780 },
    grande: { bano: 450, completo: 680, dental: 890 },
  };

  // 2. Calculadora de Plan Preventivo Anual
  const annualPlans = {
    chico: { name: 'Plan Cachorro / Perro Chico (<8kg)', price: 1890, monthly: 157, savings: 650 },
    mediano: { name: 'Plan Perro Mediano (8-20kg)', price: 2350, monthly: 195, savings: 820 },
    grande: { name: 'Plan Gigante / Perro Grande (>20kg)', price: 2890, monthly: 240, savings: 1050 },
  };

  const currentPlan = annualPlans[petSize];
  const currentPrices = groomingPricing[petSize];

  // 1. Emergency Triage Symptoms
  const emergencyOptions = [
    { id: 'intoxicacion', label: 'Ingesta de Tóxico / Veneno', severity: 'Extrema' },
    { id: 'trauma', label: 'Atropellamiento / Caída / Fractura', severity: 'Crítica' },
    { id: 'respiracion', label: 'Dificultad Respiratoria / Jadeo Azulado', severity: 'Urgente' },
    { id: 'convulsion', label: 'Convulsión / Pérdida de Conciencia', severity: 'Inmediata' },
  ];

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGettingLocation(false);
          setCurrentLocation(`Lat: ${pos.coords.latitude.toFixed(4)}, Long: ${pos.coords.longitude.toFixed(4)}`);
        },
        () => {
          setGettingLocation(false);
          setCurrentLocation('Ubicación enviada por GPS');
        }
      );
    }
  };

  const emergencyWhatsapp = encodeURIComponent(
    `🚨 ¡URGENCIA VETERINARIA 24/7! 🚨\n\n• Clínica: ${brandName}\n• Talla mascota: ${petSize.toUpperCase()}\n• Síntoma crítico: ${emergencyOptions.find(o => o.id === emergencySymptom)?.label}\n• Ubicación de Taxi Pet: ${currentLocation}\n\nPor favor preparen rampa médica y médico de guardia de inmediato.`
  );

  const planWhatsapp = encodeURIComponent(
    `¡Hola ${brandName} 🐾! Me interesa contratar el ${currentPlan.name} ($${currentPlan.price} MXN):\n\n• Incluye Vacunas completas + Desparasitación + 1 Profilaxis Dental\n• Mascota talla: ${petSize.toUpperCase()}\n• Sucursal: ${brandCity}\n\n¿Cómo activo mi plan anual?`
  );

  return (
    <div className="min-h-screen bg-[#070B0B] text-[#E0EFEA] font-sans selection:bg-emerald-500/30 relative pb-16">
      {/* Demo Conversion Bar */}
      <DemoConversionBar
        currentKey="veterinaria"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-900 text-emerald-200 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-emerald-900/40 flex items-center justify-center gap-2">
        <Heart className="w-4 h-4 text-emerald-400" />
        <span>Urgencias veterinarias 24/7 • Médicos certificados UNAM • Servicio de Taxi Pet de Urgencia en {brandCity}</span>
      </div>

      {/* Header */}
      <header className="sticky top-[49px] z-40 bg-[#070B0B]/90 backdrop-blur-md border-b border-emerald-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-colors"
              >
                ← Volver al Portal
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white">
                {brandName}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-stone-300 font-medium">
            <a href="#triage" className="hover:text-emerald-300 transition-colors">Triaje Urgencias 24/7</a>
            <a href="#planes" className="hover:text-emerald-300 transition-colors">Plan Preventivo Anual</a>
            <a href="#grooming" className="hover:text-emerald-300 transition-colors">Estética &amp; Spa</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase flex items-center gap-1.5 shadow-lg shadow-red-900/40 animate-pulse"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Urgencia 24/7</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> Clínica Veterinaria #1 en {brandCity} • 4.96 en Google Reviews
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.08] tracking-tight">
              Cuidado con amor, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-200">
                salud para tu mejor amigo
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Desde su baño spa relajante hasta cirugías y laboratorio clínico propio. Trato respetuoso, libre de estrés y sin jaulas frías en {brandCity}.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <Ambulance className="w-4 h-4" />
                <span>Pedir Taxi Pet de Urgencia 24H</span>
              </button>

              <a
                href="#planes"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-300 border border-emerald-500/30 font-bold text-xs uppercase tracking-wider"
              >
                Ver Planes Preventivos Anuales
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-[0_20px_70px_rgba(16,185,129,0.2)]">
              <img
                src="/images/veterinaria.webp"
                alt="Hospital Veterinario 24 Horas"
                loading="lazy"
                decoding="async"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B0B] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Calculadora de Plan Preventivo Anual por Talla */}
      <section id="planes" className="py-16 px-6 bg-[#0B1111] border-y border-emerald-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              Salud Preventiva Integral
            </span>
            <h2 className="text-3xl font-black text-white mt-2">
              Calculadora de Plan Anual por Talla
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Vacunas séxtuples, desparasitación semestral, consultas ilimitadas y 1 profilaxis dental con ahorro garantizado.
            </p>
          </div>

          {/* Size switcher tabs */}
          <div className="flex justify-center gap-2 mb-6">
            {[
              { id: 'chico', label: 'Chico (< 8 kg)', desc: 'Chihuahua, Pug, Poodle' },
              { id: 'mediano', label: 'Mediano (8 - 20 kg)', desc: 'Schnauzer, Beagle, Francés' },
              { id: 'grande', label: 'Grande (> 20 kg)', desc: 'Golden, Husky, Pastor Alemán' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setPetSize(s.id)}
                className={`px-4 py-2.5 rounded-xl border text-center transition-all ${
                  petSize === s.id
                    ? 'bg-emerald-500 text-stone-950 font-black shadow-lg shadow-emerald-500/20'
                    : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                }`}
              >
                <div className="text-xs">{s.label}</div>
                <div className="text-[10px] opacity-80">{s.desc}</div>
              </button>
            ))}
          </div>

          {/* Plan Card Display */}
          <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase">
                Plan Completo 12 Meses
              </span>
              <h3 className="text-2xl font-black text-white">{currentPlan.name}</h3>
              <ul className="space-y-1.5 text-xs text-stone-300">
                <li className="flex items-center gap-2">✓ <strong>Vacunación Anual Completa:</strong> Séxtuple + Rabia + Giardia</li>
                <li className="flex items-center gap-2">✓ <strong>Desparasitación Interna y Externa:</strong> Cada 6 meses</li>
                <li className="flex items-center gap-2">✓ <strong>1 Profilaxis Dental Ultrasonido</strong> (Sin dolor ni sarro)</li>
                <li className="flex items-center gap-2">✓ <strong>Consultas Veterinarias Médicas Ilimitadas</strong> en {brandCity}</li>
              </ul>
            </div>

            <div className="text-center sm:text-right flex-shrink-0 space-y-2">
              <span className="text-xs text-stone-400 block">Inversión anual con descuento:</span>
              <div className="font-mono text-3xl sm:text-4xl font-black text-emerald-400">
                ${currentPlan.price.toLocaleString('es-MX')} MXN
              </div>
              <span className="text-[11px] text-emerald-300 font-bold block">
                O desde solo ${currentPlan.monthly} MXN / mes
              </span>
              <span className="text-[10px] text-stone-500 block line-through">
                Precio regular: ${(currentPlan.price + currentPlan.savings).toLocaleString('es-MX')} MXN
              </span>

              <a
                href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${planWhatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg mt-2"
              >
                <span>Contratar Plan Anual</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Modal Triaje Rápido de Urgencias 24/7 & Taxi Pet */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-[#140C0E] border-2 border-red-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsEmergencyModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-red-500 mb-2">
              <Ambulance className="w-6 h-6 animate-pulse" />
              <h3 className="text-xl font-black uppercase text-white">Triaje de Urgencia 24/7</h3>
            </div>
            <p className="text-xs text-stone-300 mb-4 leading-relaxed">
              Respuesta en menos de 2 minutos. Si tu mascota requiere traslado urgente, activamos nuestro Taxi Pet de guardia.
            </p>

            <div className="space-y-2 mb-4">
              <label className="text-xs font-bold text-red-400 block">1. Selecciona el Síntoma de Alarma:</label>
              {emergencyOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setEmergencySymptom(opt.id)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                    emergencySymptom === opt.id
                      ? 'bg-red-600/30 border-red-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                    {opt.severity}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 mb-5 space-y-2">
              <label className="text-xs font-bold text-stone-300 block">2. Ubicación para Taxi Pet de Urgencia:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  placeholder="Colonia, calle o referencias"
                  className="w-full bg-[#1C1214] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none"
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 flex-shrink-0"
                  title="Detectar por GPS"
                >
                  <Navigation className="w-3.5 h-3.5 text-red-400" />
                  <span>{gettingLocation ? 'GPS...' : 'GPS'}</span>
                </button>
              </div>
            </div>

            <a
              href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${emergencyWhatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-red-900/50"
            >
              <Phone className="w-4 h-4" />
              <span>Despachar Guardia Médica Inmediata</span>
            </a>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-stone-500 border-t border-emerald-900/20">
        <p>© 2026 {brandName} • Hospital Veterinario &amp; Urgencias en {brandCity}.</p>
      </footer>
    </div>
  );
}
