import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from "@chakra-ui/react"
import { useIntl } from "react-intl"

import Link from "./Link"
import { isLang } from "../utils/languages"
import { isTranslationKey, translateMessageId } from "../utils/translations"

export interface IProps extends BreadcrumbProps {
  slug: string
  startDepth?: number
}

// Generate crumbs from slug
// e.g. "/en/eth2/proof-of-stake/" will generate:
// [
//   { fullPath: "/en/", text: "HOME" },
//   { fullPath: "/en/eth2/", text: "ETH2" },
//   { fullPath: "/en/eth2/proof-of-stake/", text: "PROOF OF STAKE" },
// ]
// `startDepth` will trim breadcrumbs
// e.g. startDepth=1 will generate:
// [
//   { fullPath: "/en/eth2/", text: "ETH2" },
//   { fullPath: "/en/eth2/proof-of-stake/", text: "PROOF OF STAKE" },
// ]
const Breadcrumbs: React.FC<IProps> = ({
  slug,
  startDepth = 0,
  ...restProps
}) => {
  const intl = useIntl()

  const slugChunk = slug.split("/")
  const sliced = slugChunk.filter((item) => !!item).slice(startDepth)

  const crumbs = sliced.map((path, idx) => {
    // If homepage (e.g. "en"), set text to "home" translation
    const text = isLang(path)
      ? translateMessageId("page-index-meta-title", intl)
      : isTranslationKey(path)
      ? translateMessageId(path, intl)
      : ""

    return {
      fullPath: slugChunk.slice(0, idx + 2 + startDepth).join("/") + "/",
      text: text.toUpperCase(),
    }
  })

  return (
    <Breadcrumb
      dir="auto"
      position="relative"
      zIndex="1"
      mb={8}
      listProps={{
        m: 0,
        lineHeight: 1,
      }}
      {...restProps}
    >
      {crumbs.map((crumb, idx) => {
        const isCurrentPage = slug === crumb.fullPath
        return (
          <BreadcrumbItem
            key={idx}
            isCurrentPage={isCurrentPage}
            color="textTableOfContents"
            fontSize="sm"
            letterSpacing="wider"
            lineHeight="140%"
            m={0}
          >
            <BreadcrumbLink
              as={Link}
              to={crumb.fullPath}
              isPartiallyActive={isCurrentPage}
              _hover={{ color: "primary", textDecor: "none" }}
              _active={{ color: "primary" }}
            >
              {crumb.text}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default Breadcrumbs
