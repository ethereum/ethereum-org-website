"use client"

import { useMemo, useState } from "react"
import { Bus } from "lucide-react"
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
  BATCH_SIZES,
  type BatchSize,
  getRollupCostView,
  L2_EXECUTION,
  ROLLUP_COST_LAST_STEP,
  ROLLUP_COST_PARTS,
  type RollupCostPart,
  SEAT_COUNT,
} from "./model"
import RollupCostRig from "./rig"

const IDLE_STEP = 0
const DASH = "–"

interface RollupCostPlayerProps {
  initialPreset?: BatchSize
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  fig?: number
  className?: string
}

export function RollupCostPlayer({
  initialPreset = 100,
  initialStep = IDLE_STEP,
  fig,
  className,
}: RollupCostPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [count, setCount] = useState<BatchSize>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: ROLLUP_COST_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getRollupCostView(count, step), [count, step])

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<RollupCostPart, string>
    const definitions = {} as Record<RollupCostPart, string>
    for (const part of ROLLUP_COST_PARTS) {
      labels[part] = t(`rollup-cost-label-${part}`)
      definitions[part] = t(`rollup-cost-definition-${part}`)
    }
    const parts = Object.fromEntries(
      ROLLUP_COST_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t])

  const captionFor = (i: number) => {
    const v = getRollupCostView(count, i)
    return t(`rollup-cost-step-${v.motion}`, {
      step: format(v.step),
      count: v.count,
      n: format(v.count),
      share: format(v.l1Share),
      l2: format(L2_EXECUTION),
      total: format(v.perUser),
    })
  }

  return (
    <InteractiveDiagram
      className={className}
      caption={t("rollup-cost-caption")}
      description={t("rollup-cost-description", {
        step1: format(1),
        step2: format(2),
        step3: format(3),
        seats: format(SEAT_COUNT),
      })}
      fig={fig}
      title={t("rollup-cost-title")}
      status={t(`rollup-cost-status-${view.motion}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("rollup-cost-legend-transactions") },
        { hue: "gas", label: t("rollup-cost-legend-cost") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <RollupCostRig
          view={view}
          runKey={`${count}-${view.step}`}
          labels={labels}
          definitions={definitions}
          seatNote={
            view.perSeat > 1 && view.seatsFilled > 0
              ? t("rollup-cost-seat-note", {
                  count: view.perSeat,
                  n: format(view.perSeat),
                })
              : undefined
          }
        />
      }
      presets={
        <DiagramPresets
          label={t("rollup-cost-presets-label")}
          options={BATCH_SIZES.map((id) => ({
            id: String(id),
            label: format(id),
          }))}
          value={String(count)}
          onChange={(id) => setCount(Number(id) as BatchSize)}
          eventAction="rollup-cost preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("rollup-cost-run"),
            icon: <Bus />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={ROLLUP_COST_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="rollup-cost transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={Array.from({ length: ROLLUP_COST_LAST_STEP + 1 }, (_, i) =>
            captionFor(i)
          )}
        />
      }
      readout={
        <DiagramReadout
          label={t("rollup-cost-readout-label")}
          rows={[
            {
              label: t("rollup-cost-readout-count"),
              value: format(view.count),
            },
            {
              label: t("rollup-cost-readout-batch"),
              value: view.posted ? (
                <DiagramCountUp value={view.batchCost} />
              ) : (
                DASH
              ),
            },
            {
              label: t("rollup-cost-readout-share"),
              value: view.split ? (
                <DiagramCountUp value={view.l1Share} />
              ) : (
                DASH
              ),
            },
            {
              label: t("rollup-cost-readout-total"),
              value: view.split ? (
                <DiagramCountUp value={view.perUser} delay={300} />
              ) : (
                DASH
              ),
            },
          ]}
        />
      }
    />
  )
}
