import { useMemo } from "react"

import { SITE_URL } from "@/lib/constants"

import { useRouter } from "@/hooks/useRouter"

export const useSurvey = (feedbackSubmitted: boolean) => {
  const { asPath } = useRouter()
  const { href: url } = new URL(asPath, SITE_URL)
  return useMemo((): string | null => {
    if (!feedbackSubmitted) return null
    return `https://iwokuhuz.paperform.co//?url=${url}`
  }, [feedbackSubmitted, url])
}
