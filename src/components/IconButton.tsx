import * as React from "react"
import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from "@chakra-ui/react"
import { checkIsSecondary, IProps as IButtonProps } from "./Button"

interface IconButtonProps
  extends Omit<IButtonProps, keyof ChakraIconButtonProps>,
    ChakraIconButtonProps {}

const IconButton = (props: IconButtonProps) => {
  const { isSecondary, ...rest } = props
  return (
    <ChakraIconButton
      {...checkIsSecondary({ variant: rest.variant?.toString(), isSecondary })}
      {...rest}
    />
  )
}

export default IconButton
