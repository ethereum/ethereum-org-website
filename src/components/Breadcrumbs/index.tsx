import React from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type { Lang } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { isLangRightToLeft } from "@/lib/utils/translations"

import { BaseLink } from "../ui/Link"

// Ref: https://ui.shadcn.com/docs/components/breadcrumb
type RootBreadcrumbProps = React.ComponentPropsWithoutRef<"nav">

export type BreadcrumbsProps = RootBreadcrumbProps & {
  slug: string
  startDepth?: number
}

type Crumb = {
  fullPath: string
  text: string
}

const Breadcrumb = React.forwardRef<HTMLElement, RootBreadcrumbProps>(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
)
Breadcrumb.displayName = "Breadcrumb"

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

const Breadcrumbs = ({
  slug,
  startDepth = 0,
  className = "",
  ...props
}: BreadcrumbsProps) => {
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
    <Breadcrumb
      className={cn("flex flex-wrap items-center justify-start", className)}
      {...props}
    >
      {crumbs.map(({ fullPath, text }) => {
        const normalizePath = (path) => path.replace(/\/$/, "") // Remove trailing slash
        const isCurrentPage = normalizePath(slug) === normalizePath(fullPath)
        return (
          <div
            key={fullPath}
            className={cn(
              "inline-flex items-center tracking-wider",
              dir === "rtl" ? "flex-row-reverse" : ""
            )}
          >
            {!isCurrentPage && dir === "rtl" && (
              <span className="mx-2 text-gray-400">/</span>
            )}
            {isCurrentPage ? (
              <span className="uppercase text-primary">{text}</span>
            ) : (
              <BaseLink
                href={fullPath}
                className="uppercase !text-body-medium no-underline hover:!text-primary"
              >
                {text}
              </BaseLink>
            )}
            {!isCurrentPage && dir === "ltr" && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </div>
        )
      })}
    </Breadcrumb>
  )
}

export default Breadcrumbs
