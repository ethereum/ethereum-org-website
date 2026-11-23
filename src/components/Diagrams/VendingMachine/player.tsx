"use client"

import { useMemo, useState } from "react"
import { ShoppingCart } from "lucide-react"
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
  getVendingMachineView,
  MICRO_PER_ETH,
  PRICE,
  START_STOCK,
  VENDING_MACHINE_LAST_STEP,
  VENDING_MACHINE_PARTS,
  VENDING_MACHINE_PRESET_IDS,
  VENDING_MACHINE_PRESETS,
  type VendingMachinePart,
  type VendingMachinePresetId,
} from "./model"
import VendingMachineRig from "./rig"

const IDLE_STEP = 0

interface VendingMachinePlayerProps {
  initialPreset?: VendingMachinePresetId
  /** Step to start on (0 = idle, 1-4), for stories. */
  initialStep?: number
  fig?: number
  className?: string
}

/**
 * The smart-contract vending machine: choose a cupcake, pay, the machine
 * checks its two rules, then releases the cupcake or undoes the purchase.
 */
export function VendingMachinePlayer({
  initialPreset = "enough",
  initialStep = IDLE_STEP,
  fig,
  className,
}: VendingMachinePlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [presetId, setPresetId] = useState(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: VENDING_MACHINE_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getVendingMachineView(presetId, step),
    [presetId, step]
  )
  const preset = VENDING_MACHINE_PRESETS[presetId]

  const eth = useMemo(() => {
    const ethFormat = numberFormat(locale, { maximumFractionDigits: 6 })
    return (amount: number) =>
      t("vending-machine-eth", {
        amount: ethFormat.format(amount / MICRO_PER_ETH),
      })
  }, [locale, t])

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<VendingMachinePart, string>
    const definitions = {} as Record<VendingMachinePart, string>
    for (const part of VENDING_MACHINE_PARTS) {
      labels[part] = t(`vending-machine-label-${part}`)
      definitions[part] = t(`vending-machine-definition-${part}`)
    }
    const parts = Object.fromEntries(
      VENDING_MACHINE_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t])

  const rules = useMemo(
    () => [
      { id: "paid" as const, question: t("vending-machine-rule-paid") },
      { id: "stock" as const, question: t("vending-machine-rule-stock") },
    ],
    [t]
  )
  const ruleStateText = useMemo(
    () => ({
      pending: null,
      pass: t("vending-machine-rule-pass"),
      fail: t("vending-machine-rule-fail"),
      skipped: t("vending-machine-rule-skipped"),
    }),
    [t]
  )

  const amounts = {
    price: eth(PRICE),
    paid: eth(preset.paid),
  }
  const captionFor = (index: number) => {
    const v = getVendingMachineView(presetId, index)
    return t(`vending-machine-step-${v.key}`, {
      ...amounts,
      step: format(index),
    })
  }

  return (
    <InteractiveDiagram
      className={className}
      caption={t("vending-machine-caption")}
      description={t("vending-machine-description", {
        price: eth(PRICE),
        short: eth(VENDING_MACHINE_PRESETS.short.paid),
        stock: format(START_STOCK),
        step1: format(1),
        step2: format(2),
        step3: format(3),
        step4: format(4),
      })}
      fig={fig}
      title={t("vending-machine-title")}
      status={t(
        `vending-machine-status-${view.motion === "outcome" ? view.key : view.motion}`
      )}
      parts={parts}
      legend={[
        { hue: "entity", label: t("vending-machine-legend-machine") },
        { hue: "gas", label: t("vending-machine-legend-money") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <VendingMachineRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          priceText={amounts.price}
          undoneText={t("vending-machine-undone")}
          rulesTitle={t("vending-machine-rules-title")}
          rules={rules}
          ruleStateText={ruleStateText}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          options={VENDING_MACHINE_PRESET_IDS.map((id) => ({
            id,
            label: t(`vending-machine-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            if (step > 2) goTo(2)
          }}
          eventAction="vending-machine preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("vending-machine-run"),
            icon: <ShoppingCart />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={VENDING_MACHINE_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="vending-machine transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={VENDING_MACHINE_PRESET_IDS.flatMap((id) =>
            Array.from({ length: VENDING_MACHINE_LAST_STEP + 1 }, (_, i) =>
              t(`vending-machine-step-${getVendingMachineView(id, i).key}`, {
                price: eth(PRICE),
                paid: eth(VENDING_MACHINE_PRESETS[id].paid),
                step: format(i),
              })
            )
          )}
        />
      }
      readout={
        <DiagramReadout
          label={t("vending-machine-readout-label")}
          rows={[
            {
              label: t("vending-machine-readout-price"),
              value: eth(PRICE),
            },
            {
              label: t("vending-machine-readout-paid"),
              value: <DiagramCountUp value={view.paid} format={eth} />,
            },
            {
              label: t("vending-machine-readout-returned"),
              value: (
                <DiagramCountUp
                  value={view.reverted ? view.paid : 0}
                  format={eth}
                />
              ),
            },
            {
              label: t("vending-machine-readout-released"),
              value: <DiagramCountUp value={view.released} />,
            },
            {
              label: t("vending-machine-readout-stock"),
              value: <DiagramCountUp value={view.stockLeft} />,
            },
          ]}
        />
      }
    />
  )
}
