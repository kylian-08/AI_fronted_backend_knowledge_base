import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Layout, Header } from '@/components/layout/Layout'
import { SearchBar } from '@/components/catalog/SearchBar'
import { FilterChips } from '@/components/catalog/FilterChips'
import { PromptCard } from '@/components/catalog/PromptCard'
import { useCatalogSearch } from '@/hooks/useCatalogSearch'
import { useIsDesktop, useIsMobile } from '@/hooks/useMediaQuery'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@/components/ui/tabs'
import { PromptPanel } from '@/components/preview/PromptPanel'
import { getBackendById } from '@/data/backend/registry'
import { localized } from '@/lib/i18n'

export function BackendListPage() {
  const { query, setQuery, selectedTags, setSelectedTags, results, allTags, loading } =
    useCatalogSearch('backend')

  return (
    <Layout>
      <Header>
        <SearchBar value={query} onChange={setQuery} placeholder="搜索后端框架..." />
      </Header>
      <main className="flex-1 p-4 md:p-6">
        <h1 className="mb-4 text-xl font-bold">后端框架提示词</h1>
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

export function BackendDetailPage() {
  const { id } = useParams<{ id: string }>()
  const item = getBackendById(id ?? '')
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()

  if (!item) {
    return (
      <Layout>
        <main className="p-8 text-center">
          <p>模板未找到</p>
          <Link to="/backend" className="text-primary underline">返回列表</Link>
        </main>
      </Layout>
    )
  }

  const meta = (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <dl className="grid gap-2 text-sm">
          <div className="flex gap-2">
            <dt className="text-muted-foreground">框架</dt>
            <dd className="font-medium uppercase">{item.framework}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted-foreground">模式</dt>
            <dd className="flex flex-wrap gap-1">
              {item.patterns.map((p) => (
                <span key={p} className="rounded bg-muted px-2 py-0.5 text-xs">{p}</span>
              ))}
            </dd>
          </div>
          {item.stack && (
            <div className="flex gap-2">
              <dt className="text-muted-foreground">技术栈</dt>
              <dd>{item.stack.join(', ')}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )

  const prompt = (
    <PromptPanel promptZh={item.prompt['zh-CN']} promptEn={item.prompt['en-US']} />
  )

  return (
    <Layout>
      <Header>
        <Link to="/backend" className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          返回后端列表
        </Link>
      </Header>
      <main className="flex-1 p-4 md:p-6">
        <h1 className="mb-1 text-xl font-bold">{localized(item.title)}</h1>
        <p className="mb-4 text-sm text-muted-foreground">{localized(item.description)}</p>
        {isMobile ? (
          <TabsRoot defaultValue="meta">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="meta" className="flex-1">信息</TabsTrigger>
              <TabsTrigger value="prompt" className="flex-1">Prompt</TabsTrigger>
            </TabsList>
            <TabsContent value="meta">{meta}</TabsContent>
            <TabsContent value="prompt">{prompt}</TabsContent>
          </TabsRoot>
        ) : (
          <div className={isDesktop ? 'grid grid-cols-2 gap-6' : 'flex flex-col gap-6'}>
            <div>{meta}</div>
            <div>{prompt}</div>
          </div>
        )}
      </main>
    </Layout>
  )
}
