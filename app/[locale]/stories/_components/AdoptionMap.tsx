import { getCountryNameByCode } from "@/lib/utils/geography"

import { ADOPTION_SCORES } from "@/data/ethereum-adoption"

import AdoptionMapView from "./AdoptionMapView"

import { WORLD_MAP } from "@/lib/world-map"

const AdoptionMap = ({ locale }: { locale: string }) => {
  const countries = WORLD_MAP.shapes.map(({ code }) => ({
    code,
    name: getCountryNameByCode(code, locale) ?? code,
    score: ADOPTION_SCORES[code],
  }))

  return (
    <AdoptionMapView
      countries={countries}
      width={WORLD_MAP.width}
      height={WORLD_MAP.height}
    />
  )
}

export default AdoptionMap
