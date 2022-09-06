import React from "react"
import { VisuallyHidden as VisuallyHiddenSpan } from "@chakra-ui/react"

// Todo: Refactor to from isHidden boolean

export interface IProps {
  children?: React.ReactNode
  isHidden?: boolean
}

const VisuallyHidden: React.FC<IProps> = ({ isHidden = false, children }) =>
  isHidden ? (
    <VisuallyHiddenSpan>{children}</VisuallyHiddenSpan>
  ) : (
    <>{children}</>
  )

export default VisuallyHidden
