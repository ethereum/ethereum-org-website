"use client"

import { createContext, type ReactNode, useContext } from "react"
import {
  BookOpen,
  Building2,
  Code,
  type LucideIcon,
  Route,
  Users,
  Wallet,
} from "lucide-react"
import { useTranslations } from "next-intl"

import type { NavSectionKey, NavSections } from "./types"

import { buildNavigation } from "@/lib/nav/buildNavigation"

export const NAV_SECTION_ICONS: Record<NavSectionKey, LucideIcon> = {
  learn: BookOpen,
  use: Wallet,
  build: Code,
  roadmap: Route,
  community: Users,
  organizations: Building2,
}

const NextUpgradeContext = createContext<string | undefined>(undefined)

/** Hands the server-resolved next upgrade (`getNextUpgradeSlug`) to the client menus */
export const NavigationProvider = ({
  nextUpgradeSlug,
  children,
}: {
  nextUpgradeSlug?: string
  children: ReactNode
}) => (
  <NextUpgradeContext.Provider value={nextUpgradeSlug}>
    {children}
  </NextUpgradeContext.Provider>
)

export const useNavigation = () => {
  const t = useTranslations("common")
  const nextUpgradeSlug = useContext(NextUpgradeContext)

  const linkSections: NavSections = buildNavigation(t, nextUpgradeSlug)

  return { linkSections }
}
