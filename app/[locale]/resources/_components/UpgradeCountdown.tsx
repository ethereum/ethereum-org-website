"use client"

import { useEffect, useState } from "react"
import humanizeDuration from "humanize-duration"
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
      // include pending entries as long as they have a valid date string
      if (typeof details.dateTimeAsString !== "string") return acc

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

    const countdown = () => {
      const now = Date.now()
      const timeLeft = scalingUpgradeDateTime - now

      // If the date has past, set the countdown to null
      if (timeLeft < 0) return setUpgradeCountdown(null)

      setUpgradeCountdown(
        humanizeDuration(timeLeft, { units: ["d", "h", "m", "s"], round: true })
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
        href={`/roadmap/${upgrade}/`}
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
