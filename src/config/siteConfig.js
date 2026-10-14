/**
 * Centralized site configuration for Likes Mexicanos Reales
 * Supports runtime environment variables with fallback defaults.
 */
export const SITE_CONFIG = {
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '5215512345678',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://likesmexicanos.com',
  companyName: 'Likes Mexicanos Reales',
  brandColors: {
    neon: '#00F59B',
    pink: '#FF005C',
    purple: '#7928CA',
    gold: '#FFB800',
    obsidian: '#050811',
    card: '#0F1424',
  },
  /**
   * Generates a direct WhatsApp click-to-chat URL with encoded text
   */
  getWhatsappUrl: (text = '') => {
    const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5215512345678';
    const cleanNumber = rawNumber.replace(/\D/g, '');
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${cleanNumber}${encoded ? `?text=${encoded}` : ''}`;
  },
};

export default SITE_CONFIG;
