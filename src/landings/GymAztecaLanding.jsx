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

  const brandName = businessName || 'AZTECA KINETIC PERFORMANCE';
  const brandCity = city || 'Condesa · Narvarte · Polanco, CDMX';

  // Pass Tier Toggle: daily, monthly, annual
  const [passTier, setPassTier] = useState('monthly');

  // Active Class Tab
  const [activeDay, setActiveDay] = useState('Hoy');

  const passes = {
    daily: {
      name: 'DAY PASS DE ALTO IMPACTO',
      price: '$180 MXN',
      period: 'Por día completo',
      features: ['Acceso total a peso libre olímpico', 'Acceso a zona de sacos de boxeo', 'Vestidores y regaderas con toalla', 'Válido hoy'],
      cta: 'Comprar Day Pass Inmediato',
    },
    monthly: {
      name: 'MEMBRESÍA ATLETA MENSUAL',
      price: '$990 MXN',
      period: 'Sin contrato forzoso',
      features: ['Acceso ilimitado 24/7 a las 3 zonas', 'Clases de Crossfit, Box y HIIT incluidas', 'Inbody mensual y plan de cargas', 'Invitado gratis los sábados'],
      popular: true,
      cta: 'Inscribirme con Promo de Apertura',
    },
    annual: {
      name: 'ALL-ACCESS BLACK ANUAL',
      price: '$790 MXN',
      period: 'Cobro mensual ($9,480 / año)',
      features: ['2 Meses Gratis de entrenamiento', 'Casillero privado asignado', 'Kit Azteca (Playera dry-fit + Shaker)', 'Acceso a todas las sucursales'],
      cta: 'Asegurar Tarifa Anual Congelada',
    },
  };

  const schedule = [
    { time: '06:30 AM', name: 'CROSS TRAINING GUERRERO', coach: 'Coach Tláloc', zone: 'Box Crossfit', spots: '3 Lugares' },
    { time: '08:00 AM', name: 'HIIT & METABOLIC BURN', coach: 'Coach Sofía', zone: 'Zona Funcional', spots: '5 Lugares' },
    { time: '18:00 PM', name: 'BOXEO OLÍMPICO & SPARRING', coach: 'Prof. Cruz', zone: 'El Octágono', spots: '2 Lugares' },
    { time: '19:30 PM', name: 'POWERLIFTING & TÉCNICA BARRA', coach: 'Coach Mateo', zone: 'Tarimas Olímpicas', spots: 'Último Lugar' },
  ];

  const handleAction = (planName) => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `⚡ *INSCRIPCIÓN - ${brandName}*%0A%0AQuiero activar el pase: *${planName || passes[passTier].name}* en la sucursal *${brandCity}*. ¿Tienen lockers disponibles?`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-industrial-mono selection:bg-[#CCFF00] selection:text-black">
      <DemoConversionBar
        currentKey="gym"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP KINETIC METRIC TICKER */}
      <div className="bg-[#CCFF00] text-black py-2 px-4 text-xs font-black uppercase tracking-widest flex justify-between items-center overflow-hidden border-b-2 border-white">
        <div className="flex items-center gap-6">
          <span>⚡ APERTURA 24 HORAS · 365 DÍAS</span>
          <span className="hidden sm:inline">📍 {brandCity}</span>
        </div>
        <div className="font-mono text-xs font-black">
          🔥 PROTOCOLO DE ALTO RENDIMIENTO
        </div>
      </div>

      {/* HERO SECTION: GIANT OUTLINE TEXT BEHIND ATHLETE + SKEWED GEOMETRY */}
      <section className="relative min-h-[92vh] flex flex-col justify-between p-6 sm:p-12 lg:p-20 overflow-hidden border-b border-white/20">
        {/* Giant Kinetic Outline Text in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span
            className="font-brutalist-condensed text-[20vw] sm:text-[18vw] font-black uppercase tracking-tighter opacity-15 leading-none"
            style={{
              WebkitTextStroke: '2px #FFFFFF',
              color: 'transparent',
            }}
          >
            DISCIPLINA
          </span>
        </div>

        {/* Foreground athlete image overlay */}
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
          <div className="inline-flex items-center gap-2 bg-[#CCFF00] text-black px-3 py-1 text-xs font-black uppercase skew-x-[-6deg]">
            <Flame className="w-4 h-4 fill-black" />
            <span>Centro de Alto Rendimiento Deportivo</span>
          </div>
        </div>

        {/* Center Headline */}
        <div className="relative z-10 max-w-3xl my-10">
          <h1 className="font-brutalist-condensed text-5xl sm:text-7xl lg:text-9xl font-black uppercase leading-[0.88] tracking-tight text-white mb-6">
            NO ES UN GIMNASIO, <br />
            <span className="text-[#CCFF00]">ES UN TEMPLO.</span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed mb-8">
            Más de 1,800 m² de peso libre Eleiko, jaula de artes marciales, zona de trineos y entrenadores con certificación internacional en {brandCity}.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => handleAction('Day Pass')}
              className="bg-[#CCFF00] hover:bg-[#b8e600] text-black px-8 py-4 text-sm font-black uppercase skew-x-[-6deg] transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(204,255,0,0.4)]"
            >
              <span className="skew-x-[6deg]">Reclamar Day Pass 24h</span>
              <ArrowRight className="w-4 h-4 stroke-[3] skew-x-[6deg]" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('planes-gym');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-6 py-4 text-sm font-black uppercase skew-x-[-6deg] transition-all"
            >
              <span className="skew-x-[6deg]">Ver Zonas & Membresías</span>
            </button>
          </div>
        </div>

        {/* Bottom Telemetry Bar */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/20 pt-6 text-xs font-mono">
          <div>
            <span className="text-[#CCFF00] font-black text-2xl block">1,800 m²</span>
            <span className="text-slate-400">PISO DE ALTO IMPACTO</span>
          </div>
          <div>
            <span className="text-white font-black text-2xl block">24 / 7</span>
            <span className="text-slate-400">ACCESO BIOMÉTRICO</span>
          </div>
          <div>
            <span className="text-[#CCFF00] font-black text-2xl block">0 FILAS</span>
            <span className="text-slate-400">MANCUERNAS HASTA 60 KG</span>
          </div>
          <div>
            <span className="text-white font-black text-2xl block">4.9 ★</span>
            <span className="text-slate-400">CALIFICACIÓN CDMX</span>
          </div>
        </div>
      </section>

      {/* EXCLUSIVE COMPONENT: INTERACTIVE PASS TIER TOGGLE & ZONE COMPARISON */}
      <section id="planes-gym" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#CCFF00] block mb-2">
            Pases & Planes Flexibles
          </span>
          <h2 className="font-brutalist-condensed text-4xl sm:text-6xl font-black uppercase tracking-tight">
            Elige tu Régimen de Entrenamiento
          </h2>

          {/* 3-Way Tier Toggle Buttons (Angled Skew) */}
          <div className="inline-flex mt-6 bg-[#151515] p-1.5 border border-white/20 skew-x-[-6deg]">
            {[
              { key: 'daily', label: 'Day Pass (1 Día)' },
              { key: 'monthly', label: 'Mensualidad Libre' },
              { key: 'annual', label: 'Plan Anual (-20% OFF)' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setPassTier(tab.key)}
                className={`px-5 py-2.5 text-xs font-black uppercase transition-all ${
                  passTier === tab.key
                    ? 'bg-[#CCFF00] text-black shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="skew-x-[6deg] inline-block">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Pass Display Card */}
        <div className="max-w-2xl mx-auto bg-[#121214] border-2 border-[#CCFF00] p-8 sm:p-12 relative skew-x-[-2deg] shadow-[0_0_40px_rgba(204,255,0,0.15)]">
          <div className="skew-x-[2deg]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#CCFF00] block mb-1">
                  Pase Seleccionado
                </span>
                <h3 className="font-brutalist-condensed text-3xl sm:text-4xl font-black uppercase">
                  {passes[passTier].name}
                </h3>
              </div>
              <div className="text-right">
                <div className="font-brutalist-condensed text-4xl text-[#CCFF00] font-black">
                  {passes[passTier].price}
                </div>
                <div className="text-[10px] text-slate-400">{passes[passTier].period}</div>
              </div>
            </div>

            <div className="space-y-3 mb-8 border-y border-white/10 py-6">
              {passes[passTier].features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-[#CCFF00] shrink-0 stroke-[3]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleAction(passes[passTier].name)}
              className="w-full bg-[#CCFF00] hover:bg-[#b8e600] text-black py-4 font-black uppercase text-sm tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <span>{passes[passTier].cta}</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>
      </section>

      {/* LIVE CLASS SCHEDULE TELEMETRY */}
      <section className="py-16 px-6 sm:px-12 border-t border-white/20 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs text-[#CCFF00] font-mono uppercase tracking-widest block mb-1">
                Programación de Combate & Fuerza
              </span>
              <h3 className="font-brutalist-condensed text-3xl sm:text-4xl font-black uppercase">
                Clases en Vivo Hoy en {brandCity}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#141416] border border-white/10 p-5 hover:border-[#CCFF00] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center text-xs text-[#CCFF00] font-mono mb-2">
                    <span>{item.time}</span>
                    <span className="bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-0.5 text-[10px] font-bold">
                      {item.spots}
                    </span>
                  </div>
                  <h4 className="font-brutalist text-base font-black uppercase text-white mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-400">{item.coach} · {item.zone}</p>
                </div>
                <button
                  onClick={() => handleAction(`Clase ${item.name} a las ${item.time}`)}
                  className="mt-6 text-xs text-white hover:text-[#CCFF00] font-black uppercase tracking-wider flex items-center gap-1"
                >
                  <span>Reservar Lugar →</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/20 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-brutalist-condensed text-2xl text-white uppercase">{brandName}</div>
          <p>{brandCity} · EQUIPAMIENTO OFICIAL CERTIFICADO IPF / IWF</p>
          <p className="text-[10px]">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
