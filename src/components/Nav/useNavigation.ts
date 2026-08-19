import { useLocale, useTranslations } from "next-intl"

import { DEFAULT_LOCALE } from "@/lib/constants"

import type { NavSections } from "./types"

import { useClientExperiment } from "@/hooks/useClientExperiment"
import {
  NAV_LABELS_EXPERIMENT,
  NAV_LABELS_VARIANT,
} from "@/lib/ab-testing/client-experiment"
import { buildNavigation } from "@/lib/nav/buildNavigation"

export const useNavigation = () => {
  const t = useTranslations("common")
  const locale = useLocale()

  // Matomo experiment 19 (NavLabels2026): do more visitors open these two
  // sections when the labels are concrete words? Labels only - the sections
  // keep their items, their order, and their English section keys, so both arms
  // emit identical nav events and stay comparable.
  const { variant } = useClientExperiment(NAV_LABELS_EXPERIMENT, {
    enabled: locale === DEFAULT_LOCALE,
  })

  const linkSections: NavSections = buildNavigation(t)

  if (variant === NAV_LABELS_VARIANT) {
    linkSections.participate.label = t("nav-ab-community")
    linkSections.participate.ariaLabel = t("nav-ab-community-menu")
    linkSections.research.label = t("nav-ab-roadmap")
    linkSections.research.ariaLabel = t("nav-ab-roadmap-menu")
  }

  return { linkSections }
}
