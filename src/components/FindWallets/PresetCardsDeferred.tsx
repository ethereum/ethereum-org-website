"use client"

import PresetCards from "./PresetCards"
import type { WalletPersonaConfig } from "./types"

import { useIsClient } from "@/hooks/useIsClient"

// Presets render server-side but their tap handlers only attach on hydration —
// a tap in that window is silently dropped, which reads as "nothing happened".
// Rather than show controls that look ready before they are, we mirror the
// sidebar's contract: render a same-height skeleton until this island has
// hydrated, then swap in the interactive cards. Appearance = interactive.
// useIsClient is false on the server and the first client render (so no
// hydration mismatch) and flips true once this component's effect runs, i.e.
// once its handlers are attached.
const PresetCardsDeferred = ({
  personas,
  legend,
}: {
  personas: WalletPersonaConfig[]
  legend: string
}) => {
  const isClient = useIsClient()

  if (!isClient) {
    // Reserves the same vertical space as the real cards to avoid pushing the
    // wallet list down when they mount (CLS).
    return (
      <div
        aria-hidden="true"
        className="grid auto-cols-[200px] grid-flow-col gap-4 overflow-hidden px-4 lg:auto-cols-fr lg:pb-11"
      >
        {personas.map((_, idx) => (
          <div
            key={idx}
            className="h-[164px] w-full animate-pulse rounded-base border border-primary-low-contrast bg-background-highlight lg:h-full"
          />
        ))}
      </div>
    )
  }

  return <PresetCards personas={personas} legend={legend} />
}

export default PresetCardsDeferred
