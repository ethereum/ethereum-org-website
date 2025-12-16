import type { NavSections } from "./types"

import useTranslation from "@/hooks/useTranslation"
import { buildNavigation } from "@/lib/nav/buildNavigation"

export const useNavigation = () => {
  const { t } = useTranslation("common")

  const linkSections: NavSections = buildNavigation(t)

  return { linkSections }
}
