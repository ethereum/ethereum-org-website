import * as React from "react"
import {
  forwardRef,
  Tag as ChakraTag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  TagProps,
  TagRightIcon,
} from "@chakra-ui/react"

export interface EthTagProps extends TagProps {
  label: React.ReactNode
  isCloseable?: boolean
  leftIcon?: React.ElementType
  rightIcon?: React.ElementType
  status?: "normal" | "tag" | "success" | "error" | "warning"
}

const Tag = forwardRef<EthTagProps, typeof ChakraTag>((props, ref) => {
  const {
    label,
    isCloseable = false,
    status = "normal",
    leftIcon,
    rightIcon,
    ...rest
  } = props

  const commonIconProps = {
    m: 0,
  }
  return (
    <ChakraTag ref={ref} status={status} {...rest}>
      {leftIcon ? (
        <TagLeftIcon as={leftIcon} boxSize={6} {...commonIconProps} />
      ) : null}
      <TagLabel noOfLines={2}>{label}</TagLabel>
      {rightIcon ? (
        <TagRightIcon as={rightIcon} boxSize="22px" {...commonIconProps} />
      ) : null}
      {isCloseable ? <TagCloseButton /> : null}
    </ChakraTag>
  )
})

export default Tag
