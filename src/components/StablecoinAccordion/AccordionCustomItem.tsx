import { BaseHTMLAttributes, ReactNode, useState } from "react"

import type { ChildOnlyProp } from "@/lib/types"

import { Flex } from "@/components/ui/flex"
import { Tag, TagProps } from "@/components/ui/tag"

import Emoji from "../Emoji"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

import { accordionButtonContent, CategoryNameType } from "./utils"

import { useTranslation } from "@/hooks/useTranslation"

type LeftColumnPanelElement = BaseHTMLAttributes<HTMLDivElement>

export const LeftColumnPanel = (
  props: ChildOnlyProp & LeftColumnPanelElement
) => (
  <div
    className="shrink-0 grow-0 basis-1/2 lg:me-16 lg:max-w-[75%]"
    {...props}
  />
)

export const RightColumnPanel = (props: ChildOnlyProp) => (
  <LeftColumnPanel
    className="me-0 mt-12 shrink grow-0 basis-1/2 lg:mt-0"
    {...props}
  />
)

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
        className="text-body-medium hover:text-body-medium items-center justify-between py-0 ps-0"
        onClick={handleOpen}
      >
        <Flex
          className="lg:center m-6 me-4 flex-col items-start md:flex-row"
          {...props}
        >
          <Emoji
            text={contentObj.emoji}
            className="me-6 mb-2 text-5xl md:mb-0 md:text-6xl"
          />
          <div>
            <Flex className="mb-2 items-center">
              <h3 className="text-body hover:text-body text-xl md:text-2xl">
                {t(contentObj.title)}
              </h3>
              {!!contentObj.tag && (
                <Tag
                  status={contentObj.tag.status as TagProps["status"]}
                  className="ms-4"
                >
                  {t(contentObj.tag.name)}
                </Tag>
              )}
            </Flex>
            <p className="text-md text-body-medium text-start">
              {t(contentObj.textPreview)}
            </p>
          </div>
        </Flex>
      </AccordionTrigger>
      <AccordionContent className="border-border bg-background text-md -mx-px mt-0 -mb-px border p-0 md:p-0">
        <Flex className="flex-col justify-between p-8 lg:flex-row">
          {children}
        </Flex>
      </AccordionContent>
    </AccordionItem>
  )
}
