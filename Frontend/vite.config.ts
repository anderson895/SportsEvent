import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteCompression from 'vite-plugin-compression'; // For compression
import viteImagemin from 'vite-plugin-imagemin'; // For image optimization
import { visualizer } from 'rollup-plugin-visualizer'; // Updated import

export default defineConfig({
  plugins: [
    react(),
    viteCompression(), // Compress assets
    viteImagemin(), // Optimize images
    visualizer({ open: true }), // Visualizer plugin to analyze bundle size
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split dependencies into individual chunks
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0]; // Create separate chunks for each dependency
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000, // Increase the chunk size warning limit to 2 MB
    minify: 'esbuild', // Use esbuild for fast minification
  },
});
