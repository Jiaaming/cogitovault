import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: '/cogitovault/', 
  assetsInclude: ['**/*.md'], 
  define: {
    global: 'window', // Optional, aligns with some libraries
    'process.env': {}, // Optional, for other potential polyfills
    Buffer: ['buffer', 'Buffer'], // Polyfill Buffer
  },
  server: {
    host: '0.0.0.0', 
    port: 5173,      
  },
  optimizeDeps: {
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
            NodeGlobalsPolyfillPlugin({
                buffer: true
            })
        ]
    }
}
})