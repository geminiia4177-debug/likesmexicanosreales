import React, { useState } from 'react';
import {
  Flame,
  Star,
  Utensils,
  Clock,
  MapPin,
  Phone,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Check,
  Zap,
  RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TacosLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'TAQUERÍA EL PASTOR SAGRADO';
  const brandCity = city || 'Roma Norte · Condesa · Narvarte, CDMX';

  // Tabs: pastor, suadero, birria, gringas
  const [activeTab, setActiveTab] = useState('pastor');

  // Order state
  const [orderItems, setOrderItems] = useState([
    { id: 'pastor_orden', name: 'Orden de Pastor con Piña (3 Tacos)', price: 95, qty: 2 },
    { id: 'suadero_taco', name: 'Taco de Suadero en Cobre', price: 38, qty: 3 },
  ]);
  const [selectedSalsa, setSelectedSalsa] = useState('Habanero Tatemado');

  const menuCatalog = {
    pastor: [
      { id: 'pastor_orden', name: 'Orden de Pastor con Piña (3 Tacos)', desc: 'Carne adobada en trompo de carbón de encino, cebolla morada y piña miel asada.', price: 95 },
      { id: 'pastor_volcan', name: 'Volcán de Pastor con Costra', desc: 'Tortilla de maíz tostada al comal con costra de queso Oaxaca derretido.', price: 58 },
      { id: 'pastor_kilo', name: '1/2 Kilo de Pastor para Taquiza', desc: 'Incluye 20 tortillas calientes, salsas, cebollitas cambray y limones.', price: 290 },
    ],
    suadero: [
      { id: 'suadero_taco', name: 'Taco de Suadero en Cobre', desc: 'Confitado 8 horas en manteca aromática, orillas doradas y centro suave.', price: 38 },
      { id: 'suadero_campechano', name: 'Campechano Suadero + Chicharrón', desc: 'Con chicharrón prensado crujiente al momento y toque de cilantro.', price: 45 },
      { id: 'suadero_orden', name: 'Trilogía de Suadero con Tuétano', desc: '3 tacos de suadero montados sobre canoa de tuétano a la brasa.', price: 165 },
    ],
    birria: [
      { id: 'quesabirria', name: 'Quesabirria Doradita con Consomé', desc: 'Tortilla bañada en adobo tatemado, queso asadero fundido y taza de consomé con garbanzo.', price: 68 },
      { id: 'taco_birria', name: 'Taco de Birria de Res Estilo Jalisco', desc: 'Carne deshebrada ultra jugosa con cebollita, cilantro y salsa brava.', price: 42 },
      { id: 'caldo_birria', name: 'Consomé Especial con Carne (Medio Litro)', desc: 'Caldillo concentrado de 14 especias y chiles secos con abundante carne.', price: 110 },
    ],
    gringas: [
      { id: 'gringa_clasica', name: 'Gringa Tradicional en Harina', desc: 'Doble tortilla de harina norteña, pastor al carbón y queso menonita fundido.', price: 75 },
      { id: 'gringa_sirloin', name: 'Gringa de Sirloin Black Angus', desc: 'Corte magro a la plancha con queso fundido y aguacate hass.', price: 95 },
      { id: 'gringa_costra', name: 'Costra Gringa Monstruosa', desc: 'Sin tortilla: costra pura de queso dorado rellena de pastor y piña.', price: 88 },
    ],
  };

  const addItem = (item) => {
    setOrderItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setOrderItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const subtotal = orderItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const deliveryFee = 35;
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

  const handleSendOrder = () => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const itemsList = orderItems.map((i) => `• ${i.qty}x ${i.name} ($${i.price * i.qty} MXN)`).join('%0A');
    const msg = `🌮 *PEDIDO TAQUERO - ${brandName.toUpperCase()}*%0A%0A${itemsList}%0A%0A🌶️ *Salsa:* ${selectedSalsa}%0A🛵 *Envío express:* $${deliveryFee} MXN%0A💰 *TOTAL A PAGAR:* $${total} MXN%0A📍 *Dirección de entrega:* (Confirmar colonia en ${brandCity})`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-brutalist selection:bg-[#FACC15] selection:text-black">
      <DemoConversionBar
        currentKey="tacos"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* DIAGONAL NEO-BRUTALIST TICKER MARQUEE */}
      <div className="bg-[#FACC15] border-y-4 border-black py-3 overflow-hidden whitespace-nowrap shadow-[0px_4px_0px_#000]">
        <div className="flex animate-marquee gap-8 font-black uppercase text-xl tracking-wider">
          <span>🌮 AUTÉNTICO SABOR DE BARRIO • TORTILLA RECIÉN HECHA</span>
          <span>★ TROMPO DE PASTOR AL CARBÓN 24/7</span>
          <span>🌶️ QUESABIRRIAS CON CONSOMÉ HIRVIENDO</span>
          <span>🌮 AUTÉNTICO SABOR DE BARRIO • TORTILLA RECIÉN HECHA</span>
          <span>★ TROMPO DE PASTOR AL CARBÓN 24/7</span>
        </div>
      </div>

      {/* HERO SECTION: ASYMMETRICAL NEO-BRUTALIST WITH GIANT PROMO PRICE */}
      <section className="relative px-4 sm:px-8 py-14 sm:py-20 max-w-7xl mx-auto overflow-hidden">
        {/* Floating Rotated Brutalist Badges */}
        <motion.div
          animate={{ rotate: [-4, -2, -4], y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="hidden md:block absolute top-8 right-12 z-20"
        >
          <div className="bg-[#E11D48] text-white font-black text-xl px-5 py-2.5 border-4 border-black shadow-[6px_6px_0px_#000] -rotate-3 uppercase tracking-wider">
            ¡Envío en menos de 30 min! ⚡
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (7 cols): Heavy brutalist typography + Giant promo price */}
          <div className="lg:col-span-7">
            <div className="inline-block bg-[#FACC15] border-3 border-black px-3 py-1 text-xs font-black uppercase mb-4 shadow-[3px_3px_0px_#000]">
              📍 Taquería de Barrio en {brandCity}
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.88] tracking-tight mb-6">
              {brandName}
            </h1>

            <p className="text-base sm:text-lg font-bold max-w-xl mb-6 leading-snug text-slate-900">
              Trompo de pastor ensartado a mano con carbón de encino, piña asada al vuelo y tortillas de maíz nixtamalizado hechas al comal.
            </p>

            {/* Giant Promo Price Box */}
            <div className="inline-flex items-center gap-4 p-4 bg-[#FACC15] border-4 border-black shadow-[6px_6px_0px_#000] mb-8">
              <span className="text-xs font-black uppercase">PROMO TAQUERA HOY:</span>
              <span className="text-4xl sm:text-5xl font-black">$38 MXN</span>
              <span className="text-xs font-black uppercase bg-[#E11D48] text-white px-2 py-1 border-2 border-black">
                PASTOR 2X1
              </span>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  const el = document.getElementById('armador-orden');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#E11D48] hover:bg-[#be123c] text-white px-8 py-4 text-lg font-black uppercase border-4 border-black shadow-[6px_6px_0px_#000] transition-all flex items-center gap-3"
              >
                <span>Armar Mi Orden Taquera</span>
                <ArrowRight className="w-6 h-6 stroke-[3]" />
              </button>

              <button
                onClick={handleSendOrder}
                className="bg-white hover:bg-[#FFF8E7] text-black px-6 py-4 text-base font-black uppercase border-4 border-black shadow-[6px_6px_0px_#000] flex items-center gap-2"
              >
                <Phone className="w-5 h-5 stroke-[2.5]" />
                <span>Pedir Directo por WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Brutalist Frame with Real Photo */}
          <div className="lg:col-span-5 relative">
            <div className="border-4 border-black bg-white p-3 shadow-[10px_10px_0px_#000]">
              <div className="relative aspect-square overflow-hidden border-3 border-black">
                <img
                  src="/images/tacos.webp"
                  alt={brandName}
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute bottom-3 left-3 bg-[#FACC15] border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                  🌶️ 4 Salsas Tatemadas Incluidas
                </div>
              </div>
              <div className="pt-3 flex justify-between items-center text-xs font-black uppercase">
                <span>Servicio: Comedor & Domicilio</span>
                <span className="text-[#E11D48]">★★★★★ 4.9 (1,840 taqueros)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXCLUSIVE WIDGET: ARMADOR RÁPIDO DE ORDEN TAQUERA (PASTOR, SUADERO, BIRRIA, GRINGAS) */}
      <section id="armador-orden" className="py-16 px-4 sm:px-8 border-t-4 border-black bg-[#FFF7D6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="bg-black text-[#FACC15] px-3 py-1 text-xs font-black uppercase inline-block mb-2 shadow-[2px_2px_0px_#FACC15]">
                Armador Rápido de Orden
              </span>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
                Elige tus Tacos & Calcula tu Total
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Category Tabs (Pastor, Suadero, Birria, Gringas) */}
            <div className="lg:col-span-7">
              {/* Category Tab Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b-4 border-black pb-2 mb-6">
                {[
                  { key: 'pastor', label: '🥩 Pastor al Carbón' },
                  { key: 'suadero', label: '🥘 Suadero en Cobre' },
                  { key: 'birria', label: '🍲 Quesabirria & Consomé' },
                  { key: 'gringas', label: '🧀 Gringas & Costras' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`py-3 px-2 text-xs font-black uppercase border-3 border-black transition-all ${
                      activeTab === tab.key
                        ? 'bg-[#E11D48] text-white shadow-[4px_4px_0px_#000]'
                        : 'bg-white text-black hover:bg-slate-100 shadow-[2px_2px_0px_#000]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Items List for Active Tab */}
              <div className="space-y-4">
                {menuCatalog[activeTab].map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-base sm:text-lg font-black uppercase text-black">
                          {item.name}
                        </h4>
                        <span className="bg-[#FACC15] border-2 border-black text-xs font-black px-2 py-0.5">
                          ${item.price} MXN
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 max-w-md">{item.desc}</p>
                    </div>

                    <button
                      onClick={() => addItem(item)}
                      className="bg-black text-[#FACC15] hover:bg-slate-900 px-4 py-2 border-2 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#FACC15] flex items-center justify-center gap-1.5 self-end sm:self-auto shrink-0 transition-transform active:scale-95"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Agregar</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Live Receipt Order Box (Brutalist Ticket) */}
            <div className="lg:col-span-5 bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sticky top-20">
              <div className="flex justify-between items-center border-b-3 border-dashed border-black pb-3 mb-4">
                <div>
                  <h3 className="text-2xl font-black uppercase">Tu Orden Taquera</h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Ticket #{Math.floor(Math.random() * 8000 + 1000)} · Comanda Viva
                  </span>
                </div>
                <ShoppingBag className="w-6 h-6" />
              </div>

              {/* Items in ticket */}
              {orderItems.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500 font-black uppercase">
                  Agrega tacos de la cartelera de la izquierda para cotizar.
                </div>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-xs border-b border-slate-200 pb-2"
                    >
                      <div className="max-w-[180px]">
                        <div className="font-black uppercase truncate">{item.name}</div>
                        <div className="text-slate-500 text-[10px]">
                          ${item.price} x {item.qty} = ${item.price * item.qty} MXN
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-6 h-6 border-2 border-black bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-black font-mono w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-6 h-6 border-2 border-black bg-[#FACC15] hover:bg-yellow-400 flex items-center justify-center font-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Salsa Selection */}
              <div className="mb-4 pt-2 border-t-2 border-dashed border-black">
                <label className="text-[10px] font-black uppercase text-slate-700 block mb-1">
                  🌶️ Salsa para la comanda:
                </label>
                <select
                  value={selectedSalsa}
                  onChange={(e) => setSelectedSalsa(e.target.value)}
                  className="w-full bg-[#FFFDF5] border-2 border-black text-xs font-bold p-2 outline-none cursor-pointer"
                >
                  <option value="Habanero Tatemado">Habanero Tatemado Extra Bravo 🔥🔥🔥</option>
                  <option value="Verde de Aguacate Taquera">Verde de Aguacate con Cilantro 🥑</option>
                  <option value="Morita y Ajo Asado">Chile Morita y Ajo Asado 🌶️</option>
                  <option value="Cebollitas con Habanero y Limón">Cebollitas Moradas Encurtidas</option>
                </select>
              </div>

              {/* Math Totals */}
              <div className="space-y-1.5 border-t-3 border-dashed border-black pt-3 mb-6 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal Tacos:</span>
                  <span className="font-bold">${subtotal} MXN</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Envío a domicilio ({brandCity}):</span>
                  <span>${subtotal > 0 ? deliveryFee : 0} MXN</span>
                </div>
                <div className="flex justify-between font-black text-base pt-2 border-t-2 border-black text-black">
                  <span>TOTAL A PAGAR:</span>
                  <span className="bg-[#FACC15] px-2 py-0.5 border-2 border-black">${total} MXN</span>
                </div>
              </div>

              {/* Direct Order Button */}
              <button
                disabled={orderItems.length === 0}
                onClick={handleSendOrder}
                className="w-full bg-[#00F59B] hover:bg-[#00d885] text-black py-4 text-sm font-black uppercase border-4 border-black shadow-[6px_6px_0px_#000] flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-95"
              >
                <span>Enviar Orden por WhatsApp</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 px-4 sm:px-8 border-t-4 border-black text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-3xl font-black uppercase text-[#FACC15]">
            {brandName}
          </div>
          <div className="text-center md:text-right text-slate-400 text-xs">
            Abierto de Martes a Domingo de 18:00 a 04:00 hrs · {brandCity}
          </div>
        </div>
      </footer>
    </div>
  );
}
