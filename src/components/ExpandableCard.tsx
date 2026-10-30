"use client"
import React, { type ReactNode, useId, useState } from "react"
import { useTranslations } from "next-intl"
import type { AccordionContentProps } from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { slugify } from "@/lib/utils/url"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

export type ExpandableCardProps = {
  children?: ReactNode
  contentPreview?: ReactNode
  title: ReactNode
  /** Heading anchor; defaults to a slug of `title` when it is a string */
  id?: string
  svg?: ReactNode
  eventAction?: string
  eventCategory?: string
  eventName?: string
  visible?: boolean
  className?: string
} & Pick<AccordionContentProps, "forceMount">

const ExpandableCard = ({
  children,
  contentPreview,
  title,
  id,
  svg,
  eventAction = "Clicked",
  eventCategory = "",
  eventName = "",
  visible = false,
  className,
  forceMount = true,
}: ExpandableCardProps) => {
  const [isVisible, setIsVisible] = useState(visible)
  const t = useTranslations("common")
  // ARIA reference only, never a URL anchor, so a generated id is fine
  const previewId = useId()
  // Stable anchor so search/deep links don't fall back to Radix's per-build useId
  const headingId =
    id ??
    (typeof title === "string"
      ? slugify(title, { unicode: true }) || undefined
      : undefined)
  const matomo = {
    eventAction,
    eventCategory: `ExpandableCard${eventCategory}`,
    eventName,
  }
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    // Card will not collapse if clicking on a link or selecting text
    if (
      window.getSelection()?.toString().length === 0 &&
      !(
        (e.target as Element).closest(".ExternalLink") as HTMLDivElement
      )?.className.includes("ExternalLink")
    ) {
      !isVisible && trackCustomEvent(matomo)
      setIsVisible(!isVisible)
    }
  }

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className={className}
        defaultValue={visible ? "item-1" : undefined}
      >
        <AccordionItem
          value="item-1"
          className="rounded-base border hover:bg-background-highlight"
        >
          {/* Only the title sits in the heading/button; the overlay keeps the whole row clickable */}
          <div className="relative flex gap-4 p-6 max-sm:flex-col max-sm:items-start max-sm:space-y-4">
            <div className="flex-1 space-y-4">
              <AccordionTrigger
                hideIcon
                headingId={headingId}
                onClick={onClick}
                aria-describedby={contentPreview ? previewId : undefined}
                className={cn(
                  "justify-start gap-6 p-0 text-start md:p-0",
                  "cursor-pointer bg-transparent! text-body! data-[state=open]:text-body!",
                  "after:absolute after:inset-0 after:rounded-base focus-visible:outline-none focus-visible:after:outline-1 focus-visible:after:-outline-offset-1 focus-visible:after:outline-primary-hover"
                )}
              >
                {svg}
                <span className="text-xl font-semibold text-pretty">
                  {title}
                </span>
              </AccordionTrigger>
              {contentPreview && (
                <p
                  id={previewId}
                  className="w-fit text-sm text-pretty text-body-medium"
                >
                  {contentPreview}
                </p>
              )}
            </div>
            <span aria-hidden className="my-auto text-primary">
              {t(isVisible ? "less" : "more")}
            </span>
          </div>
          <AccordionContent
            forceMount={forceMount}
            className="p-6! pt-0! text-md"
          >
            <div className="space-y-[1lh] border-t pt-6 [&>p]:first:mt-0 [&>p]:last:mb-0">
              {children}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default ExpandableCard
