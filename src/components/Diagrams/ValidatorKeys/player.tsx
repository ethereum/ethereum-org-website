"use client"

import { useMemo, useState } from "react"
import { Send } from "lucide-react"
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
  CREDENTIAL_PREFIX,
  CREDENTIAL_PRESET_IDS,
  type CredentialPresetId,
  DEPOSIT_ETH,
  getValidatorKeysView,
  MAX_EFFECTIVE_BALANCE_ETH,
  VALIDATOR_COUNT,
  VALIDATOR_KEYS_LAST_STEP,
  type ValidatorKeysView,
} from "./model"
import ValidatorKeysRig from "./rig"
import { useKeyParts } from "./use-key-parts"

/** Step 0 is idle; steps 1 to VALIDATOR_KEYS_LAST_STEP. */
const IDLE_STEP = 0

const PARTS = [
  "wallet",
  "contract",
  "validators",
  "signing",
  "withdrawal",
  "payout",
  "balance",
] as const

interface ValidatorKeysPlayerProps {
  initialPreset?: CredentialPresetId
  /** Step to start on (0 = idle, 1-4), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The validator-key-schematic.png replacement: one wallet deposits for three
 * validators, the beacon chain activates them, each signs with its own
 * signing key, and withdrawals follow the withdrawal credentials chosen.
 */
export function ValidatorKeysPlayer({
  initialPreset = "bls",
  initialStep = IDLE_STEP,
  fig,
  className,
}: ValidatorKeysPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState<CredentialPresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: VALIDATOR_KEYS_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getValidatorKeysView(presetId, step),
    [presetId, step]
  )
  const { labels, definitions, parts } = useKeyParts(PARTS)

  const eth = (amount: number) =>
    t("validator-keys-eth", { amount: format(amount) })
  const valuesFor = (v: ValidatorKeysView) => ({
    step: format(v.step),
    count: format(VALIDATOR_COUNT),
    amount: format(DEPOSIT_ETH),
    max: format(MAX_EFFECTIVE_BALANCE_ETH),
    prefix: CREDENTIAL_PREFIX[v.preset],
    from: CREDENTIAL_PREFIX.bls,
    to: CREDENTIAL_PREFIX.address,
  })
  const captionFor = (v: ValidatorKeysView) =>
    t(`validator-keys-step-${v.key}`, valuesFor(v))

  // Every caption this preset can show, so the caption area keeps the height
  // of the longest one.
  const allCaptions = Array.from(
    { length: VALIDATOR_KEYS_LAST_STEP + 1 },
    (_, i) => captionFor(getValidatorKeysView(presetId, i))
  )

  return (
    <InteractiveDiagram
      className={className}
      caption={t("validator-keys-caption", {
        count: format(VALIDATOR_COUNT),
      })}
      description={t("validator-keys-description", {
        ...valuesFor(view),
        address: CREDENTIAL_PREFIX.address,
        compounding: CREDENTIAL_PREFIX.compounding,
        ...Object.fromEntries([1, 2, 3, 4].map((n) => [`step${n}`, format(n)])),
      })}
      fig={fig}
      title={t("validator-keys-title")}
      status={t(`validator-keys-status-${view.key}`, valuesFor(view))}
      parts={parts}
      legend={[
        { hue: "entity", label: t("validator-keys-legend-entity") },
        { hue: "gas", label: t("diagram-legend-value") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <ValidatorKeysRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          options={CREDENTIAL_PRESET_IDS.map((id) => ({
            id,
            label: t(`validator-keys-preset-${id}`, {
              prefix: CREDENTIAL_PREFIX[id],
            }),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="validator-keys preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("validator-keys-run"),
            icon: <Send />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={VALIDATOR_KEYS_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="validator-keys transport"
        />
      }
      stepCaption={
        <DiagramCaption current={captionFor(view)} all={allCaptions} />
      }
      readout={
        <DiagramReadout
          label={t("validator-keys-readout-label")}
          rows={[
            {
              label: t("validator-keys-readout-deposits"),
              value: <DiagramCountUp value={view.deposits} />,
            },
            {
              label: t("validator-keys-readout-staked"),
              value: <DiagramCountUp value={view.stakedEth} format={eth} />,
            },
            {
              label: t("validator-keys-readout-active"),
              value: <DiagramCountUp value={view.active} delay={500} />,
            },
            {
              label: t("validator-keys-readout-credentials"),
              // Code, never translated.
              value: view.credentials,
            },
          ]}
        />
      }
    />
  )
}
