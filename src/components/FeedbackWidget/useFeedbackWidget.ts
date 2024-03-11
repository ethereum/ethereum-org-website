import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useDisclosure } from "@chakra-ui/react"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useSurvey } from "@/hooks/useSurvey"

export const useFeedbackWidget = () => {
  const { asPath } = useRouter()

  const [isExpanded, setIsExpanded] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const { getButtonProps, isOpen, onClose, onOpen } = useDisclosure()

  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Reset component state when path (asPath) changes
    onClose()
    setFeedbackSubmitted(false)
    setIsExpanded(false)

    let expandTimeout = setTimeout(() => setIsExpanded(true), 30_000)

    return () => clearTimeout(expandTimeout)
  }, [asPath, onClose])

  const surveyUrl = useSurvey(feedbackSubmitted)

  const bottomOffset = useMemo(() => {
    const pathsWithBottomNav = ["/staking", "/dao", "/defi", "/nft"]
    const CONDITIONAL_OFFSET = 6.75
    let offset = 0
    pathsWithBottomNav.forEach((path) => {
      if (asPath.includes(path)) {
        offset = CONDITIONAL_OFFSET
      }
    })
    return offset
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
    bottomOffset,
    cancelRef,
    feedbackSubmitted,
    getButtonProps,
    handleClose,
    handleOpen,
    handleSubmit,
    handleSurveyOpen,
    isExpanded,
    isOpen,
  }
}
