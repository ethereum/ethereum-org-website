import type {
  CoinGeckoCoinMarketItem,
  CommunityPick,
  ExternalDataReturnData,
  GHIssue,
  GrowThePieBlockspaceData,
  GrowThePieRawDataItem,
  RSSItem,
} from "@/lib/types"
import type { CommunityEvent } from "@/lib/interfaces"

import type { ExternalDataMap } from "./fetchExternalData"

/**
 * Type for calendar events structure stored in external data.
 */
export type CalendarEventsData = {
  pastEvents?: ExternalDataReturnData
  upcomingEvents?: ExternalDataReturnData
}

/**
 * Type for extracted calendar events with typed arrays.
 */
export type ExtractedCalendarEvents = {
  pastEventData: CommunityEvent[]
  upcomingEventData: CommunityEvent[]
}

/**
 * Extracts a simple value object (e.g., { value: number, timestamp: number }) from external data.
 * Returns a default value if not found or in error state.
 */
export const extractValue = <T extends number | string>(
  data: ExternalDataMap | null,
  key: string,
  defaultValue: T
): { value: T; timestamp: number } => {
  const dataItem = data?.[key] as
    | { value: T; timestamp: number }
    | { error: string }
    | undefined

  return (
    dataItem && "value" in dataItem
      ? dataItem
      : { value: defaultValue, timestamp: Date.now() }
  ) as {
    value: T
    timestamp: number
  }
}

/**
 * Extracts a nested value from external data (e.g., beaconchainEpoch.totalEthStaked).
 */
export const extractNestedValue = <T extends number | string>(
  data: ExternalDataMap | null,
  key: string,
  nestedKey: string,
  defaultValue: T
): { value: T; timestamp: number } => {
  const dataItem = data?.[key] as
    | { [key: string]: { value: T; timestamp: number } | undefined }
    | { error: string }
    | undefined

  const nestedValue =
    dataItem && !("error" in dataItem) ? dataItem[nestedKey] : undefined

  return nestedValue ?? { value: defaultValue, timestamp: Date.now() }
}

/**
 * Extracts an array from external data.
 * Returns empty array if not found or in error state.
 */
export const extractArray = <T>(
  data: ExternalDataMap | null,
  key: string,
  defaultValue: T[] = []
): T[] => {
  const dataItem = data?.[key] as { value: T[] } | { error: string } | undefined

  return dataItem && "value" in dataItem ? dataItem.value : defaultValue
}

/**
 * Extracts raw data for processing (e.g., for GrowThePie which needs processing).
 */
export const extractRawData = <T>(
  data: ExternalDataMap | null,
  key: string
): T[] | null => {
  const dataItem = data?.[key] as { value: T[] } | { error: string } | undefined

  return dataItem && "value" in dataItem ? dataItem.value : null
}

/**
 * Extracts a nested object structure from external data.
 * Useful for complex nested structures like calendar events.
 */
export const extractNestedObject = <T>(
  data: ExternalDataMap | null,
  key: string
): T | undefined => {
  const dataItem = data?.[key] as { value: T } | { error: string } | undefined
  return dataItem && "value" in dataItem ? dataItem.value : undefined
}

/**
 * Extracts calendar events structure from external data.
 */
export const extractCalendarEvents = (
  data: ExternalDataMap | null
): CalendarEventsData | undefined => {
  return extractNestedObject<CalendarEventsData>(data, "calendarEvents")
}

/**
 * Extracts and formats calendar events as typed arrays.
 */
export const extractCalendarEventsFormatted = (
  data: ExternalDataMap | null
): ExtractedCalendarEvents => {
  const calendarData = extractCalendarEvents(data)
  return {
    upcomingEventData:
      (calendarData?.upcomingEvents &&
        "value" in calendarData.upcomingEvents &&
        (calendarData.upcomingEvents.value as CommunityEvent[])) ||
      [],
    pastEventData:
      (calendarData?.pastEvents &&
        "value" in calendarData.pastEvents &&
        (calendarData.pastEvents.value as CommunityEvent[])) ||
      [],
  }
}

/**
 * Extracts GrowThePie raw data items.
 */
export const extractGrowThePieData = (
  data: ExternalDataMap | null
): GrowThePieRawDataItem[] | null => {
  return extractRawData<GrowThePieRawDataItem>(data, "growThePie")
}

/**
 * Extracts RSS items array.
 */
export const extractRSSItems = (
  data: ExternalDataMap | null,
  key: string
): RSSItem[] => {
  return extractArray<RSSItem>(data, key)
}

/**
 * Extracts RSS items array of arrays (multiple feeds).
 */
export const extractRSSFeeds = (data: ExternalDataMap | null): RSSItem[][] => {
  return extractArray<RSSItem[]>(data, "blogFeeds")
}

/**
 * Extracts community picks array.
 */
export const extractCommunityPicks = (
  data: ExternalDataMap | null
): CommunityPick[] => {
  return extractArray<CommunityPick>(data, "communityPicks")
}

/**
 * Extracts GitHub good first issues array.
 */
export const extractGFIssues = (data: ExternalDataMap | null): GHIssue[] => {
  return extractArray<GHIssue>(data, "gfissues")
}

/**
 * Extracts stablecoins data array from CoinGecko.
 */
export const extractStablecoinsData = (
  data: ExternalDataMap | null
): CoinGeckoCoinMarketItem[] => {
  return extractArray<CoinGeckoCoinMarketItem>(data, "stablecoinsData")
}

/**
 * Extracts GrowThePie blockspace data.
 */
export const extractGrowThePieBlockspace = (
  data: ExternalDataMap | null
): GrowThePieBlockspaceData => {
  const dataItem = data?.["growThePieBlockspace"] as
    | { value: GrowThePieBlockspaceData }
    | { error: string }
    | undefined

  return dataItem && "value" in dataItem ? dataItem.value : {}
}
