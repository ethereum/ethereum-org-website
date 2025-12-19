import { useMemo } from "react"
import { useLocale } from "next-intl"

import { SITE_URL } from "@/lib/constants"

import { usePathname } from "@/i18n/routing"

export const useSurvey = (feedbackSubmitted: boolean) => {
  const locale = useLocale()
  const pathname = usePathname()
  const { href: url } = new URL(
    `${locale}/${pathname || ""}`.replace(/\/+/g, "/"),
    SITE_URL
  )
  return useMemo((): string | null => {
    if (!feedbackSubmitted) return null
    return `https://ethereumorg.paperform.co//?url=${url}`
  }, [feedbackSubmitted, url])
}
