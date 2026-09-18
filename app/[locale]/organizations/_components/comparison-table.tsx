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

export type ComparisonRow = {
  label: ReactNode
  cells: ReactNode[]
}

type ComparisonTableProps = {
  /** Visually hidden caption for screen readers */
  caption: string
  /** Column headings, excluding the leading row-label column */
  columns: ReactNode[]
  rows: ComparisonRow[]
}

/**
 * Feature-by-feature comparison matrix: the first column names the criterion
 * and is highlighted; the remaining columns are the options being compared.
 * Scrolls horizontally on narrow viewports instead of squeezing the cells.
 */
const ComparisonTable = ({ caption, columns, rows }: ComparisonTableProps) => (
  <div className="w-full overflow-x-auto">
    <Table variant="highlight-first-column" className="min-w-2xl">
      <TableCaption className="sr-only">{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <span className="sr-only">{caption}</span>
          </TableHead>
          {columns.map((column, idx) => (
            <TableHead key={idx}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ label, cells }, rowIdx) => (
          <TableRow key={rowIdx}>
            <TableCell>{label}</TableCell>
            {cells.map((cell, cellIdx) => (
              <TableCell key={cellIdx}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

export default ComparisonTable
