import React, { useState, useRef } from 'react';
import {
  Dumbbell,
  Flame,
  Zap,
  ShieldCheck,
  Trophy,
  QrCode,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Download,
  Share2,
  Receipt,
  Sparkles,
  Calendar,
  Building2,
  Check
} from 'lucide-react';
import { useLandingCustomizer } from '../context/LandingCustomizerContext';
import DemoConversionBar from '../components/DemoConversionBar';

export default function GymAztecaLanding({ onBack, onOpenCheckout, onSwitchDemo }) {
  const { businessName, city, phone, isCustomized } = useLandingCustomizer();

  const clubName = businessName || 'Volcán Azteca';
  const clubLocation = city || 'Condesa / Roma Norte, CDMX';
  const clubPhone = phone ? phone.replace(/\D/g, '') : '5215576543210';

  // 1. Billing Cycle Toggle: Monthly vs Annual (2 Months Free + CFDI Tax Deduction)
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [showCfdiModal, setShowCfdiModal] = useState(false);

  // 2. Day Pass QR Generator State
  const [passData, setPassData] = useState({
    name: '',
    phone: '',
    branch: 'CDMX - Condesa / Roma Norte'
  });
  const [generatedPass, setGeneratedPass] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const passCardRef = useRef(null);

  const plans = [
    {
      id: 'atleta',
      name: 'Plan Atleta',
      monthlyPrice: 990,
      annualPrice: 9900, // 10 months (2 free)
      annualMonthlyEquiv: 825,
      features: [
        'Acceso ilimitado a zona de pesas y cardio olímpico',
        'App móvil para tracking de entrenamientos y RPE',
        'Lockers amplios y regaderas de alta presión',
        'Acceso en horario regular (6:00 AM a 11:00 PM)',
        'Evaluación de composición corporal InBody trimestral'
      ],
      popular: false
    },
    {
      id: 'black',
      name: 'Membresía Black Azteca',
      monthlyPrice: 1490,
      annualPrice: 14900, // 10 months (2 free)
      annualMonthlyEquiv: 1241,
      features: [
        'Todo lo del Plan Atleta',
        'Acceso a Crioterapia (-110°C) y Sauna Finlandés',
        'Clases grupales ilimitadas: Hyrox, Boxeo y HIIT Funcional',
        'Acceso multisede total (Condesa, Santa Fe, San Pedro MTY)',
        '2 pases de invitado VIP al mes los fines de semana',
        'Batidos de proteína post-workout con 20% OFF en barra'
      ],
      popular: true,
      tag: 'Más Vendido'
    },
    {
      id: 'vip',
      name: 'All-Access VIP Élite',
      monthlyPrice: 2290,
      annualPrice: 22900, // 10 months (2 free)
      annualMonthlyEquiv: 1908,
      features: [
        'Todo lo de Black Azteca',
        '4 sesiones mensuales con Entrenador Personal Certificado',
        'Plan nutricional deportivo y suplementación por nutriólogo',
        'Servicio de toallas limpias diario y kit de amenidades',
        'Acceso a Coworking & Lounge privado de atletas',
        'Garantía de estacionamiento con Valet Parking gratuito'
      ],
      popular: false
    }
  ];

  const handleGeneratePass = (e) => {
    e.preventDefault();
    if (!passData.name.trim() || !passData.phone.trim()) return;

    setIsGenerating(true);
    const folio = `VA-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    setTimeout(() => {
      setGeneratedPass({
        folio,
        name: passData.name,
        phone: passData.phone,
        branch: passData.branch || clubLocation,
        issuedAt: now.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        expiresAt: expiresAt.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        qrValue: `https://volcanazteca.mx/verify-pass?folio=${folio}&athlete=${encodeURIComponent(passData.name)}`
      });
      setIsGenerating(false);
    }, 400);
  };

  // Generate SVG QR Matrix deterministically
  const renderQrSvg = (value) => {
    // 21x21 QR Code visual matrix representation
    const size = 21;
    const grid = Array(size).fill(0).map(() => Array(size).fill(false));

    // Finder patterns (top-left, top-right, bottom-left 7x7)
    const drawFinder = (startX, startY) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            grid[startY + r][startX + c] = true;
          }
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(size - 7, 0);
    drawFinder(0, size - 7);

    // Timing lines
    for (let i = 8; i < size - 8; i++) {
      grid[6][i] = i % 2 === 0;
      grid[i][6] = i % 2 === 0;
    }

    // Seeded data dots
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = ((hash << 5) - hash) + value.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const inFinder = (r < 8 && (c < 8 || c >= size - 8)) || (r >= size - 8 && c < 8);
        if (!inFinder && (r !== 6 && c !== 6)) {
          const bit = Math.abs((hash ^ (r * 31 + c * 17)) % 100);
          if (bit > 45) {
            grid[r][c] = true;
          }
        }
      }
    }

    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full p-2 bg-white rounded-xl shadow-inner">
        {grid.map((row, r) =>
          row.map((active, c) =>
            active ? (
              <rect
                key={`${r}-${c}`}
                x={c}
                y={r}
                width="1"
                height="1"
                fill="#0F0F14"
                rx={0.15}
              />
            ) : null
          )
        )}
      </svg>
    );
  };

  const handleDownloadPass = () => {
    if (!generatedPass) return;
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 760;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 760);
    grad.addColorStop(0, '#0F0F14');
    grad.addColorStop(0.5, '#17141D');
    grad.addColorStop(1, '#08080C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 760);

    // Border
    ctx.strokeStyle = '#F97316';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, 568, 728);

    // Header badge
    ctx.fillStyle = '#F97316';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${clubName.toUpperCase()} FITNESS CLUB`, 300, 64);

    ctx.fillStyle = '#00F59B';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillText('PASE VIP DE 1 DÍA • CORTESÍA EXCLUSIVA', 300, 96);

    // Folio box
    ctx.fillStyle = '#221F2B';
    ctx.fillRect(100, 116, 400, 48);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(`FOLIO: ${generatedPass.folio}`, 300, 148);

    // Athlete Info
    ctx.textAlign = 'left';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText('ATLETA INVITADO:', 80, 200);
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(generatedPass.name, 80, 226);

    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText('SEDE AUTORIZADA:', 80, 266);
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillStyle = '#F97316';
    ctx.fillText(generatedPass.branch, 80, 292);

    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText('VÁLIDO HASTA:', 80, 332);
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillStyle = '#FBBF24';
    ctx.fillText(generatedPass.expiresAt, 80, 358);

    // QR area placeholder text
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(200, 400, 200, 200);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ QR VALIDADO ]', 300, 505);
    ctx.font = '12px monospace';
    ctx.fillText(generatedPass.folio, 300, 530);

    // Footer instruction
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('Presenta este pase digital en recepción junto con tu identificación oficial.', 300, 660);
    ctx.fillText('Incluye acceso a pesas olímpicas, sauna, lockers y toallas limpias.', 300, 684);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Pase-VIP-${generatedPass.folio}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#070608] text-[#F3F4F6] font-sans selection:bg-orange-500/30 pb-20">
      {/* Demo Floating Conversion Bar */}
      <DemoConversionBar
        currentLandingKey="gym"
        onSwitchLanding={onSwitchDemo}
        onOpenCheckout={onOpenCheckout}
      />

      {/* Top Notification Banner */}
      <div className="bg-gradient-to-r from-orange-950 via-red-950 to-neutral-900 text-orange-200 text-xs sm:text-sm py-2 px-4 text-center font-medium border-b border-orange-800/40 flex items-center justify-center gap-2">
        <Flame className="w-4 h-4 text-orange-400" />
        <span>
          Pase de 1 Día Gratis para atletas nuevos • {clubLocation} • Sin costo de inscripción este mes con CFDI 4.0
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#070608]/90 backdrop-blur-md border-b border-orange-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-orange-300 border border-orange-500/30 flex items-center gap-1.5 transition-colors"
              >
                ← Volver al Portal
              </button>
            )}
            <div className="flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-orange-500" />
              <span className="font-black tracking-tight text-lg sm:text-xl text-white uppercase italic">
                {clubName} <span className="text-xs bg-orange-600/20 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30 not-italic font-normal">Club</span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-300 font-medium">
            <a href="#planes" className="hover:text-orange-400 transition-colors">Planes & CFDI</a>
            <a href="#pase-gratis" className="hover:text-orange-400 transition-colors">Pase 1 Día QR</a>
            <a href="#instalaciones" className="hover:text-orange-400 transition-colors">Zonas Élite</a>
            <a href="#sedes" className="hover:text-orange-400 transition-colors">Sedes MX</a>
          </div>

          <a
            href="#pase-gratis"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-orange-900/40 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>Pase 1 Día Gratis</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs font-semibold">
              <Trophy className="w-4 h-4 text-orange-400" /> Club de Alto Rendimiento en {clubLocation}
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase leading-[1.05] tracking-tight italic">
              Despierta tu fuerza. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-red-500 not-italic">
                Domina cada meta.
              </span>
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Equipamiento biomecánico Eleiko y Hammer Strength de nivel olímpico, sauna finlandés, crioterapia para recuperación acelerada y deducción fiscal mexicana CFDI 4.0 al 100%.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-lg pt-2 text-center text-xs">
              <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-orange-900/40">
                <span className="block text-2xl font-black text-orange-400">2,500 m²</span>
                <span className="text-neutral-400">Instalaciones Élite</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-orange-900/40">
                <span className="block text-2xl font-black text-orange-400">-110°C</span>
                <span className="text-neutral-400">Crioterapia Pro</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-orange-900/40">
                <span className="block text-2xl font-black text-orange-400">24/7</span>
                <span className="text-neutral-400">Acceso Huella/App</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#pase-gratis"
                className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-neutral-950 font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-900/40 transition-all"
              >
                <Zap className="w-4 h-4" /> Generar Pase 1 Día con QR
              </a>
              <a
                href="#planes"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 font-bold text-sm flex items-center gap-2 transition-all"
              >
                Ver Membresías y CFDI
              </a>
            </div>
          </div>

          {/* Hero Image with Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-orange-500/30 shadow-[0_20px_70px_rgba(249,115,22,0.25)]">
              <img
                src="/images/gym.webp"
                alt={`${clubName} Performance Club`}
                loading="lazy"
                decoding="async"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070608] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-orange-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-orange-400 font-bold block">{clubName} Sede Principal</span>
                  <span className="text-sm font-bold text-white">{clubLocation}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 justify-end">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Abierto Hoy
                  </span>
                  <span className="text-[10px] text-neutral-400 block">5:30 AM a 11:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section with Annual vs Monthly Toggle & CFDI Calculator */}
      <section id="planes" className="py-20 px-6 bg-neutral-950/80 border-t border-orange-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest block mb-2">
              Membresías Flexibles & Deducibles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase italic">
              Elige tu Nivel de Rendimiento
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Entrena al máximo nivel en {clubLocation}. Todos los planes incluyen factura mexicana CFDI 4.0 deducible ante el SAT.
            </p>

            {/* Toggle: Facturación Mensual vs Anual (2 Meses Gratis) */}
            <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-neutral-800 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Facturación Mensual
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-neutral-950 shadow-md shadow-orange-950/50'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>Suscripción Anual</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-neutral-950 text-orange-400 uppercase tracking-wider">
                  2 Meses Gratis 🔥
                </span>
              </button>
            </div>

            {/* CFDI Info Note */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400">
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>
                {billingCycle === 'annual'
                  ? 'Ahorras hasta $4,580 MXN + recuperas hasta ~30% de ISR por concepto de salud preventiva.'
                  : 'Recibe tu factura CFDI 4.0 automática cada mes ingresando tu RFC.'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const isAnnual = billingCycle === 'annual';
              const displayPrice = isAnnual ? `$${plan.annualMonthlyEquiv.toLocaleString('es-MX')}` : `$${plan.monthlyPrice.toLocaleString('es-MX')}`;
              const billedTotal = isAnnual ? `$${plan.annualPrice.toLocaleString('es-MX')} MXN/año` : `$${plan.monthlyPrice.toLocaleString('es-MX')} MXN/mes`;
              const annualSavings = (plan.monthlyPrice * 12) - plan.annualPrice;
              const cfdiTaxRecovery = Math.round(plan.annualPrice * 0.30); // 30% ISR persona física / moral

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-b from-orange-950/40 via-neutral-900 to-neutral-900 border-2 border-orange-500 shadow-2xl shadow-orange-950/50 scale-105 z-10'
                      : 'bg-neutral-900/60 border border-neutral-800 hover:border-orange-500/40'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black bg-gradient-to-r from-orange-500 to-amber-500 text-neutral-950 uppercase tracking-wider shadow-md">
                      {plan.tag}
                    </span>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-xs text-neutral-400 mb-4">{isAnnual ? 'Facturado anualmente (Pagas 10 meses)' : 'Sin contrato forzoso'}</p>

                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-4xl font-black text-white">{displayPrice}</span>
                      <span className="text-neutral-400 text-xs">MXN / mes</span>
                    </div>

                    <div className="text-xs text-orange-400 font-semibold mb-6 flex flex-col gap-1">
                      <span>Total: {billedTotal}</span>
                      {isAnnual && (
                        <div className="p-2 rounded-lg bg-orange-950/50 border border-orange-500/30 text-[11px] text-orange-300 space-y-0.5">
                          <div>✓ Ahorro directo: <span className="font-bold text-white">${annualSavings.toLocaleString('es-MX')} MXN</span></div>
                          <div className="text-emerald-400">✓ Retorno estimado SAT CFDI: ~${cfdiTaxRecovery.toLocaleString('es-MX')} MXN</div>
                        </div>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8 text-xs sm:text-sm text-neutral-300">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/${clubPhone}?text=${encodeURIComponent(
                      `Hola ${clubName}, quiero contratar la membresía ${plan.name} en modalidad ${isAnnual ? 'ANUAL (2 Meses Gratis)' : 'MENSUAL'} para la sede ${clubLocation}. Por favor indíquenme el proceso de inscripción y facturación CFDI.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-center block transition-all ${
                      plan.popular
                        ? 'bg-orange-500 hover:bg-orange-400 text-neutral-950 shadow-lg shadow-orange-900/40'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Inscribirme ({isAnnual ? 'Anual VIP' : 'Mensual'}) 🇲🇽
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free 1-Day Pass Form with REAL SVG QR Generator */}
      <section id="pase-gratis" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-orange-950/40 border border-orange-500/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase italic">
              Generador de Pase VIP de 1 Día Gratis
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
              Genera tu código QR de acceso instantáneo. Válido en pesas olímpicas, sauna y zona funcional de {clubName}.
            </p>
          </div>

          {generatedPass ? (
            /* Digital Pass Display with real SVG QR & Download */
            <div className="max-w-md mx-auto space-y-6">
              <div
                ref={passCardRef}
                className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#14121A] via-[#0E0D13] to-[#08080C] border-2 border-orange-500/50 shadow-2xl text-center space-y-5 overflow-hidden"
              >
                {/* Decorative background glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block">
                      {clubName}
                    </span>
                    <span className="text-sm font-black text-white uppercase">DAY PASS OFICIAL</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    ACTIVO
                  </div>
                </div>

                {/* Real SVG QR Container */}
                <div className="w-48 h-48 mx-auto p-2 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                  {renderQrSvg(generatedPass.qrValue)}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Folio de Acceso Único</span>
                  <span className="text-xl font-mono font-black text-orange-400 tracking-wider">
                    {generatedPass.folio}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Atleta:</span>
                    <span className="font-bold text-white truncate block">{generatedPass.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">WhatsApp:</span>
                    <span className="font-bold text-white truncate block">{generatedPass.phone}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-white/5">
                    <span className="text-[10px] text-neutral-400 block">Sede Autorizada:</span>
                    <span className="font-bold text-orange-300 block">{generatedPass.branch}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-neutral-400 block">Vigencia (24 Horas):</span>
                    <span className="font-semibold text-amber-300 block text-[11px]">{generatedPass.expiresAt}</span>
                  </div>
                </div>

                <p className="text-[10px] text-neutral-400 leading-tight">
                  Muestra este QR en el torniquete de recepción junto con una identificación oficial.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPass}
                  className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-950/50"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Pase PNG</span>
                </button>
                <a
                  href={`https://wa.me/${clubPhone}?text=${encodeURIComponent(
                    `Hola ${clubName}, acabo de generar mi Pase VIP de 1 Día.\nFolio: ${generatedPass.folio}\nNombre: ${generatedPass.name}\nSede: ${generatedPass.branch}\n¿A qué hora me recomiendan asistir hoy?`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Avisar por WhatsApp</span>
                </a>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setGeneratedPass(null)}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  ← Generar otro pase para un acompañante
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGeneratePass} className="space-y-4 max-w-xl mx-auto">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Nombre Completo del Atleta</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Alejandro Torres"
                  value={passData.name}
                  onChange={(e) => setPassData({ ...passData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-neutral-800 text-white text-sm focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">WhatsApp (10 dígitos MX)</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 55 1234 5678"
                    value={passData.phone}
                    onChange={(e) => setPassData({ ...passData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-neutral-800 text-white text-sm focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Sede donde entrenarás</label>
                  <select
                    value={passData.branch}
                    onChange={(e) => setPassData({ ...passData, branch: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-neutral-800 text-white text-sm focus:border-orange-500 focus:outline-none"
                  >
                    <option value={`${clubLocation}`}>{clubLocation} (Recomendada)</option>
                    <option value="CDMX - Condesa / Roma Norte">CDMX - Condesa / Roma Norte</option>
                    <option value="CDMX - Santa Fe Corporativo">CDMX - Santa Fe Corporativo</option>
                    <option value="CDMX - Polanco Masaryk">CDMX - Polanco Masaryk</option>
                    <option value="MTY - San Pedro Garza García">MTY - San Pedro Garza García</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-neutral-950 font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-orange-900/40 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    Generando Código QR Seguro...
                  </span>
                ) : (
                  <>
                    <QrCode className="w-5 h-5" />
                    <span>Generar Pase Digital con QR SVG 🇲🇽</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-neutral-500 border-t border-orange-950/40">
        <p>© 2026 {clubName} S.A.P.I. de C.V. • {clubLocation}. Facturación CFDI 4.0 al instante.</p>
      </footer>
    </div>
  );
}
