import { NavLink } from 'react-router-dom'
import {
  Boxes,
  Combine,
  Home,
  Layers,
  Network,
  Palette,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/useMediaQuery'

const navItems = [
  { to: '/', label: '首页', icon: Home, end: true },
  { to: '/styles', label: '风格', icon: Palette },
  { to: '/components', label: '组件', icon: Boxes },
  { to: '/backend', label: '后端', icon: Layers },
  { to: '/composer', label: '组合', icon: Combine },
  { to: '/architecture', label: '架构', icon: Network },
]

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-card md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <Search className="h-5 w-5 text-primary" />
        <span className="font-semibold">Prompt Assistant</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="主导航">
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
    </aside>
  )
}

export function MobileTabBar() {
  const isMobile = useIsMobile()
  if (!isMobile) return null

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-card md:hidden"
      aria-label="底部导航"
    >
      {navItems.slice(0, 5).map(({ to, label, icon: Icon, end }) => (
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
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center gap-2 md:hidden">
        <Search className="h-5 w-5 text-primary" />
        <span className="font-semibold text-sm">Prompt Assistant</span>
      </div>
      <div className="flex-1">{children}</div>
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
