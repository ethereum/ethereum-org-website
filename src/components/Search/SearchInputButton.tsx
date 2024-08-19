import * as React from "react"
import { useTranslation } from "next-i18next"
import { DocSearchButton } from "@docsearch/react"

import { cn } from "@/lib/utils/cn"

import { Button, type ButtonProps } from "../ui/buttons/Button"

const SearchButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const { t } = useTranslation("common")

    return (
      <Button
        ref={ref}
        aria-label={t("aria-toggle-search-button")}
        variant="ghost"
        className={cn(
          "me-3 border border-disabled hover:border-primary-hover",
          className
        )}
        {...props}
        asChild
      >
        <DocSearchButton
          translations={{
            buttonText: t("search"),
            buttonAriaLabel: t("search"),
          }}
        />
      </Button>
    )
  }
)

SearchButton.displayName = "SearchButton"

export default SearchButton
