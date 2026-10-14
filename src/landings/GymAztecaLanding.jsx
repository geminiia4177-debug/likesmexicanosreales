import React, { useState } from 'react';
import {
  Flame,
  Zap,
  ShieldCheck,
  Trophy,
  Clock,
  MapPin,
  ArrowRight,
  Check,
  Dumbbell,
  Calendar,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function GymAztecaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'AZTECA KINETIC PERFORMANCE & COMBAT';
  const brandCity = city || 'Condesa · Narvarte · Polanco, CDMX';

  // Membership Tier: daily, monthly, annual
  const [membershipTier, setMembershipTier] = useState('monthly');

  // Class Filter: all, boxeo, crossfit, hyrox, peso_libre
  const [classFilter, setClassFilter] = useState('all');

  const memberships = {
    daily: {
      name: 'DAY PASS DE ALTO IMPACTO',
      price: '$180 MXN',
      period: 'Pase por 1 día completo',
      features: ['Acceso total a peso libre y tarimas Eleiko', 'Acceso a sacos de boxeo y zona de trineos', 'Vestidores con regadera y toalla incluida', 'Válido hoy'],
      cta: 'Comprar Day Pass Inmediato',
    },
    monthly: {
      name: 'MEMBRESÍA ATLETA MENSUAL',
      price: '$990 MXN',
      period: 'Sin contrato forzoso',
      features: ['Acceso ilimitado 24/7 a las 4 zonas', 'Clases de Boxeo, Crossfit y Hyrox incluidas', 'Valoración InBody mensual y plan de cargas', 'Invitado gratis los sábados'],
      popular: true,
      cta: 'Activar Membresía Mensual',
    },
    annual: {
      name: 'BLACK CARD ANUAL TRIMESTRAL',
      price: '$790 MXN',
      period: 'Cobro trimestral con 20% OFF',
      features: ['2 Meses gratis de entrenamiento al año', 'Casillero privado asignado con candado', 'Kit Guerrero Azteca (Playera Dry-Fit + Shaker)', 'Acceso a todas las sucursales CDMX'],
      cta: 'Asegurar Tarifa Congelada',
    },
  };

  const scheduleData = [
    { type: 'crossfit', time: '06:30 AM', name: 'CROSS TRAINING GUERRERO', coach: 'Coach Tláloc', zone: 'Box Crossfit', spots: '3 Lugares' },
    { type: 'hyrox', time: '08:00 AM', name: 'HYROX CONDITIONING & SKI-ERG', coach: 'Coach Sofía', zone: 'Zona Funcional', spots: '5 Lugares' },
    { type: 'boxeo', time: '18:00 PM', name: 'BOXEO OLÍMPICO & SPARRING', coach: 'Prof. Cruz', zone: 'El Octágono', spots: '2 Lugares' },
    { type: 'peso_libre', time: '19:30 PM', name: 'POWERLIFTING & TÉCNICA BARRA', coach: 'Coach Mateo', zone: 'Tarimas Olímpicas', spots: 'Último Lugar' },
    { type: 'boxeo', time: '20:30 PM', name: 'STRIKING & MITTS INTENSIVO', coach: 'Coach Alan', zone: 'Ring Central', spots: '4 Lugares' },
  ];

  const filteredSchedule = classFilter === 'all'
    ? scheduleData
    : scheduleData.filter((c) => c.type === classFilter);

  const handleAction = (planName) => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `⚡ *INSCRIPCIÓN ATLETA - ${brandName}*%0A%0AQuiero activar el plan: *${planName || memberships[membershipTier].name}* en la sucursal *${brandCity}*.%0A¿Tienen cupo disponible hoy?`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono-tech selection:bg-[#CCFF00] selection:text-black">
      <DemoConversionBar
        currentKey="gym"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP KINETIC TICKER */}
      <div className="bg-[#CCFF00] text-black py-2.5 px-4 text-xs font-black uppercase tracking-widest flex justify-between items-center overflow-hidden border-b-2 border-white">
        <div className="flex items-center gap-6">
          <span>⚡ APERTURA 24 HORAS · 365 DÍAS</span>
          <span className="hidden sm:inline">📍 {brandCity}</span>
        </div>
        <div className="font-mono-tech text-xs font-black">
          🔥 PROTOCOLO DE ALTO RENDIMIENTO
        </div>
      </div>

      {/* HERO SECTION: GIANT OUTLINE TEXT BEHIND ATHLETE + TILTED GEOMETRY */}
      <section className="relative min-h-[92vh] flex flex-col justify-between p-6 sm:p-12 lg:p-20 overflow-hidden border-b border-white/20">
        {/* Giant Kinetic Outline Text in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span
            className="font-industrial uppercase italic tracking-wider text-[22vw] sm:text-[18vw] font-black opacity-15 leading-none"
            style={{
              WebkitTextStroke: '2px #FFFFFF',
              color: 'transparent',
            }}
          >
            DISCIPLINA
          </span>
        </div>

        {/* Foreground Athlete Image */}
        <div className="absolute right-0 bottom-0 top-0 w-full lg:w-1/2 z-0 opacity-40 lg:opacity-75 pointer-events-none">
          <img
            src="/images/gym.webp"
            alt={brandName}
            className="w-full h-full object-cover filter contrast-125 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
        </div>

        {/* Top Tag */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#CCFF00] text-black px-4 py-1.5 text-xs font-black uppercase -skew-x-3 border-l-4 border-black">
            <Flame className="w-4 h-4 fill-black" />
            <span className="skew-x-3">Centro de Alto Rendimiento Deportivo</span>
          </div>
        </div>

        {/* Center Headline */}
        <div className="relative z-10 max-w-3xl my-10">
          <h1 className="font-industrial uppercase italic tracking-wider text-5xl sm:text-7xl lg:text-9xl font-black leading-[0.88] text-white mb-6">
            NO ES UN GIMNASIO, <br />
            <span className="text-[#CCFF00]">ES UN TEMPLO.</span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed mb-8">
            Más de 1,800 m² de peso libre Eleiko, jaula de combate, zona Hyrox de trineos y entrenadores con certificación internacional en {brandCity}.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => handleAction('Day Pass')}
              className="bg-[#CCFF00] hover:bg-[#b8e600] text-black px-8 py-4 text-sm font-black uppercase -skew-x-3 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(204,255,0,0.4)] border-l-4 border-white"
            >
              <span className="skew-x-3">Reclamar Day Pass 24h</span>
              <ArrowRight className="w-4 h-4 stroke-[3] skew-x-3" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('selector-membresias');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-6 py-4 text-sm font-black uppercase -skew-x-3 transition-all"
            >
              <span className="skew-x-3">Ver Zonas & Membresías</span>
            </button>
          </div>
        </div>

        {/* Bottom Telemetry Bar */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/20 pt-6 text-xs font-mono-tech">
          <div className="border-l-4 border-[#CCFF00] pl-3">
            <span className="text-[#CCFF00] font-black text-2xl block">1,800 m²</span>
            <span className="text-slate-400">PISO DE ALTO IMPACTO</span>
          </div>
          <div className="border-l-4 border-white pl-3">
            <span className="text-white font-black text-2xl block">24 / 7</span>
            <span className="text-slate-400">ACCESO BIOMÉTRICO</span>
          </div>
          <div className="border-l-4 border-[#CCFF00] pl-3">
            <span className="text-[#CCFF00] font-black text-2xl block">0 FILAS</span>
            <span className="text-slate-400">MANCUERNAS HASTA 60 KG</span>
          </div>
          <div className="border-l-4 border-white pl-3">
            <span className="text-white font-black text-2xl block">4.9 ★</span>
            <span className="text-slate-400">CALIFICACIÓN CDMX</span>
          </div>
        </div>
      </section>

      {/* EXCLUSIVE WIDGET: SELECTOR DE MEMBRESÍA & FILTRO DE HORARIOS DE CLASES */}
      <section id="selector-membresias" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#CCFF00] block mb-2">
            Selector de Membresía & Calculadora de Nivel
          </span>
          <h2 className="font-industrial uppercase italic tracking-wider text-4xl sm:text-6xl font-black">
            Elige tu Régimen de Alto Rendimiento
          </h2>

          {/* 3-Way Tier Toggle (Angled Skew -skew-x-3) */}
          <div className="inline-flex mt-6 bg-[#151515] p-1.5 border border-white/20 -skew-x-3">
            {[
              { key: 'daily', label: 'Day Pass (1 Día)' },
              { key: 'monthly', label: 'Mensualidad Libre' },
              { key: 'annual', label: 'Anual Trimestral (-20% OFF)' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setMembershipTier(tab.key)}
                className={`px-5 py-2.5 text-xs font-black uppercase transition-all ${
                  membershipTier === tab.key
                    ? 'bg-[#CCFF00] text-black shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="skew-x-3 inline-block">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Pass Display Card with thick border-l-4 */}
        <div className="max-w-2xl mx-auto bg-[#121214] border border-white/20 border-l-4 border-l-[#CCFF00] p-8 sm:p-12 relative -skew-x-3 shadow-[0_0_40px_rgba(204,255,0,0.15)] mb-16">
          <div className="skew-x-3">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#CCFF00] block mb-1">
                  Pase Seleccionado
                </span>
                <h3 className="font-industrial uppercase italic tracking-wider text-3xl sm:text-4xl font-black">
                  {memberships[membershipTier].name}
                </h3>
              </div>
              <div className="text-right">
                <div className="font-industrial text-4xl text-[#CCFF00] font-black">
                  {memberships[membershipTier].price}
                </div>
                <div className="text-[10px] text-slate-400 font-mono-tech">{memberships[membershipTier].period}</div>
              </div>
            </div>

            <div className="space-y-3 mb-8 border-y border-white/10 py-6">
              {memberships[membershipTier].features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-[#CCFF00] shrink-0 stroke-[3]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleAction(memberships[membershipTier].name)}
              className="w-full bg-[#CCFF00] hover:bg-[#b8e600] text-black py-4 font-black uppercase text-sm tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>{memberships[membershipTier].cta}</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* LIVE CLASS SCHEDULE FILTER (BOXEO, CROSSFIT, HYROX, PESO LIBRE) */}
        <div className="border-t border-white/20 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs text-[#CCFF00] font-mono-tech uppercase tracking-widest block mb-1">
                Programación de Combate & Fuerza
              </span>
              <h3 className="font-industrial uppercase italic tracking-wider text-3xl sm:text-4xl font-black">
                Horarios de Clases en Vivo ({brandCity})
              </h3>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 flex-wrap -skew-x-3">
              {[
                { key: 'all', label: 'Todas las Zonas' },
                { key: 'boxeo', label: 'Boxeo Olímpico' },
                { key: 'crossfit', label: 'Crossfit' },
                { key: 'hyrox', label: 'Hyrox' },
                { key: 'peso_libre', label: 'Peso Libre' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setClassFilter(tab.key)}
                  className={`px-3 py-1.5 text-xs font-black uppercase transition-all ${
                    classFilter === tab.key
                      ? 'bg-[#CCFF00] text-black'
                      : 'bg-[#18181A] text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span className="skew-x-3 inline-block">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchedule.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#121214] border border-white/10 border-l-4 border-l-[#CCFF00] p-5 -skew-x-3 hover:border-white transition-all flex flex-col justify-between"
              >
                <div className="skew-x-3">
                  <div className="flex justify-between items-center text-xs text-[#CCFF00] font-mono-tech mb-2">
                    <span>{item.time}</span>
                    <span className="bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-0.5 text-[10px] font-bold">
                      {item.spots}
                    </span>
                  </div>
                  <h4 className="font-industrial uppercase italic text-base font-black text-white mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-400">{item.coach} · {item.zone}</p>
                </div>
                <button
                  onClick={() => handleAction(`Clase ${item.name} a las ${item.time}`)}
                  className="mt-6 text-xs text-white hover:text-[#CCFF00] font-black uppercase tracking-wider flex items-center gap-1 skew-x-3"
                >
                  <span>Reservar Lugar →</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/20 text-center text-xs text-slate-500 font-mono-tech">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-industrial uppercase italic text-2xl text-white">{brandName}</div>
          <p>{brandCity} · EQUIPAMIENTO OFICIAL CERTIFICADO IPF / IWF</p>
          <p className="text-[10px]">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
