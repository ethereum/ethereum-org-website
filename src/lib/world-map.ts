import { geoPath, geoProjection } from "d3-geo"
import type { Feature, FeatureCollection, Geometry } from "geojson"
import countries from "i18n-iso-countries"
import { feature } from "topojson-client"
import detailedWorld from "world-atlas/countries-50m.json"
import world from "world-atlas/countries-110m.json"

const WIDTH = 960
// countries smaller than this (px² at WIDTH) get an enlarged hit area
const SMALL_AREA = 80

// world-atlas leaves these without an ISO id; fold the two disputed areas into their UN-recognized state
const UNCODED: Record<string, string> = {
  Kosovo: "XK",
  "N. Cyprus": "CY",
  Somaliland: "SO",
}

// Miller cylindrical: flat edges with milder polar stretch than Mercator
const miller = (lambda: number, phi: number): [number, number] => [
  lambda,
  1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * phi)),
]

export const WORLD_MAP = (() => {
  const toFeatures = (json: unknown) => {
    const topology = json as Parameters<typeof feature>[0]
    return (
      feature(topology, topology.objects.countries) as FeatureCollection<
        Geometry,
        { name: string }
      >
    ).features
  }
  const base = toFeatures(world)
  const baseIds = new Set(base.map((f) => f.id))
  // 110m drops microstates (Singapore, Malta, Bahrain...), so take those from 50m
  const microstates = toFeatures(detailedWorld).filter(
    (f) => !baseIds.has(f.id)
  )
  const land: FeatureCollection<Geometry, { name: string }> = {
    type: "FeatureCollection",
    features: [...base, ...microstates].filter(
      (f) => f.properties.name !== "Antarctica"
    ),
  }

  const path = geoPath(
    geoProjection(miller).rotate([-10, 0]).fitWidth(WIDTH, land)
  ).digits(0)
  const height = Math.ceil(path.bounds(land)[1][1])

  const byCode = new Map<string, Feature[]>()
  for (const f of land.features) {
    const code = f.id
      ? countries.numericToAlpha2(String(f.id))
      : UNCODED[f.properties.name]
    if (code) byCode.set(code, [...(byCode.get(code) ?? []), f])
  }

  const shapes = [...byCode].map(([code, features]) => {
    const polygons = features.flatMap((f): Feature[] =>
      f.geometry.type === "MultiPolygon"
        ? f.geometry.coordinates.map((coordinates) => ({
            ...f,
            geometry: { type: "Polygon", coordinates },
          }))
        : [f]
    )
    const largest = polygons.reduce((a, b) =>
      path.area(b) > path.area(a) ? b : a
    )
    const [x, y] = path.centroid(largest)
    const area = features.reduce((sum, f) => sum + path.area(f), 0)
    return {
      code,
      d: features.map((f) => path(f)).join(""),
      x: x / WIDTH,
      y: y / height,
      small: area < SMALL_AREA,
    }
  })
  return { width: WIDTH, height, shapes }
})()

export type WorldMapShape = (typeof WORLD_MAP)["shapes"][number]
