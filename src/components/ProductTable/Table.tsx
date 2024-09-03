import { useTranslation } from "react-i18next"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import type { ProductTableColumnDefs, ProductTableRow } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"
import {
  Table as TanStackTable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  subComponent?: React.FC<TData>
  resetFilters: () => void
}

const Table = ({
  columns,
  data,
  subComponent,
  resetFilters,
}: TableProps<ProductTableRow, ProductTableColumnDefs>) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  return (
    <TanStackTable>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-primary">
            {headerGroup.headers.map((header) => {
              return (
                <div key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </div>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <>
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`${row.getIsExpanded() ? "cursor-pointer border-b-body-inverted bg-body-inverted" : "cursor-pointer"}`}
                onClick={(e) => {
                  // Prevent expanding the wallet more info section when clicking on the "Visit website" button
                  if (!(e.target as Element).matches("a, a svg")) {
                    row.getToggleExpandedHandler()()
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              {row.getIsExpanded() && (
                <TableRow className={`bg-body-inverted`}>
                  <TableCell colSpan={row.getAllCells().length}>
                    {subComponent && subComponent(row.original)}
                  </TableCell>
                </TableRow>
              )}
            </>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              <div className="m-24 border-2 border-dashed border-body-light">
                <div className="p-12">
                  <h3 className="mb-6 text-3xl font-normal">
                    {t("page-find-wallet-empty-results-title")}
                  </h3>
                  <p>{t("page-find-wallet-empty-results-desc")}</p>
                  <Button variant="ghost" onClick={resetFilters}>
                    <p>{t("page-find-wallet-reset-filters")}</p>
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TanStackTable>
  )
}

export default Table
