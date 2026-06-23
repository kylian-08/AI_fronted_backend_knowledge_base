import { Link } from 'react-router-dom'
import type { SearchIndexEntry } from '@/types/catalog'
import { localized } from '@/lib/i18n'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyButton } from '@/components/catalog/CopyButton'
import { cn } from '@/lib/utils'

const kindPaths: Record<string, string> = {
  style: '/styles',
  component: '/components',
  backend: '/backend',
}

interface PromptCardProps {
  item: SearchIndexEntry
  className?: string
}

export function PromptCard({ item, className }: PromptCardProps) {
  const basePath = kindPaths[item.kind] ?? '/'
  const href = `${basePath}/${item.slug}`

  return (
    <Card className={cn('group transition-colors hover:border-primary/50', className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1">{localized(item.title)}</CardTitle>
          {item.status !== 'ready' && (
            <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {item.status}
            </span>
          )}
        </div>
        <CardDescription className="line-clamp-2">
          {localized(item.description)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex flex-wrap gap-1">
          {item.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Link
            to={href}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            查看详情
          </Link>
          <CopyButton text={localized(item.prompt)} />
        </div>
      </CardContent>
    </Card>
  )
}
