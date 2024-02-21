import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from "rollup-plugin-node-polyfills";


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true, // allow requests from any origin
  },
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis", //<-- AWS SDK 
      },
    },
  },
  resolve: {
    alias: [
      
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
      {
        find: './runtimeConfig', replacement: './runtimeConfig.browser',
      }
    ],
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
      // https://rollupjs.org/guide/en/#big-list-of-options
    },
    chunkSizeWarningLimit: 8000,
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
