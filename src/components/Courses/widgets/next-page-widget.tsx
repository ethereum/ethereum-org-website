"use client"

import { useEffect, useRef, useState } from "react"
import {
  Coins,
  Cpu,
  FileText,
  FileX2,
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
const PICK_MS = 900
const FLICKER_MS = 110

type Mode = "work" | "stake"

type Event =
  | { kind: "start" }
  | { kind: "racing" }
  | { kind: "picking"; who: number }
  | { kind: "solved"; who: number }
  | { kind: "picked"; who: number }
  | { kind: "cheated"; who: number }
  | { kind: "rejected"; who: number }

/** What the picked writer does with their turn */
type Turn = "honest" | "bad" | "cheat"

/** Each racer's progress in a round; the winner is whoever solves it first */
const raceProgress = (round: number, winner: number) => {
  let loser = 0
  return PEOPLE.map((i) =>
    i === winner ? 100 : LOSER_PROGRESS[(loser++ + round) % 3]
  )
}

/**
 * Two ways a blockchain picks who writes the next page: a puzzle race
 * (proof of work) or a random pick among people who locked up ETH (proof
 * of stake). There, a page that breaks the rules is just turned down, at no
 * cost; cheating means writing two pages for one turn: the copies keep one,
 * and the cheater loses ETH and is removed. No numbers, thirds or timings:
 * those belong to the proof-of-stake course.
 */
const NextPageWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const reduceMotion = useReducedMotion()

  const [mode, setMode] = useState<Mode>("work")
  const [event, setEvent] = useState<Event>({ kind: "start" })
  const [pages, setPages] = useState(START_PAGES)
  const [round, setRound] = useState(-1)
  const [winner, setWinner] = useState(0)
  const [go, setGo] = useState(false)
  const [lastPick, setLastPick] = useState<number | null>(null)
  const [locked, setLocked] = useState(() => PEOPLE.map(() => LOCKED))
  const [removed, setRemoved] = useState(() => PEOPLE.map(() => false))
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const [seen, setSeen] = useState({ race: false, bad: false, cheat: false })
  const done = useRef(false)

  const name = (i: number) => t(`page-courses-widget-next-page-name-${i + 1}`)
  const racing = event.kind === "racing"
  const picking = event.kind === "picking"
  const busy = racing || picking
  const eligible = PEOPLE.filter((i) => !removed[i])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const randomOf = (pool: number[]) =>
    pool[Math.floor(Math.random() * pool.length)]

  useEffect(() => {
    if (!done.current && seen.race && seen.bad && seen.cheat) {
      done.current = true
      onComplete()
    }
  }, [seen, onComplete])

  // Bars mount empty, then fill on the next frame so the width transitions
  useEffect(() => {
    if (round < 0 || !racing) return
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
  }, [round, racing, reduceMotion, winner])

  const switchMode = (next: Mode) => {
    if (next === mode || busy) return
    setMode(next)
    setEvent({ kind: "start" })
  }

  const race = () => {
    const others = PEOPLE.filter((i) => i !== winner)
    setWinner(round < 0 ? randomOf(PEOPLE) : randomOf(others))
    setGo(false)
    setRound((r) => r + 1)
    setEvent({ kind: "racing" })
  }

  // A random pick, never the same person twice in a row, with a brief
  // shuffle so it reads as a draw rather than taking turns
  const pick = (turn: Turn) => {
    const pool = eligible.filter((i) => i !== lastPick)
    const who = randomOf(pool.length ? pool : eligible)
    const resolve = () => {
      setLastPick(who)
      if (turn === "bad") {
        // Everyone checks it and turns it down: no page, and nothing lost
        setEvent({ kind: "rejected", who })
        setSeen((s) => ({ ...s, bad: true }))
      } else if (turn === "cheat") {
        setPages((n) => n + 1)
        setLocked((l) => l.map((n, i) => (i === who ? Math.max(0, n - 1) : n)))
        setRemoved((r) => r.map((out, i) => out || i === who))
        setEvent({ kind: "cheated", who })
        setSeen((s) => ({ ...s, cheat: true }))
      } else {
        setPages((n) => n + 1)
        setEvent({ kind: "picked", who })
      }
    }
    if (reduceMotion) return resolve()
    timers.current.forEach(clearTimeout)
    timers.current = Array.from(
      { length: Math.floor(PICK_MS / FLICKER_MS) },
      (_, n) =>
        setTimeout(
          () => setEvent({ kind: "picking", who: randomOf(eligible) }),
          n * FLICKER_MS
        )
    )
    timers.current.push(setTimeout(resolve, PICK_MS))
  }

  const status = (() => {
    switch (event.kind) {
      case "start":
        return t(`page-courses-widget-next-page-start-${mode}`)
      case "racing":
        return t("page-courses-widget-next-page-racing")
      case "picking":
        return t("page-courses-widget-next-page-picking")
      default:
        return t(`page-courses-widget-next-page-${event.kind}`, {
          name: name(event.who),
        })
    }
  })()

  const progress =
    round >= 0 ? raceProgress(round, winner) : PEOPLE.map(() => 0)
  const highlighted =
    event.kind === "solved" ||
    event.kind === "picked" ||
    event.kind === "picking" ||
    event.kind === "cheated" ||
    event.kind === "rejected"
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
            disabled={busy && mode !== m}
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
          const turnedDown = active && event.kind === "rejected"
          const out = mode === "stake" && removed[i]
          const badge = cheater
            ? "badge-cheat"
            : turnedDown
              ? "badge-rejected"
              : out
                ? "badge-removed"
                : active && !picking
                  ? "badge-writer"
                  : null
          return (
            <li
              key={i}
              className={cn(
                "m-0 flex flex-col gap-2 rounded-2xl border-2 bg-background p-3 transition-colors",
                active
                  ? cheater
                    ? "border-error"
                    : turnedDown
                      ? "border-warning"
                      : "border-(--course)"
                  : "border-(--course-soft)",
                out && !cheater && "border-dashed opacity-60"
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
                {badge && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-sm font-bold",
                      badge === "badge-writer"
                        ? "bg-success-light text-green-700 dark:bg-success-dark dark:text-green-400"
                        : badge === "badge-rejected"
                          ? "bg-warning/25 text-warning-dark dark:bg-warning-light/20 dark:text-yellow-500"
                          : "bg-error-light text-error dark:bg-error-dark dark:text-red-400"
                    )}
                  >
                    {t(`page-courses-widget-next-page-${badge}`)}
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

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
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
            <Button
              variant="ghost"
              onClick={() => pick("honest")}
              disabled={picking}
              className={chunkyButton}
            >
              <Shuffle aria-hidden />
              {t("page-courses-widget-next-page-pick")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => pick("bad")}
              disabled={picking}
              className={chunkyButtonSecondary}
            >
              <FileX2 aria-hidden />
              {t("page-courses-widget-next-page-bad")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => pick("cheat")}
              disabled={picking || eligible.length < 2}
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
