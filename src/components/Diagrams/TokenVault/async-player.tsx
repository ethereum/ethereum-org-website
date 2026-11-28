"use client"

import { useMemo, useState } from "react"
import { Hourglass } from "lucide-react"
import { useTranslations } from "next-intl"

import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
import {
  DiagramCaption,
  DiagramPresets,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
  useDiagramFormat,
  useDiagramText,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import {
  ASYNC_LAST_STEP,
  ASYNC_PRESET_IDS,
  type AsyncPresetId,
  getAsyncVaultValues,
  getAsyncView,
  LIFECYCLE_LAST_STEP,
  vaultAmountText,
} from "./model"
import TokenVaultRig from "./rig"
import { useVaultParts } from "./use-vault-parts"

const IDLE_STEP = 0

interface AsyncVaultPlayerProps {
  /** `async`: the flow, with the strategy; `lifecycle`: the request's states. */
  figure: "async" | "lifecycle"
  initialPreset?: AsyncPresetId
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  fig?: number
  className?: string
}

/**
 * The ERC-7540 figures: `async` replaces erc-7540-async-flow.svg (request,
 * the vault puts the assets to work, fulfillment, claim); `lifecycle`
 * replaces request-lifecycle.svg (pending, claimable, claimed, with what the
 * vault's view functions return). Both run on the same request and numbers.
 */
export function AsyncVaultPlayer({
  figure,
  initialPreset = ASYNC_PRESET_IDS[0],
  initialStep = IDLE_STEP,
  fig,
  className,
}: AsyncVaultPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const text = useDiagramText()
  const inView = useDiagramInView<HTMLDivElement>()
  const { labels, definitions, parts } = useVaultParts(figure)
  const last = figure === "async" ? ASYNC_LAST_STEP : LIFECYCLE_LAST_STEP
  const prefix = `token-vault-${figure}`

  const [presetId, setPresetId] = useState<AsyncPresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(
    () => getAsyncView(figure, presetId, step),
    [figure, presetId, step]
  )

  const params = useMemo(
    () => getAsyncVaultValues(text, figure, presetId),
    [text, figure, presetId]
  )

  const captionFor = (i: number) => {
    const v = getAsyncView(figure, presetId, i)
    return t(`${prefix}-step-${v.key}`, { ...params, step: format(v.step) })
  }
  const none = t("token-vault-readout-none")

  const rows =
    figure === "async"
      ? [
          {
            label: t("token-vault-readout-function"),
            value: view.fn ?? none,
            code: !!view.fn,
          },
          {
            label: t("token-vault-readout-request"),
            value: view.request
              ? t(`token-vault-request-${view.request}`)
              : none,
          },
          {
            label: t("token-vault-readout-transactions"),
            value: format(view.transactions),
          },
          {
            label: t("token-vault-readout-received"),
            value: view.received ? vaultAmountText(text, view.received) : none,
          },
        ]
      : [
          {
            label: t("token-vault-request-pending"),
            value: view.pending ? vaultAmountText(text, view.pending) : none,
          },
          {
            label: t("token-vault-request-claimable"),
            value: view.claimable
              ? vaultAmountText(text, view.claimable)
              : none,
          },
          {
            label: t("token-vault-readout-received"),
            value:
              view.request === "claimed" && view.received
                ? vaultAmountText(text, view.received)
                : none,
          },
        ]

  return (
    <InteractiveDiagram
      className={className}
      caption={t(`${prefix}-caption`)}
      description={t(`${prefix}-description`, params)}
      fig={fig}
      title={t(`${prefix}-title`)}
      status={t(`${prefix}-status-${view.stepId}`)}
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
      presets={
        <DiagramPresets
          options={ASYNC_PRESET_IDS.map((id) => ({
            id,
            label: t(`token-vault-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction={`${prefix} preset`}
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("token-vault-async-run"),
            icon: <Hourglass />,
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
          eventAction={`${prefix} transport`}
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={Array.from({ length: last + 1 }, (_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout label={t("token-vault-readout-label")} rows={rows} />
      }
    />
  )
}
