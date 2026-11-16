"use client"

import { useMemo, useState } from "react"
import { Layers } from "lucide-react"
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
  BLOCK_STATE_LAST_STEP,
  BLOCK_STATE_PARTS,
  BLOCK_STATE_PRESET_IDS,
  BLOCK_STATE_START,
  BLOCK_STATE_STEPS,
  BLOCK_STATE_TXS,
  type BlockStatePart,
  type BlockStatePresetId,
  getBlockStateView,
  GWEI_PER_ETH,
  txFeeGwei,
} from "./model"
import BlockStateRig from "./rig"

/** Step 0 is idle; steps 1 to BLOCK_STATE_LAST_STEP. */
const IDLE_STEP = 0

interface BlockStatePlayerProps {
  /** Scenario to start on, for stories. */
  initialPreset?: BlockStatePresetId
  /** Step to start on (0 = idle, 1-4), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The tx-block.png replacement: a block's three transactions apply to the
 * world state one at a time, in block order, each to the state the previous
 * one left, and the result is world state t+1. In the "revert" scenario the
 * second transaction's contract call reverts: its value transfer is undone,
 * but its fee is paid and the sender's nonce goes up.
 */
export function BlockStatePlayer({
  initialPreset = "success",
  initialStep = IDLE_STEP,
  fig,
  className,
}: BlockStatePlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const [presetId, setPresetId] = useState<BlockStatePresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: BLOCK_STATE_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getBlockStateView(presetId, step),
    [presetId, step]
  )

  // ETH amounts, from whole gwei.
  const { eth, signed } = useMemo(() => {
    const ethFormat = numberFormat(locale, { maximumFractionDigits: 4 })
    const signedInt = numberFormat(locale, { signDisplay: "exceptZero" })
    return {
      eth: (gwei: number) =>
        t("block-state-eth", {
          amount: ethFormat.format(gwei / GWEI_PER_ETH),
        }),
      signed: (value: number) => signedInt.format(value),
    }
  }, [locale, t])

  // Every number the strings quote, for the current scenario.
  const amounts = useMemo(() => {
    const [t1, t2, t3] = BLOCK_STATE_TXS
    return {
      tx1: format(1),
      tx2: format(2),
      tx3: format(3),
      aliceStart: eth(BLOCK_STATE_START.alice),
      bobStart: eth(BLOCK_STATE_START.bob),
      contractStart: eth(BLOCK_STATE_START.contract),
      t1Value: eth(t1.valueGwei),
      t1Fee: eth(txFeeGwei(presetId, 0)),
      t2Value: eth(t2.valueGwei),
      t2Fee: eth(txFeeGwei("success", 1)),
      t2RevertFee: eth(txFeeGwei("revert", 1)),
      t3Value: eth(t3.valueGwei),
      t3Fee: eth(txFeeGwei(presetId, 2)),
      ...Object.fromEntries(
        [1, 2, 3, 4].map((n) => [`step${n}`, format(n)] as const)
      ),
    }
  }, [eth, format, presetId])

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<BlockStatePart, string>
    const definitions = {} as Record<BlockStatePart, string>
    for (const part of BLOCK_STATE_PARTS) {
      labels[part] =
        part === "deck"
          ? t(
              view.stateAfter
                ? "block-state-label-deck-after"
                : "block-state-label-deck"
            )
          : t(`block-state-label-${part}`)
      definitions[part] = t(`block-state-definition-${part}`)
    }
    const parts = Object.fromEntries(
      BLOCK_STATE_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, view.stateAfter])

  const captionFor = (index: number) => {
    const { motion } = getBlockStateView(presetId, index)
    return t(`block-state-step-${motion}`, {
      ...amounts,
      // A reverted call's caption quotes the fee it actually paid.
      t2Fee: motion === "tx2-revert" ? amounts.t2RevertFee : amounts.t2Fee,
      step: format(index),
    })
  }

  const activeTx = view.active !== null ? BLOCK_STATE_TXS[view.active] : null

  return (
    <InteractiveDiagram
      className={className}
      caption={t("block-state-caption")}
      description={t("block-state-description", amounts)}
      fig={fig}
      title={t("block-state-title")}
      status={t(`block-state-status-${view.motion}`, {
        tx: view.active !== null ? format(view.active + 1) : "",
        value: activeTx ? eth(activeTx.valueGwei) : "",
        fee: view.active !== null ? eth(txFeeGwei(presetId, view.active)) : "",
        nonce: signed(view.bobNonceDelta),
      })}
      parts={parts}
      legend={[
        { hue: "entity", label: t("diagram-legend-accounts") },
        { hue: "gas", label: t("diagram-legend-value") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <BlockStateRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          options={BLOCK_STATE_PRESET_IDS.map((id) => ({
            id,
            label: t(`block-state-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="block-state preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("block-state-run"),
            icon: <Layers />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={BLOCK_STATE_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="block-state transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={BLOCK_STATE_STEPS.map((_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("block-state-readout-label")}
          rows={[
            {
              label: t("block-state-readout-alice"),
              value: (
                <DiagramCountUp value={view.balances.alice} format={eth} />
              ),
            },
            {
              label: t("block-state-readout-bob"),
              value: <DiagramCountUp value={view.balances.bob} format={eth} />,
            },
            {
              label: t("block-state-readout-contract"),
              value: (
                <DiagramCountUp value={view.balances.contract} format={eth} />
              ),
            },
            {
              label: t("block-state-readout-fees"),
              value: <DiagramCountUp value={view.feesGwei} format={eth} />,
            },
            {
              label: t("block-state-readout-nonce"),
              value: signed(view.bobNonceDelta),
            },
          ]}
        />
      }
    />
  )
}
