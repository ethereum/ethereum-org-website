"use client"

import React, { useEffect, useState } from "react"
import { useIsMounted } from "usehooks-ts"
import { useAccount } from "wagmi"

import { ChildOnlyProp } from "@/lib/types"

import { HubHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import { Flex } from "@/components/ui/flex"

import { Badge } from "../page"

import { CollectiblesPageProps } from "./collectibles"
import CollectiblesContributor from "./CollectiblesContributor"
import CollectiblesCurrentYear from "./CollectiblesCurrentYear"
import CollectiblesPreviousYears from "./CollectiblesPreviousYears"

import useTranslation from "@/hooks/useTranslation"
import communityHeroImg from "@/public/images/heroes/community-hero.png"

export type BadgeWithOwned = Badge & {
  owned: boolean
}

const COLLECTIBLES_BASE_URL = "https://ethereum-org-collectibles.vercel.app"
const ADDRESS_STATS_API = `${COLLECTIBLES_BASE_URL}/api/stats/`

const Page = ({ children }: ChildOnlyProp) => {
  return (
    <Flex asChild className="mx-auto w-full flex-col items-center">
      <MainArticle>{children}</MainArticle>
    </Flex>
  )
}

const CollectiblesContent: React.FC<CollectiblesPageProps> = ({
  badges,
  stats,
  locale,
}) => {
  const { t } = useTranslation("page-collectibles")

  const currentYear = new Date().getFullYear().toString()

  const steps = [
    {
      title: t("page-collectibles-how-step1-title"),
      description: t("page-collectibles-how-step1-desc"),
      color: "text-[#2563EB]",
    },
    {
      title: t("page-collectibles-how-step2-title"),
      description: t("page-collectibles-how-step2-desc"),
      color: "text-[#A259FF]",
    },
    {
      title: t("page-collectibles-how-step3-title"),
      description: t("page-collectibles-how-step3-desc"),
      color: "text-[#00B686]",
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
    <Page>
      <HubHero
        heroImg={communityHeroImg}
        title={t("page-collectibles-hero-title")}
        header={t("page-collectibles-hero-header")}
        description={t("page-collectibles-hero-description")}
        className="dark:bg-black"
      />

      {/* Already a contributor? + Improve ethereum.org + Stats section */}
      <section className="mb-8 mt-2 flex w-full items-stretch justify-center py-0 md:mt-8 dark:bg-black">
        <div className="flex w-full flex-col gap-6 px-4 md:flex-row">
          {/* Improve Card */}
          <div className="flex flex-[2] flex-col rounded-2xl border border-[#E5D6FF] bg-[#F6F1FF] px-8 py-12 shadow-lg dark:border-[#3B2C4A] dark:bg-gradient-to-br dark:from-[#2B2233] dark:to-[#4B3269] dark:text-[#F3F3F5]">
            <h2 className="mb-4 text-xl font-extrabold text-[#3B2C4A] md:text-2xl dark:text-[#F3F3F5]">
              {t("page-collectibles-improve-title")}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[#4B445A] md:text-base dark:text-[#F3F3F5]">
              {t.rich("page-collectibles.page-collectibles-improve-desc-1", {
                strong: (chunks) => <span className="font-bold">{chunks}</span>,
              })}
            </p>
            <p className="text-sm leading-relaxed text-[#4B445A] md:text-base dark:text-[#F3F3F5]">
              {t.rich("page-collectibles.page-collectibles-improve-desc-2", {
                strong: (chunks) => <span className="font-bold">{chunks}</span>,
                em: (chunks) => (
                  <span className="font-bold text-[#A259FF]">{chunks}</span>
                ),
              })}
            </p>
          </div>
          {/* Stats */}
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 md:justify-start">
            {/* Minted - full row */}
            <div className="mb-2 flex w-full flex-col items-center rounded-xl border border-[#B6D0FF] bg-[#E6F0FF] px-6 py-6 text-[#2563EB] shadow-lg dark:border-[#2D2536] dark:bg-gradient-to-br dark:from-[#2B3A4B] dark:to-[#1B2A3A] dark:text-white dark:shadow-[0_0_12px_#4FC3FF]">
              <div className="mb-1 text-3xl font-extrabold md:text-4xl dark:text-[#4FC3FF] dark:drop-shadow-[0_0_8px_#4FC3FF]">
                {stats.collectorsCount?.toLocaleString(locale) ?? "-"}
              </div>
              <div className="text-base font-medium dark:text-[#4FC3FF] dark:drop-shadow-[0_0_8px_#4FC3FF]">
                {t("page-collectibles-stats-minted")}
              </div>
            </div>
            {/* Second row: Collectors and Unique Badges */}
            <div className="flex w-full flex-row gap-4">
              <div className="flex flex-1 flex-col items-center rounded-xl border border-[#E5D6FF] bg-[#F6E6FF] px-6 py-6 text-[#A259FF] shadow-lg dark:border-[#2D2536] dark:bg-gradient-to-br dark:from-[#3B2C4A] dark:to-[#2B2233] dark:text-[#C084FC] dark:drop-shadow-[0_0_8px_#C084FC]">
                <div className="mb-1 text-3xl font-extrabold md:text-4xl">
                  {stats.uniqueAddressesCount?.toLocaleString(locale) ?? "-"}
                </div>
                <div className="text-base font-medium">
                  {t("page-collectibles-stats-collectors")}
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center rounded-xl border border-[#B6F0D6] bg-[#E6FFF6] px-6 py-6 text-[#00B686] shadow-lg dark:border-[#2D2536] dark:bg-gradient-to-br dark:from-[#1B3A2A] dark:to-[#1B2A1A] dark:text-[#5FFFD7] dark:drop-shadow-[0_0_8px_#5FFFD7]">
                <div className="mb-1 text-3xl font-extrabold md:text-4xl">
                  {stats.collectiblesCount?.toLocaleString(locale) ?? "-"}
                </div>
                <div className="text-base font-medium">
                  {t("page-collectibles-stats-unique-badges")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works + Already a contributor? section */}
      <section className="mx-auto mb-8 flex w-full flex-col gap-8 px-4 lg:flex-row lg:items-start lg:justify-center dark:bg-black">
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
    </Page>
  )
}

export default CollectiblesContent
