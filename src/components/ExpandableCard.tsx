import React, { type ReactNode, useState } from "react"
import { useTranslation } from "next-i18next"

import { Flex, HStack, VStack } from "@/components/ui/flex"

import { trackCustomEvent } from "@/lib/utils/matomo"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../tailwind/ui/accordion"

export type ExpandableCardProps = {
  children?: ReactNode
  contentPreview?: ReactNode
  title: ReactNode
  svg?: React.ElementType
  eventAction?: string
  eventCategory?: string
  eventName?: string
}

const ExpandableCard = ({
  children,
  contentPreview,
  title,
  svg: Svg,
  eventAction = "Clicked",
  eventCategory = "",
  eventName = "",
}: ExpandableCardProps) => {
  const [isVisible, setIsVisible] = useState(false)
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
      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem
          value="item-1"
          className="rounded-sm border border-gray-200/50 hover:bg-gray-100/50 dark:border-gray-600 dark:hover:bg-gray-800"
        >
          <AccordionTrigger
            hideIcon
            onClick={onClick}
            className="w-full p-6 transition-colors hover:bg-gray-50 hover:text-black md:p-6 dark:hover:bg-gray-800 dark:hover:text-white [&[data-state=open]]:bg-transparent [&[data-state=open]]:text-black dark:[&[data-state=open]]:text-white"
          >
            <Flex className="w-full flex-col items-center text-left sm:flex-row">
              <VStack className="items-center">
                <HStack className="mb-2 mt-4">
                  {Svg && <Svg className="mr-6" />}
                  <h3 className="text-xl font-semibold">{title}</h3>
                </HStack>
                <p className="mb-0 w-fit text-sm text-gray-600">
                  {contentPreview}
                </p>
              </VStack>
              <span className="my-auto text-md text-purple-600 sm:ml-auto dark:text-purple-400">
                {t(isVisible ? "less" : "more")}
              </span>
            </Flex>
          </AccordionTrigger>
          <AccordionContent className="cursor-pointer p-6 pt-0 md:p-6 md:pt-0">
            <div className="border-t border-gray-200 pt-6 text-md text-gray-800 dark:border-gray-600 dark:text-white">
              {children}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default ExpandableCard
