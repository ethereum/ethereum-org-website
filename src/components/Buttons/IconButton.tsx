import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from "@chakra-ui/react"

import { type ButtonProps } from "@/components/Buttons"
import { checkIsSecondary } from "@/components/Buttons/Button"

type IconButtonProps = Omit<ButtonProps, keyof ChakraIconButtonProps> &
  ChakraIconButtonProps

const IconButton = ({ isSecondary, ...props }: IconButtonProps) => (
  <ChakraIconButton
    {...checkIsSecondary({ variant: props.variant?.toString(), isSecondary })}
    {...props}
  />
)

export default IconButton
