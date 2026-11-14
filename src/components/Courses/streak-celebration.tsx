"use client"

import { useEffect, useRef } from "react"
import { Check, Flame } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"
import { formatDateTime } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import { useCountUp } from "./use-count-up"

const COUNT_DELAY = 0.5
const DAY_DELAY = 1.3

/** Shown once per day: after the first lesson that extends the streak */
const StreakCelebration = ({ streak }: { streak: number }) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const animate = !useReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => headingRef.current?.focus(), [])

  const count = useCountUp(streak - 1, streak, {
    enabled: animate,
    delay: COUNT_DELAY,
    duration: 500,
  })
  const int = numberFormat(locale)

  // A streak week starts on the streak's first day and refills every 7 days.
  // Labels format at UTC noon of each local date so they can't drift a day.
  const offset = (streak - 1) % 7
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - offset + i)
    const noon = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12)
    return {
      label: formatDateTime(locale, noon, { weekday: "narrow" }),
      name: formatDateTime(locale, noon, { weekday: "long" }),
      lit: i <= offset,
      today: i === offset,
    }
  })

  return (
    <div className="flex flex-col items-center gap-6 pt-6 text-center">
      <motion.div
        aria-hidden
        className="relative"
        initial={animate ? { scale: 0.2, rotate: -15 } : false}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 12 }}
      >
        <Flame className="size-36 fill-orange-500 text-orange-700 dark:fill-orange-400 dark:text-orange-500" />
        {animate && (
          <motion.span
            className="absolute inset-0 rounded-full bg-orange-400/30 blur-2xl"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.3, 1], opacity: [0, 1, 0.6] }}
            transition={{ delay: COUNT_DELAY, duration: 0.8 }}
          />
        )}
      </motion.div>

      <div role="status" className="flex flex-col items-center gap-1">
        <motion.span
          key={Math.round(count)}
          initial={animate ? { scale: 1.4 } : false}
          animate={{ scale: 1 }}
          className="text-7xl leading-none font-black text-orange-700 tabular-nums dark:text-orange-400"
        >
          {int.format(Math.round(count))}
        </motion.span>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="m-0 text-h3 font-black text-orange-700 outline-none dark:text-orange-400"
        >
          {t("page-courses-stats-streak")}
        </h2>
      </div>

      <ol
        aria-label={t("page-courses-streak-week")}
        className="m-0 flex list-none gap-2 rounded-2xl border-2 border-border p-3"
      >
        {days.map(({ label, name, lit, today }, i) => (
          <li
            key={i}
            className="m-0 flex flex-col items-center gap-1 text-sm font-bold text-body-medium"
          >
            <span aria-hidden>{label}</span>
            <motion.span
              className={cn(
                "grid size-8 place-items-center rounded-full",
                lit ? "bg-orange-700 text-white" : "bg-background-highlight"
              )}
              initial={animate && today ? { scale: 0 } : false}
              animate={{ scale: 1 }}
              transition={{
                delay: DAY_DELAY,
                type: "spring",
                stiffness: 400,
                damping: 14,
              }}
            >
              {lit && <Check className="size-4" strokeWidth={3} aria-hidden />}
              <span className="sr-only">
                {lit
                  ? t("page-courses-streak-day-done", { day: name })
                  : t("page-courses-streak-day-ahead", { day: name })}
              </span>
            </motion.span>
          </li>
        ))}
      </ol>

      <motion.p
        className="m-0 max-w-sm text-lg font-bold"
        initial={animate ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: DAY_DELAY + 0.2 }}
      >
        {streak === 1
          ? t("page-courses-complete-streak-start")
          : t("page-courses-complete-streak-continue", { count: streak })}
      </motion.p>
    </div>
  )
}

export default StreakCelebration
