import React from "react"
import {
  Checkbox as ChakraCheckbox,
  CheckboxIconProps,
  CheckboxProps,
  Icon,
} from "@chakra-ui/react"

const CustomIcon = (props: CheckboxIconProps) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      stroke="buttonColor"
      strokeWidth="2px"
      w="100%"
      h="100%"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  )
}

export interface IProps extends CheckboxProps {}

const Checkbox: React.FC<IProps> = (props) => {
  return <ChakraCheckbox icon={<CustomIcon />} {...props} />
}

export default Checkbox
