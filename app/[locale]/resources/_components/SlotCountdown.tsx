"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"

import RadialChart from "@/components/RadialChart"

const SlotCountdownChart = ({ children }: { children: string }) => {
  const [timeToNextBlock, setTimeToNextBlock] = useState(12)
  const locale = useLocale()

  useEffect(() => {
    const genesisTime = new Date("2020-12-01T12:00:23Z").getTime()
    const updateTime = () => {
      const now = Date.now()
      const timeElapsed = (now - genesisTime) / 1000
      const timeToNext = 12 - (timeElapsed % 12)
      setTimeToNextBlock(Math.floor(timeToNext) || 12)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pb-8 pt-4">
      <RadialChart
        value={timeToNextBlock}
        totalValue={12}
        displayValue={new Intl.NumberFormat(locale, {
          style: "unit",
          unit: "second",
          unitDisplay: "narrow",
        }).format(timeToNextBlock)}
        label={children}
      />
    </div>
  )
}

export default SlotCountdownChart
