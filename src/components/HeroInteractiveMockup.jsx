import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Star, CheckCircle, Sparkles, TrendingUp, UserCheck, Flame } from 'lucide-react';

const NOTIFICATIONS_FEED = [
  { id: 1, text: 'Carlos Mendoza (@carlos_mty) le dio me gusta a tu publicación', icon: '❤️', city: 'Monterrey' },
  { id: 2, text: 'Sofía Morales (@sofi_cdmx): "¡Excelente atención, 10/10 recomendados! 🇲🇽🔥"', icon: '💬', city: 'CDMX' },
  { id: 3, text: 'Diego Hernández (@diego_gdl) comenzó a seguir tu página', icon: '👤', city: 'Guadalajara' },
  { id: 4, text: 'Dra. Patricia Solís: Calificó con 5 estrellas en Google Maps', icon: '⭐', city: 'Zapopan' },
  { id: 5, text: 'Mariana Elizondo (@mariana_qro) compartió tu reel en historias', icon: '🚀', city: 'Querétaro' },
];

export default function HeroInteractiveMockup() {
  const [platform, setPlatform] = useState('instagram'); // instagram | facebook | tiktok
  const [likesCount, setLikesCount] = useState(1482);
  const [activeNotifIndex, setActiveNotifIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(true);

  // Live like ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setLikesCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Notifications carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNotifIndex((prev) => (prev + 1) % NOTIFICATIONS_FEED.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentNotif = NOTIFICATIONS_FEED[activeNotifIndex];

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto select-none">
      {/* Background neon glows */}
      <div
        className="absolute -top-10 -right-10 w-64 h-64 rounded-full pointer-events-none opacity-80"
        style={{ background: 'radial-gradient(circle, rgba(255,0,92,0.2) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full pointer-events-none opacity-80"
        style={{ background: 'radial-gradient(circle, rgba(0,245,155,0.2) 0%, transparent 70%)' }}
      />

      {/* Floating live indicator badge */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#00F59B]/50 text-[#00F59B] text-xs font-mono font-bold flex items-center gap-1.5 shadow-xl shadow-[#00F59B]/20">
        <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-ping" />
        ENTREGA EN VIVO • MÉXICO
      </div>

      {/* iPhone Outer Chassis */}
      <div className="relative rounded-[44px] p-3.5 bg-gradient-to-b from-[#2A2E3D] via-[#12141F] to-[#0A0C14] border-2 border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        {/* Inner Screen */}
        <div className="relative rounded-[36px] bg-[#090C15] border border-white/10 overflow-hidden flex flex-col justify-between">
          
          {/* Dynamic Island / Notch */}
          <div className="pt-3 pb-2 px-6 bg-[#090C15] flex items-center justify-between z-20">
            <span className="text-[11px] font-mono font-bold text-slate-300">9:41</span>
            <div className="w-20 h-4 rounded-full bg-black border border-white/10 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-slate-700" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-300 font-mono">
              <span>5G</span>
              <span>🇲🇽</span>
            </div>
          </div>

          {/* Social Platform Switcher inside screen */}
          <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex justify-center gap-1.5">
            {[
              { id: 'instagram', label: 'Instagram', color: 'text-pink-400' },
              { id: 'facebook', label: 'Facebook', color: 'text-blue-400' },
              { id: 'tiktok', label: 'TikTok', color: 'text-purple-400' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  platform === p.id
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Post Header */}
          <div className="p-3.5 flex items-center justify-between border-b border-white/5 bg-[#0A0E1A]/80">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF005C] via-purple-500 to-[#00F59B] p-0.5">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                  🌮
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-white font-bold text-xs">taqueria_roma_cdmx</span>
                  <CheckCircle className="w-3 h-3 text-[#00F59B] fill-current" />
                </div>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  Roma Norte, Ciudad de México 🇲🇽
                </span>
              </div>
            </div>
            <span className="text-slate-400 text-xs font-bold">•••</span>
          </div>

          {/* Post Image Container */}
          <div className="relative h-44 sm:h-48 bg-gradient-to-br from-slate-800 to-slate-950 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=80"
              alt="Post mexicano"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Live engagement sticker */}
            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#FF005C]/40 text-[#FF005C] text-[10px] font-bold flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" /> Viral en CDMX
            </div>

            {/* Double-tap animated heart preview */}
            <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-xs text-white">
              <span className="font-bold">Campañas Activas:</span>
              <span className="text-[#00F59B] font-mono font-bold">+1,500 Interacciones</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-3 bg-[#0A0E1A] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="transition-transform active:scale-125"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'text-[#FF005C] fill-[#FF005C]' : 'text-white'}`} />
                </button>
                <MessageCircle className="w-5 h-5 text-slate-300" />
                <Send className="w-5 h-5 text-slate-300" />
              </div>
              <Bookmark className="w-5 h-5 text-slate-300" />
            </div>

            {/* Like Counter with Live Tick */}
            <div className="flex items-center justify-between text-xs">
              <div className="text-white font-bold flex items-center gap-1">
                <span>Le gusta a</span>
                <strong className="text-slate-200">carlos_mty</strong>
                <span>y</span>
                <span className="font-mono text-[#00F59B] font-black">{likesCount.toLocaleString('es-MX')} personas</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-ping" />
            </div>

            <p className="text-[11px] text-slate-300 leading-tight">
              <strong className="text-white">taqueria_roma_cdmx</strong> ¡Viernes de tacos al pastor con perfiles y clientes 100% reales de la Roma y Condesa! 🌮🇲🇽
            </p>
          </div>

          {/* SLIDING LIVE NOTIFICATION PILL */}
          <div className="p-2.5 bg-black/90 border-t border-white/10">
            <div className="p-2 rounded-xl bg-gradient-to-r from-white/[0.08] to-transparent border border-[#00F59B]/30 flex items-center gap-2 animate-fadeIn">
              <span className="text-base">{currentNotif.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white leading-tight font-medium truncate">
                  {currentNotif.text}
                </p>
                <span className="text-[9px] text-[#00F59B] font-mono">
                  📍 {currentNotif.city}, México • Acreditado
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating social proof chip */}
      <div className="absolute -bottom-5 -right-4 px-3.5 py-2 rounded-2xl bg-[#12141D]/95 backdrop-blur-xl border border-white/15 text-xs text-white shadow-2xl flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#00F59B]/20 flex items-center justify-center text-[#00F59B]">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-mono">Retención Media</span>
          <strong className="text-[#00F59B] font-mono font-black">99.4% México</strong>
        </div>
      </div>
    </div>
  );
}
