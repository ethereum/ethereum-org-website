"use client"

import { useMemo, useState } from "react"
import { Vault } from "lucide-react"
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
  getInterfaceView,
  INTERFACE_LAST_STEP,
  INTERFACE_PRESET_IDS,
  type InterfacePresetId,
  VAULT_EXAMPLE,
} from "./model"
import TokenVaultRig from "./rig"
import { useVaultAmount, useVaultParts } from "./use-vault-parts"

const IDLE_STEP = 0

interface VaultInterfacePlayerProps {
  initialPreset?: InterfacePresetId
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  fig?: number
  className?: string
}

/**
 * The map-of-erc-4626.png replacement: for deposit, mint, withdraw or
 * redeem, check the account's limit, preview the result, make the call and
 * convert at the new rate, with each function's scope and rule.
 */
export function VaultInterfacePlayer({
  initialPreset = "deposit",
  initialStep = IDLE_STEP,
  fig,
  className,
}: VaultInterfacePlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const amount = useVaultAmount()
  const inView = useDiagramInView<HTMLDivElement>()
  const { labels, definitions, parts } = useVaultParts("interface")

  const [presetId, setPresetId] = useState<InterfacePresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: INTERFACE_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getInterfaceView(presetId, step), [presetId, step])

  const captionFor = (i: number) => {
    const v = getInterfaceView(presetId, i)
    return t(`token-vault-interface-step-${v.key}`, {
      step: format(v.step),
      fn: v.fn ?? "",
      event: v.event,
      input: amount(v.input, format),
      returns: v.returns ? amount(v.returns, format) : "",
    })
  }
  const none = t("token-vault-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("token-vault-interface-caption")}
      description={t("token-vault-interface-description", {
        totalAssets: format(VAULT_EXAMPLE.totalAssets),
        totalSupply: format(VAULT_EXAMPLE.totalSupply),
        rate: format(VAULT_EXAMPLE.rate),
        ...Object.fromEntries([1, 2, 3, 4].map((n) => [`step${n}`, format(n)])),
      })}
      fig={fig}
      title={t("token-vault-interface-title")}
      status={t(`token-vault-interface-status-${view.stepId}`)}
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
          options={INTERFACE_PRESET_IDS.map((id) => ({
            id,
            label: t(`token-vault-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="token-vault-interface preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("token-vault-interface-run"),
            icon: <Vault />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={INTERFACE_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="token-vault-interface transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={Array.from({ length: INTERFACE_LAST_STEP + 1 }, (_, i) =>
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
              // Code, never translated.
              value: view.fn ?? none,
              code: !!view.fn,
            },
            {
              label: t("token-vault-readout-scope"),
              value: view.scope ? t(`token-vault-scope-${view.scope}`) : none,
            },
            {
              label: t("token-vault-readout-rule"),
              value: view.rule
                ? t(`token-vault-rule-${view.rule}`, { event: view.event })
                : none,
            },
            {
              label: t("token-vault-readout-returns"),
              value: view.returns ? amount(view.returns, format) : none,
            },
            {
              label: t("token-vault-readout-total-assets"),
              value: <DiagramCountUp value={view.totalAssets} delay={700} />,
            },
          ]}
        />
      }
    />
  )
}
