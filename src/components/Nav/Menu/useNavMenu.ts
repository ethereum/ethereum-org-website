import { useRef, useState } from "react"
import type { MotionProps } from "motion/react"
import { useLocale } from "next-intl"

import { isModified } from "@/lib/utils/keyboard"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { MAIN_NAV_ID, SECTION_LABELS } from "@/lib/constants"

import type { NavSectionKey, NavSections } from "../types"

import { useEventListener } from "@/hooks/useEventListener"
import { useRtlFlip } from "@/hooks/useRtlFlip"

export const useNavMenu = (sections: NavSections) => {
  const { direction } = useRtlFlip()
  const locale = useLocale()
  const [activeSection, setActiveSection] = useState<NavSectionKey | null>(null)
  // Sections already reported this session. Nav lives in the persistent layout,
  // so this survives client-side navigation and resets only on a full page load
  const trackedSections = useRef(new Set<NavSectionKey>())

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

    // Radix clears the value on close; only opens are counted. Hover opens the
    // menu, so a section is reported once and then muted for the rest of the
    // session -- a mouse sweep across the bar can't inflate the count.
    if (!sectionKey || trackedSections.current.has(sectionKey)) return
    trackedSections.current.add(sectionKey)

    trackCustomEvent({
      eventCategory: "Desktop navigation menu",
      eventAction: "Section changed",
      eventName: `Open section: ${locale} - ${sectionKey}`,
    })
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
