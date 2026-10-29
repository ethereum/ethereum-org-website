"use client"

import { useMemo, useState } from "react"
import { Download } from "lucide-react"
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
  getNodeArchitectureView,
  NODE_ARCHITECTURE_PRESETS,
  NODE_ARCHITECTURE_STEPS,
  nodeArchitectureLastStep,
  type NodeArchitecturePreset,
} from "./model"
import NodeClientsRig from "./rig"
import { useNodeParts } from "./use-node-parts"

/** Step 0 is idle; steps 1 to the preset's last step. */
const IDLE_STEP = 0

interface NodeArchitecturePlayerProps {
  /** Scenario to start on, for stories. */
  initialPreset?: NodeArchitecturePreset
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The node-architecture-text-background.png replacement, on the shared node
 * drawing: a new block goes from consensus gossip over the Engine API to the
 * EVM and back to fork choice; a new transaction goes from execution gossip
 * into the transaction pool and on to other peers.
 */
export function NodeArchitecturePlayer({
  initialPreset = "block",
  initialStep = IDLE_STEP,
  fig,
  className,
}: NodeArchitecturePlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const [preset, setPreset] = useState<NodeArchitecturePreset>(initialPreset)
  const last = nodeArchitectureLastStep(preset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getNodeArchitectureView(preset, step),
    [preset, step]
  )
  const { labels, definitions, parts } = useNodeParts()

  const steps = NODE_ARCHITECTURE_STEPS[preset]
  const captionFor = (index: number) =>
    t(`node-clients-architecture-step-${steps[index]}`, {
      step: format(index),
    })
  const none = t("node-clients-readout-none")
  const poolCount = (value: number) =>
    t("node-clients-pool-count", {
      count: Math.round(value),
      value: format(Math.round(value)),
    })

  return (
    <InteractiveDiagram
      className={className}
      caption={t("node-clients-architecture-caption")}
      description={t(
        "node-clients-architecture-description",
        Object.fromEntries([1, 2, 3, 4].map((n) => [`step${n}`, format(n)]))
      )}
      fig={fig}
      title={t("node-clients-architecture-title")}
      status={t(`node-clients-architecture-status-${view.motion}`)}
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
          options={NODE_ARCHITECTURE_PRESETS.map((id) => ({
            id,
            label: t(`node-clients-preset-${id}`),
          }))}
          value={preset}
          onChange={(id) => {
            setPreset(id)
            reset()
          }}
          eventAction="node-architecture preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t(`node-clients-run-${preset}`),
            icon: <Download />,
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
          eventAction="node-architecture transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={steps.map((_, i) => captionFor(i))}
        />
      }
      readout={
        preset === "block" ? (
          <DiagramReadout
            label={t("node-clients-readout-block-label")}
            rows={[
              {
                label: t("node-clients-readout-block"),
                value: t(`node-clients-block-${view.progress}`),
              },
              {
                label: t("node-clients-readout-engine"),
                // Code, never translated.
                value: view.engineMessage ?? none,
              },
            ]}
          />
        ) : (
          <DiagramReadout
            label={t("node-clients-readout-tx-label")}
            rows={[
              {
                label: t("node-clients-readout-tx"),
                value: t(`node-clients-tx-${view.progress}`),
              },
              {
                label: t("node-clients-readout-pool"),
                value: (
                  <DiagramCountUp value={view.poolCount} format={poolCount} />
                ),
              },
            ]}
          />
        )
      }
    />
  )
}
