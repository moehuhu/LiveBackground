import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import requireTransform from 'vite-plugin-require-transform';


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env);
  return {
    plugins: [react(), requireTransform.default({}), ssr()],
    assetsInclude: ['**/*.gltf', '**/*.glb'],
    server: {
      port: 3000,
      proxy: {
        '/weather': {
          target: `https://api.caiyunapp.com/v2.6/${env?.WEATHER_TOKEN}`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/weather/, ''),
          configure: (proxy, options) => {
            // proxy 是 'http-proxy' 的实例
          }
        },
      }
    }
  }
})
