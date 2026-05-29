import { getLocale, getTranslations } from "next-intl/server"

import { numberFormat } from "@/lib/utils/numbers"

import { storiesAdoption } from "@/data/storiesAdoption"

import MapView from "./MapView"

const NO_DATA_FILL = "hsla(var(--body-medium), 0.12)"

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
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
      <div className="flex flex-col gap-3 lg:w-1/3">
        <h2>{t("page-stories-adoption-title")}</h2>
        <p className="text-lg text-body-medium">
          {t("page-stories-adoption-description")}
        </p>
      </div>

      <figure className="m-0 lg:w-2/3">
        <MapView />

        {/* Legend (static, server-rendered so it shows before the map chunk) */}
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-body-medium">
          <div className="flex items-center gap-2">
            <span>{t("page-stories-adoption-legend-low")}</span>
            <span
              className="h-3 w-24 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, hsla(var(--primary), 0.15), hsla(var(--primary), 1))",
              }}
            />
            <span>{t("page-stories-adoption-legend-high")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm border border-body-medium/40"
              style={{ background: NO_DATA_FILL }}
            />
            <span>{t("page-stories-adoption-no-data")}</span>
          </div>
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
