import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  type BreadcrumbProps as ChakraBreadcrumbProps,
} from "@chakra-ui/react"

import type { Lang } from "@/lib/types"

import { BaseLink } from "@/components/Link"

import { isLangRightToLeft } from "@/lib/utils/translations"

export type BreadcrumbsProps = ChakraBreadcrumbProps & {
  slug: string
  startDepth?: number
}

type Crumb = {
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
const Breadcrumbs = ({ slug, startDepth = 0, ...props }: BreadcrumbsProps) => {
  const { t } = useTranslation("common")
  const { locale, asPath } = useRouter()
  const dir = isLangRightToLeft(locale! as Lang) ? "rtl" : "ltr"

  const hasHome = asPath !== "/"
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
    ...sliced.map((path, idx) => ({
      fullPath: slugChunk.slice(0, idx + 2).join("/") + "/",
      text: t(path),
    })),
  ]
    .filter((item): item is Crumb => !!item)
    .slice(startDepth)

  return (
    <Breadcrumb {...props} dir={dir}>
      {crumbs.map(({ fullPath, text }) => {
        const isCurrentPage = slug === fullPath
        return (
          <BreadcrumbItem key={fullPath} isCurrentPage={isCurrentPage}>
            <BreadcrumbLink
              // If current page, render as span since the `href` will not be
              // passed down to the child
              // ref: https://github.com/chakra-ui/chakra-ui/blob/v2/packages/components/src/breadcrumb/breadcrumb-link.tsx#L32
              as={isCurrentPage ? "span" : BaseLink}
              href={fullPath}
              textTransform="uppercase"
            >
              {text}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default Breadcrumbs
