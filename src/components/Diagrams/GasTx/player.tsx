"use client"

import { useMemo, useState } from "react"
import { Send } from "lucide-react"
import { useTranslations } from "next-intl"

import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
import {
  DiagramCaption,
  DiagramCountUp,
  DiagramPresets,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
  useDiagramFormat,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import {
  GAS_TX_IDLE_STEP,
  GAS_TX_PARTS,
  GAS_TX_PRESET_IDS,
  GAS_TX_STEPS,
  type GasTxPart,
  type GasTxPresetId,
  getGasTxView,
} from "./model"
import GasTxRig from "./rig"

// Each step's animation is 500-700ms (plus a 700ms delay for the tank in
// step 3); the rest is reading time.
const STEP_DWELL_MS = 2000
const STEP_DWELL_REDUCED_MS = 2400

const LAST_STEP = GAS_TX_STEPS.length - 1

// Per part: the concept name shown in the figure, and its one-line
// definition. Keys in the `component-diagrams` namespace.
const LABELS: Record<GasTxPart, { label: string; definition: string }> = {
  deck: { label: "gas-tx-world-state", definition: "gas-tx-definition-deck" },
  order: {
    label: "gas-tx-transaction",
    definition: "gas-tx-definition-order",
  },
  pump: { label: "gas-tx-label-sender", definition: "gas-tx-definition-pump" },
  tank: { label: "gas-tx-gas-supply", definition: "gas-tx-definition-tank" },
  feed: { label: "gas-tx-message", definition: "gas-tx-definition-feed" },
  engine: {
    label: "gas-tx-label-contract",
    definition: "gas-tx-definition-engine",
  },
  returnLine: {
    label: "gas-tx-label-unused-gas",
    definition: "gas-tx-definition-return-line",
  },
  meter: {
    label: "gas-tx-readout-returned",
    definition: "gas-tx-definition-meter",
  },
}

interface GasTxPlayerProps {
  initialPreset?: GasTxPresetId
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The gas-tx diagram as a fuel rig: presets, playback, the isometric drawing
 * with its labels, readout and caption, all from one model view.
 */
export function GasTxPlayer({
  initialPreset = "light",
  initialStep = GAS_TX_IDLE_STEP,
  fig,
  className,
}: GasTxPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState<GasTxPresetId>(initialPreset)
  const { step, isRunning, run, goTo, reset } = useStepPlayer({
    idle: GAS_TX_IDLE_STEP,
    last: LAST_STEP,
    initial: initialStep,
    dwellMs: STEP_DWELL_MS,
    dwellReducedMs: STEP_DWELL_REDUCED_MS,
    paused: !inView.visible,
  })

  const view = useMemo(() => getGasTxView(presetId, step), [presetId, step])
  const valuesFor = (v: typeof view) => ({
    step: format(v.stepIndex + 1),
    limit: format(v.gasLimit),
    used: format(v.gasUsed),
    returned: format(v.gasReturned),
  })

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<GasTxPart, string>
    const definitions = {} as Record<GasTxPart, string>
    for (const part of GAS_TX_PARTS) {
      labels[part] = t(LABELS[part].label)
      definitions[part] = t(LABELS[part].definition)
    }
    const parts = Object.fromEntries(
      GAS_TX_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t])

  // Every caption this preset can show, so the caption area keeps the height
  // of the longest one.
  const allCaptions = [GAS_TX_IDLE_STEP, ...GAS_TX_STEPS.keys()].map((i) => {
    const v = getGasTxView(presetId, i)
    return t(v.captionKey, valuesFor(v))
  })

  return (
    <InteractiveDiagram
      className={className}
      caption={t("gas-tx-caption")}
      description={t("gas-tx-description")}
      fig={fig}
      title={t("gas-tx-title")}
      status={t(view.captionKey.replace("-step-", "-status-"), valuesFor(view))}
      parts={parts}
      legend={[
        { hue: "entity", label: t("diagram-legend-accounts") },
        { hue: "gas", label: t("diagram-legend-gas") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <GasTxRig
          view={view}
          runKey={`${presetId}-${step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          options={GAS_TX_PRESET_IDS.map((id) => ({
            id,
            label: t(`gas-tx-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="gas-tx preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("gas-tx-send"),
            icon: <Send />,
            onClick: run,
            disabled: isRunning,
          }}
          current={step + 1}
          total={GAS_TX_STEPS.length}
          onPrevious={() => goTo(step - 1)}
          onNext={() => goTo(step + 1)}
          onReset={reset}
          canGoPrevious={step > 0}
          canGoNext={step < LAST_STEP}
          canReset={step !== GAS_TX_IDLE_STEP}
          eventAction="gas-tx transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={t(view.captionKey, valuesFor(view))}
          all={allCaptions}
        />
      }
      readout={
        <DiagramReadout
          rows={[
            { label: t("gas-tx-readout-limit"), value: format(view.gasLimit) },
            {
              label: t("gas-tx-readout-used"),
              // Counts up while the tank drains in step 3, after the feed flow.
              value: (
                <DiagramCountUp
                  value={view.shownUsed}
                  delay={view.motion === "execute" ? 700 : 0}
                />
              ),
            },
            {
              label: t("gas-tx-readout-returned"),
              value: <DiagramCountUp value={view.shownReturned} />,
            },
          ]}
        />
      }
    />
  )
}
