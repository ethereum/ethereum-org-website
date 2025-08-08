"use client"

import TabNav from "@/components/ui/TabNav"

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

  const items = resourceSections.map(({ key, title, icon }) => ({
    key,
    label: title,
    href: `#${key}`,
    icon: icon ? <span className="text-lg">{icon}</span> : undefined,
  }))

  return (
    <TabNav
      items={items}
      activeKey={activeSection}
      className="z-sticky mx-4 max-w-full bg-background p-2 md:max-w-[calc(100%-2rem)] md:p-0.5"
      useMotion
      motionLayoutId="active-section-highlight"
      customEventOptions={{
        eventCategory,
        eventAction: "whats_on_this_page",
      }}
    />
  )
}

export default ResourcesNav
