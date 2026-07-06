"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/buttons/Button"

import { trackCustomEvent } from "@/lib/utils/matomo"

const NoResults = ({
  title,
  description,
  resetLabel,
  resetFilters,
}: {
  title: string
  description: string
  resetLabel: string
  resetFilters: () => void
}) => {
  // Track empty state
  useEffect(() => {
    trackCustomEvent({
      eventCategory: "Wallet_empty_state",
      eventAction: "reset",
      eventName: "triggered",
    })
  }, [])

  const handleClick = () => {
    resetFilters()
    trackCustomEvent({
      eventCategory: "Wallet_empty_state",
      eventAction: "reset",
      eventName: "reset_button_clicked",
    })
  }

  return (
    <div className="border-2 border-dashed border-body-light lg:m-24">
      <div className="p-12">
        <h3 className="mb-6 text-3xl font-normal">{title}</h3>
        <p>{description}</p>
        <Button variant="ghost" onClick={handleClick}>
          <p>{resetLabel}</p>
        </Button>
      </div>
    </div>
  )
}

export default NoResults
