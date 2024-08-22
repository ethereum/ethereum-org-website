"use client"

import { StaticImageData } from "next/image"
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5"
import { ColumnDef } from "@tanstack/react-table"

import { WalletData } from "@/lib/types"

import { Image } from "@/components/Image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WalletColumns = {
  id: string
  logo: StaticImageData
  walletInfo: WalletData
}

export const WalletColumns: ColumnDef<WalletColumns>[] = [
  {
    accessorKey: "logo",
    header: () => null,
    minSize: 14,
    size: 14,
    maxSize: 14,
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.image}
          width="14"
          height="14"
          alt=""
          objectFit="contain"
        />
      )
    },
  },
  {
    accessorKey: "walletName",
    header: () => null,
    cell: ({ row }) => {
      return (
        <div className="flex">
          <p className="text-xl font-bold">{row.original.name}</p>
          <div></div>
        </div>
      )
    },
  },
  {
    id: "expander",
    header: () => <p>expander</p>,
    cell: ({ row }) => {
      return (
        <button
          className="text-primary"
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: "pointer" },
          }}
        >
          {row.getIsExpanded() ? (
            <IoChevronUpSharp size={24} />
          ) : (
            <IoChevronDownSharp size={24} />
          )}
        </button>
      )
    },
  },
]
