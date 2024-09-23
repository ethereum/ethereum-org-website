import { Fragment } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbProps,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"

export type BreadcrumbsProps = BreadcrumbProps & {
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
      <BreadcrumbList>
        {crumbs.map(({ fullPath, text }) => {
          const normalizePath = (path) => path.replace(/\/$/, "") // Remove trailing slash
          const isCurrentPage = normalizePath(slug) === normalizePath(fullPath)
          return (
            <Fragment key={fullPath}>
              <BreadcrumbItem>
                {isCurrentPage ? (
                  <BreadcrumbPage>{text}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={fullPath}>{text}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isCurrentPage && (
                <BreadcrumbSeparator className="me-[0.625rem] ms-[0.625rem] text-gray-400">
                  /
                </BreadcrumbSeparator>
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
