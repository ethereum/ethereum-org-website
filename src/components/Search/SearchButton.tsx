import * as React from "react"
import { useTranslation } from "react-i18next"
import { DocSearchButton } from "@docsearch/react"

import { Button, type ButtonProps } from "../ui/buttons/Button"

const SearchButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { t } = useTranslation("common")

    return (
      <Button
        ref={ref}
        variant="ghost"
        className="me-3 border border-disabled hover:border-primary-hover"
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
