import { useState } from "react"
import { useRouter } from "next/router"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { SECTION_LABELS } from "@/lib/constants"

import type { Level, NavSections } from "../types"

import ExpandIcon from "./ExpandIcon"
import LvlAccordion from "./LvlAccordion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./MenuAccordion"

type MenuBodyProps = {
  onToggle: () => void
  linkSections: NavSections
}

const MenuBody = ({ linkSections, onToggle }: MenuBodyProps) => {
  const { locale } = useRouter()
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
              <AccordionTrigger
                className="text-body"
                onClick={() => {
                  trackCustomEvent({
                    eventCategory: "Mobile navigation menu",
                    eventAction: "Section changed",
                    eventName: `${
                      isExpanded ? "Close" : "Open"
                    } section: ${locale} - ${key}`,
                  })
                }}
              >
                <ExpandIcon isOpen={isExpanded} />
                <span className="flex-1 text-start text-lg font-bold leading-none">
                  {label}
                </span>
              </AccordionTrigger>

              <AccordionContent
                className={cn(
                  "mt-0 bg-background-low p-0",
                  isExpanded && "border-t border-disabled"
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
