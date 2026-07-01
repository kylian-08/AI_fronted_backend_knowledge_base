import type { CSSProperties } from 'react'
import { glassSurface } from '@/components/showcase/styleUtils'
import { MotionButton, MotionLift } from '@/components/motion/MotionPrimitives'
import type { MotionPresetKey } from '@/lib/motion/presets'

interface ShowcaseSlotProps {
  tokens: Record<string, string>
  compact?: boolean
  /** Motion personality resolved from the parent style (Phase 1 Motion Layer). */
  preset?: MotionPresetKey
}

export function ShowcaseButton({ tokens, compact, preset }: ShowcaseSlotProps) {
  const glass = glassSurface(tokens)
  return (
    <div className="flex flex-wrap gap-1.5">
      <MotionButton
        preset={preset}
        style={{
          background: tokens['--sc-primary'],
          color: tokens['--sc-primary-fg'],
          border: `1px solid ${tokens['--sc-border']}`,
          borderRadius: tokens['--sc-radius'],
          boxShadow: tokens['--sc-shadow'],
          padding: compact ? '4px 8px' : '8px 16px',
          fontFamily: tokens['--sc-font'],
          fontSize: compact ? '11px' : '14px',
          cursor: 'pointer',
          ...glass,
        }}
      >
        Primary
      </MotionButton>
      {!compact && (
        <MotionButton
          preset={preset}
          style={{
            background: tokens['--sc-muted'],
            color: tokens['--sc-muted-fg'],
            border: `1px solid ${tokens['--sc-border']}`,
            borderRadius: tokens['--sc-radius'],
            boxShadow: tokens['--sc-shadow'],
            padding: '8px 16px',
            fontFamily: tokens['--sc-font'],
            fontSize: '14px',
            cursor: 'pointer',
            ...glass,
          }}
        >
          Secondary
        </MotionButton>
      )}
    </div>
  )
}

export function ShowcaseCard({ tokens, compact, preset }: ShowcaseSlotProps) {
  return (
    <MotionLift preset={preset}>
      <div
        style={{
          background: tokens['--sc-muted'],
          color: tokens['--sc-fg'],
          border: `1px solid ${tokens['--sc-border']}`,
          borderRadius: tokens['--sc-radius'],
          boxShadow: tokens['--sc-shadow'],
          padding: compact ? '8px' : '16px',
          fontFamily: tokens['--sc-font'],
          cursor: 'pointer',
          ...glassSurface(tokens),
        }}
      >
        <h4 style={{ margin: '0 0 2px', fontSize: compact ? '12px' : '16px', fontWeight: 600 }}>Card</h4>
        {!compact && (
          <p style={{ margin: 0, fontSize: '13px', color: tokens['--sc-muted-fg'] }}>
            Unified showcase card — same structure, different style tokens.
          </p>
        )}
      </div>
    </MotionLift>
  )
}

export function ShowcaseNav({ tokens }: ShowcaseSlotProps) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        background: tokens['--sc-muted'],
        border: `1px solid ${tokens['--sc-border']}`,
        borderRadius: tokens['--sc-radius'],
        fontFamily: tokens['--sc-font'],
        ...glassSurface(tokens),
      }}
    >
      <span style={{ fontWeight: 700, color: tokens['--sc-fg'], fontSize: '15px' }}>Brand</span>
      <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
        {['Home', 'Products', 'About'].map((link) => (
          <span key={link} style={{ color: tokens['--sc-muted-fg'], cursor: 'pointer' }}>
            {link}
          </span>
        ))}
      </div>
    </nav>
  )
}

export function ShowcaseForm({ tokens }: ShowcaseSlotProps) {
  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    background: tokens['--sc-bg']?.startsWith('linear') ? tokens['--sc-muted'] : tokens['--sc-bg'],
    border: `1px solid ${tokens['--sc-border']}`,
    borderRadius: tokens['--sc-radius'],
    color: tokens['--sc-fg'],
    fontSize: '13px',
    fontFamily: tokens['--sc-font'],
    boxSizing: 'border-box',
    ...glassSurface(tokens),
  }
  return (
    <div style={{ fontFamily: tokens['--sc-font'] }}>
      <label style={{ display: 'block', marginBottom: '12px' }}>
        <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: tokens['--sc-muted-fg'] }}>
          Email
        </span>
        <input type="email" placeholder="you@example.com" style={inputStyle} readOnly />
      </label>
      <button
        type="button"
        style={{
          width: '100%',
          padding: '8px',
          background: tokens['--sc-primary'],
          color: tokens['--sc-primary-fg'],
          border: `1px solid ${tokens['--sc-border']}`,
          borderRadius: tokens['--sc-radius'],
          boxShadow: tokens['--sc-shadow'],
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          ...glassSurface(tokens),
        }}
      >
        Submit
      </button>
    </div>
  )
}

export function ShowcaseTable({ tokens }: ShowcaseSlotProps) {
  const cellStyle: CSSProperties = {
    padding: '8px 12px',
    fontSize: '13px',
    color: tokens['--sc-fg'],
    borderBottom: `1px solid ${tokens['--sc-border']}`,
    fontFamily: tokens['--sc-font'],
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {['Name', 'Status', 'Count'].map((h) => (
            <th
              key={h}
              style={{ ...cellStyle, color: tokens['--sc-muted-fg'], textAlign: 'left', fontWeight: 500 }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={cellStyle}>Alpha</td>
          <td style={cellStyle}>
            <span
              style={{
                background: tokens['--sc-primary'],
                color: tokens['--sc-primary-fg'],
                padding: '2px 8px',
                borderRadius: tokens['--sc-radius'],
                fontSize: '11px',
                ...glassSurface(tokens),
              }}
            >
              Active
            </span>
          </td>
          <td style={{ ...cellStyle, textAlign: 'right' }}>128</td>
        </tr>
        <tr>
          <td style={cellStyle}>Beta</td>
          <td style={cellStyle}>
            <span style={{ color: tokens['--sc-muted-fg'], fontSize: '11px' }}>Paused</span>
          </td>
          <td style={{ ...cellStyle, textAlign: 'right' }}>42</td>
        </tr>
      </tbody>
    </table>
  )
}
