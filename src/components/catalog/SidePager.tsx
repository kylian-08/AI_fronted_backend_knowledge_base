import { useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Page with the keyboard Left/Right arrows (ignored while typing in inputs). */
export function usePageKeys(page: number, totalPages: number, setPage: (p: number) => void) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement as HTMLElement | null
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'ArrowLeft' && page > 1) {
        e.preventDefault()
        setPage(page - 1)
      } else if (e.key === 'ArrowRight' && page < totalPages) {
        e.preventDefault()
        setPage(page + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [page, totalPages, setPage])
}

interface SidePagerProps {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

const btnBase =
  'fixed top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-lg backdrop-blur transition hover:bg-accent disabled:pointer-events-none disabled:opacity-25 lg:flex'

/** Floating prev/next buttons docked in the side gutters (lg+ only). */
export function SidePager({ page, totalPages, onPageChange }: SidePagerProps) {
  if (totalPages <= 1) return null
  return (
    <>
      <button
        type="button"
        className={cn(btnBase, 'left-[15rem]')}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page (Left arrow)"
        title="← 上一页"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        className={cn(btnBase, 'right-4')}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page (Right arrow)"
        title="→ 下一页"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </>
  )
}
