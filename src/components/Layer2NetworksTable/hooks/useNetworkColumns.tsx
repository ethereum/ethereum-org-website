"use client"

import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5"
import { MdInfoOutline } from "react-icons/md"
import { ColumnDef } from "@tanstack/react-table"

import { ExtendedRollup, Lang } from "@/lib/types"

import { TableMeta } from "@/components/DataTable"
import { TwImage } from "@/components/Image"
import NetworkMaturityTooltip from "@/components/Layer2NetworksTable/NetworkMaturityTooltip"
import InlineLink from "@/components/Link"
import Tooltip from "@/components/Tooltip"
import { Button } from "@/components/ui/buttons/Button"
import { TableCell, TableHead } from "@/components/ui/Table"

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
            Networks showing <strong>({table.options.data.length})</strong>
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
                <TwImage
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
                <p className="text-xs text-body-medium">Avg. transaction fee</p>
                <p>
                  $
                  {row.original.txCosts.toLocaleString(meta.locale as Lang, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 3,
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-body-medium">Market share</p>
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
                  <IoChevronUpSharp size={24} />
                ) : (
                  <IoChevronDownSharp size={24} />
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
          Avg. transaction fee{" "}
          <span className="whitespace-nowrap">
            <Tooltip
              content={
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">Transaction fee</p>
                  <p>
                    The average cost of transaction for transfers, swaps,
                    minting and other activities.
                  </p>
                  <p>
                    Data from{" "}
                    <InlineLink href="https://growthepie.xyz">
                      growthepie
                    </InlineLink>
                    .
                  </p>
                </div>
              }
            >
              <MdInfoOutline className="translate-y-0.5" />
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
          $
          {row.original.txCosts.toLocaleString(meta.locale as Lang, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
          })}
        </TableCell>
      )
    },
  },
  {
    id: "market_share",
    header: () => (
      <TableHead className="hidden w-[120px] px-0 text-end lg:table-cell">
        <p className="leading-1 text-xs">
          Market share{" "}
          <span className="whitespace-nowrap">
            <Tooltip
              content={
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">Market share</p>
                  <p>Total value locked in escrow contracts on Ethereum.</p>
                  <p>
                    Data from{" "}
                    <InlineLink href="https://l2beat.com">L2BEAT</InlineLink>.
                  </p>
                </div>
              }
            >
              <MdInfoOutline className="translate-y-0.5" />
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
          Network maturity{" "}
          <span className="whitespace-nowrap">
            <Tooltip
              content={
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">Network maturity</p>
                  <p>
                    Looks at the development stage, risks associated with using
                    the network and ecosystem size of the network.
                  </p>
                  <p>
                    This is a summary metric based on risk analysis done by{" "}
                    <InlineLink href="https://l2beat.com">L2BEAT</InlineLink>.
                  </p>
                </div>
              }
            >
              <MdInfoOutline className="translate-y-0.5" />
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
              <IoChevronUpSharp size={24} />
            ) : (
              <IoChevronDownSharp size={24} />
            )}
          </button>
        </TableCell>
      )
    },
  },
]
