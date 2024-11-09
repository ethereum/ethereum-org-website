"use client"

import { MdInfoOutline } from "react-icons/md"
import { ColumnDef } from "@tanstack/react-table"

import InlineLink from "@/components/Link"
import Tooltip from "@/components/Tooltip"
import { TableHead } from "@/components/ui/Table"

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
  },
  {
    id: "dropdown",
    header: () => <TableHead className="hidden w-10 lg:table-cell" />,
  },
]
