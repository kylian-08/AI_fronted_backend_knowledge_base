import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import type { StyleItem } from '@/types/catalog'
import { ShowcaseShell } from '@/components/showcase/ShowcaseShell'
import { CopyButton } from '@/components/catalog/CopyButton'
import { CopyImageButton } from '@/components/catalog/CopyImageButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionLift } from '@/components/motion/MotionPrimitives'
import { resolveMotionPresetKey } from '@/lib/motion/presets'
import { useApp } from '@/contexts/AppContext'
import { cn } from '@/lib/utils'

interface StyleCardProps {
  style: StyleItem
  className?: string
}

export function StyleCard({ style, className }: StyleCardProps) {
  const { appliedStyleId, applyStyle, t, tr } = useApp()
  const isApplied = appliedStyleId === style.id
  const preset = resolveMotionPresetKey(style)

  return (
    <MotionLift preset={preset} className="h-full">
    <Card className={cn('h-full overflow-hidden transition-colors hover:border-primary/40', className)}>
      <div className="relative border-b border-border">
        {style.referenceImage ? (
          <img
            src={style.referenceImage}
            alt={tr(style.title)}
            className="h-[150px] w-full object-cover"
          />
        ) : (
          // pointer-events-none: the thumbnail's own button/card slots carry their own
          // hover motion (MotionButton/MotionLift) — without this, hovering them would
          // stack their scale on top of the card-level MotionLift below, making the
          // "jelly" feel and hover-scale amount inconsistent depending on cursor position.
          <div className="pointer-events-none">
            <ShowcaseShell style={style} compact previewOnly />
          </div>
        )}
        {style.source === 'imported' && (
          <span className="absolute right-2 top-2 rounded-full bg-primary/80 px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
            {t('styles.imported')}
          </span>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm leading-snug">{tr(style.title)}</CardTitle>
          {isApplied && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] text-primary">
              <Check className="h-3 w-3" />
              {t('styles.applied')}
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">{tr(style.description)}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          {style.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pt-0">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={isApplied ? 'secondary' : 'default'}
            className="min-h-[36px] flex-1 whitespace-nowrap"
            onClick={() => applyStyle(style)}
          >
            {isApplied ? t('styles.applied') : t('styles.apply')}
          </Button>
          <Link
            to={`/styles/${style.slug}`}
            className="inline-flex min-h-[36px] flex-1 items-center justify-center whitespace-nowrap rounded-md border border-border px-3 text-xs hover:bg-accent"
          >
            {t('styles.detail')}
          </Link>
        </div>
        <div className="flex gap-2">
          <CopyButton
            text={tr(style.prompt)}
            label={t('styles.copy')}
            copiedLabel={t('styles.copied')}
            className="min-h-[36px] flex-1 whitespace-nowrap"
          />
          <CopyImageButton
            style={style}
            label={t('styles.copyImage')}
            copiedLabel={t('styles.copied')}
            className="min-h-[36px] flex-1 whitespace-nowrap"
          />
        </div>
      </CardContent>
    </Card>
    </MotionLift>
  )
}
