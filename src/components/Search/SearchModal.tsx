import * as React from "react"
import { DocSearchModal, DocSearchModalProps } from "@docsearch/react"

type ModalPropsNoScroll = Omit<DocSearchModalProps, "initialScrollY">

const SearchModal = (props: ModalPropsNoScroll) => {
  return <DocSearchModal initialScrollY={0} {...props} />
}

export default SearchModal
