"use client"

import { type ReactNode, useState } from "react"
import { useLocale } from "next-intl"

import type { Lang } from "@/lib/types"

import { FeedbackThumbsUpIcon } from "@/components/icons"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { isLangRightToLeft } from "@/lib/utils/translations"

import { Button } from "./ui/buttons/Button"
import Translation from "./Translation"

import { useSurvey } from "@/hooks/useSurvey"
import { useTranslation } from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/navigation"

type ContentFeedbackProps = {
  prompt?: string
  isArticle?: boolean
}

const ContentFeedback = ({
  prompt,
  isArticle,
  ...props
}: ContentFeedbackProps) => {
  const { t } = useTranslation("common")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const surveyUrl = useSurvey(feedbackSubmitted)
  const locale = useLocale()
  const pathname = usePathname()
  const dir = isLangRightToLeft(locale! as Lang) ? "rtl" : "ltr"
  const headingId = "feedback-card-heading"

  const isTutorial = pathname?.includes("tutorials")

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
    <aside
      className="mt-8 mb-4 flex w-full max-w-3xl flex-col gap-4"
      {...props}
      aria-labelledby={headingId}
      dir={dir}
    >
      <h2 id={headingId} className="text-h3">
        {getTitle(feedbackSubmitted)}
      </h2>

      <div
        className={cn("flex gap-x-4 gap-y-8", feedbackSubmitted && "flex-col")}
      >
        {!feedbackSubmitted ? (
          <>
            <Button variant="outline" onClick={() => handleSubmit(true)}>
              <FeedbackThumbsUpIcon className="text-2xl" />
              {t("yes")}
            </Button>
            <Button variant="outline" onClick={() => handleSubmit(false)}>
              <FeedbackThumbsUpIcon className="-scale-y-100 text-2xl" />
              {t("no")}
            </Button>
          </>
        ) : (
          <>
            <p>
              {t("feedback-widget-thank-you-subtitle")}{" "}
              <Translation id="feedback-widget-thank-you-subtitle-ext" />
            </p>

            <Button
              variant="outline"
              onClick={handleSurveyOpen}
              className="w-fit max-sm:w-full"
            >
              {t("feedback-widget-thank-you-cta")}
            </Button>
          </>
        )}
      </div>
    </aside>
  )
}

export default ContentFeedback
