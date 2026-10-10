import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['qa/**', 'node_modules/**'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
