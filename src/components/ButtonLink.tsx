import React from "react"

import type { IProps as IButtonProps } from "./Button"
import { BaseLink, type LinkProps } from "./Link"
import Button from "./Button"

export type Props = LinkProps & Omit<IButtonProps, "toId">

const ButtonLink: React.FC<Props> = (props) => {
  return <Button as={BaseLink} {...props} />
}

export default ButtonLink
