"use client"

import { useMemo, useState } from "react"
import { PenLine } from "lucide-react"
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
  ATTESTATION_SUBNET_COUNT,
  ATTESTATIONS_LAST_STEP,
  ATTESTATIONS_PARTS,
  ATTESTATIONS_PRESET_IDS,
  type AttestationsPart,
  type AttestationsPresetId,
  type AttestationsView,
  COMMITTEE_BITS,
  COMMITTEE_MEMBERS,
  getAttestationsView,
  SIGNED_A,
  SIGNED_B,
} from "./model"
import AttestationsRig from "./rig"

/** Step 0 is idle; steps 1 to ATTESTATIONS_LAST_STEP. */
const IDLE_STEP = 0

interface AttestationsPlayerProps {
  initialPreset?: AttestationsPresetId
  /** Step to start on (0 = idle, 1-5), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The attestation_schematic.png replacement: two committees' attestations
 * from signing to inclusion. Validators sign, the attestations travel on
 * their committee's subnet to its aggregator, the aggregates spread through
 * the beacon nodes, and a proposer includes them, one or two slots later.
 */
export function AttestationsPlayer({
  initialPreset = "on-time",
  initialStep = IDLE_STEP,
  fig,
  className,
}: AttestationsPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState<AttestationsPresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: ATTESTATIONS_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getAttestationsView(presetId, step),
    [presetId, step]
  )

  const delayText = (delay: number) =>
    t("attestations-delay", { count: delay, delay: format(delay) })
  const bitsText = (bits: readonly number[]) => bits.map(format).join("")
  const none = t("attestations-readout-none")

  const valuesFor = (v: AttestationsView) => ({
    step: format(v.step),
    delay: v.inclusionDelay === null ? none : delayText(v.inclusionDelay),
    zero: format(0),
  })

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<AttestationsPart, string>
    const definitions = {} as Record<AttestationsPart, string>
    for (const part of ATTESTATIONS_PARTS) {
      labels[part] = t(`attestations-label-${part}`)
      definitions[part] = t(`attestations-definition-${part}`, {
        count: format(ATTESTATION_SUBNET_COUNT),
      })
    }
    const parts = Object.fromEntries(
      ATTESTATIONS_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, format])

  // Every caption this preset can show, so the caption area keeps the height
  // of the longest one.
  const allCaptions = Array.from(
    { length: ATTESTATIONS_LAST_STEP + 1 },
    (_, i) => {
      const v = getAttestationsView(presetId, i)
      return t(`attestations-step-${v.key}`, valuesFor(v))
    }
  )

  return (
    <InteractiveDiagram
      className={className}
      caption={t("attestations-caption")}
      description={t("attestations-description", {
        members: format(COMMITTEE_MEMBERS),
        signedA: format(SIGNED_A),
        signedB: format(SIGNED_B),
        ...Object.fromEntries(
          [1, 2, 3, 4, 5].map((n) => [`step${n}`, format(n)])
        ),
      })}
      fig={fig}
      title={t("attestations-title")}
      status={t(`attestations-status-${view.key}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("attestations-legend-validators") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <AttestationsRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          options={ATTESTATIONS_PRESET_IDS.map((id) => ({
            id,
            label: t(`attestations-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="attestations preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("attestations-run"),
            icon: <PenLine />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={ATTESTATIONS_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="attestations transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={t(`attestations-step-${view.key}`, valuesFor(view))}
          all={allCaptions}
        />
      }
      readout={
        <DiagramReadout
          label={t("attestations-readout-label")}
          rows={[
            {
              label: t("attestations-readout-signed"),
              value: <DiagramCountUp value={view.signed} />,
            },
            {
              label: t("attestations-readout-aggregates"),
              value: <DiagramCountUp value={view.aggregates} />,
            },
            {
              label: t("attestations-readout-bits-a"),
              value: view.bitsShown ? bitsText(COMMITTEE_BITS.a) : none,
            },
            {
              label: t("attestations-readout-bits-b"),
              value: view.bitsShown ? bitsText(COMMITTEE_BITS.b) : none,
            },
            {
              label: t("attestations-readout-delay"),
              value:
                view.inclusionDelay === null
                  ? none
                  : delayText(view.inclusionDelay),
            },
          ]}
        />
      }
    />
  )
}
