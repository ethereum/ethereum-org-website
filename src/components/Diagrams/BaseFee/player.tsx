"use client"

import { useCallback, useId, useMemo, useState } from "react"
import { Boxes, Minus, Plus } from "lucide-react"
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
import { Button } from "@/components/ui/buttons/Button"

import { numberFormat } from "@/lib/utils/numbers"

import {
  BASE_FEE_LAST_STEP,
  BASE_FEE_PARTS,
  BASE_FEE_PRESET_IDS,
  BASE_FEE_PRESETS,
  BASE_FEE_START_WEI,
  type BaseFeePart,
  type BaseFeePresetId,
  type BaseFeeView,
  BLOCK_COUNT,
  GAS_LIMIT,
  GAS_TARGET,
  getBaseFeeView,
  MAX_CHANGE,
  UNITS,
} from "./model"
import BaseFeeRig from "./rig"

const IDLE_STEP = 0
const STEP_DWELL_MS = 1600
const STEP_DWELL_REDUCED_MS = 2200
// Count-ups tween whole numbers, so they count in the readouts' last digit.
const GWEI_STEPS = 10_000
const ETH_STEPS = 1_000_000
const STEP_BUTTON = "size-8 min-h-8 shrink-0 p-0"

interface BaseFeePlayerProps {
  initialPreset?: BaseFeePresetId
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  fig?: number
  className?: string
}

/**
 * EIP-1559's base fee over consecutive blocks: each block's gas used, against
 * the target, sets the next block's base fee.
 */
export function BaseFeePlayer({
  initialPreset = "spike",
  initialStep = IDLE_STEP,
  fig,
  className,
}: BaseFeePlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const editLabelId = useId()

  const fmt = useMemo(() => {
    const gwei = numberFormat(locale, { maximumSignificantDigits: 4 })
    const eth = numberFormat(locale, { maximumSignificantDigits: 3 })
    const percent = numberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 3,
    })
    const signed = numberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 3,
      signDisplay: "exceptZero",
    })
    return {
      gwei: (n: number) => gwei.format(n),
      eth: (n: number) => eth.format(n),
      percent: (n: number) => percent.format(n),
      signed: (n: number) => signed.format(n),
    }
  }, [locale])

  const [presetId, setPresetId] = useState<BaseFeePresetId>(initialPreset)
  const [units, setUnits] = useState(BASE_FEE_PRESETS[initialPreset])
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: BASE_FEE_LAST_STEP,
    initial: initialStep,
    dwellMs: STEP_DWELL_MS,
    dwellReducedMs: STEP_DWELL_REDUCED_MS,
    paused: !inView.visible,
  })
  const startWei = BASE_FEE_START_WEI[presetId]
  const view = useMemo(
    () => getBaseFeeView(units, step, startWei),
    [units, step, startWei]
  )

  const setBlockUnits = useCallback((index: number, value: number) => {
    setUnits((current) =>
      current.map((u, i) =>
        i === index ? Math.min(UNITS, Math.max(0, value)) : u
      )
    )
  }, [])

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<BaseFeePart, string>
    const definitions = {} as Record<BaseFeePart, string>
    for (const part of BASE_FEE_PARTS) {
      labels[part] = t(`base-fee-label-${part}`)
      definitions[part] = t(`base-fee-definition-${part}`)
    }
    const parts = Object.fromEntries(
      BASE_FEE_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t])

  const valuesFor = (v: BaseFeeView) => {
    const block = v.blocks[v.current - 1]
    return {
      step: format(v.step),
      block: format(block.number),
      nextBlock: format(block.number + 1),
      used: format(block.gasUsed),
      percent: fmt.percent(block.ofTarget),
      fee: fmt.gwei(block.baseFeeGwei),
      next: fmt.gwei(
        v.current < BLOCK_COUNT ? v.blocks[v.current].baseFeeGwei : v.nextGwei
      ),
      change: fmt.percent(Math.abs(block.ofTarget - 1) * MAX_CHANGE),
    }
  }
  const captionFor = (i: number) => {
    const v = getBaseFeeView(units, i, startWei)
    return t(`base-fee-step-${v.key}`, valuesFor(v))
  }

  const current = view.blocks[view.current - 1]
  const built = current.built

  return (
    <InteractiveDiagram
      className={className}
      caption={t("base-fee-caption", { max: fmt.percent(MAX_CHANGE) })}
      description={t("base-fee-description", {
        blocks: format(BLOCK_COUNT),
        limit: format(GAS_LIMIT),
        target: format(GAS_TARGET),
        start: fmt.gwei(BASE_FEE_START_WEI.spike / 1e9),
        coolingStart: fmt.gwei(BASE_FEE_START_WEI.cooling / 1e9),
        max: fmt.percent(MAX_CHANGE),
      })}
      fig={fig}
      title={t("base-fee-title")}
      status={t(`base-fee-status-${view.key}`, valuesFor(view))}
      parts={parts}
      legend={[
        { hue: "gas", label: t("diagram-legend-gas") },
        { hue: "neutral", label: t("base-fee-legend-base-fee") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <BaseFeeRig
          view={view}
          runKey={`${presetId}-${view.step}`}
          labels={labels}
          definitions={definitions}
          axisLabel={t("base-fee-axis-block")}
          onUnitsChange={setBlockUnits}
        />
      }
      presets={
        <>
          <DiagramPresets
            options={BASE_FEE_PRESET_IDS.map((id) => ({
              id,
              label: t(`base-fee-preset-${id}`),
            }))}
            value={presetId}
            onChange={(id) => {
              setPresetId(id)
              setUnits(BASE_FEE_PRESETS[id])
              reset()
            }}
            eventAction="base-fee preset"
          />
          <div
            role="group"
            aria-labelledby={editLabelId}
            className="flex flex-col gap-2"
          >
            <span id={editLabelId} className="text-sm text-body-medium">
              {t("base-fee-edit-label", { block: format(view.current) })}
            </span>
            <div className="flex items-center justify-between gap-2 rounded-base border border-border p-0.5">
              <Button
                size="sm"
                variant="ghost"
                aria-label={t("base-fee-edit-decrease", {
                  block: format(view.current),
                })}
                disabled={current.units <= 0}
                onClick={() =>
                  setBlockUnits(view.current - 1, current.units - 1)
                }
                className={STEP_BUTTON}
              >
                <Minus />
              </Button>
              <output
                aria-live="polite"
                className="font-mono text-sm text-body tabular-nums"
              >
                {t("base-fee-of-target", {
                  percent: fmt.percent(current.ofTarget),
                })}
              </output>
              <Button
                size="sm"
                variant="ghost"
                aria-label={t("base-fee-edit-increase", {
                  block: format(view.current),
                })}
                disabled={current.units >= UNITS}
                onClick={() =>
                  setBlockUnits(view.current - 1, current.units + 1)
                }
                className={STEP_BUTTON}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </>
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("base-fee-run"),
            icon: <Boxes />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={BASE_FEE_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="base-fee transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={Array.from({ length: BASE_FEE_LAST_STEP + 1 }, (_, i) =>
            captionFor(i)
          )}
        />
      }
      readout={
        <DiagramReadout
          label={t("base-fee-readout-label")}
          rows={[
            {
              label: t("base-fee-readout-block"),
              value: format(view.current),
            },
            {
              label: t("base-fee-readout-base-fee"),
              value: (
                <DiagramCountUp
                  value={Math.round(current.baseFeeGwei * GWEI_STEPS)}
                  format={(n) => fmt.gwei(n / GWEI_STEPS)}
                />
              ),
            },
            {
              label: t("base-fee-readout-change"),
              value: fmt.signed(current.change),
            },
            {
              label: t("base-fee-readout-used"),
              value: fmt.percent(built ? current.ofTarget : 0),
            },
            {
              label: t("base-fee-readout-burned"),
              value: (
                <DiagramCountUp
                  value={built ? Math.round(current.burnedEth * ETH_STEPS) : 0}
                  format={(n) => fmt.eth(n / ETH_STEPS)}
                />
              ),
            },
          ]}
        />
      }
    />
  )
}
