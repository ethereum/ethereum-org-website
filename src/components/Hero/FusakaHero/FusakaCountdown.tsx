"use client"

import { useEffect, useState } from "react"
import humanizeDuration from "humanize-duration"
import { useLocale, useTranslations } from "next-intl"

const fusakaDate = new Date("2025-12-03T21:49:11.000Z")
const fusakaDateTime = fusakaDate.getTime()
const SECONDS = 1000

type TimeUnits = {
  days: number
  hours: number
  minutes: number
  seconds: number | null
  isExpired: boolean
}

type TimeLabels = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

const getTimeUnits = (): TimeUnits => {
  const now = Date.now()
  const timeLeft = fusakaDateTime - now

  if (timeLeft < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: null,
      isExpired: true,
    }
  }

  const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000))
  const hours = Math.floor(
    (timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  )
  const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))
  const seconds =
    days === 0 ? Math.floor((timeLeft % (60 * 1000)) / 1000) : null

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  }
}

const getTimeLabels = (locale: string): TimeLabels => {
  const baseOptions = {
    round: true,
    language: locale,
  }

  try {
    // Use humanizeDuration to get translated unit names (plural forms)
    // Format 2 units of each type to get plural forms
    const twoDays = humanizeDuration(2 * 24 * 60 * 60 * 1000, {
      ...baseOptions,
      units: ["d"],
    })
    const twoHours = humanizeDuration(2 * 60 * 60 * 1000, {
      ...baseOptions,
      units: ["h"],
    })
    const twoMinutes = humanizeDuration(2 * 60 * 1000, {
      ...baseOptions,
      units: ["m"],
    })
    const twoSeconds = humanizeDuration(2 * 1000, {
      ...baseOptions,
      units: ["s"],
    })

    // Extract unit names (remove the number)
    const extractUnit = (str: string): string => {
      // Remove leading numbers, whitespace, and any separators
      // Handles formats like "1 day", "1d", "1 jour", etc.
      return str
        .replace(/^\d+\s*/, "") // Remove leading number and space
        .replace(/^\d+/, "") // Remove any remaining leading number (for formats like "1d")
        .trim()
        .split(/\s+/)[0] // Take first word in case of multiple words
    }

    return {
      days: extractUnit(twoDays),
      hours: extractUnit(twoHours),
      minutes: extractUnit(twoMinutes),
      seconds: extractUnit(twoSeconds),
    }
  } catch {
    // Fallback to English if translation fails
    return {
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
    }
  }
}

const FusakaCountdown = () => {
  const locale = useLocale()
  const t = useTranslations("page-index")
  const [timeUnits, setTimeUnits] = useState<TimeUnits>(() => getTimeUnits())
  const [labels, setLabels] = useState<TimeLabels>(() => getTimeLabels(locale))

  useEffect(() => {
    setLabels(getTimeLabels(locale))
  }, [locale])

  useEffect(() => {
    const updateCountdown = () => {
      setTimeUnits(getTimeUnits())
    }

    const interval = setInterval(updateCountdown, SECONDS)

    return () => clearInterval(interval)
  }, [])

  if (timeUnits.isExpired) {
    return (
      <p className="text-2xl font-extrabold text-white">
        {t("page-index-fusaka-live-now")}
      </p>
    )
  }

  return (
    <div className="flex items-center justify-center gap-4">
      {timeUnits.days > 0 && (
        <div className="flex flex-col items-center">
          <p className="text-xl font-extrabold text-white lg:text-3xl">
            {String(timeUnits.days).padStart(2, "0")}
          </p>
          <p className="text-xs font-bold uppercase text-white">
            {labels.days}
          </p>
        </div>
      )}
      <div className="flex flex-col items-center">
        <p className="text-xl font-extrabold text-white lg:text-3xl">
          {String(timeUnits.hours).padStart(2, "0")}
        </p>
        <p className="text-xs font-bold uppercase text-white">{labels.hours}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl font-extrabold text-white lg:text-3xl">
          {String(timeUnits.minutes).padStart(2, "0")}
        </p>
        <p className="text-xs font-bold uppercase text-white">
          {labels.minutes}
        </p>
      </div>
      {timeUnits.seconds !== null && (
        <div className="flex flex-col items-center">
          <p className="text-xl font-extrabold text-white lg:text-3xl">
            {String(timeUnits.seconds).padStart(2, "0")}
          </p>
          <p className="text-xs font-bold uppercase text-white">
            {labels.seconds}
          </p>
        </div>
      )}
    </div>
  )
}

export default FusakaCountdown
