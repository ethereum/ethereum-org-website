import React from "react"

import type { IProps as IButtonProps } from "./Button"
import Link, { IBaseProps as ILinkProps } from "./Link"
import Button from "./Button"

export interface IProps extends ILinkProps, Omit<IButtonProps, "toId"> {}

const ButtonLink: React.FC<IProps> = (props) => {
  return <Button as={Link} activeStyle={{}} {...props} />
}

export default ButtonLink
