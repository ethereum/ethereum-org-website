"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Wallet } from "@/lib/types"

import type { TableMeta } from "@/components/DataTable"
import WalletInfo from "@/components/FindWalletProductTable/WalletInfo"
import { TableCell } from "@/components/ui/table"

export const useWalletColumns: ColumnDef<Wallet>[] = [
  {
    id: "walletInfo",
    header: ({ table }) => {
      const meta = table.options.meta as TableMeta

      return (
        <div className="flex w-full flex-row items-center justify-between border-none px-4 py-2">
          <p className="text-body-medium">
            Showing all wallets{" "}
            <span className="text-body">({meta.dataLength})</span>
          </p>
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <TableCell>
          <WalletInfo wallet={row.original} isExpanded={row.getIsExpanded()} />
        </TableCell>
      )
    },
  },
]
