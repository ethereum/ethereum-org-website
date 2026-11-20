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

export const useNavigation = () => {
  const t = useTranslations("common")

  const linkSections: NavSections = buildNavigation(t)

  return { linkSections }
}
