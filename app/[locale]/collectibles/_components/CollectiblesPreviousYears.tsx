import React from "react"
import { useTranslations } from "next-intl"

import { Image } from "@/components/Image"

import { Badge } from "../page"

interface CollectiblesPreviousYearsProps {
  badges: Badge[]
}

const CollectiblesPreviousYears: React.FC<CollectiblesPreviousYearsProps> = ({
  badges,
}) => {
  const t = useTranslations("page-collectibles")
  const currentYear = new Date().getFullYear().toString()
  const previousYears = badges.filter((badge) => badge.year !== currentYear)

  // Group badges by year
  const grouped = previousYears.reduce(
    (acc: Record<string, Badge[]>, badge: Badge) => {
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
      <div className="mb-8 text-left text-xl font-bold text-[#3B2C4A] dark:text-white">
        {t("page-collectibles-previous-years")}
      </div>
      {years.length > 0 ? (
        years.map((year) => {
          const badgeCount = grouped[year].length
          // Sum collectorsCount for all badges in this year
          const collectorsCount = grouped[year].reduce(
            (sum: number, badge: Badge) => sum + (badge.collectors_count || 0),
            0
          )
          return (
            <div key={year} className="mb-12">
              <div className="mb-2 flex items-center">
                <span className="mr-4 text-2xl font-extrabold text-[#3B2C4A] md:text-3xl dark:text-white">
                  {year}{" "}
                  <span className="text-base font-normal text-[#7c7c7c] dark:text-gray-400">
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
              <div className="mb-6 h-px w-full bg-[#E5E7EB] dark:bg-[#23202A]" />
              <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-6 xl:grid-cols-7">
                {grouped[year].map((badge: Badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center rounded-xl bg-white p-2 dark:bg-[#23202A]"
                  >
                    <a
                      href={badge.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-2"
                    >
                      <Image
                        width={80}
                        height={80}
                        src={badge.image}
                        alt={badge.name}
                        className="h-16 w-16 md:h-20 md:w-20"
                      />
                    </a>
                    <div className="mb-1 mt-1 text-center text-xs font-semibold text-[#3B2C4A] md:text-sm dark:text-white">
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })
      ) : (
        <div className="text-center text-lg font-bold text-[#3B2C4A] dark:text-white">
          {t("page-collectibles-previous-years-no-badges")}
        </div>
      )}
    </section>
  )
}

export default CollectiblesPreviousYears
