import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import { readFileSync } from 'fs'

function readPackageVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8')) as {
      version?: string
    }
    return pkg.version ?? '0.2.0'
  } catch {
    return '0.2.0'
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  /** Tauri desktop: no service worker — WebView2 caches stale assets across exe updates. */
  const isTauriBuild =
    mode === 'tauri' ||
    env.VITE_DISABLE_PWA === 'true' ||
    Boolean(process.env.TAURI_ENV || process.env.TAURI_PLATFORM)

  return {
    define: {
      __APP_VERSION__: JSON.stringify(readPackageVersion()),
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        disable: isTauriBuild,
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'icons/*.png'],
        manifest: {
          name: 'Prompt Assistant',
          short_name: 'PromptAssistant',
          description: '前端风格与组件 AI 提示词助手',
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'standalone',
          icons: [
            { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
