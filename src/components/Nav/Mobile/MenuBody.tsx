import { useState } from "react"
import { useRouter } from "next/router"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { SECTION_LABELS } from "@/lib/constants"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "../../../../tailwind/ui/accordion"
import type { Level, NavSections } from "../types"

import ExpandIcon from "./ExpandIcon"
import LvlAccordion from "./LvlAccordion"

import { useNavMenuColorsTw } from "@/hooks/useNavMenuColorsTw"

type MenuBodyProps = {
  onToggle: () => void
  linkSections: NavSections
}

const MenuBody = ({ linkSections, onToggle }: MenuBodyProps) => {
  const { locale } = useRouter()
  const menuColors = useNavMenuColorsTw()
  const [value, setValue] = useState("")

  return (
    <nav className="p-0">
      <Accordion
        type="single"
        collapsible
        value={value}
        onValueChange={setValue}
      >
        {SECTION_LABELS.map((key) => {
          const { label, items } = linkSections[key]
          const isExpanded = value === key

          return (
            <AccordionItem
              key={key}
              value={key}
              className="border-b border-body-light first:border-t"
            >
              <AccordionPrimitive.Header
                className="flex"
                onClick={() => {
                  trackCustomEvent({
                    eventCategory: "Mobile navigation menu",
                    eventAction: "Section changed",
                    eventName: `${
                      isExpanded ? "Close" : "Open"
                    } section: ${locale} - ${key}`,
                  })
                }}
                asChild
              >
                <h2>
                  <AccordionPrimitive.Trigger
                    className={cn(
                      "group flex flex-1 items-center justify-between gap-2 px-4 py-4 font-medium transition-all hover:bg-background-highlight focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover md:px-4 [&[data-state=open]]:bg-background-highlight [&[data-state=open]]:text-primary-high-contrast",
                      menuColors.body
                    )}
                  >
                    <ExpandIcon isOpen={isExpanded} />
                    <span className="flex-1 text-start text-lg font-bold leading-none">
                      {label}
                    </span>
                  </AccordionPrimitive.Trigger>
                </h2>
              </AccordionPrimitive.Header>

              <AccordionContent
                className={cn(
                  "mt-0 p-0",
                  isExpanded && "border-t border-disabled",
                  menuColors.lvl[2].background
                )}
              >
                <LvlAccordion
                  lvl={2 as Level}
                  items={items}
                  activeSection={key}
                  onToggle={onToggle}
                />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </nav>
  )
}

export default MenuBody
