"use client"

import dynamic from "next/dynamic"
import { useIntersectionObserver } from "usehooks-ts"

// The heavy chunk (geometry + d3-geo + topojson) loads only on the client, and
// only once the section is about to enter the viewport.
const WorldMap = dynamic(() => import("./WorldMap"), { ssr: false })

const MapView = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    rootMargin: "400px", // start loading ~one viewport early, before it's visible
    freezeOnceVisible: true,
  })

  return (
    // aspect-ratio matches the map's viewBox so the reserved space never shifts
    <div ref={ref} className="aspect-[800/518] w-full">
      {isIntersecting && <WorldMap />}
    </div>
  )
}

export default MapView
