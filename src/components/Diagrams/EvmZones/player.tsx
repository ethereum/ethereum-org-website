"use client"

import { useMemo } from "react"
import { Play } from "lucide-react"
import { useTranslations } from "next-intl"

import { useDiagramInView } from "@/components/Diagrams/diagram-hover"
import {
  DiagramCaption,
  DiagramReadout,
  DiagramTransport,
  InteractiveDiagram,
  useDiagramFormat,
} from "@/components/Diagrams/interactive-diagram"
import { useStepPlayer } from "@/components/Diagrams/use-step-player"

import {
  EVM_ZONE_OF,
  EVM_ZONES_LAST_STEP,
  EVM_ZONES_PARTS,
  EVM_ZONES_STEPS,
  type EvmZonesPart,
  getEvmZonesView,
  STACK_DEPTH,
} from "./model"
import EvmZonesRig from "./rig"

/** Step 0 is idle; steps 1 to EVM_ZONES_LAST_STEP. */
const IDLE_STEP = 0

interface EvmZonesPlayerProps {
  /** Step to start on (0 = idle, 1-4), for stories. */
  initialStep?: number
  /** Figure number on the page, if the page numbers its figures. */
  fig?: number
  className?: string
}

/**
 * The evm.png replacement: one call through the EVM, showing which zone
 * keeps what. Machine state fills and then clears, the code never changes,
 * and the storage write is all that survives.
 */
export function EvmZonesPlayer({
  initialStep = IDLE_STEP,
  fig,
  className,
}: EvmZonesPlayerProps) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: EVM_ZONES_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getEvmZonesView(step), [step])

  const { labels, definitions, parts } = useMemo(() => {
    const labels = {} as Record<EvmZonesPart, string>
    const definitions = {} as Record<EvmZonesPart, string>
    for (const part of EVM_ZONES_PARTS) {
      labels[part] = t(`evm-zones-label-${part}`)
      // Each part's one-line definition, then the zone it belongs to.
      definitions[part] = t("evm-zones-definition-with-zone", {
        definition: t(`evm-zones-definition-${part}`, {
          depth: format(STACK_DEPTH),
        }),
        zone: t(`evm-zones-zone-${EVM_ZONE_OF[part]}`),
      })
    }
    const parts = Object.fromEntries(
      EVM_ZONES_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, format])

  const captionFor = (index: number) =>
    t(`evm-zones-step-${EVM_ZONES_STEPS[index]}`, { step: format(index) })

  return (
    <InteractiveDiagram
      className={className}
      caption={t("evm-zones-caption")}
      description={t(
        "evm-zones-description",
        Object.fromEntries([1, 2, 3, 4].map((n) => [`step${n}`, format(n)]))
      )}
      figLabel={fig ? t("diagram-fig", { number: format(fig) }) : undefined}
      title={t("evm-zones-title")}
      status={t(`evm-zones-status-${view.motion}`)}
      parts={parts}
      legend={[
        { hue: "entity", label: t("diagram-legend-evm") },
        { hue: "gas", label: t("diagram-legend-gas") },
        { hue: "neutral", label: t("diagram-legend-structure") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <EvmZonesRig
          view={view}
          runKey={`step-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("evm-zones-run"),
            icon: <Play />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={EVM_ZONES_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="evm-zones transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={EVM_ZONES_STEPS.map((_, i) => captionFor(i))}
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
              value:
                view.storage === "written"
                  ? t("evm-zones-storage-written", {
                      count: 1,
                      slots: format(1),
                    })
                  : t("evm-zones-storage-no-writes"),
            },
          ]}
        />
      }
    />
  )
}
