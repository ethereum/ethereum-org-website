import { getLocale, getTranslations } from "next-intl/server"

import { numberFormat } from "@/lib/utils/numbers"

import { storiesAdoption } from "@/data/storiesAdoption"

import MapView from "./MapView"

const AdoptionMap = async () => {
  const t = await getTranslations("page-stories")
  const locale = await getLocale()

  const percentFormat = numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  })
  const regionNames = new Intl.DisplayNames([locale], { type: "region" })
  const countryName = (iso2: string) => {
    try {
      return regionNames.of(iso2) ?? iso2
    } catch {
      return iso2
    }
  }

  // Server-rendered so screen readers / crawlers get the data without the
  // heavy (lazily-loaded) visual map.
  const dataCountries = Object.entries(storiesAdoption)
    .map(([iso, rate]) => ({
      iso,
      name: countryName(iso),
      value: percentFormat.format(rate / 100),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, locale))

  return (
    // Map palette (Figma): single-hue indigo over a lavender surface. As CSS
    // vars so the panel + per-country fills flip together in dark mode.
    <div className="flex flex-col gap-8 [--map-ink:235_81%_68%] [--map-surface:240_100%_99%] lg:flex-row lg:items-start lg:gap-12 dark:[--map-ink:235_90%_75%] dark:[--map-surface:236_24%_13%]">
      <div className="flex flex-col gap-3 lg:w-1/3 lg:pt-2">
        <h2>{t("page-stories-adoption-title")}</h2>
        <p className="text-lg text-body-medium">
          {t("page-stories-adoption-description")}
        </p>
      </div>

      <figure className="m-0 lg:w-2/3">
        <div className="overflow-hidden rounded-4xl bg-[hsl(var(--map-surface))] p-4 md:p-8">
          <MapView />
        </div>

        {/* Non-visual equivalent of the map + tooltips */}
        <figcaption className="sr-only">
          {t("page-stories-adoption-a11y-summary")}
          <ul>
            {dataCountries.map((c) => (
              <li key={c.iso}>{`${c.name}: ${c.value}`}</li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </div>
  )
}

export default AdoptionMap
