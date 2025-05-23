"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import Globe from "react-globe.gl"
import { type GlobeMethods } from "react-globe.gl"
import * as THREE from "three"

import countries from "./countries.json"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

const TenYearGlobe = () => {
  const globeRef = useRef<GlobeMethods>()
  const { resolvedTheme } = useTheme()

  const atmosphereColor = resolvedTheme === "dark" ? "#B38DF0" : "#945AF4"

  const width = useBreakpointValue({
    base: 300,
    sm: 400,
    md: 600,
    lg: 700,
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
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 2.5 })

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

  return (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundColor="rgba(0,0,0,0)"
      atmosphereColor={atmosphereColor}
      atmosphereAltitude={0.25}
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
      width={width}
      height={width}
    />
  )
}

export default TenYearGlobe
