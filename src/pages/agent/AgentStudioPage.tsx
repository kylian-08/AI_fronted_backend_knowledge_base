import { useMemo, useState } from 'react'
import { Layout, Header } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/catalog/CopyButton'
import { ThemedComponentPreview, hasThemedPreview } from '@/components/showcase/componentPreviews'
import { MotionOverrideProvider } from '@/components/motion/MotionPrimitives'
import { MotionPanel } from '@/components/motion/MotionPanel'
import { useMotionTuning } from '@/hooks/useMotionTuning'
import { resolveMotionPresetKey } from '@/lib/motion/presets'
import { getAgentConfig, getAgentProvider, listAgentProviders, saveAgentConfig } from '@/lib/agent'
import { AgentNotConfiguredError } from '@/types/agent'
import type { AgentBrief, AgentSectionKind, GeneratedUISpec } from '@/types/agent'
import { useApp } from '@/contexts/AppContext'
import type { MessageKey } from '@/lib/messages'
import { cn } from '@/lib/utils'

const ALL_SECTIONS: AgentSectionKind[] = [
  'nav',
  'hero',
  'features',
  'pricing',
  'testimonial',
  'form',
  'faq',
  'footer',
]

const SECTION_MESSAGE_KEY: Record<AgentSectionKind, MessageKey> = {
  nav: 'agent.section.nav',
  hero: 'agent.section.hero',
  features: 'agent.section.features',
  pricing: 'agent.section.pricing',
  testimonial: 'agent.section.testimonial',
  form: 'agent.section.form',
  faq: 'agent.section.faq',
  footer: 'agent.section.footer',
  custom: 'agent.section.custom',
}

const fieldClass =
  'h-9 w-full rounded-md border border-border bg-background px-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary'

export function AgentStudioPage() {
  const { allStyles, allComponents, locale, t, tr, applyStyle, appliedStyleId } = useApp()
  const providers = useMemo(() => listAgentProviders(), [])

  const [description, setDescription] = useState('')
  const [brandName, setBrandName] = useState('')
  const [industry, setIndustry] = useState('')
  const [toneInput, setToneInput] = useState('')
  const [sections, setSections] = useState<AgentSectionKind[]>(ALL_SECTIONS)
  const [providerId, setProviderId] = useState(() => getAgentConfig().providerId)
  const [endpoint, setEndpoint] = useState(() => getAgentConfig().endpoint ?? '')
  const [apiKey, setApiKey] = useState(() => getAgentConfig().apiKey ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<GeneratedUISpec | null>(null)
  const tuning = useMotionTuning('none')

  function toggleSection(kind: AgentSectionKind) {
    setSections((prev) => (prev.includes(kind) ? prev.filter((k) => k !== kind) : [...prev, kind]))
  }

  async function handleGenerate() {
    setLoading(true)
    setError(null)
    saveAgentConfig({ providerId, endpoint: endpoint || undefined, apiKey: apiKey || undefined })

    const brief: AgentBrief = {
      description: description.trim() || brandName.trim() || industry.trim() || 'A modern product landing page',
      brandName: brandName.trim() || undefined,
      industry: industry.trim() || undefined,
      toneKeywords: toneInput
        .split(/[,，]/)
        .map((s) => s.trim())
        .filter(Boolean),
      sections,
      locale,
    }

    try {
      const provider = getAgentProvider(providerId)
      const spec = await provider.generate(brief, { styles: allStyles, components: allComponents })
      setResult(spec)
      tuning.selectPreset(resolveMotionPresetKey(spec.style))
    } catch (err) {
      setError(err instanceof AgentNotConfiguredError ? t('agent.notConfigured') : err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  const isRemote = providerId !== 'local-heuristic'

  return (
    <Layout>
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold">{t('agent.title')}</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">{t('agent.subtitle')}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('agent.description')}</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('agent.descriptionPh')}
                rows={4}
                className="w-full rounded-md border border-border bg-background p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('agent.brandName')}</label>
                <input value={brandName} onChange={(e) => setBrandName(e.target.value)} className={fieldClass} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('agent.industry')}</label>
                <input value={industry} onChange={(e) => setIndustry(e.target.value)} className={fieldClass} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('agent.tone')}</label>
              <input
                value={toneInput}
                onChange={(e) => setToneInput(e.target.value)}
                placeholder={t('agent.tonePh')}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('agent.sections')}</label>
              <div className="flex flex-wrap gap-1.5">
                {ALL_SECTIONS.map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    onClick={() => toggleSection(kind)}
                    className={cn(
                      'rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
                      sections.includes(kind)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80',
                    )}
                  >
                    {t(SECTION_MESSAGE_KEY[kind])}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{t('agent.provider')}</label>
              <select
                value={providerId}
                onChange={(e) => setProviderId(e.target.value)}
                className={fieldClass}
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {tr(p.label)}
                  </option>
                ))}
              </select>
              {isRemote && (
                <div className="mt-2 space-y-2">
                  <input
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    placeholder={t('agent.endpoint')}
                    className={fieldClass}
                  />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={t('agent.apiKey')}
                    className={fieldClass}
                  />
                </div>
              )}
            </div>
            <Button className="w-full" onClick={handleGenerate} disabled={loading}>
              {loading ? t('agent.generating') : t('agent.generate')}
            </Button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <div>
            {!result && !loading && (
              <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                {t('agent.empty')}
              </div>
            )}
            {loading && (
              <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
                {t('agent.generating')}
              </div>
            )}
            {result && !loading && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">{t('agent.resultStyle')}</p>
                    <p className="font-semibold">{tr(result.style.title)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={appliedStyleId === result.style.id ? 'secondary' : 'default'}
                      onClick={() => applyStyle(result.style)}
                    >
                      {t('styles.apply')}
                    </Button>
                    <CopyButton text={result.prompt} label={t('agent.copyPrompt')} copiedLabel={t('styles.copied')} />
                  </div>
                </div>
                <details className="group">
                  <summary className="cursor-pointer select-none rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    {t('motion.title')}
                  </summary>
                  <MotionPanel tuning={tuning} className="mt-2" />
                </details>
                <MotionOverrideProvider value={tuning.preset}>
                <div className="space-y-3" key={tuning.replayKey}>
                  {result.sections.map((section) => (
                    <div key={section.id} className="overflow-hidden rounded-xl border border-border bg-card">
                      <div className="border-b border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {tr(section.title)}
                      </div>
                      <div
                        className="p-4"
                        style={{
                          background: result.style.tokens['--sc-bg'],
                        }}
                      >
                        {hasThemedPreview(section.componentId) ? (
                          <ThemedComponentPreview
                            id={section.componentId}
                            tokens={result.style.tokens}
                            locale={locale}
                          />
                        ) : (
                          <p className="text-xs text-muted-foreground">{section.componentId}</p>
                        )}
                      </div>
                      {section.rationale && (
                        <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
                          {tr(section.rationale)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                </MotionOverrideProvider>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}
