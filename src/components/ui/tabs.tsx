import type { ComponentProps } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export const TabsRoot = Tabs.Root
export const TabsList = ({
  className,
  ...props
}: ComponentProps<typeof Tabs.List>) => (
  <Tabs.List
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className,
    )}
    {...props}
  />
)
export const TabsTrigger = ({
  className,
  ...props
}: ComponentProps<typeof Tabs.Trigger>) => (
  <Tabs.Trigger
    className={cn(
      'inline-flex min-h-[36px] items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className,
    )}
    {...props}
  />
)
export const TabsContent = ({
  className,
  ...props
}: ComponentProps<typeof Tabs.Content>) => (
  <Tabs.Content
    className={cn('mt-2 focus-visible:outline-none', className)}
    {...props}
  />
)
