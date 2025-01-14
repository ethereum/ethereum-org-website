import path from "path"

import { useMemo } from "react"
import { useRouter } from "next/router"

import type { Lang } from "@/lib/types"

import { SITE_URL } from "@/lib/constants"

export const useSurvey = (feedbackSubmitted: boolean) => {
  const { asPath, locale } = useRouter()
  const { href: url } = new URL(path.join(locale! as Lang, asPath), SITE_URL)
  return useMemo((): string | null => {
    if (!feedbackSubmitted) return null
    return `https://ethereumorg.paperform.co//?url=${url}`
  }, [feedbackSubmitted, url])
}
