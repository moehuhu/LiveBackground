import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import requireTransform from 'vite-plugin-require-transform';
const { env } = process

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), requireTransform.default({})],
  assetsInclude: ['**/*.gltf', '**/*.glb'],
  server: {
    port: 3000,
    proxy: {
      '/weather': {
        target: `https://api.caiyunapp.com/v2.6/${env?.TOKEN}`,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/weather/, ''),
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      },
    }
  }
})
