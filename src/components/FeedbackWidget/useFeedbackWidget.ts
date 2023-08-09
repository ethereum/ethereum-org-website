import { useDisclosure } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { useSurvey } from "../../hooks/useSurvey"
import { trackCustomEvent } from "../../utils/matomo"

export const useFeedbackWidget = ({ location }: { location: string }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false)

  const { getButtonProps, isOpen, onClose, onOpen } = useDisclosure()

  useEffect(() => {
    // Reset component state when path (location) changes
    onClose()
    setFeedbackSubmitted(false)

    let expandTimeout = setTimeout(() => setIsExpanded(true), 30000)

    return () => clearTimeout(expandTimeout)
  }, [location])

  const surveyUrl = useSurvey(feedbackSubmitted)

  const bottomOffset = useMemo(() => {
    const pathsWithBottomNav = ["/staking", "/dao", "/defi", "/nft"]
    const CONDITIONAL_OFFSET = 6.75
    let offset = 0
    pathsWithBottomNav.forEach((path) => {
      if (location.includes(path)) {
        offset = CONDITIONAL_OFFSET
      }
    })
    return offset
  }, [location])

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
  }

  return {
    bottomOffset,
    feedbackSubmitted,
    handleClose,
    handleOpen,
    handleSubmit,
    handleSurveyOpen,
    isExpanded,
    isOpen,
    getButtonProps,
  }
}
