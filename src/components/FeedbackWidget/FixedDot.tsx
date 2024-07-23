import { forwardRef } from "react"
import { useTranslation } from "next-i18next"
import type { ButtonHTMLAttributes } from "react"

import { cn } from "@/lib/utils/cn"

import { FeedbackGlyphIcon } from "../icons"

import { Button } from "@/../tailwind/ui/buttons/Button"

type FixedDotProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  bottomOffset: number
  isExpanded: boolean
}

const FixedDot = forwardRef<HTMLButtonElement, FixedDotProps>(
  ({ bottomOffset, isExpanded, className, ...props }, ref) => {
    const { t } = useTranslation("common")
    const size = "12"
    return (
      <Button
        ref={ref}
        data-testid="feedback-widget-button"
        aria-label={t("feedback-widget")}
        className={cn(
          "lg:mt-inherit sticky z-[98] me-4 ms-auto flex items-center gap-0 rounded-full text-white shadow-table-item-box",
          "transition-all duration-200",
          "hover:scale-110 hover:transition-transform hover:duration-200",
          `size-${size}`,
          `bottom-[${bottomOffset + 1}rem] lg:bottom-4`,
          isExpanded ? "lg:w-[15rem] lg:gap-3" : `lg:w-${size}`,
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
