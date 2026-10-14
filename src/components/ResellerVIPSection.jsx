import React from 'react';
import { Crown, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, MessageSquare, Percent, Code2, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function ResellerVIPSection() {
  const whatsappAgencyMessage = 'Hola Likes Mexicanos 🇲🇽, represento a una agencia/marca y me interesa conocer los precios mayoristas, acceso API y condiciones del Programa de Agencias y Revendedores VIP.';

  return (
    <section id="agencias" className="py-24 bg-[#090A0F] relative overflow-hidden border-t border-white/5">
      {/* Golden radial background glow (0% GPU blur) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[400px] rounded-full pointer-events-none opacity-80"
        style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#1A1608] via-[#121118] to-[#0D101C] border-2 border-[#FFB800]/40 shadow-[0_20px_80px_rgba(255,184,0,0.15)] overflow-hidden">
          {/* Decorative Crown background watermark */}
          <div className="absolute -right-8 -bottom-8 text-[#FFB800]/5 pointer-events-none select-none">
            <Crown className="w-80 h-80" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB800]/15 border border-[#FFB800]/40 text-[#FFB800] text-xs font-black uppercase tracking-wider">
                <Crown className="w-4 h-4 fill-current" /> CLUB VIP PARA AGENCIAS & REVENDEDORES
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Potencia las cuentas de tus clientes con <span className="text-gold-vip">Precios Mayoristas</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                Si manejas agencias de marketing, community management o revendes servicios digitales en México, accede a nuestra API REST privada y tarifas con hasta un <strong className="text-[#FFB800] font-bold">50% de descuento directo</strong> sobre el precio comercial.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { icon: Percent, text: 'Márgenes de ganancia de 40% a 70%' },
                  { icon: Code2, text: 'API REST para revendedores con documentación' },
                  { icon: Zap, text: 'Despacho prioritario en servidores de alta velocidad' },
                  { icon: FileText, text: 'Facturación consolidada CFDI 4.0 mensual' },
                  { icon: ShieldCheck, text: 'Garantía extendida de reposición a 60 días' },
                  { icon: CheckCircle2, text: 'Ejecutivo de cuenta dedicado por WhatsApp VIP' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <div className="w-6 h-6 rounded-lg bg-[#FFB800]/15 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800] flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card / CTA */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0B0D14]/90 border border-[#FFB800]/30 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">Nivel de Acceso</span>
                    <h3 className="text-xl font-black text-white flex items-center gap-2">
                      <span>Agencia Partner MX</span>
                      <Crown className="w-5 h-5 text-[#FFB800] fill-current" />
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40">
                    Tier 1 Activo
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Depósito inicial requerido:</span>
                    <strong className="text-[#00F59B]">$0 MXN (Sin plazos forzosos)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Integración API:</span>
                    <strong className="text-white">JSON / Webhooks / Zapier</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Panel de administración:</span>
                    <strong className="text-white">Dashboard con métricas</strong>
                  </div>
                </div>

                <a
                  href={SITE_CONFIG.getWhatsappUrl(whatsappAgencyMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FFB800] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-transform hover:scale-105 active:scale-95 will-change-transform"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Solicitar Acceso VIP Agencias 🇲🇽</span>
                </a>

                <p className="text-[10px] text-slate-400 text-center">
                  Respuesta inmediata en horario comercial mexicano (Lunes a Sábado).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
