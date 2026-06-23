import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Layout, Header } from '@/components/layout/Layout'
import { SearchBar } from '@/components/catalog/SearchBar'
import { FilterChips } from '@/components/catalog/FilterChips'
import { PromptCard } from '@/components/catalog/PromptCard'
import { useCatalogSearch } from '@/hooks/useCatalogSearch'
import { useIsDesktop, useIsMobile } from '@/hooks/useMediaQuery'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@/components/ui/tabs'
import { ShowcaseShell } from '@/components/showcase/ShowcaseShell'
import { PromptPanel } from '@/components/preview/PromptPanel'
import { getStyleById } from '@/data/styles/registry'
import { localized } from '@/lib/i18n'
import { useParams } from 'react-router-dom'

export function StylesListPage() {
  const { query, setQuery, selectedTags, setSelectedTags, results, allTags, loading } =
    useCatalogSearch('style')

  return (
    <Layout>
      <Header>
        <SearchBar value={query} onChange={setQuery} />
      </Header>
      <main className="flex-1 p-4 md:p-6">
        <h1 className="mb-4 text-xl font-bold">UI 风格</h1>
        <FilterChips
          tags={allTags}
          selected={selectedTags}
          onChange={setSelectedTags}
          className="mb-4"
        />
        {loading ? (
          <p className="text-muted-foreground">加载中...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <PromptCard key={item.id} item={item} />
            ))}
          </div>
        )}
        {!loading && results.length === 0 && (
          <p className="text-muted-foreground">未找到匹配的风格</p>
        )}
      </main>
    </Layout>
  )
}

export function StyleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const style = getStyleById(id ?? '')
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()

  if (!style) {
    return (
      <Layout>
        <main className="p-8 text-center">
          <p>风格未找到</p>
          <Link to="/styles" className="text-primary underline">
            返回列表
          </Link>
        </main>
      </Layout>
    )
  }

  const preview = <ShowcaseShell style={style} />
  const prompt = (
    <PromptPanel
      promptZh={style.prompt['zh-CN']}
      promptEn={style.prompt['en-US']}
    />
  )

  return (
    <Layout>
      <Header>
        <Link
          to="/styles"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          返回风格列表
        </Link>
      </Header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-4">
          <h1 className="text-xl font-bold">{localized(style.title)}</h1>
          <p className="text-sm text-muted-foreground">{localized(style.description)}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {style.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {isMobile ? (
          <TabsRoot defaultValue="preview">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="preview" className="flex-1">
                预览
              </TabsTrigger>
              <TabsTrigger value="prompt" className="flex-1">
                Prompt
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview">{preview}</TabsContent>
            <TabsContent value="prompt">{prompt}</TabsContent>
          </TabsRoot>
        ) : (
          <div
            className={
              isDesktop
                ? 'grid grid-cols-2 gap-6'
                : 'flex flex-col gap-6'
            }
          >
            <div>{preview}</div>
            <div>{prompt}</div>
          </div>
        )}
      </main>
    </Layout>
  )
}
