import type { AgentProvider } from '@/types/agent'
import { localHeuristicAgentProvider } from './heuristicProvider'
import { remoteAgentProvider } from './remoteProvider'
import { getAgentConfig } from './agentConfig'

/** Registry of available agent providers. Add new implementations here. */
const providers: AgentProvider[] = [localHeuristicAgentProvider, remoteAgentProvider]

export function listAgentProviders(): AgentProvider[] {
  return providers
}

export function getAgentProvider(id?: string): AgentProvider {
  const targetId = id ?? getAgentConfig().providerId
  return providers.find((p) => p.id === targetId) ?? localHeuristicAgentProvider
}

export { getAgentConfig, saveAgentConfig, type AgentConfig } from './agentConfig'
export { localHeuristicAgentProvider } from './heuristicProvider'
export { remoteAgentProvider } from './remoteProvider'
