import { localized } from '@/lib/i18n'
import { CopyButton } from '@/components/catalog/CopyButton'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface PromptPanelProps {
  promptZh: string
  promptEn: string
  className?: string
}

export function PromptPanel({ promptZh, promptEn, className }: PromptPanelProps) {
  return (
    <div className={cn('flex flex-col rounded-xl border border-border bg-card', className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">Prompt 模板</h3>
      </div>
      <TabsRoot defaultValue="zh" className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-4 pt-3">
          <TabsList>
            <TabsTrigger value="zh">中文</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="zh" className="flex-1 px-4 pb-4">
          <div className="relative">
            <pre className="max-h-[60vh] overflow-auto rounded-lg bg-background p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap">
              {promptZh}
            </pre>
            <div className="mt-2">
              <CopyButton text={promptZh} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="en" className="flex-1 px-4 pb-4">
          <div className="relative">
            <pre className="max-h-[60vh] overflow-auto rounded-lg bg-background p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap">
              {promptEn}
            </pre>
            <div className="mt-2">
              <CopyButton text={promptEn} />
            </div>
          </div>
        </TabsContent>
      </TabsRoot>
    </div>
  )
}

export function PreviewFrame({
  html,
  title,
  className,
}: {
  html: string
  title?: string
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border bg-card', className)}>
      {title && (
        <div className="border-b border-border px-4 py-2 text-sm font-medium text-muted-foreground">
          {title}
        </div>
      )}
      <div
        className="p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export { localized }
