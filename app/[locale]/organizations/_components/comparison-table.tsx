import type { ReactNode } from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { cn } from "@/lib/utils/cn"

export type ComparisonRow = {
  label: ReactNode
  cells: ReactNode[]
}

type ComparisonTableProps = {
  /** sr-only `<caption>`; keep distinct from the visible `<h2>` above */
  caption: string
  rowHeader?: ReactNode
  /** Excludes the leading criterion column */
  columns: ReactNode[]
  rows: ComparisonRow[]
  /** Pass `tint` on a colored band: drops the page-colored fills and separators */
  surface?: "page" | "tint"
}

const ComparisonTable = ({
  caption,
  rowHeader,
  columns,
  rows,
  surface = "page",
}: ComparisonTableProps) => {
  const onTint = surface === "tint"

  return (
    <Table
      variant={onTint ? "minimal" : "highlight-first-column"}
      className="min-w-2xl"
    >
      <TableCaption className="sr-only">{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">{rowHeader}</TableHead>
          {columns.map((column, idx) => (
            <TableHead key={idx} scope="col">
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ label, cells }, rowIdx) => (
          <TableRow key={rowIdx}>
            {/* Without the fill, the `th` underline reads as a stray rule */}
            <TableHead
              scope="row"
              className={cn("align-top", onTint && "border-b-0 font-bold")}
            >
              {label}
            </TableHead>
            {cells.map((cell, cellIdx) => (
              <TableCell key={cellIdx}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ComparisonTable
