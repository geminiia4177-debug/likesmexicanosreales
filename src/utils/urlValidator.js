/**
 * URL Validator & Social Media Detector for Mexican Market
 * Sanitizes junk params (?igsh=, ?utm_source=, etc.) and extracts handles
 */

export function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  try {
    let clean = url.trim();
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      if (clean.includes('.') || clean.startsWith('@')) {
        clean = 'https://' + clean.replace(/^@/, '');
      }
    }
    const parsed = new URL(clean);
    // Strip common tracking queries
    const paramsToRemove = ['igsh', 'utm_source', 'utm_medium', 'utm_campaign', 'fbclid', 'source', 'share_id', 'ref'];
    paramsToRemove.forEach(p => parsed.searchParams.delete(p));
    return parsed.toString();
  } catch (e) {
    // If not a full valid URL, return trimmed string
    return url.trim().split('?')[0];
  }
}

export function detectSocialPlatform(inputUrl) {
  if (!inputUrl) {
    return { platform: null, handle: null, isValid: false, warning: null };
  }

  const clean = sanitizeUrl(inputUrl).toLowerCase();

  // 1. Instagram
  if (clean.includes('instagram.com') || clean.includes('instagr.am')) {
    // Match /p/post_id or /username
    const parts = clean.split('instagram.com/')[1]?.split('/')[0]?.replace('@', '');
    const handle = parts ? `@${parts}` : null;
    return {
      platform: 'instagram',
      name: 'Instagram',
      handle: handle,
      cleanUrl: clean,
      isValid: true,
      color: '#E1306C',
    };
  }

  // 2. Facebook
  if (clean.includes('facebook.com') || clean.includes('fb.watch') || clean.includes('fb.com')) {
    const handle = clean.split('facebook.com/')[1]?.split('/')[0]?.split('?')[0] || 'Página de Facebook';
    return {
      platform: 'facebook',
      name: 'Facebook Fanpage / Post',
      handle: `@${handle.replace('@', '')}`,
      cleanUrl: clean,
      isValid: true,
      color: '#1877F2',
    };
  }

  // 3. TikTok
  if (clean.includes('tiktok.com')) {
    const match = clean.match(/@([a-zA-Z0-9_.-]+)/);
    const handle = match ? `@${match[1]}` : 'Perfil TikTok';
    return {
      platform: 'tiktok',
      name: 'TikTok',
      handle: handle,
      cleanUrl: clean,
      isValid: true,
      color: '#00F2FE',
    };
  }

  // 4. Google Maps / Places
  if (clean.includes('google.com/maps') || clean.includes('maps.app.goo.gl') || clean.includes('goo.gl/maps') || clean.includes('g.page')) {
    return {
      platform: 'gmaps',
      name: 'Google Maps Business',
      handle: 'Ficha de Google Negocios',
      cleanUrl: clean,
      isValid: true,
      color: '#34A853',
    };
  }

  // 5. YouTube
  if (clean.includes('youtube.com') || clean.includes('youtu.be')) {
    return {
      platform: 'youtube',
      name: 'YouTube',
      handle: 'Canal / Video YouTube',
      cleanUrl: clean,
      isValid: true,
      color: '#FF0000',
    };
  }

  // Handle bare handle like @taquerialospastores or simple URL
  if (inputUrl.startsWith('@') || /^[a-zA-Z0-9_.-]{3,30}$/.test(inputUrl.trim())) {
    return {
      platform: 'handle',
      name: 'Usuario / Handle',
      handle: inputUrl.startsWith('@') ? inputUrl : `@${inputUrl.trim()}`,
      cleanUrl: inputUrl.trim(),
      isValid: true,
      color: '#00F59B',
    };
  }

  // Generic valid URL
  if (clean.startsWith('http')) {
    return {
      platform: 'web',
      name: 'Enlace Web / Sistema',
      handle: clean.replace(/^https?:\/\//, '').split('/')[0],
      cleanUrl: clean,
      isValid: true,
      color: '#00F59B',
    };
  }

  return {
    platform: 'unknown',
    name: 'Formato no reconocido',
    handle: null,
    cleanUrl: inputUrl,
    isValid: false,
    warning: 'Ingresa un enlace completo (ej: https://instagram.com/tu_cuenta o tu @usuario)',
  };
}

/**
 * Validate that the pasted URL matches the selected service
 */
export function validateServiceTargetMatch(serviceId, detectedPlatform) {
  if (!serviceId || !detectedPlatform || detectedPlatform.platform === 'unknown') {
    return { matches: true };
  }

  const s = serviceId.toLowerCase();
  const p = detectedPlatform.platform;

  if (s.includes('gmaps') || s.includes('google')) {
    if (p !== 'gmaps' && p !== 'unknown' && p !== 'web') {
      return {
        matches: false,
        warning: `Elegiste Reseñas de Google Maps, pero pegaste un enlace de ${detectedPlatform.name}. Por favor pega el enlace de tu ficha en Google Maps.`,
      };
    }
  }

  if (s.includes('instagram') || s.includes('ig_')) {
    if (p === 'facebook' || p === 'tiktok' || p === 'gmaps') {
      return {
        matches: false,
        warning: `Elegiste un servicio de Instagram, pero pegaste un enlace de ${detectedPlatform.name}.`,
      };
    }
  }

  if (s.includes('facebook') || s.includes('fb_')) {
    if (p === 'instagram' || p === 'tiktok' || p === 'gmaps') {
      return {
        matches: false,
        warning: `Elegiste un servicio de Facebook, pero pegaste un enlace de ${detectedPlatform.name}.`,
      };
    }
  }

  return { matches: true };
}
