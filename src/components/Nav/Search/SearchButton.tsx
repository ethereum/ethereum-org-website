import { forwardRef } from "react"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { DocSearchButton } from "typesense-docsearch-react"

import { Button, type ButtonProps } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

export type SearchButtonProps = ButtonProps & {
  /**
   * Render the full search field (icon, label and shortcut) from
   * DocSearch, for wide screens. Without it, render the icon-only trigger
   * used on narrow screens.
   */
  withInput?: boolean
}

const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
  ({ className, withInput = false, ...props }, ref) => {
    const t = useTranslations("common")

    if (withInput) {
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

    return (
      <Button
        ref={ref}
        aria-label={t("aria-toggle-search-button")}
        className={cn(
          "group px-2 ease-in-out [&>svg]:transition-all [&>svg]:duration-500 [&>svg]:hover:rotate-12 [&>svg]:hover:text-primary-hover",
          className
        )}
        variant="ghost"
        isSecondary
        {...props}
      >
        <Search />
      </Button>
    )
  }
)

SearchButton.displayName = "SearchButton"

export default SearchButton
