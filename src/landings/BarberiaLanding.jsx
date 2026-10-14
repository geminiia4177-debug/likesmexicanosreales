import React, { useState } from 'react';
import {
  Scissors,
  Flame,
  Star,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  ShoppingBag,
  ShieldCheck,
  Phone,
  ArrowRight,
  Download,
  Check,
  Sparkles
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function BarberiaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'El Barbero del Centro';
  const brandCity = city || 'Centro Histórico & Roma Norte, CDMX';

  const [selectedBarber, setSelectedBarber] = useState('Mateo');
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(2); // Combo Imperial default
  const [selectedBranch, setSelectedBranch] = useState('Centro Histórico');
  const [bookingSent, setBookingSent] = useState(false);
  const [booking, setBooking] = useState({ name: '', phone: '', date: '', time: '16:00' });

  // Sincronización Tienda de Pomadas con 10% OFF
  const [addPomade, setAddPomade] = useState(false);
  const [selectedPomadeIndex, setSelectedPomadeIndex] = useState(0);

  const services = [
    { name: 'Corte Clásico de Autor', price: 280, time: '40 min', desc: 'Degradado a navaja, lavado con champú refrescante y peinado con cera mate.' },
    { name: 'Ritual de Barba con Toalla Caliente', price: 240, time: '35 min', desc: 'Vapor de ozono, perfilado a navaja libre, toalla caliente aromática y óleo hidratante.' },
    { name: 'Combo Imperial (Corte + Barba + Cerveza)', price: 450, time: '65 min', desc: 'El servicio insignia: corte completo, ritual de barba, exfoliación facial y cerveza fría artesanal.', popular: true },
    { name: 'Camuflaje de Canas & Tinte', price: 320, time: '30 min', desc: 'Coloración sutil para barba o cabello con acabado 100% natural sin tonos rojizos.' },
  ];

  const products = [
    { name: 'Pomada Fijación Fuerte Base Agua (120g)', price: 290, scent: 'Madera & Bergamota' },
    { name: 'Óleo para Barba Crecimiento & Brillo (50ml)', price: 340, scent: 'Romero & Cedro Mexicano' },
    { name: 'Bálsamo Calmante After-Shave (100ml)', price: 260, scent: 'Menta & Eucalipto' },
  ];

  const currentService = services[selectedServiceIndex];
  const currentProduct = products[selectedPomadeIndex];

  // 10% discount on product if bundled
  const productDiscountedPrice = addPomade ? Math.round(currentProduct.price * 0.90) : 0;
  const totalAppointmentPrice = currentService.price + productDiscountedPrice;

  // Generate .ICS Calendar File
  const handleDownloadICS = () => {
    const appointmentDate = booking.date ? booking.date.replace(/-/g, '') : '20261020';
    const timeClean = booking.time ? booking.time.replace(':', '') + '00' : '160000';
    const dtStart = `${appointmentDate}T${timeClean}`;
    const dtEnd = `${appointmentDate}T${parseInt(timeClean) + 10000}`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LikesMexicanos//Barberia Appointment//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Cita en ${brandName}: ${currentService.name} con ${selectedBarber}
DESCRIPTION:Servicio: ${currentService.name} con el barbero ${selectedBarber}.${addPomade ? ` Incluye producto apartado: ${currentProduct.name} ($${productDiscountedPrice} MXN con 10% OFF).` : ''} Sede: ${selectedBranch}.
LOCATION:${brandName} - ${selectedBranch}, ${brandCity}
DTSTART:${dtStart}
DTEND:${dtEnd}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cita_${brandName.replace(/\s+/g, '_')}_${selectedBarber}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingSent(true);
  };

  const whatsappBookingMessage = encodeURIComponent(
    `¡Hola ${brandName}! Confirmé mi turno en la web:\n\n• Barbero: ${selectedBarber}\n• Servicio: ${currentService.name} ($${currentService.price} MXN)\n• Sede: ${selectedBranch} (${brandCity})\n• Fecha y Hora: ${booking.date || 'Hoy'} a las ${booking.time} hrs\n• Cliente: ${booking.name} (${booking.phone})\n${addPomade ? `• Producto apartado (10% OFF): ${currentProduct.name} ($${productDiscountedPrice} MXN)\n` : ''}• TOTAL A PAGAR EN CAJA: $${totalAppointmentPrice} MXN\n\n¿Me confirman recepción?`
  );

  return (
    <div className="min-h-screen bg-[#0A0706] text-[#E5DDD5] font-sans selection:bg-amber-600/40 relative">
      {/* Demo Conversion Bar */}
      <DemoConversionBar
        currentKey="barberia"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-200 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-amber-900/40 flex items-center justify-center gap-2">
        <Flame className="w-4 h-4 text-amber-400" />
        <span>Cerveza artesanal de cortesía en cada servicio • Sucursales en {brandCity} • Agenta turno en segundos</span>
      </div>

      {/* Header */}
      <header className="sticky top-[49px] z-40 bg-[#0A0706]/90 backdrop-blur-md border-b border-amber-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition-colors"
              >
                ← Volver al Portal
              </button>
            )}
            <div className="flex items-center gap-2">
              <Scissors className="w-6 h-6 text-amber-500" />
              <span className="font-serif tracking-widest text-lg sm:text-xl font-bold text-white uppercase">
                {brandName}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-stone-300 font-medium">
            <a href="#servicios" className="hover:text-amber-400 transition-colors">Servicios &amp; Precios</a>
            <a href="#agenda" className="hover:text-amber-400 transition-colors">Reservar Turno</a>
            <a href="#agenda" className="hover:text-amber-400 transition-colors">Pomadas &amp; Óleos (10% OFF)</a>
          </div>

          <a
            href="#agenda"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Cita</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> 4.96 en Google Reviews en {brandCity}
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-black text-white leading-[1.08] tracking-tight">
              Tradición a navaja, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">
                estilo impecable
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              El refugio del buen vestir y el cuidado masculino en {brandCity}. Sillones de piel genuina, toalla caliente con aceites esenciales, navaja libre y la mejor charla con tu barbero de confianza.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-lg pt-2 text-center text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-amber-900/40">
                <span className="block text-2xl font-black text-amber-400">10 Años</span>
                <span className="text-stone-400">De Tradición MX</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-amber-900/40">
                <span className="block text-2xl font-black text-amber-400">100%</span>
                <span className="text-stone-400">Navaja Desinfectada</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-amber-900/40">
                <span className="block text-2xl font-black text-amber-400">Gratis</span>
                <span className="text-stone-400">Bebida Artesanal</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#agenda"
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all"
              >
                <Calendar className="w-4 h-4" /> Agendar Mi Turno Ahora
              </a>
              <a
                href="#servicios"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                Ver Lista de Servicios
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_20px_70px_rgba(217,119,6,0.25)]">
              <img
                src="/images/barberia.webp"
                alt="Barbería Tradicional"
                loading="lazy"
                decoding="async"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0706] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-400 font-bold block">{selectedBranch}</span>
                  <span className="text-sm font-serif font-bold text-white">{brandCity}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-bold">Turnos Disponibles</span>
                  <span className="text-[10px] text-stone-400 block">Hoy hasta 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-6 bg-stone-950/80 border-t border-amber-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">Carta de Cuidado Masculino</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-white">Servicios &amp; Paquetes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                onClick={() => setSelectedServiceIndex(i)}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                  selectedServiceIndex === i
                    ? 'bg-amber-950/40 border-amber-500 shadow-xl shadow-amber-950/30 ring-1 ring-amber-500'
                    : 'bg-stone-900/70 border-stone-800 hover:border-amber-700/50'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {s.name}
                      {s.popular && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-stone-950">
                          Recomendado
                        </span>
                      )}
                    </h3>
                    <span className="text-amber-400 font-serif font-extrabold text-xl flex-shrink-0">${s.price} MXN</span>
                  </div>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-3">{s.desc}</p>
                </div>
                <div className="pt-3 border-t border-stone-800 flex justify-between items-center text-xs">
                  <span className="text-stone-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.time}</span>
                  <span className="text-amber-400 font-bold">
                    {selectedServiceIndex === i ? 'Seleccionado ✓' : 'Seleccionar →'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking with Pomade Sync & .ICS Generation */}
      <section id="agenda" className="py-20 px-6 max-w-3xl mx-auto">
        <div className="p-8 rounded-3xl bg-stone-900/90 border border-amber-900/40 shadow-2xl">
          <h3 className="text-2xl font-serif font-bold text-white mb-1 text-center">Reserva tu Cita sin Esperas</h3>
          <p className="text-stone-400 text-xs sm:text-sm text-center mb-6">Confirmación inmediata a tu WhatsApp con tu barbero favorito</p>

          {bookingSent ? (
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <div>
                <h4 className="text-xl font-bold text-white">¡Cita Registrada Exitosamente!</h4>
                <p className="text-xs text-stone-300 mt-1">
                  Tu barbero {selectedBarber} te espera en la sede {selectedBranch} a las {booking.time} hrs.
                </p>
                <div className="mt-3 p-3 bg-black/40 rounded-xl inline-block text-left text-xs font-mono text-stone-300">
                  <div>• Servicio: <strong>{currentService.name}</strong> (${currentService.price} MXN)</div>
                  {addPomade && <div>• Producto apartado: <strong>{currentProduct.name}</strong> (${productDiscountedPrice} MXN)</div>}
                  <div className="text-emerald-400 font-bold pt-1 border-t border-white/10 mt-1">
                    TOTAL A PAGAR: ${totalAppointmentPrice} MXN
                  </div>
                </div>
              </div>

              {/* 1-Click .ICS Download */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                <button
                  onClick={handleDownloadICS}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Descargar Calendario (.ICS)</span>
                </button>

                <a
                  href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappBookingMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow"
                >
                  <span>Abrir Confirmación en WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Nombre completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Hernández"
                    value={booking.name}
                    onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">WhatsApp de contacto</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 55 1234 5678"
                    value={booking.phone}
                    onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Barbero Favorito</label>
                  <select
                    value={selectedBarber}
                    onChange={(e) => setSelectedBarber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Mateo">Mateo (Master Fade &amp; Navaja)</option>
                    <option value="Don Chava">Don Chava (Clásico &amp; Barba Tradicional)</option>
                    <option value="Emilio">Emilio (Tendencias &amp; Texturizado)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Sede Elegida</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Centro Histórico">Sede Centro Histórico (Madero #54)</option>
                    <option value="Roma Norte">Sede Roma Norte (Colima #120)</option>
                    <option value="Condesa">Sede Condesa (Michoacán #33)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Hora</label>
                  <input
                    type="time"
                    required
                    value={booking.time}
                    onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-stone-800 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Sincronización de Tienda: Checkbox con 10% OFF */}
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addPomade}
                    onChange={(e) => setAddPomade(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-amber-500 rounded"
                  />
                  <div>
                    <span className="text-xs font-black text-amber-300 block">
                      ⚡ Apartar Pomada u Óleo con 10% OFF para recoger en mi cita
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Garantiza tu producto artesanal en recepción listo al terminar tu turno.
                    </span>
                  </div>
                </label>

                {addPomade && (
                  <div className="pt-2 pl-7 space-y-2">
                    <select
                      value={selectedPomadeIndex}
                      onChange={(e) => setSelectedPomadeIndex(Number(e.target.value))}
                      className="w-full bg-[#18110D] border border-amber-600/30 rounded-xl p-2 text-xs text-white outline-none"
                    >
                      {products.map((p, idx) => (
                        <option key={idx} value={idx}>
                          {p.name} — ${Math.round(p.price * 0.90)} MXN (Ahorras ${Math.round(p.price * 0.10)})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="p-3 bg-stone-950/70 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                <span className="text-stone-400">Total acumulado estimado:</span>
                <span className="font-mono text-amber-400 font-extrabold text-base">
                  ${totalAppointmentPrice} MXN
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                Confirmar Reserva con {selectedBarber} (${totalAppointmentPrice} MXN)
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-stone-500 border-t border-amber-900/30">
        <p>© 2026 {brandName} S.A. de C.V. • {brandCity}.</p>
      </footer>
    </div>
  );
}
