import React, { useState } from 'react';
import {
  Coffee,
  Flame,
  Star,
  ShoppingBag,
  Truck,
  Check,
  ArrowRight,
  Sparkles,
  Heart,
  Clock,
  Repeat,
  Plus,
  Minus,
  Trash2,
  X,
  ShieldCheck
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function CafeArtesanalLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'Café Corazón Artesanal';
  const brandCity = city || 'Coyoacán & San Ángel, CDMX';

  // 1. Configurador de Suscripción Mensual 'Club del Café Mexicano'
  const [subFrequency, setSubFrequency] = useState('mensual'); // quincenal, mensual
  const [subWeight, setSubWeight] = useState(500); // 250, 500, 1000
  const [subOrigin, setSubOrigin] = useState('Oaxaca'); // Oaxaca, Chiapas
  const [subGrind, setSubGrind] = useState('Grano Entero'); // Grano Entero, Espresso, Prensa Francesa, V60

  // Calculation for subscription
  const baseWeightPrice = subWeight === 250 ? 165 : subWeight === 500 ? 290 : 540;
  const subSavings = Math.round(baseWeightPrice * 0.15); // 15% OFF
  const subFinalPrice = baseWeightPrice - subSavings;

  // 2. Cart state with exact grind binding
  const [cart, setCart] = useState([]);
  const [selectedGrind, setSelectedGrind] = useState('Grano Entero');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState('');

  const menu = [
    { id: 1, name: 'Café de Especialidad Pluma Hidalgo (Oaxaca)', price: 290, desc: 'Cosechado a 1,450 msnm. Notas a chocolate amargo, naranja dulce y miel de azahar.', category: 'grano', tag: 'Origen Oaxaca' },
    { id: 2, name: 'Café de Altura Coatepec (Veracruz)', price: 270, desc: 'Tueste medio artesanal. Acidez cítrica brillante, notas a caramelo y nuez tostada.', category: 'grano', tag: 'Origen Veracruz' },
    { id: 3, name: 'Concha Tradicional de Vainilla & Nata de Rancho', price: 55, desc: 'Horneada cada mañana con masa madre, mantequilla pura de rancho y costra crujiente.', category: 'pan', tag: 'Horno de Piedra' },
    { id: 4, name: 'Concha de Chocolate Oaxaqueño & Avellana', price: 65, desc: 'Cacao criollo molido en metate con relleno cremoso de avellana tostada.', category: 'pan', tag: 'Favorito' },
    { id: 5, name: 'Hogaza de Pan de Masa Madre (Sourdough 750g)', price: 140, desc: 'Fermentación lenta de 36 horas con harina mexicana no blanqueada.', category: 'pan', tag: 'Artesanal' },
    { id: 6, name: 'Cold Brew Macerado 24 Horas (1 Litro)', price: 185, desc: 'Extracción en frío de granos chiapanecos. Sabor suave, aterciopelado y energizante.', category: 'bebidas', tag: 'Frío' },
  ];

  const addToCart = (item) => {
    const grindDetail = item.category === 'grano' ? selectedGrind : null;
    setCart((prev) => {
      const idx = prev.findIndex(i => i.id === item.id && i.grind === grindDetail);
      if (idx >= 0) {
        return prev.map((it, i) => i === idx ? { ...it, qty: it.qty + 1 } : it);
      }
      return [...prev, { ...item, grind: grindDetail, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (idx, delta) => {
    setCart((prev) =>
      prev
        .map((it, i) => i === idx ? { ...it, qty: it.qty + delta } : it)
        .filter((it) => it.qty > 0)
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const whatsappSubscriptionMessage = encodeURIComponent(
    `¡Hola ${brandName} ☕! Quiero suscribirme al Club del Café Mexicano (15% OFF recurrente):\n\n• Frecuencia: ${subFrequency.toUpperCase()}\n• Peso: ${subWeight}g\n• Origen: ${subOrigin}\n• Molienda elegida: ${subGrind}\n• Total con descuento: $${subFinalPrice} MXN (Ahorras $${subSavings} MXN por entrega)\n\n¿Me confirman para programar mi primer envío a ${brandCity}?`
  );

  const whatsappCartMessage = encodeURIComponent(
    `¡Hola ${brandName} ☕! Quiero ordenar para entrega a domicilio:\n\n${cart.map(i => `• ${i.qty}x ${i.name}${i.grind ? ` [Molienda: ${i.grind}]` : ''} — $${i.price * i.qty} MXN`).join('\n')}\n\n• TOTAL: $${total} MXN\n• Entrega en: ${brandCity}`
  );

  return (
    <div className="min-h-screen bg-[#0C0806] text-[#EFE7DF] font-sans selection:bg-amber-800/40 relative pb-16">
      {/* Demo Conversion Bar */}
      <DemoConversionBar
        currentKey="cafe"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-200 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-amber-900/40 flex items-center justify-center gap-2">
        <Coffee className="w-4 h-4 text-amber-400" />
        <span>Pan recién horneado a las 7:00 AM • Café 100% de especialidad mexicana • Envíos express en {brandCity}</span>
      </div>

      {/* Header */}
      <header className="sticky top-[49px] z-40 bg-[#0C0806]/90 backdrop-blur-md border-b border-amber-900/30 px-6 py-4">
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
              <Coffee className="w-6 h-6 text-amber-500" />
              <span className="font-serif tracking-widest text-lg sm:text-xl font-bold text-white">
                {brandName}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-stone-300 font-medium">
            <a href="#club" className="hover:text-amber-400 transition-colors">Club del Café (15% OFF)</a>
            <a href="#menu" className="hover:text-amber-400 transition-colors">Granos &amp; Panadería</a>
            <a href="#sucursal" className="hover:text-amber-400 transition-colors">Sede {brandCity.split('&')[0]}</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-2 text-sm font-semibold"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Pedido (${total} MXN)</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black text-xs font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> Cafetería de Especialidad #1 en {brandCity} • 4.97 en Google
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-black text-white leading-[1.08] tracking-tight">
              Aroma de altura, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
                pan recién horneado
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Granos arábica cosechados a mano por caficultores de Chiapas y Oaxaca. Tostados en pequeños lotes semanales y acompañados de conchas de masa madre con nata fresca en {brandCity}.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#club"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <Repeat className="w-4 h-4" />
                <span>Suscribirme al Club del Café (15% OFF)</span>
              </a>

              <a
                href="#menu"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 border border-white/10 font-bold text-xs uppercase tracking-wider"
              >
                Ver Carta de Café &amp; Pan
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_20px_70px_rgba(217,119,6,0.25)]">
              <img
                src="/images/cafe.webp"
                alt="Cafetería Artesanal de Especialidad"
                loading="lazy"
                decoding="async"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0806] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* 1. Configurador de Suscripción Mensual 'Club del Café Mexicano' */}
      <section id="club" className="py-16 px-6 bg-[#120D0A] border-y border-amber-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
              Suscripción Recurrente con 15% OFF
            </span>
            <h2 className="text-3xl font-serif font-black text-white mt-2">
              Club del Café Mexicano a Domicilio
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Recibe café recién tostado en tu puerta con molienda exacta para tu cafetera y envío garantizado.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-amber-500/30 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Origen */}
              <div>
                <label className="text-xs font-bold text-amber-300 block mb-2 uppercase">1. Origen del Grano:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Oaxaca', label: 'Oaxaca (Pluma Hidalgo)', notes: 'Chocolate & Naranja' },
                    { id: 'Chiapas', label: 'Chiapas (Soconusco)', notes: 'Miel & Jazmín' },
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setSubOrigin(o.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        subOrigin === o.id
                          ? 'bg-amber-600/30 border-amber-400 text-white shadow'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs">{o.id}</div>
                      <div className="text-[10px] text-amber-400">{o.notes}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Frecuencia */}
              <div>
                <label className="text-xs font-bold text-amber-300 block mb-2 uppercase">2. Frecuencia de Entrega:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'quincenal', label: 'Cada 15 Días', desc: 'Para amantes del café' },
                    { id: 'mensual', label: 'Mensual', desc: '1 entrega por mes' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSubFrequency(f.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        subFrequency === f.id
                          ? 'bg-amber-600/30 border-amber-400 text-white shadow'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs">{f.label}</div>
                      <div className="text-[10px] text-stone-400">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Peso */}
              <div>
                <label className="text-xs font-bold text-amber-300 block mb-2 uppercase">3. Gramaje por Entrega:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[250, 500, 1000].map((w) => (
                    <button
                      key={w}
                      onClick={() => setSubWeight(w)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        subWeight === w
                          ? 'bg-amber-600/30 border-amber-400 text-white font-bold shadow'
                          : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                      }`}
                    >
                      <span className="font-mono text-sm block">{w >= 1000 ? '1 Kg' : `${w}g`}</span>
                      <span className="text-[9px] text-stone-500 block">{w === 500 ? 'Recomendado' : ''}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Molienda */}
              <div>
                <label className="text-xs font-bold text-amber-300 block mb-2 uppercase">4. Tipo de Molienda:</label>
                <select
                  value={subGrind}
                  onChange={(e) => setSubGrind(e.target.value)}
                  className="w-full bg-[#18110D] border border-amber-600/30 rounded-xl p-3 text-xs text-white outline-none"
                >
                  <option value="Grano Entero">Grano Entero (Para moler en casa)</option>
                  <option value="Espresso">Molienda Fina (Máquina Espresso / Moka Italiana)</option>
                  <option value="V60">Molienda Media (Cafetera de Filtro / V60 / Chemex)</option>
                  <option value="Prensa Francesa">Molienda Gruesa (Prensa Francesa / Cold Brew)</option>
                </select>
              </div>
            </div>

            {/* Price strip */}
            <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400">Total Suscripción ({subFrequency}):</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    15% OFF Aplicado
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-serif text-3xl font-black text-amber-400 font-mono">
                    ${subFinalPrice} MXN
                  </span>
                  <span className="text-xs text-stone-500 line-through">
                    ${baseWeightPrice} MXN
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">
                    (Ahorras ${subSavings} MXN)
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappSubscriptionMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Activar Suscripción en WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Menú Section with Grind Binding */}
      <section id="menu" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Nuestra Carta</span>
            <h2 className="text-3xl font-black text-white mt-1">Granos de Especialidad &amp; Panadería</h2>
          </div>

          {/* Selector de Molienda para Granos */}
          <div className="flex items-center gap-2 bg-stone-900 p-2 rounded-xl border border-stone-800 text-xs">
            <span className="text-stone-400 font-bold">Molienda para granos:</span>
            <select
              value={selectedGrind}
              onChange={(e) => setSelectedGrind(e.target.value)}
              className="bg-black/60 border border-amber-600/30 text-amber-300 rounded-lg px-2.5 py-1 outline-none text-xs"
            >
              <option value="Grano Entero">Grano Entero</option>
              <option value="Espresso">Molienda Fina (Espresso)</option>
              <option value="V60">Molienda Media (Filtro / V60)</option>
              <option value="Prensa Francesa">Molienda Gruesa (Prensa)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {menu.map((dish) => (
            <div key={dish.id} className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                  {dish.tag}
                </span>
                <h3 className="font-extrabold text-white text-base mt-2">{dish.name}</h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">{dish.desc}</p>
                {dish.category === 'grano' && (
                  <span className="text-[10px] text-amber-300 font-mono block mt-1">
                    Se empacará: <strong>{selectedGrind}</strong>
                  </span>
                )}
                <span className="text-amber-400 font-mono font-black text-xl block mt-2">
                  ${dish.price} MXN
                </span>
              </div>

              <button
                onClick={() => addToCart(dish)}
                className="mt-4 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase flex items-center justify-center gap-1.5 transition-all shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar al Pedido</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#130E0B] border-l border-amber-900/40 h-full flex flex-col p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-amber-400" />
                <h3 className="text-white font-black text-lg">Tu Pedido de Café &amp; Pan</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1.5 text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-stone-400 text-xs">
                  Tu pedido de café está vacío.
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-xs font-bold truncate">{item.name}</h4>
                      {item.grind && (
                        <span className="text-[11px] text-amber-400 font-mono block">
                          Molienda: {item.grind}
                        </span>
                      )}
                      <div className="font-mono text-xs text-white font-extrabold mt-1">
                        ${item.price * item.qty} MXN
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-white/10">
                        <button onClick={() => updateCartQty(idx, -1)} className="p-1 text-stone-400 hover:text-white">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs text-white font-bold px-1.5">{item.qty}</span>
                        <button onClick={() => updateCartQty(idx, 1)} className="p-1 text-stone-400 hover:text-white">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button onClick={() => updateCartQty(idx, -item.qty)} className="p-1.5 text-stone-500 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-stone-400">Total a Pagar:</span>
                  <span className="font-mono text-2xl font-black text-amber-400">${total} MXN</span>
                </div>

                <a
                  href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappCartMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Pedir Domicilio por WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-stone-500 border-t border-amber-900/30">
        <p>© 2026 {brandName} • Tradición y Café de Altura en {brandCity}.</p>
      </footer>
    </div>
  );
}
