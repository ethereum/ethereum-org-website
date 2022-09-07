import React from "react"
import {
  Tag as ChakraTag,
  TagRightIcon,
  TagLabel,
  TagProps,
} from "@chakra-ui/react"
import { MdAdd, MdClose } from "react-icons/md"

export interface IProps extends TagProps {
  name: string
  onChoose: (tagName: string) => void
  value: string
  isActive: boolean
  shouldShowIcon: boolean
}

const Tag: React.FC<IProps> = ({
  name,
  onChoose,
  value,
  isActive = true,
  shouldShowIcon = true,
}) => {
  return (
    <ChakraTag
      onClick={() => onChoose(value)}
      variant={isActive ? "active" : "subtle"}
    >
      <TagLabel>{name}</TagLabel>
      {shouldShowIcon && (
        <TagRightIcon
          boxSize="18px"
          as={isActive ? MdClose : MdAdd}
          style={{ marginLeft: "1em" }}
        />
      )}
    </ChakraTag>
  )
}

export default Tag
