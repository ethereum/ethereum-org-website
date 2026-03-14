"use client"

import React from "react"
import { useTranslations } from "next-intl"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { ChevronNext } from "@/components/Chevron"
import { Accordion, AccordionItem } from "@/components/ui/accordion"

import { cn } from "@/lib/utils/cn"

interface TranscriptProps {
  children: React.ReactNode
  className?: string
}

const Transcript = ({ children, className }: TranscriptProps) => {
  const t = useTranslations("page-videos")

  return (
    <div className={cn("mb-8", className)}>
      <Accordion type="single" collapsible>
        <AccordionItem value="transcript">
          {/* Custom h2 header for proper heading hierarchy (landing page has h1 for video title) */}
          <h2 className="flex [font-size:inherit]">
            <AccordionPrimitive.Trigger
              className={cn(
                "flex flex-1 items-center justify-between gap-2 px-2 py-2 font-medium transition-all hover:bg-background-highlight hover:text-primary-hover focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover md:px-4 [&[data-state=open]:dir(rtl)_[data-label=icon-container]>svg]:rotate-90 [&[data-state=open]]:bg-background-highlight [&[data-state=open]]:text-primary-high-contrast [&[data-state=open]_[data-label=icon-container]>svg]:-rotate-90",
                "flex w-full items-center justify-between py-4 transition-all hover:text-primary-hover [&[data-state=open]>svg]:rotate-180"
              )}
            >
              <span className="text-left text-xl font-semibold">
                {t("view-transcript")}
              </span>
              <div data-label="icon-container">
                <ChevronNext className="size-[1em] shrink-0 text-2xl transition-transform duration-200" />
              </div>
            </AccordionPrimitive.Trigger>
          </h2>
          {/* forceMount keeps transcript in DOM for SEO crawlers;
                        h-0/overflow-hidden hides it visually when collapsed */}
          <AccordionPrimitive.Content
            forceMount
            className="overflow-hidden transition-all data-[state=closed]:h-0 data-[state=open]:h-auto"
          >
            <div className="p-2 md:p-4">{children}</div>
          </AccordionPrimitive.Content>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Transcript
