"use client"

import React, { type ReactNode, useState } from "react"
import type { AccordionContentProps } from "@radix-ui/react-accordion"

import { HStack } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

import { useTranslation } from "@/hooks/useTranslation"

export type ExpandableCardProps = {
  children?: ReactNode
  contentPreview?: ReactNode
  title: ReactNode
  svg?: React.FC<React.SVGProps<SVGElement>>
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
  svg: Svg,
  eventAction = "Clicked",
  eventCategory = "",
  eventName = "",
  visible = false,
  className,
  forceMount = true,
}: ExpandableCardProps) => {
  const [isVisible, setIsVisible] = useState(visible)
  const { t } = useTranslation("common")
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
        className={cn("mb-4", className)}
        defaultValue={visible ? "item-1" : undefined}
      >
        <AccordionItem
          value="item-1"
          className="rounded-2xl border hover:bg-background-highlight"
        >
          <AccordionTrigger
            hideIcon
            onClick={onClick}
            className={cn(
              "w-full gap-4 p-6 text-start max-sm:flex-col max-sm:items-start max-sm:space-y-4 md:p-6",
              "transition-color hover:transition-color cursor-pointer bg-transparent! text-body! data-[state=open]:text-body!"
            )}
          >
            <div className="flex-1 space-y-4">
              <HStack className="gap-6">
                {Svg && <Svg />}
                <h3 className="text-xl font-semibold">{title}</h3>
              </HStack>
              {contentPreview && (
                <p className="w-fit text-sm text-pretty text-body-medium">
                  {contentPreview}
                </p>
              )}
            </div>
            <span className="my-auto text-primary">
              {t(isVisible ? "less" : "more")}
            </span>
          </AccordionTrigger>
          <AccordionContent
            forceMount={forceMount}
            className={cn(
              "p-6! pt-0! text-md",
              forceMount &&
                "in-data-[state=closed]:hidden in-data-[state=closed]:h-0"
            )}
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
