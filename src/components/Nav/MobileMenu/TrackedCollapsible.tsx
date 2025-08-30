"use client"

import { PropsWithChildren, useCallback } from "react"

import { Collapsible } from "@/components/ui/collapsible"

import { trackCustomEvent } from "@/lib/utils/matomo"

type TrackedCollapsibleProps = PropsWithChildren<{
  className?: string
  eventCategory: string
  eventAction: string
  openEventName: string
  closeEventName: string
}>

export default function TrackedCollapsible({
  className,
  children,
  eventCategory,
  eventAction,
  openEventName,
  closeEventName,
}: TrackedCollapsibleProps) {
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
