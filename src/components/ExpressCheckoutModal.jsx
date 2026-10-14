import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Copy,
  ShieldCheck,
  Zap,
  CreditCard,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  Clock,
  UploadCloud,
  FileCheck,
  Image as ImageIcon,
  CheckCircle2,
  Percent,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { detectSocialPlatform, validateServiceTargetMatch, sanitizeUrl } from '../utils/urlValidator';
import { createOrder, submitPaymentProof } from '../services/orderService';
import AICommentGenerator from './AICommentGenerator';
import { SITE_CONFIG } from '../config/siteConfig';

const DRAFT_STORAGE_KEY = 'lmx_checkout_draft';

export default function ExpressCheckoutModal({
  isOpen,
  onClose,
  packageData,
  onTrackOrder,
}) {
  const [step, setStep] = useState(1);
  const [targetUrl, setTargetUrl] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('SPEI');
  const [urlError, setUrlError] = useState('');
  const [contactError, setContactError] = useState('');
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [copiedOxxo, setCopiedOxxo] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');
  const [requiresCfdi, setRequiresCfdi] = useState(false);
  const [cfdiRfc, setCfdiRfc] = useState('');

  // CRO-01: Order Bump & Upsell
  const [orderBumpActive, setOrderBumpActive] = useState(false);
  const [crossSellActive, setCrossSellActive] = useState(false);

  // AI Reviews / Comments Payload
  const [customComments, setCustomComments] = useState([]);

  // Proof Upload State
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [isUploadingProof, setIsUploadingProof] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);

  // Load draft from localStorage
  useEffect(() => {
    if (isOpen) {
      try {
        const draft = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (draft) {
          const parsed = JSON.parse(draft);
          if (parsed.targetUrl) setTargetUrl(parsed.targetUrl);
          if (parsed.contactInfo) setContactInfo(parsed.contactInfo);
          if (parsed.email) setEmail(parsed.email);
        }
      } catch (e) {
        // Safe fallback
      }
    }
  }, [isOpen]);

  // Save draft whenever inputs change
  useEffect(() => {
    if (targetUrl || contactInfo || email) {
      try {
        localStorage.setItem(
          DRAFT_STORAGE_KEY,
          JSON.stringify({ targetUrl, contactInfo, email })
        );
      } catch (e) {
        // Safe fallback
      }
    }
  }, [targetUrl, contactInfo, email]);

  if (!isOpen) return null;

  const pkg = packageData || {
    id: 'default_likes_mx',
    platform: 'Instagram',
    service: 'Likes Mexicanos Reales',
    tierLabel: '1,000 Likes MX',
    price: 269,
    oldPrice: 380,
    save: 'Ahorras 29%',
    delivery: 'Comienza en 5-15 min',
    serviceId: 'instagram_likes_mx',
    quantity: 1000,
  };

  // URL Validation & Social Detection
  const detected = detectSocialPlatform(targetUrl);
  const matchCheck = validateServiceTargetMatch(pkg.serviceId || pkg.service, detected);

  // Calculate Total with Bumps
  const basePrice = Number(pkg.price) || 149;
  const bumpPrice = orderBumpActive ? 59 : 0;
  const crossSellPrice = crossSellActive ? 99 : 0; // 35% OFF Likes pack
  const totalAmount = basePrice + bumpPrice + crossSellPrice;

  const isReviewService =
    (pkg.serviceId && pkg.serviceId.includes('gmaps')) ||
    (pkg.service && pkg.service.toLowerCase().includes('reseña')) ||
    (pkg.service && pkg.service.toLowerCase().includes('comentario'));

  const handleNextStep1 = () => {
    if (!targetUrl.trim()) {
      setUrlError('Por favor pega tu enlace o @usuario.');
      return;
    }
    if (!detected.isValid) {
      setUrlError('Por favor ingresa un enlace o usuario válido.');
      return;
    }
    setUrlError('');
    setStep(2);
  };

  const handleNextStep2 = () => {
    const cleanContact = contactInfo.replace(/\D/g, '');
    if (cleanContact.length < 10 && !contactInfo.includes('@')) {
      setContactError('Ingresa tu WhatsApp a 10 dígitos (ej: 55 1234 5678) o un correo válido.');
      return;
    }
    setContactError('');
    setStep(3);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      service_id: pkg.serviceId || 'instagram_likes_mx',
      service_name: `${pkg.tierLabel} - ${pkg.service}`,
      target_url: sanitizeUrl(targetUrl),
      target_handle: detected.handle || targetUrl,
      quantity: Number(pkg.quantity) || 1000,
      unit_price_mxn: basePrice,
      order_bump_added: orderBumpActive,
      total_amount_mxn: totalAmount,
      payment_method: paymentMethod,
      customer_whatsapp: contactInfo,
      customer_email: email || null,
      requires_cfdi: requiresCfdi,
      cfdi_rfc: cfdiRfc || null,
      custom_comments_payload: customComments.length > 0 ? customComments : null,
    };

    const saved = await createOrder(orderData);
    const finalCode = saved.order_code;
    setCreatedOrderId(finalCode);
    setOrderComplete(true);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00F59B', '#FF005C', '#7928CA', '#FFB800'],
      });
    } catch (e) {
      // Safe fallback
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProof = async () => {
    if (!proofPreview || !createdOrderId) return;
    setIsUploadingProof(true);
    await submitPaymentProof(createdOrderId, proofPreview);
    setIsUploadingProof(false);
    setProofUploaded(true);
    try {
      confetti({ particleCount: 80, spread: 60, colors: ['#00F59B', '#FFFFFF'] });
    } catch (e) {}
  };

  const copyClabe = () => {
    navigator.clipboard?.writeText('646180123456789012');
    setCopiedClabe(true);
    setTimeout(() => setCopiedClabe(false), 2500);
  };

  const copyOxxo = () => {
    navigator.clipboard?.writeText('93281049582014');
    setCopiedOxxo(true);
    setTimeout(() => setCopiedOxxo(false), 2500);
  };

  const resetAndClose = () => {
    setStep(1);
    setOrderComplete(false);
    setProofFile(null);
    setProofPreview(null);
    setProofUploaded(false);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Likes Mexicanos 🇲🇽, acabo de registrar mi orden:\n\n• Folio: #${createdOrderId || 'NUEVO'}\n• Paquete: ${pkg.tierLabel} (${pkg.service})\n• Destino: ${detected.handle || targetUrl}\n• WhatsApp: ${contactInfo}\n• Total: $${totalAmount} MXN\n• Método: ${paymentMethod}\n${orderBumpActive ? '• Bump VIP: +300 Likes Extra activado\n' : ''}\n¿Me confirman para despachar de inmediato?`
  );

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#090E1A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[94vh] flex flex-col">
        {/* Neon Ambient Glows (0% GPU blur) */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(255,0,92,0.14) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(0,245,155,0.14) 0%, transparent 70%)' }}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF005C]/10 border border-[#FF005C]/30 text-[#FF005C] text-xs font-bold mb-1">
              <Zap className="w-3.5 h-3.5" /> CHECKOUT EXPRESS EN 1 CLIC
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {orderComplete ? '¡Orden Registrada con Éxito! 🎉' : 'Finalizar Pedido Seguro 🇲🇽'}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ORDER COMPLETE / PROOF UPLOAD SCREEN */}
        {orderComplete ? (
          <div className="mt-5 flex-1 overflow-y-auto pr-1 space-y-5 text-center relative z-10">
            <div className="w-16 h-16 rounded-full bg-[#00F59B]/20 border border-[#00F59B] text-[#00F59B] flex items-center justify-center mx-auto text-2xl font-bold shadow-lg shadow-[#00F59B]/20">
              ✓
            </div>

            <div>
              <span className="text-xs text-slate-400 uppercase tracking-widest block font-mono">
                FOLIO DE ORDEN ASIGNADO:
              </span>
              <div className="inline-block mt-1 px-5 py-2.5 rounded-2xl bg-black/70 border border-[#00F59B]/60 font-mono text-2xl sm:text-3xl font-black text-[#00F59B] tracking-wider shadow-inner">
                #{createdOrderId}
              </div>
            </div>

            {/* BACK-01: Drag & Drop Payment Proof Upload */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1222] border border-white/15 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-[#00F59B]" />
                  Subir Captura de SPEI o Ticket OXXO
                </span>
                {proofUploaded && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/40">
                    Comprobante Recibido ✓
                  </span>
                )}
              </div>

              {!proofUploaded ? (
                <div className="border-2 border-dashed border-white/20 hover:border-[#00F59B] rounded-xl p-4 text-center cursor-pointer transition-colors bg-white/[0.02]">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="receipt-upload"
                  />
                  <label htmlFor="receipt-upload" className="cursor-pointer block">
                    {proofPreview ? (
                      <div className="space-y-2">
                        <img
                          src={proofPreview}
                          alt="Comprobante"
                          className="h-28 mx-auto rounded-lg object-contain border border-white/20 shadow-md"
                        />
                        <span className="text-xs text-slate-300 block font-semibold">
                          Click para cambiar archivo
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1.5 py-2">
                        <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                        <p className="text-xs font-semibold text-white">
                          Arrastra o haz clic para subir tu comprobante
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Formatos aceptados: PNG, JPG, WebP o captura de pantalla bancaria
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Tu comprobante fue indexado. Estado actualizado a: <strong>Verificando Recepción</strong>.</span>
                </div>
              )}

              {proofPreview && !proofUploaded && (
                <button
                  type="button"
                  onClick={handleUploadProof}
                  disabled={isUploadingProof}
                  className="w-full py-2.5 rounded-xl bg-[#00F59B] hover:bg-[#00d885] text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>{isUploadingProof ? 'Procesando comprobante...' : 'Enviar Comprobante Ahora'}</span>
                </button>
              )}
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Servicio:</span>
                <strong className="text-white">{pkg.tierLabel} ({pkg.service})</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Destino detectado:</span>
                <strong className="text-white font-mono">{detected.handle || targetUrl}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Confirmado:</span>
                <strong className="text-[#00F59B] font-mono font-bold text-sm">${totalAmount} MXN</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Método:</span>
                <strong className="text-white uppercase">{paymentMethod}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={SITE_CONFIG.getWhatsappUrl(
                  `Hola Likes Mexicanos 🇲🇽, acabo de registrar mi orden:\n\n• Folio: #${createdOrderId || 'NUEVO'}\n• Paquete: ${pkg.tierLabel} (${pkg.service})\n• Destino: ${detected.handle || targetUrl}\n• WhatsApp: ${contactInfo}\n• Total: $${totalAmount} MXN\n• Método: ${paymentMethod}\n${orderBumpActive ? '• Bump VIP: +300 Likes Extra activado\n' : ''}\n¿Me confirman para despachar de inmediato?`
                )}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#00F59B] to-teal-500 hover:from-[#00F59B]/90 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 will-change-transform"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirmar con Asesor en WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  resetAndClose();
                  onTrackOrder(createdOrderId);
                }}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>Rastrear Estado en Vivo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* STEP 1, 2, 3 WIZARD */
          <div className="mt-5 flex-1 overflow-y-auto pr-1 relative z-10 space-y-5">
            {/* Step progress pills */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 1 ? 'bg-[#FF005C] text-white' : 'bg-[#00F59B] text-slate-950'
                }`}>
                  {step > 1 ? '✓' : '1'}
                </span>
                <span className={step === 1 ? 'text-white font-bold' : 'text-slate-400'}>Destino</span>
              </div>
              <div className="h-0.5 flex-1 mx-3 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 2 ? 'bg-[#FF005C] text-white' : step > 2 ? 'bg-[#00F59B] text-slate-950' : 'bg-white/10 text-slate-400'
                }`}>
                  {step > 2 ? '✓' : '2'}
                </span>
                <span className={step === 2 ? 'text-white font-bold' : 'text-slate-400'}>Contacto &amp; Bumps</span>
              </div>
              <div className="h-0.5 flex-1 mx-3 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 3 ? 'bg-[#FF005C] text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  3
                </span>
                <span className={step === 3 ? 'text-white font-bold' : 'text-slate-400'}>Pago</span>
              </div>
            </div>

            {/* Package snapshot banner */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#00F59B] font-bold uppercase block">{pkg.platform}</span>
                <strong className="text-white text-sm">{pkg.tierLabel} - {pkg.service}</strong>
                <span className="text-[11px] text-slate-400 block">{pkg.delivery}</span>
              </div>
              <div className="text-right">
                <div className="text-xl font-mono font-black text-white">${totalAmount} MXN</div>
                {pkg.oldPrice && !orderBumpActive && (
                  <span className="text-[11px] text-slate-500 line-through">${pkg.oldPrice} MXN</span>
                )}
              </div>
            </div>

            {/* STEP 1: Link or Username with Smart Social Detector */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Paso 1: Pega el enlace de tu perfil, post o ficha de Google Maps
                  </label>
                  <input
                    type="text"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="Ej: https://instagram.com/tu_negocio o tu @usuario"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00F59B] font-mono transition-all"
                  />

                  {/* CRO-03: Real-time Public Account & Social Media Preview */}
                  {targetUrl.trim() && detected.isValid && (
                    <div className="mt-2.5 p-3 rounded-2xl bg-[#0F172A] border border-[#00F59B]/40 space-y-2 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00F59B] animate-pulse" />
                          <span className="text-[#00F59B] font-bold text-xs">
                            Cuenta Pública Verificada ✅
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#00F59B]/20 text-[#00F59B] font-bold">
                          {detected.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-300 pt-1.5 border-t border-white/10">
                        <span className="font-mono text-white font-bold">{detected.handle || targetUrl}</span>
                        <span className="text-emerald-400 text-[11px] font-medium">Cero Contraseñas • Entrega Segura</span>
                      </div>
                    </div>
                  )}

                  {!matchCheck.matches && (
                    <p className="mt-2 text-xs text-amber-400 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" /> {matchCheck.warning}
                    </p>
                  )}

                  {urlError && (
                    <p className="mt-1.5 text-xs text-[#FF005C] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {urlError}
                    </p>
                  )}
                </div>

                {/* AI-01: Review Generator if Google Maps or Custom Comments */}
                {isReviewService && (
                  <div className="pt-2">
                    <AICommentGenerator
                      businessType="Negocio Local"
                      city="CDMX"
                      initialCount={5}
                      onSaveComments={(reviews) => setCustomComments(reviews)}
                    />
                  </div>
                )}

                <div className="p-3 rounded-xl bg-[#00F59B]/10 border border-[#00F59B]/20 text-xs text-[#00F59B] flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Seguro:</strong> Cero contraseñas requeridas. Solo perfiles y publicaciones públicas con entrega gradual anti-bloqueo.
                  </span>
                </div>

                <button
                  onClick={handleNextStep1}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF005C] to-[#7928CA] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Continuar al Paso 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Contact Info + CRO-01 Order Bump */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    WhatsApp (10 dígitos en México):
                  </label>
                  <input
                    type="tel"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Ej: 55 1234 5678"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00F59B] font-mono transition-all"
                  />
                  {contactError && (
                    <p className="mt-1.5 text-xs text-[#FF005C] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {contactError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Correo Electrónico (Opcional para recibo fiscal):
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@tunegocio.mx"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00F59B] font-sans transition-all"
                  />
                </div>

                {/* CRO-01: Order Bump Golden VIP Card */}
                <div
                  onClick={() => setOrderBumpActive(!orderBumpActive)}
                  className={`p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer select-none ${
                    orderBumpActive
                      ? 'border-[#FFB800] bg-[#FFB800]/10 shadow-lg shadow-[#FFB800]/10'
                      : 'border-[#FFB800]/40 bg-[#FFB800]/5 hover:border-[#FFB800]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={orderBumpActive}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 rounded text-[#FFB800] focus:ring-0 cursor-pointer accent-[#FFB800]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#FFB800] uppercase tracking-wide flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 fill-[#FFB800]" /> ⚡ OFERTA ÚNICA: +300 Likes MX + Garantía 1 Año
                        </span>
                        <span className="font-mono font-extrabold text-white text-xs">+$59 MXN</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Agrega +300 interacciones extra distribuidas en tus publicaciones y activa la <strong>Garantía de Reposición Prioritaria por 1 Año</strong> contra cualquier actualización de algoritmo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cross-sell for followers */}
                {pkg.service && pkg.service.toLowerCase().includes('seguidor') && (
                  <div
                    onClick={() => setCrossSellActive(!crossSellActive)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      crossSellActive
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={crossSellActive}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 accent-[#00F59B]"
                        />
                        <span className="font-bold text-white">Añadir Likes en tus últimas 3 publicaciones (35% OFF)</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-400">+$99 MXN</span>
                    </div>
                  </div>
                )}

                {/* CFDI Toggle */}
                <div className="pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requiresCfdi}
                      onChange={(e) => setRequiresCfdi(e.target.checked)}
                      className="accent-[#00F59B]"
                    />
                    <span>Requiero Factura Fiscal Mexicana (CFDI 4.0 con IVA desglosado)</span>
                  </label>
                  {requiresCfdi && (
                    <input
                      type="text"
                      placeholder="Ingresa tu RFC (12 o 13 dígitos)"
                      value={cfdiRfc}
                      onChange={(e) => setCfdiRfc(e.target.value.toUpperCase())}
                      className="mt-2 w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white text-xs font-mono uppercase"
                    />
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={handleNextStep2}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#FF005C] to-[#7928CA] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>Continuar a Métodos de Pago (${totalAmount} MXN)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Method Selection */}
            {step === 3 && (
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-300 block">
                  Paso 3: Selecciona tu método de pago preferido en México
                </label>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'SPEI', label: 'SPEI Interbancario', icon: '⚡', desc: 'Acreditación instantánea' },
                    { id: 'OXXO_PAY', label: 'OXXO Pay', icon: '🏪', desc: 'Pago en efectivo' },
                    { id: 'MERCADO_PAGO', label: 'Mercado Pago / Tarjeta', icon: '💳', desc: 'Débito o crédito' },
                    { id: 'WALLET_VIP', label: 'Asesor Directo', icon: '🇲🇽', desc: 'Atención personalizada' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        paymentMethod === m.id
                          ? 'bg-[#00F59B]/15 border-[#00F59B] text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs text-white">
                        <span>{m.icon}</span>
                        <span>{m.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">{m.desc}</span>
                    </button>
                  ))}
                </div>

                {/* SPEI Details (Instant Fintech Bank Sheet) */}
                {paymentMethod === 'SPEI' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1020] border border-[#00F59B]/40 text-xs space-y-3 shadow-lg">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse" />
                        <span className="font-extrabold text-white text-xs">Ficha Digital SPEI STP (Automatización 24/7)</span>
                      </div>
                      <span className="text-[10px] text-[#00F59B] font-mono font-bold bg-[#00F59B]/10 px-2 py-0.5 rounded border border-[#00F59B]/30">
                        Acreditación en 2 min
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-300">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Banco Receptor:</span>
                        <strong className="text-white">STP / BBVA Bancomer</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Beneficiario:</span>
                        <strong className="text-white">Likes Mexicanos Reales</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-white/15">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono">CLABE INTERBANCARIA:</span>
                        <span className="font-mono font-black text-[#00F59B] text-sm tracking-wider">646180123456789012</span>
                      </div>
                      <button
                        type="button"
                        onClick={copyClabe}
                        className="px-3 py-1.5 rounded-lg bg-[#00F59B] text-slate-950 font-black text-xs flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 shadow"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedClabe ? '¡Copiada!' : 'Copiar CLABE'}</span>
                      </button>
                    </div>

                    <div className="flex justify-between text-slate-400 text-[11px] pt-1">
                      <span>Concepto: <strong className="text-white">LMX-{Math.floor(1000 + Math.random() * 9000)}</strong></span>
                      <span>Monto exacto: <strong className="text-[#00F59B] text-xs font-mono font-bold">${totalAmount} MXN</strong></span>
                    </div>

                    <p className="text-[10px] text-slate-400 bg-white/[0.02] p-2 rounded-lg border border-white/5">
                      ⚡ <strong>Ventas nocturnas activas:</strong> Puedes transferir a las 2:00 AM y tu pedido comenzará a sincronizarse con los nodos residenciales de inmediato sin intervención manual.
                    </p>
                  </div>
                )}

                {/* OXXO Details (Fintech Barcode Voucher) */}
                {paymentMethod === 'OXXO_PAY' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#141009] border border-amber-500/40 text-xs space-y-3 shadow-lg">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="font-extrabold text-white text-xs">Ficha Digital OXXO Pay Oficial</span>
                      </div>
                      <span className="text-[10px] text-amber-300 font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        Vigencia: 48 Horas
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span>Referencia Numérica de 14 Dígitos:</span>
                      <strong className="font-mono text-amber-300 text-sm tracking-wider">9328 1049 5820 14</strong>
                    </div>

                    {/* Barcode Visual */}
                    <div className="p-3 bg-white rounded-xl flex flex-col items-center justify-center shadow-inner">
                      <div className="h-10 w-full max-w-xs flex justify-between items-center overflow-hidden px-2">
                        {[4, 2, 6, 1, 3, 5, 2, 4, 1, 3, 6, 2, 4, 3, 5, 2, 1, 4, 3, 5, 2, 4, 1, 3, 5, 2, 3, 4, 2].map((w, i) => (
                          <div key={i} className="h-full bg-black" style={{ width: `${w * 2}px` }} />
                        ))}
                      </div>
                      <span className="font-mono text-xs text-black font-bold tracking-widest mt-1.5">93281049582014</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400">Total a pagar en caja: <strong className="text-white">${totalAmount} MXN</strong></span>
                      <button
                        type="button"
                        onClick={copyOxxo}
                        className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 transition-transform hover:scale-105 active:scale-95"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedOxxo ? '¡Copiado!' : 'Copiar Referencia'}</span>
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 bg-white/[0.02] p-2 rounded-lg border border-white/5">
                      🏪 Paga en efectivo en cualquiera de las más de 21,000 tiendas OXXO de México. Se acredita al instante.
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs"
                  >
                    Atrás
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#00F59B] to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>Confirmar y Registrar Pedido (${totalAmount} MXN)</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
