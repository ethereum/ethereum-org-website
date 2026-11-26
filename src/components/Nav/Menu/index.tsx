"use client"

import { BaseHTMLAttributes } from "react"
import { motion } from "motion/react"
import { useLocale } from "next-intl"
import {
  Content,
  Item,
  List,
  Root,
  Trigger,
  Viewport,
} from "@radix-ui/react-navigation-menu"

import { cn } from "@/lib/utils/cn"

import { MAIN_NAV_ID, SECTION_LABELS } from "@/lib/constants"

import { Button } from "../../ui/buttons/Button"
import type { NavSectionKey } from "../types"
import { useNavigation } from "../useNavigation"

import MenuPanel from "./MenuPanel"
import { useNavMenu } from "./useNavMenu"

import { usePathname } from "@/i18n/navigation"
import { getNavSectionForPath } from "@/lib/nav/buildNavigation"

// Radix reports `from-start`/`from-end` by item order; slide accordingly per writing direction
const contentMotion = cn(
  "motion-safe:ltr:data-[motion=from-start]:animate-nav-enter-from-left motion-safe:ltr:data-[motion=from-end]:animate-nav-enter-from-right",
  "motion-safe:ltr:data-[motion=to-start]:animate-nav-exit-to-left motion-safe:ltr:data-[motion=to-end]:animate-nav-exit-to-right",
  "motion-safe:rtl:data-[motion=from-start]:animate-nav-enter-from-right motion-safe:rtl:data-[motion=from-end]:animate-nav-enter-from-left",
  "motion-safe:rtl:data-[motion=to-start]:animate-nav-exit-to-right motion-safe:rtl:data-[motion=to-end]:animate-nav-exit-to-left"
)

const triggerClasses = (isCurrent: boolean) =>
  cn(
    "group relative gap-1 px-3 py-2 whitespace-nowrap lg:px-4 group-data-[density=compact]/navbar:px-2!",
    isCurrent ? "text-primary" : "text-body"
  )

type NavMenuProps = BaseHTMLAttributes<HTMLDivElement>

const Menu = (props: NavMenuProps) => {
  const { linkSections } = useNavigation()
  const locale = useLocale()
  const pathname = usePathname() || ""
  const currentSection = getNavSectionForPath(pathname)
  const {
    direction,
    value,
    onValueChange,
    triggerProps,
    listProps,
    viewportProps,
  } = useNavMenu()

  const track = (sectionKey: NavSectionKey) => (href: string) => ({
    eventCategory: "Desktop navigation menu",
    eventAction: `Menu - ${sectionKey} - ${locale}`,
    eventName: href,
  })

  return (
    <div {...props}>
      <Root
        dir={direction}
        value={value}
        onValueChange={onValueChange}
        className="h-full"
      >
        <List
          {...listProps}
          id={MAIN_NAV_ID}
          className="m-0 flex h-full list-none items-center"
        >
          {SECTION_LABELS.map((sectionKey) => {
            const section = linkSections[sectionKey]
            const isOpen = value === sectionKey
            const isCurrent = currentSection === sectionKey

            return (
              <Item key={sectionKey} value={sectionKey}>
                <Trigger asChild {...triggerProps(sectionKey)}>
                  <Button variant="ghost" className={triggerClasses(isCurrent)}>
                    {isOpen && (
                      <motion.div
                        layoutId="active-section-highlight"
                        className="absolute inset-0 z-0 rounded bg-primary-low-contrast"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <span
                      className={cn("relative z-10", isOpen && "text-primary")}
                    >
                      {section.label}
                    </span>
                  </Button>
                </Trigger>
                <Content
                  className={cn(
                    "absolute inset-x-0 top-0 max-h-[calc(100dvh-6rem)] overflow-y-auto",
                    contentMotion
                  )}
                >
                  <MenuPanel
                    sectionKey={sectionKey}
                    section={section}
                    pathname={pathname}
                    track={track(sectionKey)}
                  />
                </Content>
              </Item>
            )
          })}
        </List>

        {/* Positioned against the sticky nav bar, aligned with its padding. The gap
            is the viewport's margin: an empty padded box here showed as a white strip. */}
        <div className="pointer-events-none absolute inset-x-0 top-full px-4 xl:px-8">
          <Viewport
            {...viewportProps}
            className={cn(
              "pointer-events-auto relative mt-2 h-(--radix-navigation-menu-viewport-height) w-full max-w-6xl origin-top overflow-hidden",
              "rounded-base border bg-background text-body shadow-lg",
              "transition-[height] duration-200 ease-out motion-reduce:transition-none",
              "motion-safe:data-[state=closed]:animate-nav-panel-out motion-safe:data-[state=open]:animate-nav-panel-in"
            )}
          />
        </div>
      </Root>
    </div>
  )
}

export default Menu
