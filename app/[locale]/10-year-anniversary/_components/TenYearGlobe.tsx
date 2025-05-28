"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import Globe from "react-globe.gl"
import { type GlobeMethods } from "react-globe.gl"
import * as THREE from "three"

import countries from "./countries.json"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"
import EthLogo from "@/public/images/assets/eth-glyph-colored.png"

const TenYearGlobe = ({ events }) => {
  const globeRef = useRef<GlobeMethods>()
  const { resolvedTheme } = useTheme()

  const atmosphereColor = resolvedTheme === "dark" ? "#B38DF0" : "#945AF4"

  const width = useBreakpointValue({
    base: 300,
    sm: 400,
    md: 500,
    lg: 600,
  })

  useEffect(() => {
    if (globeRef.current) {
      // Auto-rotate
      globeRef.current.controls().autoRotate = true
      globeRef.current.controls().enableZoom = false
      globeRef.current.controls().enableRotate = false
      globeRef.current.controls().enablePan = false
      globeRef.current.controls().autoRotateSpeed = 2.0

      // Set initial position
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

      // Position the cloud layer
      cloudMesh.position.set(0, 0, 0)
      cloudMesh.scale.set(1, 1, 1)

      // Add to scene
      globeRef.current.scene().add(cloudMesh)

      // Add some lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1)
      globeRef.current.scene().add(ambientLight)
    }
  }, [])

  const htmlElementsData = events.map((event) => ({
    lat: event.lat,
    lng: event.lng,
    html: `<img src="${EthLogo.src}" style="
      width: 32px;
      height: 32px;
      object-fit: contain;
      display: block;
    " alt="Ethereum marker" />`,
  }))

  return (
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
      hexPolygonColor={() =>
        `#${Math.round(Math.random() * Math.pow(2, 24))
          .toString(16)
          .padStart(6, "0")}`
      }
      htmlElementsData={htmlElementsData}
      htmlLat="lat"
      htmlLng="lng"
      htmlElement={(d) => {
        const el = document.createElement("div")
        el.innerHTML = d.html
        return el
      }}
      width={width}
      height={width}
    />
  )
}

export default TenYearGlobe
