"use client"

import { type ComponentType, useEffect } from "react"
import { useTranslations } from "next-intl"

import { Skeleton } from "@/components/ui/skeleton"

import type {
  CourseWidgetId,
  InteractiveStep as InteractiveStepData,
} from "@/data/courses"

import { stepPrompt } from "../theme"
import type { WidgetAnswer, WidgetProps } from "../widgets/types"
import WidgetShell from "../widgets/widget-shell"

import { preloadable } from "@/lib/courses/preloadable"

type WidgetModule =
  | ComponentType<WidgetProps>
  | { default: ComponentType<WidgetProps> }

/**
 * `graded` widgets are puzzles with a right answer, checked by the footer.
 * The rest are sandboxes: playing with them unlocks Continue, no verdict.
 * Each widget is its own chunk, and lesson pages send only the strings
 * listed for it in `WIDGET_KEYS` (`@/lib/courses/widgets`).
 */
const WIDGETS: Record<
  CourseWidgetId,
  { load: () => Promise<WidgetModule>; graded: boolean }
> = {
  "eip-sort": {
    load: () => import("../widgets/eip-sort-widget"),
    graded: true,
  },
  "client-bug": {
    load: () => import("../widgets/client-bug-widget"),
    graded: false,
  },
  "account-sort": {
    load: () => import("../widgets/account-sort-widget"),
    graded: true,
  },
  "account-rules": {
    load: () => import("../widgets/account-rules-widget"),
    graded: true,
  },
  "delegation-check": {
    load: () => import("../widgets/delegation-check-widget"),
    graded: true,
  },
  "key-pair": {
    load: () => import("../widgets/key-pair-widget"),
    graded: false,
  },
  "gas-fee": { load: () => import("../widgets/gas-fee-widget"), graded: true },
  "sign-verify": {
    load: () => import("../widgets/sign-verify-widget"),
    graded: false,
  },
  "block-builder": {
    load: () => import("../widgets/block-builder-widget"),
    graded: true,
  },
  "hash-playground": {
    load: () => import("../widgets/hash-playground-widget"),
    graded: false,
  },
  "chain-tamper": {
    load: () => import("../widgets/chain-tamper-widget"),
    graded: false,
  },
  "address-check": {
    load: () => import("../widgets/address-check-widget"),
    graded: true,
  },
  "custody-sort": {
    load: () => import("../widgets/custody-sort-widget"),
    graded: true,
  },
  "node-network": {
    load: () => import("../widgets/node-network-widget"),
    graded: false,
  },
  "node-world": {
    load: () =>
      import("../widgets/node-network-widget").then((m) => m.WorldNodesWidget),
    graded: false,
  },
  "next-page": {
    load: () => import("../widgets/next-page-widget"),
    graded: false,
  },
  "chain-sort": {
    load: () =>
      import("../widgets/blockchain-sort-skins").then((m) => m.ChainSortWidget),
    graded: true,
  },
  "track-sort": {
    load: () =>
      import("../widgets/blockchain-sort-skins").then((m) => m.TrackSortWidget),
    graded: true,
  },
  "finality-clock": {
    load: () => import("../widgets/finality-clock-widget"),
    graded: true,
  },
  "slot-calc": {
    load: () => import("../widgets/slot-calc-widget"),
    graded: true,
  },
  "base-fee": {
    load: () => import("../widgets/base-fee-widget"),
    graded: false,
  },
  "nonce-queue": {
    load: () => import("../widgets/nonce-queue-widget"),
    graded: false,
  },
  "ether-sort": {
    load: () =>
      import("../widgets/deeper-sort-skins").then((m) => m.EtherSortWidget),
    graded: true,
  },
  "validator-sort": {
    load: () =>
      import("../widgets/deeper-sort-skins").then((m) => m.ValidatorSortWidget),
    graded: true,
  },
  "gas-limit": {
    load: () => import("../widgets/gas-limit-widget"),
    graded: false,
  },
  "explorer-labels": {
    load: () => import("../widgets/explorer-labels-widget"),
    graded: true,
  },
  "unit-converter": {
    load: () => import("../widgets/unit-converter-widget"),
    graded: true,
  },
  "supply-balance": {
    load: () => import("../widgets/supply-balance-widget"),
    graded: true,
  },
  "wrap-eth": {
    load: () => import("../widgets/wrap-eth-widget"),
    graded: false,
  },
  "fee-lanes": {
    load: () => import("../widgets/fee-lanes-widget"),
    graded: false,
  },
  "parcel-pack": {
    load: () => import("../widgets/parcel-pack-widget"),
    graded: false,
  },
  "network-match": {
    load: () => import("../widgets/network-match-widget"),
    graded: true,
  },
  "bridge-move": {
    load: () =>
      import("../widgets/wrap-eth-widget").then((m) => m.BridgeMoveWidget),
    graded: false,
  },
  "wallet-network": {
    load: () => import("../widgets/wallet-network-widget"),
    graded: true,
  },
  "rollup-replay": {
    load: () => import("../widgets/rollup-replay-widget"),
    graded: false,
  },
  "fraud-challenge": {
    load: () => import("../widgets/fraud-challenge-widget"),
    graded: true,
  },
  "proof-check": {
    load: () => import("../widgets/proof-check-widget"),
    graded: false,
  },
  "exit-race": {
    load: () => import("../widgets/exit-race-widget"),
    graded: false,
  },
  "bridge-backing": {
    load: () => import("../widgets/bridge-backing-widget"),
    graded: false,
  },
  "call-sorter": {
    load: () => import("../widgets/call-sorter-widget"),
    graded: true,
  },
  "token-ledger": {
    load: () => import("../widgets/token-ledger-widget"),
    graded: true,
  },
  "approval-scope": {
    load: () => import("../widgets/approval-scope-widget"),
    graded: true,
  },
  "token-check": {
    load: () =>
      import("../widgets/pick-row-widget").then((m) => m.TokenCheckWidget),
    graded: true,
  },
  "backing-sort": {
    load: () => import("../widgets/backing-sort-widget"),
    graded: true,
  },
  "backing-vaults": {
    load: () => import("../widgets/backing-vaults-widget"),
    graded: false,
  },
  "token-lure": {
    load: () =>
      import("../widgets/pick-row-widget").then((m) => m.TokenLureWidget),
    graded: true,
  },
  "nft-ledger": {
    load: () => import("../widgets/nft-ledger-widget"),
    graded: true,
  },
  "nft-host": {
    load: () => import("../widgets/nft-host-widget"),
    graded: false,
  },
  "nft-proof": {
    load: () =>
      import("../widgets/pick-row-widget").then((m) => m.NftProofWidget),
    graded: true,
  },
  "name-check": {
    load: () =>
      import("../widgets/pick-row-widget").then((m) => m.NameCheckWidget),
    graded: true,
  },
  "nft-approval": {
    load: () => import("../widgets/nft-approval-widget"),
    graded: true,
  },
  "pool-swap": {
    load: () => import("../widgets/pool-swap-widget"),
    graded: false,
  },
  "swap-limit": {
    load: () => import("../widgets/swap-limit-widget"),
    graded: false,
  },
  collateral: {
    load: () => import("../widgets/collateral-widget"),
    graded: false,
  },
  "reward-sort": {
    load: () =>
      import("../widgets/using-sort-skins").then((m) => m.RewardSortWidget),
    graded: true,
  },
  "red-flag-sort": {
    load: () =>
      import("../widgets/using-sort-skins").then((m) => m.RedFlagSortWidget),
    graded: true,
  },
  "site-check": {
    load: () =>
      import("../widgets/address-check-widget").then((m) => m.SiteCheckWidget),
    graded: true,
  },
  "sign-request": {
    load: () =>
      import("../widgets/risk-spot-widget").then((m) => m.SignRequestWidget),
    graded: true,
  },
  "claim-site": {
    load: () =>
      import("../widgets/risk-spot-widget").then((m) => m.ClaimSiteWidget),
    graded: true,
  },
  "fee-meter": {
    load: () => import("../widgets/fee-meter-widget"),
    graded: false,
  },
  "next-block": {
    load: () => import("../widgets/next-block-widget"),
    graded: true,
  },
  "failed-sorter": {
    load: () =>
      import("../widgets/call-sorter-widget").then((m) => m.FailedSorterWidget),
    graded: true,
  },
  "jar-contract": {
    load: () => import("../widgets/jar-contract-widget"),
    graded: false,
  },
  "shared-notebook": {
    load: () => import("../widgets/shared-notebook-widget"),
    graded: false,
  },
  mailbox: { load: () => import("../widgets/mailbox-widget"), graded: false },
  "snack-machine": {
    load: () => import("../widgets/vending-machine-widget"),
    graded: false,
  },
  "cash-sort": {
    load: () => import("../widgets/sort-skins").then((m) => m.CashSortWidget),
    graded: true,
  },
  postage: { load: () => import("../widgets/postage-widget"), graded: true },
  "spare-key-sort": {
    load: () =>
      import("../widgets/sort-skins").then((m) => m.SpareKeySortWidget),
    graded: true,
  },
  "restore-wallet": {
    load: () => import("../widgets/restore-wallet-widget"),
    graded: false,
  },
  "phrase-sort": {
    load: () => import("../widgets/sort-skins").then((m) => m.PhraseSortWidget),
    graded: true,
  },
  "popup-sort": {
    load: () => import("../widgets/sort-skins").then((m) => m.PopupSortWidget),
    graded: true,
  },
}

/** Holds a widget's place, at about a widget's height, while it loads */
const WidgetLoading = () => {
  const tCommon = useTranslations("common")
  return (
    <WidgetShell className="min-h-80">
      <span role="status" className="sr-only">
        {tCommon("loading")}
      </span>
      <Skeleton className="flex-1 rounded-2xl" />
    </WidgetShell>
  )
}

const LOADABLE = Object.fromEntries(
  Object.entries(WIDGETS).map(([id, { load }]) => [
    id,
    preloadable(load, WidgetLoading),
  ])
) as Record<CourseWidgetId, ReturnType<typeof preloadable<WidgetProps>>>

export const isGradedWidget = (id: CourseWidgetId) => WIDGETS[id].graded

/** Fetches a lesson's widgets ahead of their steps, so none waits on its chunk */
export const PreloadWidgets = ({ ids }: { ids: CourseWidgetId[] }) => {
  useEffect(() => {
    // A failed preload is fetched again when the step renders
    for (const id of ids) LOADABLE[id].preload().catch(() => {})
  }, [ids])
  return null
}

interface InteractiveStepProps {
  step: InteractiveStepData
  keyFor: (suffix: string) => string
  onComplete: () => void
  onAnswer: (answer: WidgetAnswer | null) => void
  locked: boolean
  wrong: boolean
}

const InteractiveStep = ({
  step,
  keyFor,
  onComplete,
  onAnswer,
  locked,
  wrong,
}: InteractiveStepProps) => {
  const t = useTranslations("page-courses")
  const Widget = LOADABLE[step.widget].Component

  return (
    <div className="flex flex-col gap-6">
      <h2 className={stepPrompt}>{t(keyFor("prompt"))}</h2>
      <Widget
        onComplete={onComplete}
        onAnswer={onAnswer}
        locked={locked}
        wrong={wrong}
      />
    </div>
  )
}

export default InteractiveStep
