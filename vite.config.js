import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer-motion';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
          if (id.includes('node_modules/canvas-confetti')) {
            return 'vendor-confetti';
          }
          // Individual chunks for each of the 11 landings
          if (id.includes('src/landings/TequilaLanding')) return 'landing-tequila';
          if (id.includes('src/landings/TacosLanding')) return 'landing-tacos';
          if (id.includes('src/landings/BarberiaLanding')) return 'landing-barberia';
          if (id.includes('src/landings/EsteticaSalonLanding')) return 'landing-estetica';
          if (id.includes('src/landings/CalzadoTiendaLanding')) return 'landing-calzado';
          if (id.includes('src/landings/TallerMecanicoLanding')) return 'landing-taller';
          if (id.includes('src/landings/CafeArtesanalLanding')) return 'landing-cafe';
          if (id.includes('src/landings/VeterinariaLanding')) return 'landing-veterinaria';
          if (id.includes('src/landings/DentalPolancoLanding')) return 'landing-dental';
          if (id.includes('src/landings/TulumRealEstateLanding')) return 'landing-tulum';
          if (id.includes('src/landings/GymAztecaLanding')) return 'landing-gym';
        },
      },
    },
  },
});
