import { memo, useCallback, useRef, useState } from "react"

import type { FilterOption, Wallet } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import WalletInfo from "../FindWalletProductTable/WalletInfo"

type RowProps<T extends { id: string }> = {
  item: T
  index: number
  open: boolean
  visible: boolean
  onOpenChange: (open: boolean, item: T) => void
  subComponent?: (
    item: T,
    filters: FilterOption[],
    listIdx: number
  ) => React.ReactNode
  filters: FilterOption[]
}

const RowImpl = <T extends { id: string }>({
  item,
  index,
  open,
  visible,
  onOpenChange,
  subComponent,
  filters,
}: RowProps<T>) => {
  const handleToggle = useCallback(
    (e: React.SyntheticEvent<HTMLDetailsElement>) => {
      onOpenChange(e.currentTarget.open, item)
    },
    [onOpenChange, item]
  )
  return (
    <details
      data-index={index}
      open={open}
      onToggle={handleToggle}
      className={cn(
        "group/collapsible flex w-full flex-col border-b open:bg-background-highlight hover:bg-background-highlight",
        // tailwind-merge keeps only the last display utility, so `hidden`
        // wins over `flex` when filtered out — the row stays mounted but
        // is removed from layout.
        !visible && "hidden"
      )}
    >
      <summary className="cursor-pointer list-none p-4 [&::-webkit-details-marker]:hidden">
        <WalletInfo wallet={item as unknown as Wallet} />
      </summary>
      <div className="p-4">{open && subComponent?.(item, filters, index)}</div>
    </details>
  )
}

const Row = memo(RowImpl) as typeof RowImpl

type ListProps<T extends { id: string }> = {
  data: T[]
  // When provided, every row in `data` is rendered, but rows whose id is
  // not in `matchedIds` are display:none. Avoids mount/unmount churn on
  // filter changes. When omitted, all rows are visible (legacy behavior).
  matchedIds?: Set<string>
  subComponent?: (
    item: T,
    filters: FilterOption[],
    listIdx: number
  ) => React.ReactNode
  matomoEventCategory: string
  filters: FilterOption[]
}

const List = <T extends { id: string }>({
  data,
  matchedIds,
  subComponent,
  matomoEventCategory,
  filters,
  ...rest
}: ListProps<T>) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const previousExpandedRef = useRef<Record<string, boolean>>({})

  const handleOpenChange = useCallback(
    (open: boolean, item: T) => {
      setExpanded((prev) => ({ ...prev, [item.id]: open }))

      if (!open) return

      const expandedOnce = previousExpandedRef.current[item.id]
      if (!expandedOnce) {
        trackCustomEvent({
          eventCategory: matomoEventCategory,
          eventAction: "expanded",
          eventName: item.id,
        })
      }
      previousExpandedRef.current = {
        ...previousExpandedRef.current,
        [item.id]: true,
      }
    },
    [matomoEventCategory]
  )

  return (
    <div {...rest}>
      {data.map((item, index) => (
        <Row<T>
          key={item.id}
          item={item}
          index={index}
          open={!!expanded[item.id]}
          visible={!matchedIds || matchedIds.has(item.id)}
          onOpenChange={handleOpenChange}
          subComponent={subComponent}
          filters={filters}
        />
      ))}
    </div>
  )
}

export default List
