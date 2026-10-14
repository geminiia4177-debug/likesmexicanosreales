import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveLandingLead } from '../services/orderService';

const LandingCustomizerContext = createContext(null);
const CUSTOMIZER_STORAGE_KEY = 'lmx_customizer_v3';

export const ARCHETYPE_CONFIGS = {
  editorial: {
    archetype: 'editorial',
    fontHeading: 'font-editorial',
    fontBody: 'font-clinical',
    radiusPreset: 'none',
    borderClass: 'border border-stone-200/80',
    shadowClass: 'shadow-none',
    motionPreset: 'slow-fade',
  },
  brutalist: {
    archetype: 'brutalist',
    fontHeading: 'font-brutalist-condensed',
    fontBody: 'font-brutalist-mono',
    radiusPreset: 'none',
    borderClass: 'border-2 border-black',
    shadowClass: 'shadow-brutalist',
    motionPreset: 'snappy-spring',
  },
  industrial: {
    archetype: 'industrial',
    fontHeading: 'font-industrial',
    fontBody: 'font-industrial-mono',
    radiusPreset: 'sm',
    borderClass: 'border border-amber-500/40',
    shadowClass: 'shadow-sm',
    motionPreset: 'kinetic',
  },
  clinical: {
    archetype: 'clinical',
    fontHeading: 'font-clinical',
    fontBody: 'font-clinical',
    radiusPreset: 'bento',
    borderClass: 'border border-slate-100',
    shadowClass: 'shadow-xl shadow-blue-500/5',
    motionPreset: 'slow-fade',
  },
  craft: {
    archetype: 'craft',
    fontHeading: 'font-editorial',
    fontBody: 'font-clinical',
    radiusPreset: 'sm',
    borderClass: 'border border-amber-900/20',
    shadowClass: 'shadow-md shadow-stone-900/5',
    motionPreset: 'slow-fade',
  },
};

export function LandingCustomizerProvider({ children }) {
  const [customData, setCustomData] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOMIZER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      businessName: '',
      city: '',
      phone: '',
      isCustomized: false,
      archetype: 'clinical',
      fontHeading: 'font-clinical',
      radiusPreset: 'bento',
      motionPreset: 'slow-fade',
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMIZER_STORAGE_KEY, JSON.stringify(customData));
    } catch (e) {
      console.error('Error saving customizer data:', e);
    }
  }, [customData]);

  const updateCustomizer = (field, value) => {
    setCustomData((prev) => ({
      ...prev,
      [field]: value,
      isCustomized: Boolean(
        (field === 'businessName' ? value : prev.businessName) ||
        (field === 'city' ? value : prev.city)
      ),
    }));
  };

  const setArchetype = (archetypeKey) => {
    const config = ARCHETYPE_CONFIGS[archetypeKey] || ARCHETYPE_CONFIGS.clinical;
    setCustomData((prev) => ({
      ...prev,
      ...config,
    }));
  };

  const applyCustomization = (data) => {
    setCustomData((prev) => ({
      ...prev,
      businessName: data.businessName || '',
      city: data.city || '',
      phone: data.phone || '',
      isCustomized: Boolean(data.businessName || data.city),
      archetype: data.archetype || prev.archetype || 'clinical',
      fontHeading: data.fontHeading || prev.fontHeading || 'font-clinical',
      radiusPreset: data.radiusPreset || prev.radiusPreset || 'bento',
      motionPreset: data.motionPreset || prev.motionPreset || 'slow-fade',
    }));
  };

  const resetCustomizer = () => {
    setCustomData({
      businessName: '',
      city: '',
      phone: '',
      isCustomized: false,
      archetype: 'clinical',
      fontHeading: 'font-clinical',
      radiusPreset: 'bento',
      motionPreset: 'slow-fade',
    });
    localStorage.removeItem(CUSTOMIZER_STORAGE_KEY);
  };

  const submitLead = async (templateKey) => {
    return await saveLandingLead({
      template_key: templateKey,
      business_name: customData.businessName,
      city_mx: customData.city,
      client_whatsapp: customData.phone,
      customization_config: customData,
    });
  };

  return (
    <LandingCustomizerContext.Provider
      value={{
        ...customData,
        updateCustomizer,
        setArchetype,
        applyCustomization,
        resetCustomizer,
        submitLead,
      }}
    >
      {children}
    </LandingCustomizerContext.Provider>
  );
}

export function useLandingCustomizer() {
  const context = useContext(LandingCustomizerContext);
  if (!context) {
    return {
      businessName: '',
      city: '',
      phone: '',
      isCustomized: false,
      archetype: 'clinical',
      fontHeading: 'font-clinical',
      radiusPreset: 'bento',
      motionPreset: 'slow-fade',
      updateCustomizer: () => {},
      setArchetype: () => {},
      applyCustomization: () => {},
      resetCustomizer: () => {},
      submitLead: async () => {},
    };
  }
  return context;
}

export default LandingCustomizerContext;
