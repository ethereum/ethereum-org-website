import { useTranslation } from "next-i18next"
import { MdClose } from "react-icons/md"

import { Button } from "@/components/ui/buttons/Button"

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

import FixedDot from "./FixedDot"
import { useFeedbackWidget } from "./useFeedbackWidget"

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
          <FixedDot
            offsetBottom={offsetBottom}
            isExpanded={isExpanded}
            suppressScale={isOpen}
          />
        </PopoverTrigger>

        <PopoverContent
          className="mx-2 w-80 max-w-[calc(100vw_-_1rem)] rounded bg-background p-4 sm:p-8"
          data-testid="feedback-widget-modal"
        >
          <div className="flex items-start gap-2">
            <header className="me-0 flex-1 p-0 text-xl font-bold">
              {feedbackSubmitted
                ? t("feedback-widget-thank-you-title")
                : t("feedback-widget-prompt")}
            </header>
            <PopoverClose asChild>
              <Button
                variant="ghost"
                className="w-8 py-0 text-body"
                size="sm"
                ref={cancelRef}
              >
                <MdClose className="h-fit w-5" />
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
