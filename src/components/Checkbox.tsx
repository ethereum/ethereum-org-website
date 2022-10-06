import React from "react"
import {
  Checkbox as ChakraCheckbox,
  CheckboxProps,
  Text,
  Icon,
  TextProps,
} from "@chakra-ui/react"

const CustomIcon = () => {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2px"
      w="100%"
      h="100%"
    >
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  )
}

export interface IProps extends CheckboxProps {
  children?: React.ReactNode
  callback?: Function
  checked: boolean
  className?: string
  textProps?: TextProps
}

const Checkbox: React.FC<IProps> = ({
  children,
  callback,
  checked,
  className,
  size,
  textProps,
  ...rest
}) => {
  const handleClick = () => {
    if (callback) {
      callback()
    }
  }

  return (
    <ChakraCheckbox
      isChecked={checked}
      className={className}
      onChange={handleClick}
      size={size}
      icon={<CustomIcon />}
      {...rest}
    >
      {children && (
        <Text as="span" {...textProps}>
          {children}
        </Text>
      )}
    </ChakraCheckbox>
  )
}

export default Checkbox
