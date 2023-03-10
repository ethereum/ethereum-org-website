import * as React from "react"
import { chakra, useBreakpoint, useToken } from "@chakra-ui/react"
import { DocSearchModal, DocSearchModalProps } from "@docsearch/react"
import { getSearchModalStyles } from "./utils"

type ModalPropsNoScroll = Omit<DocSearchModalProps, "initialScrollY">

const DocSearchModalWithChakra = chakra(
  (props: ModalPropsNoScroll & { className?: string }) => {
    const { className, ...docModalProps } = props
    return (
      <div className={className}>
        <DocSearchModal initialScrollY={0} {...docModalProps} />
      </div>
    )
  }
)

const SearchModal = (props: ModalPropsNoScroll) => {
  const [searchBoxShadowColorToken, hitSelectedShadowColorToken] = useToken(
    "colors",
    ["primaryHighContrast", "primaryLight"]
  )

  useBreakpoint()
  return (
    <DocSearchModalWithChakra
      {...props}
      sx={getSearchModalStyles({
        searchBoxShadowColorToken,
        hitSelectedShadowColorToken,
      })}
    />
  )
}

export default SearchModal
