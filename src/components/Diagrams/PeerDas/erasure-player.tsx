"use client"

import { useCallback, useId, useMemo, useState } from "react"
import { Minus, Plus, Spline } from "lucide-react"
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
import { Button } from "@/components/ui/buttons/Button"

import ErasureRig from "./erasure-rig"
import {
  DEFAULT_VALUES,
  ERASURE_LAST_STEP,
  ERASURE_PARTS,
  type ErasurePart,
  getErasureCaptionValues,
  getErasureValues,
  getErasureView,
  LOSS_PRESET_IDS,
  type LossPresetId,
  NEEDED_POINTS,
  SLOT_COUNT,
  VALUE_MAX,
  VALUE_MIN,
} from "./model"

const IDLE_STEP = 0
const STEP_BUTTON = "size-7 min-h-7 shrink-0 p-0"

interface ErasureCodingPlayerProps {
  initialPreset?: LossPresetId
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  initialValues?: number[]
  fig?: number
  className?: string
}

/**
 * The polynomial.png replacement: four data values, the cubic through
 * them, its extension to eight points, then any four lost and rebuilt.
 */
export function ErasureCodingPlayer({
  initialPreset = "data",
  initialStep = IDLE_STEP,
  initialValues = DEFAULT_VALUES,
  fig,
  className,
}: ErasureCodingPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const text = useDiagramText()
  const inView = useDiagramInView<HTMLDivElement>()
  const valuesLabelId = useId()

  const [presetId, setPresetId] = useState<LossPresetId>(initialPreset)
  const [values, setValues] = useState(initialValues)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: ERASURE_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getErasureView(values, presetId, step),
    [values, presetId, step]
  )

  // Editing the data after the loss goes back to the extended data, so the
  // change shows on all eight points.
  const setValue = useCallback(
    (index: number, value: number) => {
      setValues((current) =>
        current.map((v, i) =>
          i === index ? Math.min(VALUE_MAX, Math.max(VALUE_MIN, value)) : v
        )
      )
      if (step > 1) goTo(1)
    },
    [step, goTo]
  )

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<ErasurePart, string>
    const definitions = {} as Record<ErasurePart, string>
    for (const part of ERASURE_PARTS) {
      labels[part] = t(`peer-das-label-${part}`)
      definitions[part] = t(`peer-das-definition-${part}`, {
        needed: format(NEEDED_POINTS),
      })
    }
    const parts = Object.fromEntries(
      ERASURE_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, format])

  const numbers = {
    original: format(NEEDED_POINTS),
    extra: format(SLOT_COUNT - NEEDED_POINTS),
    total: format(SLOT_COUNT),
    needed: format(NEEDED_POINTS),
    lost: format(view.lost),
  }
  const captionFor = (i: number) => {
    const v = getErasureView(values, presetId, i)
    return t(`peer-das-erasure-step-${v.key}`, {
      step: format(v.step),
      ...numbers,
    })
  }

  return (
    <InteractiveDiagram
      className={className}
      caption={t("peer-das-erasure-caption", getErasureCaptionValues(text))}
      description={t(
        "peer-das-erasure-description",
        getErasureValues(text, presetId)
      )}
      fig={fig}
      title={t("peer-das-erasure-title")}
      status={t(`peer-das-erasure-status-${view.motion}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("peer-das-legend-original") },
        { hue: "gas", label: t("peer-das-legend-extension") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <ErasureRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          values={values}
          labels={labels}
          definitions={definitions}
          onValueChange={setValue}
        />
      }
      presets={
        <>
          <div
            role="group"
            aria-labelledby={valuesLabelId}
            className="flex flex-col gap-2"
          >
            <span id={valuesLabelId} className="text-sm text-body-medium">
              {t("peer-das-values-label")}
            </span>
            <div className="grid grid-cols-4 gap-2">
              {values.map((value, i) => {
                const n = format(i + 1)
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center rounded-base border border-border py-0.5"
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-label={t("peer-das-value-increase", { n })}
                      disabled={value >= VALUE_MAX}
                      onClick={() => setValue(i, value + 1)}
                      className={STEP_BUTTON}
                    >
                      <Plus />
                    </Button>
                    <output
                      aria-live="polite"
                      aria-label={t("peer-das-value-label", { n })}
                      className="font-mono text-sm text-body tabular-nums"
                    >
                      {format(value)}
                    </output>
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-label={t("peer-das-value-decrease", { n })}
                      disabled={value <= VALUE_MIN}
                      onClick={() => setValue(i, value - 1)}
                      className={STEP_BUTTON}
                    >
                      <Minus />
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
          <DiagramPresets
            label={t("peer-das-erasure-presets-label")}
            options={LOSS_PRESET_IDS.map((id) => ({
              id,
              label: t(`peer-das-erasure-preset-${id}`),
            }))}
            value={presetId}
            onChange={(id) => {
              setPresetId(id)
              if (step > 1) goTo(1)
            }}
            eventAction="peer-das erasure preset"
          />
        </>
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("peer-das-erasure-run"),
            icon: <Spline />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={ERASURE_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="peer-das erasure transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={Array.from({ length: ERASURE_LAST_STEP + 1 }, (_, i) =>
            captionFor(i)
          )}
        />
      }
      readout={
        <DiagramReadout
          label={t("peer-das-erasure-readout-label")}
          rows={[
            {
              label: t("peer-das-erasure-readout-known"),
              value: <DiagramCountUp value={view.known} />,
            },
            {
              label: t("peer-das-erasure-readout-needed"),
              value: format(NEEDED_POINTS),
            },
            {
              label: t("peer-das-erasure-readout-recovered"),
              value: <DiagramCountUp value={view.recovered} delay={300} />,
            },
          ]}
        />
      }
    />
  )
}
