import type { CSSProperties } from 'react'
import { ShowcaseForm, ShowcaseNav, ShowcaseTable } from '@/components/showcase/slots'

type Tokens = Record<string, string>

interface PreviewProps {
  tokens: Tokens
  compact?: boolean
}

function surfaceBg(tokens: Tokens): string {
  const bg = tokens['--sc-bg'] ?? '#0f172a'
  if (bg.startsWith('linear') || bg.startsWith('radial')) return tokens['--sc-bg-fallback'] ?? tokens['--sc-muted'] ?? '#1e293b'
  return bg
}

function glass(tokens: Tokens): CSSProperties {
  return tokens['--sc-backdrop']
    ? { backdropFilter: tokens['--sc-backdrop'], WebkitBackdropFilter: tokens['--sc-backdrop'] }
    : {}
}

function ModalPreview({ tokens }: PreviewProps) {
  const fontFamily = tokens['--sc-font']
  return (
    <div
      style={{
        position: 'relative',
        padding: 20,
        borderRadius: tokens['--sc-radius'],
        background: surfaceBg(tokens),
        fontFamily,
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: tokens['--sc-muted'],
          border: `1px solid ${tokens['--sc-border']}`,
          borderRadius: tokens['--sc-radius'],
          boxShadow: tokens['--sc-shadow'],
          padding: 18,
          ...glass(tokens),
        }}
      >
        <h3 style={{ margin: '0 0 8px', color: tokens['--sc-fg'], fontSize: 17, fontWeight: 600 }}>确认删除</h3>
        <p style={{ margin: '0 0 16px', color: tokens['--sc-muted-fg'], fontSize: 13 }}>
          此操作不可撤销，确定继续吗？
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button
            style={{
              padding: '7px 14px',
              border: `1px solid ${tokens['--sc-border']}`,
              background: 'transparent',
              color: tokens['--sc-fg'],
              borderRadius: tokens['--sc-radius'],
              fontFamily,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            取消
          </button>
          <button
            style={{
              padding: '7px 14px',
              border: 'none',
              background: tokens['--sc-primary'],
              color: tokens['--sc-primary-fg'],
              borderRadius: tokens['--sc-radius'],
              fontFamily,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            删除
          </button>
        </div>
      </div>
    </div>
  )
}

function ToastPreview({ tokens }: PreviewProps) {
  const fontFamily = tokens['--sc-font']
  const toast = (accent: string, title: string, body: string) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        background: tokens['--sc-muted'],
        border: `1px solid ${tokens['--sc-border']}`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: tokens['--sc-radius'],
        boxShadow: tokens['--sc-shadow'],
        padding: '10px 12px',
        ...glass(tokens),
      }}
    >
      <span style={{ width: 8, height: 8, marginTop: 5, borderRadius: 999, background: accent, flexShrink: 0 }} />
      <div>
        <div style={{ color: tokens['--sc-fg'], fontSize: 13, fontWeight: 600 }}>{title}</div>
        <div style={{ color: tokens['--sc-muted-fg'], fontSize: 12 }}>{body}</div>
      </div>
    </div>
  )
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, background: surfaceBg(tokens), borderRadius: tokens['--sc-radius'], fontFamily }}>
      {toast(tokens['--sc-primary'], '操作成功', '更改已保存。')}
      {toast(tokens['--sc-muted-fg'], '提示', '有新的更新可用。')}
    </div>
  )
}

function Framed({ tokens, children }: { tokens: Tokens; children: React.ReactNode }) {
  return (
    <div style={{ padding: 16, background: surfaceBg(tokens), borderRadius: tokens['--sc-radius'] }}>{children}</div>
  )
}

const renderers: Record<string, (props: PreviewProps) => React.ReactElement> = {
  'modal-dialog': ModalPreview,
  'toast-notifications': ToastPreview,
  'table-basic': ({ tokens }) => (
    <Framed tokens={tokens}>
      <ShowcaseTable tokens={tokens} />
    </Framed>
  ),
  navbar: ({ tokens }) => (
    <Framed tokens={tokens}>
      <ShowcaseNav tokens={tokens} />
    </Framed>
  ),
  'sign-in-form': ({ tokens }) => (
    <Framed tokens={tokens}>
      <ShowcaseForm tokens={tokens} />
    </Framed>
  ),
}

/** Whether a themed renderer exists for this component id. */
export function hasThemedPreview(id: string): boolean {
  return id in renderers
}

/** Render a component preview using the given design tokens (follows applied style). */
export function ThemedComponentPreview({ id, tokens, compact }: { id: string; tokens: Tokens; compact?: boolean }) {
  const Renderer = renderers[id]
  if (!Renderer) return null
  return <Renderer tokens={tokens} compact={compact} />
}
