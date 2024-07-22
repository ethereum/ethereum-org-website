import { useState } from "react"
import { useRouter } from "next/router"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

import { BaseLink } from "../../../../tailwind/Link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "../../../../tailwind/ui/accordion"
import type { Level, NavItem, NavSectionKey } from "../types"

import ExpandIcon from "./ExpandIcon"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"

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
  const [value, setValue] = useState("")

  return (
    <Accordion type="single" collapsible value={value} onValueChange={setValue}>
      {items.map(({ label, description, ...action }) => {
        const isLink = "href" in action
        const isActivePage = isLink && cleanPath(asPath) === action.href
        const isExpanded = value === label

        const Heading = `h${lvl + 1}` as "h2" | "h3" | "h4" | "h5"
        const headingMap = {
          2: "ps-8",
          3: "ps-12",
          4: "ps-16",
          5: "ps-20",
          6: "ps-24",
        }

        if (isLink)
          return (
            <AccordionItem
              key={label}
              value={label}
              className={cn("border-t border-body-light last:border-b")}
            >
              <AccordionPrimitive.Trigger asChild>
                {/* TODO: replace this with ButtonLink when is implemented */}
                <Button
                  className={cn(
                    "flex h-full justify-start whitespace-normal px-4 py-4 text-start text-body no-underline",
                    headingMap[lvl + 2]
                  )}
                  variant="ghost"
                  asChild
                >
                  <BaseLink
                    href={action.href}
                    onClick={() => {
                      trackCustomEvent({
                        eventCategory: "Mobile navigation menu",
                        eventAction: `Menu: ${locale} - ${activeSection}`,
                        eventName: action.href!,
                      })
                      onToggle()
                    }}
                  >
                    <div>
                      <p
                        className={cn(
                          "text-md font-bold",
                          isActivePage ? menuColors.active : menuColors.body
                        )}
                      >
                        {label}
                      </p>
                      <p
                        className={cn(
                          "text-sm font-normal",
                          isActivePage
                            ? menuColors.active
                            : menuColors.lvl[lvl].subtext
                        )}
                      >
                        {description}
                      </p>
                    </div>
                  </BaseLink>
                </Button>
              </AccordionPrimitive.Trigger>
            </AccordionItem>
          )

        return (
          <AccordionItem
            key={label}
            value={label}
            className="border-t border-body-light last:border-b"
          >
            <AccordionPrimitive.Header
              className="flex"
              onClick={() => {
                trackCustomEvent({
                  eventCategory: "Mobile navigation menu",
                  eventAction: `Level ${lvl - 1} section changed`,
                  eventName: `${
                    isExpanded ? "Close" : "Open"
                  } section: ${label} - ${description.slice(0, 16)}...`,
                })
              }}
              asChild
            >
              <Heading>
                <AccordionPrimitive.Trigger
                  className={cn(
                    "group flex flex-1 items-center justify-start gap-2 px-4 py-4 text-start font-medium transition-all hover:bg-background-highlight focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover md:px-4 [&[data-state=open]]:bg-background-highlight [&[data-state=open]]:text-primary-high-contrast",
                    headingMap[lvl],
                    menuColors.body
                  )}
                >
                  <ExpandIcon isOpen={isExpanded} />
                  <div>
                    <p
                      className={cn(
                        "flex-1 text-md font-bold leading-tight",
                        menuColors.body
                      )}
                    >
                      {label}
                    </p>
                    <p
                      className={cn(
                        "text-sm font-normal leading-tight",
                        menuColors.lvl[lvl].subtext
                      )}
                    >
                      {description}
                    </p>
                  </div>
                </AccordionPrimitive.Trigger>
              </Heading>
            </AccordionPrimitive.Header>

            <AccordionContent
              className={cn("mt-0 p-0", menuColors.lvl[lvl + 1].background)}
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
