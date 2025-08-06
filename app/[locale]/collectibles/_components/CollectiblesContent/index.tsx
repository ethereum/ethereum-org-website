"use client"

import { useMemo } from "react"
import { useIsMounted } from "usehooks-ts"
import { useAccount } from "wagmi"
import { useQuery } from "@tanstack/react-query"

import { Image } from "@/components/Image"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils/cn"

import { COLLECTIBLES_BASE_URL } from "../../constants"
import type { Badge } from "../../types"
import { type CollectiblesPageProps } from "../Collectibles"
import CollectiblesConnectButton from "../CollectiblesConnectButton/lazy"
import CollectiblesCurrentYear from "../CollectiblesCurrentYear"
import CollectiblesPreviousYears from "../CollectiblesPreviousYears"
import CollectiblesProgress from "../CollectiblesProgress/lazy"

import useTranslation from "@/hooks/useTranslation"
import alreadyContributorImg from "@/public/images/10-year-anniversary/adoption-1.png"

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

  const isMounted = useIsMounted()
  const { address, isConnected } = useAccount()

  const {
    data: addressBadges = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["addressBadges", address],
    queryFn: async (): Promise<Badge[]> => {
      if (!address) return []
      const response = await fetch(`${ADDRESS_STATS_API}${address}`)
      if (!response.ok) {
        throw new Error("Failed to fetch address badges")
      }
      return response.json()
    },
    enabled: !!address,
    // staleTime: ???
  })

  const badgesWithOwned = useMemo((): BadgeWithOwned[] => {
    return badges.map((badge) => {
      const addressBadge = addressBadges.find((b) => b.id === badge.id)
      return {
        ...badge,
        owned: addressBadge ? true : false,
      }
    })
  }, [badges, addressBadges])

  return (
    <div className="flex flex-col gap-8 xl:flex-row">
      {/* Already a contributor? section */}
      <div className="flex h-fit w-full flex-col gap-y-4 rounded-2xl border border-accent-a/5 bg-gradient-to-b from-accent-a/5 to-accent-a/10 px-6 py-6 xl:sticky xl:top-28 xl:max-w-xs dark:from-accent-a/10 dark:to-accent-a/20">
        <Image
          src={alreadyContributorImg}
          alt={t("page-collectibles-contributor-img-alt")}
          className="h-32 w-32 object-cover"
          sizes="128px"
        />
        <div>
          <h3 className="text-lg">{t("page-collectibles-already-title")}</h3>
          <p className="text-body-medium">
            {t("page-collectibles-already-desc")}
          </p>
        </div>

        <CollectiblesConnectButton />

        {isConnected && !isLoading && !error && (
          <CollectiblesProgress badges={badgesWithOwned} />
        )}
        {isLoading && (
          <div className="flex w-full flex-col gap-y-4">
            <Skeleton className="h-10 w-full rounded-2xl" />
            <Skeleton className="h-10 w-full rounded-2xl" />
          </div>
        )}
        {error && (
          <div className="text-body-medium text-red-500">
            Error fetching address badges
          </div>
        )}
      </div>

      {/* How it works section */}
      <div className="flex-1 space-y-8">
        <section className="mx-auto space-y-6 border-b p-2 pb-6">
          <h2 className="text-4xl">{t("page-collectibles-how-title")}</h2>
          <div className="flex flex-col justify-center gap-8 py-4 md:flex-row md:items-center md:gap-12">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="flex w-full flex-1 flex-row items-center gap-4 max-md:max-w-xs"
              >
                <div
                  className={cn(
                    "flex size-16 shrink-0 items-center justify-center rounded-full border text-2xl font-bold shadow-2xl xl:size-20",
                    step.color
                  )}
                >
                  {idx + 1}
                </div>
                <div className="space-y-1 text-lg">
                  <div className="font-bold">{step.title}</div>
                  <div>{step.description}</div>
                </div>
              </div>
            ))}
          </div>
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
    </div>
  )
}

export default CollectiblesContent
