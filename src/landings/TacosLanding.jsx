import React, { useState } from 'react';
import {
  Flame,
  Star,
  Utensils,
  Clock,
  MapPin,
  Phone,
  Calendar,
  Users,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  FileText,
  Download,
  Plus,
  Minus,
  Trash2,
  X,
  ArrowRight
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TacosLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'El Pastor Sagrado';
  const brandCity = city || 'Roma Norte & Condesa, CDMX';

  const [activeTab, setActiveTab] = useState('trompo');
  const [guestCount, setGuestCount] = useState(35);
  const [reservationSent, setReservationSent] = useState(false);
  const [reservation, setReservation] = useState({ name: '', date: '', time: '20:00', people: '2' });

  // 1. Delivery Cart State
  const [deliveryCart, setDeliveryCart] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState('Habanero Tatemado');
  const [selectedColonia, setSelectedColonia] = useState('Roma Norte');
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  const COLONIA_DELIVERY_FEES = {
    'Roma Norte': 35,
    'Condesa': 40,
    'Del Valle': 50,
    'Narvarte': 45,
    'Juárez': 40,
    'Polanco': 65,
  };

  const menu = {
    trompo: [
      { id: 't1', name: 'Taco al Pastor Tradicional', desc: 'Carne marinada con achiote yucateco, piña miel asada, cilantro y cebolla.', price: 35, popular: false },
      { id: 't2', name: 'Costra de Pastor con Queso Menonita', desc: 'Chicharrón crujiente de queso fundido relleno de pastor jugoso en harina.', price: 85, popular: true },
      { id: 't3', name: 'Volcán de Pastor Negro Oaxaqueño', desc: 'Tostada raspada al comal con frijoles refritos con hoja de aguacate.', price: 78, popular: false },
      { id: 't4', name: 'Gringa Monumental de Pastor', desc: 'Doble tortilla de harina con queso Chihuahua derretido, pastor y piña.', price: 95, popular: false },
    ],
    cortes: [
      { id: 'c1', name: 'Taco de Rib Eye con Tuétano Asado', desc: 'Corte Prime al carbón con tuétano a las brasas y sal marina de Colima.', price: 145, popular: true },
      { id: 'c2', name: 'Arrachera Marinada con Cebollitas', desc: 'Arrachera suave al carbón de mezquite con chiles toreados.', price: 85, popular: false },
      { id: 'c3', name: 'Gaonera de Filete con Chicharrón', desc: 'Filete de res a la plancha con polvo crocante de chicharrón de la Ramos.', price: 110, popular: false },
    ],
    mezcal: [
      { id: 'm1', name: 'Paloma Negra con Sal de Gusano', desc: 'Tequila blanco, toronja natural, carbón activado y escarchado de sal de chinicuil.', price: 160, popular: false },
      { id: 'm2', name: 'Mezcalita de Maracuyá & Habanero', desc: 'Mezcal Espadín oaxaqueño, pulpa de maracuyá fresca y toque ligero de habanero.', price: 175, popular: true },
      { id: 'm3', name: 'Carajillo Mazapán Azteca', desc: 'Licor 43, espresso chiapaneco y crema de mazapán tradicional de la Rosa.', price: 180, popular: false },
    ],
  };

  // Add item to delivery cart
  const handleAddDish = (dish) => {
    setDeliveryCart((prev) => {
      const idx = prev.findIndex((i) => i.id === dish.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].qty += 1;
        return copy;
      }
      return [...prev, { ...dish, qty: 1 }];
    });
    setIsDeliveryOpen(true);
  };

  const handleUpdateCartQty = (id, delta) => {
    setDeliveryCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const cartFoodSubtotal = deliveryCart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = deliveryCart.length > 0 ? (COLONIA_DELIVERY_FEES[selectedColonia] || 40) : 0;
  const deliveryTotal = cartFoodSubtotal + deliveryFee;

  // Taquiza Catering Calculations
  const pastorKilos = Math.round(guestCount * 0.35); // ~350g por persona
  const taqueroHours = guestCount > 50 ? 4 : 3;
  const complements = 'Salsas (Verde, Roja, Morita), Piña, Cebolla, Cilantro, Tortillas Nixtamalizadas, Frijoles Charros y Limones';
  const cateringTotal = Math.round(guestCount * 145); // $145 MXN por persona

  // Generate formal PDF quotation simulation / text file
  const handleDownloadQuotationPDF = () => {
    const textContent = `
=====================================================
COTIZACIÓN FORMAL DE TAQUIZA PARA EVENTOS
TAQUERÍA: ${brandName.toUpperCase()}
UBICACIÓN: ${brandCity}
=====================================================
Fecha de emisión: ${new Date().toLocaleDateString('es-MX')}
Folio de Cotización: TQZ-${Math.floor(1000 + Math.random() * 9000)}

DETALLE DEL EVENTO:
• Número de invitados: ${guestCount} personas
• Kilos de Pastor al Carbón: ${pastorKilos} kg de carne marinada artesanal
• Horas de servicio con Taquero en Sitio: ${taqueroHours} horas
• Barra de Complementos: ${complements}
• Equipo en sitio: Trompo de acero inoxidable, comal y platos biodegradables

DESGLOSE FINANCIERO:
• Costo base por invitado: $145.00 MXN
• Subtotal Taquiza: $${cateringTotal.toLocaleString('es-MX')}.00 MXN
• Montaje y traslado en zona metropolitana: INCLUIDO
-----------------------------------------------------
TOTAL FINAL DE LA COTIZACIÓN: $${cateringTotal.toLocaleString('es-MX')}.00 MXN
(Precios sujetos a confirmación con anticipo del 30%)
=====================================================
Para formalizar contrato, contáctanos vía WhatsApp al 55 1234 5678.
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cotizacion_Taquiza_${guestCount}_Personas_${brandName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const whatsappCateringMessage = encodeURIComponent(
    `¡Hola ${brandName}! Solicito formalizar mi cotización de Taquiza para Eventos:\n\n• Invitados: ${guestCount} personas\n• Pastor requerido: ${pastorKilos} kg\n• Taquero en sitio: ${taqueroHours} horas\n• Ubicación: ${brandCity}\n• Total estimado: $${cateringTotal} MXN\n\n¿Tienen la fecha disponible?`
  );

  const whatsappDeliveryMessage = encodeURIComponent(
    `¡Hola ${brandName}! Quiero pedir mi orden de Delivery Nocturno:\n\n${deliveryCart.map(i => `• ${i.qty}x ${i.name} ($${i.price * i.qty} MXN)`).join('\n')}\n\n• Salsa elegida: ${selectedSauce}\n• Colonia de entrega: ${selectedColonia} (Envío: $${deliveryFee} MXN)\n• TOTAL A PAGAR: $${deliveryTotal} MXN`
  );

  return (
    <div className="min-h-screen bg-[#0C0708] text-stone-100 font-sans selection:bg-rose-500/30 relative">
      {/* Demo Conversion Bar */}
      <DemoConversionBar
        currentKey="tacos"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-rose-200 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-rose-800/40 flex items-center justify-center gap-2">
        <Flame className="w-4 h-4 text-amber-400" />
        <span>Votada Mejor Taquería en {brandCity} • Abierto hasta 3:00 AM • Servicio de Delivery Nocturno</span>
      </div>

      {/* Header */}
      <header className="sticky top-[49px] z-40 bg-[#0C0708]/90 backdrop-blur-md border-b border-rose-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-rose-300 border border-rose-500/30 flex items-center gap-1.5 transition-colors"
              >
                ← Volver al Portal
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌮</span>
              <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white">
                {brandName}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-stone-300 font-medium">
            <a href="#menu" className="hover:text-rose-400 transition-colors">Menú de Trompo</a>
            <a href="#catering" className="hover:text-rose-400 transition-colors">Cotizador de Taquizas</a>
            <a href="#ubicacion" className="hover:text-rose-400 transition-colors">Ubicación</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDeliveryOpen(true)}
              className="relative px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-900/30 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Delivery Nocturno</span>
              {deliveryCart.length > 0 && (
                <span className="bg-white text-rose-950 font-black text-xs px-1.5 py-0.5 rounded-full">
                  {deliveryCart.reduce((sum, i) => sum + i.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-600/40 text-rose-300 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> 4.9 Estrellas en Google Maps ({brandCity})
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.08] tracking-tight">
              Tacos al carbón, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-400 to-orange-500">
                trompo de autor &amp; mezcal
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              La consagración del taco en {brandCity}. Carne marinada en receta secreta con 12 especias, tortillas hechas a mano al momento y salsa tatemada en molcajete volcánico.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catering"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-rose-900/30 transition-all"
              >
                <span>Cotizar Taquiza para Evento</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#menu"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Ver Menú Digital
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-rose-500/30 shadow-[0_20px_70px_rgba(244,63,94,0.2)]">
              <img
                src="/images/tacos.webp"
                alt="Tacos al Pastor CDMX"
                loading="lazy"
                decoding="async"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0708] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-rose-500/20 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 text-xs font-bold block">Trompo a la Leña</span>
                  <span className="text-xs text-stone-300">Carne 100% de Cerdo Certificada</span>
                </div>
                <div className="text-right">
                  <span className="text-rose-400 font-bold text-xs">Abierto hasta 3 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menú Section with Delivery Add button */}
      <section id="menu" className="py-16 px-6 bg-[#0E090B] border-t border-rose-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                Menú de la Casa
              </span>
              <h2 className="text-3xl font-black text-white mt-1">
                Especialidades de {brandName}
              </h2>
            </div>

            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              {[
                { id: 'trompo', label: 'Al Pastor' },
                { id: 'cortes', label: 'Cortes Finos' },
                { id: 'mezcal', label: 'Mixología & Mezcal' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-rose-600 text-white shadow'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menu[activeTab].map((dish) => (
              <div
                key={dish.id}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4 hover:border-rose-500/40 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-white text-sm">{dish.name}</h3>
                    {dish.popular && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                        Top Favorito
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">{dish.desc}</p>
                  <span className="font-mono text-amber-400 font-extrabold text-sm block mt-2">
                    ${dish.price} MXN
                  </span>
                </div>

                <button
                  onClick={() => handleAddDish(dish)}
                  className="px-3.5 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all flex-shrink-0 border border-rose-500/30"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Pedir</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Calculadora de Taquizas para Eventos + PDF Formal Download */}
      <section id="catering" className="py-20 px-6 bg-gradient-to-b from-[#0E090B] to-[#080506] border-t border-rose-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
              Taquizas a Domicilio en CDMX
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Calcula tu Evento en Tiempo Real
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Llevamos el trompo de pastor, taquero profesional en sitio y barra libre de salsas y complementos.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-rose-500/30 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="text-xs font-bold text-stone-300 block">
                  Número de Invitados:
                </label>
                <span className="text-xs text-stone-400">Recomendado para fiestas, cumpleaños y corporativos</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-rose-400" />
                <span className="font-mono text-3xl font-black text-white">{guestCount}</span>
                <span className="text-xs text-stone-400">personas</span>
              </div>
            </div>

            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />

            {/* Event Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                <span className="text-[10px] text-stone-400 uppercase block font-bold">Carne al Pastor</span>
                <span className="text-base font-black text-white font-mono mt-1 block">{pastorKilos} kg</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                <span className="text-[10px] text-stone-400 uppercase block font-bold">Taquero en Sitio</span>
                <span className="text-base font-black text-white font-mono mt-1 block">{taqueroHours} horas</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                <span className="text-[10px] text-stone-400 uppercase block font-bold">Precio / Persona</span>
                <span className="text-base font-black text-[#00F59B] font-mono mt-1 block">$145 MXN</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                <span className="text-[10px] text-stone-400 uppercase block font-bold">Total Estimado</span>
                <span className="text-base font-black text-amber-400 font-mono mt-1 block">${cateringTotal.toLocaleString('es-MX')} MXN</span>
              </div>
            </div>

            {/* Action Buttons: PDF Download + WhatsApp Order */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleDownloadQuotationPDF}
                className="flex-1 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-white/10"
              >
                <Download className="w-4 h-4 text-rose-400" />
                <span>Descargar Cotización Formal</span>
              </button>

              <a
                href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappCateringMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-900/30 transition-all"
              >
                <span>Apartar Fecha por WhatsApp (${cateringTotal} MXN)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Cart Drawer */}
      {isDeliveryOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#120B0D] border-l border-white/15 h-full flex flex-col p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-rose-500" />
                <h3 className="text-white font-black text-lg">Delivery Nocturno</h3>
              </div>
              <button onClick={() => setIsDeliveryOpen(false)} className="p-1.5 text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {deliveryCart.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs">
                  Aún no has agregado tacos a tu orden.
                </div>
              ) : (
                deliveryCart.map((dish) => (
                  <div key={dish.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-white text-xs font-bold">{dish.name}</h4>
                      <span className="text-amber-400 font-mono text-xs">${dish.price * dish.qty} MXN</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1 border border-white/10">
                      <button onClick={() => handleUpdateCartQty(dish.id, -1)} className="p-1 text-stone-400 hover:text-white">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs text-white font-bold px-1.5">{dish.qty}</span>
                      <button onClick={() => handleUpdateCartQty(dish.id, 1)} className="p-1 text-stone-400 hover:text-white">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Selector de Salsas */}
              {deliveryCart.length > 0 && (
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-300 block mb-1">
                      Selecciona tu Salsa Artesanal de Cortesía:
                    </label>
                    <select
                      value={selectedSauce}
                      onChange={(e) => setSelectedSauce(e.target.value)}
                      className="w-full bg-[#1C1214] border border-white/15 text-white text-xs rounded-xl p-2.5 outline-none"
                    >
                      <option value="Habanero Tatemado">Habanero Tatemado (Muy Picante 🔥🔥)</option>
                      <option value="Morita con Ajo">Salsa Morita con Ajo Asado (Picor Medio 🔥)</option>
                      <option value="Verde Cruda de Aguacate">Verde Cruda con Aguacate (Suave)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-300 block mb-1">
                      Colonia de Entrega (Cálculo de Envío):
                    </label>
                    <select
                      value={selectedColonia}
                      onChange={(e) => setSelectedColonia(e.target.value)}
                      className="w-full bg-[#1C1214] border border-white/15 text-white text-xs rounded-xl p-2.5 outline-none"
                    >
                      {Object.entries(COLONIA_DELIVERY_FEES).map(([col, fee]) => (
                        <option key={col} value={col}>{col} (+$ {fee} MXN)</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {deliveryCart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="space-y-1 text-xs text-stone-400">
                  <div className="flex justify-between">
                    <span>Subtotal Platillos:</span>
                    <span className="font-mono text-white">${cartFoodSubtotal} MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío a {selectedColonia}:</span>
                    <span className="font-mono text-white">${deliveryFee} MXN</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-1 border-t border-white/5">
                    <span>Total a Pagar:</span>
                    <span className="font-mono text-[#00F59B] text-xl font-black">${deliveryTotal} MXN</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappDeliveryMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Confirmar Pedido vía WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-stone-500 border-t border-rose-900/20">
        <p>© 2026 {brandName} • Tradición y Pasión Taquera en {brandCity}.</p>
      </footer>
    </div>
  );
}
