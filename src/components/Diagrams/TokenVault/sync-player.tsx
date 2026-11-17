"use client"

import { useMemo } from "react"
import { ArrowRightLeft } from "lucide-react"
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

import { getSyncView, SYNC_LAST_STEP, VAULT_EXAMPLE } from "./model"
import TokenVaultRig from "./rig"
import { useVaultAmount, useVaultParts } from "./use-vault-parts"

const IDLE_STEP = 0
/** The function the investor calls: code, never translated. */
const DEPOSIT_FN = "deposit"

interface VaultDepositPlayerProps {
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  fig?: number
  className?: string
}

/**
 * The erc-4626-sync-flow.svg replacement: one deposit call sends the assets
 * in and the shares out, in the same transaction.
 */
export function VaultDepositPlayer({
  initialStep = IDLE_STEP,
  fig,
  className,
}: VaultDepositPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const amount = useVaultAmount()
  const inView = useDiagramInView<HTMLDivElement>()
  const { labels, definitions, parts } = useVaultParts("sync")

  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: SYNC_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getSyncView(step), [step])

  const example = {
    deposit: amount({ value: view.deposit, unit: "assets" }, format),
    shares: amount({ value: view.shares, unit: "shares" }, format),
    rate: format(VAULT_EXAMPLE.rate),
  }
  const captionFor = (i: number) => {
    const v = getSyncView(i)
    return t(`token-vault-sync-step-${v.stepId}`, {
      ...example,
      step: format(v.step),
      fn: DEPOSIT_FN,
    })
  }
  const none = t("token-vault-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("token-vault-sync-caption")}
      description={t("token-vault-sync-description", {
        ...example,
        totalAssets: format(VAULT_EXAMPLE.totalAssets),
        totalSupply: format(VAULT_EXAMPLE.totalSupply),
        ...Object.fromEntries([1, 2, 3].map((n) => [`step${n}`, format(n)])),
      })}
      fig={fig}
      title={t("token-vault-sync-title")}
      status={t(`token-vault-sync-status-${view.stepId}`)}
      parts={parts}
      legend={[
        { hue: "gas", label: t("token-vault-legend-assets") },
        { hue: "entity", label: t("token-vault-legend-entity") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <TokenVaultRig view={view} labels={labels} definitions={definitions} />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("token-vault-sync-run"),
            icon: <ArrowRightLeft />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={SYNC_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="token-vault-sync transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={Array.from({ length: SYNC_LAST_STEP + 1 }, (_, i) =>
            captionFor(i)
          )}
        />
      }
      readout={
        <DiagramReadout
          label={t("token-vault-readout-label")}
          rows={[
            {
              label: t("token-vault-readout-function"),
              value: view.step > IDLE_STEP ? DEPOSIT_FN : none,
              code: view.step > IDLE_STEP,
            },
            {
              label: t("token-vault-readout-transactions"),
              value: format(view.step > IDLE_STEP ? 1 : 0),
            },
            {
              label: t("token-vault-readout-received"),
              value:
                view.received === null ? (
                  none
                ) : (
                  <DiagramCountUp
                    value={view.received}
                    delay={700}
                    format={(n) =>
                      amount({ value: Math.round(n), unit: "shares" }, format)
                    }
                  />
                ),
            },
          ]}
        />
      }
    />
  )
}
