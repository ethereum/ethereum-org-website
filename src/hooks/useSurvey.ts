import { useMemo } from "react"

const location = typeof window !== "undefined" ? window.location.href : ""

export type Survey = {
  url: string
  prompt: string
}

export const useSurvey = (feedbackSubmitted: boolean) =>
  useMemo((): string | null => {
    if (!feedbackSubmitted) return null
    return `https://iwokuhuz.paperform.co//?url=${location}`
  }, [feedbackSubmitted, location])
