"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"

import type { NetworkUpgradeDetails } from "@/lib/types"

import { BaseLink } from "@/components/ui/Link"

import networkUpgradeSummaryData from "@/data/networkUpgradeSummaryData"

const getLatestNetworkUpgradeDate = () => {
  const entries = Object.entries(networkUpgradeSummaryData) as [
    string,
    NetworkUpgradeDetails,
  ][]

  const result = entries.reduce<[string | null, string | null]>(
    (acc, [network, details]) => {
      // ignore pending or missing date entries
      if (details.isPending || typeof details.dateTimeAsString !== "string")
        return acc

      const candidateTime = Date.parse(details.dateTimeAsString)
      if (isNaN(candidateTime)) return acc

      const [, accDate] = acc
      if (!accDate) return [network, details.dateTimeAsString]

      const accTime = Date.parse(accDate)
      if (isNaN(accTime) || candidateTime > accTime) {
        return [network, details.dateTimeAsString]
      }

      return acc
    },
    [null, null]
  )

  return result
}

const UpgradeCountdown = () => {
  const locale = useLocale()
  const [scalingUpgradeCountdown, setUpgradeCountdown] = useState<
    string | null
  >("Loading...")
  const [upgrade, upgradeDate] = getLatestNetworkUpgradeDate()

  useEffect(() => {
    // Countdown time for Scaling Upgrade to the final date of May 7 2025
    // const scalingUpgradeDate = new Date("2025-05-07T00:00:00Z")

    const scalingUpgradeDate = new Date(upgradeDate || "2025-05-07T00:00:00Z")
    const scalingUpgradeDateTime = scalingUpgradeDate.getTime()
    const SECONDS = 1000
    const MINUTES = SECONDS * 60
    const HOURS = MINUTES * 60
    const DAYS = HOURS * 24

    const countdown = () => {
      const now = Date.now()
      const timeLeft = scalingUpgradeDateTime - now

      // If the date has past, set the countdown to null
      if (timeLeft < 0) return setUpgradeCountdown(null)

      const daysLeft = Math.floor(timeLeft / DAYS)
      const hoursLeft = Math.floor((timeLeft % DAYS) / HOURS)
      const minutesLeft = Math.floor((timeLeft % HOURS) / MINUTES)
      const secondsLeft = Math.floor((timeLeft % MINUTES) / SECONDS)

      setUpgradeCountdown(
        `${daysLeft}days :: ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`
      )
    }
    countdown()

    let interval: NodeJS.Timeout | undefined

    if (scalingUpgradeCountdown !== null) {
      // Only run the interval if the date has not passed
      interval = setInterval(countdown, SECONDS)
    }

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!upgrade || !upgradeDate) return "—"
  return (
    <>
      <BaseLink
        href="/roadmap/pectra/"
        className="text-5xl font-bold text-body no-underline hover:text-primary"
      >
        {upgrade.slice(0, 1).toUpperCase() + upgrade.slice(1)}
      </BaseLink>
      <div className="text-xl font-bold text-body-medium">
        {scalingUpgradeCountdown ? (
          scalingUpgradeCountdown
        ) : (
          <div className="rounded-full bg-success px-2 py-1 text-xs font-normal uppercase text-success-light">
            Live Since{" "}
            {new Intl.DateTimeFormat(locale, {}).format(new Date(upgradeDate))}
          </div>
        )}
      </div>
    </>
  )
}

export default UpgradeCountdown
