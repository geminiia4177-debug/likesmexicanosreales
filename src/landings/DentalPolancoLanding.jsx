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
  Sliders
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
  const [activeTreatmentKey, setActiveTreatmentKey] = useState('carillas');

  // Quick 2-click booking state
  const [bookingTime, setBookingTime] = useState('11:00 AM');
  const [patientName, setPatientName] = useState('');

  const treatments = {
    carillas: {
      name: 'Diseño con Carillas E-Max (8 Dientes)',
      sub: 'Lentes cerámicos de 0.3mm sin desgaste agresivo',
      price: '$58,000 MXN',
      msi: 'Hasta 12 MSI de $4,833',
    },
    invisalign: {
      name: 'Ortodoncia Invisible Invisalign® Diamond',
      sub: 'Alineadores transparentes escaneados en 3D con iTero',
      price: '$45,000 MXN',
      msi: 'Hasta 12 MSI de $3,750',
    },
    implante: {
      name: 'Implante Dental Guiado Straumann® Suiza',
      sub: 'Titanio grado médico con corona de zirconio monolítico',
      price: '$18,500 MXN',
      msi: 'Hasta 12 MSI de $1,541',
    },
  };

  const handleBooking = () => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `🦷 *VALORACIÓN 3D - ${brandName.toUpperCase()}*%0A%0A• *Paciente:* ${patientName || 'Interesado en consulta'}%0A• *Tratamiento:* ${treatments[activeTreatmentKey].name}%0A• *Horario deseado:* ${bookingTime}%0A• *Sucursal:* ${brandCity}%0A%0A¿Me confirman cita para escaneo digital con iTero?`;
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

      {/* TOP CLINICAL STATUS BAR */}
      <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 px-6 py-2 text-xs text-slate-600 flex justify-between items-center max-w-7xl mx-auto rounded-b-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-700">{brandCity}</span>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <span className="hidden sm:inline">Escaneo Digital 3D sin moldes pastosos</span>
          <span className="text-[#0284C7] font-bold">12 MSI con Todas las Tarjetas</span>
        </div>
      </div>

      {/* MAIN HERO: ASYMMETRICAL 5-MODULE APPLE BENTO GRID */}
      <section className="py-10 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* MÓDULO 1: Promesa Principal (Col 7) */}
          <div className="md:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-blue-100 shadow-xl shadow-blue-500/5 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0284C7] px-3 py-1 rounded-full text-xs font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Odontología Digital de Alta Especialidad</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-4">
                La sonrisa que siempre soñaste, simulada en 3D antes de tocar un diente.
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                En {brandName} combinamos escaneo intraoral iTero, carillas cerámicas de 0.3mm y especialistas certificados para darte un resultado natural y armónico.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={handleBooking}
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

          {/* MÓDULO 2: Comparador interactivo Antes / Después con Slider (Col 5) */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-blue-100 shadow-xl shadow-blue-500/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Caso Clínico Real Polanco
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold">
                  Carillas E-Max
                </span>
              </div>

              {/* Interactive Before/After Visual Slider */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 select-none mb-3">
                {/* "After" Image (Underneath) */}
                <img
                  src="/images/dental.webp"
                  alt="Resultado sonrisa blanca"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-110 contrast-105"
                />

                {/* "Before" Image (Clipped by slider) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src="/images/dental.webp"
                    alt="Antes del tratamiento"
                    className="absolute inset-0 w-full h-full object-cover filter sepia-[0.35] brightness-90 saturate-80 max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                    ANTES
                  </span>
                </div>

                <span className="absolute bottom-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
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

              {/* Slider Input Controller */}
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

            <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
              Desliza para ver la transformación estética de sonrisa en 2 sesiones sin dolor.
            </p>
          </div>

          {/* MÓDULO 3: Badge Reseñas Verificadas de Google (Col 4) */}
          <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-blue-100 shadow-xl shadow-blue-500/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl font-bold">
                ★
              </div>
              <div>
                <div className="flex items-center gap-1 text-slate-900 font-black text-lg">
                  <span>4.99</span>
                  <span className="text-amber-500 text-sm">★★★★★</span>
                </div>
                <div className="text-xs text-slate-500">2,380+ Reseñas Verificadas</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
              Google Maps
            </span>
          </div>

          {/* MÓDULO 4: Ubicación Polanco & Horarios (Col 4) */}
          <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-blue-100 shadow-xl shadow-blue-500/5 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0284C7] flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">{brandCity}</div>
              <div className="text-xs text-slate-500">Valet Parking & Suites VIP Privadas</div>
            </div>
          </div>

          {/* MÓDULO 5: Agendador en 2 clics (Col 4) */}
          <div className="md:col-span-4 bg-[#0F172A] text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between">
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
              onClick={handleBooking}
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Confirmar a las {bookingTime}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2: INTEGRATED TREATMENTS & PRICING TRANSPARENCY */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Tratamientos Estéticos y Restaurativos
          </h2>
          <p className="text-sm text-slate-600 mt-1">Precios transparentes sin costos ocultos en consulta.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(treatments).map((key) => {
            const item = treatments[key];
            const isSelected = activeTreatmentKey === key;
            return (
              <div
                key={key}
                onClick={() => setActiveTreatmentKey(key)}
                className={`bg-white rounded-3xl p-7 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#0284C7] shadow-xl shadow-blue-500/10 ring-2 ring-[#0284C7]/20'
                    : 'border-blue-100 shadow-md hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-[#0284C7] bg-blue-50 px-2.5 py-1 rounded-full">
                      {item.msi}
                    </span>
                    {isSelected && <Check className="w-5 h-5 text-[#0284C7] stroke-[3]" />}
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900 mb-2">{item.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{item.sub}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div className="font-black text-xl text-slate-900">{item.price}</div>
                  <button
                    onClick={handleBooking}
                    className="text-xs font-bold text-[#0284C7] hover:underline"
                  >
                    Agendar este →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-white border-t border-blue-100 text-center text-xs text-slate-500 rounded-t-3xl">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-bold text-slate-900 text-base">{brandName}</div>
          <p>{brandCity} · Especialistas certificados ante la Asociación Dental Mexicana</p>
          <p className="text-[10px]">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
