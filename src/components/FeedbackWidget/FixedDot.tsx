import { forwardRef } from "react"
import { useTranslation } from "next-i18next"
import type { ButtonHTMLAttributes } from "react"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { FeedbackGlyphIcon } from "../icons"

type FixedDotProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isExpanded: boolean
  offsetBottom?: boolean
  suppressScale?: boolean
}

const FixedDot = forwardRef<HTMLButtonElement, FixedDotProps>(
  ({ offsetBottom, isExpanded, suppressScale, className, ...props }, ref) => {
    const { t } = useTranslation("common")
    return (
      <Button
        ref={ref}
        data-testid="feedback-widget-button"
        aria-label={t("feedback-widget")}
        className={cn(
          "lg:mt-inherit sticky bottom-4 z-overlay me-4 ms-auto flex size-12 items-center gap-0 rounded-full text-white shadow-table-item-box",
          "transition-all duration-200 hover:shadow-none hover:transition-transform hover:duration-200",
          !suppressScale && "hover:scale-110",
          offsetBottom && "bottom-31 lg:bottom-4",
          isExpanded ? "lg:w-60 lg:gap-3" : "lg:w-12",
          className
        )}
        {...props}
      >
        <FeedbackGlyphIcon
          className={cn("text-white", !isExpanded && "-mx-1")}
        />
        <div
          className={cn(
            "duration-250 transform transition-all",
            isExpanded ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          <span
            className={cn(
              "line-clamp-2 hidden h-full items-center font-bold text-white",
              isExpanded && "lg:flex"
            )}
          >
            {t("feedback-widget-prompt")}
          </span>
        </div>
      </Button>
    )
  }
)

FixedDot.displayName = "FixedDot"

export default FixedDot
