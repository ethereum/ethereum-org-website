"use client"

import { useMemo, useState } from "react"
import { Play } from "lucide-react"
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
  GAS_EVM_IDLE_STEP,
  GAS_EVM_PRESET_IDS,
  type GasEvmPart,
  type GasEvmPresetId,
  getGasEvmView,
  INTRINSIC_GAS,
  PROGRAM,
} from "./model"
import GasEvmRig from "./rig"

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

// Numbers quoted in the description and definitions, from the program.
const PUSH = PROGRAM.find((ins) => ins.op === "PUSH1")!
const SSTORE = PROGRAM.find((ins) => ins.op === "SSTORE")!
const SLOT = PROGRAM.filter((ins) => ins.op === "PUSH1")[1]!

interface GasEvmPlayerProps {
  initialPreset?: GasEvmPresetId
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The gas.png replacement: an intrinsic draw, then a short program stepping
 * through the EVM, each opcode drawing its cost from the gas supply.
 */
export function GasEvmPlayer({
  initialPreset = "enough",
  initialStep = GAS_EVM_IDLE_STEP,
  fig,
  className,
}: GasEvmPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState<GasEvmPresetId>(initialPreset)
  // The run's length depends on the preset (out of gas ends early).
  const lastStep = getGasEvmView(presetId, GAS_EVM_IDLE_STEP).lastStep
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: GAS_EVM_IDLE_STEP,
    last: lastStep,
    initial: initialStep,
    dwellMs: RUN_DWELL_MS,
    dwellReducedMs: RUN_DWELL_REDUCED_MS,
    paused: !inView.visible,
  })

  const view = useMemo(() => getGasEvmView(presetId, step), [presetId, step])
  const valuesFor = (v: typeof view) => ({
    step: format(v.stepIndex + 1),
    ...Object.fromEntries(
      Object.entries(v.captionValues).map(([k, n]) => [k, format(n)])
    ),
  })

  const { labels, definitions, parts } = useMemo(() => {
    const values = {
      stack: { cost: format(PUSH.cost) },
      storage: { cost: format(SSTORE.cost) },
    } as Partial<Record<GasEvmPart, Record<string, string>>>
    const labels = {} as Record<GasEvmPart, string>
    const definitions = {} as Record<GasEvmPart, string>
    for (const part of PARTS) {
      labels[part] = t(`gas-evm-label-${part}`)
      definitions[part] = t(`gas-evm-definition-${part}`, values[part])
    }
    const parts = Object.fromEntries(
      PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, format])

  // Every caption this preset can show, so the caption area keeps the height
  // of the longest one.
  const allCaptions = Array.from({ length: lastStep + 2 }, (_, i) => {
    const v = getGasEvmView(presetId, i - 1)
    return t(v.captionKey, valuesFor(v))
  })

  return (
    <InteractiveDiagram
      className={className}
      caption={t("gas-evm-caption")}
      description={t("gas-evm-description", {
        intrinsic: format(INTRINSIC_GAS),
        value: format(PUSH.arg ?? 0),
        slot: format(SLOT.arg ?? 0),
        sstore: format(SSTORE.cost),
      })}
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
      parts={parts}
      legend={[
        { hue: "entity", label: t("diagram-legend-evm") },
        { hue: "gas", label: t("diagram-legend-gas") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <GasEvmRig
          view={view}
          runKey={`${presetId}-${view.stepIndex}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          options={GAS_EVM_PRESET_IDS.map((id) => ({
            id,
            label: t(`gas-evm-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
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
          current={view.stepIndex + 1}
          total={view.lastStep + 1}
          onPrevious={() => goTo(step - 1)}
          onNext={() => goTo(step + 1)}
          onReset={reset}
          canGoPrevious={view.stepIndex > 0}
          canGoNext={!atEnd}
          canReset={view.stepIndex !== GAS_EVM_IDLE_STEP}
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
            {
              label: t("gas-evm-readout-used"),
              value: <DiagramCountUp value={view.gasUsed} />,
            },
            {
              label: t("gas-evm-readout-left"),
              value: <DiagramCountUp value={view.gasLeft} />,
            },
          ]}
        />
      }
    />
  )
}
