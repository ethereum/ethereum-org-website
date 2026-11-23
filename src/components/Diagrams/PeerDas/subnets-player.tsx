"use client"

import { useMemo, useState } from "react"
import { Network } from "lucide-react"
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

import {
  BLOB_ROWS,
  COLUMNS_PER_DRAWN,
  CUSTODY_REQUIREMENT,
  DRAWN_COLUMNS,
  ETH_PER_CUSTODY_GROUP,
  getSubnetsView,
  MISSING_DRAWN,
  NODE_IDS,
  type NodeId,
  NODES,
  NUMBER_OF_COLUMNS,
  RECONSTRUCT_COLUMNS,
  SAMPLES_PER_SLOT,
  SUBNET_COUNT,
  SUBNETS_LAST_STEP,
  SUBNETS_PARTS,
  type SubnetsPart,
  SUPERNODE_BALANCE_ETH,
  VALIDATOR_CUSTODY_REQUIREMENT,
} from "./model"
import SubnetsRig from "./subnets-rig"

const IDLE_STEP = 0

interface ColumnSubnetsPlayerProps {
  initialPreset?: NodeId
  /** Step to start on (0 = idle), for stories. */
  initialStep?: number
  fig?: number
  className?: string
}

/**
 * The subnets.png replacement: the extended blob matrix, its column subnets
 * and three nodes; choose a node to follow its custody, its sampling, then
 * a supernode rebuilding missing columns.
 */
export function ColumnSubnetsPlayer({
  initialPreset = "a",
  initialStep = IDLE_STEP,
  fig,
  className,
}: ColumnSubnetsPlayerProps) {
  const t = useTranslations("component-diagrams")
  const locale = useLocale()
  const format = useDiagramFormat()
  const inView = useDiagramInView<HTMLDivElement>()

  const [nodeId, setNodeId] = useState<NodeId>(initialPreset)
  const { step, isRunning, atEnd, run, goTo, reset } = useStepPlayer({
    idle: IDLE_STEP,
    last: SUBNETS_LAST_STEP,
    initial: initialStep,
    paused: !inView.visible,
  })
  const view = useMemo(() => getSubnetsView(nodeId, step), [nodeId, step])

  const { labels, definitions, parts } = useMemo(() => {
    const params = {
      custody: format(CUSTODY_REQUIREMENT),
      validatorCustody: format(VALIDATOR_CUSTODY_REQUIREMENT),
      perGroup: format(ETH_PER_CUSTODY_GROUP),
      balance: format(SUPERNODE_BALANCE_ETH),
      columns: format(NUMBER_OF_COLUMNS),
      subnets: format(SUBNET_COUNT),
      // Subnet ids are identifiers: plain digits, like ports.
      first: "0",
      last: String(SUBNET_COUNT - 1),
    }
    const labels = {} as Record<SubnetsPart, string>
    const definitions = {} as Record<SubnetsPart, string>
    for (const part of SUBNETS_PARTS) {
      labels[part] = t(`peer-das-label-${part}`)
      definitions[part] = t(`peer-das-definition-${part}`, params)
    }
    const parts = Object.fromEntries(
      SUBNETS_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, format])

  const list = useMemo(
    () => new Intl.ListFormat(locale, { type: "conjunction" }),
    [locale]
  )
  const node = t(`peer-das-label-node-${nodeId}`)
  const captionFor = (i: number) => {
    const v = getSubnetsView(nodeId, i)
    return t(`peer-das-subnets-step-${v.key}`, {
      step: format(v.step),
      node,
      supernode: t("peer-das-label-node-c"),
      custody: format(NODES[nodeId].custodyCount),
      sampled: format(v.samplingSize),
      extra: format(v.extraColumns.length),
      minimum: format(SAMPLES_PER_SLOT),
      balance: format(SUPERNODE_BALANCE_ETH),
      columns: list.format(v.custodyColumns.map(String)),
      extraColumns: list.format(v.extraColumns.map(String)),
      first: "0",
      last: String(SUBNET_COUNT - 1),
      half: format(RECONSTRUCT_COLUMNS),
      missing: format(MISSING_DRAWN.length * COLUMNS_PER_DRAWN),
    })
  }

  return (
    <InteractiveDiagram
      className={className}
      caption={t("peer-das-subnets-caption", {
        drawn: format(DRAWN_COLUMNS),
        columns: format(NUMBER_OF_COLUMNS),
      })}
      description={t("peer-das-subnets-description", {
        drawn: format(DRAWN_COLUMNS),
        columns: format(NUMBER_OF_COLUMNS),
        perDrawn: format(COLUMNS_PER_DRAWN),
        blobs: format(BLOB_ROWS),
        subnets: format(SUBNET_COUNT),
        first: "0",
        last: String(SUBNET_COUNT - 1),
        custody: format(CUSTODY_REQUIREMENT),
        validatorCustody: format(VALIDATOR_CUSTODY_REQUIREMENT),
        perGroup: format(ETH_PER_CUSTODY_GROUP),
        balance: format(SUPERNODE_BALANCE_ETH),
        minimum: format(SAMPLES_PER_SLOT),
        half: format(RECONSTRUCT_COLUMNS),
        step1: format(1),
        step2: format(2),
        step3: format(3),
      })}
      fig={fig}
      title={t("peer-das-subnets-title")}
      status={t(`peer-das-subnets-status-${view.motion}`, {
        node,
        supernode: t("peer-das-label-node-c"),
        custody: format(view.custodied),
        sampled: format(view.sampled),
      })}
      parts={parts}
      legend={[
        { hue: "entity", label: t("peer-das-legend-original") },
        { hue: "gas", label: t("peer-das-legend-extension") },
      ]}
      inViewRef={inView.ref}
      paused={!inView.visible}
      illustration={
        <SubnetsRig
          view={view}
          runKey={`${nodeId}-${view.step}`}
          labels={labels}
          definitions={definitions}
        />
      }
      presets={
        <DiagramPresets
          label={t("peer-das-subnets-presets-label")}
          options={NODE_IDS.map((id) => ({
            id,
            label: t(`peer-das-subnets-preset-${id}`),
          }))}
          value={nodeId}
          onChange={(id) => {
            setNodeId(id)
            reset()
          }}
          eventAction="peer-das subnets preset"
        />
      }
      transport={
        <DiagramTransport
          primary={{
            label: t("peer-das-subnets-run"),
            icon: <Network />,
            onClick: run,
            disabled: isRunning,
          }}
          current={view.step}
          total={SUBNETS_LAST_STEP}
          onPrevious={() => goTo(view.step - 1)}
          onNext={() => goTo(view.step + 1)}
          onReset={reset}
          canGoPrevious={view.step > 1}
          canGoNext={!atEnd}
          canReset={view.step > IDLE_STEP}
          eventAction="peer-das subnets transport"
        />
      }
      stepCaption={
        <DiagramCaption
          current={captionFor(view.step)}
          all={Array.from({ length: SUBNETS_LAST_STEP + 1 }, (_, i) =>
            captionFor(i)
          )}
        />
      }
      readout={
        <DiagramReadout
          label={t("peer-das-subnets-readout-label")}
          rows={[
            {
              label: t("peer-das-subnets-readout-custody"),
              value: <DiagramCountUp value={view.custodied} />,
            },
            {
              label: t("peer-das-subnets-readout-sampled"),
              value: <DiagramCountUp value={view.sampled} />,
            },
            {
              label: t("peer-das-subnets-readout-total"),
              value: format(NUMBER_OF_COLUMNS),
            },
          ]}
        />
      }
    />
  )
}
