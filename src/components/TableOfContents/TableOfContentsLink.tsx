import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { SystemStyleObject, cssVar } from "@chakra-ui/react"
import CustomLink from "../Link"
import { getCustomId, Item, trimmedTitle } from "./utils"

export interface IPropsTableOfContentsLink {
  item: Item
  activeHash?: string
}

const Link: React.FC<IPropsTableOfContentsLink> = ({ item }) => {
  const url = `#${getCustomId(item.title)}`

  const $dotBg = cssVar("dot-bg")

  const hoverOrActiveStyle: SystemStyleObject = {
    color: "primary",
    _after: {
      content: `""`,
      background: $dotBg.reference,
      border: "1px",
      borderColor: "primary",
      borderRadius: "50%",
      boxSize: 2,
      position: "absolute",
      left: "-1.29rem",
      top: "50%",
      mt: -1,
    },
  }

  return (
    <CustomLink
      as={GatsbyLink}
      to={url}
      textDecoration="none"
      display="inline-block"
      position="relative"
      color="textTableOfContents"
      mb="0.5rem !important"
      width={{ base: "100%", lg: "auto" }}
      _hover={{
        ...hoverOrActiveStyle,
      }}
      sx={{
        [$dotBg.variable]: "colors.background",
        "&.active": {
          [$dotBg.variable]: "colors.primary",
          ...hoverOrActiveStyle,
        },
        "&.nested": {
          _before: {
            content: `"⌞"`,
            opacity: 0.5,
            display: "inline-flex",
            position: "absolute",
            left: "-14px",
            top: -1,
          },
          "&.active, &:hover": {
            _after: {
              left: "-2.29rem",
            },
          },
        },
      }}
    >
      {trimmedTitle(item.title)}
    </CustomLink>
  )
}

export default Link
