"use client"

import {
  Blocks,
  Globe,
  type LucideIcon,
  Network,
  ScanSearch,
  Server,
  Smartphone,
  User,
} from "lucide-react"

import type { PrivacyLessonWitness } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { witnesses } from "@/data/privacy-lesson/catalogue"

import { useLessonTranslations } from "./use-lesson-translations"

/** Per-stop status in "protect" mode (Part II): what the fixes leave visible */
export type RouteProtectStatus = "seen" | "partial" | "hidden"

type StopState = "past" | "current" | "upcoming" | RouteProtectStatus

const icons: Record<PrivacyLessonWitness, LucideIcon> = {
  you: User,
  wallet: Smartphone,
  rpc: Server,
  network: Network,
  chain: Blocks,
  analysts: ScanSearch,
  world: Globe,
}

const stateKey: Record<StopState, string> = {
  past: "nav-route-state-past",
  current: "nav-route-state-current",
  upcoming: "nav-route-state-upcoming",
  seen: "nav-route-state-seen",
  partial: "nav-route-state-partial",
  hidden: "nav-route-state-hidden",
}

const dotClass: Record<StopState, string> = {
  past: "border-leak bg-leak text-body-inverse",
  current:
    "border-leak bg-leak-low-contrast text-leak-high-contrast ring-4 ring-leak/25 motion-safe:animate-pulse-light",
  upcoming: "border-body-light bg-background text-body-medium",
  seen: "border-leak bg-leak text-body-inverse",
  partial: "border-leak bg-primary-low-contrast text-primary-high-contrast",
  hidden: "border-primary bg-primary text-body-inverse",
}

// The segment leading out of a stop: coloured once the payment has moved on
const connectorClass: Record<StopState, string> = {
  past: "after:bg-leak",
  current: "after:bg-body-light",
  upcoming: "after:bg-body-light",
  seen: "after:bg-leak",
  partial: "after:bg-leak/50",
  hidden: "after:bg-primary",
}

export interface RouteMapProps {
  /** Trace mode: the stop the payment is at now */
  current?: PrivacyLessonWitness
  /**
   * Trace mode: how many stops the payment has fully passed (0-7). Defaults to
   * the index of `current`; 7 means the journey is complete.
   */
  reached?: number
  /** "trace" follows the payment (Part I); "protect" shows what fixes hide (Part II) */
  mode?: "trace" | "protect"
  /** Protect mode: status per stop; stops left out read as "seen" */
  statuses?: Partial<Record<PrivacyLessonWitness, RouteProtectStatus>>
  className?: string
}

/**
 * The payment's route through the seven witnesses. Horizontal from md up,
 * vertical below; the flex direction follows the document, so it mirrors in RTL.
 */
const RouteMap = ({
  current,
  reached,
  mode = "trace",
  statuses = {},
  className,
}: RouteMapProps) => {
  const t = useLessonTranslations()
  const currentIndex = current ? witnesses.indexOf(current) : -1
  const passed = reached ?? Math.max(currentIndex, 0)

  const stateOf = (index: number): StopState => {
    if (mode === "protect") return statuses[witnesses[index]] ?? "seen"
    if (index === currentIndex) return "current"
    return index < passed ? "past" : "upcoming"
  }

  return (
    <ol
      aria-label={t("nav-route-aria")}
      className={cn(
        "m-0 flex list-none flex-col gap-y-3 md:flex-row md:gap-y-0",
        className
      )}
    >
      {witnesses.map((stop, index) => {
        const state = stateOf(index)
        const Icon = icons[stop]
        const isLast = index === witnesses.length - 1
        return (
          <li
            key={stop}
            aria-current={state === "current" ? "step" : undefined}
            className={cn(
              "relative flex min-w-0 items-center gap-x-3 md:flex-1 md:flex-col md:gap-y-2 md:text-center",
              // Connector to the next stop: down on mobile, along the inline
              // axis from md (logical `start`, so it flips in RTL)
              !isLast &&
                "after:absolute after:start-4 after:top-9 after:h-[calc(100%-1.5rem)] after:w-0.5 md:after:start-[calc(50%+1.25rem)] md:after:top-4 md:after:h-0.5 md:after:w-[calc(100%-2.5rem)]",
              !isLast && connectorClass[state]
            )}
          >
            <span
              aria-hidden
              className={cn(
                "relative z-base grid size-8 shrink-0 place-items-center rounded-full border-2 motion-safe:transition-colors motion-safe:duration-300",
                dotClass[state]
              )}
            >
              <Icon className="size-4" />
            </span>
            <span className="min-w-0 text-sm">
              <span
                className={cn(
                  "block font-semibold",
                  state === "upcoming" && "font-normal text-body-medium"
                )}
              >
                {t(`nav-route-stop-${stop}`)}
              </span>
              <span className="sr-only">{t(stateKey[state])}</span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export default RouteMap
