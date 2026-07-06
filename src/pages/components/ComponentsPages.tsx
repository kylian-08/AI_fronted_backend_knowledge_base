import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Layout, Header } from '@/components/layout/Layout'
import { SearchBar } from '@/components/catalog/SearchBar'
import { FilterChips } from '@/components/catalog/FilterChips'
import { CategoryChips } from '@/components/catalog/CategoryChips'
import { ComponentCard } from '@/components/catalog/ComponentCard'
import { CopyButton } from '@/components/catalog/CopyButton'
import { Pagination } from '@/components/catalog/Pagination'
import { SidePager, usePageKeys } from '@/components/catalog/SidePager'
import { useComponentFilter } from '@/hooks/useComponentFilter'
import { useIsDesktop, useIsMobile } from '@/hooks/useMediaQuery'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@/components/ui/tabs'
import { PreviewFrame, PromptPanel } from '@/components/preview/PromptPanel'
import { ComponentImportPanel } from '@/components/catalog/ComponentImportPanel'
import { getComponentById, getComponentCategories } from '@/data/components/registry'
import { getStyleById } from '@/data/styles/registry'
import { ThemedComponentPreview, hasThemedPreview } from '@/components/showcase/componentPreviews'
import { MotionOverrideProvider } from '@/components/motion/MotionPrimitives'
import { MotionPanel } from '@/components/motion/MotionPanel'
import { useMotionTuning } from '@/hooks/useMotionTuning'
import { componentToReactCode, hasDedicatedCodeTemplate } from '@/lib/codeExport'
import { useApp } from '@/contexts/AppContext'
import { useMemo } from 'react'

export function ComponentsListPage() {
  const { t, tr, allComponents } = useApp()
  const {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags,
    paginated,
    allTags,
    page,
    setPage,
    totalPages,
    total,
  } = useComponentFilter(allComponents)

  const categories = useMemo(
    () =>
      getComponentCategories().map((c) => ({
        key: c.key,
        label: tr(c.name),
      })),
    [tr],
  )

  usePageKeys(page, totalPages, setPage)

  return (
    <Layout>
      <Header>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={t('components.searchPlaceholder')}
        />
      </Header>
      <SidePager page={page} totalPages={totalPages} onPageChange={setPage} />
      <main className="flex-1 p-4 md:p-6 lg:px-20">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold">{t('components.title')}</h1>
            <p className="text-sm text-muted-foreground">{t('components.count', { n: total })}</p>
          </div>
          <ComponentImportPanel />
        </div>
        <CategoryChips
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
          allLabel={t('components.categoryAll')}
          className="mb-3"
        />
        <FilterChips
          tags={allTags}
          selected={selectedTags}
          onChange={setSelectedTags}
          className="mb-4"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paginated.map((item) => (
            <ComponentCard key={item.id} component={item} />
          ))}
        </div>
        {total === 0 && <p className="text-muted-foreground">{t('common.empty')}</p>}
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
  const { activeTokens, activeMotionPreset, appliedStyleId, t, tr, locale } = useApp()
  const tuning = useMotionTuning(activeMotionPreset)

  if (!component) {
    return (
      <Layout>
        <main className="p-8 text-center">
          <p>{t('components.notFound')}</p>
          <Link to="/components" className="text-primary underline">
            {t('components.back')}
          </Link>
        </main>
      </Layout>
    )
  }

  const categoryName = getComponentCategories().find((c) => c.key === component.category)?.name
  const themed = hasThemedPreview(component.id)
  const styleName = appliedStyleId ? getStyleById(appliedStyleId)?.title['en-US'] : undefined
  const reactCode = componentToReactCode(component, activeTokens, {
    styleName,
    motion: tuning.params,
  })

  const preview = themed ? (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-2 text-sm font-medium text-muted-foreground">
          {t('components.preview')}
        </div>
        <div className="p-4">
          <MotionOverrideProvider value={tuning.preset}>
            <div key={tuning.replayKey}>
              <ThemedComponentPreview id={component.id} tokens={activeTokens} locale={locale} />
            </div>
          </MotionOverrideProvider>
        </div>
        <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
          {t(hasDedicatedCodeTemplate(component.id) ? 'code.reactHint' : 'code.reactScaffold')}
        </p>
      </div>
      <MotionPanel tuning={tuning} />
    </div>
  ) : (
    <PreviewFrame html={component.previewSource} title={t('components.preview')} />
  )

  const prompt = (
    <div className="space-y-4">
      {component.states && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-2 text-sm font-semibold">{t('components.states')}</h3>
          <div className="flex flex-wrap gap-2">
            {component.states.map((s) => (
              <span key={s} className="rounded bg-muted px-2 py-1 text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      <PromptPanel promptZh={component.prompt['zh-CN']} promptEn={component.prompt['en-US']} />
    </div>
  )

  return (
    <Layout>
      <Header>
        <Link
          to="/components"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('components.back')}
        </Link>
      </Header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold">{tr(component.title)}</h1>
            <p className="text-sm text-muted-foreground">{tr(component.description)}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {categoryName && (
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                  {tr(categoryName)}
                </span>
              )}
              {component.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
            {component.stack && component.stack.length > 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                {t('components.stack')}: {component.stack.join(' · ')}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <CopyButton
              text={tr(component.prompt)}
              label={t('styles.copy')}
              copiedLabel={t('styles.copied')}
            />
            <CopyButton
              text={reactCode}
              label={t('code.copyReact')}
              copiedLabel={t('styles.copied')}
            />
          </div>
        </div>

        {isMobile ? (
          <TabsRoot defaultValue="preview">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="preview" className="flex-1">
                {t('components.tab.preview')}
              </TabsTrigger>
              <TabsTrigger value="prompt" className="flex-1">
                {t('components.tab.prompt')}
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
