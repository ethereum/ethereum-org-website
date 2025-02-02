import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Text } from "@chakra-ui/react"

import { TranslationKey } from "@/lib/types"
import type { DeveloperDocsLink } from "@/lib/interfaces"

import { BaseLink } from "@/components/Link"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import docLinks from "@/data/developer-docs-links.yaml"

import { useRtlFlip } from "@/hooks/useRtlFlip"

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
  const { flipForRtl } = useRtlFlip()

  return (
    <BaseLink
      href={docData.href}
      className={cn(
        "flex w-full items-start items-center rounded-sm border border-primary bg-background !no-underline",
        isPrev ? "justify-start" : "justify-end",
        "hover:border-primary-hover hover:[&_.btn-txt]:text-primary-hover hover:[&_svg]:fill-primary-hover"
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
        className={cn("p-4", isPrev ? "order-0" : "order-1")}
        style={{ transform: contentNotTranslated ? undefined : flipForRtl }}
      >
        {isPrev ? (
          <FaChevronLeft className="fill-primary text-xl" />
        ) : (
          <FaChevronRight className="fill-primary text-xl" />
        )}
      </div>
      <TextDiv className={cn(isPrev ? "ps-0" : "pe-0 text-end")}>
        <Text className="btn-txt !m-0 text-lg text-primary">
          {t(isPrev ? "previous" : "next")}
        </Text>
        <Text className="!mb-0 text-sm no-underline">{t(docData.id)}</Text>
      </TextDiv>
    </BaseLink>
  )
}

type DocsNavProps = {
  contentNotTranslated: boolean
}

const DocsNav = ({ contentNotTranslated }: DocsNavProps) => {
  const { asPath } = useRouter()
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
      asPath.indexOf(docsArray[i].href) >= 0 &&
      asPath.length === docsArray[i].href.length
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
