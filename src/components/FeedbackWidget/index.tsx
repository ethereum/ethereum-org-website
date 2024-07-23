import { useTranslation } from "next-i18next"
import { MdClose } from "react-icons/md"

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

import FixedDot from "./FixedDot"
import { useFeedbackWidget } from "./useFeedbackWidget"

import { Button } from "@/../tailwind/ui/buttons/Button"

const FeedbackWidget = () => {
  const { t } = useTranslation("common")
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
  return (
    <>
      <Popover
        onOpenChange={(open) => (open ? handleOpen : handleClose)()}
        open={isOpen}
      >
        <PopoverTrigger asChild>
          <FixedDot offsetBottom={offsetBottom} isExpanded={isExpanded} />
        </PopoverTrigger>

        <PopoverContent className="mx-2 w-fit max-w-80 rounded bg-background p-4 sm:p-8">
          <div className="items-top flex gap-2">
            <header className="me-0 p-0 text-xl font-bold">
              {feedbackSubmitted
                ? t("feedback-widget-thank-you-title")
                : t("feedback-widget-prompt")}
            </header>
            <PopoverClose asChild>
              <Button
                variant="ghost"
                className="h-fit py-0 text-body"
                size="sm"
                ref={cancelRef}
              >
                <MdClose className="size-5 h-fit" />
              </Button>
            </PopoverClose>
          </div>

          {feedbackSubmitted && (
            <>
              <div className="text-center text-md font-normal leading-5">
                {t("feedback-widget-thank-you-subtitle")}
              </div>
              <div className="text-center text-xs font-bold leading-4 tracking-wide text-body-medium">
                {t("feedback-widget-thank-you-timing")}
              </div>
            </>
          )}

          <footer className="flex gap-6 pt-8">
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
