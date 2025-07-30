"use client"

import React from "react"
import { useTranslations } from "next-intl"

import { Image } from "@/components/Image"
import Link from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import type { Badge } from "../types"

interface CollectiblesPreviousYearsProps {
  badges: Badge[]
}

const CollectiblesPreviousYears = ({
  badges,
}: CollectiblesPreviousYearsProps) => {
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
      <h2 className="mb-8 text-xl">{t("page-collectibles-previous-years")}</h2>
      {years.length > 0 ? (
        years.map((year) => {
          const badgeCount = grouped[year].length
          // Sum collectorsCount for all badges in this year
          const collectorsCount = grouped[year].reduce(
            (sum: number, badge: Badge) => sum + (badge.collectors_count || 0),
            0
          )
          return (
            <div key={year} className="mb-12 space-y-4 md:space-y-6">
              <div className="flex items-center gap-6 border-b py-4">
                <h3 className="text-2xl md:text-3xl">{year}</h3>
                <div className="flex gap-2">
                  <Tag>
                    {t("page-collectibles-previous-years-badge-count", {
                      count: badgeCount,
                    })}
                  </Tag>
                  <Tag>
                    {t("page-collectibles-previous-years-collectors-count", {
                      count: collectorsCount,
                    })}
                  </Tag>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4 md:gap-6">
                {grouped[year].map((badge: Badge) => {
                  const sanitizedName = badge.name
                    .replace(/\s?ethereum.org\s?/i, " ") // Remove "ethereum.org" from label
                    .replace(new RegExp(` ?${year} ?`), " ") // Remove year (shown in section header)
                    .replace(/\s?\(\s?\)\s?/, " ") // Remove any empty parentheses
                    .replace(/\s+/, " ") // Trim sequential whitespace to single space
                    .trim() // Trim edge whitespace
                    .replace(/\son$/, "") // Remove cases of trailing " on" after sanitizing
                  const label =
                    sanitizedName[0].toUpperCase() + sanitizedName.slice(1) // Force capitalize first character
                  return (
                    <Link
                      key={badge.id}
                      href={badge.link}
                      className="group flex flex-col items-center gap-3 rounded-xl p-2 text-center"
                      hideArrow
                    >
                      <Image
                        width={80}
                        height={80}
                        sizes="80px"
                        src={badge.image}
                        alt={badge.name}
                        className="size-16 transition-transform group-hover:scale-105 group-hover:transition-transform md:size-20"
                      />
                      <div className="text-xs text-primary md:text-sm">
                        {label}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })
      ) : (
        <div className="text-lg font-bold">
          {t("page-collectibles-previous-years-no-badges")}
        </div>
      )}
    </section>
  )
}

export default CollectiblesPreviousYears
