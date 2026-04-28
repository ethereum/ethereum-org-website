import { memo, useCallback, useRef, useState } from "react"

import type { FilterOption, Wallet } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import WalletInfo from "../FindWalletProductTable/WalletInfo"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

type RowProps<T extends { id: string }> = {
  item: T
  index: number
  open: boolean
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
  onOpenChange,
  subComponent,
  filters,
}: RowProps<T>) => {
  const handleOpen = useCallback(
    (next: boolean) => onOpenChange(next, item),
    [onOpenChange, item]
  )
  return (
    <Collapsible
      data-index={index}
      open={open}
      onOpenChange={handleOpen}
      className="group/collapsible flex w-full cursor-pointer flex-col border-b hover:bg-background-highlight data-[state=open]:bg-background-highlight"
    >
      <CollapsibleTrigger asChild>
        <div className="p-4">
          <WalletInfo wallet={item as unknown as Wallet} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        {open && subComponent?.(item, filters, index)}
      </CollapsibleContent>
    </Collapsible>
  )
}

const Row = memo(RowImpl) as typeof RowImpl

type ListProps<T extends { id: string }> = {
  data: T[]
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
          onOpenChange={handleOpenChange}
          subComponent={subComponent}
          filters={filters}
        />
      ))}
    </div>
  )
}

export default List
