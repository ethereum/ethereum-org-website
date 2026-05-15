"use client"

import * as React from "react"
import { createContext, useContext } from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils/cn"

const baseStyles = {
  th: `
    text-start
    border-b
    border-body
    text-body
    normal-case
    align-bottom
    p-4
    text-sm
    font-semibold
    whitespace-normal
    break-words
  `,

  tr: `
    not-[:last-of-type]:[&_th]:border-e-2
    not-[:last-of-type]:[&_th]:border-e-background
    not-[:last-of-type]:[&_td]:border-e-2
    not-[:last-of-type]:[&_td]:border-e-background
  `,

  td: `
    p-4
    text-sm
    align-top
    whitespace-normal
    break-words
  `,

  tbody: `
    [&_tr]:align-top
    hover:[&_tr]:bg-background-highlight
  `,
}

const stripedTbody = "even:[&_tr]:bg-background-highlight"

const tableVariants = tv({
  slots: {
    table: "w-full min-w-[1100px] table-fixed",
    th: "",
    tr: "",
    td: "",
    tbody: "",
    thead: "",
  },

  variants: {
    variant: {
      simple: {
        thead: "bg-background-highlight",
        ...baseStyles,
      },

      "minimal-striped": {
        ...baseStyles,
        tbody: `${baseStyles.tbody} ${stripedTbody}`,
      },

      "simple-striped": {
        ...baseStyles,
        thead: "bg-background-highlight",
        tbody: `${baseStyles.tbody} ${stripedTbody}`,
      },

      minimal: {
        ...baseStyles,
      },

      product: {
        table: "caption-bottom text-sm table-fixed",

        thead: "[&_tr:last-child]:border-0",

        tbody: "[&_tr:last-child]:border-0",

        tr: `
          border-t
          transition-colors
          first-of-type:border-t-0
          hover:bg-muted/50
          data-[state=selected]:bg-muted
        `,

        th: `
          text-muted-foreground
          h-12
          px-4
          text-left
          align-middle
          font-medium
          whitespace-normal
          break-words
          [&:has([role=checkbox])]:pr-0
        `,

        td: `
          p-4
          align-middle
          whitespace-normal
          break-words
          [&:has([role=checkbox])]:pr-0
        `,
      },

      "highlight-first-column": {
        ...baseStyles,
        thead: "bg-background-highlight",

        td: `
          ${baseStyles.td}
          first:bg-background-highlight
          first:font-bold
        `,
      },
    },
  },

  defaultVariants: {
    variant: "simple",
  },
})

type TableVariants = VariantProps<typeof tableVariants>

type TableVariantsReturnType = ReturnType<typeof tableVariants>

type CellPropsWithAlign<C> = Omit<C, "align"> & {
  align?: React.CSSProperties["textAlign"]
}

const TableStylesContext = createContext<{
  [P in keyof TableVariantsReturnType]: TableVariantsReturnType[P]
}>(tableVariants())

const useTableStyles = () => useContext(TableStylesContext)

export type TableProps = React.HTMLAttributes<HTMLTableElement> & TableVariants

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, ...props }, ref) => {
    const tableVariantStyles = tableVariants({ variant })

    return (
      <TableStylesContext.Provider value={tableVariantStyles}>
        <div className="relative w-full overflow-x-auto">
          <table
            ref={ref}
            className={cn(tableVariantStyles.table(), className)}
            {...props}
          />
        </div>
      </TableStylesContext.Provider>
    )
  }
)

Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { thead } = useTableStyles()

  return <thead ref={ref} className={cn(thead(), className)} {...props} />
})

TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { tbody } = useTableStyles()

  return <tbody ref={ref} className={cn(tbody(), className)} {...props} />
})

TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
  const { tr } = useTableStyles()

  return <tr ref={ref} className={cn(tr(), className)} {...props} />
})

TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  CellPropsWithAlign<React.ThHTMLAttributes<HTMLTableCellElement>>
>(({ className, align, ...props }, ref) => {
  const { th } = useTableStyles()

  return (
    <th
      ref={ref}
      className={cn(th(), className)}
      style={{ textAlign: align }}
      {...props}
    />
  )
})

TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  CellPropsWithAlign<React.TdHTMLAttributes<HTMLTableCellElement>>
>(({ className, align, children, ...props }, ref) => {
  const { td } = useTableStyles()

  return (
    <td
      ref={ref}
      className={cn(td(), className)}
      style={{ textAlign: align }}
      {...props}
    >
      {children}
    </td>
  )
})

TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-body-medium", className)}
    {...props}
  />
))

TableCaption.displayName = "TableCaption"

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
}
