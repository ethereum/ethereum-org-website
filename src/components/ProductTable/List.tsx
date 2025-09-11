import { useLayoutEffect, useRef } from "react"
import { useCallback } from "react"
import { useWindowVirtualizer } from "@tanstack/react-virtual"

import type { FilterOption, Wallet } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import WalletInfo from "../FindWalletProductTable/WalletInfo"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

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
}: ListProps<T>) => {
  const parentRef = useRef<HTMLDivElement>(null)

  const parentOffsetRef = useRef(0)

  const virtualizer = useWindowVirtualizer({
    count: data.length,
    estimateSize: () => 300,
    overscan: 5,
    scrollMargin: parentOffsetRef.current,
  })

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0
  }, [])

  const previousExpandedRef = useRef<Record<string, boolean>>({})

  const handleExpandedChange = useCallback(
    (open: boolean, item: T) => {
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
    <div
      ref={parentRef}
      className="relative [overflow-anchor:none]"
      style={{
        height: `${virtualizer.getTotalSize()}px`,
      }}
    >
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const item = data[virtualItem.index]

        return (
          <Collapsible
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            className="group/collapsible absolute left-0 top-0 flex w-full cursor-pointer flex-col border-b hover:bg-background-highlight data-[state=open]:bg-background-highlight"
            style={{
              transform: `translateY(${virtualItem.start - virtualizer.options.scrollMargin}px)`,
            }}
            onOpenChange={(open) => handleExpandedChange(open, item)}
          >
            <CollapsibleTrigger asChild>
              <div className="p-4">
                <WalletInfo wallet={item as unknown as Wallet} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t p-4">
              {subComponent?.(item as T, filters, virtualItem.index)}
            </CollapsibleContent>
          </Collapsible>
        )
      })}
    </div>
  )
}

export default List
