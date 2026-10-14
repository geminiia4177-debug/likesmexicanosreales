import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Target,
  Zap,
  BarChart3,
  CheckCircle2,
  Building,
  MapPin,
  Users,
  Search,
  RefreshCw,
  Award,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfileAuditWidget({ onApplyRecommendation }) {
  const [handleOrBusiness, setHandleOrBusiness] = useState('@taqueria_ejemplo');
  const [industry, setIndustry] = useState('restaurante');
  const [city, setCity] = useState('CDMX');
  const [currentFollowers, setCurrentFollowers] = useState(450);
  
  // Scanning state
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [scanCompleted, setScanCompleted] = useState(true); // default previewed, but ready for live scan
  const [displayScore, setDisplayScore] = useState(28);

  const benchmarks = {
    restaurante: { label: 'Gastronomía & Bares', avgFollowers: 4800, avgReviews: 120, targetPack: { qty: 2500, serviceId: 'instagram_followers_mx' } },
    belleza: { label: 'Barbería & Estética', avgFollowers: 6200, avgReviews: 85, targetPack: { qty: 3000, serviceId: 'instagram_followers_mx' } },
    salud: { label: 'Clínica & Salud Dental', avgFollowers: 3500, avgReviews: 150, targetPack: { qty: 25, serviceId: 'gmaps_reviews_mx' } },
    comercio: { label: 'Tienda / E-Commerce', avgFollowers: 8500, avgReviews: 95, targetPack: { qty: 5000, serviceId: 'instagram_followers_mx' } },
    servicios: { label: 'Taller & Servicios Locales', avgFollowers: 2900, avgReviews: 110, targetPack: { qty: 1500, serviceId: 'facebook_followers_mx' } },
  };

  const currentBenchmark = benchmarks[industry] || benchmarks.restaurante;
  const targetScore = Math.max(15, Math.min(94, Math.round((currentFollowers / currentBenchmark.avgFollowers) * 100)));

  const SCAN_STEPS = [
    `Analizando competencia de ${currentBenchmark.label} en ${city}...`,
    'Calculando brecha de reseñas y geolocalización en Google Maps...',
    'Auditando retención algorítmica y perfiles de alta calidad MX...',
    'Generando fórmula de autoridad recomendada...',
  ];

  const handleStartScan = (e) => {
    e?.preventDefault();
    if (!handleOrBusiness.trim()) return;

    setIsScanning(true);
    setScanCompleted(false);
    setScanStepIndex(0);
    setDisplayScore(12);

    // Step 1
    setTimeout(() => setScanStepIndex(1), 500);
    // Step 2
    setTimeout(() => setScanStepIndex(2), 1100);
    // Step 3
    setTimeout(() => setScanStepIndex(3), 1650);

    // Complete
    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
      // Animate score counter up to targetScore
      let current = 12;
      const stepInterval = setInterval(() => {
        current += 2;
        if (current >= targetScore) {
          setDisplayScore(targetScore);
          clearInterval(stepInterval);
        } else {
          setDisplayScore(current);
        }
      }, 25);
    }, 2200);
  };

  const handleApply = () => {
    if (onApplyRecommendation) {
      onApplyRecommendation({
        industry,
        city,
        recommendedQuantity: currentBenchmark.targetPack.qty,
        serviceId: currentBenchmark.targetPack.serviceId,
      });
    }
    const cotizador = document.getElementById('cotizador');
    if (cotizador) {
      cotizador.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0F1424] border-t border-white/20 border-x border-white/5 border-b border-black/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden my-12 linear-card">
      {/* Decorative gradient orb (0% blur overhead) */}
      <div
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(0,245,155,0.18) 0%, transparent 70%)' }}
      />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left: Input Form */}
        <div className="flex-1 w-full space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F59B]/10 border border-[#00F59B]/30 text-[#00F59B] text-xs font-mono font-bold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>AUDITOR EXPRESS DE AUTORIDAD DIGITAL MÉXICO</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            ¿Cómo está la autoridad de tu negocio frente a tu competencia local?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Escribe el nombre de tu marca o tu <strong className="text-white">@usuario</strong>. Analizamos la brecha de seguidores y reseñas contra más de 16,800 comercios en tu ciudad para darte un plan exacto de crecimiento.
          </p>

          <form onSubmit={handleStartScan} className="space-y-3 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Business Handle / Link Input */}
              <div className="sm:col-span-6">
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  @Usuario o Nombre de Negocio
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="@tu_marca o Taquería Roma"
                    value={handleOrBusiness}
                    onChange={(e) => setHandleOrBusiness(e.target.value)}
                    className="w-full bg-[#161B2E] border border-white/15 focus:border-[#00F59B] text-white text-xs rounded-xl pl-8 pr-3 py-2.5 outline-none font-mono"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                </div>
              </div>

              {/* Industry */}
              <div className="sm:col-span-3">
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Giro</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-[#161B2E] border border-white/15 focus:border-[#00F59B] text-white text-xs rounded-xl px-2.5 py-2.5 outline-none"
                >
                  <option value="restaurante">Gastronomía &amp; Bares</option>
                  <option value="belleza">Barbería &amp; Estética</option>
                  <option value="salud">Clínica &amp; Salud Dental</option>
                  <option value="comercio">Tienda / E-Commerce</option>
                  <option value="servicios">Taller &amp; Servicios Locales</option>
                </select>
              </div>

              {/* City */}
              <div className="sm:col-span-3">
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Ciudad MX</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#161B2E] border border-white/15 focus:border-[#00F59B] text-white text-xs rounded-xl px-2.5 py-2.5 outline-none"
                >
                  <option value="CDMX">CDMX &amp; Área Metrop.</option>
                  <option value="GDL">Guadalajara / Zapopan</option>
                  <option value="MTY">Monterrey / San Pedro</option>
                  <option value="PUE">Puebla / Querétaro</option>
                  <option value="OTRA">Otra Ciudad MX</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <div className="w-full sm:w-1/2">
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  Seguidores / Reseñas actuales (estimado)
                </label>
                <input
                  type="number"
                  min="0"
                  max="500000"
                  value={currentFollowers}
                  onChange={(e) => setCurrentFollowers(Number(e.target.value) || 0)}
                  className="w-full bg-[#161B2E] border border-white/15 focus:border-[#00F59B] text-white text-xs rounded-xl px-3 py-2 outline-none font-mono"
                />
              </div>

              <div className="w-full sm:w-1/2 sm:pt-4">
                <button
                  type="submit"
                  disabled={isScanning}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00F59B] to-emerald-400 hover:from-[#00d885] hover:to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#00F59B]/20 disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Analizando Algoritmos...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Ejecutar Diagnóstico Express</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Scanner Progress Banner */}
          {isScanning && (
            <div className="p-3.5 rounded-xl bg-black/50 border border-[#00F59B]/40 animate-pulse flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00F59B] animate-ping" />
              <p className="text-xs font-mono text-[#00F59B]">
                {SCAN_STEPS[scanStepIndex]}
              </p>
            </div>
          )}
        </div>

        {/* Right: Real-time Score & Pre-config recommendation */}
        <div className="w-full lg:w-84 bg-[#121629] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          {/* Header */}
          <div className="text-center pb-4 border-b border-white/10">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Puntuación de Autoridad Local
            </span>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className={`text-4xl font-black ${displayScore < 50 ? 'text-amber-400' : 'text-[#00F59B]'}`}>
                {displayScore}
              </span>
              <span className="text-slate-500 font-bold text-lg">/100</span>
            </div>
            
            <div className="w-full bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${displayScore < 50 ? 'bg-amber-400' : 'bg-[#00F59B]'}`}
                style={{ width: `${displayScore}%` }}
              />
            </div>
          </div>

          {/* Diagnosis details */}
          <div className="py-3 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span>Promedio en {city}:</span>
              <span className="font-bold text-white font-mono">{currentBenchmark.avgFollowers.toLocaleString()} seguidores</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Brecha competitiva:</span>
              <span className="font-bold text-amber-400 font-mono">
                {Math.max(0, currentBenchmark.avgFollowers - currentFollowers).toLocaleString()} {industry === 'salud' ? 'reseñas/seg.' : 'seguidores'}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Diagnóstico:</span>
              <span className={`font-bold ${displayScore < 50 ? 'text-amber-400' : 'text-[#00F59B]'}`}>
                {displayScore < 50 ? '🔴 Requiere Refuerzo Inmediato' : '🟢 Buen Nivel de Confianza'}
              </span>
            </div>
          </div>

          {/* Action button: Auto-adjust calculator */}
          <button
            type="button"
            onClick={handleApply}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF005C] to-[#7928CA] hover:brightness-110 text-white font-black text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FF005C]/25 mt-2"
          >
            <span>Auto-ajustar Paquete ({currentBenchmark.targetPack.qty.toLocaleString()}) ↓</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
