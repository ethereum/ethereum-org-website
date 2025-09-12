import {
  CollapsibleContent,
  CollapsibleTracked,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { cn } from "@/lib/utils/cn"
import { slugify } from "@/lib/utils/url"

import { Button } from "../../ui/buttons/Button"
import { BaseLink } from "../../ui/Link"
import type { Level, NavItem, NavSectionKey } from "../types"

import ExpandIcon from "./ExpandIcon"

type LvlAccordionProps = {
  lvl: Level
  items: NavItem[]
  activeSection: NavSectionKey
  locale: string
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

const nestedAccordionSpacingMap = {
  2: "ps-8",
  3: "ps-12",
  4: "ps-16",
  5: "ps-20",
  6: "ps-24",
}

const LvlAccordion = async ({
  lvl,
  items,
  activeSection,
  locale,
}: LvlAccordionProps) => {
  return (
    <>
      {items.map(({ label, description, ...action }) => {
        const isLink = "href" in action

        if (isLink)
          return (
            <div
              key={label}
              className="border-t border-body-light last:border-b"
            >
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
                  isPartiallyActive={false}
                  activeClassName="is-active"
                  className="group/lnk block"
                  customEventOptions={{
                    eventCategory: "Mobile navigation menu",
                    eventAction: `Menu: ${locale} - ${activeSection}`,
                    eventName: action.href!,
                  }}
                >
                  <p
                    className={cn(
                      "text-md font-bold",
                      "text-body",
                      "group-[.is-active]/lnk:text-primary-high-contrast"
                    )}
                  >
                    {label}
                  </p>
                  <p
                    className={cn(
                      "text-sm font-normal",
                      subtextColorPerLevel[lvl],
                      "group-[.is-active]/lnk:text-primary-high-contrast"
                    )}
                  >
                    {description}
                  </p>
                </BaseLink>
              </Button>
            </div>
          )

        return (
          <CollapsibleTracked
            key={label}
            className="border-t border-body-light last:border-b"
            eventCategory="Mobile navigation menu"
            eventAction={`Level ${lvl - 1} section changed`}
            openEventName={`Open section: ${label} - ${description.slice(0, 16)}...`}
            closeEventName={`Close section: ${label} - ${description.slice(0, 16)}...`}
          >
            <CollapsibleTrigger
              data-testid={`mobile-menu-collapsible-${slugify(label)}`}
              className={cn(
                "group/menu flex w-full flex-1 items-center justify-between gap-2 px-4 py-4 font-medium transition-all hover:bg-background-highlight hover:text-primary-hover focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover group-data-[state=open]/menu:bg-background-highlight group-data-[state=open]/menu:text-primary-high-contrast md:px-4 [&[data-state=open]:dir(rtl)_[data-label=icon-container]>svg]:rotate-90 [&[data-state=open]_[data-label=icon-container]>svg]:-rotate-90",
                "flex h-full justify-start whitespace-normal px-4 py-4 text-start text-body no-underline",
                "text-body",
                nestedAccordionSpacingMap[lvl]
              )}
            >
              <ExpandIcon />
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
            </CollapsibleTrigger>

            <CollapsibleContent
              className={cn(
                "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
                "mt-0 p-0",
                backgroundColorPerLevel[lvl]
              )}
            >
              <LvlAccordion
                lvl={(lvl + 1) as Level}
                items={action.items}
                activeSection={activeSection}
                locale={locale}
              />
            </CollapsibleContent>
          </CollapsibleTracked>
        )
      })}
    </>
  )
}

export default LvlAccordion
