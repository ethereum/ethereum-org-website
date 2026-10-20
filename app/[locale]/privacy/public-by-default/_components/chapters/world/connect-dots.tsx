"use client"

import { type ReactNode, useMemo, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import type { PrivacyLessonDossierId } from "@/lib/types"

import { useBrowserInfo } from "@/components/PrivacyWidgets/shared/browser-info"
import LogLines, {
  type LogLine,
} from "@/components/PrivacyWidgets/shared/log-lines"
import { trackPrivacyLessonEvent } from "@/components/PrivacyWidgets/shared/track"
import { Button } from "@/components/ui/buttons/Button"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { persona } from "@/data/privacy-lesson/persona"

import { useLesson, useLessonStorage } from "../../lesson-provider"
import { useLessonTranslations } from "../../use-lesson-translations"
import { isolate } from "../analysts/lesson-blocks"

type BridgeId = "exchange" | "ens" | "poap" | "cafe"

const BRIDGES: BridgeId[] = ["exchange", "ens", "poap", "cafe"]
const EMPTY_BRIDGES: BridgeId[] = []

/** Dossier entries each bridge reveals (the on-chain half comes with the first) */
const ON_CHAIN: PrivacyLessonDossierId[] = ["cluster", "networth", "salary"]
const REVEALS: Record<BridgeId, PrivacyLessonDossierId[]> = {
  exchange: ["kyc"],
  ens: ["ens", "label"],
  poap: ["poap"],
  cafe: ["home", "friend"],
}

/** Real-world fields on the identity card, and the bridge that fills each */
const FIELDS: Array<[string, BridgeId]> = [
  ["legal-name", "exchange"],
  ["photo-id", "exchange"],
  ["home-address", "exchange"],
  ["public-name", "ens"],
  ["face", "ens"],
  ["seen-at", "poap"],
  ["routine", "poap"],
  ["neighborhood", "cafe"],
]

// Sample on-chain values for the persona; formatted with the reader's locale
const CLUSTER_SIZE = 7
const NET_WORTH_USD = 48210
const MONTHLY_INCOME_USDC = 4200
const POAP_BADGES = 9
const CAFE_PAYMENTS = 14
const FRIEND_NAME = "Sam"

const isBridge = (value: unknown): value is BridgeId =>
  typeof value === "string" && (BRIDGES as string[]).includes(value)

/** "Connect the dots": four everyday bridges from a cluster to a person */
const ConnectDots = () => {
  const t = useLessonTranslations()
  const tRich = useTranslations("page-privacy-public-by-default")
  const strong = (chunks: ReactNode) => <strong>{chunks}</strong>
  const locale = useLocale()
  const { collect, visibleShare } = useLesson()
  const [stored, setStored] = useLessonStorage<unknown>(
    "world-bridges",
    EMPTY_BRIDGES
  )
  // Bridges linked during this visit, to tell them apart from restored ones
  const [session, setSession] = useState<BridgeId[]>([])
  const startedAt = useRef<number | null>(null)
  const [seconds, setSeconds] = useState<number | null>(null)

  const linked = useMemo(
    () =>
      Array.isArray(stored)
        ? stored.filter((id, i) => isBridge(id) && stored.indexOf(id) === i)
        : EMPTY_BRIDGES,
    [stored]
  ) as BridgeId[]
  const restored = linked.filter((id) => !session.includes(id))
  const info = useBrowserInfo(linked.includes("cafe"))

  const format = numberFormat(locale)
  const identified = linked.includes("exchange")
  const done = linked.length === BRIDGES.length

  const link = (bridge: BridgeId) => {
    if (linked.includes(bridge)) return
    trackPrivacyLessonEvent("widget-used", "connect-dots")
    if (startedAt.current === null) startedAt.current = Date.now()
    const next = [...linked, bridge]
    setStored(next)
    setSession((current) => [...current, bridge])
    collect(...ON_CHAIN, ...REVEALS[bridge])
    if (next.length === BRIDGES.length && restored.length === 0) {
      setSeconds(
        Math.max(1, Math.round((Date.now() - startedAt.current) / 1000))
      )
    }
  }

  const lines = useMemo<LogLine[]>(() => {
    const out: LogLine[] = []
    if (restored.length)
      out.push({
        id: "restored",
        content: t("world-log-restored", { count: restored.length }),
        tone: "dim",
      })
    for (const bridge of linked) {
      const prefix = t(`world-bridge-${bridge}-tag`)
      const values = {
        exchange: [{ address: isolate(persona.main) }, undefined, undefined],
        ens: [
          { ensName: persona.ens, address: isolate(persona.main) },
          undefined,
          undefined,
        ],
        poap: [
          { address: isolate(persona.addresses[1]) },
          { count: POAP_BADGES },
          undefined,
        ],
        cafe: [
          { count: CAFE_PAYMENTS },
          undefined,
          { friendName: FRIEND_NAME },
        ],
      }[bridge]
      out.push({ id: `${bridge}-tag`, content: prefix, tone: "dim" })
      values.forEach((vars, i) =>
        out.push({
          id: `${bridge}-${i}`,
          content: t(`world-log-${bridge}-${i + 1}`, vars),
          tone: i === 2 ? "leak" : "default",
        })
      )
    }
    return out
    // t is stable per locale; the linked bridges drive the log
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linked.join(), restored.length, locale])

  const fieldValue = (field: string) => {
    if (field === "public-name")
      return t("world-value-public-name", { ensName: persona.ens })
    if (field === "neighborhood")
      return info?.city
        ? t("world-value-neighborhood", { city: info.city })
        : t("world-value-neighborhood-no-city")
    return t(`world-value-${field}`)
  }

  const percent = numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(visibleShare)

  const ledgerFields: Array<[string, string]> = [
    ["addresses", t("world-value-addresses", { count: CLUSTER_SIZE })],
    [
      "net-worth",
      numberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(NET_WORTH_USD),
    ],
    [
      "income",
      t("world-value-income", {
        amount: `${format.format(MONTHLY_INCOME_USDC)} USDC`,
      }),
    ],
  ]

  return (
    <section
      aria-labelledby="world-connect-group"
      className="space-y-5 rounded-base border bg-background p-4 md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 id="world-connect-group" className="m-0 text-lg">
          {t("world-connect-group-label")}
        </h4>
        <p aria-live="polite" className="m-0 text-sm font-semibold">
          {t("world-connect-left", { count: BRIDGES.length - linked.length })}
        </p>
      </div>

      <ul className="m-0 grid list-none gap-2 sm:grid-cols-2">
        {BRIDGES.map((bridge) => {
          const isLinked = linked.includes(bridge)
          return (
            <li key={bridge} className="flex">
              <Button
                variant="outline"
                isSecondary={!isLinked}
                disabled={isLinked}
                onClick={() => link(bridge)}
                className={cn(
                  "h-full w-full flex-col items-start gap-1 text-start",
                  isLinked && "border-leak bg-leak-low-contrast opacity-100"
                )}
              >
                <span className="text-xs font-bold tracking-wide text-leak-high-contrast uppercase">
                  {isLinked
                    ? t("world-bridge-linked", {
                        bridge: t(`world-bridge-${bridge}-tag`),
                      })
                    : t(`world-bridge-${bridge}-tag`)}
                </span>
                <span className="font-normal text-body">
                  {t(`world-bridge-${bridge}-title`, { ensName: persona.ens })}
                </span>
              </Button>
            </li>
          )
        })}
      </ul>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <p className="m-0 text-sm font-bold">{t("world-log-heading")}</p>
          {lines.length ? (
            <LogLines lines={lines} label={t("world-log-heading")} />
          ) : (
            <p className="m-0 rounded-base border bg-background-highlight p-4 text-sm text-body-medium">
              {t("world-log-hint")}
            </p>
          )}
        </div>

        <div className="min-w-0 space-y-3 rounded-base border p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="m-0 text-xs text-body-medium">
                {t("world-card-label", { address: isolate(persona.main) })}
              </p>
              <p className="m-0 font-bold">
                {t("world-card-who", { address: isolate(persona.main) })}
              </p>
            </div>
            <Tag
              size="small"
              variant={identified ? "solid" : "outline"}
              status={identified ? "error" : "normal"}
            >
              {identified
                ? t("world-status-identified")
                : t("world-status-pseudonymous")}
            </Tag>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="m-0 mb-1 text-xs font-bold text-body-medium uppercase">
                {t("world-group-ledger")}
              </p>
              <dl className="m-0">
                {ledgerFields.map(([field, value]) => (
                  <div
                    key={field}
                    className="flex flex-wrap justify-between gap-x-3"
                  >
                    <dt className="text-body-medium">
                      {t(`world-field-${field}`)}
                    </dt>
                    <dd className="m-0 font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="m-0 mb-1 text-xs font-bold text-body-medium uppercase">
                {t("world-group-real-world")}
              </p>
              <dl className="m-0">
                {FIELDS.map(([field, bridge]) => {
                  const known = linked.includes(bridge)
                  return (
                    <div
                      key={field}
                      className="flex flex-wrap justify-between gap-x-3"
                    >
                      <dt className="text-body-medium">
                        {t(`world-field-${field}`)}
                      </dt>
                      <dd
                        className={cn(
                          "m-0",
                          known
                            ? "font-semibold text-leak-high-contrast motion-safe:animate-fade-in"
                            : "text-body-medium"
                        )}
                      >
                        {known ? fieldValue(field) : t("world-field-unknown")}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-live="polite"
        className="space-y-1 rounded-base border-s-4 border-s-leak bg-background-highlight p-4"
      >
        <p className="m-0">
          {linked.length === 0
            ? t("world-summary-initial")
            : !done
              ? t("world-summary-progress", {
                  done: format.format(linked.length),
                  total: format.format(BRIDGES.length),
                })
              : seconds !== null
                ? tRich.rich(
                    "page-privacy-public-by-default-world-summary-identified-time",
                    { seconds, strong }
                  )
                : tRich.rich(
                    "page-privacy-public-by-default-world-summary-identified",
                    { strong }
                  )}
        </p>
        {linked.length > 0 && (
          <p className="m-0 font-semibold text-leak-high-contrast">
            {t("world-summary-visible", { percent })}
          </p>
        )}
      </div>
    </section>
  )
}

export default ConnectDots
