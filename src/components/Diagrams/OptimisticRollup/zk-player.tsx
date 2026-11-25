"use client"

import { useMemo, useState } from "react"
import { ShieldCheck } from "lucide-react"
import { useTranslations } from "next-intl"

import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
import {
  DiagramCaption,
  DiagramPresets,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
  useDiagramFormat,
  useDiagramText,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import {
  getZkRollupValues,
  getZkRollupView,
  ZK_ROLLUP_LAST_STEP,
  ZK_ROLLUP_PARTS,
  ZK_ROLLUP_PRESET_IDS,
  type ZkRollupPart,
  type ZkRollupPresetId,
  type ZkRollupView,
} from "./model"
import RollupRig from "./rig"

/** Step 0 is idle; steps 1 to ZK_ROLLUP_LAST_STEP. */
const IDLE_STEP = 0

interface ZkRollupPlayerProps {
  initialPreset?: ZkRollupPresetId
  /** Step to start on (0 = idle, 1-5), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * One ZK-rollup batch, from execution on L2 to a state root recorded on L1
 * once its validity proof verifies, or rejected with it.
 */
export function ZkRollupPlayer({
  initialPreset = "valid",
  initialStep = IDLE_STEP,
  fig,
  className,
}: ZkRollupPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const text = useDiagramText()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState<ZkRollupPresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: ZK_ROLLUP_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getZkRollupView(presetId, step), [presetId, step])

  const captionFor = (v: ZkRollupView) =>
    t(`zk-rollup-step-${v.key}`, { step: format(v.step) })
  const none = t("zk-rollup-readout-none")

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<ZkRollupPart, string>
    const definitions = {} as Record<ZkRollupPart, string>
    for (const part of ZK_ROLLUP_PARTS) {
      labels[part] = t(`zk-rollup-label-${part}`)
      definitions[part] = t(`zk-rollup-definition-${part}`)
    }
    const parts = Object.fromEntries(
      ZK_ROLLUP_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t])

  // Every caption this preset can show, so the caption area keeps the height
  // of the longest one.
  const allCaptions = Array.from({ length: ZK_ROLLUP_LAST_STEP + 1 }, (_, i) =>
    captionFor(getZkRollupView(presetId, i))
  )

  const valueOf = (row: string, value: string) =>
    value === "none" ? none : t(`zk-rollup-${row}-${value}`)

  return (
    <InteractiveDiagram
      className={className}
      caption={t("zk-rollup-caption")}
      description={t("zk-rollup-description", getZkRollupValues(text))}
      fig={fig}
      title={t("zk-rollup-title")}
      status={t(`zk-rollup-status-${view.key}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("zk-rollup-legend-entity") },
        { hue: "gas", label: t("diagram-legend-value") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <RollupRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          options={ZK_ROLLUP_PRESET_IDS.map((id) => ({
            id,
            label: t(`zk-rollup-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="zk-rollup preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("zk-rollup-run"),
            icon: <ShieldCheck />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={ZK_ROLLUP_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="zk-rollup transport"
        />
      }
      stepCaption={
        <DiagramCaption current={captionFor(view)} all={allCaptions} />
      }
      readout={
        <DiagramReadout
          label={t("zk-rollup-readout-label")}
          rows={[
            {
              label: t("zk-rollup-readout-root"),
              value: valueOf("root", view.root),
            },
            {
              label: t("zk-rollup-readout-proof"),
              value: valueOf("proof", view.proof),
            },
            {
              label: t("zk-rollup-readout-finality"),
              value: valueOf("finality", view.finality),
            },
            {
              label: t("zk-rollup-readout-withdrawal"),
              value: valueOf("withdrawal", view.withdrawal),
            },
          ]}
        />
      }
    />
  )
}
