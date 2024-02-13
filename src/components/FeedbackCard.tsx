import { type ReactNode, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Flex, type FlexProps, Heading } from "@chakra-ui/react"

import type { Lang } from "@/lib/types"

import { Button } from "@/components/Buttons"
import { FeedbackThumbsUpIcon } from "@/components/icons"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { isLangRightToLeft } from "@/lib/utils/translations"

import Translation from "./Translation"

import { useSurvey } from "@/hooks/useSurvey"

type FeedbackCardProps = FlexProps & {
  prompt?: string
  isArticle?: boolean
}

const FeedbackCard = ({ prompt, isArticle, ...props }: FeedbackCardProps) => {
  const { t } = useTranslation("common")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const surveyUrl = useSurvey(feedbackSubmitted)
  const { locale, asPath } = useRouter()
  const dir = isLangRightToLeft(locale! as Lang) ? "rtl" : "ltr"

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
      p="6"
      direction="column"
      mb="4"
      mt="8"
      w="full"
      {...props}
      dir={dir}
    >
      <Flex direction="column" gap="4">
        <Heading as="h3" m="0" mb="2" fontSize="1.375rem" fontWeight="bold">
          {getTitle(feedbackSubmitted)}
        </Heading>
        {feedbackSubmitted && (
          <p>
            {t("feedback-widget-thank-you-subtitle")}{" "}
            <Translation id="feedback-widget-thank-you-subtitle-ext" />
          </p>
        )}
        <Flex gap="4">
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
