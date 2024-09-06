"use client"

import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5"
import { ColumnDef } from "@tanstack/react-table"

import { Wallet } from "@/lib/types"

import WalletInfo from "@/components/FindWalletProductTable/components/WalletInfo"
import { TableHead } from "@/components/ui/table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WalletColumns = {
  id: string
  walletInfo: Wallet
}

export const WalletColumns: ColumnDef<Wallet>[] = [
  {
    accessorKey: "information",
    header: () => <TableHead className="h-0" />,
    cell: ({ row }) => {
      return (
        <WalletInfo wallet={row.original} isExpanded={row.getIsExpanded()} />
      )
    },
  },
  {
    id: "expander",
    header: () => <TableHead className="h-0" />,
    cell: ({ row }) => {
      return (
        <div>
          <button className="text-primary">
            {row.getIsExpanded() ? (
              <IoChevronUpSharp size={24} />
            ) : (
              <IoChevronDownSharp size={24} />
            )}
          </button>
        </div>
      )
    },
  },
]
