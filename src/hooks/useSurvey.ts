import path from "path"

import { useMemo } from "react"
import { useLocale } from "next-intl"

import type { Lang } from "@/lib/types"

import { SITE_URL } from "@/lib/constants"

import { usePathname } from "@/i18n/routing"

export const useSurvey = (feedbackSubmitted: boolean) => {
  const locale = useLocale()
  const pathname = usePathname()
  const { href: url } = new URL(
    path.join(locale! as Lang, pathname || ""),
    SITE_URL
  )
  return useMemo((): string | null => {
    if (!feedbackSubmitted) return null
    return `https://ethereumorg.paperform.co//?url=${url}`
  }, [feedbackSubmitted, url])
}
