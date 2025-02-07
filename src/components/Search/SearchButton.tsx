import { forwardRef } from "react"
import { useTranslation } from "next-i18next"
import { MdSearch } from "react-icons/md"

import { cn } from "@/lib/utils/cn"

import { Button, type ButtonProps } from "../ui/buttons/Button"

const SearchButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const { t } = useTranslation("common")

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
        <MdSearch />
      </Button>
    )
  }
)

SearchButton.displayName = "SearchButton"

export default SearchButton
