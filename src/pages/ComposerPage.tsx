import { useState } from 'react'
import { Layout, Header } from '@/components/layout/Layout'
import { styles, getStyleById } from '@/data/styles/registry'
import { components, getComponentById } from '@/data/components/registry'
import { backendItems, getBackendById } from '@/data/backend/registry'
import { composePrompt } from '@/lib/promptComposer'
import { CopyButton } from '@/components/catalog/CopyButton'
import { localized } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

export function ComposerPage() {
  const [styleId, setStyleId] = useState(styles[0]?.id ?? '')
  const [componentIds, setComponentIds] = useState<string[]>([])
  const [backendId, setBackendId] = useState('')

  const composed = composePrompt({
    style: getStyleById(styleId),
    components: componentIds.map((id) => getComponentById(id)).filter(Boolean) as typeof components,
    backend: backendId ? getBackendById(backendId) : undefined,
  })

  function toggleComponent(id: string) {
    setComponentIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  return (
    <Layout>
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <h1 className="mb-6 text-xl font-bold">Prompt 组合器</h1>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <section>
              <h2 className="mb-2 text-sm font-semibold">选择风格（1 个）</h2>
              <div className="flex flex-wrap gap-2">
                {styles.map((s) => (
                  <Button
                    key={s.id}
                    variant={styleId === s.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStyleId(s.id)}
                  >
                    {localized(s.title)}
                  </Button>
                ))}
              </div>
            </section>
            <section>
              <h2 className="mb-2 text-sm font-semibold">选择组件（多选）</h2>
              <div className="flex flex-wrap gap-2">
                {components.map((c) => (
                  <Button
                    key={c.id}
                    variant={componentIds.includes(c.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleComponent(c.id)}
                  >
                    {localized(c.title)}
                  </Button>
                ))}
              </div>
            </section>
            <section>
              <h2 className="mb-2 text-sm font-semibold">选择后端（可选 1 个）</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!backendId ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBackendId('')}
                >
                  无
                </Button>
                {backendItems.map((b) => (
                  <Button
                    key={b.id}
                    variant={backendId === b.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setBackendId(b.id)}
                  >
                    {localized(b.title)}
                  </Button>
                ))}
              </div>
            </section>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">组合结果</h2>
              <CopyButton text={composed} />
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
