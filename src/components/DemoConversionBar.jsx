import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  Building2,
  MapPin,
  Phone,
  Eye,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import { SITE_CONFIG } from '../config/siteConfig';

const DEMO_LIST = [
  { key: 'tequila', title: 'Tequila & Mezcal', icon: '🥃', color: 'from-amber-500 to-orange-600', sector: 'E-Commerce' },
  { key: 'tacos', title: 'Taquería Urbana', icon: '🌮', color: 'from-amber-400 to-yellow-500', sector: 'Street Food' },
  { key: 'barberia', title: 'Barbería Clásica', icon: '💈', color: 'from-amber-700 to-yellow-900', sector: 'Club Privado' },
  { key: 'estetica', title: 'Salón & Beauty Spa', icon: '💅', color: 'from-rose-400 to-pink-600', sector: 'Belleza' },
  { key: 'calzado', title: 'Calzado & Sneaker Drop', icon: '👟', color: 'from-stone-700 to-stone-900', sector: 'Streetwear' },
  { key: 'taller', title: 'Taller Mecánico', icon: '🚗', color: 'from-yellow-500 to-amber-600', sector: 'Industrial' },
  { key: 'cafe', title: 'Café de Especialidad', icon: '☕', color: 'from-amber-800 to-amber-950', sector: 'Cafetería' },
  { key: 'veterinaria', title: 'Veterinaria & Urgencias', icon: '🐾', color: 'from-emerald-500 to-teal-700', sector: 'Cuidado Animal' },
  { key: 'dental', title: 'Diseño de Sonrisa 3D', icon: '🦷', color: 'from-cyan-500 to-blue-600', sector: 'Dental Bento' },
  { key: 'tulum', title: 'Luxury Real Estate', icon: '🌴', color: 'from-stone-600 to-stone-800', sector: 'Quiet Luxury' },
  { key: 'gym', title: 'Gimnasio & Crossfit', icon: '⚡', color: 'from-lime-500 to-emerald-600', sector: 'Kinetic Brutalism' },
];

export default function DemoConversionBar({
  currentKey = 'tequila',
  onSwitchDemo,
  onBackToAgency,
  onOpenCheckout,
}) {
  const { businessName, city, phone, updateCustomizer, submitLead, isCustomized } = useLandingCustomizer();
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isDemoMenuOpen, setIsDemoMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeDemo = DEMO_LIST.find((d) => d.key === currentKey) || DEMO_LIST[0];

  const handleApply = async () => {
    setSavedSuccess(true);
    await submitLead(currentKey);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleBuyLanding = async () => {
    await submitLead(currentKey);
    const targetName = businessName ? ` para "${businessName}"` : '';
    const message = `¡Hola Likes Mexicanos! Me interesa cotizar y adquirir la plantilla web del sector ${activeDemo.title}${targetName} lista para operar en 48h.`;
    window.open(SITE_CONFIG.getWhatsappUrl(message), '_blank');
  };

  const handleBuyInteractions = () => {
    if (onOpenCheckout) {
      onOpenCheckout({
        id: `pack_${currentKey}`,
        title: `Paquete Especial ${activeDemo.title}`,
        price: 390,
        quantity: 1000,
        serviceId: 'pack_sectorial_mx',
      });
    } else {
      window.open(SITE_CONFIG.getWhatsappUrl(`Quiero cotizar interacciones y reseñas para mi negocio de ${activeDemo.title}`), '_blank');
    }
  };

  // If user collapsed the bar to enjoy full immersion
  if (isCollapsed) {
    return (
      <div className="fixed top-3 right-3 z-[90] flex items-center gap-2 animate-in fade-in zoom-in-90">
        <button
          onClick={() => setIsCollapsed(false)}
          className="px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-bold border border-white/20 backdrop-blur-md shadow-2xl flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <span>{activeDemo.icon}</span>
          <span className="hidden sm:inline">{activeDemo.title}</span>
          <Maximize2 className="w-3 h-3 text-[#00F59B]" />
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Controlador de demostración interactiva"
      className="sticky top-0 z-[80] w-full bg-[#080B13]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all"
    >
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Current Sector & Switcher */}
        <div className="flex items-center gap-2">
          {onBackToAgency && (
            <button
              onClick={onBackToAgency}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-all border border-white/10"
              title="Volver a la agencia principal"
            >
              ← <span className="hidden sm:inline">Agencia</span>
            </button>
          )}

          {/* Demo Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsDemoMenuOpen(!isDemoMenuOpen)}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center gap-2 border border-white/15 transition-all shadow-sm"
            >
              <span className="text-sm">{activeDemo.icon}</span>
              <span className="font-extrabold">{activeDemo.title}</span>
              <span className="text-[10px] bg-[#00F59B]/20 text-[#00F59B] px-1.5 py-0.5 rounded font-mono font-bold">
                11 Demos
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isDemoMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 bg-[#0C101D] border border-white/15 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 max-h-[75vh] overflow-y-auto scrollbar-thin">
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10 mb-1 flex items-center justify-between">
                  <span>Seleccionar Nicho Mexicano</span>
                  <span className="text-[#00F59B]">11 Plantillas</span>
                </div>
                {DEMO_LIST.map((demo) => (
                  <button
                    key={demo.key}
                    onClick={() => {
                      if (onSwitchDemo) onSwitchDemo(demo.key);
                      setIsDemoMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      demo.key === currentKey
                        ? 'bg-[#00F59B] text-black font-extrabold shadow'
                        : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{demo.icon}</span>
                      <div>
                        <div className="font-bold">{demo.title}</div>
                        <div className={`text-[10px] ${demo.key === currentKey ? 'text-black/80' : 'text-slate-400'}`}>
                          {demo.sector}
                        </div>
                      </div>
                    </div>
                    {demo.key === currentKey && <Check className="w-4 h-4 text-black stroke-[3]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick indicator if customized */}
          {isCustomized && (
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30 animate-pulse">
              ✨ Con tu Marca
            </span>
          )}
        </div>

        {/* Center / Right: Quick Live Brand Customizer Toggle + CTAs + Minimize */}
        <div className="flex items-center gap-2">
          {/* Toggle Brand Customizer drawer */}
          <button
            onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isCustomizerOpen
                ? 'bg-[#FF005C] text-white border-[#FF005C]'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/15'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00F59B]" />
            <span className="hidden sm:inline">Pruébala con tu Marca</span>
            <span className="sm:hidden">Personalizar</span>
          </button>

          {/* Buy Interacciones for this sector */}
          <button
            onClick={handleBuyInteractions}
            className="hidden lg:flex px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Paquete {activeDemo.sector}</span>
          </button>

          {/* Hot CTA: Buy this customized landing */}
          <button
            onClick={handleBuyLanding}
            className="px-3 py-1 rounded-lg bg-[#00F59B] hover:bg-[#00d885] text-black text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#00F59B]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>🔥 Adquirir Landing</span>
            <span className="hidden md:inline text-[10px] bg-black/20 px-1 py-0.5 rounded font-mono font-bold">48h</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Collapse button */}
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="Minimizar barra para ver pantalla completa"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Live Customizer Panel */}
      {isCustomizerOpen && (
        <div className="border-t border-white/10 bg-[#090D18] px-4 sm:px-6 py-4 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00F59B]" />
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                  Live Brand Customizer: Reemplazo en Tiempo Real
                </h4>
              </div>
              <button
                onClick={() => setIsCustomizerOpen(false)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Cerrar personalizador"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Business Name */}
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                  Nombre de tu Negocio
                </label>
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => updateCustomizer('businessName', e.target.value)}
                    placeholder="Ej: Taquería Los Compadres"
                    className="w-full bg-[#121624] border border-white/15 focus:border-[#00F59B] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* City / Location */}
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                  Tu Ciudad o Colonia
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => updateCustomizer('city', e.target.value)}
                    placeholder="Ej: Guadalajara, Jal. / Polanco"
                    className="w-full bg-[#121624] border border-white/15 focus:border-[#00F59B] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                  Tu WhatsApp (10 dígitos)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => updateCustomizer('phone', e.target.value)}
                      placeholder="55 1234 5678"
                      className="w-full bg-[#121624] border border-white/15 focus:border-[#00F59B] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                  <button
                    onClick={handleApply}
                    className="px-4 py-2 bg-[#00F59B] hover:bg-[#00d885] text-black text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 shadow"
                  >
                    {savedSuccess ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Zap className="w-3.5 h-3.5" />}
                    <span>{savedSuccess ? '¡Listo!' : 'Aplicar'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between pt-3 mt-3 border-t border-white/10 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                Los textos en el Hero, botones de WhatsApp y cotizadores se actualizan automáticamente en pantalla.
              </span>
              <button
                onClick={handleBuyLanding}
                className="text-[#00F59B] hover:underline font-bold flex items-center gap-1 mt-1 sm:mt-0"
              >
                Apartar desarrollo para este negocio por $3,900 MXN →
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
