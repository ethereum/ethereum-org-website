import type { useTranslations } from "next-intl"

import type { EventItem } from "@/lib/types"

export const sanitize = (s: string) =>
  s.toLowerCase().replace(/\W+/g, " ").replace(/\s+/g, " ")

export const mapEventTranslations = (
  events: EventItem[],
  t: ReturnType<typeof useTranslations>
): EventItem[] =>
  events.map((event) => ({
    ...event,
    eventTypeLabel: t(`page-events-tag-${event.eventType}`),
  }))
