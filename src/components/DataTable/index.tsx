import { FC, Fragment, useEffect, useRef, useState } from "react"
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

import { trackCustomEvent } from "@/lib/utils/matomo"

export interface TableRowData {
  name: string
  id?: string | number
  description?: string
  url?: string
}

type DataTableProps<TData extends TableRowData, TValue> = TableProps & {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  subComponent?: FC<TData>
  noResultsComponent?: FC
  allDataLength: number
  setMobileFiltersOpen?: (open: boolean) => void
  activeFiltersCount: number
  meta?: Record<string, string | number | boolean>
  matomoEventCategory: string
}

export type TableMeta = {
  setMobileFiltersOpen: (open: boolean) => void
  allDataLength: number
  dataLength: number
  activeFiltersCount: number
  [key: string]: string | number | ((open: boolean) => void)
}

const DataTable = <TData extends TableRowData, TValue>({
  columns,
  data,
  subComponent,
  noResultsComponent,
  allDataLength,
  setMobileFiltersOpen,
  activeFiltersCount,
  meta,
  matomoEventCategory,
  ...props
}: DataTableProps<TData, TValue>) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const previousExpandedRef = useRef<Record<string, boolean>>({})

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: (updater) =>
      setExpanded(updater as Record<string, boolean>),
    getRowId: (row: TData) => row.name,
    getRowCanExpand: (row) => {
      const rowData = row.original as { canExpand?: boolean }
      return rowData.canExpand !== undefined ? rowData.canExpand : true
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta: {
      ...meta,
      allDataLength,
      dataLength: data.length,
      setMobileFiltersOpen,
      activeFiltersCount,
    } as TableMeta,
  })

  useEffect(() => {
    const prev = previousExpandedRef.current
    const current = expanded

    // Find newly expanded rows
    const newlyExpanded = Object.entries(current)
      .filter(([key, value]) => value === true && prev[key] !== true)
      .map(([key]) => key)

    if (newlyExpanded.length > 0) {
      const row = table.getRowModel().rowsById[newlyExpanded[0]]
      if (row) {
        trackCustomEvent({
          eventCategory: matomoEventCategory,
          eventAction: "expanded",
          eventName: row.original.name,
        })
      }
    }

    previousExpandedRef.current = expanded
  }, [expanded, table, matomoEventCategory])

  return (
    <div className="relative">
      <div className="sticky top-[76px] z-10 w-full border-b border-primary bg-background">
        <Table {...props}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Fragment key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Fragment>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
      </div>
      <Table {...props}>
        <TableBody>
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
                    <Fragment key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Fragment>
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
    </div>
  )
}

export default DataTable
