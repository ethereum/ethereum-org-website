import * as React from "react"
import {
  Input as ChakraInput,
  InputGroup,
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
}

const Input = (props: InputProps) => {
  const { leftElement, rightElement, size, ...rest } = props
  return (
    <InputGroup size={size}>
      <ChakraInput data-peer {...rest} />
      {leftElement ? <InputLeftElement children={leftElement} /> : null}
      {rightElement ? <InputRightElement children={rightElement} /> : null}
    </InputGroup>
  )
}

export default Input
