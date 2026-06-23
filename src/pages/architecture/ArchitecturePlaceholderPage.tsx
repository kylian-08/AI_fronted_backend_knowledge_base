import { useState } from 'react'
import { Layout, Header } from '@/components/layout/Layout'
import { architectureBlueprints } from '@/data/architecture/placeholder'
import { localized } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Network, Plus, Download } from 'lucide-react'
import { composePrompt } from '@/lib/promptComposer'
import { styles } from '@/data/styles/registry'
import { components } from '@/data/components/registry'
import { backendItems } from '@/data/backend/registry'
import { CopyButton } from '@/components/catalog/CopyButton'

export function ArchitecturePlaceholderPage() {
  const blueprint = architectureBlueprints[0]
  const [composed] = useState(() =>
    composePrompt({
      style: styles[0],
      components: [components[0], components[1]],
      backend: backendItems[0],
    }),
  )

  return (
    <Layout>
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <Network className="mx-auto mb-4 h-12 w-12 text-amber-400" />
            <h1 className="mb-2 text-2xl font-bold">{localized(blueprint.title)}</h1>
            <p className="text-muted-foreground">{localized(blueprint.description)}</p>
            <span className="mt-2 inline-block rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {blueprint.status}
            </span>
          </div>

          <Card className="mb-6 border-dashed">
            <CardHeader>
              <CardTitle className="text-base">蓝图画布（占位）</CardTitle>
              <CardDescription>
                未来将支持拖拽节点、连线、导出 Mermaid / PNG
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background/50 p-8 text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  画布区域 — React Flow / Mermaid 编辑器将在此接入
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button variant="outline" disabled className="gap-2">
                    <Plus className="h-4 w-4" />
                    新建节点
                  </Button>
                  <Button variant="outline" disabled className="gap-2">
                    <Download className="h-4 w-4" />
                    导出 Mermaid
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Prompt 组合器预览</CardTitle>
              <CardDescription>
                将风格 + 组件 + 后端模板组合为完整项目 Prompt（已可用）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="mb-4 max-h-48 overflow-auto rounded-lg bg-background p-4 text-xs whitespace-pre-wrap">
                {composed.slice(0, 600)}...
              </pre>
              <CopyButton text={composed} />
            </CardContent>
          </Card>
        </div>
      </main>
    </Layout>
  )
}
