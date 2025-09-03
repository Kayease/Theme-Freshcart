import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tagger from '@dhiwise/component-tagger';

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
  const plugins = [tsconfigPaths(), react(), tagger()];

  // Only attempt to load visualizer during build or when ANALYZE flag is set
  if (command === 'build' || process.env.ANALYZE) {
    try {
      const { visualizer } = await import('rollup-plugin-visualizer');
      plugins.push(visualizer({ filename: 'build/stats.html', open: false }));
    } catch (e) {
      // Silent fallback if not installed
      console.warn('[freshcart] rollup-plugin-visualizer not installed; skip bundle stats.');
    }
  }

  return {
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 2000,
    },
    plugins,
    server: {
      port: '4028',
      host: '0.0.0.0',
      strictPort: true,
      allowedHosts: ['.amazonaws.com']
    }
  };
});
