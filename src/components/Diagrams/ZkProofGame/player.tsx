"use client"

import { useMemo, useState } from "react"
import { DoorOpen } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

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

import { numberFormat } from "@/lib/utils/numbers"

import {
  CHOICES,
  fakerOdds,
  getZkProofGameView,
  lastStep,
  MANY_ROUNDS,
  PRESET_IDS,
  ROUNDS,
  type Side,
  ZK_PROOF_GAME_PARTS,
  type ZkProofGamePart,
  type ZkProofGamePresetId,
} from "./model"
import ZkProofGameRig from "./rig"

const IDLE_STEP = 0

interface ZkProofGamePlayerProps {
  initialPreset?: ZkProofGamePresetId
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  fig?: number
  className?: string
}

/**
 * The magic-door cave game: round by round, the verifier calls a side and
 * the prover must come out of it; a meter shows a faker's shrinking odds.
 */
export function ZkProofGamePlayer({
  initialPreset = "knows",
  initialStep = IDLE_STEP,
  fig,
  className,
}: ZkProofGamePlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const format = useDiagramFormat()
  const percent = useMemo(() => {
    const formatter = numberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    })
    return (value: number) => formatter.format(value)
  }, [locale])
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState<ZkProofGamePresetId>(initialPreset)
  const last = lastStep(presetId)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last,
    initial: initialStep,
    dwellMs: 2600,
    dwellReducedMs: 3200,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getZkProofGameView(presetId, step),
    [presetId, step]
  )

  const { labels, definitions, parts, sideLabels } = useMemo(() => {
    const labels = {} as Record<ZkProofGamePart, string>
    const definitions = {} as Record<ZkProofGamePart, string>
    for (const part of ZK_PROOF_GAME_PARTS) {
      labels[part] = t(`zk-proof-game-label-${part}`)
      definitions[part] = t(`zk-proof-game-definition-${part}`)
    }
    const parts = Object.fromEntries(
      ZK_PROOF_GAME_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    const sideLabels: Record<Side, string> = {
      a: t("zk-proof-game-side-a"),
      b: t("zk-proof-game-side-b"),
    }
    return { labels, definitions, parts, sideLabels }
  }, [t])

  const captionFor = (id: ZkProofGamePresetId, i: number) => {
    const v = getZkProofGameView(id, i)
    return t(`zk-proof-game-step-${v.key}`, {
      step: format(v.step),
      start: v.round ? sideLabels[v.round.start] : "",
      call: v.round ? sideLabels[v.round.call] : "",
    })
  }

  const allRounds = ROUNDS.knows.length
  const odds = {
    two: format(CHOICES),
    rounds: format(allRounds),
    odds: format(fakerOdds(allRounds)),
    many: format(MANY_ROUNDS),
    manyOdds: format(fakerOdds(MANY_ROUNDS)),
  }

  return (
    <InteractiveDiagram
      className={className}
      caption={t("zk-proof-game-caption", odds)}
      description={t("zk-proof-game-description", {
        ...odds,
        a: sideLabels.a,
        b: sideLabels.b,
      })}
      fig={fig}
      title={t("zk-proof-game-title")}
      status={t(`zk-proof-game-status-${view.status}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("zk-proof-game-legend-people") },
        { hue: "gas", label: t("zk-proof-game-legend-odds") },
        { hue: "neutral", label: t("zk-proof-game-legend-cave") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <ZkProofGameRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
          sideLabels={sideLabels}
          shout={
            view.round
              ? t("zk-proof-game-shout", { side: sideLabels[view.round.call] })
              : null
          }
          chanceText={percent(view.chance)}
          verdictText={
            view.verdict ? t(`zk-proof-game-verdict-${view.verdict}`) : null
          }
        />
      }
      presets={
        <DiagramPresets
          label={t("zk-proof-game-presets-label")}
          options={PRESET_IDS.map((id) => ({
            id,
            label: t(`zk-proof-game-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="zk-proof-game preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("zk-proof-game-run"),
            icon: <DoorOpen />,
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
          eventAction="zk-proof-game transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(presetId, view.step)}
          all={PRESET_IDS.flatMap((id) =>
            Array.from({ length: lastStep(id) + 1 }, (_, i) =>
              captionFor(id, i)
            )
          )}
        />
      }
      readout={
        <DiagramReadout
          label={t("zk-proof-game-readout-label")}
          rows={[
            {
              label: t("zk-proof-game-readout-rounds"),
              value: <DiagramCountUp value={view.passed} />,
            },
            {
              label: t("zk-proof-game-readout-chance"),
              value: t("zk-proof-game-readout-chance-value", {
                rounds: view.passed,
                odds: format(view.odds),
              }),
            },
            {
              label: t("zk-proof-game-readout-secret"),
              value: t("zk-proof-game-readout-secret-value"),
            },
          ]}
        />
      }
    />
  )
}
