import * as React from "react"
import { DocSearchModal, DocSearchModalProps } from "@docsearch/react"

type ModalPropsNoScroll = Omit<DocSearchModalProps, "initialScrollY">

const SearchModal = (props: ModalPropsNoScroll & { className?: string }) => {
  const { className, ...docModalProps } = props
  const windowScrollY = typeof window === "undefined" ? 0 : window.scrollY
  return (
    <div className={className}>
      <DocSearchModal initialScrollY={windowScrollY} {...docModalProps} />
    </div>
  )
}

export default SearchModal
