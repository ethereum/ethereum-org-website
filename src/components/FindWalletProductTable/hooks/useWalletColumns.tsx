"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Wallet } from "@/lib/types"

import type { TableMeta } from "@/components/DataTable"
import WalletInfo from "@/components/FindWalletProductTable/WalletInfo"
import { Button } from "@/components/ui/buttons/Button"
import { TableCell } from "@/components/ui/Table"

import { trackCustomEvent } from "@/lib/utils/matomo"

export const useWalletColumns: ColumnDef<Wallet>[] = [
  {
    id: "walletInfo",
    header: ({ table }) => {
      const meta = table.options.meta as TableMeta

      return (
        <div className="flex w-full flex-row items-center justify-between border-none px-4 py-2">
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
          {meta.dataLength === meta.allDataLength ? (
            <p>
              Showing all wallets <b>({meta.dataLength})</b>
            </p>
          ) : (
            <p>
              Showing{" "}
              <b>
                {meta.dataLength}/{meta.allDataLength}
              </b>{" "}
              wallets
            </p>
          )}
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
