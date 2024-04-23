import { cssVar, SystemStyleObject } from "@chakra-ui/react"

import type { ToCItem } from "@/lib/types"

import { BaseLink } from "@/components/Link"

import { useRtlFlip } from "@/hooks/useRtlFlip"

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
  const { flipForRtl } = useRtlFlip()
  const isActive = activeHash === url
  const isNested = depth === 2

  const classList: Array<string> = []
  isActive && classList.push("active")
  isNested && classList.push("nested")
  const classes = classList.join(" ")

  const $dotBg = cssVar("dot-bg")

  const hoverOrActiveStyle: SystemStyleObject = {
    color: "primary.base",
    _after: {
      content: `""`,
      background: $dotBg.reference,
      border: "1px",
      borderColor: "primary.base",
      borderRadius: "50%",
      boxSize: 2,
      position: "absolute",
      insetInlineStart: "-1.29rem",
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
      color="textTableOfContents"
      fontWeight="normal"
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
            insetInlineStart: -3.5,
            top: -1,
            transform: flipForRtl,
          },
          "&.active, &:hover": {
            _after: {
              insetInlineStart: "-2.29rem",
            },
          },
        },
      }}
    >
      {title}
    </BaseLink>
  )
}

export default Link
