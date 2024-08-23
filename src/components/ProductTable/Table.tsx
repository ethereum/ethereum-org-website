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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  subComponent?: React.FC<TData>
}

const Table = ({
  columns,
  data,
  subComponent,
}: TableProps<ProductTableRow, ProductTableColumnDefs>) => {
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
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
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
                  if (!e.target.matches("a, a svg")) {
                    console.log("test")
                    console.log(row)
                    row.getToggleExpandedHandler()()
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <p>{row.getIsExpanded()}</p>
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
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TanStackTable>
  )
}

export default Table
