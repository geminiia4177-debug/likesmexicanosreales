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
import { motion, AnimatePresence } from 'framer-motion';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function TacosLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'Los Auténticos del Pastor Sagrado';
  const brandCity = city || 'Roma Norte · Condesa · Narvarte, CDMX';

  const [activeMenuTab, setActiveMenuTab] = useState('tacos');
  const [orderItems, setOrderItems] = useState([
    { id: 'pastor', name: 'Taco de Pastor con Piña (Orden 3)', price: 95, qty: 2 },
    { id: 'suadero', name: 'Taco de Suadero Confitado', price: 38, qty: 3 },
  ]);
  const [selectedSalsa, setSelectedSalsa] = useState('Habanero Tatemado 🔥🔥🔥');

  const menuItems = {
    tacos: [
      { id: 'pastor', name: 'Taco de Pastor con Piña (Orden 3)', desc: 'Carne adobada en trompo de carbón, cilantro fresco y piña miel', price: 95 },
      { id: 'suadero', name: 'Taco de Suadero Confitado', desc: 'Cocido 8 horas en comal de cobre, suave y crujiente en las orillas', price: 38 },
      { id: 'costilla', name: 'Volcán de Costilla con Queso Oaxaca', desc: 'Tortilla de maíz tatemada con costra de queso fundido y aguacate', price: 55 },
      { id: 'campechano', name: 'Taco Campechano (Bistec + Chicharrón)', desc: 'Combinación tradicional con chicharrón prensado crujiente', price: 42 },
    ],
    paquetes: [
      { id: 'paquete_taquero', name: '🔥 Paquete Taquero Familiar (20 Tacos)', desc: '10 Pastor + 5 Suadero + 5 Bistec + 1 Litro de Agua de Horchata', price: 480 },
      { id: 'paquete_amigos', name: '🔥 Combo Taquiza Godín (12 Tacos)', desc: '6 Pastor + 6 Suadero + Frijoles Charros con tocino', price: 290 },
      { id: 'combo_quesos', name: 'Combo Gringas & Costras (4 Piezas)', desc: '2 Gringas de pastor en harina + 2 Volcanes con queso menonita', price: 220 },
    ],
    bebidas: [
      { id: 'horchata', name: 'Agua de Horchata con Canela (1 Litro)', desc: 'Arroz remojado artesanal con toque de vainilla de Papantla', price: 65 },
      { id: 'jamaica', name: 'Agua de Jamaica Criolla (1 Litro)', desc: 'Flor de jamaica de Colima, ligera y refrescante', price: 65 },
      { id: 'boing', name: 'Boing de Guayaba o Mango en Vidrio', desc: 'El clásico refresco de taquería en botella de vidrio', price: 35 },
    ],
  };

  const addItemToOrder = (item) => {
    setOrderItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateItemQty = (id, delta) => {
    setOrderItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const repeatOrder = () => {
    setOrderItems([
      { id: 'paquete_taquero', name: '🔥 Paquete Taquero Familiar (20 Tacos)', price: 480, qty: 1 },
      { id: 'horchata', name: 'Agua de Horchata con Canela (1 Litro)', price: 65, qty: 2 },
    ]);
  };

  const subtotal = orderItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const deliveryFee = 35;
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

  const handleSendWhatsAppOrder = () => {
    const wa = phone ? phone.replace(/\D/g, '') : '525512345678';
    const itemsText = orderItems
      .map((i) => `• ${i.qty}x ${i.name} ($${i.price * i.qty})`)
      .join('%0A');
    const msg = `🌮 *NUEVO PEDIDO - ${brandName.toUpperCase()}*%0A%0A${itemsText}%0A%0A🌶️ *Salsa favorita:* ${selectedSalsa}%0A💰 *Total:* $${total} MXN (con envío)%0A📍 *Dirección de entrega:* (Favor de confirmar colonia en ${brandCity})`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  const springTransition = { type: 'spring', stiffness: 400, damping: 15 };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-black font-brutalist-mono selection:bg-[#F59E0B] selection:text-black">
      <DemoConversionBar
        currentKey="tacos"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* DIAGONAL NEO-BRUTALIST TICKER MARQUEE */}
      <div className="bg-[#FFE500] border-y-3 border-black py-2.5 overflow-hidden whitespace-nowrap shadow-[0px_4px_0px_#000]">
        <div className="flex animate-marquee gap-8 text-xs font-black uppercase tracking-wider font-brutalist-condensed text-lg">
          <span>🌮 PASTOR AL CARBÓN 24/7</span>
          <span>★ ORDENA POR WHATSAPP EN 3 CLICS</span>
          <span>🌶️ SALSAS TATEMADAS ARTESANALES</span>
          <span>🔥 EL MEJOR SUADERO DE LA CDMX</span>
          <span>🌮 PASTOR AL CARBÓN 24/7</span>
          <span>★ ORDENA POR WHATSAPP EN 3 CLICS</span>
          <span>🌶️ SALSAS TATEMADAS ARTESANALES</span>
        </div>
      </div>

      {/* HERO SECTION - NEO-BRUTALISMO URBANO MEXICANO */}
      <section className="relative px-4 sm:px-8 py-16 sm:py-24 max-w-7xl mx-auto overflow-hidden">
        {/* Floating Rotated Brutalist Stickers */}
        <motion.div
          animate={{ rotate: [-6, -4, -6], y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="hidden md:block absolute top-10 right-12 z-20"
        >
          <div className="bg-[#FF005C] text-white font-brutalist-condensed text-xl px-5 py-2.5 border-3 border-black shadow-[6px_6px_0px_#000] -rotate-6 uppercase tracking-wider">
            ¡Ordena por WhatsApp hoy! ⚡
          </div>
        </motion.div>

        <motion.div
          animate={{ rotate: [4, 6, 4] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="hidden lg:block absolute bottom-8 left-8 z-20"
        >
          <div className="bg-[#00F59B] text-black font-brutalist text-sm px-4 py-2 border-3 border-black shadow-[5px_5px_0px_#000] rotate-3 font-black uppercase">
            🔥 Trompo al Carbón Encendido
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Bold Condensed Typography */}
          <div className="lg:col-span-7">
            <div className="inline-block bg-[#FFE500] border-2 border-black px-3 py-1 text-xs font-black uppercase mb-4 shadow-[3px_3px_0px_#000]">
              📍 Taquería de Barrio en {brandCity}
            </div>

            <h1 className="font-brutalist-condensed text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.88] tracking-tight mb-6">
              {brandName}
            </h1>

            <p className="text-base sm:text-lg text-slate-900 font-bold max-w-xl mb-8 leading-snug">
              Carne marinada con receta secreta de 3 generaciones, trompo de carbón de encino, piña asada y tortillas calientes hechas al momento.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={springTransition}
                onClick={() => {
                  const el = document.getElementById('armador-pedido');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#FF005C] hover:bg-[#e00052] text-white px-8 py-4 font-brutalist text-lg font-black uppercase border-3 border-black shadow-[6px_6px_0px_#000] flex items-center gap-3"
              >
                <span>Armar Mi Pedido Rápido</span>
                <ArrowRight className="w-6 h-6 stroke-[3]" />
              </motion.button>

              <button
                onClick={handleSendWhatsAppOrder}
                className="bg-white hover:bg-[#FAF0E6] text-black px-6 py-4 font-brutalist text-base font-black uppercase border-3 border-black shadow-[6px_6px_0px_#000] flex items-center gap-2"
              >
                <Phone className="w-5 h-5 stroke-[2.5]" />
                <span>Pedir Directo por WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column: Brutalist Frame with Real Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative border-3 border-black bg-white p-3 shadow-[10px_10px_0px_#000]">
              <div className="relative aspect-square overflow-hidden border-2 border-black">
                <img
                  src="/images/tacos.webp"
                  alt={brandName}
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute bottom-2 left-2 bg-[#FFE500] border-2 border-black px-3 py-1 font-brutalist text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                  🌮 100% Sabor Chilango
                </div>
              </div>
              <div className="pt-3 flex justify-between items-center text-xs font-black uppercase">
                <span>Tiempo Promedio: 25 - 35 Min</span>
                <span className="text-[#FF005C]">★★★★★ 4.9 (1,840 Reseñas)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXCLUSIVE COMPONENT: INTERACTIVE TACO ORDER BUILDER & BILLBOARD MENU */}
      <section id="armador-pedido" className="py-16 px-4 sm:px-8 border-t-3 border-black bg-[#FAF7E8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="bg-black text-[#FFE500] px-3 py-1 text-xs font-black uppercase inline-block mb-2 shadow-[2px_2px_0px_#FFE500]">
                Cartelera Oficial de Tacos
              </span>
              <h2 className="font-brutalist-condensed text-4xl sm:text-6xl font-black uppercase tracking-tight">
                Menú & Armador de Pedido en Vivo
              </h2>
            </div>

            {/* Quick action: Repeat popular order */}
            <button
              onClick={repeatOrder}
              className="bg-[#FFE500] hover:bg-[#f2d800] text-black px-4 py-2 border-2 border-black font-brutalist text-xs font-black uppercase shadow-[4px_4px_0px_#000] flex items-center gap-2 self-start md:self-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Cargar "Paquete Taquero Familiar"</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Billboard Menu with Tabs */}
            <div className="lg:col-span-7">
              {/* Category Tab Buttons */}
              <div className="flex border-b-3 border-black mb-6 gap-2">
                {[
                  { key: 'tacos', label: '🌮 Tacos Individuales & Órdenes' },
                  { key: 'paquetes', label: '🔥 Paquetes & Taquizas' },
                  { key: 'bebidas', label: '🥤 Aguas & Refrescos' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveMenuTab(tab.key)}
                    className={`px-4 py-3 font-brutalist text-xs sm:text-sm font-black uppercase border-t-3 border-x-3 border-black transition-all ${
                      activeMenuTab === tab.key
                        ? 'bg-[#FF005C] text-white shadow-[4px_-4px_0px_#000]'
                        : 'bg-white text-black hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {menuItems[activeMenuTab].map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border-3 border-black shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-brutalist text-base sm:text-lg font-black uppercase text-black">
                          {item.name}
                        </h4>
                        <span className="bg-[#FFE500] border-2 border-black text-xs font-black px-2 py-0.5">
                          ${item.price} MXN
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 max-w-md">{item.desc}</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={springTransition}
                      onClick={() => addItemToOrder(item)}
                      className="bg-black text-[#FFE500] hover:bg-slate-900 px-4 py-2 border-2 border-black font-brutalist text-xs font-black uppercase shadow-[3px_3px_0px_#FFE500] flex items-center justify-center gap-1.5 self-end sm:self-auto shrink-0"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Agregar</span>
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Live Receipt Order Box (Brutalist Ticket) */}
            <div className="lg:col-span-5 bg-white border-3 border-black shadow-[8px_8px_0px_#000] p-6 sticky top-20">
              <div className="flex justify-between items-center border-b-2 border-dashed border-black pb-3 mb-4">
                <div>
                  <h3 className="font-brutalist-condensed text-2xl font-black uppercase">
                    Tu Pedido Taquero
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Ticket #LMX-{Math.floor(Math.random() * 8000 + 1000)}
                  </span>
                </div>
                <ShoppingBag className="w-6 h-6" />
              </div>

              {/* Items in ticket */}
              {orderItems.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500 font-bold uppercase">
                  No has agregado tacos todavía. Elige de la cartelera a la izquierda.
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
                          ${item.price} x {item.qty} = ${item.price * item.qty}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateItemQty(item.id, -1)}
                          className="w-6 h-6 border-2 border-black bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-black font-mono w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateItemQty(item.id, 1)}
                          className="w-6 h-6 border-2 border-black bg-[#FFE500] hover:bg-yellow-400 flex items-center justify-center font-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Salsa Selection Selector */}
              <div className="mb-4 pt-2 border-t border-dashed border-black">
                <label className="text-[10px] font-black uppercase text-slate-700 block mb-1">
                  🌶️ Elige tu Salsa Principal:
                </label>
                <select
                  value={selectedSalsa}
                  onChange={(e) => setSelectedSalsa(e.target.value)}
                  className="w-full bg-[#FAF7E8] border-2 border-black text-xs font-bold p-2 outline-none cursor-pointer"
                >
                  <option value="Habanero Tatemado 🔥🔥🔥">Habanero Tatemado (Muy Picosa) 🔥🔥🔥</option>
                  <option value="Salsa Verde Taquera con Aguacate 🥑">Verde de Aguacate con Cilantro 🥑</option>
                  <option value="Morita y Chile de Árbol 🌶️">Chile Morita y Ajo Asado 🌶️</option>
                  <option value="Cebollitas con Habanero y Limón">Cebollitas Encurtidas con Limón</option>
                </select>
              </div>

              {/* Math totals */}
              <div className="space-y-1.5 border-t-2 border-dashed border-black pt-3 mb-6 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal Tacos:</span>
                  <span className="font-bold">${subtotal} MXN</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Envío a domicilio ({brandCity}):</span>
                  <span>${subtotal > 0 ? deliveryFee : 0} MXN</span>
                </div>
                <div className="flex justify-between font-black text-base pt-2 border-t border-black text-black">
                  <span>TOTAL A PAGAR:</span>
                  <span className="bg-[#FFE500] px-2 py-0.5 border border-black">${total} MXN</span>
                </div>
              </div>

              {/* Checkout / WhatsApp CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                disabled={orderItems.length === 0}
                onClick={handleSendWhatsAppOrder}
                className="w-full bg-[#00F59B] hover:bg-[#00d485] text-black py-4 font-brutalist text-sm font-black uppercase border-3 border-black shadow-[5px_5px_0px_#000] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>Mandar Pedido por WhatsApp</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 px-4 sm:px-8 border-t-3 border-black text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-brutalist-condensed text-3xl uppercase text-[#FFE500]">
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
