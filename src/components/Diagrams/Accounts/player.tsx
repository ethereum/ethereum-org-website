"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
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
  ACCOUNTS_LAST_STEP,
  ACCOUNTS_PARTS,
  ACCOUNTS_PRESET_IDS,
  ACCOUNTS_STEPS,
  accountsCaptionKey,
  type AccountsPart,
  type AccountsPresetId,
  ADDRESS_BYTES,
  ADDRESS_HEX_CHARS,
  CONTRACT_START_NONCE,
  getAccountsView,
  GWEI_PER_ETH,
  STORAGE_BITS,
  WEI_PER_GWEI,
} from "./model"
import AccountsRig from "./rig"

/** Step 0 is idle; steps 1 to ACCOUNTS_LAST_STEP. */
const IDLE_STEP = 0

/** A long hex value, shortened for the readout: 0x5e97…a120. */
const shortHex = (hex: string) => `${hex.slice(0, 6)}…${hex.slice(-4)}`

interface AccountsPlayerProps {
  initialPreset?: AccountsPresetId
  /** Step to start on (0 = idle, 1-4), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The accounts.png replacement: the address, then the account state's four
 * fields one by one, for an externally owned or a contract account.
 */
export function AccountsPlayer({
  initialPreset = "eoa",
  initialStep = IDLE_STEP,
  fig,
  className,
}: AccountsPlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const [presetId, setPresetId] = useState<AccountsPresetId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: ACCOUNTS_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getAccountsView(presetId, step), [presetId, step])
  const { preset } = view

  // ETH from whole gwei, and the exact wei amount (beyond 2^53, so BigInt).
  const { eth, wei } = useMemo(() => {
    const ethFormat = numberFormat(locale, { maximumFractionDigits: 4 })
    const weiFormat = numberFormat(locale)
    return {
      eth: (gwei: number) => ethFormat.format(gwei / GWEI_PER_ETH),
      wei: (gwei: number) =>
        weiFormat.format(BigInt(gwei) * BigInt(WEI_PER_GWEI)),
    }
  }, [locale])

  const values = {
    address: shortHex(preset.address),
    nonce: format(preset.nonce),
    eth: eth(preset.balanceGwei),
    wei: wei(preset.balanceGwei),
    start: format(CONTRACT_START_NONCE),
    bits: format(STORAGE_BITS),
  }

  const { labels, definitions, parts } = useMemo(() => {
    const params = {
      bits: format(STORAGE_BITS),
      bytes: format(ADDRESS_BYTES),
      chars: format(ADDRESS_HEX_CHARS),
    }
    const labels = {} as Record<AccountsPart, string>
    const definitions = {} as Record<AccountsPart, string>
    for (const part of ACCOUNTS_PARTS) {
      labels[part] = t(`accounts-label-${part}`)
      definitions[part] = t(`accounts-definition-${part}`, params)
    }
    const parts = Object.fromEntries(
      ACCOUNTS_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, format])

  const captionFor = (index: number) =>
    t(accountsCaptionKey(presetId, ACCOUNTS_STEPS[index]), {
      ...values,
      step: format(index),
    })

  const statusKey =
    view.motion === "storage" || view.motion === "code"
      ? `accounts-status-${view.motion}-${presetId}`
      : `accounts-status-${view.motion}`

  const pending = t("accounts-readout-pending")
  const shown = (field: (typeof view.shownFields)[number]) =>
    view.shownFields.includes(field)

  return (
    <InteractiveDiagram
      className={className}
      caption={t("accounts-caption")}
      description={t(
        "accounts-description",
        Object.fromEntries([1, 2, 3, 4].map((n) => [`step${n}`, format(n)]))
      )}
      fig={fig}
      title={t("accounts-title")}
      status={t(statusKey, values)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("diagram-legend-accounts") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <AccountsRig view={view} labels={labels} definitions={definitions} />
      }
      presets={
        <DiagramPresets
          options={ACCOUNTS_PRESET_IDS.map((id) => ({
            id,
            label: t(`accounts-preset-${id}`),
          }))}
          value={presetId}
          onChange={(id) => {
            setPresetId(id)
            reset()
          }}
          eventAction="accounts preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("accounts-run"),
            icon: <Search />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={ACCOUNTS_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="accounts transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={ACCOUNTS_STEPS.map((_, i) => captionFor(i))}
        />
      }
      readout={
        <DiagramReadout
          label={t("accounts-readout-label")}
          rows={[
            {
              label: t("accounts-readout-address"),
              value: view.addressShown ? shortHex(preset.address) : pending,
            },
            {
              label: t("accounts-readout-nonce"),
              value: (
                <DiagramCountUp
                  value={shown("nonce") ? preset.nonce : 0}
                  format={(n) => (shown("nonce") ? format(n) : pending)}
                />
              ),
            },
            {
              label: t("accounts-readout-balance"),
              value: (
                <DiagramCountUp
                  value={shown("balance") ? preset.balanceGwei : 0}
                  format={(gwei) =>
                    shown("balance")
                      ? t("accounts-eth", { amount: eth(gwei) })
                      : pending
                  }
                />
              ),
            },
            {
              label: t("accounts-readout-storageRoot"),
              value: shown("storageRoot")
                ? shortHex(preset.storageRoot)
                : pending,
            },
            {
              label: t("accounts-readout-codeHash"),
              value: shown("codeHash") ? shortHex(preset.codeHash) : pending,
            },
          ]}
        />
      }
    />
  )
}
