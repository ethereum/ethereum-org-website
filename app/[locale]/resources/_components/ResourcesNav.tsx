"use client"

import { motion } from "framer-motion"

import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import type { DashboardSection } from "../types"

import { useActiveHash } from "@/hooks/useActiveHash"

const ResourcesNav = ({
  resourceSections,
  eventCategory,
}: {
  resourceSections: DashboardSection[]
  eventCategory: string
}) => {
  const activeSection = useActiveHash(
    resourceSections.map(({ key }) => key),
    "0% 0% -70% 0%"
  ).replace(/^#/, "")

  return (
    <nav className="z-sticky mx-4 flex max-w-full gap-1 overflow-x-auto bg-background p-2 shadow md:max-w-[calc(100%-2rem)] md:rounded-2xl md:border md:p-0.5 md:shadow-lg">
      {resourceSections.map(({ key, title, icon }) => (
        <ButtonLink
          key={key}
          href={`#${key}`}
          variant="ghost"
          isSecondary
          className={cn(
            "relative text-nowrap rounded-xl px-4 py-2 text-sm [&_svg]:shrink-0 [&_svg]:text-sm",
            activeSection === key && "!text-primary"
          )}
          customEventOptions={{
            eventCategory,
            eventAction: "whats_on_this_page",
            eventName: key,
          }}
        >
          {activeSection === key && (
            <motion.div
              layoutId="active-section-highlight"
              className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast"
            />
          )}
          {icon && <span className="z-10 text-lg">{icon}</span>}
          <span className="relative z-10">{title}</span>
        </ButtonLink>
      ))}
    </nav>
  )
}

export default ResourcesNav
