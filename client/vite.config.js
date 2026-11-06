import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_URL || env.VITE_API_URI || 'https://portfolio-fs-ds.onrender.com'

  return {
    publicDir: './public',
    plugins: [react()],
    server: {
      port: 3000,
      allowedHosts: ['.ngrok-free.dev', 'tearless-untragically-kaye.ngrok-free.dev'],
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three')) return 'three'
              if (id.includes('react')) return 'vendor'
            }
          },
        },
      },
    },
  }
})