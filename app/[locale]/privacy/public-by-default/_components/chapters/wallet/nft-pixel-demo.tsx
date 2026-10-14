"use client"

import { useId, useState } from "react"
import { useLocale } from "next-intl"

import { useBrowserInfo } from "@/components/PrivacyWidgets/shared/browser-info"
import LogLines, {
  type LogLine,
} from "@/components/PrivacyWidgets/shared/log-lines"
import { Ltr } from "@/components/PrivacyWidgets/shared/rich-tags"
import { trackPrivacyLessonEvent } from "@/components/PrivacyWidgets/shared/track"
import { Button } from "@/components/ui/buttons/Button"
import Switch from "@/components/ui/switch"

import { cn } from "@/lib/utils/cn"
import { dateTimeFormat } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import { persona } from "@/data/privacy-lesson/persona"

import { useLesson } from "../../lesson-provider"
import { useLessonTranslations } from "../../use-lesson-translations"

import { relativeTime } from "./format"

type Outcome = "idle" | "blocked" | "leaked"

const TOKEN_ID = 88213
const SENDER = "0x0000…dEaD"
const HOST = "free-claim.example"

const NftPixelDemo = () => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const { collect } = useLesson()
  const info = useBrowserInfo()
  const switchId = useId()
  const [blockImages, setBlockImages] = useState(false)
  const [outcome, setOutcome] = useState<Outcome>("idle")
  const [openedAt, setOpenedAt] = useState<Date | null>(null)

  const open = () => {
    trackPrivacyLessonEvent("widget-used", "nft-pixel")
    setOpenedAt(new Date())
    if (blockImages) {
      setOutcome("blocked")
    } else {
      setOutcome("leaked")
      collect("pixel")
    }
  }

  const time = openedAt
    ? dateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }).format(
        openedAt
      )
    : ""
  const stamp = openedAt
    ? dateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(openedAt)
    : ""
  // A short slice of the real user agent: shown only to you, never sent
  const ua = info?.userAgent.slice(0, 48) ?? "Mozilla/5.0"

  const lines: LogLine[] =
    outcome === "leaked"
      ? [
          {
            id: "get",
            prefix: stamp,
            content: (
              <Ltr>
                {`GET /t/${TOKEN_ID}.png 200 ip=${persona.ip} ua="${ua}…"`}
              </Ltr>
            ),
          },
          {
            id: "token",
            tone: "leak",
            content: t("wallet-nft-log-token", { address: persona.main }),
          },
          {
            id: "conclusion",
            tone: "leak",
            content: info?.city
              ? t("wallet-nft-log-conclusion", { city: info.city, time })
              : t("wallet-nft-log-conclusion-no-city", { time }),
          },
        ]
      : outcome === "blocked"
        ? [
            {
              id: "nothing",
              tone: "dim",
              content: t("wallet-nft-log-nothing"),
            },
            {
              id: "blocked",
              tone: "safe",
              content: t("wallet-nft-log-blocked"),
            },
          ]
        : [{ id: "nothing", tone: "dim", content: t("wallet-nft-log-nothing") }]

  return (
    <div className="space-y-4 rounded-base border bg-background p-4 md:p-6">
      <h3 className="m-0 text-h5">{t("wallet-nft-demo-title")}</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <figure className="m-0 rounded-base border bg-background-highlight p-4">
            <figcaption className="mb-2 text-xs font-bold tracking-wide text-body-medium uppercase">
              {t("wallet-nft-card-label")}
            </figcaption>
            <div
              className={cn(
                "grid aspect-square max-h-56 w-full place-items-center rounded-lg p-4 text-center",
                outcome === "leaked"
                  ? "bg-leak-low-contrast text-leak-high-contrast"
                  : "border border-dashed text-body-medium"
              )}
            >
              <span className={cn(outcome === "leaked" && "text-lg font-bold")}>
                {outcome === "leaked"
                  ? t("wallet-nft-image-bait", {
                      amount: `${numberFormat(locale).format(5000)} USDC`,
                    })
                  : outcome === "blocked"
                    ? t("wallet-nft-image-blocked")
                    : t("wallet-nft-image-idle")}
              </span>
            </div>
            <p className="mt-3 mb-0 font-semibold">
              {t("wallet-nft-token-name", {
                tokenId: numberFormat(locale, { useGrouping: false }).format(
                  TOKEN_ID
                ),
              })}
            </p>
            <p className="m-0 text-sm text-body-medium">
              {t("wallet-nft-received", {
                address: SENDER,
                timeAgo: relativeTime(locale, -2, "minute"),
              })}
            </p>
          </figure>

          <div className="flex items-start gap-3">
            <Switch
              id={switchId}
              checked={blockImages}
              onCheckedChange={(on) => {
                setBlockImages(on)
                setOutcome("idle")
              }}
              className="mt-1"
            />
            <label htmlFor={switchId} className="cursor-pointer">
              <span className="block font-semibold">
                {t("wallet-nft-switch-label")}
              </span>
              <span className="block text-sm text-body-medium">
                {t("wallet-nft-switch-hint")}
              </span>
            </label>
          </div>

          <Button onClick={open} size="sm">
            {t(
              outcome === "idle"
                ? "wallet-nft-button"
                : "wallet-nft-button-again"
            )}
          </Button>
        </div>

        <div className="min-w-0 space-y-2">
          <p className="m-0 text-sm font-bold text-body-medium">
            {t("wallet-nft-log-header")}
            <span dir="ltr" className="block font-mono font-normal">
              {HOST}
            </span>
          </p>
          <LogLines lines={lines} label={t("wallet-nft-log-header")} />
        </div>
      </div>
    </div>
  )
}

export default NftPixelDemo
