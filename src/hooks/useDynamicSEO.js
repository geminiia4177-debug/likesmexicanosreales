import { useEffect } from 'react';

export const SEO_LANDING_CONFIGS = {
  tequila: {
    title: 'Hacienda El Alma de Agave | Destilados Artesanales & E-Commerce Gourmet — Demo por Likes Mexicanos',
    description: 'Tienda en línea de tequila artesanal y mezcal con notas de cata interactivas, degustaciones mix & match y checkout SPEI/OXXO.',
    image: '/images/tequila.webp',
    schemaType: 'Winery',
    businessName: 'Hacienda El Alma de Agave',
    city: 'Tequila, Jalisco',
  },
  tacos: {
    title: 'Taquería El Pastor Sagrado | Taquizas para Eventos & Delivery CDMX — Demo por Likes Mexicanos',
    description: 'Menú interactivo con taquizas para eventos empresariales, cotizador descargable en PDF y delivery nocturno con salsas de autor.',
    image: '/images/tacos.webp',
    schemaType: 'Restaurant',
    businessName: 'Taquería El Pastor Sagrado',
    city: 'Roma Norte, CDMX',
  },
  barberia: {
    title: 'El Barbero del Centro | Barbería Tradicional & Pomadas Mexicanas — Demo por Likes Mexicanos',
    description: 'Agendador de citas con barbero favorito, pomadas de fijación artesanal y recordatorios directos en WhatsApp & Calendario .ics.',
    image: '/images/barberia.webp',
    schemaType: 'HairSalon',
    businessName: 'El Barbero del Centro',
    city: 'Centro Histórico, CDMX',
  },
  estetica: {
    title: 'Lumina Polanco Beauty & Spa | Balayage & Nail Bar CDMX — Demo por Likes Mexicanos',
    description: 'Quiz capilar inteligente en 3 pasos, cotizador de cambio de look en vivo y agendamiento VIP sin anticipo.',
    image: '/images/estetica.webp',
    schemaType: 'BeautySalon',
    businessName: 'Lumina Polanco Beauty & Spa',
    city: 'Polanco, CDMX',
  },
  calzado: {
    title: 'León Piel & Sneakers | Calzado Artesanal de León, Guanajuato — Demo por Likes Mexicanos',
    description: 'Boutique de calzado de piel genuina con conversor interactivo de tallas MX/US, carrito lateral y envío gratis en México.',
    image: '/images/calzado.webp',
    schemaType: 'ShoeStore',
    businessName: 'León Piel & Sneakers',
    city: 'León, Guanajuato',
  },
  taller: {
    title: 'CDMX Auto Werks Garage | Mecánica Especializada & Verificación CDMX — Demo por Likes Mexicanos',
    description: 'Diagnóstico por testigos de tablero, validador de placas CDMX/EdoMex con calendario de verificación y cotizador por tipo de vehículo.',
    image: '/images/taller.webp',
    schemaType: 'AutoRepair',
    businessName: 'CDMX Auto Werks Garage',
    city: 'Del Valle & Santa Fe, CDMX',
  },
  cafe: {
    title: 'Café Corazón Artesanal | Cafetería de Especialidad & Club de Suscripción — Demo por Likes Mexicanos',
    description: 'Café de especialidad de Chiapas y Oaxaca con selector de molienda en vivo, panadería de masa madre y club mensual con 15% OFF.',
    image: '/images/cafe.webp',
    schemaType: 'CafeOrCoffeeShop',
    businessName: 'Café Corazón Artesanal',
    city: 'Coyoacán, CDMX',
  },
  veterinaria: {
    title: 'Mascota Feliz Hospital 24/7 | Pet Spa & Urgencias Veterinarias — Demo por Likes Mexicanos',
    description: 'Triaje rápido de emergencias 24/7 con taxi pet a domicilio y calculadora de plan preventivo anual según la talla del perro o gato.',
    image: '/images/veterinaria.webp',
    schemaType: 'VeterinaryCare',
    businessName: 'Mascota Feliz Hospital & Pet Spa',
    city: 'Condesa & San Jerónimo, CDMX',
  },
  dental: {
    title: 'Oralé Studio Polanco | Diseño de Sonrisa 3D & Carillas E-Max — Demo por Likes Mexicanos',
    description: 'Simulador visual de tonos de carillas dentales, comparativa Antes/Después 3D y calculadora a Meses Sin Intereses.',
    image: '/images/dental.webp',
    schemaType: 'Dentist',
    businessName: 'Oralé Studio Polanco',
    city: 'Polanco Masaryk, CDMX',
  },
  tulum: {
    title: "K'AAN Tulum Estates | Luxury Condos & Retorno de Inversión — Demo por Likes Mexicanos",
    description: 'Bienes raíces biofílicos en la Riviera Maya con simulador de plusvalía y ROI en USD/MXN y financiamiento directo en preventa.',
    image: '/images/tulum.webp',
    schemaType: 'RealEstateAgent',
    businessName: "K'AAN Tulum Estates",
    city: 'Riviera Maya, Quintana Roo',
  },
  gym: {
    title: 'Volcán Azteca High Performance | Fitness Club & Pase VIP 1 Día — Demo por Likes Mexicanos',
    description: 'Club de alto rendimiento con generación instantánea de Pase de 1 Día con Código QR real y membresías deducibles CFDI.',
    image: '/images/gym.webp',
    schemaType: 'HealthClub',
    businessName: 'Volcán Azteca High Performance',
    city: 'CDMX & Monterrey',
  },
};

const DEFAULT_SEO = {
  title: 'Likes Mexicanos Reales 🇲🇽 | Autoridad, Crecimiento Digital & Desarrollo Web',
  description: 'Impulsa tu presencia digital con perfiles 100% mexicanos y geolocalizados. Likes, seguidores reales, reseñas Google Maps y diseño de landing pages premium para el mercado mexicano.',
  image: '/banner.webp',
};

/**
 * useDynamicSEO
 * Dynamically updates document.title, OG tags, Twitter tags and JSON-LD schema
 */
export function useDynamicSEO(landingKey = null) {
  useEffect(() => {
    const config = (landingKey && SEO_LANDING_CONFIGS[landingKey]) || DEFAULT_SEO;

    // 1. Update Title
    document.title = config.title;

    // 2. Helper to set meta tags
    const setMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName, attrVal] = selector.replace('meta[', '').replace(']', '').split('=');
        element.setAttribute(attrName, attrVal.replace(/['"]/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    setMetaTag('meta[name="description"]', 'content', config.description);
    setMetaTag('meta[property="og:title"]', 'content', config.title);
    setMetaTag('meta[property="og:description"]', 'content', config.description);
    setMetaTag('meta[property="og:image"]', 'content', config.image);
    setMetaTag('meta[name="twitter:title"]', 'content', config.title);
    setMetaTag('meta[name="twitter:description"]', 'content', config.description);
    setMetaTag('meta[name="twitter:image"]', 'content', config.image);

    // 3. Update canonical & Open Graph URL (Never localhost)
    const siteBase = import.meta.env.VITE_SITE_URL || 'https://likesmexicanos.com';
    const canonicalUrl = `${siteBase}${landingKey ? `/demo/${landingKey}` : '/'}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);

    // 4. Update Schema.org JSON-LD
    let scriptTag = document.getElementById('dynamic-jsonld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (landingKey && SEO_LANDING_CONFIGS[landingKey]) {
      const data = SEO_LANDING_CONFIGS[landingKey];
      scriptTag.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': data.schemaType || 'LocalBusiness',
        'name': data.businessName,
        'description': data.description,
        'image': siteBase + data.image,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': data.city,
          'addressCountry': 'MX',
        },
        'provider': {
          '@type': 'Organization',
          'name': 'Likes Mexicanos Reales',
          'url': siteBase,
        },
      });
    } else {
      scriptTag.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Likes Mexicanos Reales',
        'url': siteBase,
        'logo': siteBase + '/logo.webp',
        'description': DEFAULT_SEO.description,
      });
    }
  }, [landingKey]);
}

export default useDynamicSEO;
