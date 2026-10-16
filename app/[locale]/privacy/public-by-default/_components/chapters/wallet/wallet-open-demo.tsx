"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useLocale } from "next-intl"

import type { PrivacyLessonDossierId } from "@/lib/types"

import LogLines, {
  type LogLine,
  type LogTone,
} from "@/components/PrivacyWidgets/shared/log-lines"
import { Ltr } from "@/components/PrivacyWidgets/shared/rich-tags"
import { trackPrivacyLessonEvent } from "@/components/PrivacyWidgets/shared/track"
import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { persona } from "@/data/privacy-lesson/persona"

import { useLesson, useLessonStorage } from "../../lesson-provider"
import { useLessonTranslations } from "../../use-lesson-translations"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

type Service = "wallet" | "rpc" | "prices" | "indexer" | "sender"

interface BootRequest {
  id: string
  /** Machine part: method or path, shown as-is */
  request: string
  /** Fake host, always under .example */
  host: string
  service: Service
  /** How many requests this line stands for */
  requests: number
  /** Dossier entries learned once this line has been sent */
  collects?: PrivacyLessonDossierId[]
  note?: { key: string; tone: LogTone; values?: Record<string, number> }
}

const short = persona.main

// Typical traffic of a wallet opening, in order. Hosts are illustrative.
const BOOT: BootRequest[] = [
  {
    id: "flags",
    request: "GET /v2/flags",
    host: "config.wallet.example",
    service: "wallet",
    requests: 1,
  },
  {
    id: "events",
    request: "POST /v1/events {app_open}",
    host: "telemetry.wallet.example",
    service: "wallet",
    requests: 1,
  },
  ...persona.addresses.map((address, i) => ({
    id: `balance-${i}`,
    request: `eth_getBalance("${address}")`,
    host: "rpc.example",
    service: "rpc" as const,
    requests: 1,
  })),
  {
    id: "linked",
    request: "",
    host: "",
    service: "rpc",
    requests: 0,
    collects: ["ip", "linked"],
    note: {
      key: "wallet-open-note-linked",
      tone: "leak",
      values: { count: persona.addresses.length },
    },
  },
  {
    id: "tokens",
    request: `eth_call balanceOf ×12 ("${short}")`,
    host: "rpc.example",
    service: "rpc",
    requests: 1,
  },
  {
    id: "prices",
    request: "GET /price?ids=eth,usdc,steth,token",
    host: "prices.example",
    service: "prices",
    requests: 1,
    collects: ["holdings"],
    note: { key: "wallet-open-note-prices", tone: "leak" },
  },
  {
    id: "nfts",
    request: `GET /v1/nfts?owner=${short}`,
    host: "nft-indexer.example",
    service: "indexer",
    requests: 1,
  },
  {
    id: "pixel",
    request: "GET /t/88213.png",
    host: "free-claim.example",
    service: "sender",
    requests: 1,
    note: { key: "wallet-open-note-sender", tone: "alert" },
  },
  {
    id: "poll",
    request: "eth_blockNumber",
    host: "rpc.example",
    service: "rpc",
    requests: 1,
    note: { key: "wallet-open-note-polling", tone: "dim" },
  },
]

// Example balances for the four accounts, formatted at render
const BALANCES = [
  { amount: 2.184, unit: "ETH" },
  { amount: 6020, unit: "USDC" },
  { amount: 4.9, unit: "stETH" },
  { amount: 0.31, unit: "ETH" },
]

const STEP_MS = 420
const OPENED_INITIAL = false

const WalletOpenDemo = () => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const { collect } = useLesson()
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const [opened, setOpened] = useLessonStorage("wallet-opened", OPENED_INITIAL)
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)
  const restored = useRef(false)

  // A reader who opened the wallet on an earlier visit sees the finished log
  useEffect(() => {
    if (opened === true && !running && !restored.current) {
      restored.current = true
      setStep(BOOT.length)
    }
    if (opened !== true) {
      restored.current = false
      if (!running) setStep(0)
    }
  }, [opened, running])

  useEffect(() => {
    if (!running) return
    if (step >= BOOT.length) {
      setRunning(false)
      return
    }
    const line = BOOT[step]
    if (line.collects) collect(...line.collects)
    const timer = setTimeout(
      () => setStep((s) => s + 1),
      prefersReducedMotion ? 0 : STEP_MS
    )
    return () => clearTimeout(timer)
  }, [running, step, collect, prefersReducedMotion])

  const open = () => {
    trackPrivacyLessonEvent("widget-used", "wallet-open")
    setStep(0)
    setRunning(true)
    setOpened(true)
  }

  const shown = useMemo(() => BOOT.slice(0, step), [step])
  const requests = shown.reduce((sum, line) => sum + line.requests, 0)
  const services = new Set(
    shown.filter((line) => line.requests).map((line) => line.service)
  ).size
  const done = step >= BOOT.length && !running

  const formatSeconds = useMemo(
    () =>
      numberFormat(locale, {
        style: "unit",
        unit: "second",
        unitDisplay: "narrow",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale]
  )

  const lines: LogLine[] = useMemo(() => {
    let elapsed = 0
    return shown.map((line, i) => {
      elapsed += i === 0 ? 0.08 : line.requests ? 0.04 + (i % 3) * 0.03 : 0
      if (line.note && !line.request)
        return {
          id: line.id,
          tone: line.note.tone,
          content: t(line.note.key, line.note.values),
        }
      return {
        id: line.id,
        prefix: formatSeconds.format(elapsed),
        tone: "default" as const,
        content: (
          <span className="flex flex-col">
            <span dir="ltr" className="flex flex-wrap gap-x-2">
              <Ltr>{line.request}</Ltr>
              <span className="text-body-medium">
                <Ltr>{line.host}</Ltr>
              </span>
            </span>
            {line.note && (
              <span
                className={cn(
                  "font-sans",
                  line.note.tone === "alert" && "text-error",
                  line.note.tone === "dim" && "text-body-medium"
                )}
              >
                {t(line.note.key, line.note.values)}
              </span>
            )}
          </span>
        ),
      }
    })
  }, [shown, t, formatSeconds])

  const formatAmount = (amount: number) =>
    numberFormat(locale, { maximumFractionDigits: 3 }).format(amount)

  return (
    <div className="space-y-4 rounded-base border bg-background p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="m-0 text-h5">{t("wallet-open-demo-title")}</h3>
        <Button onClick={open} disabled={running} size="sm">
          {t(
            opened === true ? "wallet-open-button-again" : "wallet-open-button"
          )}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
        {/* Phone mock */}
        <section
          aria-label={t("wallet-open-phone-label")}
          className="rounded-3xl border-4 border-body-light bg-background-highlight p-4"
        >
          <p className="mb-3 text-xs text-body-medium" aria-live="polite">
            {t(
              opened === true || running
                ? "wallet-open-state-opened"
                : "wallet-open-state-idle"
            )}
          </p>
          <p className="mb-2 font-bold">{t("wallet-open-phone-heading")}</p>
          <ul className="m-0 list-none space-y-2">
            {persona.addresses.map((address, i) => (
              <li
                key={address}
                className="rounded-lg bg-background p-2 text-sm"
              >
                <span className="block font-semibold">
                  {t("wallet-open-account-name", {
                    number: numberFormat(locale).format(i + 1),
                  })}
                </span>
                <span className="flex flex-wrap justify-between gap-x-2 text-body-medium">
                  <Ltr>{address}</Ltr>
                  <span dir="ltr">
                    {formatAmount(BALANCES[i].amount)} {BALANCES[i].unit}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 mb-0 text-xs text-body-medium">
            {t("wallet-open-phone-footer", {
              count: persona.addresses.length,
            })}
          </p>
        </section>

        {/* Network log */}
        <div className="min-w-0 space-y-3">
          <dl className="m-0 grid grid-cols-3 gap-2 text-center">
            {(
              [
                ["requests", requests],
                ["services", services],
                ["taps", 0],
              ] as const
            ).map(([key, count]) => (
              <div
                key={key}
                className={cn(
                  "rounded-lg border p-2",
                  key !== "taps" && count > 0 && "border-leak"
                )}
              >
                <dt className="sr-only">{key}</dt>
                <dd
                  className={cn(
                    "m-0 text-sm font-semibold",
                    key !== "taps" && count > 0 && "text-leak-high-contrast"
                  )}
                >
                  {t(`wallet-open-counter-${key}`, { count })}
                </dd>
              </div>
            ))}
          </dl>

          <div className="hidden grid-cols-[4rem_minmax(0,1fr)] gap-x-3 px-4 text-xs font-bold text-body-medium sm:grid">
            <span>{t("wallet-open-log-column-time")}</span>
            <span>
              {t("wallet-open-log-column-what")} ·{" "}
              {t("wallet-open-log-column-to")}
            </span>
          </div>
          {lines.length ? (
            <LogLines
              lines={lines}
              label={t("wallet-open-demo-title")}
              delay={0}
            />
          ) : (
            <p className="rounded-base border border-dashed p-4 text-sm text-body-medium">
              {t("wallet-open-log-hint")}
            </p>
          )}
          <p
            aria-live="polite"
            className={cn(
              "m-0 font-semibold text-leak-high-contrast",
              !done && "sr-only"
            )}
          >
            {done ? t("wallet-open-summary", { requests, services }) : ""}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WalletOpenDemo
