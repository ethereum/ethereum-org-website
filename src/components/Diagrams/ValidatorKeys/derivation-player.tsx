"use client"

import { Fragment, type ReactNode, useMemo } from "react"
import { KeyRound } from "lucide-react"
import { useTranslations } from "next-intl"

import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
import {
  DiagramCaption,
  DiagramCountUp,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
  useDiagramFormat,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import {
  getKeyDerivationView,
  KEY_DERIVATION_LAST_STEP,
  KEY_DERIVATION_STEPS,
  SIGNING_PATH,
  VALIDATOR_COUNT,
  WITHDRAWAL_PATH,
} from "./model"
import ValidatorKeysRig from "./rig"
import { useKeyParts } from "./use-key-parts"

/** A path that may break after any slash, never inside a number. */
const breakable = (path: string): ReactNode =>
  path.split("/").map((part, i, all) => (
    <Fragment key={i}>
      {part}
      {i < all.length - 1 && (
        <>
          /<wbr />
        </>
      )}
    </Fragment>
  ))

/** Step 0 is idle; steps 1 to KEY_DERIVATION_LAST_STEP. */
const IDLE_STEP = 0

const PARTS = [
  "mnemonic",
  "master",
  "paths",
  "validators",
  "signing",
  "withdrawal",
] as const

interface KeyDerivationPlayerProps {
  /** Step to start on (0 = idle, 1-4), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The multiple-keys.png replacement, on the validator keys drawing: the
 * mnemonic becomes the master key, which derives one withdrawal key per
 * validator and, below each, that validator's signing key.
 */
export function KeyDerivationPlayer({
  initialStep = IDLE_STEP,
  fig,
  className,
}: KeyDerivationPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: KEY_DERIVATION_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getKeyDerivationView(step), [step])
  const { labels, definitions, parts } = useKeyParts(PARTS)

  const values = {
    count: format(VALIDATOR_COUNT),
    withdrawalPath: WITHDRAWAL_PATH,
    signingPath: SIGNING_PATH,
  }
  const captionFor = (index: number) =>
    t(`validator-keys-derive-step-${KEY_DERIVATION_STEPS[index]}`, {
      ...values,
      step: format(index),
    })
  const none = t("validator-keys-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("validator-keys-derive-caption")}
      description={t("validator-keys-derive-description", {
        ...values,
        ...Object.fromEntries([1, 2, 3, 4].map((n) => [`step${n}`, format(n)])),
      })}
      fig={fig}
      title={t("validator-keys-derive-title")}
      status={t(`validator-keys-derive-status-${view.key}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("validator-keys-derive-legend") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <ValidatorKeysRig
          view={view}
          runKey={`derive-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("validator-keys-derive-run"),
            icon: <KeyRound />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={KEY_DERIVATION_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="validator-keys-derive transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={KEY_DERIVATION_STEPS.map((_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("validator-keys-derive-readout-label")}
          rows={[
            {
              label: t("validator-keys-derive-readout-withdrawal-keys"),
              value: <DiagramCountUp value={view.withdrawalKeys} />,
            },
            {
              label: t("validator-keys-derive-readout-signing-keys"),
              value: <DiagramCountUp value={view.signingKeys} />,
            },
            {
              label: t("validator-keys-derive-readout-withdrawal-path"),
              // Code, never translated; breaks after a slash.
              value: view.withdrawalPath
                ? breakable(view.withdrawalPath)
                : none,
              code: true,
            },
            {
              label: t("validator-keys-derive-readout-signing-path"),
              value: view.signingPath ? breakable(view.signingPath) : none,
              code: true,
            },
          ]}
        />
      }
    />
  )
}
