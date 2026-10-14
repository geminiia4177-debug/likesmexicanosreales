import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  ShieldCheck,
  Calendar,
  Phone,
  CheckCircle2,
  Award,
  Clock,
  ArrowRight,
  HeartPulse,
  MapPin,
  Check,
  Smile,
  Sliders,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function DentalPolancoLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'CLÍNICA DENTAL POLANCO 3D';
  const brandCity = city || 'Campos Elíseos & Masaryk, Polanco, CDMX';

  // Interactive Before/After slider position
  const [sliderPos, setSliderPos] = useState(50);

  // Simulator State: carillas, invisalign, implantes
  const [selectedSimulatorKey, setSelectedSimulatorKey] = useState('carillas');

  // Quick 2-click booking state
  const [bookingTime, setBookingTime] = useState('11:00 AM');
  const [patientName, setPatientName] = useState('');

  const treatmentsSimulator = {
    carillas: {
      title: 'Diseño de Sonrisa con Carillas E-Max',
      sessions: '2 Sesiones Clínicas',
      recoveryTime: 'Inmediata (Sin reposo)',
      aestheticBenefit: 'Blancura permanente y corrección milimétrica de forma sin desgaste dental agresivo.',
      price: '$58,000 MXN (8 Carillas)',
      msi: '12 MSI de $4,833',
    },
    invisalign: {
      title: 'Ortodoncia Invisible Invisalign® Diamond',
      sessions: '1 Escaneo 3D + Revisiones Mensuales',
      recoveryTime: '0 Días (Alineadores removibles invisibles)',
      aestheticBenefit: 'Alineación dental perfecta sin brackets metálicos, imperceptible a 30 cm de distancia.',
      price: '$45,000 MXN Plan Completo',
      msi: '12 MSI de $3,750',
    },
    implantes: {
      title: 'Implante Guiado Straumann® de Titanio',
      sessions: '1 Sesión Quirúrgica + Colocación Corona',
      recoveryTime: '48 a 72 Horas',
      aestheticBenefit: 'Recuperación del 100% de la fuerza masticatoria y corona de zirconio idéntica a diente natural.',
      price: '$18,500 MXN por Pieza',
      msi: '12 MSI de $1,541',
    },
  };

  const currentSim = treatmentsSimulator[selectedSimulatorKey];

  const handleBooking = (customNote) => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `🦷 *VALORACIÓN DIGITAL - ${brandName.toUpperCase()}*%0A%0A• *Paciente:* ${patientName || 'Interesado en consulta'}%0A• *Tratamiento simulado:* ${currentSim.title}%0A• *Horario deseado:* ${bookingTime}%0A• *Ubicación:* ${brandCity}%0A${customNote ? `• *Nota:* ${customNote}%0A` : ''}%0A¿Me confirman cita para escaneo 3D iTero sin costo?`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] text-slate-800 font-clinical selection:bg-[#0284C7] selection:text-white">
      <DemoConversionBar
        currentKey="dental"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP STATUS BAR */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 px-6 py-2.5 text-xs text-slate-600 flex justify-between items-center max-w-7xl mx-auto rounded-b-[32px]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-slate-800">{brandCity}</span>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <span className="hidden sm:inline">Escaneo Intraoral iTero Element 5D</span>
          <span className="text-[#0284C7] font-bold">12 Meses Sin Intereses Disponibles</span>
        </div>
      </div>

      {/* MAIN HERO: ASYMMETRICAL 5-BOX APPLE BENTO GRID */}
      <section className="py-10 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* CAJA 1: Propuesta de Valor (Col 7) */}
          <div className="md:col-span-7 bg-white/90 backdrop-blur-md rounded-[32px] p-8 sm:p-12 border border-white shadow-xl shadow-blue-500/5 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0284C7] px-3.5 py-1 rounded-full text-xs font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Odontología Digital de Alta Especialidad en Polanco</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-4">
                Diseño de Sonrisa 3D y Odontología de Élite.
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                En {brandName} simulamos tu resultado final en pantalla antes de iniciar. Carillas ultradelgadas de 0.3mm, alineación invisible y máxima precisión sin moldes incómodos.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleBooking('Solicita escaneo 3D')}
                className="bg-[#0284C7] hover:bg-[#0369a1] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                <span>Agendar Escaneo 3D Gratuito</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Garantía por escrito de 5 años</span>
              </div>
            </div>
          </div>

          {/* CAJA 2: Widget Antes / Después con Slider (Col 5) */}
          <div className="md:col-span-5 bg-white/90 backdrop-blur-md rounded-[32px] p-6 border border-white shadow-xl shadow-blue-500/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Caso Clínico Real Polanco
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold">
                  Carillas Cerámicas E-Max
                </span>
              </div>

              {/* Interactive Before/After Visual Slider */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 select-none mb-3">
                {/* "After" Image */}
                <img
                  src="/images/dental.webp"
                  alt="Resultado sonrisa blanca"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-110 contrast-105"
                />

                {/* "Before" Image */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src="/images/dental.webp"
                    alt="Antes del tratamiento"
                    className="absolute inset-0 w-full h-full object-cover filter sepia-[0.3] brightness-90 saturate-75 max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <span className="absolute bottom-3 left-3 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                    ANTES
                  </span>
                </div>

                <span className="absolute bottom-3 right-3 bg-[#0284C7] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                  DESPUÉS
                </span>

                {/* Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center text-[#0284C7] text-xs font-bold border border-slate-200">
                    ⇄
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400 font-medium">Antes</span>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="flex-1 accent-[#0284C7] cursor-pointer"
                />
                <span className="text-[11px] text-slate-400 font-medium">Después</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Desliza el control para comparar el antes y después en tono y simetría dental.
            </p>
          </div>

          {/* CAJA 3: Score 4.9★ en Polanco (Col 4) */}
          <div className="md:col-span-4 bg-white/90 backdrop-blur-md rounded-[32px] p-6 border border-white shadow-xl shadow-blue-500/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl font-bold">
                ★
              </div>
              <div>
                <div className="flex items-center gap-1 text-slate-900 font-black text-lg">
                  <span>4.99</span>
                  <span className="text-amber-500 text-sm">★★★★★</span>
                </div>
                <div className="text-xs text-slate-500">2,380+ Reseñas Verificadas Google</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#0284C7] bg-blue-50 px-2.5 py-1 rounded-full">
              Polanco
            </span>
          </div>

          {/* CAJA 4: Certificaciones de Élite (Col 4) */}
          <div className="md:col-span-4 bg-white/90 backdrop-blur-md rounded-[32px] p-6 border border-white shadow-xl shadow-blue-500/5 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Certificación ADM & Invisalign Diamond</div>
              <div className="text-xs text-slate-500">Especialistas con posgrado internacional y tecnología suiza Straumann</div>
            </div>
          </div>

          {/* CAJA 5: Agendador Rápido en 2 Clics (Col 4) */}
          <div className="md:col-span-4 bg-[#0F172A] text-white rounded-[32px] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Agendar en 2 Clics
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full">
                  Hoy Disponible
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 my-3">
                {['11:00 AM', '01:30 PM', '04:00 PM'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setBookingTime(t)}
                    className={`py-1.5 text-center rounded-xl text-xs font-semibold transition-all ${
                      bookingTime === t
                        ? 'bg-[#0284C7] text-white font-bold shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleBooking(`Cita para las ${bookingTime}`)}
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Confirmar a las {bookingTime}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* EXCLUSIVE WIDGET: SIMULADOR / COMPARADOR DE SONRISA (CARILLAS, INVISALIGN, IMPLANTES) */}
      <section className="py-14 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0284C7] block mb-2">
            Simulador de Tratamiento
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Compara Tiempos de Recuperación & Beneficio Estético
          </h2>
        </div>

        {/* 3-Way Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {[
            { key: 'carillas', label: 'Carillas Cerámicas E-Max' },
            { key: 'invisalign', label: 'Invisalign® Diamond' },
            { key: 'implantes', label: 'Implantes Guiados Straumann®' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedSimulatorKey(tab.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                selectedSimulatorKey === tab.key
                  ? 'bg-[#0284C7] text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-blue-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Simulator Spec Box */}
        <div className="bg-white/95 backdrop-blur-md rounded-[32px] p-8 sm:p-10 border border-white shadow-xl shadow-blue-500/5 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="p-4 bg-blue-50 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
              Sesiones Requeridas
            </span>
            <div className="text-slate-900 font-extrabold text-lg">{currentSim.sessions}</div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
              Tiempo de Recuperación
            </span>
            <div className="text-emerald-800 font-extrabold text-lg">{currentSim.recoveryTime}</div>
          </div>

          <div className="p-4 bg-purple-50 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
              Inversión & Facilidad
            </span>
            <div className="text-purple-900 font-extrabold text-lg">{currentSim.msi}</div>
          </div>

          <div className="md:col-span-3 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-500 block">Beneficio Estético Principal:</span>
              <p className="text-sm text-slate-800 font-medium max-w-xl">{currentSim.aestheticBenefit}</p>
            </div>
            <button
              onClick={() => handleBooking(`Simulador: ${currentSim.title}`)}
              className="bg-[#0284C7] hover:bg-[#0369a1] text-white px-6 py-3 rounded-full text-xs font-bold transition-all shrink-0 self-start sm:self-auto"
            >
              Solicitar Plan con este Tratamiento →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-white border-t border-blue-100 text-center text-xs text-slate-500 rounded-t-[32px]">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-bold text-slate-900 text-base">{brandName}</div>
          <p>{brandCity} · Campos Elíseos & Masaryk, Polanco</p>
          <p className="text-[10px]">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
