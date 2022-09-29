import React from "react"
import { Tag as ChakraTag, TagRightIcon, TagLabel } from "@chakra-ui/react"
import { MdAdd, MdClose } from "react-icons/md"

export interface IProps {
  name: string
  onClick: (tagName: string) => void
  value: string
  isActive: boolean
  shouldShowIcon: boolean
}

const Tag: React.FC<IProps> = ({
  name,
  onClick,
  value,
  isActive = true,
  shouldShowIcon = true,
}) => {
  return (
    <ChakraTag
      onClick={() => onClick(value)}
      variant={isActive ? "active" : "custom"}
    >
      <TagLabel>{name}</TagLabel>
      {shouldShowIcon && (
        <TagRightIcon boxSize="18px" as={isActive ? MdClose : MdAdd} ml="4" />
      )}
    </ChakraTag>
  )
}

export default Tag
