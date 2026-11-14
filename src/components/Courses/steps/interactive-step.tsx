"use client"

import { useTranslations } from "next-intl"
import type { ComponentType } from "react"

import type {
  CourseWidgetId,
  InteractiveStep as InteractiveStepData,
} from "@/data/courses"

import { stepPrompt } from "../theme"
import AccountRulesWidget from "../widgets/account-rules-widget"
import AccountSortWidget from "../widgets/account-sort-widget"
import AddressCheckWidget, {
  SiteCheckWidget,
} from "../widgets/address-check-widget"
import ApprovalScopeWidget from "../widgets/approval-scope-widget"
import BackingSortWidget from "../widgets/backing-sort-widget"
import BackingVaultsWidget from "../widgets/backing-vaults-widget"
import BaseFeeWidget from "../widgets/base-fee-widget"
import BlockBuilderWidget from "../widgets/block-builder-widget"
import {
  ChainSortWidget,
  TrackSortWidget,
} from "../widgets/blockchain-sort-skins"
import BridgeBackingWidget from "../widgets/bridge-backing-widget"
import CallSorterWidget, {
  FailedSorterWidget,
} from "../widgets/call-sorter-widget"
import ChainTamperWidget from "../widgets/chain-tamper-widget"
import ClientBugWidget from "../widgets/client-bug-widget"
import CollateralWidget from "../widgets/collateral-widget"
import CustodySortWidget from "../widgets/custody-sort-widget"
import {
  EtherSortWidget,
  ValidatorSortWidget,
} from "../widgets/deeper-sort-skins"
import DelegationCheckWidget from "../widgets/delegation-check-widget"
import EipSortWidget from "../widgets/eip-sort-widget"
import ExitRaceWidget from "../widgets/exit-race-widget"
import ExplorerLabelsWidget from "../widgets/explorer-labels-widget"
import FeeLanesWidget from "../widgets/fee-lanes-widget"
import FeeMeterWidget from "../widgets/fee-meter-widget"
import FinalityClockWidget from "../widgets/finality-clock-widget"
import FraudChallengeWidget from "../widgets/fraud-challenge-widget"
import GasFeeWidget from "../widgets/gas-fee-widget"
import GasLimitWidget from "../widgets/gas-limit-widget"
import HashPlaygroundWidget from "../widgets/hash-playground-widget"
import JarContractWidget from "../widgets/jar-contract-widget"
import KeyPairWidget from "../widgets/key-pair-widget"
import MailboxWidget from "../widgets/mailbox-widget"
import NetworkMatchWidget from "../widgets/network-match-widget"
import NextBlockWidget from "../widgets/next-block-widget"
import NextPageWidget from "../widgets/next-page-widget"
import NftApprovalWidget from "../widgets/nft-approval-widget"
import NftHostWidget from "../widgets/nft-host-widget"
import NftLedgerWidget from "../widgets/nft-ledger-widget"
import NodeNetworkWidget, {
  WorldNodesWidget,
} from "../widgets/node-network-widget"
import NonceQueueWidget from "../widgets/nonce-queue-widget"
import ParcelPackWidget from "../widgets/parcel-pack-widget"
import {
  NameCheckWidget,
  NftProofWidget,
  TokenCheckWidget,
  TokenLureWidget,
} from "../widgets/pick-row-widget"
import PoolSwapWidget from "../widgets/pool-swap-widget"
import PostageWidget from "../widgets/postage-widget"
import ProofCheckWidget from "../widgets/proof-check-widget"
import RestoreWalletWidget from "../widgets/restore-wallet-widget"
import { ClaimSiteWidget, SignRequestWidget } from "../widgets/risk-spot-widget"
import RollupReplayWidget from "../widgets/rollup-replay-widget"
import SharedNotebookWidget from "../widgets/shared-notebook-widget"
import SignVerifyWidget from "../widgets/sign-verify-widget"
import {
  CashSortWidget,
  PhraseSortWidget,
  PopupSortWidget,
  SpareKeySortWidget,
} from "../widgets/sort-skins"
import SupplyBalanceWidget from "../widgets/supply-balance-widget"
import SwapLimitWidget from "../widgets/swap-limit-widget"
import TokenLedgerWidget from "../widgets/token-ledger-widget"
import type { WidgetAnswer, WidgetProps } from "../widgets/types"
import UnitConverterWidget from "../widgets/unit-converter-widget"
import {
  RedFlagSortWidget,
  RewardSortWidget,
} from "../widgets/using-sort-skins"
import SnackMachineWidget from "../widgets/vending-machine-widget"
import WalletNetworkWidget from "../widgets/wallet-network-widget"
import WrapEthWidget, { BridgeMoveWidget } from "../widgets/wrap-eth-widget"

/**
 * `graded` widgets are puzzles with a right answer, checked by the footer.
 * The rest are sandboxes: playing with them unlocks Continue, no verdict.
 */
const WIDGETS: Record<
  CourseWidgetId,
  { component: ComponentType<WidgetProps>; graded: boolean }
> = {
  "eip-sort": { component: EipSortWidget, graded: true },
  "client-bug": { component: ClientBugWidget, graded: false },
  "account-sort": { component: AccountSortWidget, graded: true },
  "account-rules": { component: AccountRulesWidget, graded: true },
  "delegation-check": { component: DelegationCheckWidget, graded: true },
  "key-pair": { component: KeyPairWidget, graded: false },
  "gas-fee": { component: GasFeeWidget, graded: true },
  "sign-verify": { component: SignVerifyWidget, graded: false },
  "block-builder": { component: BlockBuilderWidget, graded: true },
  "hash-playground": { component: HashPlaygroundWidget, graded: false },
  "chain-tamper": { component: ChainTamperWidget, graded: false },
  "address-check": { component: AddressCheckWidget, graded: true },
  "custody-sort": { component: CustodySortWidget, graded: true },
  "node-network": { component: NodeNetworkWidget, graded: false },
  "node-world": { component: WorldNodesWidget, graded: false },
  "next-page": { component: NextPageWidget, graded: false },
  "chain-sort": { component: ChainSortWidget, graded: true },
  "track-sort": { component: TrackSortWidget, graded: true },
  "finality-clock": { component: FinalityClockWidget, graded: true },
  "base-fee": { component: BaseFeeWidget, graded: false },
  "nonce-queue": { component: NonceQueueWidget, graded: false },
  "ether-sort": { component: EtherSortWidget, graded: true },
  "validator-sort": { component: ValidatorSortWidget, graded: true },
  "gas-limit": { component: GasLimitWidget, graded: true },
  "explorer-labels": { component: ExplorerLabelsWidget, graded: true },
  "unit-converter": { component: UnitConverterWidget, graded: true },
  "supply-balance": { component: SupplyBalanceWidget, graded: true },
  "wrap-eth": { component: WrapEthWidget, graded: false },
  "fee-lanes": { component: FeeLanesWidget, graded: false },
  "parcel-pack": { component: ParcelPackWidget, graded: false },
  "network-match": { component: NetworkMatchWidget, graded: true },
  "bridge-move": { component: BridgeMoveWidget, graded: false },
  "wallet-network": { component: WalletNetworkWidget, graded: true },
  "rollup-replay": { component: RollupReplayWidget, graded: false },
  "fraud-challenge": { component: FraudChallengeWidget, graded: true },
  "proof-check": { component: ProofCheckWidget, graded: false },
  "exit-race": { component: ExitRaceWidget, graded: false },
  "bridge-backing": { component: BridgeBackingWidget, graded: false },
  "call-sorter": { component: CallSorterWidget, graded: true },
  "token-ledger": { component: TokenLedgerWidget, graded: true },
  "approval-scope": { component: ApprovalScopeWidget, graded: true },
  "token-check": { component: TokenCheckWidget, graded: true },
  "backing-sort": { component: BackingSortWidget, graded: true },
  "backing-vaults": { component: BackingVaultsWidget, graded: false },
  "token-lure": { component: TokenLureWidget, graded: true },
  "nft-ledger": { component: NftLedgerWidget, graded: true },
  "nft-host": { component: NftHostWidget, graded: false },
  "nft-proof": { component: NftProofWidget, graded: true },
  "name-check": { component: NameCheckWidget, graded: true },
  "nft-approval": { component: NftApprovalWidget, graded: true },
  "pool-swap": { component: PoolSwapWidget, graded: false },
  "swap-limit": { component: SwapLimitWidget, graded: true },
  collateral: { component: CollateralWidget, graded: false },
  "reward-sort": { component: RewardSortWidget, graded: true },
  "red-flag-sort": { component: RedFlagSortWidget, graded: true },
  "site-check": { component: SiteCheckWidget, graded: true },
  "sign-request": { component: SignRequestWidget, graded: true },
  "claim-site": { component: ClaimSiteWidget, graded: true },
  "fee-meter": { component: FeeMeterWidget, graded: false },
  "next-block": { component: NextBlockWidget, graded: true },
  "failed-sorter": { component: FailedSorterWidget, graded: true },
  "jar-contract": { component: JarContractWidget, graded: false },
  "shared-notebook": { component: SharedNotebookWidget, graded: false },
  mailbox: { component: MailboxWidget, graded: false },
  "snack-machine": { component: SnackMachineWidget, graded: false },
  "cash-sort": { component: CashSortWidget, graded: true },
  postage: { component: PostageWidget, graded: true },
  "spare-key-sort": { component: SpareKeySortWidget, graded: true },
  "restore-wallet": { component: RestoreWalletWidget, graded: false },
  "phrase-sort": { component: PhraseSortWidget, graded: true },
  "popup-sort": { component: PopupSortWidget, graded: true },
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
