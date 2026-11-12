"use client"

import { useMemo } from "react"
import { Wallet } from "lucide-react"
import { useTranslations } from "next-intl"

import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
import {
  DiagramCaption,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
  useDiagramFormat,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import {
  getNodeAccessView,
  NODE_ACCESS_LAST_STEP,
  NODE_ACCESS_STEPS,
} from "./model"
import NodeClientsRig from "./rig"
import { useNodeParts } from "./use-node-parts"

/** Step 0 is idle; steps 1 to NODE_ACCESS_LAST_STEP. */
const IDLE_STEP = 0

interface NodeAccessPlayerProps {
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The nodes.png replacement, on the shared node drawing: a wallet asks your
 * own node for a balance, sends a transaction through it, and your node
 * verifies a new block itself.
 */
export function NodeAccessPlayer({
  initialStep = IDLE_STEP,
  fig,
  className,
}: NodeAccessPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: NODE_ACCESS_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getNodeAccessView(step), [step])
  const { labels, definitions, parts } = useNodeParts()

  const captionFor = (index: number) =>
    t(`node-clients-access-step-${NODE_ACCESS_STEPS[index]}`, {
      step: format(index),
    })
  const none = t("node-clients-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("node-clients-access-caption")}
      description={t(
        "node-clients-access-description",
        Object.fromEntries([1, 2, 3, 4, 5].map((n) => [`step${n}`, format(n)]))
      )}
      fig={fig}
      title={t("node-clients-access-title")}
      status={t(`node-clients-access-status-${view.motion}`)}
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
          runKey={`access-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("node-clients-access-run"),
            icon: <Wallet />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={NODE_ACCESS_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="node-access transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={NODE_ACCESS_STEPS.map((_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("node-clients-readout-message-label")}
          rows={[
            {
              label: t("node-clients-readout-message"),
              // Code, never translated.
              value: view.message ?? none,
              code: true,
            },
            {
              label: t("node-clients-readout-to"),
              value: view.to ? labels[view.to] : none,
            },
          ]}
        />
      }
    />
  )
}
