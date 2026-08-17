import { useEffect, useRef, useState } from "react"
import type { MotionProps } from "motion/react"
import { useLocale } from "next-intl"

import { isModified } from "@/lib/utils/keyboard"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { MAIN_NAV_ID, SECTION_LABELS } from "@/lib/constants"

import type { NavSectionKey, NavSections } from "../types"

import { useEventListener } from "@/hooks/useEventListener"
import { useRtlFlip } from "@/hooks/useRtlFlip"

// How long the pointer must rest on a section before the open is reported.
// The menu opens on hover, so a sweep across the bar would otherwise report
// every section it passed over.
const OPEN_DWELL_MS = 300

export const useNavMenu = (sections: NavSections) => {
  const { direction } = useRtlFlip()
  const locale = useLocale()
  const [activeSection, setActiveSection] = useState<NavSectionKey | null>(null)
  const dwellTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (dwellTimer.current) clearTimeout(dwellTimer.current)
    },
    []
  )

  // Focus corresponding nav section when number keys pressed
  useEventListener("keydown", (event) => {
    if (!document || !event.key.match(/^[1-9]$/) || isModified(event)) return
    if (event.target instanceof HTMLInputElement) return
    if (event.target instanceof HTMLTextAreaElement) return
    if (event.target instanceof HTMLSelectElement) return

    const sectionIdx = parseInt(event.key) - 1
    if (sectionIdx >= SECTION_LABELS.length) return

    const button = document.querySelector(
      `#${MAIN_NAV_ID} li:nth-of-type(${sectionIdx + 1}) button`
    )
    if (!button) return

    event.preventDefault()
    ;(button as HTMLButtonElement).focus()
  })

  const getEnglishSectionName = (
    activeSection: string
  ): NavSectionKey | null => {
    const index = Object.values(sections).findIndex(
      (section) => section.label === activeSection
    )
    if (index < 0) return null
    return Object.keys(sections)[index] as NavSectionKey
  }

  const handleSectionChange = (activeSection: string) => {
    const sectionKey = getEnglishSectionName(activeSection)
    setActiveSection(sectionKey)

    // Moving on cancels the pending open, so only the section the pointer
    // settles on is reported. Radix clears the value on close.
    if (dwellTimer.current) clearTimeout(dwellTimer.current)
    if (!sectionKey) return

    dwellTimer.current = setTimeout(() => {
      trackCustomEvent({
        eventCategory: "Desktop navigation menu",
        eventAction: "Section changed",
        eventName: `Open section: ${locale} - ${sectionKey}`,
      })
    }, OPEN_DWELL_MS)
  }

  const isOpen = activeSection !== null

  const onClose = () => {
    setActiveSection(null)
  }

  const containerVariants: MotionProps["variants"] = {
    open: {
      opacity: 1,
      maxHeight: "100vh",
      transition: { duration: 0.2 },
    },
    closed: {
      opacity: 0,
    },
  }

  return {
    activeSection,
    containerVariants,
    direction,
    handleSectionChange,
    isOpen,
    onClose,
  }
}
