"use client"

import { useMemo } from "react"
import { History } from "lucide-react"
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
  EXAMPLE_BLOCK,
  getPortalHistoryView,
  PORTAL_HISTORY_LAST_STEP,
  PORTAL_HISTORY_PARTS,
  PORTAL_HISTORY_STEPS,
  type PortalHistoryPart,
  RECEIPTS_ROOT,
} from "./model"
import PortalHistoryRig from "./rig"

/** Step 0 is idle; steps 1 to PORTAL_HISTORY_LAST_STEP. */
const IDLE_STEP = 0

interface PortalHistoryPlayerProps {
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The portal-network-devp2p-libp2p.png replacement: a History network lookup
 * for an old block's receipts, checked against the header the client kept.
 */
export function PortalHistoryPlayer({
  initialStep = IDLE_STEP,
  fig,
  className,
}: PortalHistoryPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: PORTAL_HISTORY_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getPortalHistoryView(step), [step])

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<PortalHistoryPart, string>
    const definitions = {} as Record<PortalHistoryPart, string>
    for (const part of PORTAL_HISTORY_PARTS) {
      labels[part] = t(`portal-history-label-${part}`)
      definitions[part] = t(`portal-history-definition-${part}`)
    }
    const parts = Object.fromEntries(
      PORTAL_HISTORY_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t])

  const block = format(EXAMPLE_BLOCK)
  const captionFor = (index: number) =>
    t(`portal-history-step-${PORTAL_HISTORY_STEPS[index]}`, {
      step: format(index),
      block,
    })
  const none = t("portal-history-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("portal-history-caption")}
      description={t("portal-history-description", {
        ...Object.fromEntries([1, 2, 3, 4].map((n) => [`step${n}`, format(n)])),
        block,
      })}
      fig={fig}
      title={t("portal-history-title")}
      status={t(`portal-history-status-${view.motion}`, { block })}
      parts={parts}
      legend={[
        { hue: "entity", label: t("portal-history-legend-entity") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <PortalHistoryRig
          view={view}
          runKey={`step-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("portal-history-run"),
            icon: <History />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={PORTAL_HISTORY_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="portal-history transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={PORTAL_HISTORY_STEPS.map((_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("portal-history-readout-label")}
          rows={[
            {
              label: t("portal-history-readout-block"),
              value: view.located ? block : none,
            },
            {
              label: t("portal-history-readout-message"),
              // Code, never translated.
              value: view.message ?? none,
              code: !!view.message,
            },
            {
              label: t("portal-history-readout-checked"),
              value: view.verified ? RECEIPTS_ROOT : none,
              code: view.verified,
            },
          ]}
        />
      }
    />
  )
}
