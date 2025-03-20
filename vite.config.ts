import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    tailwindcss(),
    
    viteStaticCopy({
      targets: [
        {
          src: ['src/posts/**/', 'src/posts/index.json'], // 你的 Markdown 文件目录
          dest: 'posts' // 复制到 `dist/posts`
        }
      ]
    })
  ],
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