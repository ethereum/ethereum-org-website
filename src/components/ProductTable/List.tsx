import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { useWindowVirtualizer } from "@tanstack/react-virtual"

import type { FilterOption, Wallet } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import WalletInfo from "../FindWalletProductTable/WalletInfo"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

const SSR_ROW_COUNT = 30

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
  const [isMounted, setIsMounted] = useState(false)

  const parentRef = useRef<HTMLDivElement>(null)
  const parentOffsetRef = useRef(0)

  const virtualizer = useWindowVirtualizer({
    count: data.length,
    estimateSize: () => 300,
    overscan: 5,
    scrollMargin: parentOffsetRef.current,
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0
  }, [])

  const previousExpandedRef = useRef<Record<string, boolean>>({})

  const handleExpandedChange = useCallback(
    (open: boolean, item: T) => {
      // Disable scroll position adjustment during expansion or collapse
      // ref https://github.com/TanStack/virtual/issues/562#issuecomment-2065858040
      virtualizer.shouldAdjustScrollPositionOnItemSizeChange = () => false
      setTimeout(() => {
        virtualizer.shouldAdjustScrollPositionOnItemSizeChange = undefined
      }, 0)

      setExpanded((prev) => ({
        ...prev,
        [item.id]: open,
      }))

      if (!open) return

      // the following code is used to track the first time a wallet is expanded
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
    [matomoEventCategory, virtualizer]
  )

  if (!isMounted) {
    return (
      <div ref={parentRef} {...rest}>
        {data.slice(0, SSR_ROW_COUNT).map((item, index) => (
          <Collapsible
            key={item.id}
            data-index={index}
            open={!!expanded[item.id]}
            onOpenChange={(open) => handleExpandedChange(open, item)}
            className="group/collapsible flex w-full cursor-pointer flex-col border-b hover:bg-background-highlight data-[state=open]:bg-background-highlight"
          >
            <CollapsibleTrigger asChild>
              <div className="p-4">
                <WalletInfo wallet={item as unknown as Wallet} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4">
              {subComponent?.(item, filters, index)}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={parentRef}
      className="relative [overflow-anchor:none]"
      style={{
        height: `${virtualizer.getTotalSize()}px`,
      }}
      {...rest}
    >
      {virtualizer.getVirtualItems().map((virtualItem) => {
        const item = data[virtualItem.index]

        return (
          <Collapsible
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            // the virtualizer will re-render the item and reset the open state
            // so we need to preserve the open state when the item is unmounted
            open={!!expanded[item.id]}
            onOpenChange={(open) => handleExpandedChange(open, item)}
            className="group/collapsible absolute top-0 left-0 flex w-full cursor-pointer flex-col border-b hover:bg-background-highlight data-[state=open]:bg-background-highlight"
            style={{
              transform: `translateY(${virtualItem.start - virtualizer.options.scrollMargin}px)`,
            }}
          >
            <CollapsibleTrigger asChild>
              <div className="p-4">
                <WalletInfo wallet={item as unknown as Wallet} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4">
              {subComponent?.(item as T, filters, virtualItem.index)}
            </CollapsibleContent>
          </Collapsible>
        )
      })}
    </div>
  )
}

export default List
