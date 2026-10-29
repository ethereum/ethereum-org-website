"use client"

import { useMemo } from "react"
import { Send } from "lucide-react"
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
  getNodeClientsView,
  NODE_CLIENTS_LAST_STEP,
  NODE_CLIENTS_STEPS,
} from "./model"
import NodeClientsRig from "./rig"
import { useNodeParts } from "./use-node-parts"

/** Step 0 is idle; steps 1 to NODE_CLIENTS_LAST_STEP. */
const IDLE_STEP = 0

interface NodeClientsPlayerProps {
  /** Step to start on (0 = idle, 1-3), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The eth1eth2client.png replacement: which client serves which API. An app
 * calls the execution client over JSON-RPC, then the consensus client over
 * the Beacon API; the consensus client drives the execution client over the
 * Engine API while each gossips with its own peers.
 */
export function NodeClientsPlayer({
  initialStep = IDLE_STEP,
  fig,
  className,
}: NodeClientsPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: NODE_CLIENTS_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getNodeClientsView(step), [step])
  const { labels, definitions, parts } = useNodeParts()

  const captionFor = (index: number) =>
    t(`node-clients-step-${NODE_CLIENTS_STEPS[index]}`, {
      step: format(index),
    })
  const none = t("node-clients-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("node-clients-caption")}
      description={t(
        "node-clients-description",
        Object.fromEntries([1, 2, 3].map((n) => [`step${n}`, format(n)]))
      )}
      fig={fig}
      title={t("node-clients-title")}
      status={t(`node-clients-status-${view.motion}`)}
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
          runKey={`step-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("node-clients-run"),
            icon: <Send />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={NODE_CLIENTS_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="node-clients transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={NODE_CLIENTS_STEPS.map((_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("node-clients-readout-label")}
          rows={[
            {
              label: t("node-clients-readout-api"),
              value: view.api ? labels[view.api] : none,
            },
            {
              label: t("node-clients-readout-call"),
              // Code, never translated.
              value: view.call ?? none,
            },
            {
              label: t("node-clients-readout-server"),
              value: view.server ? labels[view.server] : none,
            },
          ]}
        />
      }
    />
  )
}
