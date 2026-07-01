import type { ComponentItem, Locale, LocalizedText, StyleItem } from './catalog'

/**
 * AI Native extension point.
 *
 * This file defines the contract between the app and any "Agent" that turns a
 * user's free-text brief into a structured, renderable UI spec. Today the only
 * implementation is a deterministic offline heuristic (see
 * `src/lib/agent/heuristicProvider.ts`); later a real LLM-backed provider can
 * be dropped in (see `src/lib/agent/remoteProvider.ts`) without touching any
 * UI code, because everything renders against this same `GeneratedUISpec`.
 */

/** Section kinds an Agent can compose into a generated UI. */
export type AgentSectionKind =
  | 'nav'
  | 'hero'
  | 'features'
  | 'pricing'
  | 'testimonial'
  | 'form'
  | 'faq'
  | 'footer'
  | 'custom'

/** Structured brief describing the product/brand a user wants a UI for. */
export interface AgentBrief {
  /** Free-text product/brand description — the primary generation signal. */
  description: string
  brandName?: string
  industry?: string
  /** Tone/mood keywords, e.g. ['minimal', 'playful']. */
  toneKeywords?: string[]
  /** Optional style bucket ('signature' | 'core' | 'variant' | 'imported') or free-text hint. */
  styleHint?: string
  /** Which page sections to include, in order. */
  sections?: AgentSectionKind[]
  locale: Locale
}

/** One generated section: a catalog component rendered with the chosen style. */
export interface GeneratedSection {
  id: string
  kind: AgentSectionKind
  componentId: string
  title: LocalizedText
  /** Short rationale for why this component was chosen, shown to the user. */
  rationale?: LocalizedText
}

/** Full structured output of a single agent generation run. */
export interface GeneratedUISpec {
  id: string
  brief: AgentBrief
  /** Resolved style used to render the generated UI. */
  style: StyleItem
  sections: GeneratedSection[]
  /** Ready-to-copy composed prompt (for continuing in an external AI coding tool). */
  prompt: string
  /** Which provider produced this spec — useful for debugging/telemetry. */
  providerId: string
  createdAt: string
}

/** Catalog snapshot passed to providers so output can be grounded in real ids. */
export interface AgentGenerationContext {
  styles: StyleItem[]
  components: ComponentItem[]
}

/**
 * Implement this interface to plug in a new generation backend (local
 * heuristic, self-hosted model, hosted LLM API, etc). Register it in
 * `src/lib/agent/index.ts` and it becomes selectable in the Agent Studio UI.
 */
export interface AgentProvider {
  id: string
  label: LocalizedText
  /** Whether this provider has everything it needs to run right now. */
  isConfigured(): boolean
  generate(brief: AgentBrief, ctx: AgentGenerationContext): Promise<GeneratedUISpec>
}

export class AgentNotConfiguredError extends Error {
  constructor(providerId: string) {
    super(`Agent provider "${providerId}" is not configured`)
    this.name = 'AgentNotConfiguredError'
  }
}
