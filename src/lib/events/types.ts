export type EventType =
  | "conference"
  | "meetup"
  | "hackathon"
  | "workshop"
  | "coworking"

export interface CommunityEvent {
  // Core fields
  id: string
  title: string
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  href: string
  location: string // "City, Country"
  description: string
  imageUrl: string

  // Enhanced fields
  eventType: EventType
  bannerUrl?: string // For featured conferences
  tags: string[]
  isRecurring: boolean
  recurringSchedule?: string // "Every Wednesday"
  isFeatured: boolean // Show in carousel
  coordinates?: {
    lat: number
    lng: number
  }
  socialLinks?: {
    telegram?: string
    twitter?: string
    discord?: string
    website?: string
  }
  timezone?: string // IANA timezone (e.g., "Europe/Berlin")
}

export interface CommunityHub {
  id: string
  name: string
  city: string
  country: string
  organization: string // "Encode Club", "Ethereum Foundation", etc.
  description: string
  logoUrl: string
  schedule: string // "Free coworking every day"
  links: {
    cowork?: string
    meetups?: string
    website?: string
  }
  coordinates: {
    lat: number
    lng: number
  }
}

export type EventFilter = {
  type?: EventType[]
  city?: string
  dateRange?: { start: string; end: string }
  tags?: string[]
  nearLocation?: { lat: number; lng: number; radiusKm: number }
}

export type EventSortOption = "date" | "name" | "distance"
