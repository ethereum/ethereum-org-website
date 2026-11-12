"use client"

import { useMemo } from "react"
import { Blocks } from "lucide-react"
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
  getMevBoostView,
  MEV_BOOST_LAST_STEP,
  MEV_BOOST_PARTS,
  MEV_BOOST_STEPS,
  type MevBoostPart,
  WINNING_BID,
} from "./model"
import MevBoostRig from "./rig"

/** Step 0 is idle; steps 1 to MEV_BOOST_LAST_STEP. */
const IDLE_STEP = 0

interface MevBoostPlayerProps {
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The mev.png replacement: registration, builders' bids, the best header,
 * the proposer's blind signature and the relay publishing the block.
 */
export function MevBoostPlayer({
  initialStep = IDLE_STEP,
  fig,
  className,
}: MevBoostPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: MEV_BOOST_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getMevBoostView(step), [step])

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<MevBoostPart, string>
    const definitions = {} as Record<MevBoostPart, string>
    for (const part of MEV_BOOST_PARTS) {
      labels[part] = t(`mev-boost-label-${part}`)
      definitions[part] = t(`mev-boost-definition-${part}`)
    }
    const parts = Object.fromEntries(
      MEV_BOOST_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t])

  const bid = format(WINNING_BID)
  const captionFor = (index: number) =>
    t(`mev-boost-step-${MEV_BOOST_STEPS[index]}`, { step: format(index) })
  const none = t("mev-boost-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("mev-boost-caption")}
      description={t("mev-boost-description", {
        ...Object.fromEntries(
          [1, 2, 3, 4, 5].map((n) => [`step${n}`, format(n)])
        ),
        bid,
      })}
      fig={fig}
      title={t("mev-boost-title")}
      status={t(`mev-boost-status-${view.motion}`, { bid })}
      parts={parts}
      legend={[
        { hue: "entity", label: t("mev-boost-legend-parties") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <MevBoostRig
          view={view}
          runKey={`step-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("mev-boost-run"),
            icon: <Blocks />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={MEV_BOOST_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="mev-boost transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={MEV_BOOST_STEPS.map((_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("mev-boost-readout-label")}
          rows={[
            {
              label: t("mev-boost-readout-message"),
              // Code, never translated.
              value: view.message ?? none,
              code: true,
            },
            {
              label: t("mev-boost-readout-bid"),
              value:
                view.bid === null
                  ? none
                  : t("mev-boost-eth", { value: format(view.bid) }),
            },
          ]}
        />
      }
    />
  )
}
