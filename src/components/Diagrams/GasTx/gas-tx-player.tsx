"use client"

import { type ReactNode, useEffect, useState } from "react"
import { Send } from "lucide-react"
import dynamic from "next/dynamic"
import { useLocale, useTranslations } from "next-intl"

import { useCountUp } from "@/components/Diagrams/anatomy"
import {
  DiagramCaption,
  DiagramPresets,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
} from "@/components/Diagrams/interactive-diagram"

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

  // Every caption this preset can show, so the caption area keeps the height
  // of the longest one.
  const allCaptions = [GAS_TX_IDLE_STEP, ...GAS_TX_STEPS.keys()].map((i) =>
    t(getGasTxView(presetId, i).captionKey, values)
  )

  return (
    <InteractiveDiagram
      caption={t("gas-tx-caption")}
      description={t("gas-tx-description")}
      illustration={
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
      presets={
        <DiagramPresets
          label={t("gas-tx-presets-label")}
          options={GAS_TX_PRESET_IDS.map((id) => ({
            id,
            label: t(`gas-tx-preset-${id}`),
          }))}
          value={presetId}
          onChange={selectPreset}
          eventAction="gas-tx preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("gas-tx-send"),
            icon: <Send />,
            onClick: send,
          }}
          counter={t("gas-tx-step-counter", {
            current: format(stepIndex + 1),
            total: format(GAS_TX_STEPS.length),
          })}
          onPrevious={() => goToStep(stepIndex - 1)}
          onNext={() => goToStep(stepIndex + 1)}
          onReset={() => goToStep(GAS_TX_IDLE_STEP)}
          canGoPrevious={stepIndex > 0}
          canGoNext={stepIndex < LAST_STEP}
          canReset={stepIndex !== GAS_TX_IDLE_STEP}
          labels={{
            previous: t("gas-tx-previous-step"),
            next: t("gas-tx-next-step"),
            reset: t("diagram-reset"),
          }}
          eventAction="gas-tx transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={t(view.captionKey, values)}
          all={allCaptions}
        />
      }
      readout={
        <DiagramReadout
          label={t("gas-tx-readout-label")}
          rows={[
            { label: t("gas-tx-readout-limit"), value: values.limit },
            { label: t("gas-tx-readout-used"), value: format(usedShown) },
            {
              label: t("gas-tx-readout-returned"),
              value: format(returnedShown),
            },
          ]}
        />
      }
    />
  )
}
