import React from "react"
import {
  Checkbox as ChakraCheckbox,
  Icon,
  VisuallyHiddenInput,
  Text,
  VStack,
} from "@chakra-ui/react"

// Checkbox Container
const containerProps = {
  display: "inline-block",
  verticalAlign: "middle",
}

// Hidden input

// StyledCheckbox

// Icon
const svgProps = {
  fill: "none",
  stroke: `${(props) => props.theme.colors.white}`,
  strokeWidth: "2px",
  visibility: `${(props) => (props.checked ? "visible" : "hidden")}`,
}
// Label

// Props
export interface IProps {
  children?: React.ReactNode
  callback?: () => void
  checked: boolean
  className?: string
  size?: number
}

// Checkbox
const Checkbox: React.FC<IProps> = ({
  callback,
  checked,
  children,
  className,
  size = 2,
  ...rest
}) => {
  console.log({
    checkboxProps: {
      callback,
      checked,
      children,
      className,
      size,
      ...rest,
    },
  })

  const handleClick = () => {
    if (callback) {
      callback()
    }
  }

  return (
    <VStack className={className} onClick={handleClick} {...containerProps}>
      <VisuallyHiddenInput type="checkbox" checked={checked} readOnly />
      <ChakraCheckbox
        aria-hidden="true"
        checked={checked}
        className="styled-checkbox"
        size={size}
      >
        <svg checked={checked} viewBox="0 0 24 24" {...svgProps}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </ChakraCheckbox>
      {children && <Text>{children}</Text>}
    </VStack>
  )
}

export default Checkbox
