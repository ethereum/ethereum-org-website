"use client"

import React from "react"

import { Progress } from "@/components/ui/progress"

import { type BadgeWithOwned } from "../CollectiblesContent"

import useTranslation from "@/hooks/useTranslation"

type CollectiblesProgressProps = {
  badges: BadgeWithOwned[]
}

const CollectiblesProgress = ({ badges }: CollectiblesProgressProps) => {
  const { t } = useTranslation("page-collectibles")

  const currentYear = new Date().getFullYear().toString()
  const currentYearBadges = badges.filter(
    (badge) => String(badge.year) === currentYear
  )
  const ownedCount = currentYearBadges.filter((b) => b.owned).length

  return (
    <div className="mt-4 w-full">
      <div className="mb-1 flex justify-between text-xs font-medium">
        <span className="font-semibold">
          {t("page-collectibles-contributor-progress-label")}
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
      <div className="mt-2 text-center text-xs text-gray-600 dark:text-gray-300">
        {t("page-collectibles-contributor-progress-total", {
          count: badges.filter((b) => b.owned).length,
        })}
      </div>
    </div>
  )
}

export default CollectiblesProgress
