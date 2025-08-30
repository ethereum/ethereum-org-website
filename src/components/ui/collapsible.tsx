"use client"

import { PropsWithChildren, useCallback } from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

import { trackCustomEvent } from "@/lib/utils/matomo"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

type CollapsibleTrackedProps = PropsWithChildren<{
  className?: string
  eventCategory: string
  eventAction: string
  openEventName: string
  closeEventName: string
}>

const CollapsibleTracked = ({
  className,
  children,
  eventCategory,
  eventAction,
  openEventName,
  closeEventName,
}: CollapsibleTrackedProps) => {
  const handleOpenChange = useCallback(
    (open: boolean) => {
      trackCustomEvent({
        eventCategory,
        eventAction,
        eventName: open ? openEventName : closeEventName,
      })
    },
    [eventCategory, eventAction, openEventName, closeEventName]
  )

  return (
    <Collapsible className={className} onOpenChange={handleOpenChange}>
      {children}
    </Collapsible>
  )
}

export {
  Collapsible,
  CollapsibleContent,
  CollapsibleTracked,
  CollapsibleTrigger,
}
