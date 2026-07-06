import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppProvider } from '@/contexts/AppContext'
import { router } from '@/routes'
import './index.css'
import './components/dynamic/dynamicEffects.css'

/**
 * Older builds (v0.1.x) registered a PWA service worker that gets persisted in the
 * desktop WebView2 storage and keeps serving stale cached assets even after the app
 * is updated. Proactively unregister any existing service workers and purge caches so
 * the latest bundle always loads.
 */
async function purgeStaleServiceWorkers() {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map((r) => r.unregister()))
    }
    if ('caches' in window) {
      const keys = await caches.keys()
      await Promise.all(keys.map((k) => caches.delete(k)))
    }
  } catch {
    /* ignore */
  }
}

void purgeStaleServiceWorkers()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)
