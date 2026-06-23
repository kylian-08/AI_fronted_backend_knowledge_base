import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Layout, Header } from '@/components/layout/Layout'
import { SearchBar } from '@/components/catalog/SearchBar'
import { FilterChips } from '@/components/catalog/FilterChips'
import { PromptCard } from '@/components/catalog/PromptCard'
import { useCatalogSearch } from '@/hooks/useCatalogSearch'
import { useIsDesktop, useIsMobile } from '@/hooks/useMediaQuery'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@/components/ui/tabs'
import { PreviewFrame, PromptPanel } from '@/components/preview/PromptPanel'
import { getComponentById } from '@/data/components/registry'
import { localized } from '@/lib/i18n'

export function ComponentsListPage() {
  const { query, setQuery, selectedTags, setSelectedTags, results, allTags, loading } =
    useCatalogSearch('component')

  return (
    <Layout>
      <Header>
        <SearchBar value={query} onChange={setQuery} placeholder="搜索组件..." />
      </Header>
      <main className="flex-1 p-4 md:p-6">
        <h1 className="mb-4 text-xl font-bold">UI 组件</h1>
        <FilterChips tags={allTags} selected={selectedTags} onChange={setSelectedTags} className="mb-4" />
        {loading ? (
          <p className="text-muted-foreground">加载中...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <PromptCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </Layout>
  )
}

export function ComponentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const component = getComponentById(id ?? '')
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()

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

  const preview = (
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
