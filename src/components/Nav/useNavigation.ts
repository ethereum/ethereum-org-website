import { useTranslations } from "next-intl"

import type { NavSections } from "./types"

import { buildNavigation } from "@/lib/nav/buildNavigation"

export const useNavigation = () => {
  const t = useTranslations("common")

  const linkSections: NavSections = buildNavigation(t)

  return { linkSections }
}
