import React, { useState } from 'react';
import { ShieldCheck, Lock, TrendingUp, Zap, Sparkles, MapPin, CheckCircle, Activity, Gauge } from 'lucide-react';

const CITIES = [
  { name: 'CDMX', x: 55, y: 72, active: true },
  { name: 'Monterrey', x: 52, y: 38, active: true },
  { name: 'Guadalajara', x: 42, y: 68, active: true },
  { name: 'Puebla', x: 58, y: 75, active: true },
  { name: 'Querétaro', x: 51, y: 65, active: true },
  { name: 'Cancún', x: 88, y: 64, active: true },
  { name: 'Tijuana', x: 12, y: 15, active: true },
  { name: 'Mérida', x: 83, y: 62, active: true },
];

export default function BentoGrid() {
  const [selectedSpeed, setSelectedSpeed] = useState('drip'); // 'instant' | 'drip'

  return (
    <section id="diferenciadores" className="py-28 bg-[#090A0F] relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting (0% GPU blur) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[400px] rounded-full pointer-events-none opacity-80"
        style={{ background: 'radial-gradient(circle, rgba(121,40,202,0.12) 0%, rgba(255,0,92,0.06) 40%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/30 text-[#00F59B] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> BENTO GRID DE DIFERENCIACIÓN CRO
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            ¿Por qué elegir <span className="gradient-mexico-text">Likes Mexicanos</span> frente a bots extranjeros?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed font-light">
            Destruimos las objeciones comunes del mercado: perfiles 100% latinos y geolocalizados en México, máxima seguridad sin contraseñas y garantía real de retención.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Mapa de México con Nodos en Vivo (Span 7 cols) */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-[#12141D] border-t border-white/20 border-x border-white/5 border-b border-black/80 hover:border-t-[#00F59B]/60 transition-[transform,border-color,box-shadow] duration-300 shadow-2xl relative overflow-hidden flex flex-col justify-between group will-change-transform">
            <div
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none opacity-80"
              style={{ background: 'radial-gradient(circle, rgba(0,245,155,0.14) 0%, transparent 70%)' }}
            />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00F59B]/15 text-[#00F59B] border border-[#00F59B]/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-ping" />
                  IPs Residenciales Activas en México 🇲🇽
                </span>
                <span className="text-xs text-slate-400 font-mono">32 Entidades</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                Perfiles 100% Mexicanos Reales
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                Nada de cuentas árabes, perfiles rusos sin foto o nombres aleatorios. Cuentas con actividad regular, nombres hispanos auténticos e interacción natural con IP de México.
              </p>
            </div>

            {/* Stylized Interactive Mexico Map Visual */}
            <div className="my-6 relative h-56 sm:h-64 rounded-2xl bg-[#090C15] border border-white/5 overflow-hidden flex items-center justify-center">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#00F59B 1px,transparent 1px),linear-gradient(90deg,#00F59B 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

              {/* Stylized Map SVG Lines */}
              <svg className="w-full h-full max-h-56 text-[#00F59B]/20" viewBox="0 0 100 85" fill="none">
                {/* Abstract Mexico polygon paths */}
                <path
                  d="M10 12 L20 22 L25 18 L38 35 L48 30 L55 35 L62 25 L68 40 L58 55 L52 65 L44 68 L50 78 L65 72 L72 68 L80 62 L88 62 L92 68 L85 75 L70 76 L52 80 L35 70 L25 50 L18 35 Z"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  fill="rgba(0, 245, 155, 0.03)"
                />
                {/* Cyber connection lines between hubs */}
                <line x1="12" y1="15" x2="52" y2="38" stroke="#00F59B" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-40" />
                <line x1="52" y1="38" x2="55" y2="72" stroke="#00F59B" strokeWidth="0.6" strokeDasharray="3 2" className="opacity-60" />
                <line x1="42" y1="68" x2="55" y2="72" stroke="#00F59B" strokeWidth="0.6" strokeDasharray="2 2" className="opacity-50" />
                <line x1="55" y1="72" x2="58" y2="75" stroke="#FF005C" strokeWidth="0.8" className="opacity-70" />
                <line x1="55" y1="72" x2="88" y2="64" stroke="#7928CA" strokeWidth="0.5" strokeDasharray="2 3" className="opacity-50" />
              </svg>

              {/* Interactive City Nodes */}
              {CITIES.map((c) => (
                <div
                  key={c.name}
                  className="absolute group/city cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#00F59B] opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F59B] border border-white" />
                  </div>
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-white whitespace-nowrap opacity-75 group-hover/city:opacity-100 transition-opacity">
                    {c.name}
                  </span>
                </div>
              ))}

              {/* Floating Real-time Ping Box */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse" />
                <span>Nodos sincronizados en tiempo real: <strong className="text-white font-mono">1,450+ cuentas activas</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle className="w-3.5 h-3.5" /> Geolocalización exacta en CDMX, Monterrey, GDL y más
              </span>
              <span className="font-mono text-[11px] text-slate-400">Sin penalización algorítmica</span>
            </div>
          </div>

          {/* Bento Card 2: Cero Riesgo de Baneo (Span 5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#12141D] border-t border-white/20 border-x border-white/5 border-b border-black/80 hover:border-t-[#00F59B]/60 transition-[transform,border-color,box-shadow] duration-300 shadow-2xl relative overflow-hidden flex flex-col justify-between group will-change-transform">
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-80"
              style={{ background: 'radial-gradient(circle, rgba(0,245,155,0.16) 0%, transparent 70%)' }}
            />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00F59B]/15 text-[#00F59B] border border-[#00F59B]/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Seguridad de Grado Militar
                </span>
                <span className="text-xs text-slate-400 font-mono">100% Seguro</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                Cero Riesgo de Baneo <br />
                <span className="text-[#00F59B]">Nunca te pediremos contraseña</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Tu privacidad y el acceso a tu cuenta están 100% a salvo. Solo necesitamos el enlace público o @usuario. Jamás solicitamos claves ni accesos administrativos.
              </p>
            </div>

            {/* Visual Animated Shield */}
            <div className="my-6 relative py-6 flex items-center justify-center">
              <div className="relative">
                {/* Glowing circles */}
                <div className="w-28 h-28 rounded-full border-2 border-[#00F59B]/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] absolute inset-0 -m-2 pointer-events-none" />
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00F59B]/20 via-[#00F59B]/5 to-transparent border border-[#00F59B]/40 flex items-center justify-center text-[#00F59B] shadow-[0_0_40px_rgba(0,245,155,0.25)]">
                  <Lock className="w-10 h-10" />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-white font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-[#00F59B]" />
                Cumplimiento estricto de políticas públicas
              </div>
              <p className="text-[11px] text-slate-400">
                La entrega imita el comportamiento de interacciones orgánicas recomendadas en el feed.
              </p>
            </div>
          </div>

          {/* Bento Card 3: Garantía Anti-Caída (Span 5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#12141D] border-t border-white/20 border-x border-white/5 border-b border-black/80 hover:border-t-[#FF005C]/60 transition-[transform,border-color,box-shadow] duration-300 shadow-2xl relative overflow-hidden flex flex-col justify-between group will-change-transform">
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-80"
              style={{ background: 'radial-gradient(circle, rgba(255,0,92,0.16) 0%, transparent 70%)' }}
            />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF005C]/15 text-[#FF005C] border border-[#FF005C]/30 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Retención Verificada 99.4%
                </span>
                <span className="text-xs text-slate-400 font-mono">Refill 30 Días</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                Garantía Anti-Caída <br />
                <span className="text-[#FF005C]">Reposición Automática</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                A diferencia de los servicios genéricos que caen al cabo de días, nuestros perfiles cuentan con garantía de estabilidad de 30 días con refill gratuito por WhatsApp.
              </p>
            </div>

            {/* Ascending Chart Visual */}
            <div className="my-6 p-4 rounded-2xl bg-[#090C15] border border-white/5 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-400">Estabilidad en 30 Días:</span>
                <span className="text-lg font-mono font-black text-[#00F59B]">99.4% Retenido</span>
              </div>

              {/* Graphic Comparison */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-200 font-semibold">Likes Mexicanos Reales</span>
                    <span className="text-[#00F59B] font-mono font-bold">99.4% (Sin Caídas)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00F59B] to-emerald-400 rounded-full w-[99.4%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Proveedores extranjeros genéricos</span>
                    <span className="text-[#FF005C] font-mono">38% (Pierden 60% en 1 sem)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-red-500/60 rounded-full w-[38%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Soporte prioritario 24/7</span>
              <span className="font-mono text-emerald-400 font-bold">Garantía por escrito</span>
            </div>
          </div>

          {/* Bento Card 4: Entrega Gradual o Instantánea (Span 7 cols) */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-[#12141D] border-t border-white/20 border-x border-white/5 border-b border-black/80 hover:border-t-[#7928CA]/60 transition-[transform,border-color,box-shadow] duration-300 shadow-2xl relative overflow-hidden flex flex-col justify-between group will-change-transform">
            <div
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none opacity-80"
              style={{ background: 'radial-gradient(circle, rgba(121,40,202,0.16) 0%, transparent 70%)' }}
            />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7928CA]/20 text-[#A855F7] border border-[#7928CA]/30 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5" /> Control de Ritmo Inteligente
                </span>
                <span className="text-xs text-slate-400 font-mono">Tú decides</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                Entrega Gradual o Instantánea
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                ¿Lanzamiento de campaña viral urgente o crecimiento orgánico natural mes a mes? Tú eliges la velocidad con la que las interacciones ingresan a tu publicación o perfil.
              </p>
            </div>

            {/* Interactive Speed Switcher */}
            <div className="my-6 p-5 rounded-2xl bg-[#090C15] border border-white/5 space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedSpeed('instant')}
                  className={`flex-1 p-3.5 rounded-xl border text-left transition-all ${
                    selectedSpeed === 'instant'
                      ? 'bg-[#FF005C]/20 border-[#FF005C] shadow-lg shadow-[#FF005C]/15 text-white'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[#FF005C]" /> Modo Viral
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#FF005C] font-bold">15 - 30 min</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Impacto masivo de alta velocidad para promociones flash, lanzamientos o sorteos.
                  </p>
                </button>

                <button
                  onClick={() => setSelectedSpeed('drip')}
                  className={`flex-1 p-3.5 rounded-xl border text-left transition-all ${
                    selectedSpeed === 'drip'
                      ? 'bg-[#00F59B]/20 border-[#00F59B] shadow-lg shadow-[#00F59B]/15 text-white'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-[#00F59B]" /> Crecimiento Gradual
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-[#00F59B] font-bold">Drip-Feed 24-48h</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Llegada progresiva dosificada hora por hora para máxima naturalidad algorítmica.
                  </p>
                </button>
              </div>

              {/* Dynamic feedback banner */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-300">
                  Modo activo: <strong className="text-white">{selectedSpeed === 'instant' ? 'Impulso Viral Inmediato' : 'Dosificación Progresiva Inteligente'}</strong>
                </span>
                <span className={`font-mono text-[11px] font-bold ${selectedSpeed === 'instant' ? 'text-[#FF005C]' : 'text-[#00F59B]'}`}>
                  {selectedSpeed === 'instant' ? 'Velocidad: 100%' : 'Curva Suave Activa'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Configurable sin costo extra</span>
              <span className="text-[#A855F7] font-semibold">Algoritmo Optimizado 🇲🇽</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
