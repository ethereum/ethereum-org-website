import React from "react"
import { Button, useColorModeValue } from "@chakra-ui/react"

import Link, { IProps as ILinkProps } from "./Link"

export interface IProps extends ILinkProps {}

const ButtonLink: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <Button as={Link} textDecoration="none" {...props}>
      {children}
    </Button>
  )
}

export default ButtonLink
