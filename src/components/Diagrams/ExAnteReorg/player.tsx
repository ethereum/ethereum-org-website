"use client"

import { useMemo, useState } from "react"
import { Swords } from "lucide-react"
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
  ATTACKER_VOTES,
  COMMITTEE_VOTES,
  EX_ANTE_REORG_LAST_STEP,
  EX_ANTE_REORG_PARTS,
  EX_ANTE_REORG_PRESET_IDS,
  type ExAnteReorgPart,
  type ExAnteReorgPresetId,
  type ExAnteReorgView,
  getExAnteReorgView,
  HONEST_VOTES,
  PROPOSER_BOOST_VOTES,
  SLOT_NAMES,
} from "./model"
import ExAnteReorgRig from "./rig"

/** Step 0 is idle; steps 1 to EX_ANTE_REORG_LAST_STEP. */
const IDLE_STEP = 0

interface ExAnteReorgPlayerProps {
  initialPreset?: ExAnteReorgPresetId
  /** Step to start on (0 = idle, 1-5), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The reorg-schematic.png replacement: a one-block ex-ante reorg, slot by
 * slot. Without proposer boost the attacker's withheld block B wins and
 * honest block C is orphaned; with it, C keeps the head.
 */
export function ExAnteReorgPlayer({
  initialPreset = "no-boost",
  initialStep = IDLE_STEP,
  fig,
  className,
}: ExAnteReorgPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState<ExAnteReorgPresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: EX_ANTE_REORG_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getExAnteReorgView(presetId, step),
    [presetId, step]
  )

  const shared = {
    ...SLOT_NAMES,
    committee: format(COMMITTEE_VOTES),
    attacker: format(ATTACKER_VOTES),
    honest: format(HONEST_VOTES),
    boost: format(PROPOSER_BOOST_VOTES),
  }
  const valuesFor = (v: ExAnteReorgView) => ({
    ...shared,
    step: format(v.step),
    votesB: format(v.votesB),
    votesC: format(v.votesC),
  })
  const captionFor = (v: ExAnteReorgView) =>
    t(`ex-ante-reorg-step-${v.key}`, valuesFor(v))
  const none = t("ex-ante-reorg-readout-none")

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<ExAnteReorgPart, string>
    const definitions = {} as Record<ExAnteReorgPart, string>
    // The tanks reuse the readout's names and share one definition.
    const labelKey = (part: ExAnteReorgPart) =>
      part === "votes-b" || part === "votes-c"
        ? `ex-ante-reorg-readout-${part}`
        : `ex-ante-reorg-label-${part}`
    const definitionKey = (part: ExAnteReorgPart) =>
      part === "votes-b" || part === "votes-c"
        ? "ex-ante-reorg-definition-weight"
        : `ex-ante-reorg-definition-${part}`
    for (const part of EX_ANTE_REORG_PARTS) {
      labels[part] = t(labelKey(part))
      definitions[part] = t(definitionKey(part), {
        ...SLOT_NAMES,
        committee: format(COMMITTEE_VOTES),
        attacker: format(ATTACKER_VOTES),
        boost: format(PROPOSER_BOOST_VOTES),
      })
    }
    const parts = Object.fromEntries(
      EX_ANTE_REORG_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, format])

  // Every caption this preset can show, so the caption area keeps the height
  // of the longest one.
  const allCaptions = Array.from(
    { length: EX_ANTE_REORG_LAST_STEP + 1 },
    (_, i) => captionFor(getExAnteReorgView(presetId, i))
  )

  return (
    <InteractiveDiagram
      className={className}
      caption={t("ex-ante-reorg-caption")}
      description={t("ex-ante-reorg-description", {
        ...shared,
        ...Object.fromEntries(
          [1, 2, 3, 4, 5].map((n) => [`step${n}`, format(n)])
        ),
      })}
      fig={fig}
      title={t("ex-ante-reorg-title")}
      status={t(`ex-ante-reorg-status-${view.key}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("ex-ante-reorg-legend-entity") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <ExAnteReorgRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          options={EX_ANTE_REORG_PRESET_IDS.map((id) => ({
            id,
            label: t(`ex-ante-reorg-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="ex-ante-reorg preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("ex-ante-reorg-run"),
            icon: <Swords />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={EX_ANTE_REORG_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="ex-ante-reorg transport"
        />
      }
      stepCaption={
        <DiagramCaption current={captionFor(view)} all={allCaptions} />
      }
      readout={
        <DiagramReadout
          label={t("ex-ante-reorg-readout-label")}
          rows={[
            {
              label: t("ex-ante-reorg-readout-votes-b"),
              value: <DiagramCountUp value={view.votesB} />,
            },
            {
              label: t("ex-ante-reorg-readout-votes-c"),
              value: <DiagramCountUp value={view.votesC} />,
            },
            {
              label: t("ex-ante-reorg-readout-boost"),
              value: view.boost ? format(view.boost) : none,
            },
            {
              label: t("ex-ante-reorg-readout-head"),
              value: t("ex-ante-reorg-block", { name: view.head }),
            },
            {
              label: t("ex-ante-reorg-readout-orphaned"),
              value: view.orphaned
                ? t("ex-ante-reorg-block", {
                    name: view.orphaned === "b" ? "B" : "C",
                  })
                : none,
            },
          ]}
        />
      }
    />
  )
}
