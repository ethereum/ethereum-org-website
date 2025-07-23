"use client"

import { useEffect, useState } from "react"

import type { TimeLeftLabels } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

interface CountDownProps {
  className?: string
  timeLeftLabels: TimeLeftLabels
  expiredLabel: string
  dateTime: string
  hideZeroUnits?: boolean
}

const CountDown = ({
  className,
  timeLeftLabels,
  expiredLabel,
  dateTime,
  hideZeroUnits = false,
}: CountDownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const targetDate = new Date(dateTime)

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setIsExpired(false)
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setIsExpired(true)
      }
    }

    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isExpired) {
    return <div className="text-center text-2xl font-bold">{expiredLabel}</div>
  }

  return (
    <div className="flex items-center justify-center gap-10 text-accent-a">
      {(!hideZeroUnits || timeLeft.days > 0) && (
        <div
          className={cn(
            "flex h-20 w-20 flex-col items-center justify-center rounded-2xl border text-center [box-shadow:-2.372px_2.372px_14.234px_1.186px_rgba(52,43,64,0.02),-18.979px_18.979px_14.234px_-3.559px_rgba(52,43,64,0.02),-37.958px_37.958px_28.469px_-7.117px_rgba(52,43,64,0.02),-47.448px_47.448px_47.448px_-14.234px_rgba(88,55,131,0.04)] dark:bg-[#171717]",
            className
          )}
        >
          <div className="font-mono text-4xl font-bold">{timeLeft.days}</div>
          <div className="font-mono text-xs">
            {timeLeft.days === 1
              ? timeLeftLabels.days.singular
              : timeLeftLabels.days.plural}
          </div>
        </div>
      )}
      {(!hideZeroUnits || timeLeft.days > 0 || timeLeft.hours > 0) && (
        <div
          className={cn(
            "flex h-20 w-20 flex-col items-center justify-center rounded-2xl border text-center [box-shadow:-2.372px_2.372px_14.234px_1.186px_rgba(52,43,64,0.02),-18.979px_18.979px_14.234px_-3.559px_rgba(52,43,64,0.02),-37.958px_37.958px_28.469px_-7.117px_rgba(52,43,64,0.02),-47.448px_47.448px_47.448px_-14.234px_rgba(88,55,131,0.04)] dark:bg-[#171717]",
            className
          )}
        >
          <div className="font-mono text-4xl font-bold">{timeLeft.hours}</div>
          <div className="font-mono text-xs">
            {timeLeft.hours === 1
              ? timeLeftLabels.hours.singular
              : timeLeftLabels.hours.plural}
          </div>
        </div>
      )}
      {(!hideZeroUnits ||
        timeLeft.days > 0 ||
        timeLeft.hours > 0 ||
        timeLeft.minutes > 0) && (
        <div
          className={cn(
            "flex h-20 w-20 flex-col items-center justify-center rounded-2xl border text-center [box-shadow:-2.372px_2.372px_14.234px_1.186px_rgba(52,43,64,0.02),-18.979px_18.979px_14.234px_-3.559px_rgba(52,43,64,0.02),-37.958px_37.958px_28.469px_-7.117px_rgba(52,43,64,0.02),-47.448px_47.448px_47.448px_-14.234px_rgba(88,55,131,0.04)] dark:bg-[#171717]",
            className
          )}
        >
          <div className="font-mono text-4xl font-bold">{timeLeft.minutes}</div>
          <div className="font-mono text-xs">
            {timeLeft.minutes === 1
              ? timeLeftLabels.minutes.singular
              : timeLeftLabels.minutes.plural}
          </div>
        </div>
      )}
      {(!hideZeroUnits ||
        timeLeft.days > 0 ||
        timeLeft.hours > 0 ||
        timeLeft.minutes > 0 ||
        timeLeft.seconds > 0) && (
        <div
          className={cn(
            "hidden h-20 w-20 flex-col items-center justify-center rounded-2xl border text-center [box-shadow:-2.372px_2.372px_14.234px_1.186px_rgba(52,43,64,0.02),-18.979px_18.979px_14.234px_-3.559px_rgba(52,43,64,0.02),-37.958px_37.958px_28.469px_-7.117px_rgba(52,43,64,0.02),-47.448px_47.448px_47.448px_-14.234px_rgba(88,55,131,0.04)] lg:flex dark:bg-[#171717]",
            className
          )}
        >
          <div className="font-mono text-4xl font-bold">{timeLeft.seconds}</div>
          <div className="font-mono text-xs">
            {timeLeft.seconds === 1
              ? timeLeftLabels.seconds.singular
              : timeLeftLabels.seconds.plural}
          </div>
        </div>
      )}
    </div>
  )
}

export default CountDown
