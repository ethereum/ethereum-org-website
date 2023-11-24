import React from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from "@chakra-ui/react"

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
  const { t } = useTranslation()
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
            text: t("page-index:page-index-meta-title"),
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
