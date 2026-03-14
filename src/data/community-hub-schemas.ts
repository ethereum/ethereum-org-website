const WEEKDAYS = [
  "https://schema.org/Monday",
  "https://schema.org/Tuesday",
  "https://schema.org/Wednesday",
  "https://schema.org/Thursday",
  "https://schema.org/Friday",
] as const

export type CommunityHubSchemaData = {
  /** Override for Place name. Default: "Ethereum Community Hub ({location})" */
  hubName?: string
  /** Override for EventSeries name. Default: "Open Ethereum Coworking Hours" */
  eventSeriesName?: string
  eventDescription: string
  address?: {
    streetAddress: string
    addressLocality: string
    postalCode?: string
    addressCountry: string
  }
  containedInPlace?: {
    name: string
    url?: string
  }
  schedule: {
    startDate?: string
    startTime?: string
    endTime?: string
    repeatFrequency: string
    byDay: string | readonly string[]
    scheduleTimezone: string
  }
}

/**
 * Structured data metadata for community hubs.
 * Used to generate JSON-LD Service + Place + EventSeries schemas
 * for regional search discovery.
 *
 * Keys must match hub IDs in community-hubs.ts.
 * hub.location is used as areaServed city name (no need to duplicate here).
 * hubName defaults to "Ethereum Community Hub ({location})" if omitted.
 * eventSeriesName defaults to "Open Ethereum Coworking Hours" if omitted.
 */
export const communityHubSchemas: Record<string, CommunityHubSchemaData> = {
  london: {
    eventDescription:
      "Open community coworking for Ethereum builders at Encode Hub in London.",
    address: {
      streetAddress: "41 Pitfield St",
      addressLocality: "London",
      postalCode: "N1 6DA",
      addressCountry: "GB",
    },
    containedInPlace: {
      name: "Encode Hub",
      url: "https://hub.encode.club/",
    },
    schedule: {
      repeatFrequency: "P1D",
      byDay: WEEKDAYS,
      scheduleTimezone: "Europe/London",
    },
  },

  berlin: {
    hubName: "Ethereum Foundation Office (Berlin)",
    eventSeriesName: "Ethereum Community Hub Berlin -- Co-working Wednesdays",
    eventDescription:
      "Every Wednesday the Ethereum Foundation office opens for builders, researchers, creators, students, and explorers to co-work, connect, and collaborate.",
    schedule: {
      startTime: "10:00",
      endTime: "20:00",
      repeatFrequency: "P1W",
      byDay: "https://schema.org/Wednesday",
      scheduleTimezone: "Europe/Berlin",
    },
  },

  "hong-kong": {
    eventDescription:
      "Open community coworking for Ethereum builders at DoBe Hub in Hong Kong.",
    address: {
      streetAddress: "83 King Lam St",
      addressLocality: "Cheung Sha Wan",
      addressCountry: "HK",
    },
    containedInPlace: {
      name: "DoBe Hub",
    },
    schedule: {
      repeatFrequency: "P1D",
      byDay: WEEKDAYS,
      scheduleTimezone: "Asia/Hong_Kong",
    },
  },

  rome: {
    eventDescription: "Open community coworking for Ethereum builders in Rome.",
    address: {
      streetAddress: "Largo Dino Frisullo",
      addressLocality: "Rome",
      addressCountry: "IT",
    },
    schedule: {
      repeatFrequency: "P1D",
      byDay: WEEKDAYS,
      scheduleTimezone: "Europe/Rome",
    },
  },

  dubai: {
    eventDescription:
      "Open community coworking for Ethereum builders at Hadron Founders Club in Dubai.",
    address: {
      streetAddress: "Warehouse 21-22, Al Qouz Industrial Third, Al Quoz",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    containedInPlace: {
      name: "Hadron Founders Club",
      url: "https://luma.com/HadronFC",
    },
    schedule: {
      repeatFrequency: "P1D",
      byDay: WEEKDAYS,
      scheduleTimezone: "Asia/Dubai",
    },
  },

  lagos: {
    eventDescription:
      "Open community coworking for Ethereum builders at Web3Bridge in Lagos.",
    address: {
      streetAddress: "25 Talabi Ademola Street, Abadek Avenue, Ogunlewe St",
      addressLocality: "Igbogbo Ikorodu",
      postalCode: "104102",
      addressCountry: "NG",
    },
    containedInPlace: {
      name: "Web3Bridge",
      url: "https://www.web3bridge.com/",
    },
    schedule: {
      repeatFrequency: "P1D",
      byDay: WEEKDAYS,
      scheduleTimezone: "Africa/Lagos",
    },
  },

  sf: {
    eventDescription:
      "Open community coworking for Ethereum builders at Frontier Tower in San Francisco.",
    address: {
      streetAddress: "995 Market St",
      addressLocality: "San Francisco",
      postalCode: "94103",
      addressCountry: "US",
    },
    containedInPlace: {
      name: "Frontier Tower",
      url: "https://frontiertower.io/",
    },
    schedule: {
      repeatFrequency: "P1D",
      byDay: WEEKDAYS,
      scheduleTimezone: "America/Los_Angeles",
    },
  },
}
