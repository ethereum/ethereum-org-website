"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { useIsMounted } from "usehooks-ts"
import { useAccount } from "wagmi"

import { Image } from "@/components/Image"

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
    <div className="mx-auto flex w-full flex-col rounded-2xl border border-[#E5D6FF] bg-[#F6F1FF] px-6 py-6 shadow lg:max-w-xs xl:mt-0 xl:self-start dark:border-[#2D2536] dark:bg-gradient-to-br dark:from-[#2B3A4B] dark:to-[#1B2A3A] dark:text-white dark:shadow-[0_0_12px_#4FC3FF]">
      <Image
        src={alreadyContributorImg}
        alt={t("page-collectibles-contributor-img-alt")}
        className="h-32 w-32 object-cover"
      />
      <h3 className="mb-1 mt-4 text-lg font-bold text-[#3B2C4A] dark:text-white">
        {t("page-collectibles-already-title")}
      </h3>
      <p className="mb-4 text-sm text-[#4B445A] dark:text-gray-300">
        {t("page-collectibles-already-desc")}
      </p>

      <CollectiblesConnectButton />

      {isMounted() && isConnected && (
        <div className="mt-4 w-full">
          <div className="mb-1 flex justify-between text-xs font-medium">
            <span className="font-semibold">
              {t("page-collectibles-contributor-progress-this-year")}
            </span>
            <span>
              {ownedCount}/{currentYearBadges.length}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2.5 rounded-full bg-purple-500 transition-all"
              style={{
                width: `${(ownedCount / (currentYearBadges.length || 1)) * 100}%`,
              }}
            />
          </div>
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
