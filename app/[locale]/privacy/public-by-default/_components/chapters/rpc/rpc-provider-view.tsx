"use client"

import { type ReactNode, useEffect, useMemo, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useIntersectionObserver } from "usehooks-ts"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { useBrowserInfo } from "@/components/PrivacyWidgets/shared/browser-info"
import LogLines, {
  type LogLine,
} from "@/components/PrivacyWidgets/shared/log-lines"
import { Ltr } from "@/components/PrivacyWidgets/shared/rich-tags"
import { trackPrivacyLessonEvent } from "@/components/PrivacyWidgets/shared/track"

import { cn } from "@/lib/utils/cn"
import { dateTimeFormat } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import { persona } from "@/data/privacy-lesson/persona"

import { useLesson } from "../../lesson-provider"
import { useLessonTranslations } from "../../use-lesson-translations"
import { relativeTime, timeOfDay } from "../wallet/format"

import AddressGraph from "./address-graph"
import RequestHeatmap from "./request-heatmap"

export type RpcMode = "default" | "tor-one" | "tor-each" | "node"
const MODES: RpcMode[] = ["default", "tor-one", "tor-each", "node"]

type Chip = "sees" | "hidden" | "partly" | "peers"
const KNOWS = ["ip", "addresses", "awake", "payee", "transactions"] as const

const KNOWLEDGE: Record<RpcMode, Record<(typeof KNOWS)[number], Chip>> = {
  default: {
    ip: "sees",
    addresses: "sees",
    awake: "sees",
    payee: "sees",
    transactions: "sees",
  },
  "tor-one": {
    ip: "hidden",
    addresses: "sees",
    awake: "sees",
    payee: "sees",
    transactions: "sees",
  },
  "tor-each": {
    ip: "hidden",
    addresses: "partly",
    awake: "sees",
    payee: "sees",
    transactions: "sees",
  },
  node: {
    ip: "hidden",
    addresses: "hidden",
    awake: "hidden",
    payee: "hidden",
    transactions: "peers",
  },
}

const chipClass: Record<Chip, string> = {
  sees: "bg-leak-low-contrast text-leak-high-contrast",
  hidden: "bg-primary-low-contrast text-primary-high-contrast",
  partly: "border border-dashed border-leak text-leak-high-contrast",
  peers: "border border-body-medium text-body-medium",
}

const chipKey: Record<Chip, string> = {
  sees: "rpc-view-chip-sees",
  hidden: "rpc-view-chip-hidden",
  partly: "rpc-view-chip-partly",
  peers: "rpc-view-chip-peers",
}

// Example week (code values, formatted at render)
const WEEK_REQUESTS = 3418
const PER_ACCOUNT = 850
const PAYMENTS = 9
const WAKE = { hours: 7, minutes: 40 }
const FIRST_SEEN_DAYS = 212
const TOR_EXITS = [
  "198.51.100.23",
  "192.0.2.201",
  "198.51.100.88",
  "192.0.2.14",
]

const RpcProviderView = () => {
  const t = useLessonTranslations()
  const tDevice = useTranslations("component-privacy-fingerprint")
  const locale = useLocale()
  const info = useBrowserInfo()
  const { collect } = useLesson()
  const [mode, setMode] = useState<RpcMode>("default")
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true,
  })

  // Seeing your own week in the provider's log is when the dossier learns it
  useEffect(() => {
    if (isIntersecting) collect("ip", "linked", "rpclog")
  }, [isIntersecting, collect])

  const n = useMemo(() => numberFormat(locale), [locale])
  const wake = timeOfDay(locale, WAKE.hours, WAKE.minutes)
  const timeZone = info?.timeZone ?? "UTC"
  const unknown = t("rpc-view-customer-unknown")

  const customer: Array<[string, ReactNode]> =
    mode === "default"
      ? [
          ["rpc-view-customer-ip", <Ltr key="ip">{persona.ip}</Ltr>],
          ["rpc-view-customer-near", info?.city ?? unknown],
          [
            "rpc-view-customer-device",
            info
              ? tDevice(`component-privacy-fingerprint-device-${info.device}`)
              : unknown,
          ],
          [
            "rpc-view-customer-first-seen",
            relativeTime(locale, -FIRST_SEEN_DAYS, "day"),
          ],
        ]
      : mode === "tor-one"
        ? [
            [
              "rpc-view-customer-ip",
              t("rpc-view-customer-tor-exit", { ip: TOR_EXITS[0] }),
            ],
            ["rpc-view-customer-near", unknown],
            ["rpc-view-customer-device", unknown],
            [
              "rpc-view-customer-session",
              t("rpc-view-customer-session-value", {
                count: persona.addresses.length,
              }),
            ],
          ]
        : mode === "tor-each"
          ? [
              [
                "rpc-view-customer-ip",
                t("rpc-view-customer-tor-exits", { count: TOR_EXITS.length }),
              ],
              ["rpc-view-customer-near", unknown],
              ["rpc-view-customer-device", unknown],
              [
                "rpc-view-customer-pattern",
                t("rpc-view-customer-pattern-value", { time: wake }),
              ],
            ]
          : []

  const stats: Array<{ value: string; label: string }> =
    mode === "node"
      ? [
          {
            value: n.format(0),
            label: t("rpc-view-stat-requests", { count: 0 }),
          },
          {
            value: n.format(0),
            label: t("rpc-view-stat-linked", { count: 0 }),
          },
          { value: n.format(0), label: t("rpc-view-stat-sends-node") },
        ]
      : [
          mode === "tor-each"
            ? {
                value: n.format(PER_ACCOUNT * persona.addresses.length),
                label: t("rpc-view-stat-requests-split", {
                  customers: persona.addresses.length,
                }),
              }
            : {
                value: n.format(WEEK_REQUESTS),
                label: t("rpc-view-stat-requests", { count: WEEK_REQUESTS }),
              },
          {
            value: n.format(persona.addresses.length),
            label:
              mode === "tor-each"
                ? t("rpc-view-stat-linked-timing")
                : t("rpc-view-stat-linked", {
                    count: persona.addresses.length,
                  }),
          },
          {
            value: n.format(PAYMENTS),
            label: t("rpc-view-stat-sends", { count: PAYMENTS }),
          },
        ]

  // A morning in the log: balances, a name lookup, then the payment
  const log: LogLine[] = useMemo(() => {
    if (mode === "node")
      return [{ id: "none", tone: "dim", content: t("rpc-view-log-none") }]
    const day = dateTimeFormat(locale, { weekday: "short" }).format(new Date())
    const at = (h: number, m: number) => `${day} ${timeOfDay(locale, h, m)}`
    const from = (i: number) =>
      mode === "default"
        ? persona.ip
        : mode === "tor-one"
          ? TOR_EXITS[0]
          : TOR_EXITS[i]
    return [
      ...persona.addresses.map((address, i) => ({
        id: `bal-${i}`,
        prefix: at(
          WAKE.hours,
          WAKE.minutes + (mode === "tor-each" ? i * 2 : 0)
        ),
        content: <Ltr>{`${from(i)}  eth_getBalance("${address}")`}</Ltr>,
      })),
      {
        id: "ens",
        prefix: at(20, 14),
        tone: "leak" as const,
        content: (
          <Ltr>{`${from(0)}  eth_call resolve("${persona.friend}")`}</Ltr>
        ),
      },
      {
        id: "send",
        prefix: at(20, 15),
        tone: "leak" as const,
        content: (
          <Ltr>{`${from(0)}  eth_sendRawTransaction(0.03 ETH → ${persona.friend})`}</Ltr>
        ),
      },
    ]
  }, [mode, locale, t])

  return (
    <div
      ref={ref}
      className="space-y-5 rounded-base border bg-background p-4 md:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="m-0 text-h5">{t("rpc-view-demo-title")}</h3>
        <span className="text-sm text-body-medium">
          {t("rpc-view-demo-period")}
        </span>
      </div>

      <div className="space-y-2">
        <p id="rpc-setup-label" className="m-0 text-sm font-bold">
          {t("rpc-view-setup-label")}
        </p>
        <RadioGroup.Root
          aria-labelledby="rpc-setup-label"
          value={mode}
          onValueChange={(value) => {
            setMode(value as RpcMode)
            trackPrivacyLessonEvent("widget-used", "rpc-view")
          }}
          className="grid grid-cols-1 gap-1 rounded-base border p-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {MODES.map((option) => (
            <RadioGroup.Item
              key={option}
              value={option}
              className={cn(
                "rounded-lg px-3 py-2 text-start text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                "hover:bg-background-highlight data-[state=checked]:bg-primary data-[state=checked]:text-body-inverse"
              )}
            >
              {t(`rpc-view-mode-${option}`)}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
        <p aria-live="polite" className="m-0 text-body-medium">
          {t(`rpc-view-explain-${mode}`)}
        </p>
      </div>

      {/* Customer strip */}
      {mode === "node" ? (
        <p className="m-0 rounded-base bg-primary-low-contrast p-4 text-primary-high-contrast">
          {t("rpc-view-customer-never")}
        </p>
      ) : (
        <dl className="m-0 grid grid-cols-1 gap-2 rounded-base bg-background-highlight p-4 sm:grid-cols-2 lg:grid-cols-4">
          {customer.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-xs text-body-medium">{t(label)}</dt>
              <dd className="m-0 font-semibold break-words">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <dl className="m-0 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map(({ value, label }, i) => (
          <div key={i} className="rounded-base border p-3">
            <dt className="sr-only">{label}</dt>
            <dd className="m-0">
              <span
                className={cn(
                  "block text-2xl font-bold",
                  mode === "node" ? "text-primary" : "text-leak-high-contrast"
                )}
              >
                {value}
              </span>
              <span className="block text-sm text-body-medium" aria-hidden>
                {label}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-5 md:grid-cols-2">
        <AddressGraph mode={mode} time={wake} />

        <div className="space-y-2">
          <p className="m-0 text-sm font-bold text-body-medium">
            {t("rpc-view-knows-label")}
          </p>
          <ul className="m-0 list-none space-y-2">
            {KNOWS.map((item) => {
              const chip = KNOWLEDGE[mode][item]
              return (
                <li
                  key={item}
                  className="flex items-start justify-between gap-3 text-sm"
                >
                  <span>{t(`rpc-view-knows-${item}`)}</span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold",
                      chipClass[chip]
                    )}
                  >
                    {t(chipKey[chip])}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <RequestHeatmap
        empty={mode === "node"}
        label={t(
          mode === "tor-each"
            ? "rpc-view-heatmap-label-tor-each"
            : "rpc-view-heatmap-label",
          { timeZone }
        )}
      />

      <div className="space-y-2">
        <p className="m-0 text-sm font-bold text-body-medium">
          {t("rpc-view-log-label")}
        </p>
        <LogLines
          key={mode}
          lines={log}
          label={t("rpc-view-log-label")}
          delay={120}
        />
      </div>
    </div>
  )
}

export default RpcProviderView
