import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'

const StylesListPage = lazy(() =>
  import('@/pages/styles/StylesPages').then((m) => ({ default: m.StylesListPage })),
)
const StyleDetailPage = lazy(() =>
  import('@/pages/styles/StylesPages').then((m) => ({ default: m.StyleDetailPage })),
)
const ComponentsListPage = lazy(() =>
  import('@/pages/components/ComponentsPages').then((m) => ({ default: m.ComponentsListPage })),
)
const ComponentDetailPage = lazy(() =>
  import('@/pages/components/ComponentsPages').then((m) => ({ default: m.ComponentDetailPage })),
)
const BackendListPage = lazy(() =>
  import('@/pages/backend/BackendPages').then((m) => ({ default: m.BackendListPage })),
)
const BackendDetailPage = lazy(() =>
  import('@/pages/backend/BackendPages').then((m) => ({ default: m.BackendDetailPage })),
)
const ArchitecturePlaceholderPage = lazy(() =>
  import('@/pages/architecture/ArchitecturePlaceholderPage').then((m) => ({
    default: m.ArchitecturePlaceholderPage,
  })),
)
const ComposerPage = lazy(() =>
  import('@/pages/ComposerPage').then((m) => ({ default: m.ComposerPage })),
)

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center text-muted-foreground">
      加载中...
    </div>
  )
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/styles', element: withSuspense(StylesListPage) },
  { path: '/styles/:id', element: withSuspense(StyleDetailPage) },
  { path: '/components', element: withSuspense(ComponentsListPage) },
  { path: '/components/:id', element: withSuspense(ComponentDetailPage) },
  { path: '/backend', element: withSuspense(BackendListPage) },
  { path: '/backend/:id', element: withSuspense(BackendDetailPage) },
  { path: '/architecture', element: withSuspense(ArchitecturePlaceholderPage) },
  { path: '/composer', element: withSuspense(ComposerPage) },
  {
    path: '*',
    element: (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p>页面未找到</p>
        <a href="/" className="text-primary underline">
          返回首页
        </a>
      </div>
    ),
  },
])
