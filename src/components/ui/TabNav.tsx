"use client"

import { motion } from "framer-motion"

import type { MatomoEventOptions, SectionNavDetails } from "@/lib/types"

import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { useActiveHash } from "@/hooks/useActiveHash"

export const StickyContainer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("sticky top-20 z-dropdown", className)} {...props} />
)

interface TabNavProps {
  sections: SectionNavDetails[]
  activeSection?: string
  className?: string
  useMotion?: boolean
  motionLayoutId?: string
  customEventOptions?: Pick<MatomoEventOptions, "eventCategory" | "eventAction">
}

const TabNav = ({
  sections,
  activeSection,
  className,
  useMotion = false,
  motionLayoutId = "active-section-highlight",
  customEventOptions,
}: TabNavProps) => {
  const activeHash = useActiveHash(
    sections.map(({ key }) => key),
    "0% 0% -70% 0%"
  ).replace(/^#/, "")
  const activeKey = activeSection || activeHash

  return (
    <div className={cn("flex w-full justify-center", className)}>
      <nav className="mx-4 flex w-full max-w-full gap-1 overflow-x-auto rounded-2xl bg-background p-0.5 shadow md:max-w-[calc(100%-2rem)] md:border md:shadow-lg lg:w-auto">
        {sections.map(({ key, href: sectionHref, label, icon }) => {
          const isActive = activeKey.toLowerCase() === key.toLowerCase()
          const href = sectionHref || `#${key}`
          return (
            <ButtonLink
              key={key}
              href={href}
              variant="ghost"
              isSecondary
              className={cn(
                "relative flex-shrink-0 text-nowrap rounded-xl px-4 py-2 text-sm [&_svg]:shrink-0 [&_svg]:text-sm",
                isActive && "!text-primary"
              )}
              customEventOptions={
                customEventOptions
                  ? {
                      ...customEventOptions,
                      eventName: key,
                    }
                  : undefined
              }
            >
              {isActive &&
                (useMotion ? (
                  <motion.div
                    layoutId={motionLayoutId}
                    className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast"
                  />
                ) : (
                  <div className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast" />
                ))}
              {icon && <span className="relative z-10 text-lg">{icon}</span>}
              <span className="relative z-10">{label}</span>
            </ButtonLink>
          )
        })}
      </nav>
    </div>
  )
}

export default TabNav
