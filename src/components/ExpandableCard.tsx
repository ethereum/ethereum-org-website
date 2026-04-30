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
  forceMount,
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
          className="rounded-xs border hover:bg-background-highlight"
        >
          <AccordionTrigger
            hideIcon
            onClick={onClick}
            className="transition-color hover:transition-color w-full cursor-pointer bg-transparent! p-6 text-body! data-[state=open]:text-body! md:p-6"
          >
            <div className="flex w-full flex-col items-center gap-4 text-left sm:flex-row">
              <div className="flex-1 space-y-4">
                <HStack className="gap-6">
                  {Svg && <Svg />}
                  <h3 className="text-xl font-semibold">{title}</h3>
                </HStack>
                <p className="w-fit text-sm text-pretty text-body-medium">
                  {contentPreview}
                </p>
              </div>
              <span className="my-auto text-primary">
                {t(isVisible ? "less" : "more")}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent
            forceMount={forceMount}
            className={cn(
              "p-6 pt-0 md:p-6 md:pt-0",
              forceMount &&
                "in-data-[state=closed]:hidden in-data-[state=closed]:h-0"
            )}
          >
            <div className="border-t pt-6 text-md text-body">{children}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default ExpandableCard
