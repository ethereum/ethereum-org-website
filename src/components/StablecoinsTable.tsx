"use client"

import { Fragment, useState } from "react"

import type { StablecoinType } from "@/lib/types"

import { Image } from "@/components/Image"

import { cn } from "@/lib/utils/cn"

import { Button } from "./ui/buttons/Button"
import { Flex } from "./ui/flex"
import InlineLink from "./ui/Link"
import { LinkBox, LinkOverlay } from "./ui/link-box"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Tag } from "./ui/tag"

import useTranslation from "@/hooks/useTranslation"

export type TableRow = {
  name: string
  marketCap: string
  image?: string
  type: string
  url?: string
  symbol: string
  peg: string
}

export type StablecoinsTableProps = {
  content: Array<TableRow>
  hasError: boolean
}

const PAGE_SIZE = 10

const StablecoinsTable = ({ content, hasError }: StablecoinsTableProps) => {
  const { t } = useTranslation("page-stablecoins")

  const [visibleRows, setVisibleRows] = useState(PAGE_SIZE)

  const hasMoreRows = content.length > visibleRows
  const displayedContent = content.slice(0, visibleRows)

  const stablecoinsType: Record<StablecoinType, string> = {
    FIAT: t("page-stablecoins-stablecoins-table-type-fiat-backed"),
    CRYPTO: t("page-stablecoins-stablecoins-table-type-crypto-backed"),
    ASSET: t("page-stablecoins-stablecoins-table-type-precious-metals-backed"),
    ALGORITHMIC: t("page-stablecoins-algorithmic"),
  }

  return (
    <div className="mt-6 w-full overflow-x-auto">
      <Table variant="minimal" className="min-w-[520px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/5 whitespace-nowrap">
              {t("page-stablecoins-stablecoins-table-header-column-1")}
            </TableHead>
            <TableHead className="w-[30%] whitespace-nowrap">
              {t("page-stablecoins-stablecoins-table-header-column-2")}
            </TableHead>
            <TableHead className="w-[30%] text-end whitespace-nowrap">
              {t("page-stablecoins-stablecoins-table-header-column-3")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hasError && (
            <TableRow>
              <TableCell colSpan={3}>
                {t("page-stablecoins-table-error")}
              </TableCell>
            </TableRow>
          )}

          {displayedContent.map(
            ({ name, marketCap, image, type, url, symbol }, idx) => {
              const row = (
                <TableRow
                  className={cn(
                    url &&
                      "cursor-pointer transition-colors hover:bg-background-highlight"
                  )}
                >
                  <TableCell>
                    <Flex className="items-center gap-3">
                      {image && (
                        <Image
                          src={image}
                          alt=""
                          className="size-7 rounded-md"
                          sizes="28px"
                          width={28}
                          height={28}
                        />
                      )}
                      <span className="flex flex-col leading-tight">
                        {url ? (
                          <LinkOverlay asChild>
                            <InlineLink
                              href={url}
                              className="font-bold text-primary hover:underline"
                              aria-label={`${t("page-stablecoins-go-to")} ${name}`}
                            >
                              {name}
                            </InlineLink>
                          </LinkOverlay>
                        ) : (
                          <span className="font-bold">{name}</span>
                        )}
                        <span className="text-sm text-body-medium uppercase">
                          {symbol}
                        </span>
                      </span>
                    </Flex>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {marketCap}
                  </TableCell>
                  <TableCell className="text-end">
                    <Tag size="small" variant="outline">
                      {stablecoinsType[type]}
                    </Tag>
                  </TableCell>
                </TableRow>
              )

              return url ? (
                <LinkBox asChild key={idx}>
                  {row}
                </LinkBox>
              ) : (
                <Fragment key={idx}>{row}</Fragment>
              )
            }
          )}
        </TableBody>
      </Table>
      {hasMoreRows && (
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setVisibleRows((prev) => prev + PAGE_SIZE)}>
            {t("page-stablecoins-show-more")}
          </Button>
        </div>
      )}
    </div>
  )
}
export default StablecoinsTable
