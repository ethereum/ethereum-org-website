import * as React from "react"
import { Button, forwardRef, useToken } from "@chakra-ui/react"
import { DocSearchButton, DocSearchButtonProps } from "@docsearch/react"

import { getSearchButtonStyles } from "./utils"

const SearchButton = forwardRef<DocSearchButtonProps, "button">(
  (props, ref) => {
    const searchBoxShadowColorToken = useToken("colors", "primaryHighContrast")

    return (
      <Button
        as={DocSearchButton}
        ref={ref}
        className="DocSearch-Button"
        {...getSearchButtonStyles({ searchBoxShadowColorToken })}
        {...props}
      ></Button>
    )
  }
)

export default SearchButton
