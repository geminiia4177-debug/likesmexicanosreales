import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  AlertTriangle,
  Sparkles,
  Check,
  Activity,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function VeterinariaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'HOSPITAL VETERINARIO & PET CARE 24H';
  const brandCity = city || 'Condesa · Coyoacán · San Jerónimo, CDMX';

  // Pet Species Filter State: perros, gatos, exoticos
  const [selectedSpecies, setSelectedSpecies] = useState('perros');

  const servicesBySpecies = {
    perros: [
      { id: 'vacuna_canina', name: 'Cuadro Múltiple Canino (Séxtuple + Rabia)', price: '$580 MXN', desc: 'Vacunas importadas con carnet digital de seguimiento y desparasitación.' },
      { id: 'estetica_canina', name: 'Pet Spa & Baño Hipoalergénico', price: '$420 MXN', desc: 'Corte de uñas, limpieza de oídos, vaciado de glándulas y perfume orgánico.' },
      { id: 'dental_canino', name: 'Profilaxis Dental Ultrasónica sin dolor', price: '$1,250 MXN', desc: 'Eliminación completa de sarro y pulido dental para aliento fresco.' },
      { id: 'esterilizacion_canina', name: 'Cirugía de Esterilización Guiada', price: '$1,950 MXN', desc: 'Monitoreo multiparamétrico, anestesia inhalada y analgésicos incluidos.' },
    ],
    gatos: [
      { id: 'vacuna_felina', name: 'Triple Felina + Leucemia (Cat-Friendly)', price: '$620 MXN', desc: 'Protocolo de bajo estrés con feromonas Feliway en consultorio exclusivo.' },
      { id: 'estetica_felina', name: 'Baño Seco & Deslanado de Gatos', price: '$480 MXN', desc: 'Tratamiento anti-bolas de pelo y cepillado profesional sin sedación.' },
      { id: 'esterilizacion_felina', name: 'Esterilización Láser de Mínima Invasión', price: '$1,650 MXN', desc: 'Recuperación en menos de 24 horas con faja post-quirúrgica de regalo.' },
      { id: 'checkup_renal', name: 'Perfil Geriátrico & Renal Felino', price: '$1,400 MXN', desc: 'Química sanguínea, urianálisis y ecografía abdominal de alta resolución.' },
    ],
    exoticos: [
      { id: 'consulta_exoticos', name: 'Consulta Especializada en Aves & Hurones', price: '$750 MXN', desc: 'Revisión por médico veterinario zootecnista con posgrado en fauna exótica.' },
      { id: 'desgaste_dental', name: 'Limado Dental para Conejos & Roedores', price: '$890 MXN', desc: 'Corrección de maloclusión de incisivos y molares con instrumental fino.' },
      { id: 'sexado_aves', name: 'Sexado por ADN y Perfil Nutricional', price: '$680 MXN', desc: 'Análisis genético en laboratorio certificado para psitácidos y reptiles.' },
    ],
  };

  const currentServices = servicesBySpecies[selectedSpecies] || servicesBySpecies.perros;

  const handleBookService = (srvName) => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `🐾 *CITA VETERINARIA - ${brandName}*%0A%0AQuiero agendar para mi mascota (${selectedSpecies.toUpperCase()}):%0A• *Servicio:* ${srvName}%0A• *Sucursal:* ${brandCity}%0A¿Tienen lugar disponible hoy o mañana?`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  const handleUrgentCall = () => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `🚨 *URGENCIA VETERINARIA 24H - ${brandName}*%0A%0ATengo una emergencia médica con mi mascota (accidente / intoxicación / convulsión). Voy en camino a ${brandCity}. Por favor tengan listo el quirófano o terapia intensiva.`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F4F9F6] text-[#1E2E25] font-clinical selection:bg-[#00F59B] selection:text-black">
      <DemoConversionBar
        currentKey="veterinaria"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP NOTIFICATION & DUAL ACTION HERO BUTTONS STRIP */}
      <div className="bg-white/90 backdrop-blur-md border-b border-emerald-100 px-6 py-2.5 flex justify-between items-center text-xs font-semibold max-w-7xl mx-auto rounded-b-3xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{brandCity}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-slate-500">Médicos Veterinarios Titulados UNAM / UAM</span>
          <button
            onClick={handleUrgentCall}
            className="bg-[#FF4D4D] hover:bg-[#e03b3b] text-white px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md animate-pulse"
          >
            🚨 Urgencias 24h
          </button>
        </div>
      </div>

      {/* HERO SECTION: FRIENDLY ORGANIC WITH CONTRASTED DUAL BUTTONS */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto relative overflow-hidden">
        {/* Soft Organic Background Glows */}
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-teal-100/50 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left 7 Cols: Empathetic Medical Headline */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>Hospital Veterinario Certificado & Pet Spa</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
              El cuidado médico y cariño que tu mejor amigo merece.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-xl mb-8">
              En {brandName} contamos con terapia intensiva, laboratorio clínico propio con resultados en 20 minutos, quirófano estéril y consultorios libres de estrés para perros, gatos y especies exóticas.
            </p>

            {/* DUAL CONTRAST ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Green Consultation Button */}
              <button
                onClick={() => handleBookService('Consulta General')}
                className="bg-[#00F59B] hover:bg-[#00d885] text-slate-900 px-8 py-4 rounded-full font-black text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <span>Agendar Consulta / Estética</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              {/* Coral Red 24h Emergency Button */}
              <button
                onClick={handleUrgentCall}
                className="bg-[#FF4D4D] hover:bg-[#e03b3b] text-white px-7 py-4 rounded-full font-black text-sm tracking-wide shadow-lg shadow-red-500/20 transition-all flex items-center gap-2"
              >
                <Activity className="w-4 h-4" />
                <span>Urgencia Médica 24h</span>
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Organic Rounded Frame (Circle / Oval Cutout) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-4 bg-white rounded-[40px] shadow-2xl border border-emerald-100 max-w-sm w-full">
              <div className="aspect-square rounded-[32px] overflow-hidden border border-emerald-100 relative">
                <img
                  src="/images/veterinaria.webp"
                  alt={brandName}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow">
                  🐾 Atención Médica Ética
                </div>
              </div>
              <div className="pt-4 flex justify-between items-center text-xs font-bold text-slate-700 px-2">
                <span>Quirófano & Rayos X Digital</span>
                <span className="text-amber-500">★★★★★ 4.97 (1,890 mascotas)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* EXCLUSIVE COMPONENT: INTERACTIVE SPECIES SELECTOR & SERVICES FILTER */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto border-t border-emerald-100">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-2">
            Medicina Preventiva & Especializada
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Servicios adaptados a la especie de tu mascota
          </h2>

          {/* Species Pills Switcher */}
          <div className="inline-flex mt-6 bg-white p-1.5 rounded-full border border-emerald-200 shadow-sm">
            {[
              { key: 'perros', label: '🐕 Perros & Cachorros' },
              { key: 'gatos', label: '🐈 Gatos & Gatitos' },
              { key: 'exoticos', label: '🦜 Aves, Hurones & Exóticos' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedSpecies(tab.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                  selectedSpecies === tab.key
                    ? 'bg-[#00F59B] text-slate-900 shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services List for Selected Species */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {currentServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-lg font-bold text-slate-900">{srv.name}</h4>
                  <span className="font-black text-base text-emerald-700 shrink-0 ml-3">
                    {srv.price}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{srv.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[11px] text-slate-400 font-medium">Cita garantizada</span>
                <button
                  onClick={() => handleBookService(srv.name)}
                  className="bg-emerald-50 hover:bg-[#00F59B] text-emerald-800 hover:text-black font-bold text-xs px-4 py-2 rounded-full transition-all flex items-center gap-1.5"
                >
                  <span>Agendar servicio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-white border-t border-emerald-100 text-center text-xs text-slate-500 rounded-t-[40px]">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-bold text-slate-900 text-base">{brandName}</div>
          <p>{brandCity} · Hospital con licencia sanitaria de SAGARPA / SENASICA</p>
          <p className="text-[10px]">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
