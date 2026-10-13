"use client"

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useId,
  useState,
} from "react"
import { Send } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { ChevronNext, ChevronPrev } from "@/components/Chevron"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/buttons/Button"

import { numberFormat } from "@/lib/utils/numbers"

import {
  clampGasTxStep,
  GAS_TX_IDLE_STEP,
  GAS_TX_PRESET_IDS,
  GAS_TX_STEPS,
  type GasTxPresetId,
  getGasTxView,
} from "./model"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

// Each step's animation is 500-700ms; the rest is reading time. With reduced
// motion nothing moves, so steps only need time to read the caption.
const STEP_DWELL_MS = 1400
const STEP_DWELL_REDUCED_MS = 2400

const LAST_STEP = GAS_TX_STEPS.length - 1

interface GasTxPlayerProps {
  /** The server-rendered drawing. It reacts to this island's `data-*` attributes. */
  children: ReactNode
  initialPreset?: GasTxPresetId
  initialStep?: number
}

/**
 * Client island for the gas-tx diagram: preset control, playback, readout and
 * caption. It only toggles `data-*` attributes and `--diagram-level` on a
 * `group/diagram` wrapper; the drawing animates itself with CSS.
 */
export function GasTxPlayer({
  children,
  initialPreset = "light",
  initialStep = GAS_TX_IDLE_STEP,
}: GasTxPlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const presetsLabelId = useId()

  const [presetId, setPresetId] = useState<GasTxPresetId>(initialPreset)
  const [stepIndex, setStepIndex] = useState(clampGasTxStep(initialStep))
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying || stepIndex >= LAST_STEP) return
    const timeout = window.setTimeout(
      () => {
        setStepIndex(stepIndex + 1)
        if (stepIndex + 1 >= LAST_STEP) setIsPlaying(false)
      },
      prefersReducedMotion ? STEP_DWELL_REDUCED_MS : STEP_DWELL_MS
    )
    return () => window.clearTimeout(timeout)
  }, [isPlaying, stepIndex, prefersReducedMotion])

  const view = getGasTxView(presetId, stepIndex)
  const format = (value: number) => numberFormat(locale).format(value)
  const values = {
    limit: format(view.gasLimit),
    used: format(view.gasUsed),
    returned: format(view.gasReturned),
  }

  const selectPreset = (id: GasTxPresetId) => {
    setIsPlaying(false)
    setPresetId(id)
    setStepIndex(GAS_TX_IDLE_STEP)
  }

  const send = () => {
    setStepIndex(0)
    setIsPlaying(true)
  }

  const goToStep = (index: number) => {
    setIsPlaying(false)
    setStepIndex(clampGasTxStep(index))
  }

  const flag = (on: boolean) => (on ? "" : undefined)

  return (
    <div
      className="group/diagram flex flex-col gap-4"
      data-motion={view.motion ?? undefined}
      data-outcome={view.outcome}
      data-r-enter={flag(view.reached.enter)}
      data-r-reserve={flag(view.reached.reserve)}
      data-r-execute={flag(view.reached.execute)}
      data-r-return={flag(view.reached.return)}
      data-reverted={flag(view.reverted)}
      style={{ "--diagram-level": view.levelShown } as CSSProperties}
    >
      {children}

      <p role="status" className="min-h-12 text-body">
        {t(view.captionKey, values)}
      </p>

      <dl
        aria-label={t("gas-tx-readout-label")}
        className="m-0 grid grid-cols-3 gap-2 rounded-base bg-background-highlight p-3"
      >
        {(
          [
            ["gas-tx-readout-limit", values.limit],
            ["gas-tx-readout-used", values.used],
            ["gas-tx-readout-returned", values.returned],
          ] as const
        ).map(([key, value]) => (
          <div key={key} className="min-w-0">
            <dt className="text-xs text-body-medium md:text-sm">{t(key)}</dt>
            <dd className="m-0 font-mono text-base font-bold text-body md:text-xl">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span id={presetsLabelId} className="text-sm text-body-medium">
            {t("gas-tx-presets-label")}
          </span>
          <ButtonGroup aria-labelledby={presetsLabelId}>
            {GAS_TX_PRESET_IDS.map((id) => (
              <Button
                key={id}
                size="sm"
                variant={id === presetId ? "solid" : "outline"}
                aria-pressed={id === presetId}
                onClick={() => selectPreset(id)}
                customEventOptions={{
                  eventCategory: "Diagram",
                  eventAction: "gas-tx preset",
                  eventName: id,
                }}
              >
                {t(`gas-tx-preset-${id}`)}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <Button
          size="sm"
          onClick={send}
          customEventOptions={{
            eventCategory: "Diagram",
            eventAction: "gas-tx send",
            eventName: presetId,
          }}
        >
          <Send />
          {t("gas-tx-send")}
        </Button>

        <div className="flex items-center gap-2">
          <ButtonGroup aria-label={t("gas-tx-steps-label")}>
            <Button
              size="sm"
              variant="outline"
              aria-label={t("gas-tx-previous-step")}
              disabled={stepIndex <= 0}
              onClick={() => goToStep(stepIndex - 1)}
            >
              <ChevronPrev />
            </Button>
            <Button
              size="sm"
              variant="outline"
              aria-label={t("gas-tx-next-step")}
              disabled={stepIndex >= LAST_STEP}
              onClick={() => goToStep(stepIndex + 1)}
            >
              <ChevronNext />
            </Button>
          </ButtonGroup>
          {stepIndex !== GAS_TX_IDLE_STEP && (
            <span className="text-sm text-body-medium">
              {t("gas-tx-step-counter", {
                current: format(stepIndex + 1),
                total: format(GAS_TX_STEPS.length),
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
