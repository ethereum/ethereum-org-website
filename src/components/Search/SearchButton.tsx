import * as React from "react"
import { Button, forwardRef } from "@chakra-ui/react"
import { DocSearchButton, DocSearchButtonProps } from "@docsearch/react"

import { getSearchButtonStyles } from "./utils"

const SearchButton = forwardRef<DocSearchButtonProps, "button">(
  (props, ref) => {
    return (
      <Button
        as={DocSearchButton}
        ref={ref}
        className="DocSearch-Button"
        {...getSearchButtonStyles()}
        {...props}
      />
    )
  }
)

export default SearchButton
