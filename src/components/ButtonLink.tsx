import React from "react"
import { useStyleConfig } from "@chakra-ui/react"

import type { IProps as IButtonProps } from "./Button"
import Link, { IBaseProps as ILinkProps } from "./Link"
import Button from "./Button"

export interface IProps extends ILinkProps, Omit<IButtonProps, "toId"> {}

const ButtonLink: React.FC<IProps> = (props) => {
  const buttonStyles = useStyleConfig("Button", { ...props })
  return (
    <Button
      as={Link}
      activeStyle={{}}
      textDecoration="none"
      _hover={{ textDecoration: "none", ...buttonStyles["_hover"] }}
      {...props}
    />
  )
}

export default ButtonLink
