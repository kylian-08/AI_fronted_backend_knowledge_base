import type {
  AgentBrief,
  AgentGenerationContext,
  AgentProvider,
  AgentSectionKind,
  GeneratedSection,
  GeneratedUISpec,
} from '@/types/agent'
import { AgentNotConfiguredError } from '@/types/agent'
import { getAgentConfig } from './agentConfig'

/**
 * Extension point for a real LLM-backed agent.
 *
 * Wire it up by saving an OpenAI-chat-completions-compatible `endpoint` +
 * `apiKey` via `saveAgentConfig()` (exposed in the Agent Studio settings
 * panel). The model is asked to return JSON referencing real style/component
 * ids from the current catalog, which this provider then resolves against the
 * live registry so the UI never renders a dangling reference.
 */
export const remoteAgentProvider: AgentProvider = {
  id: 'remote-llm',
  label: {
    'zh-CN': '远程 AI 模型（需配置 API Key）',
    'en-US': 'Remote AI Model (requires API key)',
  },
  isConfigured() {
    const config = getAgentConfig()
    return Boolean(config.endpoint && config.apiKey)
  },
  async generate(brief: AgentBrief, ctx: AgentGenerationContext): Promise<GeneratedUISpec> {
    const config = getAgentConfig()
    if (!config.endpoint || !config.apiKey) {
      throw new AgentNotConfiguredError(this.id)
    }

    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model ?? 'gpt-4o-mini',
        messages: [
          { role: 'system', content: buildSystemPrompt(ctx) },
          { role: 'user', content: JSON.stringify(brief) },
        ],
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      throw new Error(`Agent request failed: ${response.status} ${response.statusText}`)
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    const raw = data.choices?.[0]?.message?.content
    if (!raw) throw new Error('Agent response did not include content')

    return resolveSpec(JSON.parse(raw), brief, ctx)
  },
}

function buildSystemPrompt(ctx: AgentGenerationContext): string {
  const styleIds = ctx.styles.slice(0, 40).map((s) => s.id)
  const componentIds = ctx.components.map((c) => c.id)
  return [
    'You are a UI design agent inside "Prompt Assistant".',
    `Available styleIds: ${styleIds.join(', ')}`,
    `Available componentIds: ${componentIds.join(', ')}`,
    'Given a JSON brief (description, brandName, industry, toneKeywords, sections, locale),',
    'respond ONLY with a JSON object of shape:',
    '{ "styleId": string, "sections": [{ "kind": string, "componentId": string, "titleZh": string, "titleEn": string, "rationaleZh"?: string, "rationaleEn"?: string }] }',
    'styleId and componentId MUST be chosen from the available lists above.',
  ].join('\n')
}

interface RawAgentResponse {
  styleId: string
  sections: {
    kind: string
    componentId: string
    titleZh?: string
    titleEn?: string
    rationaleZh?: string
    rationaleEn?: string
  }[]
}

function resolveSpec(raw: RawAgentResponse, brief: AgentBrief, ctx: AgentGenerationContext): GeneratedUISpec {
  const style = ctx.styles.find((s) => s.id === raw.styleId) ?? ctx.styles[0]
  if (!style) throw new Error('No styles available to resolve agent response')

  const sections: GeneratedSection[] = raw.sections.map((s, i) => {
    const component = ctx.components.find((c) => c.id === s.componentId) ?? ctx.components[0]
    return {
      id: `${s.kind}-${i}`,
      kind: (s.kind as AgentSectionKind) || 'custom',
      componentId: component?.id ?? 'content-card',
      title: {
        'zh-CN': s.titleZh ?? s.kind,
        'en-US': s.titleEn ?? s.kind,
      },
      rationale:
        s.rationaleZh || s.rationaleEn
          ? { 'zh-CN': s.rationaleZh ?? '', 'en-US': s.rationaleEn ?? '' }
          : undefined,
    }
  })

  return {
    id: `spec-${Date.now()}`,
    brief,
    style,
    sections,
    prompt: JSON.stringify({ styleId: style.id, sections: raw.sections }, null, 2),
    providerId: 'remote-llm',
    createdAt: new Date().toISOString(),
  }
}
