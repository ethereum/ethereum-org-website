import { memo, useCallback, useRef, useState } from "react"

import type { WalletRow } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import WalletInfo from "./WalletInfo"

type RowProps = {
  wallet: WalletRow
  index: number
  open: boolean
  visible: boolean
  onOpenChange: (open: boolean, wallet: WalletRow) => void
  children?: React.ReactNode
}

const Row = memo(function Row({
  wallet,
  index,
  open,
  visible,
  onOpenChange,
  children,
}: RowProps) {
  const handleToggle = useCallback(
    (e: React.SyntheticEvent<HTMLDetailsElement>) => {
      onOpenChange(e.currentTarget.open, wallet)
    },
    [onOpenChange, wallet]
  )
  return (
    <details
      data-index={index}
      open={open}
      onToggle={handleToggle}
      className={cn(
        "group/collapsible flex w-full flex-col border-b open:bg-background-highlight hover:bg-background-highlight",
        !visible && "hidden"
      )}
    >
      <summary className="cursor-pointer list-none p-4 focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-primary-hover [&::-webkit-details-marker]:hidden">
        <WalletInfo wallet={wallet} />
      </summary>
      {open && <div className="p-4">{children}</div>}
    </details>
  )
})

type ListProps = {
  data: WalletRow[]
  // Rows whose id is not in `matchedIds` are display:none. Avoids
  // mount/unmount churn on filter changes.
  matchedIds: Set<string>
  renderSubComponent: (wallet: WalletRow, listIdx: number) => React.ReactNode
  matomoEventCategory: string
}

const List = ({
  data,
  matchedIds,
  renderSubComponent,
  matomoEventCategory,
  ...rest
}: ListProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const previousExpandedRef = useRef<Record<string, boolean>>({})

  const handleOpenChange = useCallback(
    (open: boolean, wallet: WalletRow) => {
      setExpanded((prev) => ({ ...prev, [wallet.id]: open }))

      if (!open) return

      const expandedOnce = previousExpandedRef.current[wallet.id]
      if (!expandedOnce) {
        trackCustomEvent({
          eventCategory: matomoEventCategory,
          eventAction: "expanded",
          eventName: wallet.id,
        })
      }
      previousExpandedRef.current = {
        ...previousExpandedRef.current,
        [wallet.id]: true,
      }
    },
    [matomoEventCategory]
  )

  return (
    <div {...rest}>
      {data.map((wallet, index) => {
        const open = !!expanded[wallet.id]
        return (
          <Row
            key={wallet.id}
            wallet={wallet}
            index={index}
            open={open}
            visible={matchedIds.has(wallet.id)}
            onOpenChange={handleOpenChange}
          >
            {open && renderSubComponent(wallet, index)}
          </Row>
        )
      })}
    </div>
  )
}

export default List
