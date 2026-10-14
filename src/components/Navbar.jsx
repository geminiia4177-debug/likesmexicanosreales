import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ShieldCheck,
  Search,
  Sparkles,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
  Trash2,
  Plus,
  Minus
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const Svg = ({ className = '', children }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const Facebook = (p) => <Svg {...p}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Svg>;
const Instagram = (p) => <Svg {...p}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></Svg>;
const TikTok = (p) => <Svg {...p}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></Svg>;
const GoogleMapsIcon = (p) => (
  <svg className={p.className || 'w-4 h-4'} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export default function Navbar({ onOpenTracking, onOpenShowcase, onOpenCheckout }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, cartCount, cartTotal, removeItem, updateQuantity, isCartOpen, openCart, closeCart, clearCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Servicios', href: '#servicios-mx' },
    { label: 'Cotizador', href: '#cotizador' },
    { label: 'Diferenciadores', href: '#diferenciadores' },
    { label: 'Referencias', href: '#referencias' },
    { label: 'Agencias VIP', href: '#agencias' },
    { label: 'Landing Pages', href: '#web-design' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleCheckoutFromCart = () => {
    closeCart();
    if (onOpenCheckout) {
      onOpenCheckout({
        service: 'Carrito Multi-Servicio LMX',
        tierLabel: `${cartCount} Servicios Combinados`,
        price: cartTotal,
        quantity: items.reduce((acc, curr) => acc + (curr.quantity || 1), 0),
        serviceId: 'cart_multi_bundle',
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#090A0F]/90 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/80'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
            
            {/* Logo & Mexican Identity Badge */}
            <a href="#inicio" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-[#00F59B] via-white to-[#FF005C] shadow-lg shadow-[#00F59B]/20 group-hover:scale-105 transition-transform">
                <img src="/logo.webp" alt="Likes Mexicanos" className="w-full h-full object-cover rounded-[10px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-base sm:text-lg tracking-tight leading-none">
                  Likes Mexicanos <span className="text-[#00F59B]">Reales</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] animate-pulse" />
                  100% Perfiles de México 🇲🇽
                </span>
              </div>
            </a>

            {/* Quick Social Switcher Icons */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <a href="#cotizador" className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" title="Facebook México">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#cotizador" className="p-1.5 rounded-lg text-slate-400 hover:text-pink-400 hover:bg-pink-500/10 transition-colors" title="Instagram México">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#cotizador" className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors" title="TikTok México">
                <TikTok className="w-3.5 h-3.5" />
              </a>
              <a href="#cotizador" className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors" title="Google Maps 5★">
                <GoogleMapsIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-300 hover:text-white px-3 py-2 text-xs xl:text-sm font-semibold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Action Buttons: Tracking, Cart & CTA */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Order Tracking Button */}
              <button
                onClick={onOpenTracking}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold border border-white/10 hover:border-[#00F59B]/40 flex items-center gap-1.5 transition-all"
              >
                <Search className="w-3.5 h-3.5 text-[#00F59B]" />
                <span>Rastrear Pedido</span>
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-[#00F59B]/40 transition-all"
                title="Ver Carrito de Servicios"
              >
                <ShoppingBag className="w-4 h-4 text-slate-200" />
                {items.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FF005C] text-white text-[10px] font-black flex items-center justify-center animate-bounce shadow">
                    {items.length}
                  </span>
                )}
              </button>

              {/* Armar Paquete CTA */}
              <a
                href="#cotizador"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF005C] to-[#7928CA] hover:brightness-110 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#FF005C]/25 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Armar Paquete</span>
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={openCart}
                className="relative p-2 rounded-xl bg-white/5 text-slate-300 border border-white/10"
              >
                <ShoppingBag className="w-4 h-4" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF005C] text-white text-[9px] font-bold flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
              <button
                onClick={onOpenTracking}
                className="p-2 rounded-xl bg-white/5 text-[#00F59B] text-xs font-bold border border-white/10"
                title="Rastrear Pedido"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl bg-white/5 text-white"
                aria-label="Menú"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="sm:hidden bg-[#090A0F]/98 backdrop-blur-2xl border-t border-white/10 px-6 py-5 space-y-3 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-slate-300 hover:text-[#00F59B] text-sm font-semibold border-b border-white/5"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenTracking();
                }}
                className="w-full py-3 rounded-xl bg-white/5 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10"
              >
                <Search className="w-4 h-4 text-[#00F59B]" />
                <span>Rastrear mi Pedido en Vivo</span>
              </button>

              <a
                href="#cotizador"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF005C] to-[#7928CA] text-white font-black text-xs uppercase tracking-wider text-center"
              >
                Armar Paquete Ahora 🇲🇽
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Drawer Slideover */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[140] flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#0C101D] border-l border-white/15 h-full flex flex-col p-6 shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#00F59B]" />
                <h3 className="text-white font-black text-lg">Tu Carrito Multi-Servicio</h3>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-mono">
                  {items.length}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1 scrollbar-thin">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-slate-500">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <p className="text-slate-300 text-sm font-semibold">Tu carrito está vacío</p>
                  <p className="text-slate-500 text-xs max-w-xs mx-auto">
                    Explora nuestros paquetes de Likes, Seguidores, Reseñas o licencias y agrégalos en una sola orden.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 group"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-xs font-extrabold truncate">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 truncate font-mono">
                        {item.targetHandle || item.targetUrl || 'Destino por confirmar'}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#00F59B] font-mono font-bold text-xs">
                          ${item.total || item.unitPrice} MXN
                        </span>
                        <span className="text-[10px] text-slate-500">
                          (${item.unitPrice} c/u)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-black/40 rounded-lg border border-white/10 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs text-white font-bold">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Eliminar del carrito"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {items.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-semibold">Total Acumulado:</span>
                  <span className="font-mono text-2xl font-black text-[#00F59B]">
                    ${cartTotal} MXN
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Pago unificado en 1 solo SPEI u OXXO</span>
                  <span className="text-emerald-400">Acreditación express</span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckoutFromCart}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00F59B] to-teal-500 hover:from-[#00d885] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#00F59B]/20 transition-all hover:scale-[1.02]"
                >
                  <span>Pagar Todo en 1 Sola Orden (${cartTotal} MXN)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full text-center text-xs text-slate-500 hover:text-slate-300 transition-colors pt-1"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
