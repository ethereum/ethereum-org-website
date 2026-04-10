"use client"

import React, { type ReactNode, useState } from "react"

import { Flex, HStack, VStack } from "@/components/ui/flex"

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
}

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
}: ExpandableCardProps) => {
  const [isVisible, setIsVisible] = useState(visible)
  const { t } = useTranslation("common")
  const matomo = {
    eventAction,
    eventCategory: `ExpandableCard${eventCategory}`,
    eventName,
  }
  const onClick = () => {
    // Card will not collapse if clicking on a link or selecting text
    if (
      window.getSelection()?.toString().length === 0 &&
      !(window.event?.target as HTMLDivElement)?.className.includes(
        "ExternalLink"
      )
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
          className="hover:bg-background-highlight rounded-xs border"
        >
          <AccordionTrigger
            hideIcon
            onClick={onClick}
            className="hover:bg-background-highlight w-full p-6 transition-colors hover:text-black md:p-6 dark:hover:text-white [&[data-state=open]]:bg-transparent [&[data-state=open]]:text-black dark:[&[data-state=open]]:text-white"
          >
            <Flex className="w-full flex-col items-center text-left sm:flex-row">
              <VStack className="items-center md:items-start">
                <HStack className="mt-4 mb-2">
                  {Svg && <Svg className="mr-6" />}
                  <h3 className="text-xl font-semibold">{title}</h3>
                </HStack>
                <p className="text-body-medium w-fit text-sm">
                  {contentPreview}
                </p>
              </VStack>
              <span className="text-md text-primary my-auto sm:ml-auto">
                {t(isVisible ? "less" : "more")}
              </span>
            </Flex>
          </AccordionTrigger>
          <AccordionContent className="p-6 pt-0 md:p-6 md:pt-0">
            <div className="text-md text-body border-t pt-6">{children}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default ExpandableCard
