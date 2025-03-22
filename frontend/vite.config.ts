import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
// Server configuration options.
// Specifies the port number for the development server.
// When you run `npm run dev`, the app will be accessible at http://localhost:5173.
