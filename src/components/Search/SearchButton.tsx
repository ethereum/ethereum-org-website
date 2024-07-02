import * as React from "react"
import { DocSearchButton, DocSearchButtonProps } from "@docsearch/react"

import { getSearchButtonStyles } from "./utils"
import { Button, ButtonProps } from "../ui/button"

const SearchButton = (props: Omit<DocSearchButtonProps, "ref">) => {
  return (
    <Button className="DocSearch-Button" {...props} asChild>
      <DocSearchButton />
    </Button>
  )
}

export default SearchButton
