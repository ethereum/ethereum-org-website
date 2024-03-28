import { useState } from "react"
import type { MotionProps } from "framer-motion"
import { useEventListener } from "@chakra-ui/react"

import { MAIN_NAV_ID, SECTION_LABELS } from "@/lib/constants"

import type { NavSectionKey, NavSections } from "../types"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"
import { useRtlFlip } from "@/hooks/useRtlFlip"

export const useNavMenu = (sections: NavSections) => {
  const { direction } = useRtlFlip()
  const menuColors = useNavMenuColors()
  const [activeSection, setActiveSection] = useState<NavSectionKey | null>(null)

  // Focus corresponding nav section when number keys pressed
  useEventListener("keydown", (event) => {
    if (!document || !event.key.match(/[1-9]/)) return
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
    setActiveSection(getEnglishSectionName(activeSection))
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
    menuColors,
    onClose,
  }
}
