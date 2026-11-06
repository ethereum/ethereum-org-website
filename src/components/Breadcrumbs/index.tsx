import { Fragment } from "react"
import { useLocale, useTranslations } from "next-intl"

import type { Lang } from "@/lib/types"

import { getBreadcrumbTrail } from "@/lib/utils/breadcrumbs"
import { isLangRightToLeft } from "@/lib/utils/translations"

import EthGlyphOutline from "../icons/eth-glyph-outline.svg"
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
  /** Page path; the trail comes from the IA map in `@/data/breadcrumbs` */
  slug: string
  /** Current-page text for pages whose label is not a `common` key */
  label?: string
}

const Breadcrumbs = ({ slug, label, ...props }: BreadcrumbsProps) => {
  const t = useTranslations("common")
  const locale = useLocale()
  const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

  const trail = getBreadcrumbTrail(slug)
  if (!trail.length) return null

  // Below a hub the text root crumb is dropped; a glyph stands in for it
  const showGlyph = trail[0].href !== "/"

  return (
    <Breadcrumb {...props} dir={dir}>
      <BreadcrumbList>
        {showGlyph && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="relative inline-block h-lh w-6"
              >
                <EthGlyphOutline
                  aria-hidden="true"
                  className="absolute top-1/2 left-0 size-6 -translate-y-1/2"
                />
                <span className="sr-only">ethereum.org</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ms-2.5 me-2.5 text-gray-400">
              /
            </BreadcrumbSeparator>
          </>
        )}
        {trail.map(({ href, labelKey }, idx) => {
          const isCurrentPage = idx === trail.length - 1
          const text =
            isCurrentPage && label
              ? label
              : labelKey
                ? t(labelKey)
                : "ethereum.org"
          return (
            <Fragment key={href}>
              <BreadcrumbItem>
                {isCurrentPage ? (
                  <BreadcrumbPage>{text}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{text}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isCurrentPage && (
                <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
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
