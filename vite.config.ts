import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // This should provide 'expect' globally
    environment: 'jsdom',
    // setupFiles: ['./vitest.setup.ts'], // Optional: Any global setup file
    // ... other options
  },
});