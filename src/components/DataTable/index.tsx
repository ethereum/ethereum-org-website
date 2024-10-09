import { Fragment, useEffect, useRef, useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableProps,
  TableRow,
} from "@/components/ui/Table"

type DataTableProps<TData, TValue> = TableProps & {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  subComponent?: React.FC<TData>
  noResultsComponent?: React.FC
}

const DataTable = <TData, TValue>({
  columns,
  data,
  subComponent,
  noResultsComponent,
  ...props
}: DataTableProps<TData, TValue>) => {
  const [isVisible, setIsVisible] = useState(true)
  const [currentData, setCurrentData] = useState(data)
  const previousDataRef = useRef(data)

  const table = useReactTable({
    data: currentData,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(previousDataRef.current)) {
      setIsVisible(false)
      const timer = setTimeout(() => {
        setCurrentData(data)
        setIsVisible(true)
        previousDataRef.current = data
      }, 25) // Adjust this value to match your CSS transition duration

      return () => clearTimeout(timer)
    }
  }, [data])

  return (
    <Table {...props}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Fragment key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Fragment>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody
        className={`duration-25 transition-opacity ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, idx) => (
            <Fragment key={row.id}>
              <TableRow
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
            </Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {noResultsComponent && noResultsComponent({})}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default DataTable
