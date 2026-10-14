"use client"

import { useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import type { PrivacyLessonWitness } from "@/lib/types"

import { Ltr, richTags } from "@/components/PrivacyWidgets/shared/rich-tags"
import { trackPrivacyLessonEvent } from "@/components/PrivacyWidgets/shared/track"
import { Button } from "@/components/ui/buttons/Button"
import {
  Card,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"

import { numberFormat } from "@/lib/utils/numbers"

import { witnesses } from "@/data/privacy-lesson/catalogue"
import { persona } from "@/data/privacy-lesson/persona"

import { useLesson, useLessonStorage } from "../../lesson-provider"
import RouteMap from "../../route-map"
import { LESSON_NS, useLessonTranslations } from "../../use-lesson-translations"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

// Example payment values (formatted at render, never copy)
const AMOUNT_ETH = 0.03
const FEE_ETH = 0.00002
/** How long the whole journey takes in the story the lesson tells */
const JOURNEY_SECONDS = 12
const STEP_MS = 1400

const NOT_SENT = false

/** Status line per stop; the last two stops happen after confirmation */
const statusKey: Record<PrivacyLessonWitness, string> = {
  you: "send-status-you",
  wallet: "send-status-wallet",
  rpc: "send-status-rpc",
  network: "send-status-network",
  chain: "send-status-chain",
  analysts: "send-status-chain",
  world: "send-status-chain",
}

/** Witnesses with a card, in route order (everyone except "you") */
const witnessCards = witnesses.filter((stop) => stop !== "you")

type Phase = "idle" | "running" | "done"

/** Bidi-isolates a technical value interpolated into translated text */
const isolate = (value: string) => `\u2068${value}\u2069`

const SendJourney = () => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const { collect } = useLesson()
  const [sent, setSent] = useLessonStorage("sent", NOT_SENT)
  const [phase, setPhase] = useState<Phase>("idle")
  const [step, setStep] = useState(0)
  const cardsHeading = useRef<HTMLHeadingElement>(null)

  // A payment sent on an earlier visit (or "Start over") sets the scene
  useEffect(() => {
    if (sent === true) {
      setPhase("done")
      setStep(witnesses.length)
    } else {
      setPhase("idle")
      setStep(0)
    }
  }, [sent])

  // Walk the payment through the stops, one at a time
  useEffect(() => {
    if (phase !== "running") return
    if (step >= 1) collect("ip")
    if (step >= witnesses.length) {
      setPhase("done")
      setSent(true)
      return
    }
    const timer = setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => clearTimeout(timer)
  }, [phase, step, collect, setSent])

  // Move focus to the results once the journey ends after a click
  const announced = useRef(false)
  useEffect(() => {
    if (phase === "done" && announced.current) cardsHeading.current?.focus()
  }, [phase])

  const send = () => {
    trackPrivacyLessonEvent("widget-used", "send")
    announced.current = true
    if (prefersReducedMotion) {
      collect("ip")
      setStep(witnesses.length)
      setPhase("done")
      setSent(true)
      return
    }
    setStep(0)
    setPhase("running")
  }

  const formatNumber = numberFormat(locale)
  const block = isolate(formatNumber.format(persona.block))
  const amountDisplay = `${formatNumber.format(AMOUNT_ETH)} ETH`
  const amount = isolate(amountDisplay)
  const fee = `${numberFormat(locale, { maximumSignificantDigits: 2 }).format(FEE_ETH)} ETH`
  const seconds = JOURNEY_SECONDS
  const friend = isolate(persona.friend)

  const current: PrivacyLessonWitness | undefined =
    phase === "running"
      ? witnesses[Math.min(step, witnesses.length - 1)]
      : undefined

  const status =
    phase === "idle"
      ? t("send-status-ready")
      : phase === "done"
        ? t("send-status-done", { block, seconds })
        : t(statusKey[current ?? "you"], { block })

  const caption = current
    ? t(`send-caption-${current}`, { block, friend })
    : null

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:items-start">
        <Card
          variant="base"
          size="md"
          aria-label={t("send-wallet-aria")}
          role="group"
        >
          <CardContent className="space-y-3">
            <p className="text-sm font-bold text-body-medium">
              {t("send-wallet-account")}
            </p>
            <dl className="m-0 space-y-2 text-sm">
              {[
                ["send-wallet-to", <Ltr key="to">{persona.friend}</Ltr>],
                [
                  "send-wallet-amount",
                  <span key="amount" dir="ltr" className="text-lg font-bold">
                    {amountDisplay}
                  </span>,
                ],
                ["send-wallet-memo-label", t("send-wallet-memo")],
                ["send-wallet-fee", <Ltr key="fee">{fee}</Ltr>],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  className="flex flex-wrap items-baseline justify-between gap-x-4"
                >
                  <dt className="text-body-medium">{t(label as string)}</dt>
                  <dd className="m-0">{value}</dd>
                </div>
              ))}
            </dl>
            <Button
              className="w-full"
              onClick={send}
              disabled={phase === "running"}
            >
              <Send aria-hidden className="rtl:-scale-x-100" />
              {phase === "running"
                ? t("send-button-sending")
                : phase === "done"
                  ? t("send-button-sent")
                  : t("send-button")}
            </Button>
          </CardContent>
        </Card>

        <div className="min-w-0 space-y-4">
          <p
            className="text-sm font-bold text-body-medium"
            id="send-journey-label"
          >
            {phase === "done"
              ? t("send-journey-end-label", { seconds })
              : t("send-journey-start-label")}
          </p>
          <div aria-labelledby="send-journey-label" role="region">
            <RouteMap
              current={current}
              reached={phase === "done" ? witnesses.length : step}
            />
          </div>
          <div
            className="min-h-[4lh] rounded-base bg-background-highlight p-4"
            aria-live="polite"
          >
            <p className="font-semibold text-leak-high-contrast">{status}</p>
            <p className="text-body-medium">
              {phase === "idle"
                ? t("send-journey-start-text")
                : phase === "done"
                  ? t("send-journey-end-text")
                  : caption}
            </p>
          </div>
        </div>
      </div>

      {phase === "done" && (
        <div className="space-y-4">
          <h3 ref={cardsHeading} tabIndex={-1} className="text-h5 outline-none">
            {t("send-pull", { seconds })}{" "}
            <span className="text-leak-high-contrast">
              {t("send-pull-highlight")}
            </span>
          </h3>
          <ul className="m-0 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {witnessCards.map((stop, index) => (
              <li key={stop} className="flex">
                <Card
                  href={`#${stop}`}
                  variant="base"
                  size="md"
                  className="flex-1 border-s-4 border-s-leak"
                >
                  <CardContent className="space-y-2">
                    <p className="text-xs font-bold tracking-wide text-leak-high-contrast uppercase">
                      {t("send-witness-number", {
                        number: numberFormat(locale, {
                          minimumIntegerDigits: 2,
                        }).format(index + 1),
                      })}
                    </p>
                    <CardTitle className="text-lg">
                      {t(`send-witness-${stop}-name`, { friend })}
                    </CardTitle>
                    <CardParagraph>
                      {t(`send-witness-${stop}-got`, { amount, friend })}
                    </CardParagraph>
                    <CardParagraph className="text-sm text-body-medium">
                      <KeepsLine stop={stop} />
                    </CardParagraph>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/** "How long they keep it: <strong>…</strong>" */
const KeepsLine = ({ stop }: { stop: PrivacyLessonWitness }) => {
  const t = useTranslations(LESSON_NS)
  return <>{t.rich(`${LESSON_NS}-send-witness-${stop}-keeps`, richTags())}</>
}

export default SendJourney
