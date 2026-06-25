import { useRef } from 'react'
import { Upload, Download, FileJson } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/contexts/AppContext'

const TEMPLATE = {
  version: '1.0',
  styles: [
    {
      id: 'my-custom-style',
      slug: 'my-custom-style',
      title: { 'zh-CN': '我的风格', 'en-US': 'My Style' },
      description: { 'zh-CN': '风格描述', 'en-US': 'Style description' },
      tags: ['custom'],
      category: 'imported',
      tokens: {
        '--sc-bg': '#0f172a',
        '--sc-bg-fallback': '#0f172a',
        '--sc-fg': '#f8fafc',
        '--sc-primary': '#6366f1',
        '--sc-primary-fg': '#ffffff',
        '--sc-muted': '#1e293b',
        '--sc-muted-fg': '#94a3b8',
        '--sc-border': '#334155',
        '--sc-radius': '12px',
        '--sc-shadow': '0 4px 12px rgba(0,0,0,0.3)',
        '--sc-font': 'system-ui, sans-serif',
        '--sc-backdrop': 'blur(0px)',
      },
      prompt: {
        'zh-CN': '在这里写详细的风格提示词……',
        'en-US': 'Write a detailed style prompt here...',
      },
      referenceImage: 'data:image/png;base64,<可选：参考图的 base64 或 https 链接>',
    },
  ],
}

export function StyleImportPanel() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { importStyles, exportStyles, t } = useApp()

  function handleFile(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string)
        const result = importStyles(json)
        if (result.ok) {
          alert(t('styles.import.ok', { n: result.count }))
        } else {
          alert(`${t('styles.import.fail')}: ${result.error ?? ''}`)
        }
      } catch {
        alert(t('styles.import.fail'))
      }
    }
    reader.readAsText(file)
  }

  function downloadJson(data: unknown, name: string) {
    const blob = new Blob([typeof data === 'string' ? data : JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex flex-wrap gap-2">
        <input
          ref={inputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
            e.target.value = ''
          }}
        />
        <Button variant="default" size="sm" className="gap-2" onClick={() => inputRef.current?.click()}>
          <Upload className="h-4 w-4" />
          {t('styles.import')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => downloadJson(TEMPLATE, 'style-template.json')}
        >
          <FileJson className="h-4 w-4" />
          {t('styles.template')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => downloadJson(exportStyles(), 'imported-styles.json')}
        >
          <Download className="h-4 w-4" />
          {t('styles.export')}
        </Button>
      </div>
      <p className="max-w-xs text-right text-[11px] text-muted-foreground">{t('styles.importHint')}</p>
    </div>
  )
}
