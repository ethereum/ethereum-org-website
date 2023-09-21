import * as React from "react"
import {
  Input as ChakraInput,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react"

interface InputProps extends ChakraInputProps {
  /**
   * The Element or Icon used to render `InputLeftElement`
   */
  leftElement?: React.ReactNode
  /**
   * The Element or Icon used to render `InputRightElement`
   */
  rightElement?: React.ReactNode
  inputGroupProps?: InputGroupProps
}

function Input(props: InputProps) {
  if ("leftElement" in props || "rightElement" in props) {
    const { size, inputGroupProps, leftElement, rightElement, ...rest } = props
    return (
      <InputGroup size={size} {...inputGroupProps}>
        <ChakraInput data-peer {...rest} />
        {leftElement ? <InputLeftElement children={leftElement} /> : null}
        {rightElement ? <InputRightElement children={rightElement} /> : null}
      </InputGroup>
    )
  }

  const { size, ...rest } = props

  return <ChakraInput size={size} {...rest} />
}

export default Input
