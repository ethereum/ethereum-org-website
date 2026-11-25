"use client"

import { useMemo, useState } from "react"
import { Play } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

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

import { normalizeIntlSpaces } from "@/lib/utils/intl"
import { numberFormat } from "@/lib/utils/numbers"

import {
  EARLIER_EPOCH,
  EPOCH_NAMES,
  GASPER_FINALITY_LAST_STEP,
  GASPER_FINALITY_PARTS,
  GASPER_FINALITY_PRESET_IDS,
  type GasperFinalityPart,
  type GasperFinalityPresetId,
  type GasperFinalityView,
  getGasperFinalityValues,
  getGasperFinalityView,
  LEAK_EPOCHS,
  SECONDS_PER_SLOT,
  SLOTS_PER_EPOCH,
} from "./model"
import GasperFinalityRig from "./rig"

/** Step 0 is idle; steps 1 to GASPER_FINALITY_LAST_STEP. */
const IDLE_STEP = 0

interface GasperFinalityPlayerProps {
  initialPreset?: GasperFinalityPresetId
  /** Step to start on (0 = idle, 1-4), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/** Whole percent, localized (arabext digits for Urdu), spaces normalized so
 * server and client render the same. */
function usePercentFormat() {
  const locale = useLocale()
  return useMemo(() => {
    const formatter = numberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    })
    return (value: number) => normalizeIntlSpaces(formatter.format(value / 100))
  }, [locale])
}

/**
 * Casper FFG, epoch by epoch: the attesting stake per epoch against the
 * two-thirds line, and the checkpoints it justifies and finalizes.
 */
export function GasperFinalityPlayer({
  initialPreset = "healthy",
  initialStep = IDLE_STEP,
  fig,
  className,
}: GasperFinalityPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const text = useDiagramText()
  const percent = usePercentFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] =
    useState<GasperFinalityPresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: GASPER_FINALITY_LAST_STEP,
    initial: initialStep,
    // Long enough for the epoch to fill and its end boundary to resolve.
    dwellMs: 3200,
    dwellReducedMs: 3200,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getGasperFinalityView(presetId, step),
    [presetId, step]
  )

  const shared = {
    first: EPOCH_NAMES[0],
    earlier: EARLIER_EPOCH,
    slots: format(SLOTS_PER_EPOCH),
    seconds: format(SECONDS_PER_SLOT),
    leak: format(LEAK_EPOCHS),
  }
  const valuesFor = (v: GasperFinalityView) => ({
    ...shared,
    step: format(v.step),
    epoch: EPOCH_NAMES[v.epoch],
    source: v.linkFormed ? EPOCH_NAMES[v.epoch - 1] : v.lastJustified,
    share: v.share === null ? "" : percent(v.share),
    justified: v.lastJustified,
    finalized: v.lastFinalized,
  })
  const captionFor = (v: GasperFinalityView) =>
    t(`gasper-finality-step-${v.key}`, valuesFor(v))
  const statusKey = view.key.split("-")[0]

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<GasperFinalityPart, string>
    const definitions = {} as Record<GasperFinalityPart, string>
    const values = {
      slots: format(SLOTS_PER_EPOCH),
      seconds: format(SECONDS_PER_SLOT),
    }
    for (const part of GASPER_FINALITY_PARTS) {
      labels[part] = t(`gasper-finality-label-${part}`)
      definitions[part] = t(`gasper-finality-definition-${part}`, values)
    }
    const parts = Object.fromEntries(
      GASPER_FINALITY_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, format])

  // Every caption this preset can show, so the caption area keeps the height
  // of the longest one.
  const allCaptions = Array.from(
    { length: GASPER_FINALITY_LAST_STEP + 1 },
    (_, i) => captionFor(getGasperFinalityView(presetId, i))
  )
  const none = t("gasper-finality-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("gasper-finality-caption")}
      description={t(
        "gasper-finality-description",
        getGasperFinalityValues(text)
      )}
      fig={fig}
      title={t("gasper-finality-title")}
      status={t(`gasper-finality-status-${statusKey}`, valuesFor(view))}
      parts={parts}
      legend={[
        { hue: "entity", label: t("gasper-finality-legend-entity") },
        { hue: "neutral", label: t("gasper-finality-legend-neutral") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <GasperFinalityRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          options={GASPER_FINALITY_PRESET_IDS.map((id) => ({
            id,
            label: t(`gasper-finality-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="gasper-finality preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("gasper-finality-run"),
            icon: <Play />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={GASPER_FINALITY_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="gasper-finality transport"
        />
      }
      stepCaption={
        <DiagramCaption current={captionFor(view)} all={allCaptions} />
      }
      readout={
        <DiagramReadout
          label={t("gasper-finality-readout-label")}
          rows={[
            {
              label: t("gasper-finality-readout-epoch"),
              value: EPOCH_NAMES[view.epoch],
            },
            {
              label: t("gasper-finality-readout-share"),
              value:
                view.share === null ? (
                  none
                ) : (
                  <DiagramCountUp
                    value={view.share}
                    delay={200}
                    format={percent}
                  />
                ),
            },
            {
              label: t("gasper-finality-readout-justified"),
              value: view.lastJustified,
            },
            {
              label: t("gasper-finality-readout-finalized"),
              value: view.lastFinalized,
            },
          ]}
        />
      }
    />
  )
}
