import { useMemo } from "react"

const location = typeof window !== "undefined" ? window.location.href : ""

export type Survey = {
  url: string
  prompt: string
}

export const useSurvey = (
  feedbackSubmitted: boolean,
  isHelpful: boolean | null
) =>
  useMemo((): string | null => {
    if (!feedbackSubmitted) return null
    const [YES, NO] = ["yes", "no"]
    const surveyUrls = {
      __default: {
        [YES]: `https://czvgzauj.paperform.co/?url=${location}`,
        [NO]: `https://xlljh5l3.paperform.co/?url=${location}`,
      },
      staking: {
        [YES]: `https://gzmn3wgk.paperform.co/?url=${location}`,
        [NO]: `https://zlj83p6l.paperform.co/?url=${location}`,
      },
      "find-wallet": {
        [YES]: "https://wsf1ubwu.paperform.co",
        [NO]: "https://wsf1ubwu.paperform.co,",
      },
    }
    let url = surveyUrls.__default[isHelpful ? YES : NO]
    Object.keys(surveyUrls).forEach((key) => {
      if (location.includes(key)) {
        url = surveyUrls[key][isHelpful ? YES : NO]
      }
    })
    return url
  }, [feedbackSubmitted, isHelpful, location])
