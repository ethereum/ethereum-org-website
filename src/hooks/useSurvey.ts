import { useMemo } from "react"
import { useRouter } from "next/router"

import { SITE_URL } from "@/lib/constants"

export const useSurvey = (feedbackSubmitted: boolean) => {
  const { asPath } = useRouter()
  const url = SITE_URL + asPath
  return useMemo((): string | null => {
    if (!feedbackSubmitted) return null
    return `https://iwokuhuz.paperform.co//?url=${url}`
  }, [feedbackSubmitted, url])
}
