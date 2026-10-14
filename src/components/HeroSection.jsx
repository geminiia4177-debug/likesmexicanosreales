import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowUpRight, Play, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroInteractiveMockup from './HeroInteractiveMockup';

const WORDS = ['Likes Reales', 'Seguidores', 'Reseñas 5★', 'Comentarios'];

export default function HeroSection({ onOpenShowcase }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-[#090A0F]">
      {/* Background native radial lights (0% GPU blur overhead) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/6 left-1/4 w-[45vw] h-[45vw] rounded-full pointer-events-none opacity-80"
          style={{ background: 'radial-gradient(circle, rgba(0,245,155,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/6 right-1/4 w-[40vw] h-[40vw] rounded-full pointer-events-none opacity-80"
          style={{ background: 'radial-gradient(circle, rgba(255,0,92,0.12) 0%, transparent 70%)' }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/30 text-[#00F59B] font-bold text-xs sm:text-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F59B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F59B]" />
              </span>
              <ShieldCheck className="w-4 h-4" /> 🇲🇽 Perfiles 100% Mexicanos y Geolocalizados • Cero Contraseñas
            </div>

            {/* Dynamic Headline with Smooth Motion Flip Word */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]">
              Impulsa tu negocio con <br />
              <span className="inline-block relative min-w-[240px] sm:min-w-[320px] h-[1.15em] overflow-hidden align-middle">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 28, opacity: 0, scale: 0.96 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -28, opacity: 0, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="inline-block gradient-mexico-text"
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              <span className="gradient-neon-text">100% Mexicanos</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-base sm:text-lg text-slate-300 font-light leading-relaxed mx-auto lg:mx-0">
              Aumenta tu reputación digital con cuentas auténticas, IPs residenciales de México y actividad verificada en CDMX, Monterrey, Guadalajara y toda la República.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start max-w-md mx-auto lg:mx-0 pt-2">
              <a
                href="#cotizador"
                className="group px-7 py-4 rounded-xl bg-gradient-to-r from-[#FF005C] to-[#7928CA] hover:brightness-110 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#FF005C]/25 transition-transform hover:scale-105 active:scale-95 will-change-transform"
              >
                <span>Armar Paquete en Segundos</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                onClick={() => onOpenShowcase && onOpenShowcase('tequila')}
                className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/10 hover:border-[#00F59B]/40 flex items-center justify-center gap-2 backdrop-blur-md transition-transform hover:scale-105 will-change-transform"
              >
                <Play className="w-4 h-4 text-[#00F59B]" fill="currentColor" />
                <span>Ver Demos en Vivo (11)</span>
              </button>
            </div>

            {/* Social proof strip */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex -space-x-2 overflow-hidden">
                {['👨‍💼', '👩‍💼', '👨‍🍳', '👩‍⚕️', '🌮'].map((em, i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full bg-slate-800 border-2 border-[#090A0F] flex items-center justify-center text-xs"
                  >
                    {em}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-slate-200">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <strong className="text-white font-bold">4.98/5</strong>
                <span className="text-slate-400">(+15,400 marcas impulsadas en México)</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Interactive 3D Smartphone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroInteractiveMockup />
          </div>

        </div>

        {/* BOTTOM TRUST BAR */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs text-[#00F59B] font-bold uppercase tracking-wider block">
                COBERTURA Y CONFIANZA NACIONAL
              </span>
              <p className="text-sm text-slate-300 font-semibold mt-0.5">
                +15,400 pedidos entregados en CDMX, Monterrey, Guadalajara, Puebla y todo México
              </p>
            </div>

            {/* Official Payment Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-bold flex items-center gap-1.5 shadow-sm">
                ⚡ SPEI Interbancario
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold flex items-center gap-1.5 shadow-sm">
                🏪 OXXO Pay
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 font-bold flex items-center gap-1.5 shadow-sm">
                💳 Mercado Pago MX
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold flex items-center gap-1.5 shadow-sm">
                🧾 Factura CFDI 4.0
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
