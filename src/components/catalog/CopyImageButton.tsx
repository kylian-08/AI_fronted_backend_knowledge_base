import { useState } from 'react'
import { Check, Image as ImageIcon, Download } from 'lucide-react'
import type { StyleItem } from '@/types/catalog'
import { Button } from '@/components/ui/button'
import { copyStyleReferenceImage, downloadStyleReferenceImage } from '@/lib/stylePoster'
import { cn } from '@/lib/utils'

interface CopyImageButtonProps {
  style: StyleItem
  label: string
  copiedLabel: string
  className?: string
}

export function CopyImageButton({ style, label, copiedLabel, className }: CopyImageButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const ok = await copyStyleReferenceImage(style)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      await downloadStyleReferenceImage(style)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={cn('gap-2', className)}
      aria-label={label}
    >
      {copied ? <Check className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
      {copied ? copiedLabel : label}
    </Button>
  )
}

export function DownloadImageButton({ style, label, className }: { style: StyleItem; label: string; className?: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => void downloadStyleReferenceImage(style)}
      className={cn('gap-2', className)}
      aria-label={label}
    >
      <Download className="h-4 w-4" />
      {label}
    </Button>
  )
}
