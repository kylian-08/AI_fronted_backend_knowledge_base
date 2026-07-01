const CONFIG_KEY = 'prompt-assistant-agent-config'

export interface AgentConfig {
  providerId: string
  endpoint?: string
  apiKey?: string
  model?: string
}

const DEFAULT_CONFIG: AgentConfig = {
  providerId: 'local-heuristic',
}

export function getAgentConfig(): AgentConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG
  try {
    const raw = localStorage.getItem(CONFIG_KEY)
    if (!raw) return DEFAULT_CONFIG
    return { ...DEFAULT_CONFIG, ...(JSON.parse(raw) as Partial<AgentConfig>) }
  } catch {
    return DEFAULT_CONFIG
  }
}

export function saveAgentConfig(patch: Partial<AgentConfig>): AgentConfig {
  const next = { ...getAgentConfig(), ...patch }
  if (typeof window !== 'undefined') {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(next))
  }
  return next
}
