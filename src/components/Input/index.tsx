import * as React from "react"
import {
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputGroupProps,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react"
import { IconType } from "react-icons/lib"

interface InputProps extends ChakraInputProps {
  /**
   * The Icon used to render `InputRightElement` on the right side of the input
   */
  rightIcon?: IconType | typeof Icon
  inputGroupProps?: InputGroupProps
}

function Input(props: InputProps) {
  if (props.rightIcon) {
    const { size, inputGroupProps, rightIcon: Icon, ...rest } = props
    return (
      <InputGroup size={size} {...inputGroupProps}>
        <ChakraInput data-peer {...rest} />
        <InputRightElement children={<Icon />} />
      </InputGroup>
    )
  }

  const { size, ...rest } = props

  return <ChakraInput size={size} {...rest} />
}

export default Input
