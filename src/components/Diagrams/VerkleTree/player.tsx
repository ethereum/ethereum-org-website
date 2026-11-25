"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
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
  getVerkleTreeValues,
  getVerkleTreeView,
  MERKLE_WIDTH,
  VERKLE_TREE_PARTS,
  VERKLE_TREE_PRESET_IDS,
  VERKLE_WIDTH,
  verkleTreeLastStep,
  type VerkleTreePart,
  type VerkleTreePresetId,
} from "./model"
import VerkleTreeRig from "./rig"

/** Step 0 is idle; steps 1 to the preset's last step. */
const IDLE_STEP = 0

interface VerkleTreePlayerProps {
  initialPreset?: VerkleTreePresetId
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The verkle.png replacement: one key's lookup through the stem tree,
 * extension node, suffix tree and value halves, and the same lookup in a
 * hexary Merkle trie, to compare the proofs.
 */
export function VerkleTreePlayer({
  initialPreset = "verkle",
  initialStep = IDLE_STEP,
  fig,
  className,
}: VerkleTreePlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const text = useDiagramText()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState<VerkleTreePresetId>(initialPreset)
  const last = verkleTreeLastStep(presetId)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getVerkleTreeView(presetId, step),
    [presetId, step]
  )

  // Every number the strings show, formatted for the locale.
  const params = useMemo(() => getVerkleTreeValues(text), [text])

  const { labels, definitions, parts } = useMemo(() => {
    const labels: Partial<Record<VerkleTreePart, string>> = {}
    const definitions: Partial<Record<VerkleTreePart, string>> = {}
    for (const part of VERKLE_TREE_PARTS[presetId]) {
      labels[part] = t(`verkle-tree-label-${presetId}-${part}`)
      definitions[part] = t(
        `verkle-tree-definition-${presetId}-${part}`,
        params
      )
    }
    const parts = Object.fromEntries(
      VERKLE_TREE_PARTS[presetId].map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, presetId, params])

  const captionFor = (i: number) => {
    const v = getVerkleTreeView(presetId, i)
    return t(`verkle-tree-step-${v.key}`, { ...params, step: format(v.step) })
  }
  const none = t("verkle-tree-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("verkle-tree-caption")}
      description={t("verkle-tree-description", params)}
      fig={fig}
      title={t("verkle-tree-title")}
      status={t(`verkle-tree-status-${view.key}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("verkle-tree-legend-path") },
        { hue: "gas", label: t("verkle-tree-legend-proof") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <VerkleTreeRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
          rootText={t("verkle-tree-node-root")}
          valueText={t("verkle-tree-node-value")}
          proofText={t("verkle-tree-node-proof")}
          rangeText={[
            t("verkle-tree-range", { from: params.c1From, to: params.c1To }),
            t("verkle-tree-range", { from: params.c2From, to: params.c2To }),
          ]}
        />
      }
      presets={
        <DiagramPresets
          label={t("verkle-tree-presets-label")}
          options={VERKLE_TREE_PRESET_IDS.map((id) => ({
            id,
            label: t(`verkle-tree-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="verkle-tree preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("verkle-tree-run"),
            icon: <Search />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={last}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="verkle-tree transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={Array.from({ length: last + 1 }, (_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("verkle-tree-readout-label")}
          rows={[
            {
              label: t("verkle-tree-readout-width"),
              value: format(
                view.tree === "verkle" ? VERKLE_WIDTH : MERKLE_WIDTH
              ),
            },
            {
              label: t("verkle-tree-readout-levels"),
              value: view.levels ? (
                <DiagramCountUp value={view.levels} />
              ) : (
                none
              ),
            },
            {
              label: t("verkle-tree-readout-proof"),
              value:
                view.proofItems === null ? (
                  none
                ) : (
                  <DiagramCountUp value={view.proofItems} />
                ),
            },
            {
              label: t("verkle-tree-readout-witness"),
              value: !view.proof
                ? none
                : view.tree === "verkle"
                  ? t("verkle-tree-bytes", { size: params.verkleBytes })
                  : t("verkle-tree-kilobytes", { size: params.merkleKb }),
            },
          ]}
        />
      }
    />
  )
}
