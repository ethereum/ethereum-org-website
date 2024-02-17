import { useState } from "react"

import type { NavSectionKey, NavSections } from "../types"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"
import { useRtlFlip } from "@/hooks/useRtlFlip"

export const useNavMenu = (sections: NavSections) => {
  const { direction } = useRtlFlip()
  const menuColors = useNavMenuColors()
  const [activeSection, setActiveSection] = useState<NavSectionKey | null>(null)

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

  return {
    direction,
    menuColors,
    activeSection,
    handleSectionChange,
  }
}
