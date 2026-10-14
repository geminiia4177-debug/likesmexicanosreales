import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Plus,
  Trash2,
  Check,
  Star,
  MapPin,
  Building2,
  MessageSquare,
  Copy,
  Zap,
  CheckCircle2,
  Sliders
} from 'lucide-react';

const MEXICAN_REVIEW_TEMPLATES = [
  (b, c) => `Súper recomendados aquí en ${c}. Fui por recomendación de un amigo y la atención de ${b} es de primer nivel. Muy puntuales y amables.`,
  (b, c) => `Excelente servicio y atención al cliente. Encontrar un buen lugar de ${b} en ${c} a veces es difícil, pero con ellos todo 10/10. Muy limpios e higiénicos.`,
  (b, c) => `La neta se rifaron. Precios justos, trato súper cálido desde que llegas y el resultado quedó de lujo. 100% recomendados en toda la zona de ${c}.`,
  (b, c) => `Tenía dudas al principio pero la experiencia con ${b} superó mis expectativas. Te explican todo con calma y sin prisas. Sin duda vuelvo pronto.`,
  (b, c) => `Gran calidad en su servicio. Llegué un poco apretado de tiempo y me atendieron rapidísimo sin descuidar el detalle. De lo mejor que hay en ${c} ⭐⭐⭐⭐⭐`,
  (b, c) => `Muy profesionales y honestos. Me gustó que no te quieren vender cosas que no necesitas, te dan exactamente lo que pides. Felicidades a todo el equipo de ${b}!`,
  (b, c) => `Instalaciones muy cómodas, ubicación accesible y la atención de diez. Se nota la experiencia que tienen aquí en ${c}. Gracias por todo!`,
  (b, c) => `Llevo viniendo un par de ocasiones y siempre mantienen el mismo estándar de calidad. Si estás buscando ${b} en ${c}, ni le pienses.`,
  (b, c) => `Servicio impecable. Todo el personal muy atento y educado. Cumplieron con los tiempos prometidos y los costos son súper accesibles. Recomendadísimos!`,
  (b, c) => `Maravillosa experiencia. Me atendieron con mucha paciencia y el resultado final valió completamente cada centavo. Un orgullo tener opciones así en ${c}.`,
];

export default function AICommentGenerator({
  businessType = 'Taquería en Roma Norte',
  city = 'CDMX',
  initialCount = 5,
  onSaveComments,
}) {
  const [businessInput, setBusinessInput] = useState(businessType);
  const [cityInput, setCityInput] = useState(city);
  const [comments, setComments] = useState(() => {
    return MEXICAN_REVIEW_TEMPLATES.slice(0, initialCount).map((fn, i) => ({
      id: `rev_${i + 1}`,
      text: fn(businessType, city),
      rating: 5,
    }));
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    // Simulates ultra-fast AI generation with curated local Mexican prompts
    setTimeout(() => {
      const bName = businessInput.trim() || 'este negocio';
      const cName = cityInput.trim() || 'México';
      const shuffled = [...MEXICAN_REVIEW_TEMPLATES].sort(() => 0.5 - Math.random());
      const newItems = shuffled.slice(0, Math.max(comments.length, 5)).map((fn, i) => ({
        id: `rev_${Date.now()}_${i}`,
        text: fn(bName, cName),
        rating: 5,
      }));
      setComments(newItems);
      setIsGenerating(false);
      if (onSaveComments) onSaveComments(newItems.map(c => c.text));
    }, 450);
  };

  const handleUpdateText = (id, newText) => {
    const updated = comments.map(c => c.id === id ? { ...c, text: newText } : c);
    setComments(updated);
    if (onSaveComments) onSaveComments(updated.map(c => c.text));
  };

  const handleRemove = (id) => {
    const filtered = comments.filter(c => c.id !== id);
    setComments(filtered);
    if (onSaveComments) onSaveComments(filtered.map(c => c.text));
  };

  const handleAddCustom = () => {
    const newComment = {
      id: `rev_${Date.now()}`,
      text: `Excelente servicio en ${businessInput.trim() || 'el negocio'}, 100% recomendado en ${cityInput.trim() || 'mi ciudad'}.`,
      rating: 5,
    };
    const updated = [...comments, newComment];
    setComments(updated);
    if (onSaveComments) onSaveComments(updated.map(c => c.text));
  };

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#0B0F1E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Background neon glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GENERADOR IA CON JERGA MEXICANA REAL</span>
          </div>
          <h3 className="text-white text-base sm:text-lg font-extrabold">
            Redacción de Reseñas Google Maps 5★ y Comentarios
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Textos realistas, variados y geolocalizados para mejorar tu posicionamiento SEO local en México.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Generando con IA...' : 'Regenerar con IA'}</span>
        </button>
      </div>

      {/* Input parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="text-[11px] font-bold text-slate-300 block mb-1">
            Giro o Nombre de tu Negocio:
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={businessInput}
              onChange={(e) => setBusinessInput(e.target.value)}
              placeholder="Ej: Clínica Dental Polanco, Taller Mecánico"
              className="w-full bg-[#121626] border border-white/15 focus:border-[#00F59B] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-300 block mb-1">
            Ciudad, Municipio o Colonia en México:
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Ej: CDMX, Monterrey, Guadalajara, Querétaro"
              className="w-full bg-[#121626] border border-white/15 focus:border-[#00F59B] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Review Cards list */}
      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
        {comments.map((comment, index) => (
          <div
            key={comment.id}
            className="bg-[#121626]/80 border border-white/10 hover:border-white/20 rounded-xl p-3 sm:p-4 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-slate-300">
                  Reseña #{index + 1}
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => handleCopy(comment.id, comment.text)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 text-xs transition-colors"
                  title="Copiar texto"
                >
                  {copiedId === comment.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                {comments.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(comment.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-xs transition-colors"
                    title="Eliminar de la lista"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <textarea
              rows={2}
              value={comment.text}
              onChange={(e) => handleUpdateText(comment.id, e.target.value)}
              className="w-full bg-[#080B15] border border-white/10 focus:border-emerald-500 rounded-lg p-2.5 text-xs text-slate-200 outline-none resize-none font-sans transition-all"
            />
          </div>
        ))}
      </div>

      {/* Footer controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-white/10 text-xs">
        <button
          type="button"
          onClick={handleAddCustom}
          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 font-semibold flex items-center gap-1.5 border border-white/10 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>Agregar Otra Reseña</span>
        </button>

        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{comments.length} reseñas listas para enviar al pedido</span>
        </div>
      </div>
    </div>
  );
}
