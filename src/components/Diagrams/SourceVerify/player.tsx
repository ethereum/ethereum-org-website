"use client"

import { useMemo, useState } from "react"
import { FileCheck } from "lucide-react"
import { useTranslations } from "next-intl"

import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
import {
  DiagramCaption,
  DiagramPresets,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
  useDiagramFormat,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import {
  GET_CODE,
  getSourceVerifyView,
  SOURCE_VERIFY_LAST_STEP,
  SOURCE_VERIFY_PARTS,
  SOURCE_VERIFY_PRESET_IDS,
  type SourceVerifyPart,
  type SourceVerifyPresetId,
} from "./model"
import SourceVerifyRig from "./rig"

/** Step 0 is idle; steps 1 to SOURCE_VERIFY_LAST_STEP. */
const IDLE_STEP = 0

interface SourceVerifyPlayerProps {
  initialPreset?: SourceVerifyPresetId
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The source-code-verification.png replacement: recompile, read the deployed
 * code, compare the code and then the metadata hashes.
 */
export function SourceVerifyPlayer({
  initialPreset = "exact",
  initialStep = IDLE_STEP,
  fig,
  className,
}: SourceVerifyPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState<SourceVerifyPresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: SOURCE_VERIFY_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getSourceVerifyView(presetId, step),
    [presetId, step]
  )

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<SourceVerifyPart, string>
    const definitions = {} as Record<SourceVerifyPart, string>
    for (const part of SOURCE_VERIFY_PARTS) {
      labels[part] = t(`source-verify-label-${part}`)
      definitions[part] = t(`source-verify-definition-${part}`)
    }
    const parts = Object.fromEntries(
      SOURCE_VERIFY_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t])

  const captionFor = (i: number) => {
    const v = getSourceVerifyView(presetId, i)
    return t(`source-verify-step-${v.key}`, { step: format(v.step) })
  }
  const none = t("source-verify-readout-none")
  const comparison = (value: "match" | "differs" | null) =>
    value === null ? none : t(`source-verify-${value}`)

  return (
    <InteractiveDiagram
      className={className}
      caption={t("source-verify-caption")}
      description={t(
        "source-verify-description",
        Object.fromEntries([1, 2, 3, 4].map((n) => [`step${n}`, format(n)]))
      )}
      fig={fig}
      title={t("source-verify-title")}
      status={t(`source-verify-status-${view.key}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("source-verify-legend-code") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <SourceVerifyRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          options={SOURCE_VERIFY_PRESET_IDS.map((id) => ({
            id,
            label: t(`source-verify-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="source-verify preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("source-verify-run"),
            icon: <FileCheck />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={SOURCE_VERIFY_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="source-verify transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={Array.from({ length: SOURCE_VERIFY_LAST_STEP + 1 }, (_, i) =>
            captionFor(i)
          )}
        />
      }
      readout={
        <DiagramReadout
          label={t("source-verify-readout-label")}
          rows={[
            {
              label: t("source-verify-readout-call"),
              // Code, never translated.
              value: view.fetched ? GET_CODE : none,
              code: view.fetched,
            },
            {
              label: t("source-verify-readout-code"),
              value: comparison(view.code),
            },
            {
              label: t("source-verify-readout-metadata"),
              value: comparison(view.metadata),
            },
            {
              label: t("source-verify-readout-result"),
              value: view.result
                ? t(`source-verify-result-${view.result}`)
                : none,
            },
          ]}
        />
      }
    />
  )
}
