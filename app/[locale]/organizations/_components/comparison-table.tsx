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
  /**
   * Names the table for screen readers. Rendered as a visually hidden
   * `<caption>` -- the visible name is the `<h2>` above the table, so keep this
   * distinct from that heading rather than repeating it.
   */
  caption: string
  /**
   * Heading for the criterion (first) column. The Figma frames leave this cell
   * empty on most pages; pass it where the design shows a label (e.g.
   * "Functions" on the tokenization matrix).
   */
  rowHeader?: ReactNode
  /** Column headings, excluding the leading criterion column */
  columns: ReactNode[]
  rows: ComparisonRow[]
}

/**
 * Feature-by-feature comparison matrix: the first column names the criterion
 * and is highlighted; the remaining columns are the options being compared.
 *
 * Each criterion is a `<th scope="row">` and each column heading a
 * `<th scope="col">`, so a screen reader announces both the row and the column
 * a verdict cell belongs to. A plain `<td>` grid would read as an unlabelled
 * wall of text, which is the whole point of a comparison matrix lost.
 *
 * `Table` supplies its own horizontal scroll container, so this component adds
 * none; `min-w-2xl` keeps the cells readable and lets that container scroll on
 * narrow viewports.
 */
const ComparisonTable = ({
  caption,
  rowHeader,
  columns,
  rows,
}: ComparisonTableProps) => (
  <Table variant="highlight-first-column" className="min-w-2xl">
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
          <TableHead scope="row">{label}</TableHead>
          {cells.map((cell, cellIdx) => (
            <TableCell key={cellIdx}>{cell}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default ComparisonTable
