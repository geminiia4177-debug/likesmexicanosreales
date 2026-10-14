import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveLandingLead } from '../services/orderService';

const LandingCustomizerContext = createContext(null);
const CUSTOMIZER_STORAGE_KEY = 'lmx_customizer_v2';

export function LandingCustomizerProvider({ children }) {
  const [customData, setCustomData] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOMIZER_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            businessName: '',
            city: '',
            phone: '',
            isCustomized: false,
          };
    } catch (e) {
      return { businessName: '', city: '', phone: '', isCustomized: false };
    }
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

  const applyCustomization = (data) => {
    setCustomData({
      businessName: data.businessName || '',
      city: data.city || '',
      phone: data.phone || '',
      isCustomized: Boolean(data.businessName || data.city),
    });
  };

  const resetCustomizer = () => {
    setCustomData({
      businessName: '',
      city: '',
      phone: '',
      isCustomized: false,
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
      updateCustomizer: () => {},
      applyCustomization: () => {},
      resetCustomizer: () => {},
      submitLead: async () => {},
    };
  }
  return context;
}

export default LandingCustomizerContext;
