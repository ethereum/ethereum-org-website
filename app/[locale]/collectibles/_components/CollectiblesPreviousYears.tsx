import React from "react"
import { getTranslations } from "next-intl/server"

import { Badge } from "../page"

interface CollectiblesPreviousYearsProps {
  badges: Badge[]
  locale: string
  currentYear: string
}

const CollectiblesPreviousYears: React.FC<
  CollectiblesPreviousYearsProps
> = async ({ badges, locale, currentYear }) => {
  const t = await getTranslations({ locale, namespace: "page-collectibles" })
  // Group badges by year
  const grouped = badges.reduce(
    (acc: Record<string, unknown[]>, badge: unknown) => {
      const year = badge.year
      if (!acc[year]) acc[year] = []
      acc[year].push(badge)
      return acc
    },
    {}
  )
  // Sort years descending
  const years = Object.keys(grouped).sort((a, b) => {
    return Number(b) - Number(a)
  })
  return (
    <section className="mx-auto mt-8 p-2">
      <div className="mb-8 text-left text-xl font-bold text-[#3B2C4A]">
        {t("page-collectibles-previous-years")}
      </div>
      {years
        .filter((year) => year !== currentYear)
        .map((year) => {
          const badgeCount = grouped[year].length
          // Sum collectorsCount for all badges in this year
          const collectorsCount = grouped[year].reduce(
            (sum, badge) => sum + (badge.collectors_count || 0),
            0
          )
          return (
            <div key={year} className="mb-12">
              <div className="mb-2 flex items-center">
                <span className="mr-4 text-2xl font-extrabold text-[#3B2C4A] md:text-3xl">
                  {year}{" "}
                  <span className="text-base font-normal text-[#7c7c7c]">
                    (
                    {t("page-collectibles-previous-years-badge-count", {
                      count: badgeCount,
                    })}
                    ,{" "}
                    {t("page-collectibles-previous-years-collectors-count", {
                      count: collectorsCount,
                    })}
                    )
                  </span>
                </span>
              </div>
              <div className="mb-6 h-px w-full bg-[#E5E7EB]" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-6 xl:grid-cols-7">
                {grouped[year].map((badge: Badge) => (
                  <div key={badge.id} className="flex flex-col items-center">
                    <a
                      href={badge.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-2"
                    >
                      <img
                        src={badge.image}
                        alt={badge.name}
                        className="h-16 w-16 md:h-20 md:w-20"
                      />
                    </a>
                    <div className="mb-1 mt-1 text-center text-xs font-semibold text-[#3B2C4A] md:text-sm">
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
    </section>
  )
}

export default CollectiblesPreviousYears
