import React, { useState } from 'react';
import {
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  Heart,
  Check,
  ArrowRight,
  Sparkles,
  Filter,
  Ruler,
  X,
  Plus,
  Minus,
  Trash2,
  HelpCircle
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

const SIZE_CONVERSION_TABLE = [
  { cm: 24.5, mx: '24.5 MX', us: '6.5 US' },
  { cm: 25.0, mx: '25.0 MX', us: '7.0 US' },
  { cm: 25.5, mx: '25.5 MX', us: '7.5 US' },
  { cm: 26.0, mx: '26.0 MX', us: '8.0 US' },
  { cm: 26.5, mx: '26.5 MX', us: '8.5 US' },
  { cm: 27.0, mx: '27.0 MX', us: '9.0 US' },
  { cm: 27.5, mx: '27.5 MX', us: '9.5 US' },
  { cm: 28.0, mx: '28.0 MX', us: '10.0 US' },
  { cm: 28.5, mx: '28.5 MX', us: '10.5 US' },
  { cm: 29.0, mx: '29.0 MX', us: '11.0 US' },
  { cm: 29.5, mx: '29.5 MX', us: '11.5 US' },
];

export default function CalzadoTiendaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone } = useLandingCustomizer();

  const brandName = businessName || 'León Piel & Sneakers';
  const brandCity = city || 'León, Guanajuato, MX';

  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [cart, setCart] = useState([]);
  const [selectedSize, setSelectedSize] = useState('27.0 MX');
  const [notification, setNotification] = useState('');

  // 1. Modal Calculadora de Talla Exacta
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [footCm, setFootCm] = useState(27.0);

  // 2. Drawer Lateral de Carrito Completo
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const products = [
    { id: 1, name: 'Bota Ranchera Western Crazy Horse', category: 'botas', price: 1890, tag: 'Top Ventas León', sizes: ['25.5 MX', '26.0 MX', '27.0 MX', '28.0 MX', '29.0 MX'] },
    { id: 2, name: 'Chelsea Boot Urbana Cuero Nobuk Miel', category: 'botas', price: 1650, tag: 'Artesanal', sizes: ['26.0 MX', '27.0 MX', '27.5 MX', '28.5 MX'] },
    { id: 3, name: 'Sneakers Skate Suela Vulcanizada', category: 'sneakers', price: 1390, tag: 'Streetwear', sizes: ['25.0 MX', '26.0 MX', '27.0 MX', '28.0 MX'] },
    { id: 4, name: 'Bota Militar Táctica Flor Entera', category: 'botas', price: 1980, tag: 'Uso Rudo', sizes: ['26.5 MX', '27.0 MX', '28.0 MX', '29.5 MX'] },
    { id: 5, name: 'Sneakers Retro Vintage Blanco & Gamuza', category: 'sneakers', price: 1450, tag: 'Edición Limitada', sizes: ['25.5 MX', '26.5 MX', '27.5 MX', '28.5 MX'] },
    { id: 6, name: 'Cinturón de Vaqueta Grabada a Mano', category: 'accesorios', price: 480, tag: '100% Piel', sizes: ['32', '34', '36', '38'] },
  ];

  const filtered = selectedCategory === 'todos' ? products : products.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === product.id && i.size === selectedSize);
      if (existing) {
        return prev.map(i => i.id === product.id && i.size === selectedSize ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, size: selectedSize, qty: 1 }];
    });
    setIsCartDrawerOpen(true);
  };

  const updateCartQty = (id, size, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id && i.size === size ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // Free shipping threshold ($1,499 MXN)
  const FREE_SHIPPING_LIMIT = 1499;
  const freeShippingProgress = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_LIMIT) * 100));
  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - cartTotal);

  // Suggested size from cm
  const closestSize = SIZE_CONVERSION_TABLE.reduce((prev, curr) =>
    Math.abs(curr.cm - footCm) < Math.abs(prev.cm - footCm) ? curr : prev
  );

  const whatsappCheckoutMessage = encodeURIComponent(
    `¡Hola ${brandName} 🇲🇽! Deseo confirmar mi pedido de calzado:\n\n${cart.map(i => `• ${i.qty}x ${i.name} (Talla: ${i.size}) — $${i.price * i.qty} MXN`).join('\n')}\n\n• TOTAL: $${cartTotal} MXN\n• Envío: ${cartTotal >= FREE_SHIPPING_LIMIT ? 'GRATIS por FedEx' : '$150 MXN'}\n\n¿Tienen disponibilidad en almacén de ${brandCity}?`
  );

  return (
    <div className="min-h-screen bg-[#090706] text-[#EFE7E2] font-sans selection:bg-amber-700/30 relative pb-16">
      {/* Demo Conversion Bar */}
      <DemoConversionBar
        currentKey="calzado"
        onSwitchDemo={onSwitchDemo}
        onBackToAgency={onBack}
        onOpenCheckout={onOpenCheckout}
      />

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-200 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-amber-900/40 flex items-center justify-center gap-2">
        <Truck className="w-4 h-4 text-amber-400" />
        <span>Envío gratis a todo México superando $1,499 MXN • Pagos en OXXO y SPEI al instante • Cambios de talla sin costo</span>
      </div>

      {/* Header */}
      <header className="sticky top-[49px] z-40 bg-[#090706]/90 backdrop-blur-md border-b border-amber-900/30 px-6 py-4">
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
              <span className="text-2xl">👞</span>
              <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white">
                {brandName}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-stone-300 font-medium">
            <a href="#catalogo" className="hover:text-amber-400 transition-colors">Colección Piel</a>
            <button
              onClick={() => setIsSizeModalOpen(true)}
              className="text-amber-400 hover:underline flex items-center gap-1.5 font-bold"
            >
              <Ruler className="w-3.5 h-3.5" /> Calculadora de Talla
            </button>
            <a href="#garantia" className="hover:text-amber-400 transition-colors">Hecho en {brandCity}</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-2 text-sm font-semibold"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Carrito (${cartTotal} MXN)</span>
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
              <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> 100% Piel Genuina de {brandCity} • Garantía de Fábrica
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.08] tracking-tight">
              Calzado que dura años, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500">
                orgullo zapatero mexicano
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Hecho a mano en los talleres tradicionales de {brandCity}. Pieles curtidas de alta densidad, suelas cosidas con ribete Goodyear Welt y hormas calibradas al pie mexicano.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalogo"
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Ver Catálogo de Temporada</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsSizeModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-500/30 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Ruler className="w-4 h-4" />
                <span>¿Dudas de tu talla? Calcular</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_20px_70px_rgba(217,119,6,0.25)]">
              <img
                src="/images/calzado.webp"
                alt="Botas de Piel Artesanal León"
                loading="lazy"
                decoding="async"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090706] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalogo" className="py-16 px-6 bg-stone-950/70 border-t border-amber-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Catálogo Disponible</span>
              <h2 className="text-3xl font-black text-white mt-1">Calzado y Marroquinería Fina</h2>
            </div>

            {/* Size Selector Pill for Quick Buying */}
            <div className="flex items-center gap-2 bg-stone-900 p-2 rounded-xl border border-stone-800">
              <span className="text-xs text-stone-400 font-bold">Tu Talla MX:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-black/60 border border-amber-600/30 text-amber-300 font-mono text-xs rounded-lg px-2.5 py-1 outline-none"
              >
                {SIZE_CONVERSION_TABLE.map(s => (
                  <option key={s.mx} value={s.mx}>{s.mx} ({s.us})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                    {item.tag}
                  </span>
                  <h3 className="font-extrabold text-white text-base mt-2">{item.name}</h3>
                  <span className="text-amber-400 font-mono font-black text-xl block mt-1">
                    ${item.price.toLocaleString('es-MX')} MXN
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-400">Talla selec: <strong className="text-amber-300">{selectedSize}</strong></span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase flex items-center gap-1.5 transition-all shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. Modal Calculadora de Talla Exacta */}
      {isSizeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#140F0C] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsSizeModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Ruler className="w-5 h-5 text-amber-400" />
              <h3 className="text-xl font-serif font-black text-white">Calculadora de Talla Exacta</h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed mb-6">
              Mide tu pie desde el talón hasta el dedo más largo apoyado sobre una hoja de papel y ajusta los centímetros abajo:
            </p>

            <div className="space-y-4 p-5 rounded-2xl bg-black/50 border border-stone-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-300 font-bold">Largo de tu pie:</span>
                <span className="font-mono text-2xl font-black text-amber-400">{footCm} cm</span>
              </div>

              <input
                type="range"
                min="24.5"
                max="29.5"
                step="0.5"
                value={footCm}
                onChange={(e) => setFootCm(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="grid grid-cols-2 gap-3 pt-2 text-center">
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30">
                  <span className="text-[10px] text-stone-400 uppercase block font-bold">Talla Recomendada MX</span>
                  <span className="font-mono text-xl font-black text-white">{closestSize.mx}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-stone-400 uppercase block font-bold">Equivalente US</span>
                  <span className="font-mono text-xl font-black text-stone-300">{closestSize.us}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedSize(closestSize.mx);
                setIsSizeModalOpen(false);
              }}
              className="w-full mt-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider transition-all"
            >
              Seleccionar Talla {closestSize.mx} para mi Compra
            </button>
          </div>
        </div>
      )}

      {/* 2. Drawer Lateral de Carrito Completo */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#120E0B] border-l border-amber-900/40 h-full flex flex-col p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h3 className="text-white font-black text-lg">Tu Carrito de Calzado</h3>
                <span className="text-xs bg-white/10 text-stone-300 px-2 py-0.5 rounded-full font-mono">
                  {cartCount}
                </span>
              </div>
              <button onClick={() => setIsCartDrawerOpen(false)} className="p-1.5 text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Barra de Progreso Envío Gratis superando $1,499 MXN */}
            <div className="py-3 px-4 my-3 rounded-xl bg-black/50 border border-amber-500/20 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-300 font-semibold flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  {missingForFreeShipping === 0 ? '¡Ya tienes Envío Gratis por FedEx! 🎉' : `Agrega $${missingForFreeShipping} MXN para Envío Gratis`}
                </span>
                <span className="font-mono text-amber-400 font-bold">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto py-2 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-stone-400 text-xs">
                  Tu carrito de calzado está vacío.
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${item.size}`} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-xs font-bold truncate">{item.name}</h4>
                      <span className="text-[11px] text-amber-400 font-mono">Talla: {item.size}</span>
                      <div className="font-mono text-xs text-white font-extrabold mt-1">
                        ${item.price * item.qty} MXN
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-white/10">
                        <button onClick={() => updateCartQty(item.id, item.size, -1)} className="p-1 text-stone-400 hover:text-white">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs text-white font-bold px-1.5">{item.qty}</span>
                        <button onClick={() => updateCartQty(item.id, item.size, 1)} className="p-1 text-stone-400 hover:text-white">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => updateCartQty(item.id, item.size, -item.qty)}
                        className="p-1.5 text-stone-500 hover:text-red-400"
                      >
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
                  <span className="font-mono text-2xl font-black text-amber-400">${cartTotal} MXN</span>
                </div>

                <a
                  href={`https://wa.me/${phone?.replace(/\D/g, '') || '5215512345678'}?text=${whatsappCheckoutMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Finalizar Pedido vía WhatsApp / SPEI</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-stone-500 border-t border-amber-900/30">
        <p>© 2026 {brandName} • Tradición Zapatera en {brandCity}.</p>
      </footer>
    </div>
  );
}
