"use client"

import { useMemo, useState } from "react"
import { KeyRound } from "lucide-react"
import { useTranslations } from "next-intl"

import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
import {
  DiagramCaption,
  DiagramPresets,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
  useDiagramFormat,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import {
  ADDRESS_BYTES,
  CARDS,
  EXAMPLE_VALUES,
  getWalletKeysView,
  PHRASE_WORDS,
  PRESET_IDS,
  PRIVATE_KEY_BYTES,
  PUBLIC_KEY_BYTES,
  STEPS,
  WALLET_KEYS_LAST_STEP,
  WALLET_KEYS_PARTS,
  type WalletKeysPart,
  type WalletKeysPresetId,
} from "./model"
import WalletKeysRig from "./rig"

const IDLE_STEP = 0

interface WalletKeysPlayerProps {
  initialPreset?: WalletKeysPresetId
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  fig?: number
  className?: string
}

/**
 * Recovery phrase to private key to public key to address, one way only:
 * follow the arrows, see what is safe to share, or try going backward.
 */
export function WalletKeysPlayer({
  initialPreset = "forward",
  initialStep = IDLE_STEP,
  fig,
  className,
}: WalletKeysPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [preset, setPreset] = useState<WalletKeysPresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: WALLET_KEYS_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getWalletKeysView(preset, step), [preset, step])

  const values = useMemo(
    () => ({
      words: format(PHRASE_WORDS),
      privateBytes: format(PRIVATE_KEY_BYTES),
      publicBytes: format(PUBLIC_KEY_BYTES),
      bytes: format(ADDRESS_BYTES),
    }),
    [format]
  )

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<WalletKeysPart, string>
    const definitions = {} as Record<WalletKeysPart, string>
    for (const part of WALLET_KEYS_PARTS) {
      labels[part] = t(`wallet-keys-label-${part}`)
      definitions[part] = t(`wallet-keys-definition-${part}`, values)
    }
    const parts = Object.fromEntries(
      WALLET_KEYS_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, values])

  const captionFor = (i: number) =>
    t(`wallet-keys-step-${preset}-${STEPS[preset][i]}`, {
      ...values,
      step: format(i),
    })
  const none = t("wallet-keys-readout-none")

  return (
    <InteractiveDiagram
      className={className}
      caption={t("wallet-keys-caption")}
      description={t("wallet-keys-description", {
        ...values,
        ...Object.fromEntries([1, 2, 3].map((n) => [`step${n}`, format(n)])),
      })}
      fig={fig}
      title={t("wallet-keys-title")}
      status={t(`wallet-keys-status-${view.key}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("wallet-keys-legend-keys") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <WalletKeysRig
          view={view}
          runKey={`${preset}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          label={t("wallet-keys-presets-label")}
          options={PRESET_IDS.map((id) => ({
            id,
            label: t(`wallet-keys-preset-${id}`),
          }))}
          value={preset}
          onChange={(id) => {
            setPreset(id)
            reset()
          }}
          eventAction="wallet-keys preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("wallet-keys-run"),
            icon: <KeyRound />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={WALLET_KEYS_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="wallet-keys transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={STEPS[preset].map((_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("wallet-keys-readout-label")}
          rows={CARDS.map((card, i) => ({
            label: t(`wallet-keys-label-${card}`),
            value:
              i >= view.made
                ? none
                : card === "phrase"
                  ? t("wallet-keys-readout-words", {
                      count: PHRASE_WORDS,
                      words: values.words,
                    })
                  : EXAMPLE_VALUES[card],
            // Hex is code: never formatted or translated.
            code: card !== "phrase" && i < view.made,
          }))}
        />
      }
    />
  )
}
