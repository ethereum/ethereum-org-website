import { useState } from "react"
import { useRouter } from "next/router"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

import { Button } from "../../ui/buttons/Button"
import { BaseLink } from "../../ui/Link"
import type { Level, NavItem, NavSectionKey } from "../types"

import ExpandIcon from "./ExpandIcon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./MenuAccordion"

type LvlAccordionProps = {
  lvl: Level
  items: NavItem[]
  activeSection: NavSectionKey
  onToggle: () => void
}

const subtextColorPerLevel = {
  1: "text-menu-1-subtext",
  2: "text-menu-2-subtext",
  3: "text-menu-3-subtext",
  4: "text-menu-4-subtext",
}

const backgroundColorPerLevel = {
  1: "bg-background",
  2: "bg-background-low",
  3: "bg-background-medium",
  4: "bg-background-high",
}

const LvlAccordion = ({
  lvl,
  items,
  activeSection,
  onToggle,
}: LvlAccordionProps) => {
  const { asPath, locale } = useRouter()
  const [value, setValue] = useState("")

  return (
    <Accordion type="single" collapsible value={value} onValueChange={setValue}>
      {items.map(({ label, description, ...action }) => {
        const isLink = "href" in action
        const isActivePage = isLink && cleanPath(asPath) === action.href
        const isExpanded = value === label

        const nestedAccordionSpacingMap = {
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
              className="border-t border-body-light last:border-b"
            >
              <AccordionPrimitive.Trigger asChild>
                {/* TODO: replace this with ButtonLink when is implemented */}
                <Button
                  className={cn(
                    "flex h-full justify-start whitespace-normal px-4 py-4 text-start text-body no-underline",
                    nestedAccordionSpacingMap[lvl + 2]
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
                          isActivePage
                            ? "text-primary-high-contrast"
                            : "text-body"
                        )}
                      >
                        {label}
                      </p>
                      <p
                        className={cn(
                          "text-sm font-normal",
                          isActivePage
                            ? "text-primary-high-contrast"
                            : subtextColorPerLevel[lvl]
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
            <AccordionTrigger
              heading={`h${lvl + 1}` as "h2" | "h3" | "h4" | "h5"}
              className={cn("text-body", nestedAccordionSpacingMap[lvl])}
              onClick={() => {
                trackCustomEvent({
                  eventCategory: "Mobile navigation menu",
                  eventAction: `Level ${lvl - 1} section changed`,
                  eventName: `${
                    isExpanded ? "Close" : "Open"
                  } section: ${label} - ${description.slice(0, 16)}...`,
                })
              }}
            >
              <ExpandIcon isOpen={isExpanded} />
              <div>
                <p className="flex-1 text-md font-bold leading-tight text-body">
                  {label}
                </p>
                <p
                  className={cn(
                    "text-sm font-normal leading-tight",
                    subtextColorPerLevel[lvl]
                  )}
                >
                  {description}
                </p>
              </div>
            </AccordionTrigger>

            <AccordionContent
              className={cn("mt-0 p-0", backgroundColorPerLevel[lvl])}
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
