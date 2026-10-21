import { getCountryNameByCode } from "@/lib/utils/geography"

import {
  CRYPTO_OWNERSHIP,
  CRYPTO_OWNERSHIP_SOURCE,
} from "@/data/crypto-ownership"

import AdoptionMapView from "./AdoptionMapView"

import { WORLD_MAP } from "@/lib/world-map"

const AdoptionMap = ({ locale }: { locale: string }) => {
  const countries = WORLD_MAP.shapes.map(({ code }) => ({
    code,
    name: getCountryNameByCode(code, locale) ?? code,
    value: CRYPTO_OWNERSHIP[code],
  }))

  return (
    <AdoptionMapView
      countries={countries}
      width={WORLD_MAP.width}
      height={WORLD_MAP.height}
      source={CRYPTO_OWNERSHIP_SOURCE}
    />
  )
}

export default AdoptionMap
