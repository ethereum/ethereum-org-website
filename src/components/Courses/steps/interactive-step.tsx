"use client"

import { useTranslations } from "next-intl"
import type { ComponentType } from "react"

import type {
  CourseWidgetId,
  InteractiveStep as InteractiveStepData,
} from "@/data/courses"

import AddressCheckWidget from "../widgets/address-check-widget"
import ApprovalScopeWidget from "../widgets/approval-scope-widget"
import BlockBuilderWidget from "../widgets/block-builder-widget"
import CallSorterWidget from "../widgets/call-sorter-widget"
import ChainTamperWidget from "../widgets/chain-tamper-widget"
import CustodySortWidget from "../widgets/custody-sort-widget"
import ExplorerLabelsWidget from "../widgets/explorer-labels-widget"
import FinalityClockWidget from "../widgets/finality-clock-widget"
import GasFeeWidget from "../widgets/gas-fee-widget"
import GasLimitWidget from "../widgets/gas-limit-widget"
import HashPlaygroundWidget from "../widgets/hash-playground-widget"
import KeyPairWidget from "../widgets/key-pair-widget"
import NodeNetworkWidget from "../widgets/node-network-widget"
import SignVerifyWidget from "../widgets/sign-verify-widget"
import StakeVoteWidget from "../widgets/stake-vote-widget"
import SupplyBalanceWidget from "../widgets/supply-balance-widget"
import TokenLedgerWidget from "../widgets/token-ledger-widget"
import type { WidgetAnswer, WidgetProps } from "../widgets/types"
import UnitConverterWidget from "../widgets/unit-converter-widget"
import VendingMachineWidget from "../widgets/vending-machine-widget"
import WrapEthWidget from "../widgets/wrap-eth-widget"

/**
 * `graded` widgets are puzzles with a right answer, checked by the footer.
 * The rest are sandboxes: playing with them unlocks Continue, no verdict.
 */
const WIDGETS: Record<
  CourseWidgetId,
  { component: ComponentType<WidgetProps>; graded: boolean }
> = {
  "key-pair": { component: KeyPairWidget, graded: false },
  "gas-fee": { component: GasFeeWidget, graded: true },
  "sign-verify": { component: SignVerifyWidget, graded: false },
  "block-builder": { component: BlockBuilderWidget, graded: true },
  "hash-playground": { component: HashPlaygroundWidget, graded: false },
  "chain-tamper": { component: ChainTamperWidget, graded: false },
  "stake-vote": { component: StakeVoteWidget, graded: true },
  "address-check": { component: AddressCheckWidget, graded: true },
  "custody-sort": { component: CustodySortWidget, graded: true },
  "node-network": { component: NodeNetworkWidget, graded: false },
  "finality-clock": { component: FinalityClockWidget, graded: true },
  "gas-limit": { component: GasLimitWidget, graded: true },
  "explorer-labels": { component: ExplorerLabelsWidget, graded: true },
  "unit-converter": { component: UnitConverterWidget, graded: true },
  "supply-balance": { component: SupplyBalanceWidget, graded: true },
  "wrap-eth": { component: WrapEthWidget, graded: false },
  "vending-machine": { component: VendingMachineWidget, graded: false },
  "call-sorter": { component: CallSorterWidget, graded: true },
  "token-ledger": { component: TokenLedgerWidget, graded: true },
  "approval-scope": { component: ApprovalScopeWidget, graded: true },
}

export const isGradedWidget = (id: CourseWidgetId) => WIDGETS[id].graded

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
  const Widget = WIDGETS[step.widget].component

  return (
    <div className="flex flex-col gap-6">
      <h2 className="m-0 text-h3 font-black">{t(keyFor("prompt"))}</h2>
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
