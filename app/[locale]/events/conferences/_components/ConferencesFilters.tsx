"use client"

import { Globe, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

const regions = [
  { id: "all", icon: Globe, labelKey: "page-events-nav-all" },
  { id: "europe", icon: MapPin, labelKey: "page-events-nav-europe" },
  { id: "asia", icon: MapPin, labelKey: "page-events-nav-asia" },
  {
    id: "north-america",
    icon: MapPin,
    labelKey: "page-events-nav-north-america",
  },
  {
    id: "south-america",
    icon: MapPin,
    labelKey: "page-events-nav-south-america",
  },
  { id: "africa", icon: MapPin, labelKey: "page-events-nav-africa" },
  { id: "oceania", icon: MapPin, labelKey: "page-events-nav-oceania" },
  { id: "hackathons", icon: MapPin, labelKey: "page-events-nav-hackathons" },
]

const ConferencesFilters = () => {
  const t = useTranslations("page-events")

  return (
    <nav className="flex flex-wrap gap-2">
      {regions.map((region) => (
        <button
          key={region.id}
          className={cn(
            "flex items-center gap-2 rounded-full border border-body-light bg-background px-4 py-2",
            "transition-colors hover:border-primary hover:bg-primary-low-contrast",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
            region.id === "all" && "border-primary bg-primary-low-contrast"
          )}
        >
          <region.icon className="h-5 w-5" />
          <span className="text-sm font-medium">{t(region.labelKey)}</span>
        </button>
      ))}
    </nav>
  )
}

export default ConferencesFilters
