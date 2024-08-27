"use client"

import { StaticImageData } from "next/image"
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5"
import { ColumnDef } from "@tanstack/react-table"

import { WalletData } from "@/lib/types"

import WalletInfo from "@/components/FindWalletProductTable/components/WalletInfo"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WalletColumns = {
  id: string
  logo: StaticImageData
  walletInfo: WalletData
}

export const WalletColumns: ColumnDef<WalletColumns>[] = [
  {
    accessorKey: "information",
    header: () => null,
    cell: ({ row }) => {
      return <WalletInfo wallet={row.original} />
    },
  },
  {
    id: "expander",
    header: () => null,
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
