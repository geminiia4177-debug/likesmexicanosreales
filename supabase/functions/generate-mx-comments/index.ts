// ==============================================================================
// Supabase Edge Function: generate-mx-comments
// Generador IA de Reseñas de Google Maps 5★ y Comentarios en Jerga Mexicana Real
// ==============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";
const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Algoritmo de respaldo de alta fidelidad con jerga mexicana real si las API keys no están presentes
function generateLocalMexicanComments(businessType: string, city: string, count: number): string[] {
  const intros = [
    "Súper recomendados la verdad.",
    "Excelente atención desde que llegas.",
    "La neta me sorprendió la calidad del servicio.",
    "10/10 en todo.",
    "De los mejores lugares que he visitado en",
    "Muy buena experiencia.",
    "Vine por recomendación de un compa y valió 100% la pena.",
    "Tenía mis dudas pero mis respetos con el trato.",
    "Servicio de primera.",
    "Precios súper justos y todo bien puntual.",
  ];

  const mid = [
    `El personal te atiende de volada y súper amables en su sede de ${city}.`,
    `Tienen todo impecable y muy profesional. Da gusto apoyar negocios locales aquí en ${city}.`,
    `Se nota que le ponen empeño a cada detalle y no te hacen perder el tiempo.`,
    `Todo transparente y sin letras chiquitas, como debe ser.`,
    `Llegué sin mucha fe y salí fascinado con los resultados.`,
    `La atención al cliente es una chulada, te resuelven cualquier duda al instante.`,
    `Ya van varias veces que vengo con mi familia y siempre quedamos encantados.`,
    `Cumplieron exactamente con lo prometido y en tiempo récord.`,
  ];

  const outros = [
    "Definitivamente regresaré pronto. ¡Sigan así!",
    "Ampliamente recomendados para cualquiera en la zona.",
    "Valen cada peso invertido, una joya en " + city + ".",
    "Les dejo sus 5 estrellas bien merecidas ⭐️⭐️⭐️⭐️⭐️.",
    "Ya se convirtieron en mi lugar de cabecera.",
    "Si están dudando en venir, anímense porque no fallan.",
    "Un saludo a todo el equipo, se rifaron.",
  ];

  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    const intro = intros[Math.floor(Math.random() * intros.length)];
    const middle = mid[Math.floor(Math.random() * mid.length)];
    const outro = outros[Math.floor(Math.random() * outros.length)];
    results.push(`${intro} ${middle} ${outro}`);
  }
  return results;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { businessType = "Restaurante", city = "CDMX", count = 5 } = await req.json();
    const clampedCount = Math.max(1, Math.min(25, Number(count) || 5));

    // Si hay Gemini API Key configurada
    if (GEMINI_API_KEY) {
      const prompt = `Actúa como varios clientes mexicanos reales que dejan opiniones en Google Maps de 5 estrellas para un negocio de tipo "${businessType}" ubicado en "${city}, México".
Genera exactamente ${clampedCount} reseñas únicas, realistas y naturales.
Reglas estrictas:
- Usa español mexicano auténtico, creíble y sutil (modismos como "la neta", "de volada", "mis respetos", "súper amables", "precios justos", "una chulada").
- Menciona aspectos clave del negocio y la ciudad (${city}) para SEO Local.
- Varía las longitudes: algunas cortas (2 líneas), otras medianas (4 líneas).
- Devuelve ÚNICAMENTE un arreglo JSON de strings, sin texto adicional ni markdown. Ejemplo: ["reseña 1", "reseña 2"]`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return new Response(JSON.stringify({ comments: parsed, provider: "gemini-2.5-flash" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
    }

    // Fallback generador inteligente con modismos mexicanos
    const generated = generateLocalMexicanComments(businessType, city, clampedCount);
    return new Response(JSON.stringify({ comments: generated, provider: "local-mexican-engine" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
