"use client"

import { useMemo } from "react"
import { Send } from "lucide-react"
import { useTranslations } from "next-intl"

import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
import {
  DiagramCaption,
  DiagramCountUp,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
  useDiagramFormat,
  useDiagramText,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import {
  getTxApplyValues,
  getTxApplyView,
  TX_APPLY_LAST_STEP,
  TX_APPLY_PARTS,
  TX_APPLY_STEPS,
  txApplyEth,
  type TxApplyPart,
} from "./model"
import TxApplyRig from "./rig"

/** Step 0 is idle; steps 1 to TX_APPLY_LAST_STEP. */
const IDLE_STEP = 0

interface TxApplyPlayerProps {
  /** Step to start on (0 = idle, 1-4), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The tx.png replacement: a signed transaction moves the world state from t
 * to t+1. Value flows to the recipient, the fee splits into a burn and a tip,
 * and the sender's nonce goes up by one.
 */
export function TxApplyPlayer({
  initialStep = IDLE_STEP,
  fig,
  className,
}: TxApplyPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const text = useDiagramText()
  const inView = useDiagramInView<HTMLDivElement>()
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: TX_APPLY_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getTxApplyView(step), [step])

  const { eth, signedEth, signed } = useMemo(
    () => ({
      eth: (gwei: number) => txApplyEth(text, gwei),
      signedEth: (gwei: number) => txApplyEth(text, gwei, true),
      signed: (value: number) =>
        text.number(value, { signDisplay: "exceptZero" }),
    }),
    [text]
  )

  const amounts = { ...getTxApplyValues(text), step: format(view.step) }

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<TxApplyPart, string>
    const definitions = {} as Record<TxApplyPart, string>
    for (const part of TX_APPLY_PARTS) {
      labels[part] =
        part === "deck"
          ? t(
              view.stateAfter
                ? "tx-apply-label-deck-after"
                : "tx-apply-label-deck"
            )
          : t(`tx-apply-label-${part}`)
      definitions[part] = t(`tx-apply-definition-${part}`)
    }
    const parts = Object.fromEntries(
      TX_APPLY_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, view.stateAfter])

  const captionFor = (index: number) =>
    t(`tx-apply-step-${TX_APPLY_STEPS[index]}`, {
      ...amounts,
      step: format(index),
    })

  return (
    <InteractiveDiagram
      className={className}
      caption={t("tx-apply-caption", amounts)}
      description={t("tx-apply-description", amounts)}
      fig={fig}
      title={t("tx-apply-title")}
      status={t(`tx-apply-status-${view.motion}`, amounts)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("diagram-legend-accounts") },
        { hue: "gas", label: t("diagram-legend-value") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <TxApplyRig
          view={view}
          runKey={`step-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("tx-apply-run"),
            icon: <Send />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={TX_APPLY_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="tx-apply transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={TX_APPLY_STEPS.map((_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("tx-apply-readout-label")}
          rows={[
            {
              label: t("tx-apply-readout-sender"),
              value: (
                <DiagramCountUp
                  value={view.senderDeltaGwei}
                  format={signedEth}
                />
              ),
            },
            {
              label: t("tx-apply-readout-recipient"),
              value: (
                <DiagramCountUp
                  value={view.recipientDeltaGwei}
                  format={signedEth}
                />
              ),
            },
            {
              label: t("tx-apply-readout-burned"),
              value: (
                <DiagramCountUp
                  value={view.burnedGwei}
                  delay={600}
                  format={eth}
                />
              ),
            },
            {
              label: t("tx-apply-readout-tip"),
              value: (
                <DiagramCountUp value={view.tipGwei} delay={600} format={eth} />
              ),
            },
            {
              label: t("tx-apply-readout-nonce"),
              value: signed(view.nonceDelta),
            },
          ]}
        />
      }
    />
  )
}
