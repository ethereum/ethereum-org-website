"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"

import { ChevronNext } from "@/components/Chevron"
import { ArrowNext } from "@/components/ui/arrow"
import { Button } from "@/components/ui/buttons/Button"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { isHrefActive } from "@/lib/utils/url"

import { SECTION_LABELS } from "@/lib/constants"

import { FeaturedCard, GroupHeading, HubCard } from "../Menu/MenuPanel"
import type { NavSectionKey } from "../types"
import { NAV_SECTION_ICONS, useNavigation } from "../useNavigation"

import MenuHeader from "./MenuHeader"

import { useRtlFlip } from "@/hooks/useRtlFlip"
import { usePathname } from "@/i18n/navigation"
import { getNavSectionForPath } from "@/lib/nav/buildNavigation"

const slide = {
  enter: (direction: number) => ({ x: `${direction * 100}%`, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: `${direction * -25}%`, opacity: 0 }),
}

const rowClasses =
  "flex h-auto w-full items-center justify-start gap-4 rounded-none px-6 py-4 text-start whitespace-normal text-body no-underline hover:bg-background-highlight"

type View = {
  key: NavSectionKey | null
  /** Section the user just came back from, to return focus to its row */
  from: NavSectionKey | null
  direction: number
  path: string
}

/**
 * Mobile navigation as a two-level drill-down: sections, then one section with
 * every link visible. Any page is two taps from the menu.
 */
const DrillDownNav = ({ className }: { className?: string }) => {
  const t = useTranslations("common")
  const locale = useLocale()
  const pathname = usePathname() || ""
  const { isRtl } = useRtlFlip()
  const reduceMotion = useReducedMotion()
  const { linkSections } = useNavigation()
  const currentSection = getNavSectionForPath(pathname)
  const scrollRef = useRef<HTMLElement>(null)
  const [view, setView] = useState<View>({
    key: null,
    from: null,
    direction: 1,
    path: pathname,
  })
  // A navigation resets the menu to its first level
  const activeKey = view.path === pathname ? view.key : null

  const go = (key: NavSectionKey | null) => {
    trackCustomEvent({
      eventCategory: "Mobile navigation menu",
      eventAction: "Section changed",
      eventName: `${key ? "Open" : "Close"} section: ${locale} - ${key ?? activeKey}`,
    })
    setView({
      key,
      from: key ? null : activeKey,
      direction: (key ? 1 : -1) * (isRtl ? -1 : 1),
      path: pathname,
    })
    scrollRef.current?.scrollTo({ top: 0 })
  }

  const track = (key: NavSectionKey) => (href: string) => ({
    eventCategory: "Mobile navigation menu",
    eventAction: `Menu: ${locale} - ${key}`,
    eventName: href,
  })

  const section = activeKey ? linkSections[activeKey] : null

  return (
    <>
      {activeKey && section ? (
        <MenuHeader title={section.label} onBack={() => go(null)} />
      ) : (
        <MenuHeader />
      )}
      <nav
        ref={scrollRef}
        aria-label={t("nav-primary")}
        className={cn("relative overflow-x-hidden", className)}
      >
        <AnimatePresence
          initial={false}
          mode="popLayout"
          custom={view.direction}
        >
          <motion.div
            key={activeKey ?? "root"}
            custom={view.direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "tween", ease: "easeOut", duration: 0.25 }
            }
          >
            {activeKey && section ? (
              <div className="space-y-8 px-6 py-6">
                <div className="grid gap-3">
                  <HubCard
                    sectionKey={activeKey}
                    hub={section.hub}
                    track={track(activeKey)}
                  />
                  {section.featured && (
                    <FeaturedCard
                      featured={section.featured}
                      track={track(activeKey)}
                    />
                  )}
                </div>

                {section.groups.map((group) => {
                  const headingId = `mobile-nav-${group.id.replace("/", "-")}`
                  return (
                    <div key={group.id}>
                      <GroupHeading
                        group={group}
                        headingId={headingId}
                        track={track(activeKey)}
                      />
                      <ul
                        aria-labelledby={headingId}
                        className="m-0 mt-2 list-none"
                      >
                        {group.items.map(({ label, href }) => {
                          const isActive = isHrefActive(href, pathname, false)
                          return (
                            <li key={href} className="mb-0">
                              <BaseLink
                                href={href}
                                isPartiallyActive={false}
                                activeClassName=""
                                aria-current={isActive ? "page" : undefined}
                                customEventOptions={track(activeKey)(href)}
                                className={cn(
                                  "-mx-3 flex min-h-11 items-center rounded-md px-3 py-2 text-body no-underline hover:bg-background-highlight",
                                  isActive &&
                                    "bg-background-highlight font-bold text-primary"
                                )}
                              >
                                {label}
                              </BaseLink>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })}
              </div>
            ) : (
              <ul className="m-0 list-none">
                {SECTION_LABELS.map((key) => {
                  const { label, hub, linkOnly } = linkSections[key]
                  const Icon = NAV_SECTION_ICONS[key]
                  const isCurrent = currentSection === key
                  const content = (
                    <>
                      <Icon
                        className="size-6 shrink-0 text-primary"
                        aria-hidden
                      />
                      <span className="flex-1">
                        <span
                          className={cn(
                            "block text-lg leading-snug font-bold",
                            isCurrent && "text-primary"
                          )}
                        >
                          {label}
                        </span>
                        <span className="block text-sm leading-snug font-normal text-body-medium">
                          {hub.description}
                        </span>
                      </span>
                      {linkOnly ? (
                        <ArrowNext
                          className="size-5 shrink-0 text-body-medium"
                          aria-hidden
                        />
                      ) : (
                        <ChevronNext
                          className="size-5 shrink-0 text-body-medium"
                          aria-hidden
                        />
                      )}
                    </>
                  )

                  return (
                    <li key={key} className="mb-0 border-b border-body-light">
                      {linkOnly ? (
                        <BaseLink
                          href={hub.href}
                          activeClassName=""
                          customEventOptions={track(key)(hub.href)}
                          className={rowClasses}
                        >
                          {content}
                        </BaseLink>
                      ) : (
                        <Button
                          variant="ghost"
                          className={rowClasses}
                          onClick={() => go(key)}
                          autoFocus={view.from === key}
                          data-testid={`mobile-menu-section-${key}`}
                        >
                          {content}
                        </Button>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </nav>
    </>
  )
}

export default DrillDownNav
