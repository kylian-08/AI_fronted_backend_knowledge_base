import type { CSSProperties } from 'react'
import { ShowcaseForm, ShowcaseNav, ShowcaseTable } from '@/components/showcase/slots'
import { pl, type PreviewLabelKey } from '@/lib/previewLabels'
import type { Locale } from '@/types/catalog'
import { MotionButton, MotionEnter } from '@/components/motion/MotionPrimitives'
import { resolveMotionPresetKeyFromTokens } from '@/lib/motion/presets'

type Tokens = Record<string, string>
type L = (key: PreviewLabelKey) => string

interface PreviewProps {
  tokens: Tokens
  compact?: boolean
  l: L
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

function ModalPreview({ tokens, l }: PreviewProps) {
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
        <h3 style={{ margin: '0 0 8px', color: tokens['--sc-fg'], fontSize: 17, fontWeight: 600 }}>{l('confirmDelete')}</h3>
        <p style={{ margin: '0 0 16px', color: tokens['--sc-muted-fg'], fontSize: 13 }}>
          {l('irreversible')}
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
            {l('cancel')}
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
            {l('delete')}
          </button>
        </div>
      </div>
    </div>
  )
}

function ToastPreview({ tokens, l }: PreviewProps) {
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
      {toast(tokens['--sc-primary'], l('success'), l('saved'))}
      {toast(tokens['--sc-muted-fg'], l('hint'), l('updateAvailable'))}
    </div>
  )
}

function Framed({ tokens, children }: { tokens: Tokens; children: React.ReactNode }) {
  return (
    <MotionEnter preset={resolveMotionPresetKeyFromTokens(tokens)}>
      <div style={{ padding: 16, background: surfaceBg(tokens), borderRadius: tokens['--sc-radius'] }}>{children}</div>
    </MotionEnter>
  )
}

function btn(tokens: Tokens, variant: 'primary' | 'secondary' | 'outline' | 'ghost'): CSSProperties {
  const base: CSSProperties = {
    padding: '7px 14px',
    borderRadius: tokens['--sc-radius'],
    fontFamily: tokens['--sc-font'],
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    ...glass(tokens),
  }
  if (variant === 'primary')
    return { ...base, background: tokens['--sc-primary'], color: tokens['--sc-primary-fg'], border: `1px solid ${tokens['--sc-border']}` }
  if (variant === 'secondary')
    return { ...base, background: tokens['--sc-muted'], color: tokens['--sc-fg'], border: `1px solid ${tokens['--sc-border']}` }
  if (variant === 'outline')
    return { ...base, background: 'transparent', color: tokens['--sc-fg'], border: `1px solid ${tokens['--sc-border']}` }
  return { ...base, background: 'transparent', color: tokens['--sc-muted-fg'], border: '1px solid transparent' }
}

function ButtonsPreview({ tokens }: PreviewProps) {
  const preset = resolveMotionPresetKeyFromTokens(tokens)
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <MotionButton preset={preset} style={btn(tokens, 'primary')}>Primary</MotionButton>
        <MotionButton preset={preset} style={btn(tokens, 'secondary')}>Secondary</MotionButton>
        <MotionButton preset={preset} style={btn(tokens, 'outline')}>Outline</MotionButton>
        <MotionButton preset={preset} style={btn(tokens, 'ghost')}>Ghost</MotionButton>
        <MotionButton preset={preset} disabled style={{ ...btn(tokens, 'primary'), opacity: 0.5, cursor: 'not-allowed' }}>Disabled</MotionButton>
      </div>
    </Framed>
  )
}

function BadgesPreview({ tokens }: PreviewProps) {
  const chip = (bg: string, color: string, text: string) => (
    <span style={{ background: bg, color, padding: '3px 10px', borderRadius: 999, fontSize: 12, fontFamily: tokens['--sc-font'] }}>{text}</span>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        {chip(tokens['--sc-primary'], tokens['--sc-primary-fg'], 'New')}
        {chip(tokens['--sc-muted'], tokens['--sc-fg'], 'Default')}
        <span style={{ border: `1px solid ${tokens['--sc-border']}`, color: tokens['--sc-muted-fg'], padding: '3px 10px', borderRadius: 999, fontSize: 12, fontFamily: tokens['--sc-font'] }}>Outline</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: tokens['--sc-fg'], fontSize: 12, fontFamily: tokens['--sc-font'] }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: tokens['--sc-primary'] }} />Online
        </span>
      </div>
    </Framed>
  )
}

function ContentCardPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ background: tokens['--sc-muted'], border: `1px solid ${tokens['--sc-border']}`, borderRadius: tokens['--sc-radius'], boxShadow: tokens['--sc-shadow'], overflow: 'hidden', fontFamily: tokens['--sc-font'], ...glass(tokens) }}>
        <div style={{ height: 56, background: tokens['--sc-primary'], opacity: 0.85 }} />
        <div style={{ padding: 14 }}>
          <h4 style={{ margin: '0 0 4px', color: tokens['--sc-fg'], fontSize: 15, fontWeight: 600 }}>{l('cardTitle')}</h4>
          <p style={{ margin: '0 0 12px', color: tokens['--sc-muted-fg'], fontSize: 12 }}>{l('cardDesc')}</p>
          <button style={btn(tokens, 'primary')}>{l('view')}</button>
        </div>
      </div>
    </Framed>
  )
}

function TabsPreview({ tokens, l }: PreviewProps) {
  const tab = (text: string, active: boolean) => (
    <span style={{ padding: '8px 14px', fontSize: 13, fontFamily: tokens['--sc-font'], color: active ? tokens['--sc-fg'] : tokens['--sc-muted-fg'], borderBottom: `2px solid ${active ? tokens['--sc-primary'] : 'transparent'}`, fontWeight: active ? 600 : 400 }}>{text}</span>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ fontFamily: tokens['--sc-font'] }}>
        <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${tokens['--sc-border']}` }}>
          {tab(l('tabOverview'), true)}
          {tab(l('tabDetails'), false)}
          {tab(l('tabSettings'), false)}
        </div>
        <p style={{ margin: '12px 2px 0', color: tokens['--sc-muted-fg'], fontSize: 12 }}>{l('tabContent')}</p>
      </div>
    </Framed>
  )
}

function AccordionPreview({ tokens, l }: PreviewProps) {
  const row = (text: string, open: boolean) => (
    <div style={{ borderBottom: `1px solid ${tokens['--sc-border']}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 4px', color: tokens['--sc-fg'], fontSize: 13, fontWeight: 600 }}>
        <span>{text}</span>
        <span style={{ color: tokens['--sc-muted-fg'] }}>{open ? '−' : '+'}</span>
      </div>
      {open && <p style={{ margin: '0 4px 10px', color: tokens['--sc-muted-fg'], fontSize: 12 }}>{l('accordionExpanded')}</p>}
    </div>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ fontFamily: tokens['--sc-font'] }}>
        {row(l('faqPrompt'), true)}
        {row(l('faqImport'), false)}
      </div>
    </Framed>
  )
}

function DropdownPreview({ tokens, l }: PreviewProps) {
  const item = (text: string, active?: boolean) => (
    <div style={{ padding: '8px 12px', fontSize: 13, color: active ? tokens['--sc-primary-fg'] : tokens['--sc-fg'], background: active ? tokens['--sc-primary'] : 'transparent', borderRadius: tokens['--sc-radius'] }}>{text}</div>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ width: 180, background: tokens['--sc-muted'], border: `1px solid ${tokens['--sc-border']}`, borderRadius: tokens['--sc-radius'], boxShadow: tokens['--sc-shadow'], padding: 4, fontFamily: tokens['--sc-font'], ...glass(tokens) }}>
        {item(l('profile'), true)}
        {item(l('accountSettings'))}
        {item(l('signOut'))}
      </div>
    </Framed>
  )
}

function TooltipPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: tokens['--sc-font'] }}>
        <div style={{ position: 'relative', background: tokens['--sc-fg'], color: tokens['--sc-bg']?.startsWith('#') ? tokens['--sc-bg'] : tokens['--sc-muted'], padding: '6px 10px', borderRadius: tokens['--sc-radius'], fontSize: 12, boxShadow: tokens['--sc-shadow'] }}>
          {l('tooltipText')}
          <span style={{ position: 'absolute', left: '50%', bottom: -5, width: 10, height: 10, background: tokens['--sc-fg'], transform: 'translateX(-50%) rotate(45deg)' }} />
        </div>
        <button style={btn(tokens, 'secondary')}>{l('hoverMe')}</button>
      </div>
    </Framed>
  )
}

function AvatarGroupPreview({ tokens }: PreviewProps) {
  const initials = ['A', 'B', 'C', 'D']
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', alignItems: 'center', fontFamily: tokens['--sc-font'] }}>
        {initials.map((c, i) => (
          <span
            key={c}
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: i % 2 === 0 ? tokens['--sc-primary'] : tokens['--sc-muted'],
              color: i % 2 === 0 ? tokens['--sc-primary-fg'] : tokens['--sc-fg'],
              border: `2px solid ${surfaceBg(tokens)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 600,
              marginLeft: i === 0 ? 0 : -12,
            }}
          >
            {c}
          </span>
        ))}
        <span style={{ width: 40, height: 40, borderRadius: 999, background: tokens['--sc-muted'], color: tokens['--sc-muted-fg'], border: `2px solid ${surfaceBg(tokens)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, marginLeft: -12 }}>+5</span>
      </div>
    </Framed>
  )
}

function ProgressPreview({ tokens, l }: PreviewProps) {
  const bar = (pct: number) => (
    <div style={{ height: 8, background: tokens['--sc-muted'], borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: tokens['--sc-primary'], borderRadius: 999 }} />
    </div>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: tokens['--sc-font'] }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: tokens['--sc-muted-fg'], fontSize: 12 }}>
            <span>{l('uploading')}</span><span>72%</span>
          </div>
          {bar(72)}
        </div>
        {bar(40)}
      </div>
    </Framed>
  )
}

function AlertPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: tokens['--sc-muted'], border: `1px solid ${tokens['--sc-border']}`, borderLeft: `3px solid ${tokens['--sc-primary']}`, borderRadius: tokens['--sc-radius'], padding: '12px 14px', fontFamily: tokens['--sc-font'], ...glass(tokens) }}>
        <span style={{ color: tokens['--sc-primary'], fontWeight: 700 }}>ⓘ</span>
        <div>
          <div style={{ color: tokens['--sc-fg'], fontSize: 13, fontWeight: 600 }}>{l('alertTitle')}</div>
          <div style={{ color: tokens['--sc-muted-fg'], fontSize: 12 }}>{l('alertBody')}</div>
        </div>
      </div>
    </Framed>
  )
}

function BreadcrumbPreview({ tokens, l }: PreviewProps) {
  const sep = <span style={{ color: tokens['--sc-muted-fg'], margin: '0 8px' }}>/</span>
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 13, fontFamily: tokens['--sc-font'] }}>
        <span style={{ color: tokens['--sc-muted-fg'] }}>{l('home')}</span>
        {sep}
        <span style={{ color: tokens['--sc-muted-fg'] }}>{l('styles')}</span>
        {sep}
        <span style={{ color: tokens['--sc-fg'], fontWeight: 600 }}>{l('glassmorphism')}</span>
      </div>
    </Framed>
  )
}

function PaginationPreview({ tokens }: PreviewProps) {
  const cell = (text: string, active?: boolean) => (
    <span style={{ minWidth: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: tokens['--sc-radius'], fontSize: 13, fontFamily: tokens['--sc-font'], background: active ? tokens['--sc-primary'] : 'transparent', color: active ? tokens['--sc-primary-fg'] : tokens['--sc-fg'], border: `1px solid ${active ? tokens['--sc-primary'] : tokens['--sc-border']}` }}>{text}</span>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {cell('‹')}
        {cell('1', true)}
        {cell('2')}
        {cell('3')}
        <span style={{ color: tokens['--sc-muted-fg'] }}>…</span>
        {cell('9')}
        {cell('›')}
      </div>
    </Framed>
  )
}

function ToggleSwitchPreview({ tokens, l }: PreviewProps) {
  const sw = (on: boolean) => (
    <span style={{ width: 44, height: 24, borderRadius: 999, background: on ? tokens['--sc-primary'] : tokens['--sc-border'], position: 'relative', display: 'inline-block', transition: 'background .2s' }}>
      <span style={{ position: 'absolute', top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: 999, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
    </span>
  )
  const row = (text: string, on: boolean) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: tokens['--sc-font'] }}>
      <span style={{ color: tokens['--sc-fg'], fontSize: 13 }}>{text}</span>
      {sw(on)}
    </div>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {row(l('pushNotif'), true)}
        {row(l('darkMode'), false)}
      </div>
    </Framed>
  )
}

function StepperPreview({ tokens, l }: PreviewProps) {
  const step = (n: number, label: string, state: 'done' | 'active' | 'todo') => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
      <span style={{ width: 28, height: 28, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, background: state === 'todo' ? 'transparent' : tokens['--sc-primary'], color: state === 'todo' ? tokens['--sc-muted-fg'] : tokens['--sc-primary-fg'], border: `1px solid ${state === 'todo' ? tokens['--sc-border'] : tokens['--sc-primary']}` }}>
        {state === 'done' ? '✓' : n}
      </span>
      <span style={{ fontSize: 11, color: state === 'active' ? tokens['--sc-fg'] : tokens['--sc-muted-fg'], fontFamily: tokens['--sc-font'] }}>{label}</span>
    </div>
  )
  const line = <span style={{ flex: 1, height: 1, background: tokens['--sc-border'], marginTop: 14 }} />
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {step(1, l('stepAccount'), 'done')}
        {line}
        {step(2, l('stepProfile'), 'active')}
        {line}
        {step(3, l('stepDone'), 'todo')}
      </div>
    </Framed>
  )
}

function StatCardPreview({ tokens, l }: PreviewProps) {
  const card = (label: string, value: string, delta: string) => (
    <div style={{ flex: 1, background: tokens['--sc-muted'], border: `1px solid ${tokens['--sc-border']}`, borderRadius: tokens['--sc-radius'], padding: 12, fontFamily: tokens['--sc-font'], ...glass(tokens) }}>
      <div style={{ color: tokens['--sc-muted-fg'], fontSize: 11 }}>{label}</div>
      <div style={{ color: tokens['--sc-fg'], fontSize: 22, fontWeight: 700, margin: '2px 0' }}>{value}</div>
      <div style={{ color: tokens['--sc-primary'], fontSize: 11 }}>{delta}</div>
    </div>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', gap: 10 }}>
        {card(l('statUsers'), '12.8k', '↑ 12%')}
        {card(l('statRevenue'), '¥48k', '↑ 8%')}
      </div>
    </Framed>
  )
}

function EmptyStatePreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8, padding: '8px 0', fontFamily: tokens['--sc-font'] }}>
        <span style={{ width: 48, height: 48, borderRadius: 12, background: tokens['--sc-muted'], border: `1px dashed ${tokens['--sc-border']}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: tokens['--sc-muted-fg'] }}>📭</span>
        <div style={{ color: tokens['--sc-fg'], fontSize: 14, fontWeight: 600 }}>{l('emptyTitle')}</div>
        <div style={{ color: tokens['--sc-muted-fg'], fontSize: 12 }}>{l('emptyDesc')}</div>
        <button style={btn(tokens, 'primary')}>{l('create')}</button>
      </div>
    </Framed>
  )
}

function inputStyle(tokens: Tokens): CSSProperties {
  return {
    width: '100%',
    padding: '8px 12px',
    background: tokens['--sc-muted'],
    border: `1px solid ${tokens['--sc-border']}`,
    borderRadius: tokens['--sc-radius'],
    color: tokens['--sc-fg'],
    fontSize: 13,
    fontFamily: tokens['--sc-font'],
    boxSizing: 'border-box',
    ...glass(tokens),
  }
}

function IconButtonPreview({ tokens }: PreviewProps) {
  const iconBtn: CSSProperties = {
    width: 36,
    height: 36,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens['--sc-radius'],
    background: tokens['--sc-muted'],
    border: `1px solid ${tokens['--sc-border']}`,
    color: tokens['--sc-fg'],
    fontSize: 16,
    ...glass(tokens),
  }
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', gap: 8 }}>
        <span style={iconBtn}>+</span>
        <span style={{ ...iconBtn, background: tokens['--sc-primary'], color: tokens['--sc-primary-fg'] }}>✓</span>
        <span style={{ ...iconBtn, borderRadius: 999 }}>⋯</span>
      </div>
    </Framed>
  )
}

function ButtonGroupPreview({ tokens, l }: PreviewProps) {
  const seg = (_text: string, active: boolean, radius: string): CSSProperties => ({
    padding: '7px 14px',
    fontSize: 13,
    fontFamily: tokens['--sc-font'],
    fontWeight: 600,
    background: active ? tokens['--sc-primary'] : tokens['--sc-muted'],
    color: active ? tokens['--sc-primary-fg'] : tokens['--sc-fg'],
    border: `1px solid ${tokens['--sc-border']}`,
    borderRadius: radius,
  })
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'inline-flex' }}>
        <span style={seg(l('day'), true, `${tokens['--sc-radius']} 0 0 ${tokens['--sc-radius']}`)}>{l('day')}</span>
        <span style={{ ...seg(l('week'), false, '0'), borderLeft: 'none' }}>{l('week')}</span>
        <span style={{ ...seg(l('month'), false, `0 ${tokens['--sc-radius']} ${tokens['--sc-radius']} 0`), borderLeft: 'none' }}>{l('month')}</span>
      </div>
    </Framed>
  )
}

function SearchInputPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ position: 'relative', fontFamily: tokens['--sc-font'] }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: tokens['--sc-muted-fg'], fontSize: 14 }}>⌕</span>
        <input readOnly placeholder={l('searchPlaceholder')} style={{ ...inputStyle(tokens), paddingLeft: 32 }} />
      </div>
    </Framed>
  )
}

function TextInputPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ fontFamily: tokens['--sc-font'] }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: tokens['--sc-muted-fg'] }}>{l('username')}</label>
        <input readOnly placeholder={l('usernamePh')} style={inputStyle(tokens)} />
        <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{l('usernameTaken')}</p>
      </div>
    </Framed>
  )
}

function SelectFieldPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ fontFamily: tokens['--sc-font'] }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: tokens['--sc-muted-fg'] }}>{l('region')}</label>
        <div style={{ ...inputStyle(tokens), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{l('regionCn')}</span>
          <span style={{ color: tokens['--sc-muted-fg'] }}>▾</span>
        </div>
      </div>
    </Framed>
  )
}

function CheckboxGroupPreview({ tokens, l }: PreviewProps) {
  const row = (label: string, checked: boolean) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: tokens['--sc-fg'], fontFamily: tokens['--sc-font'] }}>
      <span style={{ width: 16, height: 16, borderRadius: 4, border: `1px solid ${tokens['--sc-border']}`, background: checked ? tokens['--sc-primary'] : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens['--sc-primary-fg'], fontSize: 11 }}>
        {checked ? '✓' : ''}
      </span>
      {label}
    </label>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {row(l('pushNotif'), true)}
        {row(l('marketingEmail'), false)}
      </div>
    </Framed>
  )
}

function RadioGroupPreview({ tokens, l }: PreviewProps) {
  const row = (label: string, checked: boolean) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: tokens['--sc-fg'], fontFamily: tokens['--sc-font'] }}>
      <span style={{ width: 16, height: 16, borderRadius: 999, border: `1px solid ${checked ? tokens['--sc-primary'] : tokens['--sc-border']}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {checked && <span style={{ width: 8, height: 8, borderRadius: 999, background: tokens['--sc-primary'] }} />}
      </span>
      {label}
    </label>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {row(l('planStandard'), true)}
        {row(l('planPro'), false)}
      </div>
    </Framed>
  )
}

function TextareaPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ fontFamily: tokens['--sc-font'] }}>
        <label style={{ display: 'block', marginBottom: 4, fontSize: 12, color: tokens['--sc-muted-fg'] }}>{l('description')}</label>
        <div style={{ ...inputStyle(tokens), minHeight: 72, padding: '10px 12px', color: tokens['--sc-muted-fg'] }}>{l('descriptionPh')}</div>
      </div>
    </Framed>
  )
}

function SkeletonPreview({ tokens }: PreviewProps) {
  const bar = (w: string, h: number) => (
    <div style={{ width: w, height: h, borderRadius: tokens['--sc-radius'], background: tokens['--sc-border'], opacity: 0.6 }} />
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 40, height: 40, borderRadius: 999, background: tokens['--sc-border'], opacity: 0.6 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {bar('60%', 10)}
          {bar('90%', 8)}
        </div>
      </div>
    </Framed>
  )
}

function SpinnerPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontFamily: tokens['--sc-font'] }}>
        <span style={{ width: 28, height: 28, borderRadius: 999, border: `3px solid ${tokens['--sc-border']}`, borderTopColor: tokens['--sc-primary'], display: 'inline-block' }} />
        <span style={{ fontSize: 13, color: tokens['--sc-muted-fg'] }}>{l('loading')}</span>
      </div>
    </Framed>
  )
}

function DrawerPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ position: 'relative', height: 120, borderRadius: tokens['--sc-radius'], overflow: 'hidden', fontFamily: tokens['--sc-font'] }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%', background: tokens['--sc-muted'], borderLeft: `1px solid ${tokens['--sc-border']}`, padding: 14, ...glass(tokens) }}>
          <div style={{ fontWeight: 600, color: tokens['--sc-fg'], fontSize: 14, marginBottom: 8 }}>{l('tabSettings')}</div>
          <div style={{ fontSize: 12, color: tokens['--sc-muted-fg'] }}>{l('drawerContent')}</div>
        </div>
      </div>
    </Framed>
  )
}

function ListViewPreview({ tokens, l }: PreviewProps) {
  const row = (title: string, sub: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 4px', borderBottom: `1px solid ${tokens['--sc-border']}` }}>
      <span style={{ width: 32, height: 32, borderRadius: tokens['--sc-radius'], background: tokens['--sc-primary'], opacity: 0.85 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: tokens['--sc-fg'] }}>{title}</div>
        <div style={{ fontSize: 11, color: tokens['--sc-muted-fg'] }}>{sub}</div>
      </div>
      <span style={{ color: tokens['--sc-muted-fg'] }}>›</span>
    </div>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ fontFamily: tokens['--sc-font'] }}>
        {row(l('projectAlpha'), l('updated2h'))}
        {row(l('projectBeta'), l('yesterday'))}
      </div>
    </Framed>
  )
}

function TimelinePreview({ tokens, l }: PreviewProps) {
  const item = (title: string, time: string, last?: boolean) => (
    <div style={{ display: 'flex', gap: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: tokens['--sc-primary'], marginTop: 4 }} />
        {!last && <span style={{ width: 2, flex: 1, minHeight: 24, background: tokens['--sc-border'] }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: tokens['--sc-fg'], fontFamily: tokens['--sc-font'] }}>{title}</div>
        <div style={{ fontSize: 11, color: tokens['--sc-muted-fg'] }}>{time}</div>
      </div>
    </div>
  )
  return (
    <Framed tokens={tokens}>
      {item(l('orderCreated'), '10:30')}
      {item(l('paymentDone'), '10:32')}
      {item(l('shipped'), '14:00', true)}
    </Framed>
  )
}

function RatingPreview({ tokens }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: tokens['--sc-font'] }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} style={{ fontSize: 18, color: n <= 4 ? tokens['--sc-primary'] : tokens['--sc-border'] }}>★</span>
        ))}
        <span style={{ marginLeft: 6, fontSize: 12, color: tokens['--sc-muted-fg'] }}>4.0</span>
      </div>
    </Framed>
  )
}

function SidebarPreview({ tokens, l }: PreviewProps) {
  const item = (text: string, active: boolean) => (
    <div style={{ padding: '8px 10px', borderRadius: tokens['--sc-radius'], fontSize: 12, fontFamily: tokens['--sc-font'], background: active ? tokens['--sc-primary'] : 'transparent', color: active ? tokens['--sc-primary-fg'] : tokens['--sc-muted-fg'], fontWeight: active ? 600 : 400 }}>
      {text}
    </div>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', gap: 8, minHeight: 100 }}>
        <div style={{ width: 100, background: tokens['--sc-muted'], border: `1px solid ${tokens['--sc-border']}`, borderRadius: tokens['--sc-radius'], padding: 6, ...glass(tokens) }}>
          {item(l('navOverview'), true)}
          {item(l('navStyles'), false)}
          {item(l('navComponents'), false)}
        </div>
        <div style={{ flex: 1, background: tokens['--sc-border'], opacity: 0.25, borderRadius: tokens['--sc-radius'] }} />
      </div>
    </Framed>
  )
}

function CommandPalettePreview({ tokens, l }: PreviewProps) {
  const row = (text: string, shortcut: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', fontSize: 12, color: tokens['--sc-fg'], fontFamily: tokens['--sc-font'] }}>
      <span>{text}</span>
      <span style={{ color: tokens['--sc-muted-fg'], fontSize: 11 }}>{shortcut}</span>
    </div>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ background: tokens['--sc-muted'], border: `1px solid ${tokens['--sc-border']}`, borderRadius: tokens['--sc-radius'], overflow: 'hidden', boxShadow: tokens['--sc-shadow'], ...glass(tokens) }}>
        <div style={{ padding: '8px 10px', borderBottom: `1px solid ${tokens['--sc-border']}` }}>
          <input readOnly placeholder={l('commandPh')} style={{ ...inputStyle(tokens), border: 'none', background: 'transparent', padding: 0 }} />
        </div>
        {row(l('cmdGoStyles'), '↵')}
        {row(l('cmdCopyPrompt'), '⌘C')}
      </div>
    </Framed>
  )
}

function DatePickerPreview({ tokens, l }: PreviewProps) {
  const day = (n: number, active?: boolean) => (
    <span style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: tokens['--sc-radius'], fontSize: 11, fontFamily: tokens['--sc-font'], background: active ? tokens['--sc-primary'] : 'transparent', color: active ? tokens['--sc-primary-fg'] : tokens['--sc-fg'] }}>{n}</span>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ background: tokens['--sc-muted'], border: `1px solid ${tokens['--sc-border']}`, borderRadius: tokens['--sc-radius'], padding: 10, fontFamily: tokens['--sc-font'], ...glass(tokens) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12, fontWeight: 600, color: tokens['--sc-fg'] }}>
          <span>{l('calendarTitle')}</span>
          <span style={{ color: tokens['--sc-muted-fg'] }}>‹ ›</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, textAlign: 'center' }}>
          {day(24)}{day(25, true)}{day(26)}{day(27)}{day(28)}
        </div>
      </div>
    </Framed>
  )
}

function FileUploadPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ border: `2px dashed ${tokens['--sc-border']}`, borderRadius: tokens['--sc-radius'], padding: 16, textAlign: 'center', fontFamily: tokens['--sc-font'] }}>
        <div style={{ fontSize: 22, marginBottom: 6 }}>📁</div>
        <div style={{ fontSize: 13, color: tokens['--sc-fg'], fontWeight: 600 }}>{l('dropFiles')}</div>
        <div style={{ fontSize: 11, color: tokens['--sc-muted-fg'], marginTop: 4 }}>{l('fileHint')}</div>
      </div>
    </Framed>
  )
}

function SliderPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ fontFamily: tokens['--sc-font'] }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: tokens['--sc-muted-fg'], marginBottom: 6 }}>
          <span>{l('volume')}</span><span>72%</span>
        </div>
        <div style={{ position: 'relative', height: 6, background: tokens['--sc-muted'], borderRadius: 999 }}>
          <div style={{ width: '72%', height: '100%', background: tokens['--sc-primary'], borderRadius: 999 }} />
          <span style={{ position: 'absolute', left: '72%', top: '50%', transform: 'translate(-50%,-50%)', width: 16, height: 16, borderRadius: 999, background: tokens['--sc-primary'], border: `2px solid ${tokens['--sc-fg']}` }} />
        </div>
      </div>
    </Framed>
  )
}

function PopoverPreview({ tokens, l }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontFamily: tokens['--sc-font'] }}>
        <button style={btn(tokens, 'secondary')}>{l('moreInfo')}</button>
        <div style={{ background: tokens['--sc-muted'], border: `1px solid ${tokens['--sc-border']}`, borderRadius: tokens['--sc-radius'], padding: '10px 12px', boxShadow: tokens['--sc-shadow'], fontSize: 12, color: tokens['--sc-fg'], ...glass(tokens) }}>
          {l('popoverBody')}
        </div>
      </div>
    </Framed>
  )
}

function ContextMenuPreview({ tokens, l }: PreviewProps) {
  const item = (text: string) => (
    <div style={{ padding: '7px 12px', fontSize: 12, color: tokens['--sc-fg'], fontFamily: tokens['--sc-font'] }}>{text}</div>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ width: 140, background: tokens['--sc-muted'], border: `1px solid ${tokens['--sc-border']}`, borderRadius: tokens['--sc-radius'], padding: 4, boxShadow: tokens['--sc-shadow'], ...glass(tokens) }}>
        {item(l('copy'))}
        {item(l('paste'))}
        <div style={{ height: 1, background: tokens['--sc-border'], margin: '4px 0' }} />
        {item(l('delete'))}
      </div>
    </Framed>
  )
}

function CarouselPreview({ tokens }: PreviewProps) {
  return (
    <Framed tokens={tokens}>
      <div style={{ position: 'relative', fontFamily: tokens['--sc-font'] }}>
        <div style={{ height: 80, background: tokens['--sc-primary'], opacity: 0.85, borderRadius: tokens['--sc-radius'], display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens['--sc-primary-fg'], fontSize: 14, fontWeight: 600 }}>Slide 2 / 3</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 6, height: 6, borderRadius: 999, background: i === 1 ? tokens['--sc-primary'] : tokens['--sc-border'] }} />
          ))}
        </div>
      </div>
    </Framed>
  )
}

function ChipInputPreview({ tokens, l }: PreviewProps) {
  const chip = (text: string) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: tokens['--sc-muted'], border: `1px solid ${tokens['--sc-border']}`, borderRadius: 999, padding: '3px 8px', fontSize: 11, color: tokens['--sc-fg'], fontFamily: tokens['--sc-font'] }}>
      {text} <span style={{ color: tokens['--sc-muted-fg'] }}>×</span>
    </span>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ ...inputStyle(tokens), display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', minHeight: 38 }}>
        {chip('React')}{chip('Tailwind')}
        <span style={{ fontSize: 12, color: tokens['--sc-muted-fg'] }}>{l('addTag')}</span>
      </div>
    </Framed>
  )
}

function NotificationCenterPreview({ tokens, l }: PreviewProps) {
  const item = (title: string, time: string) => (
    <div style={{ padding: '10px 12px', borderBottom: `1px solid ${tokens['--sc-border']}` }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: tokens['--sc-fg'], fontFamily: tokens['--sc-font'] }}>{title}</div>
      <div style={{ fontSize: 10, color: tokens['--sc-muted-fg'] }}>{time}</div>
    </div>
  )
  return (
    <Framed tokens={tokens}>
      <div style={{ background: tokens['--sc-muted'], border: `1px solid ${tokens['--sc-border']}`, borderRadius: tokens['--sc-radius'], overflow: 'hidden', ...glass(tokens) }}>
        <div style={{ padding: '8px 12px', fontSize: 12, fontWeight: 600, color: tokens['--sc-fg'], borderBottom: `1px solid ${tokens['--sc-border']}` }}>{l('notifications')}</div>
        {item(l('notifStyleApplied'), l('ago2m'))}
        {item(l('notifPromptCopied'), l('ago1h'))}
      </div>
    </Framed>
  )
}

const renderers: Record<string, (props: PreviewProps) => React.ReactElement> = {
  'modal-dialog': ModalPreview,
  'toast-notifications': ToastPreview,
  'table-basic': (props) => (
    <Framed tokens={props.tokens}>
      <ShowcaseTable tokens={props.tokens} />
    </Framed>
  ),
  navbar: (props) => (
    <Framed tokens={props.tokens}>
      <ShowcaseNav tokens={props.tokens} />
    </Framed>
  ),
  'sign-in-form': (props) => (
    <Framed tokens={props.tokens}>
      <ShowcaseForm tokens={props.tokens} />
    </Framed>
  ),
  buttons: ButtonsPreview,
  badges: BadgesPreview,
  'content-card': ContentCardPreview,
  tabs: TabsPreview,
  accordion: AccordionPreview,
  'dropdown-menu': DropdownPreview,
  tooltip: TooltipPreview,
  'avatar-group': AvatarGroupPreview,
  'progress-bar': ProgressPreview,
  'alert-banner': AlertPreview,
  breadcrumb: BreadcrumbPreview,
  pagination: PaginationPreview,
  'toggle-switch': ToggleSwitchPreview,
  stepper: StepperPreview,
  'stat-card': StatCardPreview,
  'empty-state': EmptyStatePreview,
  'icon-button': IconButtonPreview,
  'button-group': ButtonGroupPreview,
  'search-input': SearchInputPreview,
  'text-input': TextInputPreview,
  'select-field': SelectFieldPreview,
  'checkbox-group': CheckboxGroupPreview,
  'radio-group': RadioGroupPreview,
  'textarea-field': TextareaPreview,
  'skeleton-loader': SkeletonPreview,
  spinner: SpinnerPreview,
  'drawer-panel': DrawerPreview,
  'list-view': ListViewPreview,
  timeline: TimelinePreview,
  'rating-stars': RatingPreview,
  sidebar: SidebarPreview,
  'command-palette': CommandPalettePreview,
  'date-picker': DatePickerPreview,
  'file-upload': FileUploadPreview,
  'slider-range': SliderPreview,
  popover: PopoverPreview,
  'context-menu': ContextMenuPreview,
  carousel: CarouselPreview,
  'chip-input': ChipInputPreview,
  'notification-center': NotificationCenterPreview,
}

/** Whether a themed renderer exists for this component id. */
export function hasThemedPreview(id: string): boolean {
  return id in renderers
}

/** Render a component preview using the given design tokens (follows applied style). */
export function ThemedComponentPreview({
  id,
  tokens,
  compact,
  locale,
}: {
  id: string
  tokens: Tokens
  compact?: boolean
  locale: Locale
}) {
  const Renderer = renderers[id]
  if (!Renderer) return null
  const l = (key: PreviewLabelKey) => pl(key, locale)
  return <Renderer tokens={tokens} compact={compact} l={l} />
}
