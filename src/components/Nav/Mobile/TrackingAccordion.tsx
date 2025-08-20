"use client"

import { useState } from "react"

import { Lang } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { Accordion } from "./MenuAccordion"

type TrackingAccordionProps = {
  locale: Lang
  children: React.ReactNode
}

export const TrackingAccordion = ({
  locale,
  children,
}: TrackingAccordionProps) => {
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    undefined
  )

  const handleValueChange = (value: string | undefined) => {
    const isExpanded = currentValue === value

    trackCustomEvent({
      eventCategory: "Mobile navigation menu",
      eventAction: "Section changed",
      eventName: `${
        isExpanded ? "Close" : "Open"
      } section: ${locale} - ${value || currentValue}`,
    })

    setCurrentValue(value)
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={currentValue}
      onValueChange={handleValueChange}
    >
      {children}
    </Accordion>
  )
}
