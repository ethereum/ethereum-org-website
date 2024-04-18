import * as React from "react"
import {
  Input as ChakraInput,
  InputGroup,
  InputGroupProps,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react"

type CommonProps = ChakraInputProps

type NoIconProps = CommonProps & { rightIcon?: never }

type WithIconProps = CommonProps & {
  /**
   * The Icon used to render `InputRightElement` on the right side of the input
   */
  rightIcon: JSX.Element
  /**
   * Primarily for style props to be applied to the wrapper
   */
  inputGroupProps?: InputGroupProps
}

type InputProps = NoIconProps | WithIconProps

function Input(props: NoIconProps): JSX.Element
function Input(props: WithIconProps): JSX.Element
function Input(props: InputProps) {
  if (props.rightIcon) {
    const { size, inputGroupProps, rightIcon: Icon, ...rest } = props
    return (
      <InputGroup size={size} {...inputGroupProps}>
        <ChakraInput data-peer {...rest} />
        <InputRightElement>{Icon}</InputRightElement>
      </InputGroup>
    )
  }

  const { size, ...rest } = props

  return <ChakraInput size={size} {...rest} />
}

export default Input
