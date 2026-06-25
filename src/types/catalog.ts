export type Locale = 'zh-CN' | 'en-US'

export type CatalogStatus = 'ready' | 'draft' | 'placeholder'

export type CatalogKind = 'style' | 'component' | 'backend' | 'architecture'

export interface LocalizedText {
  'zh-CN': string
  'en-US': string
}

export interface CatalogItem {
  id: string
  slug: string
  kind: CatalogKind
  title: LocalizedText
  description: LocalizedText
  tags: string[]
  category: string
  prompt: LocalizedText
  stack?: string[]
  status: CatalogStatus
}

export interface StyleItem extends CatalogItem {
  kind: 'style'
  tokens: Record<string, string>
  showcaseVariant?: string
  /** Optional reference image: external URL or base64 data URI. */
  referenceImage?: string
  /** Marks user-imported styles (vs bundled catalog). */
  source?: 'bundled' | 'imported'
}

export interface ComponentItem extends CatalogItem {
  kind: 'component'
  previewType: 'react' | 'html' | 'jsx'
  previewSource: string
  states?: string[]
}

export type BackendFramework =
  | 'nestjs'
  | 'fastapi'
  | 'express'
  | 'django'
  | 'gin'
  | 'spring'

export interface BackendItem extends CatalogItem {
  kind: 'backend'
  framework: BackendFramework
  patterns: string[]
}

export interface ArchitectureBlueprint {
  id: string
  kind: 'architecture'
  title: LocalizedText
  description: LocalizedText
  status: 'placeholder'
  diagramType: 'mermaid' | 'canvas' | 'tbd'
  nodes: unknown[]
}

export interface SearchIndexEntry {
  id: string
  kind: CatalogKind
  slug: string
  title: LocalizedText
  description: LocalizedText
  tags: string[]
  category: string
  prompt: LocalizedText
  status: CatalogStatus
  framework?: BackendFramework
  patterns?: string[]
}

export interface CategoryMeta {
  id: string
  key: string
  name: LocalizedText
  icon?: string
}

export interface RegistryFile {
  version: string
  categories: Record<
    string,
    {
      name: LocalizedText
      key: string
      items: string[]
    }
  >
}
