"use client"

import { Suspense, useState } from "react"
import { ExternalLink, ListFilter } from "lucide-react"

import type { StablecoinType } from "@/lib/types"

import { Image } from "@/components/Image"

import { cn } from "@/lib/utils/cn"
import { scrollIntoView } from "@/lib/utils/scrollIntoView"

import { Button, ButtonLink } from "./ui/buttons/Button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Flex } from "./ui/flex"
import { Skeleton } from "./ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

import { useRtlFlip } from "@/hooks/useRtlFlip"
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
  const [visibleTypes, setVisibleTypes] = useState<
    Record<StablecoinType, boolean>
  >({
    FIAT: true,
    CRYPTO: true,
    ASSET: true,
    ALGORITHMIC: true,
  })

  const { twFlipForRtl } = useRtlFlip()

  const uniquePegsWithCount = Object.values(content).reduce(
    (acc, { peg }) => {
      const existingPeg = acc.find((item) => item.peg === peg)
      if (existingPeg) {
        existingPeg.count++
      } else {
        acc.push({ peg, count: 1 })
      }
      return acc
    },
    [] as Array<{ peg: string; count: number }>
  )

  uniquePegsWithCount.sort((a, b) => b.count - a.count)

  const uniquePegs = uniquePegsWithCount.map((item) => item.peg)

  const [visiblePegs, setVisiblePegs] = useState<Record<string, boolean>>(
    Object.fromEntries(uniquePegs.map((peg) => [peg, true]))
  )

  const filteredContent = content.filter(
    (item) => visibleTypes[item.type] && visiblePegs[item.peg]
  )

  const hasMoreRows = filteredContent.length > visibleRows
  const displayedContent = filteredContent.slice(0, visibleRows)

  const stablecoinsType: Record<StablecoinType, string> = {
    FIAT: t("page-stablecoins-stablecoins-table-type-fiat-backed"),
    CRYPTO: t("page-stablecoins-stablecoins-table-type-crypto-backed"),
    ASSET: t("page-stablecoins-stablecoins-table-type-precious-metals-backed"),
    ALGORITHMIC: t("page-stablecoins-algorithmic"),
  }

  const typeFilters: { id: StablecoinType; label: string }[] = [
    { id: "FIAT", label: stablecoinsType.FIAT },
    { id: "CRYPTO", label: stablecoinsType.CRYPTO },
    { id: "ASSET", label: stablecoinsType.ASSET },
    { id: "ALGORITHMIC", label: stablecoinsType.ALGORITHMIC },
  ]

  // Peg filters sorted by most common (uniquePegsWithCount is already sorted)
  const pegFilters = uniquePegsWithCount.map((item) => ({
    id: item.peg,
    label: item.peg,
  }))

  const noFiltersActive = Object.values(visibleTypes).every((value) => !value)

  const toggleType = (type: string) => {
    setVisibleTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const selectOnlyType = (type: string) => {
    setVisibleTypes(
      Object.fromEntries(
        Object.keys(visibleTypes).map((k) => [k, k === type])
      ) as Record<StablecoinType, boolean>
    )
  }

  const showAllTypes = () => {
    setVisibleTypes(
      Object.fromEntries(
        Object.keys(visibleTypes).map((k) => [k, true])
      ) as Record<StablecoinType, boolean>
    )
  }

  const togglePeg = (peg: string) => {
    setVisiblePegs((prev) => ({
      ...prev,
      [peg]: !prev[peg],
    }))
  }

  const selectOnlyPeg = (peg: string) => {
    setVisiblePegs(
      Object.fromEntries(Object.keys(visiblePegs).map((k) => [k, k === peg]))
    )
  }

  const showAllPegs = () => {
    setVisiblePegs(
      Object.fromEntries(Object.keys(visiblePegs).map((k) => [k, true]))
    )
  }

  const resetFilters = () => {
    showAllTypes()
    showAllPegs()
  }
  const resetState = () => {
    setVisibleRows(PAGE_SIZE)
    resetFilters()
    scrollIntoView("#stablecoin-markets", { behavior: "instant" })
  }

  // Count active filters for type and peg
  const activeTypeCount = Object.values(visibleTypes).filter(Boolean).length
  const activePegCount = Object.values(visiblePegs).filter(Boolean).length
  const totalTypeCount = Object.keys(visibleTypes).length
  const totalPegCount = Object.keys(visiblePegs).length
  const isTouched =
    Object.values(visibleTypes).some((v) => !v) ||
    Object.values(visiblePegs).some((v) => !v) ||
    visibleRows > PAGE_SIZE

  const columns = [
    t("page-stablecoins-stablecoins-table-header-column-1"),
    <div key="market-cap-header" className="text-end">
      {t("page-stablecoins-stablecoins-table-header-column-2")}
    </div>,
    <DropdownMenu key="type-filter">
      <DropdownMenuTrigger className="ms-auto flex items-center gap-2 text-end">
        {t("page-stablecoins-stablecoins-table-header-column-3")}
        {activeTypeCount !== totalTypeCount && (
          <span className="self-baseline text-sm text-body-medium">
            ({activeTypeCount})
          </span>
        )}
        <ListFilter className="size-[1em]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {typeFilters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center justify-between pr-2"
          >
            <DropdownMenuCheckboxItem
              checked={visibleTypes[filter.id]}
              onCheckedChange={() => toggleType(filter.id)}
            >
              {filter.label}
            </DropdownMenuCheckboxItem>
            <Button
              variant="link"
              size="sm"
              className="h-auto px-1 py-0 text-xs text-body-medium no-underline hover:underline"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                selectOnlyType(filter.id)
              }}
            >
              (only)
            </Button>
          </div>
        ))}
        {Object.values(visibleTypes).some((v) => !v) && (
          <div className="mt-2 flex justify-center">
            <Button
              variant="link"
              size="sm"
              className="text-xs text-body-medium no-underline hover:underline"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                showAllTypes()
              }}
            >
              Show all
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>,
    <DropdownMenu key="peg-filter">
      <DropdownMenuTrigger className="ms-auto flex items-center gap-2 text-end">
        {t("page-stablecoins-stablecoins-table-header-column-4")}
        {activePegCount !== totalPegCount && (
          <span className="text-xs text-body-medium">({activePegCount})</span>
        )}
        <ListFilter className="size-[1em]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {pegFilters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center justify-between pr-2"
          >
            <DropdownMenuCheckboxItem
              checked={visiblePegs[filter.id]}
              onCheckedChange={() => togglePeg(filter.id)}
            >
              {filter.label}
            </DropdownMenuCheckboxItem>
            <Button
              variant="link"
              size="sm"
              className="h-auto px-1 py-0 text-xs text-body-medium no-underline hover:underline"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                selectOnlyPeg(filter.id)
              }}
            >
              (only)
            </Button>
          </div>
        ))}
        {Object.values(visiblePegs).some((v) => !v) && (
          <div className="mt-2 flex justify-center">
            <Button
              variant="link"
              size="sm"
              className="text-xs text-body-medium no-underline hover:underline"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                showAllPegs()
              }}
            >
              Show all
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>,
  ]

  return (
    <div className="mx-auto w-full max-w-screen-xl overflow-x-auto px-8 py-4">
      <Table className="my-8 min-w-[720px] bg-background">
        <TableHeader>
          <Suspense fallback={<Skeleton className="h-8 w-full" />}>
            <TableRow>
              {columns.map((column, idx) => (
                <TableHead key={idx}>{column}</TableHead>
              ))}
              {content && content[0]?.url && (
                <TableHead className="text-end font-normal">
                  <ExternalLink
                    className={cn("inline-block size-[1.125em]", twFlipForRtl)}
                  />
                </TableHead>
              )}
            </TableRow>
          </Suspense>
        </TableHeader>
        <Suspense fallback={<Skeleton className="h-8 w-full" />}>
          <TableBody>
            {hasError && (
              <TableRow className="p-4">
                <TableCell colSpan={4}>
                  {t("page-stablecoins-table-error")}
                </TableCell>
              </TableRow>
            )}

            {noFiltersActive && (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center">
                  {t("page-stablecoins-no-results")}
                </TableCell>
              </TableRow>
            )}

            {displayedContent.map(
              ({ name, marketCap, image, type, url, symbol, peg }, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Flex>
                      {image && (
                        <Image
                          src={image}
                          alt=""
                          className="me-4 h-6 w-6"
                          width={24}
                          height={24}
                        />
                      )}
                      <span>
                        {name}{" "}
                        <span className="text-sm uppercase text-body-medium">
                          {symbol}
                        </span>
                      </span>
                    </Flex>
                  </TableCell>
                  <TableCell className="text-end">{marketCap}</TableCell>
                  <TableCell className="text-end">
                    {stablecoinsType[type]}
                  </TableCell>
                  <TableCell className="text-end">{peg}</TableCell>
                  {url && (
                    <TableCell className="text-right">
                      <ButtonLink href={url} size="sm" hideArrow>
                        {t("page-stablecoins-go-to")} {name}
                      </ButtonLink>
                    </TableCell>
                  )}
                </TableRow>
              )
            )}
          </TableBody>
        </Suspense>
      </Table>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {hasMoreRows && (
          <div className="mt-4 flex justify-center">
            <Button onClick={() => setVisibleRows((prev) => prev + PAGE_SIZE)}>
              {t("page-stablecoins-show-more")}
            </Button>
          </div>
        )}
        {isTouched && (
          <div className="mt-4 flex justify-center">
            <Button variant="outline" onClick={resetState}>
              {t("page-stablecoins-reset-list")}
            </Button>
          </div>
        )}
      </div>
      {displayedContent.length === 0 && !noFiltersActive && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="mb-4 text-lg text-body-medium">
            {t("page-stablecoins-no-results")}
          </p>
          <Button variant="outline" onClick={resetFilters}>
            {t("page-stablecoins-reset-list")}
          </Button>
        </div>
      )}
    </div>
  )
}
export default StablecoinsTable
