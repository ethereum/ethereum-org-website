import * as React from "react"
import { DocSearchButton } from "@docsearch/react"

import { Button, type ButtonProps } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { useTranslation } from "@/hooks/useTranslation"

const SearchInputButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const { t } = useTranslation("common")

    return (
      <Button
        ref={ref}
        aria-label={t("aria-toggle-search-button")}
        data-testid="search-input-button"
        variant="ghost"
        className={cn(
          "group me-3 border border-disabled hover:border-primary-hover",
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

SearchInputButton.displayName = "SearchButton"

export default SearchInputButton
