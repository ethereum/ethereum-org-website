import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

import { TranslationKey } from "@/lib/types"
import type { DeveloperDocsLink } from "@/lib/interfaces"

import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import docLinks from "@/data/developer-docs-links.yaml"

import { useRtlFlip } from "@/hooks/useRtlFlip"
import { useTranslation } from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/routing"

const TextDiv = ({ children, className, ...props }) => (
  <div
    className={cn(
      "flex h-full w-full flex-col justify-center break-words p-4",
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
  docData: DocsArrayProps
  contentNotTranslated: boolean
  isPrev?: boolean
}

const CardLink = ({ docData, isPrev, contentNotTranslated }: CardLinkProps) => {
  const { t } = useTranslation("page-developers-docs")
  const { twFlipForRtl } = useRtlFlip()

  return (
    <BaseLink
      href={docData.href}
      className={cn(
        "group flex w-full items-center rounded-sm border border-primary bg-background !no-underline",
        isPrev ? "justify-start" : "justify-end",
        "hover:border-primary-hover"
      )}
      rel={isPrev ? "prev" : "next"}
      onClick={() => {
        trackCustomEvent({
          eventCategory: "next/previous article DocsNav",
          eventAction: "click",
          eventName: isPrev ? "previous" : "next",
        })
      }}
    >
      <div
        className={cn(
          "p-4",
          isPrev ? "order-0" : "order-1",
          !contentNotTranslated && twFlipForRtl
        )}
      >
        {isPrev ? (
          <FaChevronLeft className="text-xl group-hover:fill-primary-hover" />
        ) : (
          <FaChevronRight className="text-xl group-hover:fill-primary-hover" />
        )}
      </div>
      <TextDiv className={cn(isPrev ? "ps-0" : "pe-0 text-end")}>
        <p className="btn-txt !m-0 text-lg text-primary group-hover:text-primary-hover">
          {t(isPrev ? "previous" : "next")}
        </p>
        <p className="!mb-0 text-sm no-underline">{t(docData.id)}</p>
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
      {previousDoc ? (
        <CardLink
          docData={previousDoc}
          contentNotTranslated={contentNotTranslated}
          isPrev
        />
      ) : (
        <div className="hidden flex-grow xl:block" />
      )}
      {nextDoc ? (
        <CardLink
          docData={nextDoc}
          contentNotTranslated={contentNotTranslated}
        />
      ) : (
        <div className="hidden flex-grow xl:block" />
      )}
    </nav>
  )
}

export default DocsNav
