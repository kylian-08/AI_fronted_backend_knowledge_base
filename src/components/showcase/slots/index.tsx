import type { CSSProperties } from 'react'

interface ShowcaseSlotProps {
  tokens: Record<string, string>
}

export function ShowcaseButton({ tokens }: ShowcaseSlotProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        style={{
          background: tokens['--sc-primary'],
          color: tokens['--sc-primary-fg'],
          border: `2px solid ${tokens['--sc-border']}`,
          borderRadius: tokens['--sc-radius'],
          boxShadow: tokens['--sc-shadow'],
          padding: '8px 16px',
          fontFamily: tokens['--sc-font'],
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        Primary
      </button>
      <button
        type="button"
        style={{
          background: tokens['--sc-muted'],
          color: tokens['--sc-muted-fg'],
          border: `2px solid ${tokens['--sc-border']}`,
          borderRadius: tokens['--sc-radius'],
          boxShadow: tokens['--sc-shadow'],
          padding: '8px 16px',
          fontFamily: tokens['--sc-font'],
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        Secondary
      </button>
    </div>
  )
}

export function ShowcaseCard({ tokens }: ShowcaseSlotProps) {
  return (
    <div
      style={{
        background: tokens['--sc-muted'],
        color: tokens['--sc-fg'],
        border: `1px solid ${tokens['--sc-border']}`,
        borderRadius: tokens['--sc-radius'],
        boxShadow: tokens['--sc-shadow'],
        padding: '16px',
        fontFamily: tokens['--sc-font'],
        backdropFilter: tokens['--sc-backdrop'],
      }}
    >
      <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 600 }}>Card Title</h4>
      <p style={{ margin: 0, fontSize: '13px', color: tokens['--sc-muted-fg'] }}>
        Unified showcase card — same structure, different style tokens.
      </p>
    </div>
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
        backdropFilter: tokens['--sc-backdrop'],
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
          border: `2px solid ${tokens['--sc-border']}`,
          borderRadius: tokens['--sc-radius'],
          boxShadow: tokens['--sc-shadow'],
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
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
