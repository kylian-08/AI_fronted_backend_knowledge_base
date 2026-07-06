import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { Layout, Header } from '@/components/layout/Layout'
import { SearchBar } from '@/components/catalog/SearchBar'
import { FilterChips } from '@/components/catalog/FilterChips'
import { CategoryChips } from '@/components/catalog/CategoryChips'
import { StyleCard } from '@/components/catalog/StyleCard'
import { StyleImportPanel } from '@/components/catalog/StyleImportPanel'
import { Pagination } from '@/components/catalog/Pagination'
import { SidePager, usePageKeys } from '@/components/catalog/SidePager'
import { CopyButton } from '@/components/catalog/CopyButton'
import { CopyImageButton, DownloadImageButton } from '@/components/catalog/CopyImageButton'
import { useStyleFilter } from '@/hooks/useStyleFilter'
import { useIsDesktop, useIsMobile } from '@/hooks/useMediaQuery'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@/components/ui/tabs'
import { ShowcaseShell } from '@/components/showcase/ShowcaseShell'
import { PromptPanel } from '@/components/preview/PromptPanel'
import { Button } from '@/components/ui/button'
import { getStyleById } from '@/data/styles/registry'
import { styleCodeBundle } from '@/lib/codeExport'
import { useApp } from '@/contexts/AppContext'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { STYLE_BUCKET_META, type StyleBucket } from '@/lib/styleCatalog'

export function StylesListPage() {
  const { allStyles, t, tr } = useApp()
  const {
    query,
    setQuery,
    selectedBucket,
    setSelectedBucket,
    selectedTags,
    setSelectedTags,
    paginated,
    allTags,
    page,
    setPage,
    totalPages,
    total,
  } = useStyleFilter(allStyles)

  const styleBuckets = useMemo(
    () =>
      (Object.keys(STYLE_BUCKET_META) as StyleBucket[]).map((key) => ({
        key,
        label: tr(STYLE_BUCKET_META[key]),
      })),
    [tr],
  )

  usePageKeys(page, totalPages, setPage)

  return (
    <Layout>
      <Header>
        <SearchBar value={query} onChange={setQuery} placeholder={t('search.placeholder')} />
      </Header>
      <SidePager page={page} totalPages={totalPages} onPageChange={setPage} />
      <main className="flex-1 p-4 md:p-6 lg:px-20">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold">{t('styles.title')}</h1>
            <p className="text-sm text-muted-foreground">{t('styles.count', { n: total })}</p>
          </div>
          <StyleImportPanel />
        </div>
        <CategoryChips
          categories={styleBuckets}
          selected={selectedBucket}
          onChange={(key) => setSelectedBucket(key as StyleBucket | null)}
          allLabel={t('styles.categoryAll')}
          className="mb-3"
        />
        <FilterChips
          tags={allTags}
          selected={selectedTags}
          onChange={setSelectedTags}
          className="mb-4"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paginated.map((style) => (
            <StyleCard key={style.id} style={style} />
          ))}
        </div>
        {total === 0 && <p className="text-muted-foreground">{t('styles.empty')}</p>}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </main>
    </Layout>
  )
}

export function StyleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const style = getStyleById(id ?? '')
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()
  const { t, tr, appliedStyleId, applyStyle } = useApp()

  if (!style) {
    return (
      <Layout>
        <main className="p-8 text-center">
          <p>{t('styles.empty')}</p>
          <Link to="/styles" className="text-primary underline">
            {t('styles.back')}
          </Link>
        </main>
      </Layout>
    )
  }

  const isApplied = appliedStyleId === style.id
  const code = styleCodeBundle(style)
  const preview = <ShowcaseShell style={style} />
  const prompt = (
    <PromptPanel promptZh={style.prompt['zh-CN']} promptEn={style.prompt['en-US']} />
  )

  return (
    <Layout>
      <Header>
        <Link
          to="/styles"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('styles.back')}
        </Link>
      </Header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold">{tr(style.title)}</h1>
            <p className="text-sm text-muted-foreground">{tr(style.description)}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {style.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={isApplied ? 'secondary' : 'default'}
              onClick={() => applyStyle(style)}
              className="gap-2"
            >
              {isApplied && <Check className="h-4 w-4" />}
              {isApplied ? t('styles.applied') : t('styles.apply')}
            </Button>
            <CopyButton text={tr(style.prompt)} label={t('styles.copy')} copiedLabel={t('styles.copied')} />
            <CopyButton text={code.css} label={t('code.copyCss')} copiedLabel={t('styles.copied')} />
            <CopyButton text={code.tailwind} label={t('code.copyTailwind')} copiedLabel={t('styles.copied')} />
            <CopyImageButton style={style} label={t('styles.copyImage')} copiedLabel={t('styles.copied')} />
            <DownloadImageButton style={style} label={t('styles.downloadImage')} />
          </div>
        </div>

        {style.referenceImage && (
          <div className="mb-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t('styles.reference')}
            </p>
            <img
              src={style.referenceImage}
              alt={tr(style.title)}
              className="max-h-80 w-full rounded-xl border border-border object-contain"
            />
          </div>
        )}

        {isMobile ? (
          <TabsRoot defaultValue="preview">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="preview" className="flex-1">
                Preview
              </TabsTrigger>
              <TabsTrigger value="prompt" className="flex-1">
                Prompt
              </TabsTrigger>
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
