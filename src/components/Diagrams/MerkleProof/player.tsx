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
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import { cn } from "@/lib/utils/cn"

import {
  BIG_LEAVES,
  BIG_PROOF_SIZE,
  getMerkleProofView,
  LEAVES,
  MERKLE_PROOF_LAST_STEP,
  MERKLE_PROOF_PARTS,
  MERKLE_PROOF_PRESET_IDS,
  MERKLE_PROOF_PRESETS,
  type MerkleProofPart,
  type MerkleProofPresetId,
  PROOF_SIZE,
} from "./model"
import MerkleProofRig from "./rig"

const IDLE_STEP = 0

interface MerkleProofPlayerProps {
  initialPreset?: MerkleProofPresetId
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The tree.png and proof-c.png replacement: one value checked against the
 * stored root with its Merkle proof.
 */
export function MerkleProofPlayer({
  initialPreset = "c",
  initialStep = IDLE_STEP,
  fig,
  className,
}: MerkleProofPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState<MerkleProofPresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: MERKLE_PROOF_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const data = MERKLE_PROOF_PRESETS[presetId]
  const view = useMemo(
    () => getMerkleProofView(presetId, step),
    [presetId, step]
  )

  // Numbers go through the locale formatter; node names are notation.
  const params = useMemo(
    () => ({
      leaves: format(LEAVES),
      proofSize: format(PROOF_SIZE),
      bigLeaves: format(BIG_LEAVES),
      bigProofSize: format(BIG_PROOF_SIZE),
      leaf: data.leafName,
      proof0: data.proofNames[0],
      proof1: data.proofNames[1],
      proof2: data.proofNames[2],
      node1: data.pathNames[0],
      node2: data.pathNames[1],
    }),
    [format, data]
  )

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<MerkleProofPart, string>
    const definitions = {} as Record<MerkleProofPart, string>
    for (const part of MERKLE_PROOF_PARTS) {
      labels[part] = t(`merkle-proof-label-${part}`)
      definitions[part] = t(`merkle-proof-definition-${part}`, params)
    }
    const parts = Object.fromEntries(
      MERKLE_PROOF_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, params])

  const captionFor = (i: number) => {
    const v = getMerkleProofView(presetId, i)
    return t(`merkle-proof-step-${v.key}`, { ...params, step: format(v.step) })
  }
  const none = t("merkle-proof-readout-none")
  const code = (value: string) => <bdi dir="ltr">{value}</bdi>

  return (
    <InteractiveDiagram
      className={className}
      caption={t("merkle-proof-caption")}
      description={t("merkle-proof-description", {
        ...params,
        ...Object.fromEntries(
          [1, 2, 3, 4, 5].map((n) => [`step${n}`, format(n)])
        ),
      })}
      fig={fig}
      title={t("merkle-proof-title")}
      status={t(`merkle-proof-status-${view.key}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("merkle-proof-legend-path") },
        { hue: "gas", label: t("merkle-proof-legend-proof") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <MerkleProofRig
          view={view}
          data={data}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          label={t("merkle-proof-presets-label")}
          options={MERKLE_PROOF_PRESET_IDS.map((id) => ({
            id,
            label: t(`merkle-proof-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="merkle-proof preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("merkle-proof-run"),
            icon: <ShieldCheck />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={MERKLE_PROOF_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="merkle-proof transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={Array.from({ length: MERKLE_PROOF_LAST_STEP + 1 }, (_, i) =>
            captionFor(i)
          )}
        />
      }
      readout={
        <DiagramReadout
          label={t("merkle-proof-readout-label")}
          rows={[
            {
              label: t("merkle-proof-readout-leaves"),
              value: format(LEAVES),
            },
            {
              label: t("merkle-proof-readout-proof"),
              value: format(PROOF_SIZE),
            },
            {
              label: t("merkle-proof-readout-value"),
              value: view.step ? code(data.valueHex) : none,
              code: true,
            },
            {
              label: t("merkle-proof-readout-computed"),
              value: view.currentHex ? code(view.currentHex) : none,
              code: true,
            },
            {
              label: t("merkle-proof-readout-root"),
              value: code(data.storedRootHex),
              code: true,
            },
            {
              label: t("merkle-proof-readout-match"),
              value: !view.result ? (
                none
              ) : (
                <span
                  className={cn(
                    "font-sans",
                    view.result === "mismatch" && "text-diagram-revert"
                  )}
                >
                  {t(
                    view.result === "match"
                      ? "merkle-proof-readout-yes"
                      : "merkle-proof-readout-no"
                  )}
                </span>
              ),
            },
          ]}
        />
      }
    />
  )
}
