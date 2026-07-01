import { useRef } from 'react'
import { Upload, Download, FileJson } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/contexts/AppContext'

const TEMPLATE = {
  version: '1.0',
  components: [
    {
      id: 'my-custom-button',
      slug: 'my-custom-button',
      title: { 'zh-CN': '我的按钮', 'en-US': 'My Button' },
      description: { 'zh-CN': '组件描述', 'en-US': 'Component description' },
      tags: ['button', 'custom'],
      category: 'actions',
      stack: ['React', 'Tailwind CSS'],
      previewType: 'html',
      previewSource: '',
      states: ['default', 'hover', 'disabled'],
      prompt: {
        'zh-CN': '在这里写详细的组件生成提示词……',
        'en-US': 'Write a detailed component prompt here...',
      },
    },
  ],
}

export function ComponentImportPanel() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { importComponents, exportComponents, t } = useApp()

  function handleFile(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string)
        const result = importComponents(json)
        if (result.ok) {
          alert(t('components.import.ok', { n: result.count }))
        } else {
          alert(`${t('components.import.fail')}: ${result.error ?? ''}`)
        }
      } catch {
        alert(t('components.import.fail'))
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
          {t('components.import')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => downloadJson(TEMPLATE, 'component-template.json')}
        >
          <FileJson className="h-4 w-4" />
          {t('components.template')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => downloadJson(exportComponents(), 'imported-components.json')}
        >
          <Download className="h-4 w-4" />
          {t('components.export')}
        </Button>
      </div>
      <p className="max-w-xs text-right text-[11px] text-muted-foreground">{t('components.importHint')}</p>
    </div>
  )
}
