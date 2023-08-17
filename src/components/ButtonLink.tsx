import React from "react"
import { Button, ButtonProps, useStyleConfig } from "@chakra-ui/react"

import { BaseLink, IBaseProps as ILinkProps } from "./Link"

export interface IProps extends ILinkProps, ButtonProps {
  isSecondary?: boolean
}

const ButtonLink: React.FC<IProps> = ({ children, isSecondary, ...props }) => {
  /**
   *  Prevent React warning that does not recognize `isSecondary` on DOM
   *  while still sending prop to the theme config
   */
  const styles = useStyleConfig("Button", {
    ...props,
    isSecondary,
  })

  return (
    <Button
      as={BaseLink}
      activeStyle={{}}
      // `styles` object sent to `sx` prop per convention
      sx={{
        ...styles,
        textDecoration: "none",
        _hover: { ...styles["_hover"], textDecoration: "none" },
        _visited: { color: styles["color"] },
      }}
      fontWeight="normal"
      {...props}
    >
      {children}
    </Button>
  )
}

export default ButtonLink
