import React from "react"
import {
  Checkbox as ChakraCheckbox,
  CheckboxProps,
  Icon,
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
  className?: string
}

const Checkbox: React.FC<IProps> = ({ className, ...rest }) => {
  return (
    <ChakraCheckbox className={className} icon={<CustomIcon />} {...rest} />
  )
}

export default Checkbox
