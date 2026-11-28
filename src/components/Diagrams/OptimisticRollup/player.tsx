"use client"

import { useCallback, useMemo, useState } from "react"
import { PackageCheck } from "lucide-react"
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
  useDiagramText,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import {
  BISECTION_ROUNDS,
  CHALLENGE_DAY,
  getOptimisticRollupValues,
  getOptimisticRollupView,
  OPTIMISTIC_ROLLUP_LAST_STEP,
  OPTIMISTIC_ROLLUP_PARTS,
  OPTIMISTIC_ROLLUP_PRESET_IDS,
  type OptimisticRollupPart,
  type OptimisticRollupPresetId,
  type OptimisticRollupView,
  TRACE_STEPS,
  WINDOW_DAYS,
} from "./model"
import OptimisticRollupRig from "./rig"

/** Step 0 is idle; steps 1 to OPTIMISTIC_ROLLUP_LAST_STEP. */
const IDLE_STEP = 0

interface OptimisticRollupPlayerProps {
  initialPreset?: OptimisticRollupPresetId
  /** Step to start on (0 = idle, 1-5), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * One optimistic rollup batch, from execution on L2 to a final state root
 * on L1, or to a fraud proof that deletes it.
 */
export function OptimisticRollupPlayer({
  initialPreset = "honest",
  initialStep = IDLE_STEP,
  fig,
  className,
}: OptimisticRollupPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const text = useDiagramText()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] =
    useState<OptimisticRollupPresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: OPTIMISTIC_ROLLUP_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getOptimisticRollupView(presetId, step),
    [presetId, step]
  )

  const shared = {
    days: format(WINDOW_DAYS),
    challengeDay: format(CHALLENGE_DAY),
    steps: format(TRACE_STEPS),
    rounds: format(BISECTION_ROUNDS),
  }
  const captionFor = (v: OptimisticRollupView) =>
    t(`optimistic-rollup-step-${v.key}`, { ...shared, step: format(v.step) })
  const none = t("optimistic-rollup-readout-none")

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<OptimisticRollupPart, string>
    const definitions = {} as Record<OptimisticRollupPart, string>
    const params = {
      days: format(WINDOW_DAYS),
      steps: format(TRACE_STEPS),
    }
    for (const part of OPTIMISTIC_ROLLUP_PARTS) {
      labels[part] = t(`optimistic-rollup-label-${part}`)
      definitions[part] = t(`optimistic-rollup-definition-${part}`, params)
    }
    const parts = Object.fromEntries(
      OPTIMISTIC_ROLLUP_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, format])

  const dayLabel = useCallback(
    (day: number) => t("optimistic-rollup-axis-day", { day: format(day) }),
    [t, format]
  )

  // Every caption this preset can show, so the caption area keeps the height
  // of the longest one.
  const allCaptions = Array.from(
    { length: OPTIMISTIC_ROLLUP_LAST_STEP + 1 },
    (_, i) => captionFor(getOptimisticRollupView(presetId, i))
  )

  const windowValue =
    view.day === null
      ? none
      : t("optimistic-rollup-window-day", {
          day: format(view.day),
          days: format(WINDOW_DAYS),
        })

  return (
    <InteractiveDiagram
      className={className}
      caption={t("optimistic-rollup-caption")}
      description={t(
        "optimistic-rollup-description",
        getOptimisticRollupValues(text)
      )}
      fig={fig}
      title={t("optimistic-rollup-title")}
      status={t(`optimistic-rollup-status-${view.key}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("optimistic-rollup-legend-entity") },
        { hue: "gas", label: t("diagram-legend-value") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <OptimisticRollupRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
          dayLabel={dayLabel}
        />
      }
      presets={
        <DiagramPresets
          options={OPTIMISTIC_ROLLUP_PRESET_IDS.map((id) => ({
            id,
            label: t(`optimistic-rollup-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="optimistic-rollup preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("optimistic-rollup-run"),
            icon: <PackageCheck />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={OPTIMISTIC_ROLLUP_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="optimistic-rollup transport"
        />
      }
      stepCaption={
        <DiagramCaption current={captionFor(view)} all={allCaptions} />
      }
      readout={
        <DiagramReadout
          label={t("optimistic-rollup-readout-label")}
          rows={[
            {
              label: t("optimistic-rollup-readout-root"),
              value:
                view.root === "none"
                  ? none
                  : t(`optimistic-rollup-root-${view.root}`),
            },
            {
              label: t("optimistic-rollup-readout-window"),
              value: windowValue,
            },
            {
              label: t("optimistic-rollup-readout-steps"),
              value:
                view.disputedSteps === null ? (
                  none
                ) : (
                  <DiagramCountUp value={view.disputedSteps} />
                ),
            },
            {
              label: t("optimistic-rollup-readout-rounds"),
              value:
                view.rounds === null ? (
                  none
                ) : (
                  <DiagramCountUp value={view.rounds} />
                ),
            },
            {
              label: t("optimistic-rollup-readout-bond"),
              value:
                view.bond === "none"
                  ? none
                  : t(`optimistic-rollup-bond-${view.bond}`),
            },
          ]}
        />
      }
    />
  )
}
