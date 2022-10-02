import React from "react"
import {
  Checkbox as ChakraCheckbox,
  CheckboxProps,
  Text,
  Icon,
} from "@chakra-ui/react"

const CustomIcon = ({
  // handleClick,
  checked,
}) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2px"
      w="100%"
      h="100%"
      // onClick={evt => {
      //   evt.preventDefault();
      //   evt.stopPropagation();
      // }}
      // onChange={evt => {
      //   evt.preventDefault();
      //   evt.stopPropagation();
      // }}
      visibility={`${checked ? "visible" : "hidden"}`}
    >
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  )
}

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
  const handleClick = (evt) => {
    console.log("pippo click")
    evt.stopPropagation()
    evt.preventDefault()
    // if (callback) {
    //   callback()
    // }
  }

  return (
    <ChakraCheckbox
      defaultChecked={checked}
      checked={checked}
      className={className}
      onClick={handleClick}
      onChange={handleClick}
      size={size}
      icon={
        <CustomIcon
          // handleClick={handleClick}
          checked={checked}
        />
      }
      readOnly
      // pointerEvents="none"
      _hover={{
        boxShadow: "tableItemBoxShadow",
        border: "1px",
        borderStyle: "solid",
        borderColor: "primary600",
        transition: "transform 0.1s",
        transform: "scale(1.02)",
      }}
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
