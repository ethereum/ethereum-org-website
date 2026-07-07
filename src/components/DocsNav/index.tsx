"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { TranslationKey } from "@/lib/types"
import type { DeveloperDocsLink } from "@/lib/interfaces"

import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import docLinks from "@/data/developer-docs-links.yaml"

import { useTranslation } from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/navigation"

const TextDiv = ({ children, className, ...props }) => (
  <div
    className={cn(
      "flex h-full w-full flex-col justify-center p-4 wrap-break-word",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

type DocsArrayProps = {
  href: string
  id: TranslationKey
}

type CardLinkProps = {
  docData: DocsArrayProps | null
  contentNotTranslated: boolean
  isPrev?: boolean
}

const CardLink = ({ docData, isPrev, contentNotTranslated }: CardLinkProps) => {
  const { t } = useTranslation("page-developers-docs")

  if (!docData) return <div className="flex-1" />

  return (
    <BaseLink
      href={docData.href}
      className={cn(
        "group flex w-full flex-1 items-center rounded-base border border-primary bg-background no-underline!",
        isPrev ? "justify-start" : "justify-end",
        "hover:border-primary-hover"
      )}
      rel={isPrev ? "prev" : "next"}
      customEventOptions={{
        eventCategory: "next/previous article DocsNav",
        eventAction: "click",
        eventName: isPrev ? "previous" : "next",
      }}
    >
      <div
        className={cn(
          "p-4",
          isPrev ? "order-0" : "order-1",
          !contentNotTranslated && "rtl:-scale-x-100"
        )}
      >
        {isPrev ? (
          <ChevronLeft className="text-xl group-hover:stroke-primary-hover" />
        ) : (
          <ChevronRight className="text-xl group-hover:stroke-primary-hover" />
        )}
      </div>
      <TextDiv className={cn(isPrev ? "ps-0" : "pe-0 text-end")}>
        <p className="btn-txt m-0! text-lg text-primary group-hover:text-primary-hover">
          {t(isPrev ? "previous" : "next")}
        </p>
        <p className="mb-0! text-sm no-underline">{t(docData.id)}</p>
      </TextDiv>
    </BaseLink>
  )
}

type DocsNavProps = {
  contentNotTranslated: boolean
}

const DocsNav = ({ contentNotTranslated }: DocsNavProps) => {
  const pathname = usePathname()
  // Construct array of all linkable documents in order recursively
  const docsArray: DocsArrayProps[] = []
  const getDocs = (links: Array<DeveloperDocsLink>): void => {
    // If object has 'items' key
    for (const item of links) {
      // And if item has a 'to' key
      // Add 'to' path and 'id' to docsArray
      if (item.items) {
        item.href && docsArray.push({ href: item.href, id: item.id })
        // Then recursively add sub-items
        getDocs(item.items)
      } else {
        // If object has no further 'items', add and continue
        docsArray.push({ href: item.href, id: item.id })
      }
    }
  }

  // Initiate recursive loop with full docLinks yaml
  getDocs(docLinks)

  // Find index that matches current page
  let currentIndex = 0
  for (let i = 0; i < docsArray.length; i++) {
    if (
      pathname.indexOf(docsArray[i].href) >= 0 &&
      pathname.length === docsArray[i].href.length
    ) {
      currentIndex = i
    }
  }

  // Extract previous and next doc based on current index +/- 1
  const previousDoc = currentIndex - 1 >= 0 ? docsArray[currentIndex - 1] : null
  const nextDoc =
    currentIndex + 1 < docsArray.length ? docsArray[currentIndex + 1] : null

  return (
    <nav
      className={cn(
        "flex flex-col-reverse md:flex-row lg:flex-col-reverse xl:flex-row",
        "mt-8 justify-between gap-4",
        "items-stretch"
      )}
      aria-label="Paginate to document"
    >
      <CardLink
        docData={previousDoc}
        contentNotTranslated={contentNotTranslated}
        isPrev
      />
      <CardLink docData={nextDoc} contentNotTranslated={contentNotTranslated} />
    </nav>
  )
}

export default DocsNav
