import { type ReactNode, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type { Lang } from "@/lib/types"

import { FeedbackThumbsUpIcon } from "@/components/icons"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { isLangRightToLeft } from "@/lib/utils/translations"

import { Button } from "./ui/buttons/Button"
import Translation from "./Translation"

import { useSurvey } from "@/hooks/useSurvey"

type FeedbackCardProps = {
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
    <div
      className="mb-4 mt-8 flex w-full flex-col rounded border border-body-light bg-feedback-gradient p-6"
      {...props}
      dir={dir}
    >
      <div className="flex flex-col gap-4">
        <h4 className="mb-2">{getTitle(feedbackSubmitted)}</h4>
        {feedbackSubmitted && (
          <p>
            {t("feedback-widget-thank-you-subtitle")}{" "}
            <Translation id="feedback-widget-thank-you-subtitle-ext" />
          </p>
        )}
        <div className="flex gap-4">
          {!feedbackSubmitted ? (
            <>
              <Button variant="outline" onClick={() => handleSubmit(true)}>
                <FeedbackThumbsUpIcon className="h-6 w-6" />
                {t("yes")}
              </Button>
              <Button variant="outline" onClick={() => handleSubmit(false)}>
                <FeedbackThumbsUpIcon className="-scale-y-100" />
                {t("no")}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={handleSurveyOpen}>
              {t("feedback-widget-thank-you-cta")}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeedbackCard
