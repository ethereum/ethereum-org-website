import { useState } from "react"
import type { MotionProps } from "framer-motion"

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
