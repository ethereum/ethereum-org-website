"use client"

import { MdInfoOutline } from "react-icons/md"
import { ColumnDef } from "@tanstack/react-table"

import { Lang } from "@/lib/types"

import { TwImage } from "@/components/Image"
import InlineLink from "@/components/Link"
import Tooltip from "@/components/Tooltip"
import { TableCell, TableHead } from "@/components/ui/Table"

import { Rollup } from "@/data/layer-2/layer-2"

export const useNetworkColumns: ColumnDef<Rollup>[] = [
  {
    id: "l2Info",
    header: ({ table }) => {
      return (
        <TableHead className="flex-1">
          <p>
            Networks showing <strong>({table.options.data.length})</strong>
          </p>
        </TableHead>
      )
    },
    cell: ({ row }) => {
      return (
        <TableCell className="flex flex-1 items-center gap-4">
          <TwImage src={row.original.logo} width={40} height={40} />
          <p className="text-xl font-bold">{row.original.name}</p>
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
                      GrowThePie
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
      return (
        <TableCell className="hidden w-[145px] px-0 text-end lg:table-cell">
          $
          {row.original.txCosts.toLocaleString(
            table.options.meta.locale as Lang,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 3,
            }
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
      console.log(row.original)
      return (
        <TableCell className="hidden w-[120px] px-0 text-end lg:table-cell">
          <p>
            {new Intl.NumberFormat(table.options.meta.locale as Lang, {
              style: "currency",
              currency: "USD",
              notation: "compact",
              minimumSignificantDigits: 3,
              maximumSignificantDigits: 3,
            }).format(row.original.l2beatData.tvl.breakdown.total)}
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
    cell: () => {
      return (
        <TableCell className="hidden w-[145px] px-0 text-end lg:table-cell">
          <p>TODO</p>
        </TableCell>
      )
    },
  },
  {
    id: "dropdown",
    header: () => <TableHead className="hidden w-10 lg:table-cell" />,
    cell: () => <TableCell className="hidden w-10 lg:table-cell" />,
  },
]
