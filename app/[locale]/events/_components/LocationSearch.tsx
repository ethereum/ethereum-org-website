"use client"

import { useCallback, useMemo, useState } from "react"
import { MapPin, Navigation, Search } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"

import type { CommunityEvent } from "@/lib/events/types"

interface LocationSearchProps {
  events: CommunityEvent[]
}

interface CityResult {
  city: string
  country: string
  eventCount: number
  slug: string
}

const LocationSearch = ({ events }: LocationSearchProps) => {
  const t = useTranslations("page-events")
  const [query, setQuery] = useState("")
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  // Extract unique cities from events
  const cities = useMemo(() => {
    const cityMap = new Map<string, CityResult>()

    events.forEach((event) => {
      const [city, country] = event.location.split(", ")
      if (city && country) {
        const key = `${city.toLowerCase()}-${country.toLowerCase()}`
        const existing = cityMap.get(key)
        if (existing) {
          existing.eventCount++
        } else {
          cityMap.set(key, {
            city,
            country,
            eventCount: 1,
            slug: city.toLowerCase().replace(/\s+/g, "-"),
          })
        }
      }
    })

    return Array.from(cityMap.values()).sort(
      (a, b) => b.eventCount - a.eventCount
    )
  }, [events])

  // Filter cities based on search query
  const filteredCities = useMemo(() => {
    if (!query.trim()) return cities.slice(0, 6)

    const lowerQuery = query.toLowerCase()
    return cities
      .filter(
        (c) =>
          c.city.toLowerCase().includes(lowerQuery) ||
          c.country.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 6)
  }, [cities, query])

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = useCallback(
    (lat1: number, lng1: number, lat2: number, lng2: number) => {
      const R = 6371 // Earth's radius in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180
      const dLng = ((lng2 - lng1) * Math.PI) / 180
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      return R * c
    },
    []
  )

  // Get events near user location
  const nearbyEvents = useMemo(() => {
    if (!userLocation) return []

    return events
      .filter((event) => event.coordinates)
      .map((event) => ({
        ...event,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          event.coordinates!.lat,
          event.coordinates!.lng
        ),
      }))
      .filter((event) => event.distance <= 500) // Within 500km
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5)
  }, [events, userLocation, calculateDistance])

  // Request user's location
  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError(t("page-events-geolocation-not-supported"))
      return
    }

    setIsLocating(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsLocating(false)
      },
      (error) => {
        setIsLocating(false)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(t("page-events-geolocation-denied"))
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError(t("page-events-geolocation-unavailable"))
            break
          default:
            setLocationError(t("page-events-geolocation-error"))
        }
      },
      { timeout: 10000, enableHighAccuracy: false }
    )
  }, [t])

  return (
    <div className="flex flex-col gap-6">
      {/* Search input with location button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-body-medium" />
          <Input
            type="search"
            placeholder={t("page-events-search-placeholder")}
            className="w-full pl-10"
            size="md"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={requestLocation}
          disabled={isLocating}
          className="shrink-0"
        >
          <Navigation
            className={`h-5 w-5 ${isLocating ? "animate-pulse" : ""}`}
          />
          <span className="sr-only">{t("page-events-use-my-location")}</span>
        </Button>
      </div>

      {/* Location error message */}
      {locationError && <p className="text-sm text-error">{locationError}</p>}

      {/* Nearby events (when location is available) */}
      {userLocation && nearbyEvents.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-medium text-body-medium">
            {t("page-events-near-you")}
          </h4>
          <div className="flex flex-wrap gap-2">
            {nearbyEvents.map((event) => (
              <Link
                key={event.id}
                href={event.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-background-highlight px-3 py-1.5 text-sm transition-colors hover:bg-primary/10"
              >
                <MapPin className="h-3 w-3" />
                <span>{event.title}</span>
                <span className="text-body-medium">
                  ({Math.round(event.distance)} km)
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* City suggestions */}
      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-medium text-body-medium">
          {query
            ? t("page-events-search-results")
            : t("page-events-popular-cities")}
        </h4>
        <div className="flex flex-wrap gap-2">
          {filteredCities.map((city) => (
            <Link
              key={`${city.city}-${city.country}`}
              href={`/events/${city.slug}`}
              className="flex items-center gap-2 rounded-full border border-body-light px-3 py-1.5 text-sm transition-colors hover:border-primary hover:bg-primary/5"
            >
              <MapPin className="h-3 w-3 text-body-medium" />
              <span>
                {city.city}, {city.country}
              </span>
              <span className="rounded-full bg-background-highlight px-1.5 text-xs text-body-medium">
                {city.eventCount}
              </span>
            </Link>
          ))}
        </div>
        {filteredCities.length === 0 && query && (
          <p className="text-sm text-body-medium">
            {t("page-events-no-cities-found")}
          </p>
        )}
      </div>
    </div>
  )
}

export default LocationSearch
