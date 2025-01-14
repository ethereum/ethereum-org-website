import { BaseHTMLAttributes, ReactNode, useState } from "react"
import { useTranslation } from "next-i18next"

import type { ChildOnlyProp } from "@/lib/types"

import { Flex } from "@/components/ui/flex"
import { Tag } from "@/components/ui/tag"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../tailwind/ui/accordion"
import Emoji from "../Emoji"

import { accordionButtonContent, CategoryNameType } from "./utils"

type LeftColumnPanelElement = BaseHTMLAttributes<HTMLDivElement>

export const LeftColumnPanel = (
  props: ChildOnlyProp & LeftColumnPanelElement
) => (
  <div
    className="flex-shrink-0 flex-grow-0 basis-1/2 lg:me-16 lg:max-w-[75%]"
    {...props}
  />
)

export const RightColumnPanel = (props: ChildOnlyProp) => (
  <LeftColumnPanel
    className="me-0 mt-12 flex-shrink flex-grow-0 basis-1/2 lg:mt-0"
    {...props}
  />
)

const MoreOrLessLink = ({ isOpen }: { isOpen: boolean }) => {
  const { t } = useTranslation("page-stablecoins")

  return (
    <div className="me-6 text-md text-primary">
      {isOpen
        ? t("page-stablecoins-accordion-less")
        : t("page-stablecoins-accordion-more")}
    </div>
  )
}

interface AccordionCustomItemProps {
  /**
   * The category name of each accordion section
   */
  category: CategoryNameType
  children: ReactNode
}

export const AccordionCustomItem = (props: AccordionCustomItemProps) => {
  const { category, children } = props
  const { t } = useTranslation("page-stablecoins")
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  const contentObj = accordionButtonContent[category]

  return (
    <AccordionItem value={contentObj.title} className="border">
      <AccordionTrigger
        hideIcon
        className="items-center justify-between px-0 py-0 text-body-medium hover:text-body-medium md:px-0"
        onClick={handleOpen}
      >
        <Flex
          className="lg:center m-6 me-4 flex-col items-start md:flex-row"
          {...props}
        >
          <Emoji
            text={contentObj.emoji}
            className="mb-2 me-6 text-5xl md:mb-0 md:text-6xl"
          />
          <div>
            <Flex className="mb-2 items-center">
              <h3 className="text-xl text-body hover:text-body md:text-2xl">
                {t(contentObj.title)}
              </h3>
              {!!contentObj.pill && (
                <Tag
                  className="ms-4"
                  variant="solid"
                  status={contentObj.pill.color}
                >
                  {t(contentObj.pill.name)}
                </Tag>
              )}
            </Flex>
            <p className="text-start text-md text-body-medium">
              {t(contentObj.textPreview)}
            </p>
          </div>
        </Flex>
        <MoreOrLessLink isOpen={open} />
      </AccordionTrigger>
      <AccordionContent className="-mx-px -mb-px mt-0 border border-border bg-background p-0 text-md md:p-0">
        <Flex className="flex-col justify-between p-8 lg:flex-row">
          {children}
        </Flex>
      </AccordionContent>
    </AccordionItem>
  )
}
