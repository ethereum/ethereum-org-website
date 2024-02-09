import { cssVar, SystemStyleObject } from "@chakra-ui/react"

import type { ToCItem } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"

import { useRtlFlip } from "@/hooks/useRtlFlip"

type TableOfContentsLinkProps = {
  depth: number
  item: ToCItem
  activeHash?: string
}

const TableOfContentsLink = ({
  depth,
  item: { title, url },
  activeHash,
}: TableOfContentsLinkProps) => {
  const { flipForRtl } = useRtlFlip()

  const $dotBg = cssVar("dot-bg")

  // Styling for ToC circle indicator
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
      insetInlineStart: `calc(-1 * (1rem * ${depth} + 4.5px))`,
      top: "50%",
      mt: -1,
    },
  }

  return (
    <ButtonLink
      isActive={activeHash === url}
      variant="link"
      href={url}
      p="0"
      border="0px"
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
      _active={{
        [$dotBg.variable]: "colors.primary",
        ...hoverOrActiveStyle,
      }}
      _before={
        depth > 2
          ? {
              content: `"⌞"`,
              opacity: 0.5,
              display: "inline-flex",
              position: "absolute",
              insetInlineStart: -3.5,
              top: -1,
              transform: flipForRtl,
            }
          : undefined
      }
    >
      {title}
    </ButtonLink>
  )
}

export default TableOfContentsLink
