import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  define: {
    global: 'window', // Optional, aligns with some libraries
    'process.env': {}, // Optional, for other potential polyfills
    Buffer: ['buffer', 'Buffer'], // Polyfill Buffer
  },
  server: {
    host: '0.0.0.0', // 允许局域网访问
    port: 5173,      // 你可以改成别的端口
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