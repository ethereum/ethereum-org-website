import { getLocale } from "next-intl/server"

import { Lang } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { SECTION_LABELS } from "@/lib/constants"

import type { Level } from "../types"

import ExpandIcon from "./ExpandIcon"
import LvlAccordion from "./LvlAccordion"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./MenuAccordion"
import { TrackingAccordion } from "./TrackingAccordion"

import { getNavigation } from "@/lib/nav/links"

const MenuBody = async () => {
  const locale = await getLocale()
  const linkSections = await getNavigation(locale as Lang)

  return (
    <nav className="p-0">
      <TrackingAccordion locale={locale as Lang}>
        {SECTION_LABELS.map((key) => {
          const { label, items } = linkSections[key]

          return (
            <AccordionItem
              key={key}
              value={key}
              className="group/accordion-item border-b border-body-light first:border-t"
            >
              <AccordionTrigger className="text-body">
                <ExpandIcon />
                <span className="flex-1 text-start text-lg font-bold leading-none">
                  {label}
                </span>
              </AccordionTrigger>

              <AccordionContent
                className={cn(
                  "mt-0 bg-background-low p-0",
                  "group-data-[state=open]/accordion-item:border-t group-data-[state=open]/accordion-item:border-disabled"
                )}
              >
                <LvlAccordion
                  lvl={2 as Level}
                  items={items}
                  activeSection={key}
                />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </TrackingAccordion>
    </nav>
  )
}

export default MenuBody
