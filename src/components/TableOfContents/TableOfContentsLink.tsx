import { cssVar, SystemStyleObject } from "@chakra-ui/react"

import type { ToCItem } from "@/lib/types"

import { BaseLink } from "@/components/Link"

export type TableOfContentsLinkProps = {
  depth: number
  item: ToCItem
  activeHash?: string
}

const Link = ({
  depth,
  item: { title, url },
  activeHash,
}: TableOfContentsLinkProps) => {
  const isActive = activeHash === url
  const isNested = depth === 2

  const classList: Array<string> = []
  isActive && classList.push("active")
  isNested && classList.push("nested")
  const classes = classList.join(" ")

  const $dotBg = cssVar("dot-bg")

  const hoverOrActiveStyle: SystemStyleObject = {
    color: $dotBg.reference,
    _after: {
      content: `""`,
      backgroundColor: "background.base",
      border: "1px",
      borderColor: $dotBg.reference,
      borderRadius: "50%",
      boxSize: 2,
      position: "absolute",
      // 16px is the initial list padding
      // 8px is the padding for each nested list
      // 4px is half of the width of the dot
      // 1px for the border
      "inset-inline-start": `calc(-16px - 8px * ${depth} - 4px - 1px)`,
      top: "50%",
      mt: -1,
    },
  }

  return (
    <BaseLink
      href={url}
      className={classes}
      textDecoration="none"
      display="inline-block"
      position="relative"
      color="body.medium"
      width={{ base: "100%", lg: "auto" }}
      _hover={{
        ...hoverOrActiveStyle,
      }}
      p="2"
      ps="0"
      sx={{
        [$dotBg.variable]: "var(--eth-colors-primary-hover)",
        "&.active": {
          [$dotBg.variable]: "var(--eth-colors-primary-visited)",
          ...hoverOrActiveStyle,
        },
      }}
    >
      {title}
    </BaseLink>
  )
}

export default Link
