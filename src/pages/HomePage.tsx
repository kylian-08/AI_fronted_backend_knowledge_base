import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Palette, Boxes, Layers, Network, Sparkles } from 'lucide-react'
import { Layout, Header } from '@/components/layout/Layout'
import { SearchBar } from '@/components/catalog/SearchBar'
import { StyleCard } from '@/components/catalog/StyleCard'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { searchCatalog } from '@/lib/search'
import { useApp } from '@/contexts/AppContext'
import { components } from '@/data/components/registry'
import { backendItems } from '@/data/backend/registry'
import { cn } from '@/lib/utils'

export function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { allStyles, t } = useApp()

  const featured = allStyles.slice(0, 6)

  const modules = [
    {
      to: '/styles',
      icon: Palette,
      title: t('nav.styles'),
      desc: t('home.hero.subtitle'),
      color: 'text-violet-400',
      stat: allStyles.length,
    },
    {
      to: '/components',
      icon: Boxes,
      title: t('nav.components'),
      desc: 'Modal, table, nav templates with previews',
      color: 'text-blue-400',
      stat: components.length,
    },
    {
      to: '/backend',
      icon: Layers,
      title: t('nav.backend'),
      desc: 'NestJS, FastAPI, Express structured prompts',
      color: 'text-emerald-400',
      stat: backendItems.length,
    },
    {
      to: '/architecture',
      icon: Network,
      title: t('nav.architecture'),
      desc: 'Blueprint design (coming soon)',
      color: 'text-amber-400',
      stat: null,
    },
  ]

  async function handleSearch(q: string) {
    setQuery(q)
    if (q.trim().length < 2) return
    const results = await searchCatalog(q)
    if (results.length > 0) {
      const first = results[0]
      const paths: Record<string, string> = {
        style: '/styles',
        component: '/components',
        backend: '/backend',
      }
      navigate(`${paths[first.kind]}/${first.slug}`)
    }
  }

  return (
    <Layout>
      <Header>
        <SearchBar
          value={query}
          onChange={handleSearch}
          placeholder={t('search.placeholder')}
          className="max-w-xl"
        />
      </Header>
      <main className="flex-1 p-4 md:p-8">
        <section className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-6 md:p-10">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {t('styles.count', { n: allStyles.length })}
            </div>
            <h1 className="mb-3 text-2xl font-bold md:text-4xl">{t('home.hero.title')}</h1>
            <p className="text-muted-foreground md:text-lg">{t('home.hero.subtitle')}</p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 md:absolute md:right-8 md:top-1/2 md:mt-0 md:w-72 md:-translate-y-1/2">
            {[
              { label: t('home.stats.styles'), value: allStyles.length },
              { label: t('home.stats.components'), value: components.length },
              { label: t('home.stats.backend'), value: backendItems.length },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-border/60 bg-background/60 p-3 text-center backdrop-blur">
                <div className="text-2xl font-bold text-primary">{value}</div>
                <div className="text-[11px] text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t('home.featured')}</h2>
            <Link to="/styles" className="text-sm text-primary hover:underline">
              {t('nav.styles')} →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((style) => (
              <StyleCard key={style.id} style={style} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">{t('home.modules')}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map(({ to, icon: Icon, title, desc, color, stat }) => (
              <Link key={to} to={to}>
                <Card className="h-full transition-colors hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Icon className={cn('h-8 w-8', color)} />
                      {stat != null && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{stat}</span>
                      )}
                    </div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}
