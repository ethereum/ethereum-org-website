"use client"

import { useRef, useState } from "react"
import { Bug, ShieldAlert, ShieldCheck, Skull } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyButtonSecondary, chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * Made-up networks, one per outcome when its biggest client breaks: under a
 * third (the rest finalize), a third to two-thirds (finality stalls), two-
 * thirds or more (the bug can finalize). Shares stay clear of the edges.
 */
const NETWORKS = [
  { id: "even", shares: [30, 25, 25, 20] },
  { id: "leader", shares: [45, 25, 20, 10] },
  { id: "dominant", shares: [70, 15, 10, 5] },
] as const

type NetworkId = (typeof NETWORKS)[number]["id"]

const NAMES = ["A", "B", "C", "D"] as const

const MARKS = [
  { id: "third", label: "⅓", start: "start-1/3" },
  { id: "two-thirds", label: "⅔", start: "start-2/3" },
] as const

const outcomeFor = (share: number) =>
  share * 3 < 100 ? "fine" : share * 3 < 200 ? "stall" : "wrong"

/** Sandbox: give one client a bug and see what the rest of the network does */
const ClientBugWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const pct = numberFormat(useLocale(), { style: "percent" })
  const [networkIdx, setNetworkIdx] = useState(0)
  const [bug, setBug] = useState<number | null>(null)
  const tried = useRef(new Set<NetworkId>())
  const done = useRef(false)

  const network = NETWORKS[networkIdx]
  const share = (idx: number) => pct.format(network.shares[idx] / 100)
  const outcome = bug === null ? null : outcomeFor(network.shares[bug])

  const pickNetwork = (idx: number) => {
    setNetworkIdx(idx)
    setBug(null)
  }

  const toggleBug = (idx: number) => {
    const next = bug === idx ? null : idx
    setBug(next)
    if (next === null) return
    tried.current.add(network.id)
    // Comparing two networks shows that the share, not the bug, decides
    if (tried.current.size >= 2 && !done.current) {
      done.current = true
      onComplete()
    }
  }

  return (
    <WidgetShell>
      <div
        role="group"
        aria-label={t("page-courses-widget-client-bug-network")}
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
      >
        {NETWORKS.map(({ id }, idx) => {
          const active = idx === networkIdx
          return (
            <Button
              key={id}
              variant="ghost"
              aria-pressed={active}
              onClick={() => pickNetwork(idx)}
              className={cn(
                chunkyTile,
                "min-h-11 px-3 text-sm font-bold text-body hover-link:!text-body",
                active &&
                  "border-(--course) bg-(--course) text-white hover:bg-(--course) hover-link:!text-white"
              )}
            >
              {t(`page-courses-widget-client-bug-network-${id}`)}
            </Button>
          )
        })}
      </div>

      <div className="flex flex-col gap-1">
        <p className="m-0 text-sm font-bold text-body-medium">
          {t("page-courses-widget-client-bug-bars")}
        </p>
        <div className="flex flex-col gap-3 rounded-2xl bg-background p-3">
          {/* Finality needs two-thirds of validators; marks on every bar */}
          <div
            aria-hidden
            className="relative h-5 text-sm font-bold text-body-medium"
          >
            {MARKS.map(({ id, label, start }) => (
              <span
                key={id}
                className={cn(
                  "absolute -translate-x-1/2 rtl:translate-x-1/2",
                  start
                )}
              >
                {label}
              </span>
            ))}
          </div>
          {NAMES.map((name, idx) => {
            const broken = bug === idx
            const label = t("page-courses-widget-client-bug-client", { name })
            return (
              <div key={name} className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold">
                    {label}{" "}
                    <span className="font-semibold text-body-medium tabular-nums">
                      {share(idx)}
                    </span>
                  </span>
                  <Button
                    variant="ghost"
                    aria-pressed={broken}
                    aria-label={t(
                      broken
                        ? "page-courses-widget-client-bug-remove-label"
                        : "page-courses-widget-client-bug-add-label",
                      { name }
                    )}
                    onClick={() => toggleBug(idx)}
                    className={cn(
                      chunkyButtonSecondary,
                      "min-h-10 px-3 text-sm",
                      broken &&
                        "border-error text-error dark:border-red-400 dark:text-red-400 hover-link:!text-error"
                    )}
                  >
                    <Bug aria-hidden />
                    {t(
                      broken
                        ? "page-courses-widget-client-bug-remove"
                        : "page-courses-widget-client-bug-add"
                    )}
                  </Button>
                </div>
                <div
                  aria-hidden
                  className="relative h-4 w-full rounded-full bg-(--course-soft)"
                >
                  <div
                    className={cn(
                      "h-full rounded-full transition-[width,background-color] duration-300",
                      broken ? "bg-red-600" : "bg-(--course)"
                    )}
                    style={{ width: `${network.shares[idx]}%` }}
                  />
                  {MARKS.map(({ id, start }) => (
                    <span
                      key={id}
                      className={cn(
                        "absolute -inset-y-1 border-s-2 border-dashed border-body-medium",
                        start
                      )}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p
        role="status"
        className={cn(
          "m-0 flex items-start gap-2 rounded-2xl p-3",
          outcome === null && "bg-background text-body",
          outcome === "fine" &&
            "bg-success-light text-green-700 dark:bg-success-dark dark:text-green-400",
          outcome === "stall" &&
            "bg-warning-light text-body dark:bg-warning-dark",
          outcome === "wrong" &&
            "bg-error-light text-error dark:bg-error-dark dark:text-red-400"
        )}
      >
        {outcome === null ? (
          <Bug className={cn("size-5 shrink-0", courseText)} aria-hidden />
        ) : outcome === "fine" ? (
          <ShieldCheck className="size-5 shrink-0" aria-hidden />
        ) : outcome === "stall" ? (
          <ShieldAlert className="size-5 shrink-0" aria-hidden />
        ) : (
          <Skull className="size-5 shrink-0" aria-hidden />
        )}
        <span>
          {bug === null
            ? t("page-courses-widget-client-bug-idle")
            : t(`page-courses-widget-client-bug-${outcome}`, {
                name: NAMES[bug],
                share: share(bug),
              })}
        </span>
      </p>
    </WidgetShell>
  )
}

export default ClientBugWidget
