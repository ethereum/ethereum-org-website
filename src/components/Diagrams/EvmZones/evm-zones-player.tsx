"use client"

import { Play } from "lucide-react"
import dynamic from "next/dynamic"
import { useLocale, useTranslations } from "next-intl"
import type { ReactNode } from "react"

import {
  DiagramCaption,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import { numberFormat } from "@/lib/utils/numbers"

import { EVM_ZONES_SIZE } from "./layout"
import {
  EVM_ZONE_OF,
  EVM_ZONES_LAST_STEP,
  EVM_ZONES_PARTS,
  EVM_ZONES_STEPS,
  type EvmZonesPart,
  getEvmZonesView,
} from "./model"

// Decorative SVG, not needed for the first paint: its own chunk after
// hydration, behind a placeholder of the same size.
const EvmZonesRig = dynamic(() => import("./evm-zones-rig"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="w-full"
      style={{
        aspectRatio: `${EVM_ZONES_SIZE.width} / ${EVM_ZONES_SIZE.height}`,
      }}
    />
  ),
})

interface EvmZonesPlayerProps {
  /** Step to start on (0 = idle, 1-4), for stories. */
  initialStep?: number
}

/**
 * The evm.png replacement: one call through the EVM, showing which zone
 * keeps what. Machine state fills and then clears, the code never changes,
 * and the storage write is all that survives.
 */
export function EvmZonesPlayer({ initialStep = 0 }: EvmZonesPlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const { step, isRunning, atEnd, run, goTo } = useStepPlayer({
    lastStep: EVM_ZONES_LAST_STEP,
    initialStep,
  })
  const view = getEvmZonesView(step)
  const format = (value: number) => numberFormat(locale).format(value)

  const labels = Object.fromEntries(
    EVM_ZONES_PARTS.map((part) => [part, t(`evm-zones-label-${part}`)])
  ) as Record<EvmZonesPart, ReactNode>
  // Each part's one-line definition, then the zone it belongs to.
  const tooltips = Object.fromEntries(
    EVM_ZONES_PARTS.map((part) => [
      part,
      <>
        <span className="block">{t(`evm-zones-tooltip-${part}`)}</span>
        <span className="mt-1 block font-bold">
          {t(`evm-zones-zone-${EVM_ZONE_OF[part]}`)}
        </span>
      </>,
    ])
  ) as Record<EvmZonesPart, ReactNode>

  return (
    <InteractiveDiagram
      caption={t("evm-zones-caption")}
      description={t("evm-zones-description")}
      illustration={
        <div className="mx-auto w-full max-w-2xl py-1">
          <EvmZonesRig
            view={view}
            runKey={`step-${view.step}`}
            labels={labels}
            tooltips={tooltips}
          />
        </div>
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("evm-zones-run"),
            icon: <Play />,
            onClick: run,
            disabled: isRunning,
          }}
          counter={t("gas-tx-step-counter", {
            current: format(view.step),
            total: format(EVM_ZONES_LAST_STEP),
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
          eventAction="evm-zones transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={t(view.captionKey)}
          all={EVM_ZONES_STEPS.map((motion) => t(`evm-zones-step-${motion}`))}
        />
      }
      readout={
        <DiagramReadout
          label={t("evm-zones-readout-label")}
          rows={[
            {
              label: t("evm-zones-readout-machine"),
              value: t(`evm-zones-machine-${view.machine}`),
            },
            {
              label: t("evm-zones-readout-code"),
              value: t(`evm-zones-code-${view.code}`),
            },
            {
              label: t("evm-zones-readout-storage"),
              value: t(`evm-zones-storage-${view.storage}`),
            },
          ]}
        />
      }
    />
  )
}
