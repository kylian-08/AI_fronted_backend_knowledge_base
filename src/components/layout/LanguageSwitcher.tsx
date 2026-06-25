import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/contexts/AppContext'
import type { Locale } from '@/types/catalog'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useApp()

  function toggle() {
    setLocale(locale === 'zh-CN' ? 'en-US' : 'zh-CN')
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggle}
      className={cn('gap-1.5 min-h-[36px]', className)}
      aria-label="Switch language"
    >
      <Languages className="h-4 w-4" />
      {locale === 'zh-CN' ? t('lang.en') : t('lang.zh')}
    </Button>
  )
}

export function LocaleToggle({ value, onChange }: { value: Locale; onChange: (l: Locale) => void }) {
  return (
    <div className="inline-flex rounded-md border border-border p-0.5">
      {(['zh-CN', 'en-US'] as Locale[]).map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => onChange(loc)}
          className={cn(
            'rounded px-2 py-1 text-xs font-medium transition-colors',
            value === loc ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {loc === 'zh-CN' ? '中文' : 'EN'}
        </button>
      ))}
    </div>
  )
}
