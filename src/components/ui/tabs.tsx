"use client"

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
      "eth-inline-flex eth-h-10 eth-items-center eth-justify-center eth-rounded-md eth-bg-muted eth-p-1 eth-text-muted-foreground",
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
      "eth-inline-flex eth-items-center eth-justify-center eth-whitespace-nowrap eth-rounded-sm eth-px-3 eth-py-1.5 eth-text-sm eth-font-medium eth-ring-offset-background eth-transition-all focus-visible:eth-outline-none focus-visible:eth-ring-2 focus-visible:eth-ring-ring focus-visible:eth-ring-offset-2 disabled:eth-pointer-events-none disabled:eth-opacity-50 data-[state=active]:eth-bg-background data-[state=active]:eth-text-foreground data-[state=active]:eth-shadow-sm",
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
      "eth-mt-2 eth-ring-offset-background focus-visible:eth-outline-none focus-visible:eth-ring-2 focus-visible:eth-ring-ring focus-visible:eth-ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent,TabsList, TabsTrigger }
