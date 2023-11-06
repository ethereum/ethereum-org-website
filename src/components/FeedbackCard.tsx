import React, { ReactNode, useState } from "react"
import { useRouter } from "next/router"
import { Flex, FlexProps, Heading } from "@chakra-ui/react"
import { useTranslation } from "next-i18next"

import { Button } from "./Buttons"
import { FeedbackThumbsUpIcon } from "./icons"

// TODO: add trackCustomEvent when util is migrated
// import { trackCustomEvent } from "../utils/matomo"

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
  const { t } = useTranslation("common")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  // const surveyUrl = useSurvey(feedbackSubmitted)
  const { asPath } = useRouter()

  const isTutorial = asPath?.includes("tutorials")

  const getTitle = (feedbackSubmitted: boolean): ReactNode => {
    if (!feedbackSubmitted) {
      if (prompt) return prompt

      if (isTutorial) return t("feedback-card-prompt-tutorial")
      if (isArticle) return t("feedback-card-prompt-article")

      return t("feedback-card-prompt-page")
    }

    return t("feedback-widget-thank-you-title")
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
            {t("feedback-widget-thank-you-subtitle")}{" "}
            {t("feedback-widget-thank-you-subtitle-ext")}{" "}
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
                {t("yes")}
              </Button>
              <Button
                variant="outline-color"
                leftIcon={<FeedbackThumbsUpIcon transform="scaleY(-1)" />}
                onClick={() => handleSubmit(false)}
              >
                {t("no")}
              </Button>
            </>
          ) : (
            <Button variant="outline-color" onClick={handleSurveyOpen}>
              {t("feedback-widget-thank-you-cta")}
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FeedbackCard
