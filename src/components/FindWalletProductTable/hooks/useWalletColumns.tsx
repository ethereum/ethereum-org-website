"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Wallet } from "@/lib/types"

import WalletInfo from "@/components/FindWalletProductTable/WalletInfo"
import { TableHead } from "@/components/ui/Table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WalletColumns = {
  id: string
  walletInfo: Wallet
}

export const useWalletColumns: ColumnDef<Wallet>[] = [
  {
    id: "walletInfo",
    header: () => <TableHead className="hidden" />,
    cell: ({ row }) => {
      return (
        <WalletInfo wallet={row.original} isExpanded={row.getIsExpanded()} />
      )
    },
  },
]
