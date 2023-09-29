// Library imports
import React, { ReactNode, useState } from "react"
import { Flex, FlexProps, Heading } from "@chakra-ui/react"
// Component imports
import { Button } from "./Buttons"
// TODO: add Translation when i18n is set up
// import Translation from "./Translation"
// SVG imports
import { FeedbackThumbsUpIcon } from "./icons"
// Utility imports
// TODO: add trackCustomEvent when util is migrated
// import { trackCustomEvent } from "../utils/matomo"
// Hook imports
// TODO: add useSurvey after hook is migrated
// import { useSurvey } from "../hooks/useSurvey"

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
  // const surveyUrl = useSurvey(feedbackSubmitted)

  const location = typeof window !== "undefined" ? window.location.href : ""
  const isTutorial = location.includes("tutorials")

  const getTitle = (feedbackSubmitted: boolean): ReactNode => {
    if (!feedbackSubmitted) {
      if (prompt) return prompt
      // TODO: add Translation when i18n is set up
      // if (isTutorial) return <Translation id="feedback-card-prompt-tutorial" />
      // if (isArticle) return <Translation id="feedback-card-prompt-article" />
      // return <Translation id="feedback-card-prompt-page" />

      if (isTutorial) return "Was this tutorial helpful?"
      if (isArticle) return "Was this article helpful?"
      return "Was this page helpful?"
    }

    // TODO: add Translation when i18n is set up
    // return <Translation id="feedback-widget-thank-you-title" />
    return "Thank you for your feedback!"
  }

  const handleSubmit = (choice: boolean): void => {
    // TODO: add trackCustomEvent when util is migrated
    // trackCustomEvent({
    //   eventCategory: `Page is helpful feedback`,
    //   eventAction: `Clicked`,
    //   eventName: String(choice),
    // })
    setFeedbackSubmitted(true)
  }
  const handleSurveyOpen = (): void => {
    // TODO: add trackCustomEvent when util is migrated
    // trackCustomEvent({
    //   eventCategory: `Feedback survey opened`,
    //   eventAction: `Clicked`,
    //   eventName: "Feedback survey opened",
    // })
    // window && surveyUrl && window.open(surveyUrl, "_blank")
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
            {/* TODO: add Translation when i18n is set up */}
            Make this page even better by answering a few questions.
            {/* <Translation id="feedback-widget-thank-you-subtitle" />{" "} */}
            {/* <Translation id="feedback-widget-thank-you-subtitle-ext" /> */}
            If you need help, you can reach out to the community on our{" "}
            <a href="https://discord.gg/rZz26QWfCg\" target="_blank\">
              Discord
            </a>
            .
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
                {/* TODO: add Translation when i18n is set up */}
                {/* <Translation id="yes" /> */}
                Yes
              </Button>
              <Button
                variant="outline-color"
                leftIcon={<FeedbackThumbsUpIcon transform="scaleY(-1)" />}
                onClick={() => handleSubmit(false)}
              >
                {/* TODO: add Translation when i18n is set up */}
                {/* <Translation id="no" /> */}
                No
              </Button>
            </>
          ) : (
            <Button variant="outline-color" onClick={handleSurveyOpen}>
              {/* TODO: add Translation when i18n is set up */}
              {/* <Translation id="feedback-widget-thank-you-cta" /> */}
              Open short survey
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FeedbackCard
