import { Fragment } from "react"
import { useLocale, useTranslations } from "next-intl"

import type { Lang } from "@/lib/types"

import { getBreadcrumbTrail } from "@/lib/utils/breadcrumbs"
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

  return (
    <Breadcrumb {...props} dir={dir}>
      <BreadcrumbList>
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
