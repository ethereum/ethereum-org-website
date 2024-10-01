import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import type { ProductTableColumnDefs, ProductTableRow } from "@/lib/types"

import {
  Table as TanStackTable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  subComponent?: React.FC<TData>
  noResultsComponent?: React.FC
}

const DataTable = ({
  columns,
  data,
  subComponent,
  noResultsComponent,
}: TableProps<ProductTableRow, ProductTableColumnDefs>) => {
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  return (
    <TanStackTable variant="product">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
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
          table.getRowModel().rows.map((row, idx) => (
            <>
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`${row.getIsExpanded() ? "cursor-pointer border-b-background-highlight bg-background-highlight" : "cursor-pointer"} hover:bg-background-highlight`}
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
                <TableRow className={`bg-background-highlight`}>
                  <TableCell colSpan={row.getAllCells().length}>
                    {subComponent && subComponent(row.original, idx)}
                  </TableCell>
                </TableRow>
              )}
            </>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {noResultsComponent && noResultsComponent({})}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TanStackTable>
  )
}

export default DataTable
