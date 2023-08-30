import React from "react"

import type { IProps as IButtonProps } from "./Button"
import { BaseLink, IBaseProps as ILinkProps } from "../Link"
import Button from "./Button"

export interface IProps extends ILinkProps, Omit<IButtonProps, "toId"> {}

const ButtonLink: React.FC<IProps> = (props) => {
  return <Button as={BaseLink} activeStyle={{}} {...props} />
}

export default ButtonLink
