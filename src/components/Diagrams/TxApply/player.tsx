"use client"

import { useMemo } from "react"
import { Send } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

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

import { numberFormat } from "@/lib/utils/numbers"

import {
  getTxApplyView,
  GWEI_PER_ETH,
  TX_APPLY_LAST_STEP,
  TX_APPLY_PARTS,
  TX_APPLY_STEPS,
  TX_BURN_GWEI,
  TX_EXAMPLE,
  TX_FEE_GWEI,
  TX_TIP_GWEI,
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
}

/**
 * The tx.png replacement: a signed transaction moves the world state from t
 * to t+1. Value flows to the recipient, the fee splits into a burn and a tip,
 * and the sender's nonce goes up by one.
 */
export function TxApplyPlayer({
  initialStep = IDLE_STEP,
  fig,
}: TxApplyPlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: TX_APPLY_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getTxApplyView(step), [step])

  // ETH amounts, from whole gwei; signed for balance changes.
  const { eth, signedEth, signed } = useMemo(() => {
    const ethFormat = numberFormat(locale, { maximumFractionDigits: 5 })
    const signedFormat = numberFormat(locale, {
      maximumFractionDigits: 5,
      signDisplay: "exceptZero",
    })
    const signedInt = numberFormat(locale, { signDisplay: "exceptZero" })
    return {
      eth: (gwei: number) =>
        t("tx-apply-eth", { amount: ethFormat.format(gwei / GWEI_PER_ETH) }),
      signedEth: (gwei: number) =>
        t("tx-apply-eth", {
          amount: signedFormat.format(gwei / GWEI_PER_ETH),
        }),
      signed: (value: number) => signedInt.format(value),
    }
  }, [locale, t])

  const amounts = {
    value: eth(TX_EXAMPLE.valueGwei),
    fee: eth(TX_FEE_GWEI),
    burned: eth(TX_BURN_GWEI),
    tip: eth(TX_TIP_GWEI),
    sent: eth(TX_EXAMPLE.valueGwei + TX_FEE_GWEI),
    nonce: signed(1),
    step: format(view.step),
    ...Object.fromEntries(
      [1, 2, 3, 4].map((n) => [`step${n}`, format(n)] as const)
    ),
  }

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
      caption={t("tx-apply-caption", amounts)}
      description={t("tx-apply-description", amounts)}
      figLabel={fig ? t("diagram-fig", { number: format(fig) }) : undefined}
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
