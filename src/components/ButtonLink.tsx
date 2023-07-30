import React from "react"
import { Button, ButtonProps, useStyleConfig } from "@chakra-ui/react"

import Link, { IBaseProps as ILinkProps } from "./Link"

export interface IProps extends ILinkProps, ButtonProps {}

const ButtonLink: React.FC<IProps> = ({ children, ...props }) => {
  const buttonStyles = useStyleConfig("Button")

  return (
    <Button
      as={Link}
      activeStyle={{}}
      textDecoration="none"
      _hover={{ ...buttonStyles["_hover"], textDecoration: "none" }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default ButtonLink
