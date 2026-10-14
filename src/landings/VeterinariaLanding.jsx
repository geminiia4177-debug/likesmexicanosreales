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
  Award,
  Calendar,
  Stethoscope,
  Smile,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function VeterinariaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'HOSPITAL VETERINARIO HUELLAS 24H';
  const brandCity = city || 'Condesa · Coyoacán · San Jerónimo, CDMX';

  // Interactive Pet Care Filter State: Species + Life Stage
  const [selectedSpecies, setSelectedSpecies] = useState('perro'); // 'perro' | 'gato' | 'exotico'
  const [selectedStage, setSelectedStage] = useState('cachorro'); // 'cachorro' | 'adulto' | 'senior'

  // Comprehensive Medical Protocols Matrix by Species & Life Stage
  const careMatrix = {
    'perro-cachorro': {
      title: 'Plan Integral Cachorro Fuerte (2 a 12 Meses)',
      tag: 'ETAPA CRÍTICA DE INMUNIDAD',
      vaccines: 'Cuádruple + Séxtuple Canina, Rabia y Giardia',
      deworming: 'Desparasitación interna cada 21 días + Pipeta anti-pulgas',
      careFocus: 'Guía de socialización, control de peso y revisión osteoarticular de razas medianas/grandes.',
      spaRecommended: 'Baño de acostumbramiento con shampoo hipoalergénico suave y corte de uñas.',
      checkupPrice: '$650 MXN',
      fullPackagePrice: '$1,850 MXN (Incluye 3 vacunas + 2 desparasitaciones)',
      badge: 'Protección 100% Cachorro'
    },
    'perro-adulto': {
      title: 'Mantenimiento Canino Pleno (1 a 7 Años)',
      tag: 'PROTECCIÓN & CONDICIÓN FÍSICA',
      vaccines: 'Refuerzo anual DHPP + Rabia + Bordetella (Tos de las Perreras)',
      deworming: 'Control antiparasitario trimestral oral NexGard / Simparica',
      careFocus: 'Limpieza dental ultrasónica para prevenir sarro, examen cardíaco y nutrición balanceada.',
      spaRecommended: 'Deslanado profundo, vaciado de glándulas anales y corte higiénico.',
      checkupPrice: '$550 MXN',
      fullPackagePrice: '$1,350 MXN (Revisión + Refuerzo Anual + Spa)',
      badge: 'Bienestar Adulto Activo'
    },
    'perro-senior': {
      title: 'Programa Geriátrico Golden Age (+7 Años)',
      tag: 'CUIDADO CARDIO-RENAL & ARTICULAR',
      vaccines: 'Refuerzos personalizados según estilo de vida y sistema inmune',
      deworming: 'Monitoreo de coprológico antes de medicar',
      careFocus: 'Perfil bioquímico 24 elementos, ecografía preventiva de abdomen y terapia para artrosis / articulaciones.',
      spaRecommended: 'Baño terapéutico tibio en seco sin estrés para cuidar columna.',
      checkupPrice: '$750 MXN',
      fullPackagePrice: '$2,200 MXN (Check-Up Geriátrico Completo + Ultrasonido)',
      badge: 'Cuidado Amoroso Senior'
    },
    'gato-cachorro': {
      title: 'Protocolo Gatito Baby Cat-Friendly (2 a 12 Meses)',
      tag: 'PROTOCOLOS LIBRES DE ESTRÉS',
      vaccines: 'Triple Felina (Panleucopenia, Rinotraqueitis, Calicivirus) + Leucemia Felina (FeLV)',
      deworming: 'Desparasitación específica para gatitos con suspensión palatable',
      careFocus: 'Prueba rápida de SIDA y Leucemia Felina (SNAP Test ELISA), enriquecimiento ambiental y uso de feromonas Feliway.',
      spaRecommended: 'Cepillado y corte de puntas de uñas en consultorio silencioso.',
      checkupPrice: '$620 MXN',
      fullPackagePrice: '$1,650 MXN (Vacunas + Prueba FeLV/FIV)',
      badge: 'Certificación Cat-Friendly'
    },
    'gato-adulto': {
      title: 'Bienestar Felino Esencial (1 a 8 Años)',
      tag: 'SALUD URINARIA & CONTROL DE PESO',
      vaccines: 'Refuerzo Triple Felina anual + Rabia',
      deworming: 'Pipeta tópica de amplio espectro (Broadline / Revolution)',
      careFocus: 'Monitoreo de tracto urinario inferior (FLUTD), examen dental para lesiones resortivas y control de estrés.',
      spaRecommended: 'Baño de espuma seca y eliminación de nudos sin sedación.',
      checkupPrice: '$550 MXN',
      fullPackagePrice: '$1,250 MXN (Consulta + Vacuna + Pipeta)',
      badge: 'Gatos Libres de Ansiedad'
    },
    'gato-senior': {
      title: 'Chequeo Geriátrico Felino (+8 Años)',
      tag: 'ENFOQUE RENAL & PRESIÓN ARTERIAL',
      vaccines: 'Inmunización adaptada según función renal y hepática',
      deworming: 'Dosificación ajustada con seguimiento',
      careFocus: 'Química sanguínea con biomarcador SDMA para detección temprana de falla renal, medición de presión arterial Doppler.',
      spaRecommended: 'Higiene suave adaptada con calor infrarrojo.',
      checkupPrice: '$780 MXN',
      fullPackagePrice: '$2,150 MXN (Perfil Renal Completo + Tensión)',
      badge: 'Monitoreo Renal Temprano'
    },
    'exotico-cachorro': {
      title: 'Medicina Preventiva Conejos & Hurones Jóvenes',
      tag: 'ZOOTECNIA & NUTRICIÓN ESPECIALIZADA',
      vaccines: 'Vacunación para moquillo en hurones / Control vírico según especie',
      deworming: 'Protocolo de bajo impacto para flora digestiva sensible',
      careFocus: 'Enfocado en dieta alta en fibra (heno 80% en lagomorfos), revisión de desgaste de muelas y sexado por especialista.',
      spaRecommended: 'Corte seguro de uñas y limpieza podal especializada.',
      checkupPrice: '$750 MXN',
      fullPackagePrice: '$1,400 MXN (Consulta Exóticos + Guía de Manejo)',
      badge: 'Especialista en Fauna Exótica'
    },
    'exotico-adulto': {
      title: 'Monitoreo General Fauna Exótica Adulta',
      tag: 'REVISIÓN DENTAL & METABÓLICA',
      vaccines: 'Refuerzos específicos para fauna no convencional',
      deworming: 'Análisis coproparasitoscópico previo',
      careFocus: 'Limado dental bajo sedación inhalatoria si hay maloclusión, pesaje de precisión y control de hábitat.',
      spaRecommended: 'Cepillado y corte de plumas de vuelo ético si aplica.',
      checkupPrice: '$700 MXN',
      fullPackagePrice: '$1,300 MXN (Revisión Completa + Suplementos)',
      badge: 'Medicina No Convencional'
    },
    'exotico-senior': {
      title: 'Cuidados Geriátricos Animales Exóticos',
      tag: 'CALIDAD DE VIDA EN AVES & ROEDORES',
      vaccines: 'Evaluación caso a caso',
      deworming: 'Ajuste suave sin sobrecargar hígado',
      careFocus: 'Radiografía digital de bajo contraste para tórax y columna, monitoreo nutricional con papillas de soporte.',
      spaRecommended: 'Acondicionamiento térmico y cuidados paliativos.',
      checkupPrice: '$850 MXN',
      fullPackagePrice: '$1,950 MXN (Radiografía + Consulta Especializada)',
      badge: 'Atención Experta Compasiva'
    }
  };

  const currentPlan = careMatrix[`${selectedSpecies}-${selectedStage}`] || careMatrix['perro-cachorro'];

  const handleBookAppointment = (packageName) => {
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '525512345678';
    const message = `🐾 *CITA VETERINARIA - ${brandName}*%0A%0AHola, quiero agendar el servicio:%0A• *Mascota:* ${selectedSpecies.toUpperCase()} (${selectedStage.toUpperCase()})%0A• *Plan recomendado:* ${packageName || currentPlan.title}%0A• *Sucursal:* ${brandCity}%0A¿Qué días tienen disponibles para atenderlo con su médico de cabecera?`;
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleEmergencyCall = () => {
    const cleanPhone = phone ? phone.replace(/\D/g, '') : '525512345678';
    const message = `🚨 *URGENCIA VETERINARIA 24 HORAS - ${brandName}*%0A%0ATengo una emergencia inmediata con mi mascota (trauma / asfixia / convulsión / parto difícil).%0AVoy en camino a la clínica de ${brandCity}. Por favor tengan listo al equipo médico de guardia y quirófano.`;
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#0F172A] font-clinical selection:bg-[#0D9488] selection:text-white">
      {/* Demo Customizer Bar */}
      <DemoConversionBar
        currentKey="veterinaria"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP URGENCY STATUS TICKER */}
      <div className="bg-[#0F172A] text-white px-6 py-2.5 text-xs flex flex-wrap justify-between items-center gap-3 border-b-2 border-[#0D9488]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping"></span>
          <span className="font-bold text-[#10B981]">GUARDIA ACTIVA 24/7:</span>
          <span>Médico Veterinario Cirujano en Turno en {brandCity}</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="hidden sm:inline text-zinc-300">Oxigenoterapia · Rayos X · Laboratorio 20 min</span>
          <button
            onClick={handleEmergencyCall}
            className="bg-[#F43F5E] hover:bg-[#E11D48] text-white px-3 py-1 rounded-full font-bold text-[11px] tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>LÍNEA ROJA DE URGENCIAS</span>
          </button>
        </div>
      </div>

      {/* HERO SECTION: WARM, CALMING, WITH DUAL ENTRANCE (EMERGENCY VS CHECKUP) */}
      <section className="px-6 sm:px-12 py-16 sm:py-24 max-w-7xl mx-auto border-b border-[#0D9488]/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (7 Cols): Empathetic, Trust-Building Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 text-[#0D9488] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Heart className="w-3.5 h-3.5 text-[#F43F5E] fill-[#F43F5E]" />
              <span>CUIDADO EMPÁTICO, SIN DOLOR & CON AMOR REAL</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0F172A] leading-[1.08] tracking-tight mb-6">
              Cuidamos a quien más amas con ciencia, ternura y guardia <span className="text-[#0D9488]">24 horas</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-xl mb-8">
              En <strong>{brandName}</strong> entendemos que tu mascota no es solo un animal, es tu familia. Nuestras instalaciones cuentan con quirófano de alta especialidad, salas de espera separadas para perros y gatos para reducir estrés, y médicos certificados por la UNAM.
            </p>

            {/* DUAL ENTRANCE HERO BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Emergency Fast Entrance */}
              <button
                onClick={handleEmergencyCall}
                className="bg-[#F43F5E] hover:bg-[#E11D48] text-white px-8 py-4 rounded-[2rem] font-bold text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>¿Tienes una Urgencia Médica Ahora?</span>
              </button>

              {/* Preventive / Routine Care */}
              <button
                onClick={() => {
                  const el = document.getElementById('filtro-servicios');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-8 py-4 rounded-[2rem] font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta o Vacuna</span>
              </button>
            </div>

            {/* Quick Guarantees Pill Badges */}
            <div className="flex flex-wrap gap-4 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <Check className="w-3.5 h-3.5 text-[#0D9488]" /> Protocolo Fear Free (Cero Estrés)
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <Check className="w-3.5 h-3.5 text-[#0D9488]" /> Resultados de Sangre en 20 Min
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <Check className="w-3.5 h-3.5 text-[#0D9488]" /> Hospitalización con Monitoreo 24h
              </span>
            </div>
          </div>

          {/* Right Column (5 Cols): Friendly Arched/Masked Image with Active Vet Badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-[320px] sm:w-[400px] h-[460px] sm:h-[520px] rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl relative bg-white">
              <img
                src="/images/veterinaria.webp"
                alt="Consulta Veterinaria con mascota feliz"
                className="w-full h-full object-cover filter contrast-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Active Vet on Duty Floating Card */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-bold text-[#0F172A]">Médico de Guardia Activo</span>
              </div>

              {/* Emergency Banner at Bottom */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#0D9488]/95 backdrop-blur-md text-white p-4 rounded-2xl text-center shadow-lg">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-200">
                  CONSULTORIOS SEPARADOS PERROS Y GATOS
                </div>
                <div className="text-base font-bold mt-0.5">
                  Atención en {brandCity}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* EXCLUSIVE INTERACTIVE WIDGET: FILTRO DE SERVICIOS POR MASCOTA Y EDAD */}
      <section id="filtro-servicios" className="px-6 sm:px-12 py-20 max-w-6xl mx-auto border-b border-[#0D9488]/15">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block bg-[#0D9488]/10 text-[#0D9488] font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-2">
            PLAN DE SALUD PREVENTIVO PERSONALIZADO
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            ¿Qué necesita tu mascota hoy?
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Elige la especie de tu compañero y su etapa de vida. Nuestro protocolo médico se ajusta al instante con el esquema de vacunación, exámenes preventivos y estética adecuada.
          </p>
        </div>

        {/* The Diagnostic Filter Card Container */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-xl border border-slate-100">
          
          {/* Step 1: Species Tabs (Perro, Gato, Exótico) */}
          <div className="mb-8">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
              1. SELECCIONA EL TIPO DE MASCOTA:
            </span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'perro', label: '🐶 Perros', desc: 'Caninos de todas las razas' },
                { id: 'gato', label: '🐱 Gatos', desc: 'Protocolo Cat-Friendly amigable' },
                { id: 'exotico', label: '🦜 Exóticos', desc: 'Conejos, Hurones, Aves y Reptiles' }
              ].map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSpecies(sp.id)}
                  className={`p-4 rounded-2xl text-left border-2 transition-all ${
                    selectedSpecies === sp.id
                      ? 'border-[#0D9488] bg-[#0D9488]/5 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-extrabold text-base sm:text-lg text-[#0F172A] mb-1">
                    {sp.label}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-tight hidden sm:block">
                    {sp.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Life Stage Sub-tabs (Cachorro, Adulto, Senior) */}
          <div className="mb-10 pb-8 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
              2. ETAPA DE VIDA / EDAD APROXIMADA:
            </span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'cachorro', label: 'Cachorro / Junior', desc: '2 a 12 meses · Inmunización inicial' },
                { id: 'adulto', label: 'Adulto', desc: '1 a 7 años · Mantenimiento y prevención' },
                { id: 'senior', label: 'Senior / Golden Age', desc: '+7 años · Cuidado renal y articular' }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStage(st.id)}
                  className={`p-3.5 rounded-2xl text-center border transition-all ${
                    selectedStage === st.id
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold">{st.label}</div>
                  <div className={`text-[10px] hidden sm:block mt-0.5 ${selectedStage === st.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {st.desc.split('·')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC RESULT MEDICAL CARD */}
          <div className="bg-[#FFFBEB] rounded-3xl p-6 sm:p-8 border-2 border-[#0D9488]/20">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0D9488]/15 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-wider block">
                  {currentPlan.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-0.5">
                  {currentPlan.title}
                </h3>
              </div>
              <span className="bg-[#0D9488] text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
                {currentPlan.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Medical Protocols Breakdown */}
              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm">
                
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-[#0D9488] block mb-1">
                    💉 Esquema de Vacunación Recomendado:
                  </span>
                  <p className="text-slate-700 font-medium">
                    {currentPlan.vaccines}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-[#0D9488] block mb-1">
                    🛡️ Desparasitación & Antiparasitarios:
                  </span>
                  <p className="text-slate-700 font-medium">
                    {currentPlan.deworming}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-[#0D9488] block mb-1">
                    🩺 Enfoque Clínico Especializado:
                  </span>
                  <p className="text-slate-700 font-medium">
                    {currentPlan.careFocus}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-[#0D9488] block mb-1">
                    ✨ Spa & Estética sugerida:
                  </span>
                  <p className="text-slate-700 font-medium">
                    {currentPlan.spaRecommended}
                  </p>
                </div>

              </div>

              {/* Price & Booking Box */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                    CONSULTA MÉDICA INDIVIDUAL:
                  </span>
                  <div className="text-3xl font-extrabold text-[#0F172A] my-1">
                    {currentPlan.checkupPrice}
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Incluye revisión completa de ojos, oídos, dientes, palpación abdominal y auscultación cardíaca.
                  </p>

                  <div className="border-t border-slate-100 pt-3 mb-6">
                    <span className="text-[11px] text-[#0D9488] font-bold uppercase tracking-wider block">
                      O PAQUETE INTEGRAL RECOMENDADO:
                    </span>
                    <span className="text-sm font-extrabold text-slate-800 block mt-1">
                      {currentPlan.fullPackagePrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleBookAppointment(currentPlan.title)}
                  className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Cita para este Plan</span>
                </button>
                <span className="text-[10px] text-slate-400 text-center mt-2 block">
                  Sin anticipo para consultas generales · Confirmación inmediata
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* HOSPITAL FACILITIES & INFRASTRUCTURE */}
      <section className="px-6 sm:px-12 py-16 max-w-7xl mx-auto border-b border-[#0D9488]/15">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-bold mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-lg text-[#0F172A] mb-2">Quirófano Multiparamétrico</h4>
            <p className="text-slate-600 leading-relaxed">
              Anestesia inhalada con isoflurano y monitoreo continuo de electrocardiograma, oximetría y presión arterial para máxima seguridad quirúrgica.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-bold mb-4">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-lg text-[#0F172A] mb-2">Laboratorio Propio 24 Horas</h4>
            <p className="text-slate-600 leading-relaxed">
              Biometría hemática completa, químicas sanguíneas y tiempos de coagulación en menos de 25 minutos para decisiones médicas sin demora.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-bold mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-lg text-[#0F172A] mb-2">Hospitalización Supervisada</h4>
            <p className="text-slate-600 leading-relaxed">
              Habitaciones climatizadas con oxigenoterapia e infusión continua de suero, con veterinario y enfermero presente toda la noche.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 sm:px-12 bg-white text-xs text-slate-500 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div>
            <div className="text-2xl font-extrabold text-[#0F172A] tracking-tight">{brandName}</div>
            <p className="text-xs text-slate-500 mt-1">{brandCity} · Urgencias 24 Horas los 365 días</p>
          </div>
          <div className="text-xs space-y-1">
            <p className="text-[#0F172A] font-bold">MÉDICOS TITULADOS CON CÉDULA PROFESIONAL</p>
            <p>© 2026 HOSPITAL VETERINARIO · AMOR Y CIENCIA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
