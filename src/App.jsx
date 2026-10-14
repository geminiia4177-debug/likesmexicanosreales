import React, { useState, useEffect, useRef } from 'react';
import {
  Globe, Monitor, CheckCircle, ChevronLeft, ChevronRight, ChevronDown,
  Sparkles, Zap, ShieldCheck, TrendingUp,
  Award, ExternalLink, Play, Menu, X, ArrowUp, ArrowUpRight, Star,
  Headphones, Lock, Rocket, MessageSquare, CreditCard, Check, Eye, Smartphone,
  Code, Laptop, FileText, CheckCircle2, ShoppingBag, Database, ArrowRight, Share2, Layers
} from 'lucide-react';
import ShowcaseModal, { TEMPLATES } from './components/ShowcaseModal';
import ServiceCalculator from './components/ServiceCalculator';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BentoGrid from './components/BentoGrid';
import BeforeAfterComparison from './components/BeforeAfterComparison';
import ResellerVIPSection from './components/ResellerVIPSection';
import OrderTrackingModal from './components/OrderTrackingModal';
import ExpressCheckoutModal from './components/ExpressCheckoutModal';
import SocialProofToast from './components/SocialProofToast';
import LandingSkeleton from './components/LandingSkeleton';
import ProfileAuditWidget from './components/ProfileAuditWidget';
import { CartProvider } from './context/CartContext';
import { LandingCustomizerProvider } from './context/LandingCustomizerContext';
import { useDynamicSEO } from './hooks/useDynamicSEO';
import { SITE_CONFIG } from './config/siteConfig';

// Dynamic Code-Splitting of all 11 Mexican Landings
const TequilaLanding = React.lazy(() => import('./landings/TequilaLanding'));
const TacosLanding = React.lazy(() => import('./landings/TacosLanding'));
const TulumRealEstateLanding = React.lazy(() => import('./landings/TulumRealEstateLanding'));
const DentalPolancoLanding = React.lazy(() => import('./landings/DentalPolancoLanding'));
const GymAztecaLanding = React.lazy(() => import('./landings/GymAztecaLanding'));
const BarberiaLanding = React.lazy(() => import('./landings/BarberiaLanding'));
const EsteticaSalonLanding = React.lazy(() => import('./landings/EsteticaSalonLanding'));
const CalzadoTiendaLanding = React.lazy(() => import('./landings/CalzadoTiendaLanding'));
const TallerMecanicoLanding = React.lazy(() => import('./landings/TallerMecanicoLanding'));
const CafeArtesanalLanding = React.lazy(() => import('./landings/CafeArtesanalLanding'));
const VeterinariaLanding = React.lazy(() => import('./landings/VeterinariaLanding'));

/* ============ ÍCONOS DE REDES SOCIALES ============ */
const Svg = ({ className = '', children }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const Facebook = (p) => <Svg {...p}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Svg>;
const Instagram = (p) => <Svg {...p}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></Svg>;
const TikTok = (p) => <Svg {...p}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></Svg>;
const WhatsAppIcon = (p) => (
  <svg className={p.className || 'w-5 h-5'} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/* ============ DATOS GENERALES MÉXICO ============ */
const STATS = [
  { value: 16800, suffix: '+', label: 'Campañas Entregadas en México' },
  { value: 99.4, suffix: '%', label: 'Retención y Autenticidad' },
  { value: 32, suffix: ' Estados', label: 'Cobertura en la República' },
  { value: 24, suffix: '/7', label: 'Soporte Activo por WhatsApp' },
];

const TICKER = [
  ['🇲🇽 LIKES MEXICANOS', '100% REALES'],
  ['📍 SEGUIDORES GEOLOCALIZADOS', 'CDMX • MTY • GDL'],
  ['⭐ RESEÑAS GOOGLE MAPS', 'NIVEL LOCAL GUIDE'],
  ['🏪 OXXO PAY', 'PAGO EN EFECTIVO'],
  ['⚡ TRANSFERENCIA SPEI', 'ACREDITACIÓN INMEDIATA'],
  ['💻 SISTEMAS POR ENCARGO', 'DESARROLLO A MEDIDA'],
  ['🎨 CANVA PRO EDU', 'ACCESO TOTAL $99 MXN'],
  ['🤖 GEMINI IA PRO', 'GOOGLE ADVANCED $149 MXN'],
  ['🛡️ GARANTÍA DE REPOSICIÓN', '30 DÍAS SIN CAÍDAS'],
  ['🧾 FACTURACIÓN FISCAL', 'CFDI 4.0 DISPONIBLE'],
];

const mxServices = [
  {
    id: 1,
    title: 'Likes Mexicanos Reales',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    desc: 'Interacciones de perfiles activos con nombres, fotos y actividad verificada en México.',
    tag: 'Más Pedido 🇲🇽',
    price: 'Desde $149 MXN',
  },
  {
    id: 2,
    title: 'Seguidores Mexicanos',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
    desc: 'Audiencia de alta calidad geolocalizada en las principales ciudades de México.',
    tag: 'Alta Retención',
    price: 'Desde $280 MXN',
  },
  {
    id: 3,
    title: 'Seguidores de Facebook MX',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    desc: 'Crecimiento de Fanpage con perfiles mexicanos activos para generar confianza comercial.',
    tag: 'Facebook Pro',
    price: 'Desde $290 MXN',
  },
  {
    id: 4,
    title: 'Reseñas Google Maps 5★',
    image: 'https://images.unsplash.com/photo-1528297506728-9533d2ac3fa4?auto=format&fit=crop&w=800&q=80',
    desc: 'Impulsa tu negocio local en el mapa con opiniones de perfiles Local Guide mexicanos.',
    tag: 'Negocios Locales',
    price: 'Desde $390 MXN',
  },
  {
    id: 5,
    title: 'Comentarios Personalizados MX',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    desc: 'Opiniones orgánicas en español mexicano con tono natural y adaptadas a tu marca.',
    tag: 'Conversación Real',
    price: 'Desde $190 MXN',
  },
  {
    id: 6,
    title: 'TikTok Viral Booster MX',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    desc: 'Vistas, guardados y likes sincronizados para activar el algoritmo de TikTok en México.',
    tag: 'Tendencia',
    price: 'Desde $120 MXN',
  },
];

/* ============ REFERENCIAS REALES & PRUEBAS DE TRABAJO ============ */
const REFERENCES = [
  {
    id: 1,
    client: 'Ing. Fernando Morales • Taller Mecánico & Detailing',
    city: 'Naucalpan, EdoMex / CDMX',
    service: '25 Reseñas Google Maps 5★',
    payment: 'OXXO Pay ($1,590 MXN)',
    chatSnippet: 'Hermano, ya se reflejaron las reseñas en Maps. Los perfiles se ven 100% reales con fotos mexicanas. Subimos al primer lugar de la zona, muchas gracias.',
    metric: 'Posición #1 en Google Maps Local',
  },
  {
    id: 2,
    client: 'Mariana Elizondo • Joyería & Moda',
    city: 'San Pedro Garza García, MTY',
    service: '5,000 Seguidores Mexicanos IG',
    payment: 'Transferencia SPEI BBVA ($1,990 MXN)',
    chatSnippet: 'Pagué por SPEI a las 4:00 PM y a las 4:30 PM ya empezó a subir la cuenta de forma progresiva. Ninguna caída en 2 semanas, excelente calidad.',
    metric: 'Engagement orgánico +180%',
  },
  {
    id: 3,
    client: 'Chef Alejandro Ruiz • Taquería Gourmet',
    city: 'Roma Norte, CDMX',
    service: 'Landing Page + Likes FB & IG',
    payment: 'Mercado Pago ($4,800 MXN)',
    chatSnippet: 'La landing page quedó hermosa y carga rapidísimo en celular. El fin de semana cerramos 4 taquizas para fiestas directo con el botón de WhatsApp.',
    metric: '4 Contratos de Taquizas en 3 días',
  },
  {
    id: 4,
    client: 'Dra. Patricia Solís • Cirugía Estética',
    city: 'Guadalajara, Jalisco',
    service: 'Comentarios MX + Factura CFDI',
    payment: 'SPEI Banorte ($3,200 MXN con Factura)',
    chatSnippet: 'Nos enviaron la factura fiscal CFDI 4.0 el mismo día con nuestro RFC. Los comentarios en español neutro mexicano dieron muchísima confianza a las pacientes.',
    metric: 'CFDI 4.0 Deducible al 100%',
  },
];

/* ============ LICENCIAS SOFTWARE & IA ============ */
const SOFTWARE_PLANS = [
  {
    name: 'Canva Pro Edu',
    sub: 'Diseño Gráfico Profesional sin Límites',
    price: 99,
    period: '/mes',
    accent: 'blue',
    icon: Sparkles,
    features: [
      'Acceso total a más de 100M de plantillas premium',
      'Eliminador mágico de fondos con 1 solo clic',
      'Kit de marca: sube tus fuentes, logos y paletas',
      'Redimensionamiento mágico de diseños al instante',
      '1 TB de almacenamiento en la nube',
      'Activación directa a tu correo en 5 minutos',
    ],
    cta: 'Obtener Canva Pro ($99 MXN)',
  },
  {
    name: 'Gemini 2.5 Pro / Ultra (Advanced)',
    sub: 'Google Next-Gen IA con Razonamiento Multimodal',
    price: 149,
    period: '/mes',
    accent: 'cyan',
    featured: true,
    icon: Zap,
    features: [
      'Modelo Gemini 2.5 Pro & Ultra con ventana contextual de 2M tokens',
      'Razonamiento profundo, análisis masivo de audio, video y código',
      'Redacción publicitaria, guiones virales y embudos de venta',
      'Generación y depuración de código full-stack para desarrolladores',
      'Integración nativa con Google Workspace (Docs, Gmail, Drive)',
      'Activación oficial a tu correo en 5 minutos con soporte directo',
    ],
    cta: 'Desbloquear Gemini IA ($149 MXN)',
  },
];

const FAQ = [
  ['¿Los perfiles y seguidores son realmente de México?', 'Sí. Todos nuestros paquetes están estrictamente segmentados con perfiles latinos y geolocalizados en territorio mexicano (CDMX, Guadalajara, Monterrey, Puebla, Querétaro, Mérida, etc.), con fotos auténticas y nombres reales en español.'],
  ['¿Qué métodos de pago aceptan en México?', 'Aceptamos los métodos más cómodos y seguros de México: Efectivo en cualquier tienda OXXO del país (vía OXXO Pay), Transferencia Interbancaria SPEI (BBVA, Banorte, Santander, Citibanamex, Nu, etc.), Mercado Pago y Tarjetas de Crédito/Débito Visa, Mastercard y AMEX.'],
  ['¿Puedo solicitar Factura Fiscal CFDI 4.0?', 'Por supuesto. Si tienes una empresa, marca registrada o eres persona física con actividad empresarial en México, emitimos tu factura fiscal con CFDI 4.0 con tu constancia de situación fiscal sin costo adicional.'],
  ['¿Tienen garantía de reposición si bajan los seguidores?', 'Sí, contamos con garantía de reposición gratuita de 30 días. Si detectas cualquier variación, nuestro equipo de soporte por WhatsApp te repone las interacciones de inmediato.'],
  ['¿Desarrollan sistemas a medida o solo páginas simples?', 'Desarrollamos tanto landing pages de venta rápida como sistemas complejos a medida: sistemas de cobranza, CRMs para inmobiliarias, catálogos con WhatsApp, plataformas de turnos médicos y e-commerce con facturación CFDI.'],
  ['¿Cómo entregan las suscripciones de Canva Pro y Gemini IA?', 'Tras enviar tu comprobante de pago por OXXO o SPEI, te enviamos el link de activación oficial directo a tu correo electrónico en menos de 5 minutos, listo para usar sin complicaciones.'],
];

/* ============ HOOKS ============ */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const CountUp = ({ value, suffix }) => {
  const [ref, seen] = useInView(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, start;
    const tick = (t) => {
      start = start || t;
      const p = Math.min((t - start) / 1800, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);
  return <span ref={ref}>{n.toLocaleString('es-MX')}{suffix}</span>;
};

/* ============ COMPONENTES GENERALES ============ */
const SectionTitle = ({ title, accent, text, tag = 'AUTORIDAD DIGITAL' }) => (
  <Reveal className="text-center mb-16">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-3">
      <Sparkles className="w-3.5 h-3.5" /> {tag}
    </div>
    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
      {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">{accent}</span>
    </h2>
    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">{text}</p>
  </Reveal>
);



const Ticker = () => {
  return (
    <div className="bg-[#030509] border-y border-white/10 overflow-hidden py-3.5 group select-none relative">
      <div className="flex w-max group-hover:[animation-play-state:paused]">
        {/* Track 1 */}
        <div className="flex shrink-0 animate-marquee items-center will-change-transform">
          {TICKER.map(([sym, ch], i) => (
            <div key={`t1-${i}`} className="flex items-center gap-2 px-8 text-xs sm:text-sm font-mono border-r border-white/10">
              <span className="text-slate-200 font-bold">{sym}</span>
              <span className="text-[#00F59B] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> {ch}
              </span>
            </div>
          ))}
        </div>
        {/* Track 2 (Twin clone for seamless loop without CPU repaints) */}
        <div className="flex shrink-0 animate-marquee items-center will-change-transform" aria-hidden="true">
          {TICKER.map(([sym, ch], i) => (
            <div key={`t2-${i}`} className="flex items-center gap-2 px-8 text-xs sm:text-sm font-mono border-r border-white/10">
              <span className="text-slate-200 font-bold">{sym}</span>
              <span className="text-[#00F59B] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> {ch}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatsBand = () => (
  <section className="py-16 bg-[#050811]">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 120}>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 hover:border-emerald-500/40 transition-colors">
            <div className="text-3xl sm:text-5xl font-black text-white tracking-tight tabular-nums">
              <CountUp value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-xs sm:text-sm text-slate-400 font-medium">{s.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const MexicanServices = () => (
  <section id="servicios-mx" className="py-24 bg-[#080D1A] relative border-y border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <SectionTitle
        tag="PORTAFOLIO EXCLUSIVO"
        title="Servicios de Crecimiento para"
        accent="México & Facebook"
        text="Aumenta tu reputación, visibilidad de marca y conversión con interacciones geolocalizadas sin riesgo de penalización."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mxServices.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 120}>
            <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer bg-[#0F1424] border-t border-white/20 border-x border-white/5 border-b border-black/80 hover:border-t-[#00F59B]/60 hover:shadow-[0_20px_60px_rgba(0,245,155,0.2)] hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-300 flex flex-col justify-between p-6 will-change-transform">
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#080D1A]/60 via-[#080D1A]/70 to-[#080D1A]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00F59B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/75 backdrop-blur-md border border-white/20 text-[#00F59B]">
                  {s.tag}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-[#00F59B]/20 text-[#00F59B] border border-[#00F59B]/40">
                  {s.price}
                </span>
              </div>

              <div className="relative z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{s.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{s.desc}</p>
                <a
                  href={SITE_CONFIG.getWhatsappUrl(`Hola, me interesa contratar el servicio de ${s.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00F59B] hover:text-emerald-300 transition-colors"
                >
                  <span>Cotizar por WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ============ LUGAR PARA LAS REFERENCIAS ============ */
const ReferencesSection = () => (
  <section id="referencias" className="py-24 bg-[#050811] relative border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <SectionTitle
        tag="COMPROBANTES & CONFIANZA 100%"
        title="Referencias Reales &"
        accent="Pruebas de Entrega"
        text="Casos verificados, capturas de transferencias SPEI, comprobantes de pago en tiendas OXXO y chats de satisfacción de clientes en México."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {REFERENCES.map((ref) => (
          <Reveal key={ref.id}>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0B1222] via-[#080D1A] to-[#0A1020] border border-emerald-500/20 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {ref.client}
                    </h4>
                    <span className="text-xs text-slate-400 block mt-0.5">📍 {ref.city}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {ref.payment}
                    </span>
                  </div>
                </div>

                {/* Simulated WhatsApp Chat Snippet */}
                <div className="p-4 rounded-2xl bg-[#09101E] border border-white/5 mb-4 relative">
                  <div className="flex items-center gap-2 mb-2 text-[11px] text-emerald-400 font-semibold">
                    <MessageSquare className="w-3.5 h-3.5" /> Mensaje verificado de WhatsApp
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed italic">
                    "{ref.chatSnippet}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Servicio: <strong className="text-white">{ref.service}</strong></span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {ref.metric}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="text-center">
        <a
          href={SITE_CONFIG.getWhatsappUrl('Hola Likes Mexicanos, quiero ver más referencias y comprobantes de entrega en México.')}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-[#00F59B]/30 hover:border-[#00F59B] transition-all shadow-lg"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#00F59B]" />
          <span>Solicitar más Referencias en Vivo por WhatsApp 🇲🇽</span>
        </a>
      </div>
    </div>
  </section>
);

/* ============ SISTEMAS & PÁGINAS POR ENCARGO ============ */
const CustomSystemsSection = () => (
  <section id="sistemas-encargo" className="py-24 bg-[#080D1A] relative border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <SectionTitle
        tag="DESARROLLO DE SOFTWARE & APLICACIONES"
        title="Páginas Web y Sistemas a Medida"
        accent="por Encargo"
        text="Construimos la plataforma digital que tu negocio necesita en México: CRMs, portales inmobiliarios, plataformas de cobranza, catálogos digitales con WhatsApp y tiendas e-commerce."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          {
            icon: Laptop,
            title: 'Landing Pages de Ultra Alta Conversión',
            desc: 'Páginas de aterrizaje diseñadas en 48 horas enfocadas en captar prospectos con diseño vanguardista, responsive y botón directo a WhatsApp.',
            time: 'Entrega: 2 a 4 días',
            price: 'Desde $2,490 MXN',
          },
          {
            icon: Database,
            title: 'Sistemas Web & CRMs a Medida',
            desc: 'Software de administración de clientes, control de inventario, turnos médicos/citas y cobranza con facturación electrónica CFDI 4.0.',
            time: 'Entrega: 1 a 3 semanas',
            price: 'Desde $5,800 MXN',
          },
          {
            icon: ShoppingBag,
            title: 'E-Commerce con Pagos Mexicanos',
            desc: 'Tiendas online con carrito interactivo, cálculo de envíos nacionales (FedEx/Estafeta) y pasarelas oficiales: OXXO Pay, SPEI y Mercado Pago.',
            time: 'Entrega: 5 a 10 días',
            price: 'Desde $4,200 MXN',
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={i} delay={i * 120}>
              <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between h-full group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block">{item.time}</span>
                    <span className="text-emerald-400 font-bold text-sm">{item.price}</span>
                  </div>
                  <a
                    href={SITE_CONFIG.getWhatsappUrl(`Hola, me interesa cotizar un proyecto de ${item.title} por encargo.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#00F59B]/10 hover:bg-[#00F59B] text-[#00F59B] hover:text-black font-bold transition-all"
                  >
                    Cotizar Sistema →
                  </a>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ============ COVERFLOW CAROUSEL & CATÁLOGO INDEPENDIENTE (11 LANDINGS) ============ */
const CoverflowCarousel = ({ onOpenShowcase, onOpenFullscreen }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = TEMPLATES.length;

  const next = () => setActive((p) => (p + 1) % n);
  const prev = () => setActive((p) => (p - 1 + n) % n);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const openInNewTab = (key) => {
    window.open(`/?landing=${key}`, '_blank');
  };

  return (
    <section id="web-design" className="py-32 bg-[#050811] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle
          tag="PÁGINAS INDEPENDIENTES PARA MÉXICO"
          title="Exhibición de Landing Pages"
          accent="en Vivo (11 Diseños)"
          text="Sitios web independientes listos para usar en los sectores más populares de México. Haz clic para probar en el visor o abrirlas en una pestaña independiente."
        />

        {/* 3D Coverflow Container */}
        <div
          className="relative w-full h-[480px] md:h-[580px] flex justify-center items-center"
          style={{ perspective: '1200px' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {TEMPLATES.map((t, index) => {
            let offset = index - active;
            if (offset < -2) offset += n;
            if (offset > 2) offset -= n;
            const abs = Math.abs(offset);
            
            // Windowing / Virtualization: only render 5 cards in DOM instead of 11
            if (abs > 2) return null;

            return (
              <div
                key={t.id}
                className="absolute top-1/2 left-1/2 w-[88%] max-w-[740px] h-full max-h-[440px] md:max-h-[530px] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer will-change-transform"
                style={{
                  transform: `translate(-50%, -50%) translateX(${offset * 48}%) translateZ(${abs * -150}px) rotateY(${offset * -24}deg) scale(${1 - abs * 0.1})`,
                  opacity: 1 - abs * 0.22,
                  zIndex: 20 - abs,
                  pointerEvents: 'auto',
                }}
                onClick={() => setActive(index)}
              >
                <div
                  className={`w-full h-full rounded-3xl overflow-hidden bg-[#090E1C] border group relative flex flex-col transition-[border-color,box-shadow] duration-500 ${
                    abs === 0
                      ? 'border-[#00F59B]/60 shadow-[0_20px_80px_rgba(0,245,155,0.25)]'
                      : 'border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  <div className="relative w-full h-4/5 overflow-hidden">
                    <img
                      src={t.image}
                      alt={t.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/75 border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#00F59B]" />
                      {t.location}
                    </div>

                    {abs === 0 && (
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 text-center">
                        <span className="text-white text-xs font-semibold max-w-sm">{t.highlight}</span>
                        <div className="flex flex-wrap justify-center gap-2.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenShowcase(t.key);
                            }}
                            className="px-4 py-2.5 bg-[#00F59B] hover:bg-[#00d885] text-slate-950 font-black text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-[#00F59B]/30 will-change-transform"
                          >
                            <Monitor className="w-4 h-4" /> Probar Demo Interactiva
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openInNewTab(t.key);
                            }}
                            className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 transition-transform hover:scale-105 will-change-transform"
                          >
                            <ExternalLink className="w-4 h-4" /> Abrir Página Independiente ↗
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="h-1/5 bg-[#090E1C] border-t border-white/10 p-4 md:p-6 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#00F59B] block">{t.category}</span>
                      <h3 className="text-lg md:text-xl font-black text-white leading-tight">{t.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openInNewTab(t.key);
                        }}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                        title="Abrir como página independiente en nueva pestaña"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenShowcase(t.key);
                        }}
                        className="p-2.5 rounded-xl bg-[#00F59B]/10 hover:bg-[#00F59B] text-[#00F59B] hover:text-black transition-colors"
                        title="Abrir visor modal"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="p-4 rounded-full bg-[#0D1528] hover:bg-emerald-500 hover:text-black active:scale-95 text-white transition-all border border-white/10 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-1.5 max-w-xs overflow-x-auto py-2">
            {TEMPLATES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Ir a ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="p-4 rounded-full bg-[#0D1528] hover:bg-emerald-500 hover:text-black active:scale-95 text-white transition-all border border-white/10 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ============ LICENCIAS: CANVA PRO EDU & GEMINI IA PRO ============ */
const Subscriptions = () => {
  return (
    <section id="suscripciones" className="py-24 bg-[#080D1A] relative border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          tag="HERRAMIENTAS OFICIALES"
          title="Licencias Premium &"
          accent="Suscripciones de IA"
          text="Potencia tu marca y acelera tu flujo de trabajo con las mejores plataformas digitales a precios accesibles en Pesos Mexicanos."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SOFTWARE_PLANS.map((p) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.name}>
                <div className={`relative group rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent hover:from-emerald-500/40 hover:to-teal-500/40 hover:-translate-y-2 transition-all duration-500 h-full`}>
                  {p.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1 rounded-full text-xs font-black bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-current" /> Recomendado por Profesionales
                    </span>
                  )}
                  <div className="relative bg-[#070B14] rounded-3xl p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{p.name}</h3>
                          <span className="text-xs text-slate-400">{p.sub}</span>
                        </div>
                      </div>

                      <div className="mb-6 flex items-baseline gap-1">
                        <span className="text-5xl font-black text-white tracking-tighter">${p.price}</span>
                        <span className="text-emerald-400 font-bold text-sm ml-1">MXN {p.period}</span>
                      </div>

                      <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-slate-300">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={SITE_CONFIG.getWhatsappUrl(`Hola Likes Mexicanos, quiero adquirir la licencia de ${p.name} por $${p.price} MXN.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00F59B] to-teal-500 hover:from-[#00F59B]/90 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider text-center block transition-all shadow-lg shadow-[#00F59B]/25"
                    >
                      {p.cta}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ============ PAYMENT METHODS (MERCADO MEXICANO) ============ */
const PaymentMethodsBand = () => (
  <section id="pagos" className="py-20 bg-[#050811] border-b border-white/5">
    <div className="max-w-6xl mx-auto px-6">
      <SectionTitle
        tag="MÁXIMA CONFIANZA"
        title="Métodos de Pago Seguros en"
        accent="México"
        text="Realiza tu pago en moneda local (MXN) con los canales más confiables de la República Mexicana."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-xl font-black">
            🏪
          </div>
          <h4 className="text-lg font-bold text-white">OXXO Pay</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Genera tu código de barras y paga en efectivo en cualquiera de los más de 20,000 OXXO en todo México.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-black">
            ⚡
          </div>
          <h4 className="text-lg font-bold text-white">Transferencia SPEI</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pago interbancario instantáneo desde BBVA, Santander, Banorte, Citibanamex, Nu o cualquier banca en línea.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto text-xl font-black">
            💳
          </div>
          <h4 className="text-lg font-bold text-white">Mercado Pago MX</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Paga con dinero en cuenta, tarjetas de crédito/débito o en mensualidades cómodas con total respaldo.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto text-xl font-black">
            🧾
          </div>
          <h4 className="text-lg font-bold text-white">Factura CFDI 4.0</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Deducibilidad fiscal mexicana. Te enviamos archivos XML y PDF con tu RFC tras confirmar el pedido.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ============ FAQ SECTION ============ */
const FAQSection = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24 bg-[#080D1A] border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <SectionTitle
          tag="PREGUNTAS FRECUENTES"
          title="Resolvemos todas tus"
          accent="dudas"
          text="Todo lo que necesitas saber antes de contratar tus servicios, sistemas o licencias en México."
        />
        <div className="space-y-3">
          {FAQ.map(([q, a], i) => (
            <Reveal key={q} delay={i * 80}>
              <div className={`rounded-2xl border transition-colors ${open === i ? 'bg-[#0E1528] border-emerald-500/40' : 'bg-white/[0.03] border-white/10 hover:border-white/20'}`}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 text-white font-semibold text-sm sm:text-base"
                >
                  {q}
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 text-emerald-400 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-all duration-500 ${open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-slate-400 leading-relaxed text-sm">{a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============ CTA BANNER ============ */
const CTA = () => (
  <section className="py-24 bg-[#050811]">
    <Reveal className="max-w-5xl mx-auto px-6">
      <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center border border-[#00F59B]/30 bg-gradient-to-br from-emerald-950/30 via-[#0A1122] to-red-950/30">
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(0,245,155,0.18) 0%, transparent 70%)' }}
        />
        <h2 className="relative text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          Lleva tu marca o negocio al siguiente nivel en México
        </h2>
        <p className="relative text-slate-300 max-w-xl mx-auto mb-8 text-base sm:text-lg">
          Cuéntanos tu objetivo y recibe una propuesta formal, cotización en Pesos Mexicanos y asesoría técnica personalizada.
        </p>
        <a
          href={SITE_CONFIG.getWhatsappUrl('Hola, deseo hablar con un asesor para crecer mi marca o crear un sistema en México.')}
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00F59B] to-teal-500 hover:from-[#00F59B]/90 hover:to-teal-400 text-slate-950 font-black text-base shadow-xl shadow-[#00F59B]/30 hover:scale-105 active:scale-95 transition-all"
        >
          <Headphones className="w-5 h-5" /> Hablar con un Asesor Mexicano 🇲🇽
        </a>
      </div>
    </Reveal>
  </section>
);

/* ============ FOOTER ============ */
const Footer = () => (
  <footer className="bg-[#030509] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-600 to-transparent" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.webp" alt="Likes Mexicanos Reales" className="w-10 h-10 rounded-xl object-cover" loading="lazy" />
            <span className="text-white font-black text-2xl tracking-tight">
              Likes Mexicanos <span className="text-emerald-400">Reales</span>
            </span>
          </div>
          <p className="text-slate-400 mb-8 leading-relaxed pr-8 text-sm">
            Agencia líder en crecimiento y autoridad digital enfocada en marcas mexicanas. Soluciones de alto impacto, perfiles geolocalizados, sistemas a medida y desarrollo web de vanguardia.
          </p>
          <div className="flex space-x-3">
            {[Facebook, TikTok, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Red social"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-black hover:-translate-y-1 transition-all border border-white/10"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Soluciones MX</h4>
          <ul className="space-y-3 text-sm">
            {['Likes & Seguidores MX', 'Seguidores Facebook MX', 'Reseñas Google Maps 5★', 'Desarrollo de Sistemas por Encargo', 'Canva Pro & Gemini IA Pro', 'Cotizador en Pesos MXN'].map((l) => (
              <li key={l}><a href="#cotizador" className="text-slate-400 hover:text-emerald-400 transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Garantía & Legal</h4>
          <ul className="space-y-3 text-sm">
            {['Aviso de Privacidad (LFPDPPP)', 'Términos de Servicio', 'Facturación CFDI 4.0', 'Garantía 30 Días sin Caídas', 'Referencias de Clientes'].map((l) => (
              <li key={l}><a href="#referencias" className="text-slate-400 hover:text-emerald-400 transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Likes Mexicanos Reales. Todos los derechos reservados. Hecho en México 🇲🇽.</p>
        <p className="flex items-center gap-1">Diseñado con excelencia <span className="text-emerald-500">●</span> Vexel Studio</p>
      </div>
    </div>
  </footer>
);

const FloatingWhatsApp = () => (
  <a
    href={SITE_CONFIG.getWhatsappUrl('Hola Likes Mexicanos Reales, quiero información de sus servicios o sistemas.')}
    target="_blank"
    rel="noreferrer"
    aria-label="Contactar asesor por WhatsApp"
    className="fixed bottom-8 right-8 z-[90] group"
  >
    <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-60" />
    <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-b from-[#25D366] to-[#1DA851] rounded-full shadow-2xl border border-white/20 group-hover:scale-110 transition-transform duration-300">
      <WhatsAppIcon className="w-8 h-8 text-white fill-current" />
      <span className="absolute right-full mr-4 bg-[#0A1224] text-white font-bold px-4 py-2 rounded-xl text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 border border-[#00F59B]/30 shadow-2xl">
        Atención 24/7 México 🇲🇽
      </span>
    </div>
  </a>
);

/* ============ STANDALONE LANDING WRAPPER ============ */
const StandaloneLandingHeader = ({ title, category, onBackToAgency }) => (
  <div className="sticky top-0 z-50 bg-[#060A14]/95 backdrop-blur-md border-b border-[#00F59B]/30 px-6 py-3 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <button
        onClick={onBackToAgency}
        className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#00F59B] hover:text-black text-white text-xs font-bold transition-all flex items-center gap-1.5"
      >
        ← Volver a Likes Mexicanos Reales
      </button>
      <span className="hidden sm:inline-block text-xs text-slate-400">
        Plantilla Independiente: <strong className="text-white">{title}</strong> ({category})
      </span>
    </div>
    <a
      href={SITE_CONFIG.getWhatsappUrl(`Hola, quiero cotizar un diseño web exacto como el de ${title} para mi negocio.`)}
      target="_blank"
      rel="noreferrer"
      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00F59B] to-teal-500 hover:from-[#00F59B]/90 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
    >
      <WhatsAppIcon className="w-3.5 h-3.5" />
      <span>Quiero una web así para mi negocio 🇲🇽</span>
    </a>
  </div>
);

/* ============ APLICACIÓN PRINCIPAL ============ */
function getLandingFromLocation() {
  if (typeof window === 'undefined') return null;
  // Clean route /demo/:key
  const match = window.location.pathname.match(/^\/demo\/([a-z0-9_-]+)\/?$/i);
  if (match && match[1]) {
    const key = match[1].toLowerCase();
    if (TEMPLATES.some((t) => t.key === key)) return key;
  }
  // Query param /?landing=:key
  const params = new URLSearchParams(window.location.search);
  const landingParam = params.get('landing');
  if (landingParam && TEMPLATES.some((t) => t.key === landingParam)) {
    return landingParam;
  }
  return null;
}

function AppContent() {
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [selectedTemplateKey, setSelectedTemplateKey] = useState('tequila');
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('MX-84920');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutPackage, setCheckoutPackage] = useState(null);
  const [calculatorRecommendation, setCalculatorRecommendation] = useState(null);

  const [activeStandaloneKey, setActiveStandaloneKey] = useState(getLandingFromLocation);

  // Dynamic SEO Hook for Clean Routes and Meta Tags
  useDynamicSEO(activeStandaloneKey);

  useEffect(() => {
    const onPop = () => {
      setActiveStandaloneKey(getLandingFromLocation());
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleOpenShowcase = (key = 'tequila') => {
    setSelectedTemplateKey(key);
    setShowcaseOpen(true);
  };

  const handleOpenFullscreen = (key) => {
    setShowcaseOpen(false);
    setActiveStandaloneKey(key);
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState({ landingKey: key }, '', `/demo/${key}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseStandalone = () => {
    setActiveStandaloneKey(null);
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTracking = (orderId = 'MX-84920') => {
    setTrackingOrderId(orderId);
    setTrackingOpen(true);
  };

  const handleOpenCheckout = (pkg = null) => {
    setCheckoutPackage(pkg);
    setCheckoutOpen(true);
  };

  const handleTrackFromCheckout = (orderId) => {
    setCheckoutOpen(false);
    setTrackingOrderId(orderId);
    setTrackingOpen(true);
  };

  // Standalone map for all 11 landing pages:
  const standaloneComponents = {
    tequila: TequilaLanding,
    tacos: TacosLanding,
    barberia: BarberiaLanding,
    estetica: EsteticaSalonLanding,
    calzado: CalzadoTiendaLanding,
    taller: TallerMecanicoLanding,
    cafe: CafeArtesanalLanding,
    veterinaria: VeterinariaLanding,
    dental: DentalPolancoLanding,
    tulum: TulumRealEstateLanding,
    gym: GymAztecaLanding,
  };

  // If viewing ANY landing page in standalone mode:
  if (activeStandaloneKey && standaloneComponents[activeStandaloneKey]) {
    const Component = standaloneComponents[activeStandaloneKey];
    const currentMeta = TEMPLATES.find(t => t.key === activeStandaloneKey) || TEMPLATES[0];
    return (
      <div className="min-h-screen bg-[#090A0F]">
        <StandaloneLandingHeader
          title={currentMeta.title}
          category={currentMeta.category}
          onBackToAgency={handleCloseStandalone}
        />
        <React.Suspense fallback={<LandingSkeleton />}>
          <Component
            onBack={handleCloseStandalone}
            onOpenCheckout={(pkg) => handleOpenCheckout(pkg)}
            onSwitchDemo={(key) => handleOpenFullscreen(key)}
          />
        </React.Suspense>

        {/* Modal de Checkout Express para compras desde modo demo */}
        <ExpressCheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          packageData={checkoutPackage}
          onTrackOrder={handleTrackFromCheckout}
        />

        {/* Modal de Rastreo en Vivo */}
        <OrderTrackingModal
          isOpen={trackingOpen}
          onClose={() => setTrackingOpen(false)}
          initialOrderId={trackingOrderId}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090A0F] font-sans selection:bg-[#FF005C]/30 selection:text-white">
      {/* 1. Header Flotante & Navegación */}
      <Navbar
        onOpenTracking={() => handleOpenTracking()}
        onOpenShowcase={handleOpenShowcase}
      />

      {/* 2. Hero Section con Título Dinámico y Mockup 3D */}
      <HeroSection onOpenShowcase={handleOpenShowcase} />

      {/* Cinta Ticker */}
      <Ticker />

      {/* Banda de Estadísticas y Autoridad */}
      <StatsBand />
      
      {/* Servicios Mexicanos Principales */}
      <MexicanServices />

      {/* 4. Bento Grid de Diferenciación (Destrucción de objeciones) */}
      <BentoGrid />

      {/* 6. Comparativa Interactiva (Antes vs Después) */}
      <BeforeAfterComparison />

      {/* 3. Calculadora Interactiva de Precios CRO */}
      <section id="cotizador" className="py-24 bg-[#0B0F1C] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle
            tag="PRECIOS TRANSPARENTES MXN"
            title="Calcula y Cotiza en"
            accent="Segundos"
            text="Sin cargos ocultos. Ajusta el tamaño de tu paquete con descuento por volumen en tiempo real y finaliza en 1 clic."
          />
          {/* Auditor Express de Autoridad Social CRO */}
          <ProfileAuditWidget onApplyRecommendation={(rec) => setCalculatorRecommendation(rec)} />
          <ServiceCalculator
            onOpenCheckout={handleOpenCheckout}
            recommendation={calculatorRecommendation}
          />
        </div>
      </section>

      {/* Referencias Reales & Pruebas de Trabajo */}
      <ReferencesSection />

      {/* Exhibición de Landing Pages (11 Diseños) */}
      <CoverflowCarousel onOpenShowcase={handleOpenShowcase} onOpenFullscreen={handleOpenFullscreen} />

      {/* Desarrollo de Software & Sistemas por Encargo */}
      <CustomSystemsSection />

      {/* Sección VIP Agencias & Revendedores */}
      <ResellerVIPSection />

      {/* Suscripciones: Canva Pro Edu & Gemini IA Pro */}
      <Subscriptions />

      {/* Métodos de Pago México (OXXO Pay, SPEI, Mercado Pago) */}
      <PaymentMethodsBand />

      {/* Preguntas Frecuentes */}
      <FAQSection />

      {/* CTA Final */}
      <CTA />

      {/* Footer Oficial */}
      <Footer />

      {/* Botón flotante de WhatsApp */}
      <FloatingWhatsApp />

      {/* 6. Social Proof Toast (Notificaciones discretas cada 22 seg) */}
      <SocialProofToast onSelectToast={() => handleOpenCheckout()} />

      {/* Visor interactivo en Modal con simulador de dispositivos */}
      <ShowcaseModal
        isOpen={showcaseOpen}
        initialTemplateKey={selectedTemplateKey}
        onClose={() => setShowcaseOpen(false)}
        onOpenFullscreen={handleOpenFullscreen}
      />

      {/* Modal de Rastreo en Vivo */}
      <OrderTrackingModal
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        initialOrderId={trackingOrderId}
      />

      {/* Modal de Checkout Express en 3 Pasos */}
      <ExpressCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        packageData={checkoutPackage}
        onTrackOrder={handleTrackFromCheckout}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <LandingCustomizerProvider>
        <AppContent />
      </LandingCustomizerProvider>
    </CartProvider>
  );
}
