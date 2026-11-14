"use client"

import { useEffect, useRef, useState } from "react"
import {
  Coins,
  Cpu,
  FileText,
  Puzzle,
  Shuffle,
  UserRound,
  X,
} from "lucide-react"
import { useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { chunkyButton, chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const PEOPLE = [0, 1, 2, 3]
const LOCKED = 3
const START_PAGES = 3
const RACE_MS = 1400
// How far the losers get before the winner solves it
const LOSER_PROGRESS = [55, 72, 86]

type Mode = "work" | "stake"

type Event =
  | { kind: "start" }
  | { kind: "racing" }
  | { kind: "solved"; who: number }
  | { kind: "picked"; who: number }
  | { kind: "cheated"; who: number }

/** Each racer's progress in a round; the winner rotates so nobody always wins */
const raceProgress = (round: number) => {
  const winner = round % PEOPLE.length
  let loser = 0
  return PEOPLE.map((i) =>
    i === winner ? 100 : LOSER_PROGRESS[(loser++ + round) % 3]
  )
}

/**
 * Two ways a blockchain picks who writes the next page: a puzzle race
 * (proof of work) or a pick among people who locked up ETH (proof of
 * stake), where a fake page is turned down and costs the cheater. No
 * numbers, thirds or timings: those belong to the proof-of-stake course.
 */
const NextPageWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const reduceMotion = useReducedMotion()

  const [mode, setMode] = useState<Mode>("work")
  const [event, setEvent] = useState<Event>({ kind: "start" })
  const [pages, setPages] = useState(START_PAGES)
  const [round, setRound] = useState(-1)
  const [go, setGo] = useState(false)
  const [turn, setTurn] = useState(0)
  const [locked, setLocked] = useState(() => PEOPLE.map(() => LOCKED))
  const [seen, setSeen] = useState({ race: false, cheat: false })
  const done = useRef(false)

  const name = (i: number) => t(`page-courses-widget-next-page-name-${i + 1}`)
  const racing = event.kind === "racing"

  useEffect(() => {
    if (!done.current && seen.race && seen.cheat) {
      done.current = true
      onComplete()
    }
  }, [seen, onComplete])

  // Bars mount empty, then fill on the next frame so the width transitions
  useEffect(() => {
    if (round < 0 || !racing) return
    const winner = round % PEOPLE.length
    const finish = () => {
      setEvent({ kind: "solved", who: winner })
      setPages((n) => n + 1)
      setSeen((s) => ({ ...s, race: true }))
    }
    if (reduceMotion) {
      setGo(true)
      finish()
      return
    }
    const frame = requestAnimationFrame(() => setGo(true))
    const timer = setTimeout(finish, RACE_MS)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [round, racing, reduceMotion])

  const switchMode = (next: Mode) => {
    if (next === mode || racing) return
    setMode(next)
    setEvent({ kind: "start" })
  }

  const race = () => {
    setGo(false)
    setRound((r) => r + 1)
    setEvent({ kind: "racing" })
  }

  const pick = () => {
    const who = turn % PEOPLE.length
    setTurn(turn + 1)
    setPages(pages + 1)
    setEvent({ kind: "picked", who })
  }

  const cheat = () => {
    const who = turn % PEOPLE.length
    setTurn(turn + 1)
    setLocked(locked.map((n, i) => (i === who ? Math.max(0, n - 1) : n)))
    setEvent({ kind: "cheated", who })
    setSeen((s) => ({ ...s, cheat: true }))
  }

  const status = (() => {
    switch (event.kind) {
      case "start":
        return t(`page-courses-widget-next-page-start-${mode}`)
      case "racing":
        return t("page-courses-widget-next-page-racing")
      default:
        return t(`page-courses-widget-next-page-${event.kind}`, {
          name: name(event.who),
        })
    }
  })()

  const progress = round >= 0 ? raceProgress(round) : PEOPLE.map(() => 0)
  const highlighted =
    event.kind === "solved" ||
    event.kind === "picked" ||
    event.kind === "cheated"
      ? event.who
      : null

  return (
    <WidgetShell>
      <div
        role="group"
        aria-label={t("page-courses-widget-next-page-modes")}
        className="flex flex-wrap justify-center gap-2"
      >
        {(["work", "stake"] as const).map((m) => (
          <Button
            key={m}
            variant="ghost"
            aria-pressed={mode === m}
            disabled={racing && mode !== m}
            onClick={() => switchMode(m)}
            className={cn(
              mode === m ? chunkyButton : chunkyButtonSecondary,
              "min-h-10 px-4 text-sm"
            )}
          >
            {m === "work" ? <Puzzle aria-hidden /> : <Coins aria-hidden />}
            {t(`page-courses-widget-next-page-mode-${m}`)}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="m-0 text-sm font-bold text-body-medium">
          {t("page-courses-widget-next-page-chain")}
        </p>
        <div aria-hidden className="flex flex-wrap gap-1.5">
          {Array.from({ length: Math.min(pages, 12) }, (_, i) => (
            <span
              key={i}
              className="grid size-8 place-items-center rounded-md bg-(--course) text-white"
            >
              <FileText className="size-4" />
            </span>
          ))}
        </div>
      </div>

      <ul className="m-0 flex list-none flex-col gap-2">
        {PEOPLE.map((i) => {
          const active = highlighted === i
          const cheater = active && event.kind === "cheated"
          return (
            <li
              key={i}
              className={cn(
                "m-0 flex flex-col gap-2 rounded-2xl border-2 bg-background p-3 transition-colors",
                active
                  ? cheater
                    ? "border-error"
                    : "border-(--course)"
                  : "border-(--course-soft)"
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-2 font-bold">
                  {mode === "work" ? (
                    <Cpu
                      aria-hidden
                      className={cn("size-5 shrink-0", courseText)}
                    />
                  ) : (
                    <UserRound
                      aria-hidden
                      className={cn("size-5 shrink-0", courseText)}
                    />
                  )}
                  {mode === "work"
                    ? t("page-courses-widget-next-page-computer", {
                        name: name(i),
                      })
                    : name(i)}
                </span>
                {active && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-sm font-bold",
                      cheater
                        ? "bg-error-light text-error dark:bg-error-dark dark:text-red-400"
                        : "bg-success-light text-green-700 dark:bg-success-dark dark:text-green-400"
                    )}
                  >
                    {t(
                      cheater
                        ? "page-courses-widget-next-page-badge-fake"
                        : "page-courses-widget-next-page-badge-writer"
                    )}
                  </span>
                )}
              </div>

              {mode === "work" ? (
                <div
                  aria-hidden
                  className="h-3 overflow-hidden rounded-full bg-background-highlight"
                >
                  <div
                    key={round}
                    className="h-full rounded-full bg-(--course) ease-out"
                    style={{
                      width: `${go ? progress[i] : 0}%`,
                      transitionProperty: "width",
                      transitionDuration: reduceMotion ? "0ms" : `${RACE_MS}ms`,
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-body-medium">
                    {t(
                      locked[i] < LOCKED
                        ? "page-courses-widget-next-page-locked-lost"
                        : "page-courses-widget-next-page-locked"
                    )}
                  </span>
                  <span aria-hidden className="flex gap-1">
                    {Array.from({ length: LOCKED }, (_, c) =>
                      c < locked[i] ? (
                        <Coins key={c} className={cn("size-5", courseText)} />
                      ) : (
                        <X
                          key={c}
                          className="size-5 text-error dark:text-red-400"
                        />
                      )
                    )}
                  </span>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      <p role="status" className="m-0 min-h-12 rounded-2xl bg-background p-3">
        {status}
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {mode === "work" ? (
          <Button
            variant="ghost"
            onClick={race}
            disabled={racing}
            className={chunkyButton}
          >
            <Puzzle aria-hidden />
            {t("page-courses-widget-next-page-race")}
          </Button>
        ) : (
          <>
            <Button variant="ghost" onClick={pick} className={chunkyButton}>
              <Shuffle aria-hidden />
              {t("page-courses-widget-next-page-pick")}
            </Button>
            <Button
              variant="ghost"
              onClick={cheat}
              className={chunkyButtonSecondary}
            >
              <X aria-hidden />
              {t("page-courses-widget-next-page-cheat")}
            </Button>
          </>
        )}
      </div>
    </WidgetShell>
  )
}

export default NextPageWidget
