import { NavLink } from 'react-router-dom'
import {
  Bot,
  Boxes,
  Combine,
  Home,
  Layers,
  Network,
  Palette,
  RotateCcw,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { useApp } from '@/contexts/AppContext'
import { Button } from '@/components/ui/button'

export function Sidebar() {
  const { t, appliedStyleId, resetTheme } = useApp()

  const navItems = [
    { to: '/', label: t('nav.home'), icon: Home, end: true },
    { to: '/styles', label: t('nav.styles'), icon: Palette },
    { to: '/components', label: t('nav.components'), icon: Boxes },
    { to: '/backend', label: t('nav.backend'), icon: Layers },
    { to: '/composer', label: t('nav.composer'), icon: Combine },
    { to: '/agent', label: t('nav.agent'), icon: Bot },
    { to: '/architecture', label: t('nav.architecture'), icon: Network },
  ]

  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-border bg-card md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <Search className="h-5 w-5 text-primary" />
        <div className="flex flex-col">
          <span className="font-semibold leading-tight">{t('app.title')}</span>
          <span className="text-[10px] text-muted-foreground">v{__APP_VERSION__}</span>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Main navigation">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      {appliedStyleId && (
        <div className="border-t border-border p-3">
          <Button variant="outline" size="sm" className="w-full gap-2" onClick={resetTheme}>
            <RotateCcw className="h-3.5 w-3.5" />
            {t('theme.reset')}
          </Button>
        </div>
      )}
    </aside>
  )
}

export function MobileTabBar() {
  const isMobile = useIsMobile()
  const { t } = useApp()

  const navItems = [
    { to: '/', label: t('nav.home'), icon: Home, end: true },
    { to: '/styles', label: t('nav.styles'), icon: Palette },
    { to: '/components', label: t('nav.components'), icon: Boxes },
    { to: '/backend', label: t('nav.backend'), icon: Layers },
    { to: '/composer', label: t('nav.composer'), icon: Combine },
  ]

  if (!isMobile) return null

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-card md:hidden"
      aria-label="Bottom navigation"
    >
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              'flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium',
              isActive ? 'text-primary' : 'text-muted-foreground',
            )
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export function Header({ children }: { children?: React.ReactNode }) {
  const { t } = useApp()

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center gap-2 md:hidden">
        <Search className="h-5 w-5 text-primary" />
        <span className="font-semibold text-sm">{t('app.title')}</span>
      </div>
      <div className="flex-1 min-w-0">{children}</div>
      <LanguageSwitcher />
    </header>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col pb-16 md:pb-0">
        {children}
        <MobileTabBar />
      </div>
    </div>
  )
}
