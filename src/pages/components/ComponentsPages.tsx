import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Fuse from 'fuse.js'
import { Layout, Header } from '@/components/layout/Layout'
import { SearchBar } from '@/components/catalog/SearchBar'
import { FilterChips } from '@/components/catalog/FilterChips'
import { ComponentCard } from '@/components/catalog/ComponentCard'
import { Pagination } from '@/components/catalog/Pagination'
import { SidePager, usePageKeys } from '@/components/catalog/SidePager'
import { useIsDesktop, useIsMobile } from '@/hooks/useMediaQuery'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@/components/ui/tabs'
import { PreviewFrame, PromptPanel } from '@/components/preview/PromptPanel'
import { components, getComponentById } from '@/data/components/registry'
import { ThemedComponentPreview, hasThemedPreview } from '@/components/showcase/componentPreviews'
import { useApp } from '@/contexts/AppContext'
import { localized } from '@/lib/i18n'

const PAGE_SIZE = 24

export function ComponentsListPage() {
  const { t } = useApp()
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const fuse = useMemo(
    () =>
      new Fuse(components, {
        keys: ['title.zh-CN', 'title.en-US', 'description.zh-CN', 'description.en-US', 'tags', 'category'],
        threshold: 0.35,
      }),
    [],
  )

  const filtered = useMemo(() => {
    let list = components
    if (query.trim()) list = fuse.search(query.trim()).map((r) => r.item)
    if (selectedTags.length) list = list.filter((c) => selectedTags.some((tag) => c.tags.includes(tag)))
    return list
  }, [fuse, query, selectedTags])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    components.forEach((c) => c.tags.forEach((tag) => set.add(tag)))
    return Array.from(set).sort()
  }, [])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  usePageKeys(page, totalPages, setPage)

  return (
    <Layout>
      <Header>
        <SearchBar
          value={query}
          onChange={(v) => {
            setQuery(v)
            setPage(1)
          }}
          placeholder={t('components.searchPlaceholder')}
        />
      </Header>
      <SidePager page={page} totalPages={totalPages} onPageChange={setPage} />
      <main className="flex-1 p-4 md:p-6 lg:px-20">
        <div className="mb-4">
          <h1 className="text-xl font-bold">{t('components.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('components.count', { n: filtered.length })}</p>
        </div>
        <FilterChips
          tags={allTags}
          selected={selectedTags}
          onChange={(tags) => {
            setSelectedTags(tags)
            setPage(1)
          }}
          className="mb-4"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paginated.map((item) => (
            <ComponentCard key={item.id} component={item} />
          ))}
        </div>
        {filtered.length === 0 && <p className="text-muted-foreground">{t('common.empty')}</p>}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </main>
    </Layout>
  )
}

export function ComponentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const component = getComponentById(id ?? '')
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()
  const { activeTokens } = useApp()

  if (!component) {
    return (
      <Layout>
        <main className="p-8 text-center">
          <p>组件未找到</p>
          <Link to="/components" className="text-primary underline">返回列表</Link>
        </main>
      </Layout>
    )
  }

  const preview = hasThemedPreview(component.id) ? (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-2 text-sm font-medium text-muted-foreground">组件预览</div>
      <div className="p-4">
        <ThemedComponentPreview id={component.id} tokens={activeTokens} />
      </div>
    </div>
  ) : (
    <PreviewFrame html={component.previewSource} title="组件预览" />
  )
  const prompt = (
    <div className="space-y-4">
      {component.states && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-2 text-sm font-semibold">必须处理的状态</h3>
          <div className="flex flex-wrap gap-2">
            {component.states.map((s) => (
              <span key={s} className="rounded bg-muted px-2 py-1 text-xs">{s}</span>
            ))}
          </div>
        </div>
      )}
      <PromptPanel
        promptZh={component.prompt['zh-CN']}
        promptEn={component.prompt['en-US']}
      />
    </div>
  )

  return (
    <Layout>
      <Header>
        <Link to="/components" className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          返回组件列表
        </Link>
      </Header>
      <main className="flex-1 p-4 md:p-6">
        <h1 className="mb-1 text-xl font-bold">{localized(component.title)}</h1>
        <p className="mb-4 text-sm text-muted-foreground">{localized(component.description)}</p>
        {isMobile ? (
          <TabsRoot defaultValue="preview">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="preview" className="flex-1">预览</TabsTrigger>
              <TabsTrigger value="prompt" className="flex-1">Prompt</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">{preview}</TabsContent>
            <TabsContent value="prompt">{prompt}</TabsContent>
          </TabsRoot>
        ) : (
          <div className={isDesktop ? 'grid grid-cols-2 gap-6' : 'flex flex-col gap-6'}>
            <div>{preview}</div>
            <div>{prompt}</div>
          </div>
        )}
      </main>
    </Layout>
  )
}
