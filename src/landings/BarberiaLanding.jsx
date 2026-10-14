import React, { useState } from 'react';
import {
  Scissors,
  Star,
  Clock,
  MapPin,
  Calendar,
  Check,
  Phone,
  ArrowRight,
  ShieldCheck,
  User,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function BarberiaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'THE GENTLEMEN & CO. BARBERSHOP';
  const brandCity = city || 'Roma Norte · Condesa, Ciudad de México';

  const barbers = [
    {
      id: 'mateo',
      name: 'Mateo "El Navaja" R.',
      role: 'Master Barber & Fade Specialist',
      exp: '11 años de oficio',
      status: 'Disponible Hoy 17:30',
      rating: '4.98 ★',
      avatar: 'MR',
    },
    {
      id: 'diego',
      name: 'Diego Valenzuela',
      role: 'Especialista en Ritual de Barba & Navaja Libre',
      exp: '8 años de oficio',
      status: 'Disponible Hoy 18:15',
      rating: '4.95 ★',
      avatar: 'DV',
    },
    {
      id: 'alejandro',
      name: 'Alejandro "Sandro" C.',
      role: 'Estilismo Clásico & Tijera Inglesa',
      exp: '14 años de oficio',
      status: 'Disponible Mañana 11:00',
      rating: '5.0 ★',
      avatar: 'AC',
    },
  ];

  const services = [
    { name: 'Corte Clásico a Tijera & Fade', price: 380, time: '45 MIN', desc: 'Lavado con tónico de menta, perfilado con navaja japonesa y cera mate de fijación fuerte.' },
    { name: 'Ritual de Barba con Toalla Caliente', price: 320, time: '35 MIN', desc: 'Vapor de ozono, aceites esenciales de cedro y bergamota, perfilado y masaje facial.' },
    { name: 'Servicio Imperial (Corte + Barba + Whisky)', price: 580, time: '75 MIN', desc: 'Experiencia completa de club privado con toalla caliente, exfoliación facial y destilado de cortesía.' },
    { name: 'Camuflaje de Canas & Tratamiento Capilar', price: 390, time: '30 MIN', desc: 'Matización sutil sin tonos rojizos y masaje descontracturante craneal.' },
  ];

  const [selectedBarberId, setSelectedBarberId] = useState('mateo');
  const [selectedService, setSelectedService] = useState(services[2]); // Imperial
  const [bookingTime, setBookingTime] = useState('17:30');
  const [clientName, setClientName] = useState('');

  const currentBarber = barbers.find((b) => b.id === selectedBarberId) || barbers[0];

  const handleConfirmBooking = () => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const msg = `💈 *RESERVA DE TURNO - ${brandName}*%0A%0A• *Cliente:* ${clientName || 'Cliente VIP'}%0A• *Servicio:* ${selectedService.name} ($${selectedService.price} MXN)%0A• *Maestro Barbero:* ${currentBarber.name}%0A• *Horario deseado:* Hoy a las ${bookingTime} hrs%0A• *Sucursal:* ${brandCity}%0A%0A¿Me confirman disponibilidad en el sillón?`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#EDE7DE] font-clinical selection:bg-[#D97706] selection:text-black">
      <DemoConversionBar
        currentKey="barberia"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* TOP HERITAGE EMBLEM STRIP */}
      <div className="border-b border-[#D97706]/30 bg-[#060608] py-2.5 px-6 flex items-center justify-between text-[11px] font-mono-tech tracking-[0.25em] text-[#C49B5B] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#D97706]"></span>
          <span>EST. 2018 · CLUB TRADICIONAL & BARBERÍA</span>
        </div>
        <div className="flex items-center gap-6">
          <span>{brandCity}</span>
          <span className="text-[#D97706] font-bold">WHISKY DE CORTESÍA EN CADA CITA</span>
        </div>
      </div>

      {/* HERO SECTION: ASYMMETRIC 65% / 35% SPLIT-SCREEN */}
      <section className="relative min-h-[90vh] border-b border-[#D97706]/30 grid grid-cols-1 lg:grid-cols-12">
        {/* Left 65% (8 cols): Dark Heritage Atmosphere */}
        <div className="lg:col-span-8 relative overflow-hidden flex flex-col justify-between p-8 sm:p-14 lg:p-20 border-b lg:border-b-0 lg:border-r border-[#D97706]/30 bg-[#09090B]">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/barberia.webp"
              alt={brandName}
              className="w-full h-full object-cover filter brightness-[0.32] contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-black/60" />
          </div>

          {/* Top Heritage Badge */}
          <div className="relative z-10">
            <span className="border border-[#D97706]/50 px-3.5 py-1 text-[10px] uppercase font-mono-tech tracking-[0.3em] text-[#D97706] bg-[#09090B]/90">
              Navajas de Autor & Toalla Caliente
            </span>
          </div>

          {/* Center Headline */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-2xl my-10"
          >
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-[#FAF6EE] leading-[0.95] tracking-tight uppercase mb-6">
              {brandName}
            </h1>
            <p className="text-sm sm:text-base text-[#BDB5A6] font-light leading-relaxed max-w-lg">
              Un santuario para el hombre que cuida su imagen. Sillones de cuero reclinables de época, destilados premium y el arte intemporal del afeitado tradicional con navaja libre.
            </p>
          </motion.div>

          {/* Bottom Triple Guarantee Metric */}
          <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-[#D97706]/30 pt-6 text-xs font-mono-tech text-[#A89F8F]">
            <div>
              <span className="text-white font-bold text-lg block font-editorial">4.98 ★</span>
              <span>1,240 OPINIONES 5 ESTRELLAS</span>
            </div>
            <div>
              <span className="text-white font-bold text-lg block font-editorial">100%</span>
              <span>NAVAJAS ESTERILIZADAS</span>
            </div>
            <div>
              <span className="text-white font-bold text-lg block font-editorial">30 DÍAS</span>
              <span>GARANTÍA DE IMAGEN</span>
            </div>
          </div>
        </div>

        {/* Right 35% (4 cols): Fixed Style Ticket Live Booking Panel */}
        <div className="lg:col-span-4 bg-[#0F0F12] p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 border-[#D97706]/30">
          <div>
            <div className="border-b border-[#D97706]/30 pb-4 mb-6">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-[#D97706] block mb-1">
                Agenda Oficial Directa
              </span>
              <h3 className="font-editorial text-2xl font-bold text-white uppercase">
                Reservar Turno
              </h3>
            </div>

            {/* Step 1: Select Barber */}
            <div className="mb-6">
              <label className="text-[10px] font-mono-tech uppercase tracking-widest text-[#A6977A] block mb-2">
                1. Maestro Barbero Asignado:
              </label>
              <div className="space-y-2">
                {barbers.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBarberId(b.id)}
                    className={`w-full text-left p-3 border transition-all flex items-center justify-between ${
                      selectedBarberId === b.id
                        ? 'border-[#D97706] bg-[#1C1710]'
                        : 'border-[#262422] hover:border-[#3D3A36] bg-[#0E0E12]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none border border-[#D97706]/50 flex items-center justify-center font-mono-tech text-xs font-bold text-[#D97706] bg-black">
                        {b.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{b.name}</div>
                        <div className="text-[10px] text-[#A6977A] font-mono-tech">{b.status}</div>
                      </div>
                    </div>
                    {selectedBarberId === b.id && <Check className="w-4 h-4 text-[#D97706]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Time Slots */}
            <div className="mb-6">
              <label className="text-[10px] font-mono-tech uppercase tracking-widest text-[#A6977A] block mb-2">
                2. Horario Disponible Hoy:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono-tech">
                {['16:30', '17:30', '18:15', '19:00', '19:45', '20:30'].map((timeSlot) => (
                  <button
                    key={timeSlot}
                    onClick={() => setBookingTime(timeSlot)}
                    className={`py-2 px-1 text-center border transition-all ${
                      bookingTime === timeSlot
                        ? 'border-[#D97706] bg-[#D97706] text-black font-bold'
                        : 'border-[#262422] hover:border-[#3D3A36] text-[#BBB]'
                    }`}
                  >
                    {timeSlot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Client Name */}
            <div className="mb-6">
              <label className="text-[10px] font-mono-tech uppercase tracking-widest text-[#A6977A] block mb-1">
                3. Nombre del Cliente:
              </label>
              <input
                type="text"
                placeholder="Ej: Ing. Roberto Garza"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#0E0E12] border border-[#2A2825] focus:border-[#D97706] p-2.5 text-xs text-white outline-none font-mono-tech"
              />
            </div>
          </div>

          {/* Confirm CTA */}
          <div className="border-t border-[#D97706]/30 pt-4 mt-4">
            <div className="flex justify-between items-center text-xs font-mono-tech mb-3">
              <span className="text-[#A6977A]">Total del servicio:</span>
              <span className="text-white font-bold text-sm font-editorial">
                ${selectedService.price} MXN
              </span>
            </div>
            <button
              onClick={handleConfirmBooking}
              className="w-full bg-[#D97706] hover:bg-[#b45309] text-black py-3.5 px-4 text-xs font-mono-tech uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Confirmar Reserva por WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* EXCLUSIVE WIDGET: TICKET DE CAJA CON LÍNEAS PUNTEADAS */}
      <section className="py-20 px-6 sm:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-mono-tech uppercase tracking-[0.3em] text-[#D97706] block mb-2">
            Ticket Oficial de Precios
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-white uppercase tracking-tight">
            Menú de Servicios Tradicionales
          </h2>
        </div>

        {/* Vintage Receipt Style Box */}
        <div className="border border-[#D97706]/40 bg-[#0E0E12] p-8 sm:p-12 shadow-2xl relative">
          <div className="space-y-6">
            {services.map((srv, idx) => {
              const isSelected = selectedService.name === srv.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedService(srv)}
                  className={`p-4 cursor-pointer transition-all border ${
                    isSelected
                      ? 'border-[#D97706] bg-[#1A1610]'
                      : 'border-transparent hover:border-[#2E2B27]'
                  }`}
                >
                  {/* Title and Dotted Price */}
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <span className="font-editorial text-xl sm:text-2xl text-[#FAF6EE] font-bold uppercase tracking-wide">
                      {srv.name}
                    </span>
                    <span className="flex-1 border-b border-dotted border-[#D97706]/40 mx-2 hidden sm:inline-block"></span>
                    <span className="font-mono-tech text-lg text-[#D97706] font-bold shrink-0">
                      ${srv.price} MXN
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#9E9584]">
                    <p className="max-w-xl">{srv.desc}</p>
                    <span className="font-mono-tech text-[10px] text-[#D97706] border border-[#D97706]/30 px-2 py-0.5 shrink-0 ml-4">
                      {srv.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center border-t border-[#D97706]/30 pt-6">
            <button
              onClick={handleConfirmBooking}
              className="bg-transparent hover:bg-[#D97706] text-[#D97706] hover:text-black border border-[#D97706] px-8 py-3 text-xs font-mono-tech uppercase tracking-[0.25em] transition-all"
            >
              Seleccionar este servicio y agendar →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-[#D97706]/30 text-center text-xs font-mono-tech text-[#8C8370]">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="font-editorial text-xl text-white uppercase">{brandName}</div>
          <p>{brandCity} · Horario: Lunes a Sábado de 10:00 a 21:00 hrs</p>
          <p className="text-[10px] text-[#5A5448]">© 2026 TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
