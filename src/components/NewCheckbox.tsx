import React from "react"
import {
  Checkbox as ChakraCheckbox,
  CheckboxProps,
  Text,
} from "@chakra-ui/react"
import { resetApolloContext } from "@apollo/client"

export interface IProps extends CheckboxProps {
  children?: React.ReactNode
  callback?: () => void
  checked: boolean
  className?: string
}

// name to change in "Checkbox"
const NewCheckbox: React.FC<IProps> = ({
  children,
  callback,
  checked,
  className,
  size,
  ...rest
}) => {
  const handleClick = () => {
    if (callback) {
      callback()
    }
  }

  return (
    <ChakraCheckbox
      className={className}
      onClick={handleClick}
      size={size}
      checked={checked}
      {...rest}
    >
      {children && (
        <Text as="span" ml={2}>
          {children}
        </Text>
      )}
    </ChakraCheckbox>
  )
}

export default NewCheckbox // to change in Checkbox
