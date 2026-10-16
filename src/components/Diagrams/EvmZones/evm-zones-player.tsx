"use client"

import { Play } from "lucide-react"
import dynamic from "next/dynamic"
import { useLocale, useTranslations } from "next-intl"
import type { ReactNode } from "react"

import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
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
const RigPlaceholder = () => (
  <div
    aria-hidden
    className="w-full"
    style={{
      aspectRatio: `${EVM_ZONES_SIZE.width} / ${EVM_ZONES_SIZE.height}`,
    }}
  />
)
const EvmZonesRig = dynamic(() => import("./evm-zones-rig"), {
  ssr: false,
  loading: RigPlaceholder,
})

interface EvmZonesPlayerProps {
  /** Step to start on (0 = idle, 1-4), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
}

/**
 * The evm.png replacement: one call through the EVM, showing which zone
 * keeps what. Machine state fills and then clears, the code never changes,
 * and the storage write is all that survives.
 */
export function EvmZonesPlayer({ initialStep = 0, fig }: EvmZonesPlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const inView = useDiagramInView<HTMLDivElement>()
  const { step, isRunning, atEnd, run, goTo } = useStepPlayer({
    lastStep: EVM_ZONES_LAST_STEP,
    initialStep,
    paused: !inView.visible,
  })
  const view = getEvmZonesView(step)
  const format = (value: number) => numberFormat(locale).format(value)

  const labels = Object.fromEntries(
    EVM_ZONES_PARTS.map((part) => [part, t(`evm-zones-label-${part}`)])
  ) as Record<EvmZonesPart, ReactNode>
  // Each part's one-line definition, then the zone it belongs to.
  const definitions = Object.fromEntries(
    EVM_ZONES_PARTS.map((part) => [
      part,
      t("evm-zones-definition-with-zone", {
        definition: t(`evm-zones-definition-${part}`),
        zone: t(`evm-zones-zone-${EVM_ZONE_OF[part]}`),
      }),
    ])
  ) as Record<EvmZonesPart, ReactNode>

  return (
    <InteractiveDiagram
      caption={t("evm-zones-caption")}
      description={t("evm-zones-description")}
      figLabel={fig ? t("diagram-fig", { number: format(fig) }) : undefined}
      title={t("evm-zones-title")}
      status={t(`evm-zones-status-${view.motion}`)}
      parts={Object.fromEntries(
        EVM_ZONES_PARTS.map((part) => [
          part,
          { label: labels[part], definition: definitions[part] },
        ])
      )}
      legend={[
        { hue: "entity", label: t("diagram-legend-evm") },
        { hue: "gas", label: t("diagram-legend-gas") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        // The drawing loads once the diagram comes near the viewport.
        inView.seen ? (
          <EvmZonesRig
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
