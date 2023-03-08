import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import requireTransform from 'vite-plugin-require-transform';
let localConfig = null
try {
  localConfig = require('./localConfig.json')
} catch (err) {
  console.error(err)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), requireTransform.default({})],
  assetsInclude: ['**/*.gltf', '**/*.glb'],
  server: {
    port: 3000,
    proxy: {
      '/weather': {
        target: `https://api.caiyunapp.com/v2.6/${localConfig?.token}`,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/weather/, ''),
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      },
    }
  }
})
