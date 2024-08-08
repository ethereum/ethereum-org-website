import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useDisclosure } from "@/hooks/useDisclosure"
import { useSurvey } from "@/hooks/useSurvey"

export const useFeedbackWidget = () => {
  const { asPath } = useRouter()

  const [isExpanded, setIsExpanded] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const { isOpen, onClose, onOpen } = useDisclosure()

  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Reset component state when path (asPath) changes
    onClose()
    setFeedbackSubmitted(false)
    setIsExpanded(false)

    const expandTimeout = setTimeout(() => setIsExpanded(true), 30_000)

    return () => clearTimeout(expandTimeout)
  }, [asPath, onClose])

  const surveyUrl = useSurvey(feedbackSubmitted)

  const offsetBottom = useMemo(() => {
    const pathsWithBottomNav = ["/staking", "/dao", "/defi", "/nft"]
    let shouldOffset = false
    pathsWithBottomNav.forEach((path) => {
      if (asPath.includes(path)) {
        shouldOffset = true
      }
    })
    return shouldOffset
  }, [asPath])

  const handleClose = (): void => {
    onClose()
    trackCustomEvent({
      eventCategory: `FeedbackWidget toggled`,
      eventAction: `Clicked`,
      eventName: `Closed feedback widget`,
    })
  }

  const handleOpen = (): void => {
    onOpen()
    setIsExpanded(false)
    trackCustomEvent({
      eventCategory: `FeedbackWidget toggled`,
      eventAction: `Clicked`,
      eventName: `Opened feedback widget`,
    })
  }

  const handleSubmit = (choice: boolean): void => {
    trackCustomEvent({
      eventCategory: `Page is helpful feedback`,
      eventAction: `Clicked`,
      eventName: String(choice),
    })
    setFeedbackSubmitted(true)
  }
  const handleSurveyOpen = (): void => {
    trackCustomEvent({
      eventCategory: `Feedback survey opened`,
      eventAction: `Clicked`,
      eventName: "Feedback survey opened",
    })
    window && surveyUrl && window.open(surveyUrl, "_blank")
    onClose() // Close widget without triggering redundant tracker event
    setIsExpanded(false)
  }

  return {
    offsetBottom,
    cancelRef,
    feedbackSubmitted,
    handleClose,
    handleOpen,
    handleSubmit,
    handleSurveyOpen,
    isExpanded,
    isOpen,
  }
}
