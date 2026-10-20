"use client"

import { useState } from "react"

import { collectBrowserInfo } from "@/components/PrivacyWidgets/shared/browser-info"
import LogLines, {
  type LogLine,
} from "@/components/PrivacyWidgets/shared/log-lines"
import { Ltr } from "@/components/PrivacyWidgets/shared/rich-tags"
import { trackPrivacyLessonEvent } from "@/components/PrivacyWidgets/shared/track"
import { Button } from "@/components/ui/buttons/Button"

import { useLesson } from "../../lesson-provider"
import { useLessonTranslations } from "../../use-lesson-translations"

const REQUEST = `window.dispatchEvent(new Event("eip6963:requestProvider"))`

/**
 * Asks the browser which wallets it has (EIP-6963, with a legacy fallback)
 * and shows only how many answered. Names are never read or kept, and
 * nothing is sent anywhere.
 */
const WalletDiscoveryDemo = () => {
  const t = useLessonTranslations()
  const { collect } = useLesson()
  const [count, setCount] = useState<number | null>(null)
  const [asking, setAsking] = useState(false)
  const [round, setRound] = useState(0)

  const ask = async () => {
    trackPrivacyLessonEvent("widget-used", "wallet-discovery")
    setAsking(true)
    setCount(null)
    setRound((r) => r + 1)
    const info = await collectBrowserInfo()
    setCount(info.walletCount)
    setAsking(false)
    collect("wallets")
  }

  const lines: LogLine[] = round
    ? [
        { id: `req-${round}`, prefix: ">", content: <Ltr>{REQUEST}</Ltr> },
        ...(count === null
          ? []
          : count === 0
            ? [
                {
                  id: `none-${round}`,
                  tone: "dim" as const,
                  content: t("wallet-discovery-log-none"),
                },
              ]
            : Array.from({ length: count }, (_, i) => ({
                id: `answer-${round}-${i}`,
                tone: "leak" as const,
                content: t("wallet-discovery-log-answer"),
              }))),
      ]
    : []

  return (
    <div className="space-y-4 rounded-base border bg-background p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="m-0 text-h5">{t("wallet-discovery-demo-title")}</h3>
        <Button onClick={ask} disabled={asking} size="sm">
          {t(
            round ? "wallet-discovery-button-again" : "wallet-discovery-button"
          )}
        </Button>
      </div>
      <p className="m-0 text-sm font-bold text-body-medium">
        {t("wallet-discovery-log-header")}
      </p>
      {lines.length > 0 && (
        <LogLines lines={lines} label={t("wallet-discovery-log-header")} />
      )}
      <p aria-live="polite" className="m-0 font-semibold">
        {count === null
          ? ""
          : count > 0
            ? t("wallet-discovery-result", { count })
            : t("wallet-discovery-result-none")}
      </p>
    </div>
  )
}

export default WalletDiscoveryDemo
