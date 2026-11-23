"use client"

import { useMemo, useState } from "react"
import { CircleHelp } from "lucide-react"
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
  ERA_IDS,
  type EraId,
  getWebErasView,
  QUESTIONS,
  WEB_ERAS_LAST_STEP,
  WEB_ERAS_PARTS,
  type WebErasPart,
} from "./model"
import WebErasRig from "./rig"

const IDLE_STEP = 0

interface WebErasPlayerProps {
  initialPreset?: EraId
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  fig?: number
  className?: string
}

/**
 * web1, web2 and web3 side by side: choose an era, then step through who
 * stores your data, who can lock you out and where the money goes.
 */
export function WebErasPlayer({
  initialPreset = "web1",
  initialStep = IDLE_STEP,
  fig,
  className,
}: WebErasPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [era, setEra] = useState<EraId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: WEB_ERAS_LAST_STEP,
    initial: initialStep,
    dwellMs: 3200,
    dwellReducedMs: 3600,
    paused: !inView.visible,
  })
  const view = useMemo(() => getWebErasView(era, step), [era, step])

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<WebErasPart, string>
    const definitions = {} as Record<WebErasPart, string>
    for (const part of WEB_ERAS_PARTS) {
      labels[part] = t(`web-eras-label-${part}`)
      definitions[part] = t(`web-eras-definition-${part}`)
    }
    const parts = Object.fromEntries(
      WEB_ERAS_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t])

  const captionFor = (i: number) => {
    const v = getWebErasView(era, i)
    return t(`web-eras-step-${v.key}`, { step: format(v.step) })
  }

  return (
    <InteractiveDiagram
      className={className}
      caption={t("web-eras-caption")}
      description={t("web-eras-description")}
      fig={fig}
      title={t("web-eras-title")}
      status={t(`web-eras-status-${era}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("web-eras-legend-data") },
        { hue: "gas", label: t("web-eras-legend-money") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <WebErasRig
          view={view}
          runKey={`${era}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          label={t("web-eras-presets-label")}
          options={ERA_IDS.map((id) => ({
            id,
            label: t(`web-eras-preset-${id}`),
          }))}
          value={era}
          onChange={(id) => {
            setEra(id)
            reset()
          }}
          eventAction="web-eras preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("web-eras-run"),
            icon: <CircleHelp />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={WEB_ERAS_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="web-eras transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={Array.from({ length: WEB_ERAS_LAST_STEP + 1 }, (_, i) =>
            captionFor(i)
          )}
        />
      }
      readout={
        <DiagramReadout
          label={t("web-eras-readout-label")}
          rows={[
            {
              label: t("web-eras-readout-can"),
              value: (
                <span className="font-sans">
                  {t(`web-eras-answer-can-${era}`)}
                </span>
              ),
            },
            ...QUESTIONS.map((question, i) => ({
              label: t(`web-eras-readout-${question}`),
              value: (
                <span className="font-sans">
                  {view.answered > i
                    ? t(`web-eras-answer-${question}-${era}`)
                    : "–"}
                </span>
              ),
            })),
          ]}
        />
      }
    />
  )
}
