"use client"

import { type ReactNode, useEffect, useId, useState } from "react"
import { Send } from "lucide-react"
import dynamic from "next/dynamic"
import { useLocale, useTranslations } from "next-intl"

import { ChevronNext, ChevronPrev } from "@/components/Chevron"
import { DiagramStage, useCountUp } from "@/components/Diagrams/anatomy"
import { DiagramFigure } from "@/components/Diagrams/diagram-figure"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/buttons/Button"

import { numberFormat } from "@/lib/utils/numbers"

import {
  clampGasTxStep,
  GAS_RIG_PARTS,
  GAS_RIG_SIZE,
  GAS_TX_IDLE_STEP,
  GAS_TX_PRESET_IDS,
  GAS_TX_STEPS,
  type GasRigPart,
  type GasTxPresetId,
  getGasTxView,
} from "./model"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

// The isometric rig is decorative SVG (aria-hidden) and not needed for the
// first paint, so it ships as its own chunk after hydration. The placeholder
// reserves the same box, so nothing shifts when it arrives.
const GasRig = dynamic(() => import("./gas-rig"), {
  ssr: false,
  loading: () => <RigPlaceholder />,
})

function RigPlaceholder() {
  return (
    <div
      aria-hidden
      className="w-full rounded-base bg-background-highlight"
      style={{ aspectRatio: `${GAS_RIG_SIZE.width} / ${GAS_RIG_SIZE.height}` }}
    />
  )
}

// Each step's animation is 500-700ms (plus a 700ms delay for the tank in
// step 3); the rest is reading time. With reduced motion nothing moves, so
// steps only need time to read the caption.
const STEP_DWELL_MS = 2000
const STEP_DWELL_REDUCED_MS = 2400

const LAST_STEP = GAS_TX_STEPS.length - 1

// Per part: the concept name shown in the figure, and the tooltip that
// explains what it is drawn as. Keys in the `component-diagrams` namespace.
const LABELS: Record<GasRigPart, { label: string; tooltip: string }> = {
  deck: { label: "gas-tx-world-state", tooltip: "gas-tx-tooltip-deck" },
  order: { label: "gas-tx-transaction", tooltip: "gas-tx-tooltip-order" },
  pump: { label: "gas-tx-label-sender", tooltip: "gas-tx-tooltip-pump" },
  tank: { label: "gas-tx-gas-supply", tooltip: "gas-tx-tooltip-tank" },
  feed: { label: "gas-tx-message", tooltip: "gas-tx-tooltip-feed" },
  engine: { label: "gas-tx-label-contract", tooltip: "gas-tx-tooltip-engine" },
  returnLine: {
    label: "gas-tx-label-unused-gas",
    tooltip: "gas-tx-tooltip-return-line",
  },
  meter: { label: "gas-tx-readout-returned", tooltip: "gas-tx-tooltip-meter" },
}

interface GasTxPlayerProps {
  initialPreset?: GasTxPresetId
  initialStep?: number
}

/**
 * The gas-tx diagram as a fuel rig: presets, playback, the lazy-loaded
 * isometric drawing with its label rows, readout and caption, all from one
 * model view.
 */
export function GasTxPlayer({
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
  // Readouts count up with the drawing: gas used while the tank drains in
  // step 3 (after the feed flow), gas returned while it drains back in step 4.
  const usedShown = useCountUp(view.shownUsed, {
    delay: view.motion === "execute" ? 700 : 0,
    instant: prefersReducedMotion,
  })
  const returnedShown = useCountUp(view.shownReturned, {
    instant: prefersReducedMotion,
  })
  const format = (value: number) => numberFormat(locale).format(value)
  const values = {
    limit: format(view.gasLimit),
    used: format(view.gasUsed),
    returned: format(view.gasReturned),
  }

  const textFor = (key: "label" | "tooltip") =>
    Object.fromEntries(
      GAS_RIG_PARTS.map((part) => [part, t(LABELS[part][key])])
    ) as Record<GasRigPart, ReactNode>

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

  return (
    <div>
      <DiagramFigure
        caption={t("gas-tx-caption")}
        captionPlacement="top"
        description={t("gas-tx-description")}
      >
        <DiagramStage
          illustration={
            // Room above and below for labels outside the plate.
            <div className="mx-auto w-full max-w-2xl py-1">
              <GasRig
                view={view}
                runKey={`${presetId}-${stepIndex}`}
                labels={textFor("label")}
                tooltips={textFor("tooltip")}
                revertedLabel={t("gas-tx-reverted")}
              />
            </div>
          }
          panel={
            <>
              <div className="flex flex-col gap-2">
                <span id={presetsLabelId} className="text-sm text-body-medium">
                  {t("gas-tx-presets-label")}
                </span>
                <ButtonGroup
                  aria-labelledby={presetsLabelId}
                  className="w-full"
                >
                  {GAS_TX_PRESET_IDS.map((id) => (
                    <Button
                      key={id}
                      size="sm"
                      variant={id === presetId ? "solid" : "outline"}
                      aria-pressed={id === presetId}
                      onClick={() => selectPreset(id)}
                      className="flex-1"
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

              <div className="flex flex-wrap items-center gap-2">
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
                    data-diagram-next=""
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

              <p role="status" className="m-0 min-h-[2lh] text-sm text-body">
                {t(view.captionKey, values)}
              </p>

              <dl
                aria-label={t("gas-tx-readout-label")}
                className="m-0 flex flex-col gap-1 border-t border-border pt-3"
              >
                {(
                  [
                    ["gas-tx-readout-limit", values.limit],
                    ["gas-tx-readout-used", format(usedShown)],
                    ["gas-tx-readout-returned", format(returnedShown)],
                  ] as const
                ).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-baseline justify-between gap-3"
                  >
                    <dt className="text-sm text-body-medium">{t(key)}</dt>
                    <dd className="m-0 font-mono text-base font-bold text-body">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          }
        />
      </DiagramFigure>
    </div>
  )
}
