"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import type { PrivacyLessonDossierId } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"
import { SkeletonLines } from "@/components/ui/skeleton"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { dateTimeFormat } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import { type BrowserInfo, collectBrowserInfo } from "../shared/browser-info"
import { Ltr, richTags } from "../shared/rich-tags"
import { trackPrivacyLessonEvent } from "../shared/track"

const NS = "component-privacy-fingerprint"

/** Bidi-isolates a technical value interpolated into translated text */
const isolate = (value: string) => `\u2068${value}\u2069`

/** The browser family, shown as data (it's the visitor's own browser) */
const browserFamily = (userAgent: string): string | null => {
  if (/Edg\//.test(userAgent)) return "Edge"
  if (/OPR\//.test(userAgent)) return "Opera"
  if (/SamsungBrowser\//.test(userAgent)) return "Samsung Internet"
  if (/Firefox\//.test(userAgent)) return "Firefox"
  if (/Chrome\//.test(userAgent)) return "Chrome"
  if (/Safari\//.test(userAgent)) return "Safari"
  return null
}

/** "UTC+1", "UTC-3:30": a technical value, rendered LTR */
const formatUtcOffset = (minutes: number) => {
  const sign = minutes < 0 ? "-" : "+"
  const abs = Math.abs(minutes)
  const hours = Math.floor(abs / 60)
  const rest = abs % 60
  return `UTC${sign}${hours}${rest ? `:${String(rest).padStart(2, "0")}` : ""}`
}

/** Dossier entries this widget reads (wallets is left to the wallet chapter) */
const collectedIds = (info: BrowserInfo): PrivacyLessonDossierId[] => [
  "tz",
  "langs",
  "device",
  ...(info.gpu ? (["gpu"] as const) : []),
  "fp",
]

export interface BrowserFingerprintProps {
  /**
   * "lesson" reads the browser as soon as it mounts (the lesson's copy says
   * the page already read it). "standalone" waits for the reader to press the
   * button.
   */
  variant?: "lesson" | "standalone"
  /** Hide the closing link to /privacy/online/ (e.g. when embedded there) */
  hideLearnMore?: boolean
  /** Called once, after reading, with the dossier entries that were read */
  onCollect?: (ids: PrivacyLessonDossierId[]) => void
  /** Fixed values instead of reading the browser (stories, visual tests) */
  demoInfo?: BrowserInfo
  className?: string
}

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="grid gap-x-4 gap-y-0.5 border-b py-2 last:border-b-0 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]">
    <dt className="text-sm text-body-medium">{label}</dt>
    <dd className="m-0 min-w-0 wrap-break-word">{children}</dd>
  </div>
)

const BrowserFingerprintClient = ({
  variant = "standalone",
  hideLearnMore,
  onCollect,
  demoInfo,
  className,
}: BrowserFingerprintProps) => {
  const tRaw = useTranslations(NS)
  const t = (key: string, values?: Record<string, string | number>) =>
    tRaw(`${NS}-${key}`, values)
  const locale = useLocale()

  const [open, setOpen] = useState(variant === "lesson")
  const [info, setInfo] = useState<BrowserInfo | null>(demoInfo ?? null)
  const [failed, setFailed] = useState(false)
  const [now, setNow] = useState<Date | null>(null)
  const collectedOnce = useRef(false)
  const onCollectRef = useRef(onCollect)
  onCollectRef.current = onCollect

  useEffect(() => {
    if (!open || info || demoInfo) return
    let active = true
    collectBrowserInfo().then(
      (value) => active && setInfo(value),
      () => active && setFailed(true)
    )
    return () => {
      active = false
    }
  }, [open, info, demoInfo])

  useEffect(() => {
    if (!info || collectedOnce.current) return
    collectedOnce.current = true
    onCollectRef.current?.(collectedIds(info))
  }, [info])

  // Local time is read on the client only, so server and client markup match
  useEffect(() => {
    if (!open) return
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(timer)
  }, [open])

  const formatNumber = numberFormat(locale)
  const browser = info ? browserFamily(info.userAgent) : null

  return (
    <div className={cn("space-y-4", className)}>
      {variant === "standalone" && (
        <div className="space-y-2">
          <h3 className="text-h5">{t("title")}</h3>
          <p>{t("intro")}</p>
        </div>
      )}

      {variant === "standalone" && (
        <Button
          variant={open ? "outline" : "solid"}
          isSecondary={open}
          aria-expanded={open}
          onClick={() => {
            if (!open) trackPrivacyLessonEvent("widget-used", "fingerprint")
            setOpen(!open)
          }}
        >
          {open ? t("button-hide") : t("button-show")}
        </Button>
      )}

      {open && (
        <div className="rounded-base border bg-background p-4 md:p-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="font-bold">{t("list-aria")}</p>
            <Tag size="small" status="warning" variant="outline">
              <span aria-hidden>{t("tag-live")}</span>
              <span className="sr-only">{t("tag-live-aria")}</span>
            </Tag>
          </div>

          {failed && <p role="status">{t("error")}</p>}

          {!failed && !info && (
            <div role="status">
              <p className="text-sm text-body-medium">{t("reading")}</p>
              <SkeletonLines noOfLines={5} className="px-0 pt-4" />
            </div>
          )}

          {info && (
            <dl aria-label={t("list-aria")} className="m-0">
              <Field label={t("field-timezone")}>
                {info.timeZone ? (
                  t("timezone-value", {
                    zone: isolate(info.timeZone.replace(/_/g, " ")),
                    offset: isolate(formatUtcOffset(info.utcOffsetMinutes)),
                  })
                ) : (
                  <span className="text-body-medium">{t("unavailable")}</span>
                )}
              </Field>
              <Field label={t("field-local-time")}>
                {now
                  ? dateTimeFormat(locale, {
                      hour: "numeric",
                      minute: "2-digit",
                    }).format(now)
                  : null}
              </Field>
              <Field label={t("field-languages")}>
                {info.languages.length ? (
                  <Ltr>{info.languages.join(", ")}</Ltr>
                ) : (
                  <span className="text-body-medium">{t("unavailable")}</span>
                )}
              </Field>
              <Field label={t("field-device")}>
                <span className="flex flex-wrap gap-x-2">
                  <span>{t(`device-${info.device}`)}</span>
                  {info.cores !== null && (
                    <span className="text-body-medium">
                      {t("device-cores", { count: info.cores })}
                    </span>
                  )}
                  {info.memory !== null && (
                    <span className="text-body-medium">
                      {t("device-memory", {
                        amount: formatNumber.format(info.memory),
                      })}
                    </span>
                  )}
                </span>
              </Field>
              <Field label={t("field-browser")}>
                {browser ? <Ltr>{browser}</Ltr> : t("browser-other")}
              </Field>
              <Field label={t("field-screen")}>
                {info.screen ? (
                  t("screen-value", {
                    size: isolate(
                      `${formatNumber.format(info.screen.width)} × ${formatNumber.format(info.screen.height)}`
                    ),
                    ratio: numberFormat(locale, {
                      maximumFractionDigits: 2,
                    }).format(info.screen.pixelRatio),
                  })
                ) : (
                  <span className="text-body-medium">{t("unavailable")}</span>
                )}
              </Field>
              <Field label={t("field-touch")}>
                {info.touch ? t("touch-yes") : t("touch-no")}
              </Field>
              <Field label={t("field-appearance")}>
                {info.darkMode ? t("device-dark-mode") : t("device-light-mode")}
              </Field>
              <Field label={t("field-gpu")}>
                {info.gpu ? (
                  <Ltr>{info.gpu}</Ltr>
                ) : (
                  <span className="text-body-medium">{t("gpu-hidden")}</span>
                )}
              </Field>
              <Field label={t("field-wallets")}>
                <span className="block">
                  {info.walletCount
                    ? t("wallets-count", { count: info.walletCount })
                    : t("wallets-none")}
                </span>
                <span className="block text-sm text-body-medium">
                  {t("wallets-explainer")}
                </span>
              </Field>
              <Field label={t("field-fingerprint")}>
                <span
                  dir="ltr"
                  className="font-mono text-lg font-bold tracking-wider text-leak-high-contrast"
                >
                  {info.fingerprint}
                </span>
              </Field>
            </dl>
          )}

          {info && (
            <p className="mt-4 text-sm text-body-medium">{t("caption")}</p>
          )}
        </div>
      )}

      {open && info && (
        <div className="space-y-2">
          <h4 className="text-base font-bold">{t("explainer-title")}</h4>
          <p>{t("explainer")}</p>
          <p className="text-sm text-body-medium">{t("how")}</p>
          <p>{t("trackers")}</p>
        </div>
      )}

      <p className="text-sm text-body-medium">{t("privacy-note")}</p>

      {!hideLearnMore && (
        <p>
          {tRaw.rich(
            `${NS}-learn-more`,
            richTags({ link: "/privacy/online/" })
          )}
        </p>
      )}
    </div>
  )
}

export default BrowserFingerprintClient
