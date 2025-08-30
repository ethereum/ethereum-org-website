"use client"

import React from "react"

import type { MatomoEventOptions, SectionNavDetails } from "@/lib/types"

import TabNav from "@/components/ui/TabNav"

import { cn } from "@/lib/utils/cn"

import { useActiveHash } from "@/hooks/useActiveHash"

export const StickyContainer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("sticky top-20 z-dropdown", className)} {...props} />
)

const FloatingNav = ({
  sections,
  customEventOptions,
  activeSection,
}: {
  sections: SectionNavDetails[]
  activeSection?: string
  customEventOptions?: Pick<MatomoEventOptions, "eventCategory" | "eventAction">
}) => {
  const activeHash = useActiveHash(
    sections.map(({ key }) => key),
    "0% 0% -70% 0%"
  ).replace(/^#/, "")
  const activeKey = activeSection || activeHash

  const items = sections.map(({ key, href, label, icon }) => ({
    key,
    label,
    href: href || `#${key}`,
    icon: icon ? <span className="text-lg">{icon}</span> : undefined,
  }))

  return (
    <TabNav
      items={items}
      activeKey={activeKey}
      className="mx-4 max-w-full bg-background p-2 md:max-w-[calc(100%-2rem)] md:p-0.5"
      useMotion
      motionLayoutId="active-section-highlight"
      customEventOptions={customEventOptions}
    />
  )
}

export default FloatingNav
