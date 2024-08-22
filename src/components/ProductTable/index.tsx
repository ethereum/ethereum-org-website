import { useEffect, useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import type {
  FilterOption,
  ProductTableColumnDefs,
  ProductTablePresetFilters,
  TPresetFilters,
} from "@/lib/types"

import Filters from "@/components/ProductTable/Filters"
import PresetFilters from "@/components/ProductTable/PresetFilters"
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
  filterOptions: FilterOption[]
  presetFilters: TPresetFilters<TData>[]
}

const ProductTable = ({
  columns,
  data,
  filterOptions,
  presetFilters,
}: ProductTableProps<ProductTablePresetFilters, ProductTableColumnDefs>) => {
  const [activePresets, setActivePresets] = useState<number[]>([])
  const [filters, setFilters] = useState<FilterOption[]>(filterOptions)
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  const handleSelectPreset = (idx: number) => {
    if (activePresets.includes(idx)) {
      setActivePresets(activePresets.filter((item) => item !== idx))
    } else {
      setActivePresets(activePresets.concat(idx))
    }
  }

  // TODO: Fix this, its currently not applying presets correctly when there are none applied
  useEffect(() => {
    const combinedPresetFilters = activePresets.reduce((combined, preset) => {
      const updatedFilters = { ...combined }
      Object.entries(presetFilters[preset].presetFilters).forEach(
        ([name, value]) => {
          if (!updatedFilters[name]) {
            updatedFilters[name] = value
          }
          if (value === true) {
            updatedFilters[name] = value
          }
        }
      )
      return updatedFilters
    }, {})

    const filtersUpdated = [...filters]
    filtersUpdated.forEach((group) => {
      group.items.forEach((item) => {
        if (item.options.length) {
          item.options.forEach((option) => {
            option.inputState = combinedPresetFilters[option.filterKey]
          })
        }
        item.inputState = combinedPresetFilters[item.filterKey]
      })
    })

    setFilters(filtersUpdated)
  }, [presetFilters, activePresets])

  return (
    <div className="px-4">
      {presetFilters.length ? (
        <PresetFilters
          presets={presetFilters}
          activePresets={activePresets}
          handleSelectPreset={handleSelectPreset}
        />
      ) : (
        <></>
      )}
      <div className="flex gap-6 pb-6 pt-4 2xl:px-0">
        <Filters filters={filters} setFilters={setFilters} />
        <div className="flex-1">
          {/* <div>
            <p>SHOWING</p>
          </div> */}
          <Table>
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
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    {...{
                      onClick: row.getToggleExpandedHandler(),
                      style: { cursor: "pointer" },
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default ProductTable
