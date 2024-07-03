import { useRouter } from "next/router"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

import type { Level, NavItem, NavSectionKey } from "../types"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type LvlAccordionProps = {
  lvl: Level
  items: NavItem[]
  activeSection: NavSectionKey
  onToggle: () => void
}

const LvlAccordion = ({
  lvl,
  items,
  activeSection,
  onToggle,
}: LvlAccordionProps) => {
  const { asPath, locale } = useRouter()
  const menuColors = useNavMenuColors()
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map(({ label, description, ...action }) => {
        const isLink = "href" in action
        const isActivePage = isLink && cleanPath(asPath) === action.href
        if (isLink)
          return (
            <AccordionItem
              key={label}
              value={label}
              className="border-t border-inherit last:border-b"
            >
              <Button
                variant="ghost"
                className={`w-full variant-ghost border-none border-${
                  menuColors.stroke
                } justify-start gap-2 ps-${(lvl + 2) * 4} py-4 hover:text-${
                  menuColors.highlight
                }`}
                onClick={() => {
                  trackCustomEvent({
                    eventCategory: "Mobile navigation menu",
                    eventAction: `Menu: ${locale} - ${activeSection}`,
                    eventName: action.href!,
                  })
                  onToggle()
                }}
                asChild
              >
                <Link href={action.href!}>
                  <div className="flex-1 text-start">
                    <p
                      className={`font-bold text-md text-${
                        isActivePage ? menuColors.active : menuColors.body
                      }`}
                    >
                      {label}
                    </p>
                    <p
                      className={`font-normal text-sm text-${
                        isActivePage
                          ? menuColors.active
                          : menuColors.lvl[lvl].subtext
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </Link>
              </Button>
            </AccordionItem>
          )
        return (
          <AccordionItem
            key={label}
            value={label}
            className="border-t border-inherit last:border-b"
          >
            <AccordionTrigger>
              <h2
                className={`py-0 text-${menuColors.body} border-${menuColors.stroke}`}
              >
                <div className="flex-1 text-start">
                  <p className={`font-bold text-md text-${menuColors.body}`}>
                    {label}
                  </p>
                  <p
                    className={`font-normal text-sm text-${menuColors.lvl[lvl].subtext}`}
                  >
                    {description}
                  </p>
                </div>
              </h2>
            </AccordionTrigger>

            <AccordionContent
              className="p-0 mt-0"
              style={{ backgroundColor: menuColors.lvl[lvl + 1].background }}
            >
              <LvlAccordion
                lvl={(lvl + 1) as Level}
                items={action.items}
                activeSection={activeSection}
                onToggle={onToggle}
              />
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default LvlAccordion
