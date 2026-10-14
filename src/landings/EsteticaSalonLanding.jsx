import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Star,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  Scissors,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function EsteticaSalonLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'ATELIER BOTANIQUE · BEAUTY & SPA';
  const brandCity = city || 'Polanco Masaryk & Condesa, CDMX';

  // Instagram Lookbook Filter State
  const [activeCategory, setActiveCategory] = useState('all');

  const lookbook = [
    {
      id: 'balayage_gold',
      title: 'Balayage Champagne Honey',
      cat: 'cabello',
      specialist: 'Master Colorista Valeria S.',
      price: '$2,450 MXN',
      time: '3.5 Horas',
      desc: 'Difuminado orgánico a mano alzada con protección plex y matiz gloss.',
      image: '/images/estetica.webp',
    },
    {
      id: 'hydra_facial',
      title: 'HydraFacial Glow & Drenaje Linfático',
      cat: 'spa',
      specialist: 'Cosmiatra Daniela M.',
      price: '$1,350 MXN',
      time: '60 Minutos',
      desc: 'Limpieza con punta de diamante, sérum de ácido hialurónico y terapia LED.',
      image: '/images/estetica.webp',
    },
    {
      id: 'russian_nails',
      title: 'Manicura Rusa & Gelish Esculpido',
      cat: 'unas',
      specialist: 'Nail Artist Sofía C.',
      price: '$680 MXN',
      time: '75 Minutos',
      desc: 'Corte de cutícula milimétrico con torno y nivelación con gel constructor.',
      image: '/images/estetica.webp',
    },
    {
      id: 'keratina_vegana',
      title: 'Tratamiento Botox Capilar Vegano',
      cat: 'cabello',
      specialist: 'Valeria S.',
      price: '$1,850 MXN',
      time: '2 Horas',
      desc: 'Nutrición profunda con aceite de argán, 0% formol, brillo espejo por 4 meses.',
      image: '/images/estetica.webp',
    },
  ];

  const filteredLookbook =
    activeCategory === 'all'
      ? lookbook
      : lookbook.filter((item) => item.cat === activeCategory);

  const handleBookService = (serviceTitle) => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `✨ *RESERVA DE CITA - ${brandName}*%0A%0AQuiero agendar el servicio: *${serviceTitle}* en sucursal ${brandCity}.%0A¿Qué horarios tienen disponibles esta semana?`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#332420] font-clinical selection:bg-[#E8C5B0] selection:text-black relative overflow-hidden">
      <DemoConversionBar
        currentKey="estetica"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* BACKGROUND DIFFUSE ORBS (WARM NUDE / CHAMPAGNE GLOW) */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#F3D7C5]/40 blur-3xl pointer-events-none" />
      <div className="absolute top-80 right-10 w-[500px] h-[500px] rounded-full bg-[#FCE7F3]/40 blur-3xl pointer-events-none" />

      {/* TOP NOTIFICATION BAR */}
      <div className="border-b border-[#F0DCD0] bg-white/60 backdrop-blur-md px-6 py-2 text-xs font-medium text-[#7D5E54] flex justify-between items-center max-w-7xl mx-auto rounded-b-full">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C98A6F]" />
          <span>{brandCity}</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline">Tratamientos 100% Libres de Crueldad y Formol</span>
          <span className="text-[#C98A6F] font-bold">Cava de Té & Champagne de Bienvenida</span>
        </div>
      </div>

      {/* HERO SECTION: ARCH COMPOSITION (ROUNDED-T-FULL) & EDITORIAL BEAUTY */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left 7 Cols: Typography & Pill Badges */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-[#F0DCD0] px-4 py-1.5 rounded-full text-xs font-semibold text-[#8C6152] mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C98A6F]" />
              <span>Alta Peluquería & Medicina Estética Facial</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight text-[#2B1B17] mb-6">
              El arte de realzar tu belleza más natural.
            </h1>

            <p className="text-base sm:text-lg text-[#664F47] font-light leading-relaxed max-w-xl mb-8">
              En {brandName} diseñamos experiencias personalizadas. Desde diagnósticos capilares computarizados hasta manicura rusa y tratamientos de brillo espejo, en un ambiente de calma total.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  const el = document.getElementById('lookbook-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#2B1B17] hover:bg-black text-white px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-lg flex items-center gap-2"
              >
                <span>Explorar Lookbook & Precios</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-xs text-[#7A5B50] flex items-center gap-2 font-medium">
                <Star className="w-4 h-4 fill-[#C98A6F] text-[#C98A6F]" />
                <span>4.98 ★ (1,150 clientas satisfechas)</span>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Arch Image Composition (rounded-t-full) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-3 bg-white/70 backdrop-blur-md rounded-t-full rounded-b-3xl border border-[#F0DCD0] shadow-xl max-w-sm w-full">
              <div className="aspect-[3/4] rounded-t-full rounded-b-2xl overflow-hidden border border-[#F0DCD0]">
                <img
                  src="/images/estetica.webp"
                  alt={brandName}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>
              <div className="pt-4 pb-2 text-center">
                <span className="font-editorial text-xl font-bold text-[#2B1B17] block">
                  Lookbook Signature 2026
                </span>
                <span className="text-xs text-[#8A675B]">Polanco Masaryk · CDMX</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* EXCLUSIVE COMPONENT: INSTAGRAM-STYLE LOOKBOOK CATALOG WITH TRANSPARENT PRICES */}
      <section id="lookbook-section" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#F0DCD0]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C6152] font-semibold block mb-2">
              Colección en Vivo
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#2B1B17]">
              Lookbook de Especialidades & Precios
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'Todos' },
              { key: 'cabello', label: 'Color & Balayage' },
              { key: 'spa', label: 'Facial & Glow' },
              { key: 'unas', label: 'Manicura Rusa' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === tab.key
                    ? 'bg-[#2B1B17] text-white shadow'
                    : 'bg-white/80 hover:bg-white text-[#664F47] border border-[#F0DCD0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lookbook Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLookbook.map((item) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-5 border border-[#F0DCD0] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-[#F0DCD0]/60">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#8C6152] font-medium mb-1">
                  <span>{item.specialist}</span>
                  <span>{item.time}</span>
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#2B1B17] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#7A6056] leading-relaxed mb-4">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-[#F0DCD0]/60 flex items-center justify-between">
                <span className="font-editorial text-xl font-bold text-[#2B1B17]">{item.price}</span>
                <button
                  onClick={() => handleBookService(item.title)}
                  className="bg-[#2B1B17] hover:bg-black text-white text-[11px] font-semibold px-4 py-2 rounded-full transition-all"
                >
                  Agendar Cita
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-white/70 border-t border-[#F0DCD0] text-center text-xs text-[#7A5B50] rounded-t-3xl">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-editorial text-2xl text-[#2B1B17]">{brandName}</div>
          <p>{brandCity} · Horario: Martes a Sábado de 09:00 a 20:00 hrs</p>
          <p className="text-[10px] text-[#A6887D]">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
