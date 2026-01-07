import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import Breadcrumbs from "@/components/Breadcrumbs"
import { SimpleHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"

import communityHubsData from "@/data/community-hubs.json"
import eventsData from "@/data/events.json"

import CityEventsList from "./_components/CityEventsList"
import CityHub from "./_components/CityHub"

import type { CommunityEvent, CommunityHub } from "@/lib/events/types"

const events = eventsData as CommunityEvent[]
const communityHubs = communityHubsData as CommunityHub[]

interface PageProps {
  params: Promise<{
    locale: string
    city: string
  }>
}

// Generate static params for all cities
export async function generateStaticParams() {
  const citySet = new Set<string>()

  events.forEach((event) => {
    const [city] = event.location.split(", ")
    if (city) {
      citySet.add(city.toLowerCase().replace(/\s+/g, "-"))
    }
  })

  communityHubs.forEach((hub) => {
    citySet.add(hub.city.toLowerCase().replace(/\s+/g, "-"))
  })

  return Array.from(citySet).map((city) => ({ city }))
}

// Helper to normalize city slug
const normalizeSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-")

// Get city data from slug
const getCityData = (slug: string) => {
  // Find events in this city
  const cityEvents = events.filter((event) => {
    const [city] = event.location.split(", ")
    return city && normalizeSlug(city) === slug
  })

  // Find hub in this city
  const cityHub = communityHubs.find((hub) => normalizeSlug(hub.city) === slug)

  if (cityEvents.length === 0 && !cityHub) {
    return null
  }

  // Get city name from first event or hub
  const cityName = cityEvents[0]
    ? cityEvents[0].location.split(", ")[0]
    : cityHub?.city || slug

  const countryName = cityEvents[0]
    ? cityEvents[0].location.split(", ")[1]
    : cityHub?.country || ""

  return {
    cityName,
    countryName,
    events: cityEvents,
    hub: cityHub,
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city } = await params
  const cityData = getCityData(city)

  if (!cityData) {
    return {
      title: "City Not Found",
    }
  }

  return {
    title: `Ethereum Events in ${cityData.cityName} | ethereum.org`,
    description: `Discover Ethereum meetups, hackathons, and conferences in ${cityData.cityName}, ${cityData.countryName}. Join the local Ethereum community.`,
  }
}

export default async function CityEventsPage({ params }: PageProps) {
  const { city } = await params
  const cityData = getCityData(city)

  if (!cityData) {
    notFound()
  }

  const t = await getTranslations("page-events")

  // Separate upcoming and past events
  const now = new Date()
  const upcomingEvents = cityData.events
    .filter((e) => new Date(e.endDate) >= now)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )

  const pastEvents = cityData.events
    .filter((e) => new Date(e.endDate) < now)
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )

  return (
    <>
      <SimpleHero
        breadcrumbs={<Breadcrumbs slug={`/events/${city}`} />}
        title={`${t("page-events-in")} ${cityData.cityName}`}
        subtitle={t("page-events-city-description", {
          city: cityData.cityName,
          country: cityData.countryName,
        })}
      />

      <MainArticle className="flex flex-col gap-16">
        {/* Community Hub (if exists) */}
        {cityData.hub && (
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">
              {t("page-events-community-hub")}
            </h2>
            <CityHub hub={cityData.hub} />
          </section>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">
              {t("page-events-upcoming-in-city", { city: cityData.cityName })}
            </h2>
            <CityEventsList events={upcomingEvents} />
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">
              {t("page-events-past-in-city", { city: cityData.cityName })}
            </h2>
            <CityEventsList events={pastEvents} isPast />
          </section>
        )}

        {/* No events message */}
        {cityData.events.length === 0 && !cityData.hub && (
          <p className="text-body-medium">
            {t("page-events-no-events-in-city", { city: cityData.cityName })}
          </p>
        )}
      </MainArticle>
    </>
  )
}
