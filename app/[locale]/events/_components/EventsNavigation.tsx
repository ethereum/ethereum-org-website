"use client"

import {
  Banknote,
  ChartNoAxesCombined,
  Handshake,
  Presentation,
} from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

const navigationItems = [
  {
    id: "conferences",
    icon: ChartNoAxesCombined,
    labelKey: "page-events-nav-conferences",
  },
  {
    id: "hubs",
    icon: Presentation,
    labelKey: "page-events-nav-hubs",
  },
  {
    id: "meetups",
    icon: Banknote,
    labelKey: "page-events-nav-meetups",
  },
  {
    id: "organizers",
    icon: Handshake,
    labelKey: "page-events-nav-organizers",
  },
]

const EventsNavigation = () => {
  const t = useTranslations("page-events")

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="flex flex-wrap gap-2">
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={cn(
            "flex items-center gap-2 rounded-full border border-body-light bg-background px-4 py-2",
            "transition-colors hover:border-primary hover:bg-primary-low-contrast",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="text-sm font-medium">{t(item.labelKey)}</span>
        </button>
      ))}
    </nav>
  )
}

export default EventsNavigation
