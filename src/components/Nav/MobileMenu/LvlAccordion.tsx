import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { cn } from "@/lib/utils/cn"
// import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

import { Button } from "../../ui/buttons/Button"
import { BaseLink } from "../../ui/Link"
import type { Level, NavItem, NavSectionKey } from "../types"

import ExpandIcon from "./ExpandIcon"

type LvlAccordionProps = {
  lvl: Level
  items: NavItem[]
  activeSection: NavSectionKey
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

const LvlAccordion = async (props: LvlAccordionProps) => {
  return <LvlAccordionItems {...props} />
}
const LvlAccordionItems = async ({
  lvl,
  items,
  activeSection,
}: LvlAccordionProps) => {
  // const locale = await getLocale()
  // TODO: get pathname from the current page
  const pathname = "/"

  return (
    <>
      {items.map(({ label, description, ...action }) => {
        const isLink = "href" in action
        const isActivePage = isLink && cleanPath(pathname) === action.href

        if (isLink)
          return (
            <div
              key={label}
              className="border-t border-body-light last:border-b"
            >
              <p>
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
                    // onClick={() => {
                    //   trackCustomEvent({
                    //     eventCategory: "Mobile navigation menu",
                    //     eventAction: `Menu: ${locale} - ${activeSection}`,
                    //     eventName: action.href!,
                    //   })
                    // }}
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
              </p>
            </div>
          )

        return (
          <Collapsible
            key={label}
            className="border-t border-body-light last:border-b"
          >
            <CollapsibleTrigger
              className={cn(
                "group/menu flex w-full flex-1 items-center justify-between gap-2 px-4 py-4 font-medium transition-all hover:bg-background-highlight hover:text-primary-hover focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover group-data-[state=open]/menu:bg-background-highlight group-data-[state=open]/menu:text-primary-high-contrast md:px-4 [&[data-state=open]:dir(rtl)_[data-label=icon-container]>svg]:rotate-90 [&[data-state=open]_[data-label=icon-container]>svg]:-rotate-90",
                "flex h-full justify-start whitespace-normal px-4 py-4 text-start text-body no-underline",
                "text-body",
                nestedAccordionSpacingMap[lvl]
              )}
              // onClick={() => {
              //   trackCustomEvent({
              //     eventCategory: "Mobile navigation menu",
              //     eventAction: `Level ${lvl - 1} section changed`,
              //     eventName: `${
              //       isExpanded ? "Close" : "Open"
              //     } section: ${label} - ${description.slice(0, 16)}...`,
              //   })
              // }}
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
              />
            </CollapsibleContent>
          </Collapsible>
        )
      })}
    </>
  )
}

export default LvlAccordion
