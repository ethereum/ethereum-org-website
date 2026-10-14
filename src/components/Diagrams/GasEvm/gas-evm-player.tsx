"use client"

import { type ReactNode, useEffect, useState } from "react"
import { Play } from "lucide-react"
import dynamic from "next/dynamic"
import { useLocale, useTranslations } from "next-intl"

import { useCountUp } from "@/components/Diagrams/anatomy"
import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
import {
  DiagramCaption,
  DiagramPresets,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
} from "@/components/Diagrams/interactive-diagram"

import { numberFormat } from "@/lib/utils/numbers"

import { GAS_EVM_SIZE } from "./layout"
import {
  GAS_EVM_IDLE_STEP,
  GAS_EVM_PRESET_IDS,
  type GasEvmPart,
  type GasEvmPresetId,
  getGasEvmView,
} from "./model"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

// Decorative SVG, not needed for the first paint: its own chunk after
// hydration, behind a placeholder of the same size.
const RigPlaceholder = () => (
  <div
    aria-hidden
    className="w-full"
    style={{ aspectRatio: `${GAS_EVM_SIZE.width} / ${GAS_EVM_SIZE.height}` }}
  />
)
const GasEvmRig = dynamic(() => import("./gas-evm-rig"), {
  ssr: false,
  loading: RigPlaceholder,
})

const RUN_DWELL_MS = 1100
const RUN_DWELL_REDUCED_MS = 2000

const PARTS: GasEvmPart[] = [
  "deck",
  "tank",
  "evm",
  "stack",
  "memory",
  "storage",
]

interface GasEvmPlayerProps {
  initialPreset?: GasEvmPresetId
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
}

/**
 * The gas.png replacement: an intrinsic draw, then a short program stepping
 * through the EVM, each opcode drawing its cost from the gas supply.
 */
export function GasEvmPlayer({
  initialPreset = "enough",
  initialStep = GAS_EVM_IDLE_STEP,
  fig,
}: GasEvmPlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState<GasEvmPresetId>(initialPreset)
  const [stepIndex, setStepIndex] = useState(initialStep)
  const [isRunning, setIsRunning] = useState(false)

  const view = getGasEvmView(presetId, stepIndex)
  const atEnd = view.stepIndex >= view.lastStep

  useEffect(() => {
    // Off screen, a run holds where it is and carries on when it is back.
    if (!isRunning || !inView.visible || atEnd) return
    const timeout = window.setTimeout(
      () => {
        setStepIndex(view.stepIndex + 1)
        if (view.stepIndex + 1 >= view.lastStep) setIsRunning(false)
      },
      prefersReducedMotion ? RUN_DWELL_REDUCED_MS : RUN_DWELL_MS
    )
    return () => window.clearTimeout(timeout)
  }, [
    isRunning,
    inView.visible,
    atEnd,
    view.stepIndex,
    view.lastStep,
    prefersReducedMotion,
  ])

  const usedShown = useCountUp(view.gasUsed, { instant: prefersReducedMotion })
  const leftShown = useCountUp(view.gasLeft, { instant: prefersReducedMotion })
  const format = (value: number) => numberFormat(locale).format(value)
  const valuesFor = (v: ReturnType<typeof getGasEvmView>) =>
    Object.fromEntries(
      Object.entries(v.captionValues).map(([k, n]) => [k, format(n)])
    )

  const textFor = (kind: "label" | "definition") =>
    Object.fromEntries(
      PARTS.map((part) => [part, t(`gas-evm-${kind}-${part}`)])
    ) as Record<GasEvmPart, ReactNode>
  const labels = textFor("label")
  const definitions = textFor("definition")

  // Every caption this preset can show, so the caption area keeps the height
  // of the longest one.
  const allCaptions = Array.from({ length: view.lastStep + 2 }, (_, i) => {
    const v = getGasEvmView(presetId, i - 1)
    return t(v.captionKey, valuesFor(v))
  })

  const goTo = (index: number) => {
    setIsRunning(false)
    setStepIndex(index)
  }

  const run = () => {
    setStepIndex(atEnd || view.stepIndex < 0 ? 0 : view.stepIndex + 1)
    setIsRunning(true)
  }

  return (
    <InteractiveDiagram
      caption={t("gas-evm-caption")}
      description={t("gas-evm-description")}
      figLabel={fig ? t("diagram-fig", { number: format(fig) }) : undefined}
      title={t("gas-evm-title")}
      status={
        view.stepIndex < 0
          ? t("gas-evm-status-idle")
          : view.stepIndex === 0
            ? t("gas-evm-status-intrinsic", {
                intrinsic: format(view.lastCost),
              })
            : view.failed
              ? t("gas-evm-status-out-of-gas")
              : t("gas-evm-status-op", {
                  pc: format(view.pc ?? 0),
                  op: view.instruction?.op ?? "",
                  cost: format(view.lastCost),
                })
      }
      parts={Object.fromEntries(
        PARTS.map((part) => [
          part,
          { label: labels[part], definition: definitions[part] },
        ])
      )}
      legend={[
        { hue: "entity", label: t("diagram-legend-evm") },
        { hue: "gas", label: t("diagram-legend-gas") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        // The drawing loads once the diagram comes near the viewport.
        inView.seen ? (
          <GasEvmRig
            view={view}
            runKey={`${presetId}-${view.stepIndex}`}
            labels={labels}
            definitions={definitions}
            revertedLabel={t("gas-tx-reverted")}
          />
        ) : (
          <RigPlaceholder />
        )
      }
      presets={
        <DiagramPresets
          label={t("gas-tx-presets-label")}
          options={GAS_EVM_PRESET_IDS.map((id) => ({
            id,
            label: t(`gas-evm-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setIsRunning(false)
            setPresetId(id)
            setStepIndex(GAS_EVM_IDLE_STEP)
          }}
          eventAction="gas-evm preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("gas-evm-run"),
            icon: <Play />,
            onClick: run,
            disabled: isRunning,
          }}
          counter={t("gas-tx-step-counter", {
            current: format(view.stepIndex + 1),
            total: format(view.lastStep + 1),
          })}
          onPrevious={() => goTo(view.stepIndex - 1)}
          onNext={() => goTo(view.stepIndex + 1)}
          onReset={() => goTo(GAS_EVM_IDLE_STEP)}
          canGoPrevious={view.stepIndex > 0}
          canGoNext={!atEnd}
          canReset={view.stepIndex !== GAS_EVM_IDLE_STEP}
          labels={{
            previous: t("gas-tx-previous-step"),
            next: t("gas-tx-next-step"),
            reset: t("diagram-reset"),
          }}
          eventAction="gas-evm transport"
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
          label={t("gas-tx-readout-label")}
          rows={[
            { label: t("gas-evm-readout-limit"), value: format(view.gasLimit) },
            {
              label: t("gas-evm-readout-intrinsic"),
              value: format(view.intrinsicPaid),
            },
            {
              label: t("gas-evm-readout-pc"),
              value: view.pc !== null ? format(view.pc) : "–",
            },
            {
              label: t("gas-evm-readout-opcode"),
              value: view.instruction?.op ?? "–",
            },
            {
              label: t("gas-evm-readout-last-cost"),
              value: view.stepIndex >= 0 ? format(view.lastCost) : "–",
            },
            { label: t("gas-evm-readout-used"), value: format(usedShown) },
            { label: t("gas-evm-readout-left"), value: format(leftShown) },
          ]}
        />
      }
    />
  )
}
