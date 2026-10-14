import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowLeftRight, CheckCircle2, XCircle, TrendingUp, AlertTriangle, ShieldCheck, Heart, MessageCircle, Share2, Star } from 'lucide-react';

export default function BeforeAfterComparison() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="py-24 bg-[#090A0F] relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF005C]/10 border border-[#FF005C]/30 text-[#FF005C] text-xs font-bold uppercase tracking-wider mb-3">
            <ArrowLeftRight className="w-3.5 h-3.5" /> CRO & PRUEBA PSICOLÓGICA
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            El Impacto en tus <span className="gradient-neon-text">Ventas</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Desliza el control para comparar el comportamiento de compra de un cliente mexicano antes y después de dotar a tu marca de autoridad social.
          </p>

          {/* Quick toggle buttons */}
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setSliderPos(15)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                sliderPos < 35 ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-white/5 text-slate-400'
              }`}
            >
              Ver "Antes" (Sin Autoridad)
            </button>
            <button
              onClick={() => setSliderPos(50)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                sliderPos >= 35 && sliderPos <= 65 ? 'bg-white/20 text-white border border-white/40' : 'bg-white/5 text-slate-400'
              }`}
            >
              Comparar 50/50
            </button>
            <button
              onClick={() => setSliderPos(85)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                sliderPos > 65 ? 'bg-[#00F59B]/20 text-[#00F59B] border border-[#00F59B]/40' : 'bg-white/5 text-slate-400'
              }`}
            >
              Ver "Después" (Likes Mexicanos)
            </button>
          </div>
        </div>

        {/* Interactive Comparison Canvas */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          className="relative w-full h-[520px] sm:h-[500px] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-white/15 shadow-2xl shadow-black/80 bg-[#0C101A]"
        >
          {/* AFTER SIDE (Full background layer) */}
          <div className="absolute inset-0 bg-[#0A1220] p-6 sm:p-10 flex flex-col justify-between">
            {/* After Tag */}
            <div className="flex justify-end items-center">
              <span className="px-3.5 py-1.5 rounded-full bg-[#00F59B]/20 border border-[#00F59B]/40 text-[#00F59B] text-xs font-black uppercase flex items-center gap-1.5 shadow-lg">
                <CheckCircle2 className="w-4 h-4" /> DESPUÉS: Con Likes Mexicanos Reales 🇲🇽
              </span>
            </div>

            {/* Profile simulation content for "After" */}
            <div className="max-w-md ml-auto text-right space-y-4">
              <div className="flex items-center justify-end gap-3">
                <div>
                  <h4 className="text-lg font-black text-white">Marca Líder en México</h4>
                  <span className="text-xs text-[#00F59B] font-mono">@tu_marca_mexico • Verificada</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00F59B] to-emerald-400 p-0.5 shadow-lg shadow-emerald-500/20">
                  <div className="w-full h-full rounded-[14px] bg-[#0C101A] flex items-center justify-center text-xl font-bold text-white">
                    🇲🇽
                  </div>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/[0.04] border border-[#00F59B]/20 text-center font-mono">
                <div>
                  <div className="text-lg font-black text-white">15,400</div>
                  <div className="text-[10px] text-slate-400">Seguidores MX</div>
                </div>
                <div>
                  <div className="text-lg font-black text-[#00F59B]">890+</div>
                  <div className="text-[10px] text-slate-400">Likes / Post</div>
                </div>
                <div>
                  <div className="text-lg font-black text-amber-300 flex items-center justify-center gap-0.5">
                    5.0 <Star className="w-3.5 h-3.5 fill-current text-amber-300" />
                  </div>
                  <div className="text-[10px] text-slate-400">Google Maps</div>
                </div>
              </div>

              {/* Simulated Customer Comment Pill */}
              <div className="p-3.5 rounded-2xl bg-[#00F59B]/10 border border-[#00F59B]/30 text-left text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#00F59B]" /> Mariana (Guadalajara, Jal.)
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">hace 5 min</span>
                </div>
                <p className="text-slate-200 italic">
                  "¡Amé el servicio! Me dio mucha confianza ver tantos comentarios y recomendaciones en México, pagué por SPEI y me llegó al día siguiente 🔥"
                </p>
              </div>

              {/* Conversion stat */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs text-slate-300">
                <TrendingUp className="w-4 h-4 text-[#00F59B]" />
                <span>Tasa de Conversión: <strong className="text-[#00F59B]">8.9% (+2,100% ventas)</strong></span>
              </div>
            </div>

            <div className="flex justify-end text-[11px] text-slate-400">
              <span>Percepción: Marca establecida, confiable y con respaldo nacional.</span>
            </div>
          </div>

          {/* BEFORE SIDE (Clipped layer based on sliderPos) */}
          <div
            className="absolute inset-0 bg-[#0E0B12] p-6 sm:p-10 flex flex-col justify-between border-r border-white/20"
            style={{ width: `${sliderPos}%`, overflow: 'hidden' }}
          >
            {/* Before Tag */}
            <div className="flex justify-start items-center">
              <span className="px-3.5 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-black uppercase flex items-center gap-1.5 shadow-lg whitespace-nowrap">
                <XCircle className="w-4 h-4" /> ANTES: Sin Autoridad Social
              </span>
            </div>

            {/* Profile simulation content for "Before" */}
            <div className="max-w-md text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 p-0.5 border border-white/10">
                  <div className="w-full h-full rounded-[14px] bg-[#0E0B12] flex items-center justify-center text-xl font-bold text-slate-500">
                    ?
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-300">Negocio sin Presencia</h4>
                  <span className="text-xs text-slate-500 font-mono">@tu_marca_mexico • Sin actividad</span>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/[0.02] border border-white/10 text-center font-mono">
                <div>
                  <div className="text-lg font-black text-slate-400">82</div>
                  <div className="text-[10px] text-slate-500">Seguidores</div>
                </div>
                <div>
                  <div className="text-lg font-black text-slate-400">2</div>
                  <div className="text-[10px] text-slate-500">Likes / Post</div>
                </div>
                <div>
                  <div className="text-lg font-black text-slate-500">0</div>
                  <div className="text-[10px] text-slate-500">Reseñas</div>
                </div>
              </div>

              {/* Lost customer feedback */}
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-left text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-300 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Cliente Potencial Abandonó
                  </span>
                  <span className="text-[10px] text-red-400 font-mono">hace 10 min</span>
                </div>
                <p className="text-slate-300 italic">
                  "Entré a ver su perfil de Instagram, pero casi no tenía seguidores ni comentarios. Me dio miedo que fuera fraude y no compré."
                </p>
              </div>

              {/* Conversion stat */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs text-slate-400">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Tasa de Conversión: <strong className="text-red-400">0.3% (98% abandonos)</strong></span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 whitespace-nowrap">
              <span>Percepción: Proyecto nuevo, desconfianza para pagar por adelantado.</span>
            </div>
          </div>

          {/* DRAGGABLE DIVIDER LINE */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#00F59B] via-white to-[#FF005C] -translate-x-1/2 cursor-ew-resize pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Handle button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-white shadow-2xl flex items-center justify-center text-white pointer-events-auto">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
