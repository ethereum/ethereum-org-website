import type { StablecoinType } from "@/lib/types"

import { Image } from "@/components/Image"
import { Flex } from "@/components/ui/flex"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tag } from "@/components/ui/tag"

export type StablecoinRow = {
  name: string
  symbol: string
  /** Locale-formatted market capitalization */
  marketCap: string
  image?: string
  type: StablecoinType
}

type StablecoinsTableProps = {
  /** Visually hidden caption for screen readers */
  caption: string
  columns: {
    currency: string
    marketCap: string
    collateral: string
  }
  /** Translated label for each collateral type */
  typeLabels: Record<StablecoinType, string>
  rows: StablecoinRow[]
}

/**
 * Server-rendered top-N stablecoins table for the tokenization page: logo +
 * name/ticker, market cap and a collateral-type `Tag`. A static sibling of the
 * client `StablecoinsTable` on /stablecoins/ (no paging, no row links) so it
 * can sit inside a Server Component with pre-translated strings.
 *
 * `Table` supplies its own horizontal scroll container, so this component adds
 * none; `min-w-lg` keeps the cells readable and lets that container scroll on
 * narrow viewports.
 */
const StablecoinsTable = ({
  caption,
  columns,
  typeLabels,
  rows,
}: StablecoinsTableProps) => (
  <Table variant="minimal" className="min-w-lg">
    <TableCaption className="sr-only">{caption}</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/2 whitespace-nowrap">
          {columns.currency}
        </TableHead>
        <TableHead className="w-1/4 whitespace-nowrap">
          {columns.marketCap}
        </TableHead>
        <TableHead className="w-1/4 text-end whitespace-nowrap">
          {columns.collateral}
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map(({ name, symbol, marketCap, image, type }) => (
        <TableRow key={symbol}>
          <TableCell>
            <Flex className="items-center gap-3">
              {/* The logo slot is always rendered, empty or not: rows served
                  from the fallback snapshot carry no image, and collapsing the
                  slot would shift their text out of line with the rows that
                  do. `alt=""` because the adjacent cell text names the coin. */}
              <div className="size-10 shrink-0 overflow-hidden rounded-full">
                {image && <Image src={image} alt="" width={40} height={40} />}
              </div>
              <span className="flex flex-col leading-tight">
                <span className="font-bold">{name}</span>
                <span className="text-body-medium uppercase">{symbol}</span>
              </span>
            </Flex>
          </TableCell>
          <TableCell className="whitespace-nowrap">{marketCap}</TableCell>
          <TableCell className="text-end">
            <Tag size="small" variant="outline">
              {typeLabels[type]}
            </Tag>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default StablecoinsTable
