"use client"

import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ProductTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  getRowCanExpand: (row: Row<TData>) => boolean
}

const ProductTable = <TData, TValue>({
  columns,
  data,
  getRowCanExpand,
}: ProductTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-primary">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {flexRender(
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
            // TODO: Implement table rows
            table.getRowModel().rows.map((row) => {
              return (
                <>
                  <TableRow
                    onClick={() => row.getToggleExpandedHandler()()}
                    style={{ cursor: "pointer" }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      console.log(cell.column.getSize())
                      return cell.column.id === "expander" ? (
                        <TableCell key={cell.id} className="float-right">
                          {row.getIsExpanded() ? (
                            <IoChevronUpSharp />
                          ) : (
                            <IoChevronDownSharp />
                          )}
                        </TableCell>
                      ) : (
                        <TableCell
                          key={cell.id}
                          style={{
                            width: `${cell.column.getSize()}px`,
                            height: `${cell.column.getSize()}px`,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                  {row.getIsExpanded() && <>expanded</>}
                </>
              )
            })
          ) : (
            // TODO: Implement empty state
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductTable
