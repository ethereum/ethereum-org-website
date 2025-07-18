"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "next-themes"
import Globe from "react-globe.gl"
import { type GlobeMethods } from "react-globe.gl"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import Link from "@/components/ui/Link"

import countries from "../countries.json"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
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

// Extend OrbitControls type to include _sphericalDelta
interface ExtendedOrbitControls extends OrbitControls {
  _sphericalDelta?: {
    theta: number
    phi: number
  }
}

const TenYearGlobe = ({
  events,
  actionLabel,
}: {
  events: EventData[]
  actionLabel: string
}) => {
  const globeRef = useRef<GlobeMethods>()
  const globeContainerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const { prefersReducedMotion } = usePrefersReducedMotion()

  const atmosphereColor = resolvedTheme === "dark" ? "#B38DF0" : "#945AF4"

  const width = useBreakpointValue({
    base: window?.innerWidth - 64 || 260, // Full width on mobile with padding
    sm: 400,
    md: 500,
    lg: 600,
  })

  const hexPolygonColors = useMemo(() => {
    return countries.features.map(() => {
      // Generate a random light purple color
      const basePurple = resolvedTheme === "dark" ? 0xb38df0 : 0x945af4
      const r = Math.min(255, Math.floor((basePurple >> 16) * 1.3))
      const g = Math.min(255, Math.floor(((basePurple >> 8) & 0xff) * 1.3))
      const b = Math.min(255, Math.floor((basePurple & 0xff) * 1.3))
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
    })
  }, [resolvedTheme])

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

  // Function to safely set auto-rotate based on motion preferences
  const setAutoRotate = useCallback(
    (controls: ExtendedOrbitControls, value: boolean) => {
      controls.autoRotate = value && !prefersReducedMotion
    },
    [prefersReducedMotion]
  )

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls() as ExtendedOrbitControls
      setAutoRotate(controls, true)
      controls.enablePan = false
      controls.enableZoom = false
      controls.autoRotateSpeed = 2.0
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 1.8 })

      const ambientLight = new THREE.AmbientLight(0xffffff, 1)
      globeRef.current.scene().add(ambientLight)
    }
  }, [setAutoRotate])

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
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDiff = Math.abs(currentScrollY - lastScrollY.current)

      // Close tooltip if scrolled more than 20px
      if (scrollDiff > 20) {
        setHoveredEvent(null)
        setTooltipPos(null)
        setIsTooltipHovered(false)
        setIsMarkerHovered(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Memoize the Globe to prevent rerender on tooltip state changes
  const MemoizedGlobe = (
    <Globe
      ref={globeRef}
      globeImageUrl={
        resolvedTheme === "dark"
          ? "//unpkg.com/three-globe/example/img/earth-dark.jpg"
          : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      }
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
          const controls = globeRef.current.controls() as ExtendedOrbitControls
          setAutoRotate(controls, false)
          if ("autoRotateSpeed" in controls) controls.autoRotateSpeed = 0
          if (controls._sphericalDelta) {
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
            const controls =
              globeRef.current.controls() as ExtendedOrbitControls
            setAutoRotate(controls, true)
            if ("autoRotateSpeed" in controls) controls.autoRotateSpeed = 2.0
          }
        }
      }}
      onPointClick={() => {
        if (globeRef.current) {
          const controls = globeRef.current.controls() as ExtendedOrbitControls
          setAutoRotate(controls, false)
          if ("autoRotateSpeed" in controls) controls.autoRotateSpeed = 0
          if (controls._sphericalDelta) {
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
      className="relative w-full max-w-full cursor-grab active:cursor-grabbing"
      style={{ height: width }}
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
                {actionLabel}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TenYearGlobe
