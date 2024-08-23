import * as React from "react"
import { createContext, useContext } from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils/cn"

/**
 * TODO: Currently, there are cell spacing issues with some table content.
 * Prefer `table-fixed` utility class in the future when content has been addressed
 * to provide equal cell widths.
 */

const tableVariants = tv({
  slots: {
    table: "w-full",
    th: "text-start border-b-[1px] border-body text-body normal-case align-bottom p-4",
    tr: "not-[:last-of-type]:[&_th]:border-e-2 not-[:last-of-type]:[&_th]:border-e-background not-[:last-of-type]:[&_td]:border-e-2 not-[:last-of-type]:[&_td]:border-e-background",
    td: "p-4",
    tbody: "[&_tr]:align-top hover:[&_tr]:bg-background-highlight",
    // slot key with empty string to establish the key name for variants (TypeScript)
    thead: "",
  },
  variants: {
    variant: {
      simple: {
        thead: "bg-background-highlight",
      },
      "minimal-striped": {
        tbody: "even:[&_tr]:bg-background-highlight",
      },
      "simple-striped": {
        thead: "bg-background-highlight",
        tbody: "even:[&_tr]:bg-background-highlight",
      },
      minimal: {},
    },
  },
  defaultVariants: {
    variant: "simple",
  },
})

type TableVariants = VariantProps<typeof tableVariants>

type TableVariantsReturnType = ReturnType<typeof tableVariants>

/**
 * For `TableCell` and `TableHead` only
 *
 * Applies the `align` prop in name for the `textAlign` CSS property
 * instead of the `align` attribute. (The `align` attribute is deprecated)
 */
type CellPropsWithAlign<C> = Omit<C, "align"> & {
  align?: React.CSSProperties["textAlign"]
}

const TableStylesContext = createContext<{
  [P in keyof TableVariantsReturnType]: TableVariantsReturnType[P]
}>(tableVariants())

const useTableStyles = () => useContext(TableStylesContext)

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & TableVariants
>(({ className, variant, ...props }, ref) => {
  const tableVariantStyles = tableVariants({ variant })

  return (
    <TableStylesContext.Provider value={tableVariantStyles}>
      <div className="relative w-full overflow-auto whitespace-normal">
        <table
          ref={ref}
          className={cn(tableVariantStyles.table(), className)}
          {...props}
        />
      </div>
    </TableStylesContext.Provider>
  )
})
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

const mdxTableComponents = {
  table: Table,
  td: ({ align, ...rest }) => <TableCell align={align} {...rest} />,
  th: ({ align, ...rest }) => <TableHead align={align} {...rest} />,
  tr: (props) => <TableRow {...props} />,
  tbody: (props) => <TableBody {...props} />,
  thead: (props) => <TableHeader {...props} />,
}

export {
  mdxTableComponents,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
}
