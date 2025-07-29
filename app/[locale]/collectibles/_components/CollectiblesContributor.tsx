"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { useIsMounted } from "usehooks-ts"
import { useAccount } from "wagmi"

import { Image } from "@/components/Image"
import { Progress } from "@/components/ui/progress"

import { CollectiblesConnectButton } from "./CollectiblesConnectButton"
import { BadgeWithOwned } from "./CollectiblesContent"

import alreadyContributorImg from "@/public/images/10-year-anniversary/adoption-1.png"

type CollectiblesContributorProps = {
  badges: BadgeWithOwned[]
}

const CollectiblesContributor = ({ badges }: CollectiblesContributorProps) => {
  const t = useTranslations("page-collectibles")

  const isMounted = useIsMounted()
  const { isConnected } = useAccount()

  const currentYear = new Date().getFullYear().toString()
  const currentYearBadges = badges.filter(
    (badge) => String(badge.year) === currentYear
  )
  const ownedCount = currentYearBadges.filter((b) => b.owned).length

  return (
    <div className="flex w-full flex-col gap-y-4 rounded-2xl border border-accent-a/5 bg-gradient-to-b from-accent-a/5 to-accent-a/10 px-6 py-6 lg:max-w-xs dark:from-accent-a/10 dark:to-accent-a/20">
      <Image
        src={alreadyContributorImg}
        alt={t("page-collectibles-contributor-img-alt")}
        className="h-32 w-32 object-cover"
      />
      <div>
        <h3 className="text-lg">{t("page-collectibles-already-title")}</h3>
        <p className="text-body-medium">
          {t("page-collectibles-already-desc")}
        </p>
      </div>

      <CollectiblesConnectButton />

      {isMounted() && isConnected && (
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
      )}
    </div>
  )
}

export default CollectiblesContributor
