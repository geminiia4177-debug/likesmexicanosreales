import React, { useState, Suspense, lazy } from 'react';
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Filter,
  Check,
  Building2,
  MapPin,
  Phone,
  ArrowRight,
  Zap,
  ShoppingBag
} from 'lucide-react';
import LandingSkeleton from './LandingSkeleton';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import { SITE_CONFIG } from '../config/siteConfig';

// Lazy-loaded dynamic imports for all 11 landing pages
const TequilaLanding = lazy(() => import('../landings/TequilaLanding'));
const TacosLanding = lazy(() => import('../landings/TacosLanding'));
const TulumRealEstateLanding = lazy(() => import('../landings/TulumRealEstateLanding'));
const DentalPolancoLanding = lazy(() => import('../landings/DentalPolancoLanding'));
const GymAztecaLanding = lazy(() => import('../landings/GymAztecaLanding'));
const BarberiaLanding = lazy(() => import('../landings/BarberiaLanding'));
const EsteticaSalonLanding = lazy(() => import('../landings/EsteticaSalonLanding'));
const CalzadoTiendaLanding = lazy(() => import('../landings/CalzadoTiendaLanding'));
const TallerMecanicoLanding = lazy(() => import('../landings/TallerMecanicoLanding'));
const CafeArtesanalLanding = lazy(() => import('../landings/CafeArtesanalLanding'));
const VeterinariaLanding = lazy(() => import('../landings/VeterinariaLanding'));

export const TEMPLATES = [
  {
    id: 1,
    key: 'tequila',
    title: 'Hacienda El Alma de Agave',
    sector: 'E-Commerce & Bebidas Artesanales',
    location: 'Jalisco & Oaxaca',
    category: 'E-Commerce Gourmet',
    filterTag: 'comercio',
    image: '/images/tequila.webp',
    component: TequilaLanding,
    highlight: 'Checkout integrado con OXXO Pay y SPEI, notas de cata interactivas y catálogo de añejos.',
    metrics: { conversion: '9.4%', loadTime: '0.4s', target: 'Nacional & Exportación' },
  },
  {
    id: 2,
    key: 'tacos',
    title: 'Taquería El Pastor Sagrado',
    sector: 'Restaurante & Taquizas para Eventos',
    location: 'Roma Norte & Condesa, CDMX',
    category: 'Gastronomía & Delivery',
    filterTag: 'gastronomia',
    image: '/images/tacos.webp',
    component: TacosLanding,
    highlight: 'Menú interactivo con pestañas, calculadora de taquizas para eventos y reservación directa vía WhatsApp.',
    metrics: { conversion: '12.8%', loadTime: '0.4s', target: 'CDMX & Zona Metropolitana' },
  },
  {
    id: 3,
    key: 'barberia',
    title: 'El Barbero del Centro',
    sector: 'Barbería Clásica & Cuidado Masculino',
    location: 'Centro Histórico & Roma Norte, CDMX',
    category: 'Cuidado & Barbería',
    filterTag: 'belleza',
    image: '/images/barberia.webp',
    component: BarberiaLanding,
    highlight: 'Agendador de turno con elección de barbero, catálogo de pomadas mexicanas y confirmación WhatsApp.',
    metrics: { conversion: '13.2%', loadTime: '0.4s', target: 'Caballeros CDMX' },
  },
  {
    id: 4,
    key: 'estetica',
    title: 'Lumina Polanco Beauty & Spa',
    sector: 'Salón de Belleza, Uñas & Estética',
    location: 'Polanco & Condesa, CDMX',
    category: 'Estética & Nail Bar',
    filterTag: 'belleza',
    image: '/images/estetica.webp',
    component: EsteticaSalonLanding,
    highlight: 'Cotizador dinámico de cambio de look en vivo (Balayage, Gelish, Pestañas 1x1) y cita sin anticipo.',
    metrics: { conversion: '11.8%', loadTime: '0.4s', target: 'Mujeres & Moda CDMX' },
  },
  {
    id: 5,
    key: 'calzado',
    title: 'León Piel & Sneakers',
    sector: 'Tienda Online de Calzado & Streetwear',
    location: 'León, Guanajuato',
    category: 'E-Commerce Moda',
    filterTag: 'comercio',
    image: '/images/calzado.webp',
    component: CalzadoTiendaLanding,
    highlight: 'Selector de tallas mexicanas (MX), carrito de compras con OXXO y SPEI, y envíos por FedEx.',
    metrics: { conversion: '8.9%', loadTime: '0.5s', target: 'Todo México' },
  },
  {
    id: 6,
    key: 'taller',
    title: 'CDMX Auto Werks Garage',
    sector: 'Taller Mecánico Especializado & Detailing',
    location: 'Del Valle & Santa Fe, CDMX',
    category: 'Servicios Automotrices',
    filterTag: 'servicios',
    image: '/images/taller.webp',
    component: TallerMecanicoLanding,
    highlight: 'Cotizador por tipo de vehículo (Sedán, SUV, Pickup) para afinación, frenos y scanner OBD2.',
    metrics: { conversion: '10.4%', loadTime: '0.4s', target: 'Automovilistas CDMX/EdoMex' },
  },
  {
    id: 7,
    key: 'cafe',
    title: 'Café Corazón Artesanal',
    sector: 'Cafetería de Especialidad & Panadería',
    location: 'Coyoacán & San Ángel, CDMX',
    category: 'Cafetería & Panadería',
    filterTag: 'gastronomia',
    image: '/images/cafe.webp',
    component: CafeArtesanalLanding,
    highlight: 'Venta de café en grano con molienda personalizada, conchas de masa madre y pedido rápido a domicilio.',
    metrics: { conversion: '14.5%', loadTime: '0.4s', target: 'Coyoacán & CDMX Sur' },
  },
  {
    id: 8,
    key: 'veterinaria',
    title: 'Mascota Feliz Hospital & Pet Spa',
    sector: 'Clínica Veterinaria, Pet Spa & 24H',
    location: 'Condesa & San Jerónimo, CDMX',
    category: 'Salud & Mascotas',
    filterTag: 'salud',
    image: '/images/veterinaria.webp',
    component: VeterinariaLanding,
    highlight: 'Cotizador por tamaño de mascota (chico, mediano, grande), agendador de baño y botón de urgencias 24/7.',
    metrics: { conversion: '12.1%', loadTime: '0.4s', target: 'Pet Lovers México' },
  },
  {
    id: 9,
    key: 'dental',
    title: 'Oralé Studio Polanco',
    sector: 'Clínica Dental & Diseño de Sonrisa',
    location: 'Polanco Masaryk, CDMX',
    category: 'Salud & Odontología',
    filterTag: 'salud',
    image: '/images/dental.webp',
    component: DentalPolancoLanding,
    highlight: 'Slider interactivo Antes/Después de carillas, catálogo 3D de tratamientos y concierge de turismo médico.',
    metrics: { conversion: '11.5%', loadTime: '0.5s', target: 'Pacientes de Alto Nivel' },
  },
  {
    id: 10,
    key: 'tulum',
    title: "K'AAN Tulum Estates",
    sector: 'Bienes Raíces & Luxury Condos',
    location: 'Riviera Maya, Quintana Roo',
    category: 'Inversión & Real Estate',
    filterTag: 'inmobiliaria',
    image: '/images/tulum.webp',
    component: TulumRealEstateLanding,
    highlight: 'Calculadora dinámica de ROI y plusvalía en dólares/pesos, amenidades biofílicas y descarga de dossier AMPI.',
    metrics: { conversion: '7.2%', loadTime: '0.5s', target: 'Inversionistas MX & Extranjeros' },
  },
  {
    id: 11,
    key: 'gym',
    title: 'Volcán Azteca High Performance',
    sector: 'Fitness Club & Alto Rendimiento',
    location: 'CDMX & Monterrey',
    category: 'Deportes & Membresías',
    filterTag: 'servicios',
    image: '/images/gym.webp',
    component: GymAztecaLanding,
    highlight: 'Selector de membresías sin plazos forzosos, generador de pase VIP de 1 día gratis y facturación CFDI.',
    metrics: { conversion: '14.1%', loadTime: '0.4s', target: 'Atletas & Wellness MX' },
  },
];

export default function ShowcaseModal({ isOpen, initialTemplateKey, onClose, onOpenFullscreen }) {
  const [activeKey, setActiveKey] = useState(initialTemplateKey || 'tequila');
  const [device, setDevice] = useState('desktop'); // desktop, tablet, mobile
  const [filter, setFilter] = useState('todos');
  const [showCustomizerBar, setShowCustomizerBar] = useState(false);
  const [customizerSaved, setCustomizerSaved] = useState(false);

  const { businessName, city, phone, updateCustomizer, submitLead } = useLandingCustomizer();

  if (!isOpen) return null;

  const currentTemplate = TEMPLATES.find((t) => t.key === activeKey) || TEMPLATES[0];
  const ActiveComponent = currentTemplate.component;

  const deviceStyles = {
    desktop: 'w-full h-full rounded-2xl',
    tablet: 'w-[768px] max-w-full h-[90vh] rounded-[32px] border-[10px] border-slate-800 shadow-2xl overflow-hidden my-auto',
    mobile: 'w-[390px] max-w-full h-[844px] max-h-[90vh] rounded-[44px] border-[12px] border-slate-900 shadow-2xl overflow-hidden my-auto',
  };

  const handleApplyCustomizer = async () => {
    setCustomizerSaved(true);
    await submitLead(activeKey);
    setTimeout(() => setCustomizerSaved(false), 2500);
  };

  const handleBuyLanding = async () => {
    await submitLead(activeKey);
    const target = businessName ? ` para "${businessName}"` : '';
    const msg = `¡Hola Likes Mexicanos! Me interesa adquirir el diseño "${currentTemplate.title}"${target} para mi negocio por $2,490 MXN. ¿Qué información necesitan para comenzar?`;
    window.open(SITE_CONFIG.getWhatsappUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-2xl">
      {/* Top Bar / Showcase Controller */}
      <div className="bg-[#090D16] border-b border-white/10 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 z-20">
        {/* Left: Branding & Current Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00F59B] to-teal-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-[#00F59B]/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-sm sm:text-base tracking-tight">{currentTemplate.title}</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30">
                {currentTemplate.category}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block">{currentTemplate.location} • Hecha para el mercado mexicano</span>
          </div>
        </div>

        {/* Center: Device Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setDevice('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                device === 'desktop' ? 'bg-[#00F59B] text-black font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                device === 'tablet' ? 'bg-[#00F59B] text-black font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" /> Tablet (768px)
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                device === 'mobile' ? 'bg-[#00F59B] text-black font-bold shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Celular (iPhone 16 - 390px)
            </button>
          </div>

          <button
            onClick={() => setShowCustomizerBar(!showCustomizerBar)}
            className={`hidden lg:flex px-3 py-1.5 rounded-xl text-xs font-extrabold items-center gap-1.5 transition-all border ${
              showCustomizerBar
                ? 'bg-[#00F59B] text-black border-[#00F59B] shadow-md shadow-[#00F59B]/20'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/15'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalizar Demo</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Direct purchase CTA */}
          <button
            onClick={handleBuyLanding}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF005C] to-[#7928CA] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#FF005C]/25 transition-transform hover:scale-105 active:scale-95 will-change-transform"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Quiero este diseño para mi negocio ($2,490 MXN)</span>
          </button>

          {onOpenFullscreen && (
            <button
              onClick={() => onOpenFullscreen(currentTemplate.key)}
              className="hidden sm:flex px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Pantalla Completa
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Cerrar visor"
            className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Simulated Browser Navigation Bar */}
      <div className="bg-[#070B14] border-b border-white/10 px-4 py-1.5 flex items-center justify-between text-xs font-mono select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 bg-black/50 border border-white/10 rounded-md px-3 py-0.5 text-slate-300 text-[11px]">
            <span className="text-[#00F59B]">🔒</span>
            <span className="text-slate-400">https://likesmexicanos.com/demo/</span>
            <span className="text-white font-bold">{currentTemplate.key}</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-slate-400 text-[11px]">
          <span className="text-[#00F59B] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Certificado SSL Seguro
          </span>
          <span className="text-slate-500">|</span>
          <span>{device === 'mobile' ? '📱 Vista Móvil (390px)' : device === 'tablet' ? '📱 Vista Tablet (768px)' : '💻 Vista Completa (100%)'}</span>
        </div>
      </div>

      {/* Expandable Live Customizer Bar */}
      {showCustomizerBar && (
        <div className="bg-[#0C1120] border-b border-emerald-500/30 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 z-20 animate-in slide-in-from-top-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 flex-1">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <input
                type="text"
                placeholder="Nombre de tu Negocio"
                value={businessName}
                onChange={(e) => updateCustomizer('businessName', e.target.value)}
                className="bg-[#141A2E] border border-white/15 focus:border-[#00F59B] text-white text-xs px-3 py-1.5 rounded-lg outline-none w-44 sm:w-52"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <input
                type="text"
                placeholder="Tu Ciudad / Colonia"
                value={city}
                onChange={(e) => updateCustomizer('city', e.target.value)}
                className="bg-[#141A2E] border border-white/15 focus:border-[#00F59B] text-white text-xs px-3 py-1.5 rounded-lg outline-none w-36 sm:w-44"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              <input
                type="tel"
                placeholder="Tu WhatsApp (10 dígitos)"
                value={phone}
                onChange={(e) => updateCustomizer('phone', e.target.value)}
                className="bg-[#141A2E] border border-white/15 focus:border-[#00F59B] text-white text-xs px-3 py-1.5 rounded-lg outline-none w-36 sm:w-44"
              />
            </div>

            <button
              onClick={handleApplyCustomizer}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black flex items-center gap-1 transition-all"
            >
              {customizerSaved ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Zap className="w-3.5 h-3.5" />}
              <span>{customizerSaved ? '¡Aplicado!' : 'Actualizar'}</span>
            </button>
          </div>

          <button
            onClick={handleBuyLanding}
            className="px-4 py-1.5 rounded-xl bg-[#00F59B] hover:bg-[#00d885] text-black text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#00F59B]/25 transition-all hover:scale-105"
          >
            <span>🔥 Comprar esta Landing ya personalizada {businessName ? `para ${businessName}` : ''} — Entrega 48h</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Tabs for fast switching between ALL 11 Mexican Landing Pages */}
      <div className="bg-[#050811] border-b border-white/5 px-4 sm:px-6 py-2 overflow-x-auto flex items-center gap-2 scrollbar-none z-10">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mr-2 flex-shrink-0">
          🇲🇽 {TEMPLATES.length} Diseños Mexicanos:
        </span>
        {TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.key}
            onClick={() => setActiveKey(tmpl.key)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 flex-shrink-0 ${
              activeKey === tmpl.key
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {tmpl.title}
          </button>
        ))}
      </div>

      {/* Preview Container with React.Suspense & LandingSkeleton */}
      <div className="flex-1 bg-[#030508] p-2 sm:p-4 overflow-hidden flex items-center justify-center relative">
        <div className={`${deviceStyles[device]} bg-[#050811] overflow-y-auto relative transition-all duration-300`}>
          <Suspense fallback={<LandingSkeleton title={currentTemplate.title} />}>
            <ActiveComponent onBack={onClose} />
          </Suspense>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="bg-[#090D16] border-t border-white/10 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Funcional &amp; Lista para Producción
          </span>
          <span className="hidden sm:inline">⚡ Tiempo de carga: {currentTemplate.metrics.loadTime}</span>
          <span className="hidden md:inline">📈 Tasa de conversión estimada: {currentTemplate.metrics.conversion}</span>
        </div>
        <div className="text-right font-medium text-slate-300">
          Desarrollado a medida por <span className="text-emerald-400 font-bold">Likes Mexicanos Reales</span>
        </div>
      </div>
    </div>
  );
}
