import React from 'react';
import { Loader2, Sparkles, ShieldCheck } from 'lucide-react';

/**
 * LandingSkeleton
 * Dark Mode Neo-Brutalist loading skeleton (< 16ms render)
 * Palette: Base #090A0F, Shimmer pulse #12141D, Accent #00F59B
 */
export default function LandingSkeleton({ title = 'Cargando Demo Sectorial...' }) {
  return (
    <div className="min-h-screen bg-[#090A0F] text-white flex flex-col relative overflow-hidden animate-in fade-in duration-150">
      {/* Top micro-bar skeleton */}
      <div className="w-full h-16 border-b border-white/10 bg-[#0B0F1C]/80 backdrop-blur-md px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#12141D] animate-pulse flex items-center justify-center border border-white/5">
            <Sparkles className="w-4 h-4 text-[#00F59B] animate-spin" />
          </div>
          <div className="space-y-1.5">
            <div className="h-4 w-36 bg-[#12141D] rounded-md animate-pulse border border-white/5" />
            <div className="h-2.5 w-24 bg-[#12141D]/70 rounded-md animate-pulse" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 bg-[#12141D] rounded-lg animate-pulse border border-white/5" />
          <div className="h-8 w-8 bg-[#12141D] rounded-lg animate-pulse border border-white/5" />
        </div>
      </div>

      {/* Hero section skeleton */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left column */}
        <div className="flex-1 space-y-6 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12141D] border border-[#00F59B]/30 text-[#00F59B] text-xs font-mono font-semibold">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00F59B]" />
            <span>DESCARGANDO MÓDULO OPTIMIZADO V2.0</span>
          </div>

          <div className="space-y-3">
            <div className="h-12 sm:h-14 w-4/5 bg-[#12141D] rounded-2xl animate-pulse border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-[#00F59B]/10 to-transparent" />
            </div>
            <div className="h-10 sm:h-12 w-3/5 bg-[#12141D] rounded-2xl animate-pulse border border-white/5" />
          </div>

          <div className="space-y-2 pt-2">
            <div className="h-4 w-full max-w-lg bg-[#12141D] rounded-lg animate-pulse" />
            <div className="h-4 w-5/6 max-w-md bg-[#12141D] rounded-lg animate-pulse" />
            <div className="h-4 w-2/3 max-w-sm bg-[#12141D] rounded-lg animate-pulse" />
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="h-12 w-44 bg-[#00F59B]/15 border border-[#00F59B]/40 rounded-xl animate-pulse flex items-center justify-center">
              <span className="text-[#00F59B] text-xs font-mono font-bold">PREPARANDO VISTA...</span>
            </div>
            <div className="h-12 w-36 bg-[#12141D] border border-white/10 rounded-xl animate-pulse" />
          </div>

          {/* Social Proof badges */}
          <div className="flex items-center gap-3 pt-6 border-t border-white/5">
            <ShieldCheck className="w-5 h-5 text-[#00F59B]" />
            <span className="text-xs text-slate-400 font-mono">100% Optimizado con Brotli / WebP &amp; React.lazy</span>
          </div>
        </div>

        {/* Right column: Interactive mockup skeleton */}
        <div className="w-full lg:w-[480px] h-[400px] sm:h-[460px] bg-[#12141D] rounded-3xl border border-white/10 p-4 relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            </div>
            <div className="h-4 w-28 bg-white/5 rounded-full" />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-6">
            <div className="w-14 h-14 rounded-2xl bg-[#090A0F] border border-[#00F59B]/40 flex items-center justify-center shadow-lg shadow-[#00F59B]/10">
              <Loader2 className="w-7 h-7 text-[#00F59B] animate-spin" />
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-wide">{title}</p>
              <p className="text-xs text-slate-400 mt-1">Conectando componentes interactivos...</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
            <div className="h-12 bg-[#090A0F] rounded-xl border border-white/5" />
            <div className="h-12 bg-[#090A0F] rounded-xl border border-white/5" />
            <div className="h-12 bg-[#090A0F] rounded-xl border border-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
