import React from "react"
import { Button, ButtonProps } from "@chakra-ui/react"

import Link, { IBaseProps as ILinkProps } from "./Link"

export interface IProps extends ILinkProps, ButtonProps {}

const ButtonLink: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <Button as={Link} textDecoration="none" activeStyle={{}} {...props}>
      {children}
    </Button>
  )
}

export default ButtonLink
