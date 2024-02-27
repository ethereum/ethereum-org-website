import { useMemo } from "react"
import { useRouter } from "next/router"

import { SITE_URL } from "@/lib/constants"

export const useSurvey = (feedbackSubmitted: boolean) => {
  const { asPath } = useRouter()
  const { href: url } = new URL(asPath, SITE_URL)
  return useMemo((): string | null => {
    if (!feedbackSubmitted) return null
    return `https://iwokuhuz.paperform.co//?url=${url}`
  }, [feedbackSubmitted, url])
}
