import { Fragment } from "react"
import { useLocale } from "next-intl"

import type { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"
import { normalizeSlug } from "@/lib/utils/url"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbProps,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"

import { useTranslation } from "@/hooks/useTranslation"

export type BreadcrumbsProps = BreadcrumbProps & {
  slug: string
  startDepth?: number
}

type Crumb = {
  fullPath: string
  text: string
}

// TODO: update docs after removing pathname and slug logic

// Generate crumbs from slug
// e.g., "/eth2/proof-of-stake/" will generate:
// [
//   { fullPath: "/", text: "HOME" },
//   { fullPath: "/eth2/", text: "ETH2" },
//   { fullPath: "/eth2/proof-of-stake/", text: "PROOF OF STAKE" },
// ]
// `startDepth` will trim breadcrumbs
// e.g., startDepth=1 will generate:
// [
//   { fullPath: "/eth2/", text: "ETH2" },
//   { fullPath: "/eth2/proof-of-stake/", text: "PROOF OF STAKE" },
// ]
const Breadcrumbs = ({ slug, startDepth = 0, ...props }: BreadcrumbsProps) => {
  const { t } = useTranslation("common")
  const locale = useLocale()
  const dir = isLangRightToLeft(locale! as Lang) ? "rtl" : "ltr"
  const normalizedSlug = normalizeSlug(slug)

  const hasHome = normalizedSlug !== ""
  const slugChunk = normalizedSlug.split("/")
  const sliced = slugChunk.filter((item) => !!item)

  const crumbs = [
    // If homepage (e.g., "en"), set text to "home" translation
    ...(hasHome
      ? [
          {
            fullPath: "/",
            text: t("page-index-meta-title"),
          },
        ]
      : []),
    ...sliced.map((path, idx) => ({
      fullPath: "/" + sliced.slice(0, idx + 1).join("/"),
      text: t(path),
    })),
  ]
    .filter((item): item is Crumb => !!item)
    .slice(startDepth)

  return (
    <Breadcrumb {...props} dir={dir}>
      <BreadcrumbList>
        {crumbs.map(({ fullPath, text }) => {
          const isCurrentPage = normalizedSlug === fullPath
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
