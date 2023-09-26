// Library imports
import React, { ReactNode, useState } from "react"
import { Flex, FlexProps, Heading } from "@chakra-ui/react"
// Component imports
import { Button } from "./Buttons"
import Translation from "./Translation"
// SVG imports
import { FeedbackThumbsUpIcon } from "./icons"
// Utility imports
import { trackCustomEvent } from "../utils/matomo"
// Hook imports
import { useSurvey } from "../hooks/useSurvey"

export interface IProps extends FlexProps {
  prompt?: string
  isArticle?: boolean
}

const FeedbackCard: React.FC<IProps> = ({
  prompt,
  isArticle = false,
  ...props
}) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const surveyUrl = useSurvey(feedbackSubmitted)

  const location = typeof window !== "undefined" ? window.location.href : ""
  const isTutorial = location.includes("tutorials")

  const getTitle = (feedbackSubmitted: boolean): ReactNode => {
    if (!feedbackSubmitted) {
      if (prompt) return prompt
      if (isTutorial) return <Translation id="feedback-card-prompt-tutorial" />
      if (isArticle) return <Translation id="feedback-card-prompt-article" />
      return <Translation id="feedback-card-prompt-page" />
    }
    return <Translation id="feedback-widget-thank-you-title" />
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
  }
  return (
    <Flex
      border="1px"
      borderColor="border"
      bg="feedbackGradient"
      borderRadius="base"
      p={6}
      direction="column"
      mb={4}
      mt={8}
      w="full"
      {...props}
    >
      <Flex direction="column" gap={4}>
        <Heading as="h3" m={0} mb={2} fontSize="1.375rem" fontWeight="bold">
          {getTitle(feedbackSubmitted)}
        </Heading>
        {feedbackSubmitted && (
          <p>
            <Translation id="feedback-widget-thank-you-subtitle" />{" "}
            <Translation id="feedback-widget-thank-you-subtitle-ext" />
          </p>
        )}
        <Flex gap={4}>
          {!feedbackSubmitted ? (
            <>
              <Button
                variant="outline-color"
                leftIcon={<FeedbackThumbsUpIcon />}
                onClick={() => handleSubmit(true)}
              >
                <Translation id="yes" />
              </Button>
              <Button
                variant="outline-color"
                leftIcon={<FeedbackThumbsUpIcon transform="scaleY(-1)" />}
                onClick={() => handleSubmit(false)}
              >
                <Translation id="no" />
              </Button>
            </>
          ) : (
            <Button variant="outline-color" onClick={handleSurveyOpen}>
              <Translation id="feedback-widget-thank-you-cta" />
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FeedbackCard
