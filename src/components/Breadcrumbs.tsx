import React from "react"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from "@chakra-ui/react"

import Link from "./Link"

export interface IProps extends BreadcrumbProps {
  slug: string
  startDepth?: number
}

interface Crumb {
  fullPath: string
  text: string
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
  slug: originalSlug,
  startDepth = 0,
  ...restProps
}) => {
  const { t } = useTranslation()
  const { language } = useI18next()

  const hasHome = originalSlug.includes(`/${language}/`)
  const slug = originalSlug.replace(`/${language}/`, "/")

  const slugChunk = slug.split("/")
  const sliced = slugChunk.filter((item) => !!item)

  const crumbs = [
    // If homepage (e.g. "en"), set text to "home" translation
    ...(hasHome
      ? [
          {
            fullPath: "/",
            text: t("page-index-meta-title"),
          },
        ]
      : []),
    ,
    ...sliced.map((path, idx) => {
      return {
        fullPath: slugChunk.slice(0, idx + 2).join("/") + "/",
        text: t(path),
      }
    }),
  ]
    .filter((item): item is Crumb => !!item)
    .slice(startDepth)

  return (
    <Breadcrumb
      dir="auto"
      position="relative"
      zIndex="1"
      mb={8}
      listProps={{
        m: 0,
        lineHeight: 1,
        rowGap: 1.5,
        flexWrap: "wrap",
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
              _hover={{ color: "primary.base", textDecor: "none" }}
              _active={{ color: "primary.base" }}
            >
              {crumb.text.toUpperCase()}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default Breadcrumbs
