import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração do Vite
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // Pacotes excluídos da otimização
  },
});