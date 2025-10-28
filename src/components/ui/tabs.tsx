import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils/cn"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex w-full max-w-fit gap-1 overflow-x-auto rounded-2xl bg-background !p-0.5 shadow md:border md:shadow-lg lg:w-auto",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative isolate inline-flex flex-shrink-0 items-center justify-center gap-2.5",
      "text-nowrap rounded-[14px] px-4 py-2 text-sm [&_svg]:shrink-0 [&_svg]:text-sm",
      "before:absolute before:inset-0 before:-z-10 before:rounded-[14px]",
      "data-[state=active]:!text-primary data-[state=active]:before:bg-primary-low-contrast",
      "ring-offset-background focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-2 focus-visible:outline-primary-hover disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 rounded-lg border p-6 ring-offset-background focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
