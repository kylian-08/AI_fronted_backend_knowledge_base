import { useMemo, useState } from 'react'
import { Layout, Header } from '@/components/layout/Layout'
import { ComposerPicker } from '@/components/catalog/ComposerPicker'
import { CopyButton } from '@/components/catalog/CopyButton'
import { Button } from '@/components/ui/button'
import { getStyleById } from '@/data/styles/registry'
import { getComponentById, getComponentCategories } from '@/data/components/registry'
import { backendItems, getBackendById } from '@/data/backend/registry'
import { composePrompt } from '@/lib/promptComposer'
import { STYLE_BUCKET_META, styleMatchesBucket, type StyleBucket } from '@/lib/styleCatalog'
import { useApp } from '@/contexts/AppContext'
import type { ComponentItem, StyleItem } from '@/types/catalog'

export function ComposerPage() {
  const { allStyles, allComponents, t, tr } = useApp()
  const [selectedStyleId, setSelectedStyleId] = useState('')
  const [componentIds, setComponentIds] = useState<string[]>([])
  const [backendId, setBackendId] = useState('')

  const styleId = selectedStyleId || allStyles[0]?.id || ''

  const styleCategories = useMemo(
    () => [
      { key: null, label: t('styles.categoryAll'), match: () => true },
      ...(Object.keys(STYLE_BUCKET_META) as StyleBucket[]).map((key) => ({
        key,
        label: tr(STYLE_BUCKET_META[key]),
        match: (s: StyleItem) => styleMatchesBucket(s, key),
      })),
    ],
    [t, tr],
  )

  const componentCategories = useMemo(
    () => [
      { key: null, label: t('components.categoryAll'), match: () => true },
      ...getComponentCategories().map((c) => ({
        key: c.key,
        label: tr(c.name),
        match: (item: ComponentItem) => item.category === c.key,
      })),
    ],
    [t, tr],
  )

  const composed = composePrompt({
    style: getStyleById(styleId),
    components: componentIds.map((id) => getComponentById(id)).filter(Boolean) as ComponentItem[],
    backend: backendId ? getBackendById(backendId) : undefined,
  })

  return (
    <Layout>
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <h1 className="mb-6 text-xl font-bold">{t('composer.title')}</h1>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <section>
              <h2 className="mb-2 text-sm font-semibold">{t('composer.pickStyle')}</h2>
              <ComposerPicker
                items={allStyles}
                selectedIds={styleId ? [styleId] : []}
                onChange={(ids) => setSelectedStyleId(ids[0] ?? '')}
                mode="single"
                categories={styleCategories}
                searchPlaceholder={t('composer.searchStyle')}
                emptyLabel={t('common.empty')}
                tr={tr}
              />
            </section>
            <section>
              <h2 className="mb-2 text-sm font-semibold">{t('composer.pickComponents')}</h2>
              <ComposerPicker
                items={allComponents}
                selectedIds={componentIds}
                onChange={setComponentIds}
                mode="multiple"
                categories={componentCategories}
                searchPlaceholder={t('composer.searchComponent')}
                emptyLabel={t('common.empty')}
                tr={tr}
              />
              {componentIds.length > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {t('composer.selected', { n: componentIds.length })}
                </p>
              )}
            </section>
            <section>
              <h2 className="mb-2 text-sm font-semibold">{t('composer.pickBackend')}</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!backendId ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBackendId('')}
                >
                  {t('composer.none')}
                </Button>
                {backendItems.map((b) => (
                  <Button
                    key={b.id}
                    variant={backendId === b.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setBackendId(b.id)}
                  >
                    {tr(b.title)}
                  </Button>
                ))}
              </div>
            </section>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">{t('composer.result')}</h2>
              <CopyButton text={composed} label={t('styles.copy')} copiedLabel={t('styles.copied')} />
            </div>
            <pre className="max-h-[70vh] overflow-auto rounded-xl border border-border bg-card p-4 text-xs whitespace-pre-wrap">
              {composed}
            </pre>
          </div>
        </div>
      </main>
    </Layout>
  )
}
