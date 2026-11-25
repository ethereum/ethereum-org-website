"use client"

import { useMemo, useState } from "react"
import { Network } from "lucide-react"
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
  getNodeNetworksView,
  NODE_NETWORKS_PRESETS,
  NODE_NETWORKS_STEPS,
  nodeNetworksLastStep,
  type NodeNetworksPreset,
} from "./model"
import NodeClientsRig from "./rig"
import { useNodeParts } from "./use-node-parts"

/** Step 0 is idle; steps 1 to the preset's last step. */
const IDLE_STEP = 0

interface NodeNetworksPlayerProps {
  /** Scenario to start on, for stories. */
  initialPreset?: NodeNetworksPreset
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The networking-layer schematics' replacement, on the shared node drawing:
 * receiving a block and proposing one, step by step, with the network each
 * step uses.
 */
export function NodeNetworksPlayer({
  initialPreset = "receive",
  initialStep = IDLE_STEP,
  fig,
  className,
}: NodeNetworksPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const [preset, setPreset] = useState<NodeNetworksPreset>(initialPreset)
  const last = nodeNetworksLastStep(preset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getNodeNetworksView(preset, step), [preset, step])
  const { labels, definitions, parts } = useNodeParts()

  const steps = NODE_NETWORKS_STEPS[preset]
  const captionFor = (index: number) =>
    t(`node-clients-networks-step-${steps[index]}`, { step: format(index) })
  const none = t("node-clients-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("node-clients-networks-caption")}
      description={t(
        "node-clients-networks-description",
        Object.fromEntries([1, 2, 3, 4].map((n) => [`step${n}`, format(n)]))
      )}
      fig={fig}
      title={t("node-clients-networks-title")}
      status={t(`node-clients-networks-status-${view.motion}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("node-clients-legend-clients") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <NodeClientsRig
          view={view}
          runKey={`${preset}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          options={NODE_NETWORKS_PRESETS.map((id) => ({
            id,
            label: t(`node-clients-networks-preset-${id}`),
          }))}
          value={preset}
          onChange={(id) => {
            setPreset(id)
            reset()
          }}
          eventAction="node-networks preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t(`node-clients-networks-run-${preset}`),
            icon: <Network />,
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
          eventAction="node-networks transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={steps.map((_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("node-clients-readout-network-label")}
          rows={[
            {
              label: t("node-clients-readout-network"),
              value: view.network
                ? t(`node-clients-network-${view.network}`)
                : none,
            },
            {
              label: t("node-clients-readout-message"),
              // Code, never translated.
              value: view.message ?? none,
              code: true,
            },
          ]}
        />
      }
    />
  )
}
