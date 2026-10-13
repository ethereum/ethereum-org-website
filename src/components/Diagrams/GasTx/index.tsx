import { CodeXml, Flame, Fuel, Undo2 } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils/cn"

import { DiagramBadge } from "../diagram-badge"
import { DiagramConnector } from "../diagram-connector"
import { DiagramFigure } from "../diagram-figure"
import { DiagramGroup } from "../diagram-group"
import { DiagramPill, DiagramTitle } from "../diagram-label"
import { DiagramNode } from "../diagram-node"

import { GasTxPlayer } from "./gas-tx-player"
import type { GasTxPresetId } from "./model"

// While a cycle plays, parts not reached yet are dimmed. GasTxPlayer sets the
// data-r-* flags on its `group/diagram` wrapper (all on when idle).
const dim =
  "opacity-40 transition-opacity duration-500 ease-out motion-reduce:transition-none"
const reach = {
  enter: `${dim} group-data-r-enter/diagram:opacity-100`,
  reserve: `${dim} group-data-r-reserve/diagram:opacity-100`,
  execute: `${dim} group-data-r-execute/diagram:opacity-100`,
  return: `${dim} group-data-r-return/diagram:opacity-100`,
}

// EOA | lanes | contract. Shared by the Transaction row so it lines up with
// the EOA column inside the World state group (group padding + border).
const columns = "md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)]"

export interface GasTxDiagramProps {
  initialPreset?: GasTxPresetId
  /** Step to start on (0-3), for static stories; idle by default. */
  initialStep?: number
  className?: string
}

/**
 * Interactive replacement for `gas-tx.png` ("Message call"): a transaction
 * reserves a gas supply, the contract's EVM code burns gas, and unused gas is
 * returned. Static drawing on the server; `GasTxPlayer` is the client island.
 */
const GasTxDiagram = async ({
  initialPreset,
  initialStep,
  className,
}: GasTxDiagramProps) => {
  const t = await getTranslations("component-diagrams")

  return (
    <div className={cn("not-prose my-8", className)}>
      <GasTxPlayer initialPreset={initialPreset} initialStep={initialStep}>
        <DiagramFigure
          caption={t("gas-tx-caption")}
          description={t("gas-tx-description")}
        >
          <div className="flex flex-col">
            <DiagramTitle className="mb-3">{t("gas-tx-title")}</DiagramTitle>

            <div
              className={cn(
                "grid md:gap-x-3 md:px-[calc(--spacing(6)+2px)]",
                columns
              )}
            >
              <div className="flex flex-col items-center">
                <DiagramNode
                  label={t("gas-tx-transaction")}
                  definition={t("gas-tx-transaction-definition")}
                  className={cn("w-full", reach.enter)}
                />
                <DiagramConnector
                  orientation="block"
                  className={cn(
                    "h-12",
                    reach.enter,
                    "group-data-[motion=enter]/diagram:text-primary"
                  )}
                  tokenClassName="group-data-[motion=enter]/diagram:block"
                />
              </div>
            </div>

            <DiagramGroup variant="outlined" title={t("gas-tx-world-state")}>
              <div className={cn("grid items-center gap-3", columns)}>
                <DiagramNode
                  label={t("gas-tx-eoa")}
                  definition={t("gas-tx-eoa-definition")}
                  className={cn("min-h-28 md:min-h-44", reach.enter)}
                />

                <div className="flex h-44 items-center justify-center gap-2 md:h-auto md:flex-col md:items-stretch md:gap-1">
                  <DiagramBadge
                    border="dashed"
                    icon={<Fuel />}
                    label={t("gas-tx-gas-supply")}
                    definition={t("gas-tx-gas-supply-definition")}
                    className={cn(
                      "size-20 self-center md:size-28",
                      reach.reserve,
                      "group-data-[motion=reserve]/diagram:animate-diagram-pop group-data-[motion=reserve]/diagram:outline-2 group-data-[motion=reserve]/diagram:outline-offset-2 group-data-[motion=reserve]/diagram:outline-primary"
                    )}
                  />
                  <DiagramConnector
                    orientation="responsive"
                    line="dashed"
                    label={t("gas-tx-message")}
                    className={cn(
                      "self-stretch md:h-10",
                      reach.execute,
                      "group-data-[motion=execute]/diagram:text-primary"
                    )}
                    tokenClassName="group-data-[motion=execute]/diagram:block"
                  />
                  <DiagramConnector
                    orientation="responsive"
                    line="dashed"
                    arrow="start"
                    className={cn(
                      "self-stretch md:h-10",
                      reach.return,
                      "group-data-[motion=return]/diagram:text-primary"
                    )}
                    lineClassName="group-data-[motion=return]/diagram:animate-diagram-flow motion-reduce:animate-none"
                  />
                  <DiagramBadge
                    border="dashed"
                    icon={<Undo2 className="rtl:-scale-x-100" />}
                    label={t("gas-tx-refund")}
                    definition={t("gas-tx-refund-definition")}
                    className={cn(
                      "size-20 self-center md:size-28",
                      reach.return
                    )}
                  />
                </div>

                <DiagramNode
                  label={t("gas-tx-contract")}
                  definition={t("gas-tx-contract-definition")}
                  className={cn("min-h-28 gap-3 md:min-h-44", reach.execute)}
                >
                  <DiagramNode
                    tone="chip"
                    layout="inline"
                    icon={<CodeXml />}
                    label={t("gas-tx-evm-code")}
                    definition={t("gas-tx-evm-code-definition")}
                  />
                  <DiagramBadge
                    icon={<Flame />}
                    label={t("gas-tx-gas-burned")}
                    definition={t("gas-tx-gas-burned-definition")}
                    level="inherit"
                    gaugeClassName="group-data-[motion=execute]/diagram:delay-700"
                    className="size-20 md:size-24"
                  />
                  <DiagramPill
                    tone="revert"
                    className="hidden group-data-reverted/diagram:inline-flex group-data-[motion=revert]/diagram:animate-diagram-pop"
                  >
                    {t("gas-tx-reverted")}
                  </DiagramPill>
                </DiagramNode>
              </div>
            </DiagramGroup>
          </div>
        </DiagramFigure>
      </GasTxPlayer>
    </div>
  )
}

export default GasTxDiagram
