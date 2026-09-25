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
  /**
   * What the table sits on. `page` (default) fills the header row and criterion
   * column with `bg-background-highlight` to separate them from the page.
   *
   * Pass `tint` on a coloured band: those fills are page-coloured, so on a tint
   * they read as grey patches stamped over the band, and the cell separators
   * (also page-coloured) read as stray lines. On a tint the band itself already
   * separates the table from the page, so weight alone carries the headers.
   */
  surface?: "page" | "tint"
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
  surface = "page",
}: ComparisonTableProps) => {
  const onTint = surface === "tint"

  return (
    <Table
      // `minimal` drops both the header fill and the cell separators, which are
      // the two page-coloured treatments that misread on a band.
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
            {/* On a tint the criterion column loses its fill, so weight is what
                distinguishes it from the cells beside it. `border-b-0` drops
                the `th` underline, which without the fill behind it reads as a
                stray rule under each label rather than a column edge. */}
            <TableHead
              scope="row"
              className={onTint ? "border-b-0 font-bold" : undefined}
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
