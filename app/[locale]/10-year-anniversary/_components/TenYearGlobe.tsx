"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "next-themes"
import Globe from "react-globe.gl"
import { type GlobeMethods } from "react-globe.gl"
import * as THREE from "three"

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
    return countries.features.map(
      () =>
        `#${Math.round(Math.random() * Math.pow(2, 24))
          .toString(16)
          .padStart(6, "0")}`
    )
  }, [countries.features])

  const hexPolygonColor = (feature: object) => {
    const idx = countries.features.indexOf(
      feature as (typeof countries.features)[number]
    )
    return hexPolygonColors[idx]
  }

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true
      globeRef.current.controls().enableZoom = false
      globeRef.current.controls().enableRotate = false
      globeRef.current.controls().enablePan = false
      globeRef.current.controls().autoRotateSpeed = 2.0
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 1.8 })

      // Create cloud layer
      const cloudGeometry = new THREE.SphereGeometry(1.02, 32, 32)
      const cloudMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      })
      const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
      cloudMesh.position.set(0, 0, 0)
      cloudMesh.scale.set(1, 1, 1)
      globeRef.current.scene().add(cloudMesh)
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
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
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
      style={{ position: "relative", width: width, height: width }}
    >
      {MemoizedGlobe}
      {hoveredEvent && tooltipPos && (
        <div
          style={{
            position: "fixed",
            left: tooltipPos.x,
            top: tooltipPos.y,
            zIndex: 1000,
            pointerEvents: "auto",
            transform: "translate(-50%, -100%)",
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
          <div
            style={{
              background: "white",
              borderRadius: 10,
              boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
              padding: "16px",
              minWidth: 180,
              fontFamily: "inherit",
              fontSize: 15,
              color: "#222",
              lineHeight: 1.4,
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                color: "#627eea",
                fontSize: "1.15em",
              }}
            >
              {hoveredEvent.city}
            </div>
            <div style={{ marginBottom: 4 }}>{hoveredEvent.host}</div>
            {hoveredEvent.eventLink && (
              <a
                href={hoveredEvent.eventLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#627eea",
                  textDecoration: "underline",
                  fontSize: 14,
                }}
              >
                Go to event
              </a>
            )}
            <div style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
              {hoveredEvent.lat}, {hoveredEvent.lng}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TenYearGlobe
