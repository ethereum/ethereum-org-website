"use client"

import { Send } from "lucide-react"
import dynamic from "next/dynamic"
import { useLocale, useTranslations } from "next-intl"
import type { ReactNode } from "react"

import { useCountUp } from "@/components/Diagrams/anatomy"
import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
import {
  DiagramCaption,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import { numberFormat } from "@/lib/utils/numbers"

import { TX_APPLY_SIZE } from "./layout"
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

// Decorative SVG, not needed for the first paint: its own chunk after
// hydration, behind a placeholder of the same size.
const RigPlaceholder = () => (
  <div
    aria-hidden
    className="w-full"
    style={{
      aspectRatio: `${TX_APPLY_SIZE.width} / ${TX_APPLY_SIZE.height}`,
    }}
  />
)
const TxApplyRig = dynamic(() => import("./tx-apply-rig"), {
  ssr: false,
  loading: RigPlaceholder,
})

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
export function TxApplyPlayer({ initialStep = 0, fig }: TxApplyPlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const inView = useDiagramInView<HTMLDivElement>()
  const { step, isRunning, atEnd, run, goTo, prefersReducedMotion } =
    useStepPlayer({
      lastStep: TX_APPLY_LAST_STEP,
      initialStep,
      paused: !inView.visible,
    })
  const view = getTxApplyView(step)

  const instant = prefersReducedMotion
  const sender = useCountUp(view.senderDeltaGwei, { instant })
  const recipient = useCountUp(view.recipientDeltaGwei, { instant })
  const burned = useCountUp(view.burnedGwei, { instant, delay: 600 })
  const tip = useCountUp(view.tipGwei, { instant, delay: 600 })

  const format = (value: number) => numberFormat(locale).format(value)
  const eth = (gwei: number, signed = false) =>
    t("tx-apply-eth", {
      amount: numberFormat(locale, {
        maximumFractionDigits: 5,
        signDisplay: signed ? "exceptZero" : "auto",
      }).format(gwei / GWEI_PER_ETH),
    })

  const amounts = {
    value: eth(TX_EXAMPLE.valueGwei),
    fee: eth(TX_FEE_GWEI),
    burned: eth(TX_BURN_GWEI),
    tip: eth(TX_TIP_GWEI),
    sent: eth(TX_EXAMPLE.valueGwei + TX_FEE_GWEI),
  }

  const labels = Object.fromEntries(
    TX_APPLY_PARTS.map((part) => [
      part,
      part === "deck"
        ? t(
            view.stateAfter
              ? "tx-apply-label-deck-after"
              : "tx-apply-label-deck"
          )
        : t(`tx-apply-label-${part}`),
    ])
  ) as Record<TxApplyPart, ReactNode>
  const definitions = Object.fromEntries(
    TX_APPLY_PARTS.map((part) => [part, t(`tx-apply-definition-${part}`)])
  ) as Record<TxApplyPart, ReactNode>

  const captionFor = (motion: string) => t(`tx-apply-step-${motion}`, amounts)

  return (
    <InteractiveDiagram
      caption={t("tx-apply-caption")}
      description={t("tx-apply-description", amounts)}
      figLabel={fig ? t("diagram-fig", { number: format(fig) }) : undefined}
      title={t("tx-apply-title")}
      status={t(`tx-apply-status-${view.motion}`, amounts)}
      parts={Object.fromEntries(
        TX_APPLY_PARTS.map((part) => [
          part,
          { label: labels[part], definition: definitions[part] },
        ])
      )}
      legend={[
        { hue: "entity", label: t("diagram-legend-accounts") },
        { hue: "gas", label: t("diagram-legend-value") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        // The drawing loads once the diagram comes near the viewport.
        inView.seen ? (
          <TxApplyRig
            view={view}
            runKey={`step-${view.step}`}
            labels={labels}
            definitions={definitions}
          />
        ) : (
          <RigPlaceholder />
        )
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("tx-apply-run"),
            icon: <Send />,
            onClick: run,
            disabled: isRunning,
          }}
          counter={t("gas-tx-step-counter", {
            current: format(view.step),
            total: format(TX_APPLY_LAST_STEP),
          })}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={() => goTo(0)}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > 0}
          labels={{
            previous: t("gas-tx-previous-step"),
            next: t("gas-tx-next-step"),
            reset: t("diagram-reset"),
          }}
          eventAction="tx-apply transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.motion)}
          all={TX_APPLY_STEPS.map(captionFor)}
        />
      }
      readout={
        <DiagramReadout
          label={t("tx-apply-readout-label")}
          rows={[
            { label: t("tx-apply-readout-sender"), value: eth(sender, true) },
            {
              label: t("tx-apply-readout-recipient"),
              value: eth(recipient, true),
            },
            { label: t("tx-apply-readout-burned"), value: eth(burned) },
            { label: t("tx-apply-readout-tip"), value: eth(tip) },
            {
              label: t("tx-apply-readout-nonce"),
              value: numberFormat(locale, { signDisplay: "exceptZero" }).format(
                view.nonceDelta
              ),
            },
          ]}
        />
      }
    />
  )
}
