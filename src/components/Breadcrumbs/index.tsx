import React from "react"
// import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

import { BaseLink } from "../Link"

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
  // TODO: update when i18n is set up
  // const { t } = useTranslation()
  const { locale, asPath } = useRouter()

  const hasHome = asPath !== "/"
  const slug = originalSlug.replace(`/${locale}/`, "/")
  const slugChunk = slug.split("/")
  const sliced = slugChunk.filter((item) => !!item)

  const crumbs = [
    // If homepage (e.g. "en"), set text to "home" translation
    ...(hasHome
      ? [
          {
            fullPath: "/",
            // TODO: update when i18n is set up
            // text: t("page-index-meta-title"),
            text: "Home",
          },
        ]
      : []),
    ,
    ...sliced.map((path, idx) => {
      return {
        fullPath: slugChunk.slice(0, idx + 2).join("/") + "/",
        // TODO: update when i18n is set up
        // text: t(path),
        text: path,
      }
    }),
  ]
    .filter((item): item is Crumb => !!item)
    .slice(startDepth)

  return (
    <Breadcrumb dir="auto" {...restProps}>
      {crumbs.map((crumb, idx) => {
        const isCurrentPage = slug === crumb.fullPath
        return (
          <BreadcrumbItem key={idx} isCurrentPage={isCurrentPage}>
            <BreadcrumbLink
              as={BaseLink}
              to={crumb.fullPath}
              isPartiallyActive={isCurrentPage}
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
