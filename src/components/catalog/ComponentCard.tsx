import { Link } from 'react-router-dom'
import type { ComponentItem } from '@/types/catalog'
import { CopyButton } from '@/components/catalog/CopyButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemedComponentPreview, hasThemedPreview } from '@/components/showcase/componentPreviews'
import { useApp } from '@/contexts/AppContext'
import { cn } from '@/lib/utils'

interface ComponentCardProps {
  component: ComponentItem
  className?: string
}

export function ComponentCard({ component, className }: ComponentCardProps) {
  const { t, tr, activeTokens } = useApp()
  const themed = hasThemedPreview(component.id)

  return (
    <Card className={cn('overflow-hidden transition-colors hover:border-primary/40', className)}>
      <div className="relative h-[150px] overflow-hidden border-b border-border bg-muted/40">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.72]"
          style={{ width: '420px' }}
        >
          {themed ? (
            <ThemedComponentPreview id={component.id} tokens={activeTokens} compact />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: component.previewSource }} />
          )}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm leading-snug">{tr(component.title)}</CardTitle>
        <p className="line-clamp-2 text-xs text-muted-foreground">{tr(component.description)}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          {component.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex gap-2 pt-0">
        <CopyButton
          text={tr(component.prompt)}
          label={t('styles.copy')}
          copiedLabel={t('styles.copied')}
          className="min-h-[36px] flex-1 whitespace-nowrap"
        />
        <Link
          to={`/components/${component.slug}`}
          className="inline-flex min-h-[36px] flex-1 items-center justify-center whitespace-nowrap rounded-md border border-border px-3 text-xs hover:bg-accent"
        >
          {t('styles.detail')}
        </Link>
      </CardContent>
    </Card>
  )
}
