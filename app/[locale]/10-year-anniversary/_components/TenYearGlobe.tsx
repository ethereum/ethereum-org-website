"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "next-themes"
import Globe from "react-globe.gl"
import { type GlobeMethods } from "react-globe.gl"
import * as THREE from "three"

import Link from "@/components/ui/Link"

import countries from "./countries.json"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"
import EthLogo from "@/public/images/assets/eth-glyph-colored.png"

// Define a type for event data
type EventData = {
  lat: number
  lng: number
  city?: string
  host?: string
  eventLink?: string
  country: string
}

type CountryFeature = {
  properties: {
    ADMIN: string
  }
}

const TenYearGlobe = ({ events }: { events: EventData[] }) => {
  const globeRef = useRef<GlobeMethods>()
  const globeContainerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  const atmosphereColor = resolvedTheme === "dark" ? "#B38DF0" : "#945AF4"

  const width = useBreakpointValue({
    base: 300,
    sm: 400,
    md: 500,
    lg: 600,
  })

  const hexPolygonColors = useMemo(() => {
    return countries.features.map(() => {
      const grayValue = Math.round(Math.random() * 155 + 100) // Random value between 100-255
      const hex = grayValue.toString(16).padStart(2, "0")
      return `#${hex}${hex}${hex}` // Same value for R,G,B to create grayscale
    })
  }, [countries.features])

  const hexPolygonColor = (feature: object) => {
    const idx = countries.features.indexOf(
      feature as (typeof countries.features)[number]
    )
    const country = (feature as CountryFeature).properties.ADMIN
    const hasEvent = events.some((event) => event.country === country)

    if (hasEvent) {
      // Return a purple color for countries with events
      return resolvedTheme === "dark" ? "#B38DF0" : "#945AF4"
    }

    return hexPolygonColors[idx]
  }

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true
      globeRef.current.controls().enableZoom = false
      globeRef.current.controls().enablePan = false
      globeRef.current.controls().autoRotateSpeed = 2.0
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 1.8 })

      const ambientLight = new THREE.AmbientLight(0xffffff, 1)
      globeRef.current.scene().add(ambientLight)
    }
  }, [])

  // Prepare htmlElementsData for EthLogo
  const htmlElementsData = events.map((event) => ({
    lat: event.lat,
    lng: event.lng,
    html: `<img src="${EthLogo.src}" style="
      width: 32px;
      height: 32px;
      object-fit: contain;
      display: block;
      pointer-events: none;
    " alt="Ethereum marker" />`,
  }))

  // State for custom tooltip
  const [hoveredEvent, setHoveredEvent] = useState<EventData | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  )
  const [isTooltipHovered, setIsTooltipHovered] = useState(false)
  const [isMarkerHovered, setIsMarkerHovered] = useState(false)

  // Memoize the Globe to prevent rerender on tooltip state changes
  const MemoizedGlobe = (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundColor="rgba(0,0,0,0)"
      atmosphereColor={atmosphereColor}
      animateIn={false}
      hexPolygonsData={countries.features}
      hexPolygonResolution={3}
      hexPolygonMargin={0.3}
      hexPolygonUseDots={true}
      hexPolygonColor={hexPolygonColor}
      pointsData={events}
      pointLat="lat"
      pointLng="lng"
      pointAltitude={0.1}
      pointColor={() => "rgba(0,0,0,0)"} // invisible point
      pointRadius={2.0}
      onPointHover={(point) => {
        if (point && globeRef.current) {
          setHoveredEvent(point as EventData)
          setIsMarkerHovered(true)
          const data = point as EventData
          const coords = globeRef.current.getScreenCoords(
            data.lat,
            data.lng,
            0.1
          )
          if (globeContainerRef.current) {
            const rect = globeContainerRef.current.getBoundingClientRect()
            setTooltipPos({ x: rect.left + coords.x, y: rect.top + coords.y })
          } else {
            setTooltipPos(coords)
          }
          // Stop rotation immediately
          const controls = globeRef.current.controls()
          controls.autoRotate = false
          if ("autoRotateSpeed" in controls) controls.autoRotateSpeed = 0
          if ("_sphericalDelta" in controls && controls._sphericalDelta) {
            controls._sphericalDelta.theta = 0
            controls._sphericalDelta.phi = 0
          }
        } else {
          setIsMarkerHovered(false)
          setTimeout(() => {
            if (!isTooltipHovered) {
              setHoveredEvent(null)
              setTooltipPos(null)
            }
          }, 100)
          if (globeRef.current) {
            const controls = globeRef.current.controls()
            controls.autoRotate = true
            if ("autoRotateSpeed" in controls) controls.autoRotateSpeed = 2.0
          }
        }
      }}
      onPointClick={() => {
        if (globeRef.current) {
          const controls = globeRef.current.controls()
          controls.autoRotate = false
          if ("autoRotateSpeed" in controls) controls.autoRotateSpeed = 0
          if ("_sphericalDelta" in controls && controls._sphericalDelta) {
            controls._sphericalDelta.theta = 0
            controls._sphericalDelta.phi = 0
          }
        }
        // Add click logic here if needed
      }}
      htmlElementsData={htmlElementsData}
      htmlLat="lat"
      htmlLng="lng"
      htmlElement={(d) => {
        const el = document.createElement("div")
        el.innerHTML = (d as { html: string }).html
        el.style.cursor = "pointer"
        return el
      }}
      width={width}
      height={width}
    />
  )

  return (
    <div
      ref={globeContainerRef}
      className="relative"
      style={{ width: width, height: width }}
    >
      {MemoizedGlobe}
      {hoveredEvent && tooltipPos && (
        <div
          className="pointer-events-auto fixed z-[1000] -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
          }}
          onMouseEnter={() => setIsTooltipHovered(true)}
          onMouseLeave={() => {
            setIsTooltipHovered(false)
            setTimeout(() => {
              if (!isMarkerHovered) {
                setHoveredEvent(null)
                setTooltipPos(null)
              }
            }, 100)
          }}
        >
          <div className="flex min-w-48 flex-col gap-2 rounded-lg bg-background p-4 shadow-md">
            <p className="text-lg font-bold text-primary">
              {hoveredEvent.city}
            </p>
            <p>{hoveredEvent.host}</p>
            {hoveredEvent.eventLink && (
              <Link
                href={hoveredEvent.eventLink}
                target="_blank"
                rel="noopener noreferrer"
                hideArrow
                className="no-underline"
              >
                Go to event
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TenYearGlobe
