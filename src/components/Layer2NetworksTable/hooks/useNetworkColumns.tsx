"use client"

import { ChevronDown, ChevronUp, Info } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { ExtendedRollup, Lang } from "@/lib/types"

import { TableMeta } from "@/components/DataTable"
import { Image } from "@/components/Image"
import NetworkMaturityTooltip from "@/components/Layer2NetworksTable/NetworkMaturityTooltip"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"
import { Button } from "@/components/ui/buttons/Button"
import InlineLink from "@/components/ui/Link"
import { TableCell, TableHead } from "@/components/ui/table"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

export const useNetworkColumns: ColumnDef<ExtendedRollup>[] = [
  {
    id: "l2Info",
    header: ({ table }) => {
      const meta = table.options.meta as TableMeta

      return (
        <TableHead className="flex w-full flex-row items-center justify-between px-4 py-2">
          <Button
            variant="ghost"
            className="block p-0 lg:hidden"
            onClick={() => {
              trackCustomEvent({
                eventCategory: "MobileFilterToggle",
                eventAction: "Tap MobileFilterToggle - sticky",
                eventName: "show mobile filters true",
              })
              meta.setMobileFiltersOpen(true)
            }}
          >
            <p className="text-md">{`Filters (${meta.activeFiltersCount})`}</p>
          </Button>
          <p>
            <Translation id="page-layer-2-networks:page-layer-2-networks-networks-showing" />{" "}
            <strong>({table.options.data.length})</strong>
          </p>
        </TableHead>
      )
    },
    cell: ({ table, row }) => {
      const meta = table.options.meta as TableMeta

      return (
        <TableCell
          className={cn(
            "flex flex-1 flex-row items-center justify-between lg:table-cell",
            row.original.canExpand === false && "border-b-4"
          )}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-4">
              <div className="w-[40px] rounded-full">
                <Image
                  src={row.original.logo}
                  alt={row.original.name}
                  className="h-[40px] w-[40px] rounded-full p-1"
                />
              </div>
              <p className="text-xl font-bold">{row.original.name}</p>
            </div>
            <div className="flex flex-row gap-4 lg:hidden">
              <div className="w-[24px]" />
              <NetworkMaturityTooltip maturity={row.original.networkMaturity} />
            </div>
            <div className="flex flex-row gap-4 lg:hidden">
              <div className="w-[24px]" />
              <div>
                <p className="text-xs text-body-medium">
                  <Translation id="page-layer-2-networks:page-layer-2-networks-avg-transaction-fee" />
                </p>
                <p>
                  {row.original.txCosts ? (
                    <>
                      $
                      {(row.original.txCosts || 0).toLocaleString(
                        meta.locale as Lang,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 3,
                        }
                      )}
                    </>
                  ) : (
                    <p>-</p>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-body-medium">
                  <Translation id="page-layer-2-networks:page-layer-2-networks-market-share" />
                </p>
                <p>
                  {new Intl.NumberFormat(meta.locale as Lang, {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    minimumSignificantDigits: 3,
                    maximumSignificantDigits: 3,
                  }).format(row.original.tvl)}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:hidden">
            {row.original.canExpand === false ? (
              <div className="w-[24px]" />
            ) : (
              <button className="text-primary">
                {row.getIsExpanded() ? (
                  <ChevronUp className="text-2xl" />
                ) : (
                  <ChevronDown className="text-2xl" />
                )}
              </button>
            )}
          </div>
        </TableCell>
      )
    },
  },
  {
    id: "average_transaction_fee",
    header: () => (
      <TableHead className="hidden w-[145px] px-0 text-end lg:table-cell">
        <p className="leading-1 text-xs">
          <Translation id="page-layer-2-networks:page-layer-2-networks-avg-transaction-fee" />{" "}
          <span className="whitespace-nowrap">
            <Tooltip
              content={
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">
                    <Translation id="page-layer-2-networks:page-layer-2-networks-transaction-fee" />
                  </p>
                  <p>
                    <Translation id="page-layer-2-networks:page-layer-2-networks-transaction-fee-description" />
                  </p>
                  <p>
                    <Translation id="page-layer-2-networks:page-layer-2-networks-data-from" />{" "}
                    <InlineLink href="https://growthepie.com">
                      growthepie
                    </InlineLink>
                    <Translation id="page-layer-2-networks:page-layer-2-networks-period" />
                  </p>
                </div>
              }
            >
              <Info className="size-[0.875em] translate-y-0.5" />
            </Tooltip>
          </span>
        </p>
      </TableHead>
    ),
    cell: ({ table, row }) => {
      const meta = table.options.meta as TableMeta

      return (
        <TableCell
          className={cn(
            "hidden px-0 text-end lg:table-cell",
            row.original.canExpand === false && "border-b-4"
          )}
        >
          {row.original.txCosts ? (
            <p>
              $
              {row.original.txCosts.toLocaleString(meta.locale as Lang, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 3,
              })}
            </p>
          ) : (
            <p>-</p>
          )}
        </TableCell>
      )
    },
  },
  {
    id: "market_share",
    header: () => (
      <TableHead className="hidden w-[120px] px-0 text-end lg:table-cell">
        <p className="leading-1 text-xs">
          <Translation id="page-layer-2-networks:page-layer-2-networks-market-share" />{" "}
          <span className="whitespace-nowrap">
            <Tooltip
              content={
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">
                    <Translation id="page-layer-2-networks:page-layer-2-networks-market-share" />
                  </p>
                  <p>
                    <Translation id="page-layer-2-networks:page-layer-2-networks-market-share-description" />
                  </p>
                  <p>
                    <Translation id="page-layer-2-networks:page-layer-2-networks-data-from" />{" "}
                    <InlineLink href="https://l2beat.com">L2BEAT</InlineLink>
                    <Translation id="page-layer-2-networks:page-layer-2-networks-period" />
                  </p>
                </div>
              }
            >
              <Info className="size-[0.875em] translate-y-0.5" />
            </Tooltip>
          </span>
        </p>
      </TableHead>
    ),
    cell: ({ table, row }) => {
      const meta = table.options.meta as TableMeta
      return (
        <TableCell
          className={cn(
            "hidden w-[120px] px-0 text-end lg:table-cell",
            row.original.canExpand === false && "border-b-4"
          )}
        >
          <p>
            {new Intl.NumberFormat(meta.locale as Lang, {
              style: "currency",
              currency: "USD",
              notation: "compact",
              minimumSignificantDigits: 3,
              maximumSignificantDigits: 3,
            }).format(row.original.tvl)}
          </p>
        </TableCell>
      )
    },
  },
  {
    id: "network_maturity",
    header: () => (
      <TableHead className="hidden w-[145px] px-0 text-end lg:table-cell">
        <p className="leading-1 text-xs">
          <Translation id="page-layer-2-networks:page-layer-2-networks-network-maturity" />{" "}
          <span className="whitespace-nowrap">
            <Tooltip
              content={
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">
                    <Translation id="page-layer-2-networks:page-layer-2-networks-network-maturity" />
                  </p>
                  <p>
                    <Translation id="page-layer-2-networks:page-layer-2-networks-network-maturity-description" />
                  </p>
                  <p>
                    <Translation id="page-layer-2-networks:page-layer-2-networks-summary-metric" />{" "}
                    <InlineLink href="https://l2beat.com">L2BEAT</InlineLink>.
                  </p>
                </div>
              }
            >
              <Info className="size-[0.875em] translate-y-0.5" />
            </Tooltip>
          </span>
        </p>
      </TableHead>
    ),
    cell: ({ row }) => {
      return (
        <TableCell
          className={cn(
            "hidden w-[145px] px-0 text-center lg:table-cell",
            row.original.canExpand === false && "border-b-4"
          )}
        >
          <NetworkMaturityTooltip maturity={row.original.networkMaturity} />
        </TableCell>
      )
    },
  },
  {
    id: "dropdown",
    header: () => <TableHead className="hidden w-12 lg:table-cell" />,
    cell: ({ row }) => {
      if (row.original.canExpand === false)
        return (
          <TableCell
            className={cn(
              "hidden w-12 lg:table-cell",
              row.original.canExpand === false ? "border-b-4" : ""
            )}
          />
        )

      return (
        <TableCell className={cn("hidden w-12 lg:table-cell")}>
          <button className="text-primary">
            {row.getIsExpanded() ? (
              <ChevronUp className="text-2xl" />
            ) : (
              <ChevronDown className="text-2xl" />
            )}
          </button>
        </TableCell>
      )
    },
  },
]
