import React from "react"

import type { IProps as IButtonProps } from "./Button"
import { BaseLink, LinkProps } from "../Link"
import Button from "./Button"

export type ButtonLinkProps = LinkProps & Omit<IButtonProps, "toId">

const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  return <Button as={BaseLink} activeStyle={{}} {...props} />
}

export default ButtonLink
