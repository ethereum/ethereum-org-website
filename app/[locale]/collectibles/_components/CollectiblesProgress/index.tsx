"use client"

import React from "react"
import { useLocale } from "next-intl"

import { Progress } from "@/components/ui/progress"

import { type BadgeWithOwned } from "../CollectiblesContent"

import useTranslation from "@/hooks/useTranslation"

type CollectiblesProgressProps = {
  badges: BadgeWithOwned[]
}

const CollectiblesProgress = ({ badges }: CollectiblesProgressProps) => {
  const { t } = useTranslation("page-collectibles")
  const locale = useLocale()

  const currentYear = new Date().getFullYear().toString()
  const currentYearBadges = badges.filter(
    (badge) => String(badge.year) === currentYear
  )
  const ownedCount = currentYearBadges.filter((b) => b.owned).length
  const contributorSinceYear = badges
    .filter((b) => b.owned)
    .reduce(
      // Return the oldest badge date
      (prev, curr) => {
        const currYear = Number(curr.year)
        return !isNaN(currYear) && currYear < prev ? currYear : prev
      },
      Infinity
    )

  return (
    <>
      {contributorSinceYear < Infinity && (
        <p className="text-body-medium">
          {t("page-collectibles-contributing-since")}:{" "}
          {new Intl.DateTimeFormat(locale, {
            year: "numeric",
          }).format(new Date().setFullYear(contributorSinceYear))}
        </p>
      )}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="font-bold">
            {t("page-collectibles-contributor-progress-label")} ({currentYear})
          </span>
          <span>
            {ownedCount}/{currentYearBadges.length}
          </span>
        </div>

        <Progress
          color="primary"
          className="h-2.5"
          value={(ownedCount / (currentYearBadges.length || 1)) * 100}
        />
      </div>
      <p className="text-sm text-body-medium">
        {t("page-collectibles-index-frequency")}
      </p>
    </>
  )
}

export default CollectiblesProgress
