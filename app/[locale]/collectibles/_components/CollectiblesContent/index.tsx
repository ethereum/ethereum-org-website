"use client"

import React, { useEffect, useState } from "react"
import { useIsMounted } from "usehooks-ts"
import { useAccount } from "wagmi"

import { COLLECTIBLES_BASE_URL } from "../../constants"
import type { Badge } from "../../types"
import { type CollectiblesPageProps } from "../collectibles"
import CollectiblesContributor from "../CollectiblesContributor"
import CollectiblesCurrentYear from "../CollectiblesCurrentYear"
import CollectiblesPreviousYears from "../CollectiblesPreviousYears"

import useTranslation from "@/hooks/useTranslation"

export type BadgeWithOwned = Badge & {
  owned: boolean
}

const ADDRESS_STATS_API = `${COLLECTIBLES_BASE_URL}/api/stats/`

const CollectiblesContent = ({ badges }: CollectiblesPageProps) => {
  const { t } = useTranslation("page-collectibles")

  const currentYear = new Date().getFullYear().toString()

  const steps = [
    {
      title: t("page-collectibles-how-step1-title"),
      description: t("page-collectibles-how-step1-desc"),
      color: "text-accent-a",
    },
    {
      title: t("page-collectibles-how-step2-title"),
      description: t("page-collectibles-how-step2-desc"),
      color: "text-accent-b",
    },
    {
      title: t("page-collectibles-how-step3-title"),
      description: t("page-collectibles-how-step3-desc"),
      color: "text-accent-c",
    },
  ]

  const [addressBadges, setAddressBadges] = useState<Badge[]>([])
  const [badgesWithOwned, setBadgesWithOwned] = useState<BadgeWithOwned[]>([])

  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount()

  useEffect(() => {
    const updateBadgesWithOwned = async () => {
      const response = await fetch(`${ADDRESS_STATS_API}${address}`)
      const badgesFromAddress = await response.json()
      const newBadgedWithOwned: BadgeWithOwned[] = badges.map((badge) => {
        const addressBadge = badgesFromAddress.find((b) => b.id === badge.id)
        return {
          ...badge,
          owned: addressBadge ? true : false,
        }
      })
      setAddressBadges(badgesFromAddress)
      setBadgesWithOwned(newBadgedWithOwned)
    }
    if (address) {
      updateBadgesWithOwned()
    } else {
      setAddressBadges([])
      setBadgesWithOwned(badges.map((badge) => ({ ...badge, owned: false })))
    }
  }, [address, badges])

  return (
    <section className="mx-auto mb-8 flex w-full flex-col gap-8 px-4 lg:flex-row lg:items-start lg:justify-center dark:bg-black">
      {/* Already a contributor? section */}
      <CollectiblesContributor badges={badgesWithOwned} />

      {/* How it works section */}
      <div className="flex-1 dark:text-white">
        <section className="mx-auto p-2">
          <h2 className="mb-12 text-2xl font-bold text-[#3B2C4A] dark:text-white">
            {t("page-collectibles-how-title")}
          </h2>
          <div className="mb-6 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-12 dark:text-white">
            {steps.map((step, idx) => {
              return (
                <div
                  key={step.title}
                  className="flex w-full max-w-xs flex-1 flex-row items-center md:max-w-none"
                >
                  <div
                    className={`mr-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-100 bg-white text-2xl font-bold md:h-16 md:w-16 md:text-3xl dark:bg-transparent ${step.color}`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-1 text-left text-base font-bold text-[#3B2C4A] md:text-lg dark:text-white">
                      {step.title}
                    </div>
                    <div className="mb-2 max-w-[180px] text-left text-xs text-gray-500 md:text-sm dark:text-gray-400">
                      {step.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="h-px w-full bg-[#E5E7EB] dark:bg-[#23202A]" />
        </section>

        <CollectiblesCurrentYear
          badges={badgesWithOwned.filter(
            (badge) => String(badge.year) === currentYear
          )}
          address={address}
        />

        <CollectiblesPreviousYears
          badges={isMounted() && isConnected ? addressBadges : badges}
        />
      </div>
    </section>
  )
}

export default CollectiblesContent
