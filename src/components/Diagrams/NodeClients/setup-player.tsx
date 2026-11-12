"use client"

import { useMemo } from "react"
import { Plug } from "lucide-react"
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
  CLIENT_SETUP_LAST_STEP,
  CLIENT_SETUP_STEPS,
  DEFAULT_PORT,
  getClientSetupView,
} from "./model"
import NodeClientsRig from "./rig"
import { useNodeParts } from "./use-node-parts"

/** Step 0 is idle; steps 1 to CLIENT_SETUP_LAST_STEP. */
const IDLE_STEP = 0

interface ClientSetupPlayerProps {
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The run-a-node diagram.png replacement, on the shared node drawing: the
 * connections a node operator configures, one per step, with their default
 * ports.
 */
export function ClientSetupPlayer({
  initialStep = IDLE_STEP,
  fig,
  className,
}: ClientSetupPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: CLIENT_SETUP_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getClientSetupView(step), [step])
  const { labels, definitions, parts } = useNodeParts()

  // Ports are code: never grouped or written in local digits.
  const values = { ...DEFAULT_PORT }
  const captionFor = (index: number) =>
    t(`node-clients-setup-step-${CLIENT_SETUP_STEPS[index]}`, {
      step: format(index),
      ...values,
    })
  const none = t("node-clients-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("node-clients-setup-caption")}
      description={t("node-clients-setup-description", {
        ...Object.fromEntries([1, 2, 3, 4].map((n) => [`step${n}`, format(n)])),
        ...values,
      })}
      fig={fig}
      title={t("node-clients-setup-title")}
      status={t(`node-clients-setup-status-${view.motion}`, values)}
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
          runKey={`setup-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("node-clients-setup-run"),
            icon: <Plug />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={CLIENT_SETUP_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="client-setup transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={CLIENT_SETUP_STEPS.map((_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("node-clients-readout-connection-label")}
          rows={[
            {
              label: t("node-clients-readout-connection"),
              value: view.connection ? labels[view.connection] : none,
            },
            {
              label: t("node-clients-readout-port"),
              value:
                view.port ??
                (view.connection ? t("node-clients-port-varies") : none),
              code: !!view.port,
            },
            {
              label: t("node-clients-readout-access"),
              value: view.access ? t(`node-clients-open-${view.access}`) : none,
            },
          ]}
        />
      }
    />
  )
}
