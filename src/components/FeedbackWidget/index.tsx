"use client"
import { useContext } from "react"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

import FixedDot from "./FixedDot"
import { useFeedbackWidget } from "./useFeedbackWidget"

import { FeedbackWidgetContext } from "@/contexts/FeedbackWidgetContext"

const FeedbackWidget = () => {
  const { showFeedbackWidget } = useContext(FeedbackWidgetContext)
  const t = useTranslations("common")
  const {
    offsetBottom,
    cancelRef,
    feedbackSubmitted,
    handleClose,
    handleOpen,
    handleSubmit,
    handleSurveyOpen,
    isExpanded,
    isOpen,
  } = useFeedbackWidget()

  if (!showFeedbackWidget) return null

  return (
    <>
      <Popover
        onOpenChange={(open) => (open ? handleOpen : handleClose)()}
        open={isOpen}
      >
        <PopoverTrigger asChild>
          <FixedDot
            offsetBottom={offsetBottom}
            isExpanded={isExpanded}
            suppressScale={isOpen}
          />
        </PopoverTrigger>

        <PopoverContent
          className="mx-2 w-80 max-w-[calc(100vw_-_1rem)] rounded-base bg-background p-4"
          aria-labelledby="feedback-widget-title"
          data-testid="feedback-widget-modal"
        >
          <div className="flex justify-end">
            <PopoverClose asChild>
              <Button
                variant="ghost"
                className="w-8 py-0 text-body [&>svg]:size-6"
                size="sm"
                aria-label={t("close")}
                ref={cancelRef}
              >
                <X />
              </Button>
            </PopoverClose>
          </div>

          <h2
            id="feedback-widget-title"
            className="text-center text-xl font-bold"
          >
            {feedbackSubmitted
              ? t("feedback-widget-thank-you-title")
              : t("feedback-widget-prompt")}
          </h2>

          {feedbackSubmitted && (
            <>
              <p className="mt-space-half text-center text-md">
                {t("feedback-widget-thank-you-subtitle")}
              </p>
              <p className="mt-space-half text-center text-xs text-body-medium">
                {t("feedback-widget-thank-you-timing")}
              </p>
            </>
          )}

          <footer className="mt-8 flex gap-6">
            {feedbackSubmitted ? (
              <Button onClick={handleSurveyOpen} className="flex-1">
                {t("feedback-widget-thank-you-cta")}
              </Button>
            ) : (
              <>
                <Button
                  variant="solid"
                  onClick={() => handleSubmit(true)}
                  className="flex-1"
                >
                  {t("yes")}
                </Button>
                <Button
                  variant="solid"
                  onClick={() => handleSubmit(false)}
                  className="flex-1"
                >
                  {t("no")}
                </Button>
              </>
            )}
          </footer>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default FeedbackWidget
