import type { Meta, StoryObj } from "@storybook/nextjs"

import { EXAM_ID, getCourse, getLesson } from "@/data/courses"

import LessonPlayer from "../lesson-player"

const meta = {
  title: "Components / Features / Courses / LessonPlayer",
  component: LessonPlayer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    // PoC: still changing too fast for visual snapshots to be worth the quota
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Runs one lesson from `src/data/courses`: concept, choice, order, match, fill and interactive steps, with Brilliant-style check/feedback and a completion screen. Completing a lesson writes XP and streak to localStorage (`ethereum-org-course-progress`), so playing a story to the end changes the progress shown on `/courses`. All strings come from the `page-courses` namespace by key convention; a missing key renders as its raw key tail.",
      },
    },
  },
} satisfies Meta<typeof LessonPlayer>

export default meta

type Story = StoryObj<typeof meta>

const gas = getLesson("gas", "units")!
const keys = getLesson("wallets", "keys")!
const lifecycle = getLesson("sending", "lifecycle")!

/** Includes the gas-fee slider widget */
export const GasFees: Story = {
  args: {
    courseId: "gas",
    lesson: gas.lesson,
  },
}

/** Includes the key-pair widget (viem, loaded on demand) */
export const WalletKeys: Story = {
  args: {
    courseId: "wallets",
    lesson: keys.lesson,
    nextLessonId: keys.next?.id,
  },
}

/** Includes the drag-and-drop / tap-to-order step */
export const TransactionLifecycle: Story = {
  args: {
    courseId: "sending",
    lesson: lifecycle.lesson,
  },
}

const chain = getLesson("blockchains", "chain")!

/** Includes the chain-tamper widget */
export const BreakTheChain: Story = {
  args: {
    courseId: "blockchains",
    lesson: chain.lesson,
  },
}

const custody = getLesson("wallets", "custody")!

/** Includes the custody-sort widget (tap-to-place, three groups) */
export const WhoHoldsTheKeys: Story = {
  args: {
    courseId: "wallets",
    lesson: custody.lesson,
  },
}

const failed = getLesson("gas", "failed")!

/** Includes the gas-limit widget (snap slider, find the lowest limit that succeeds) */
export const FailedTransactions: Story = {
  args: {
    courseId: "gas",
    lesson: failed.lesson,
  },
}

const nodes = getLesson("blockchains", "nodes")!

/** Includes the node-network widget (switch nodes off and on, watch one sync) */
export const BlockchainNodes: Story = {
  args: {
    courseId: "blockchains",
    lesson: nodes.lesson,
  },
}

const consensus = getLesson("blockchains", "consensus")!

/** Includes the next-page widget (puzzle race vs locked-up ETH, try to cheat) */
export const AgreeingOnTheNextPage: Story = {
  args: {
    courseId: "blockchains",
    lesson: consensus.lesson,
  },
}

const running = getLesson("ethereum", "running")!

/** Includes the node-network widget's Ethereum skin (try to switch it off) */
export const WhoKeepsEthereumRunning: Story = {
  args: {
    courseId: "ethereum",
    lesson: running.lesson,
  },
}

const baseFee = getLesson("gas", "fees")!

/** Includes the base-fee widget (add full, half-full or empty blocks) */
export const BaseFee: Story = {
  args: {
    courseId: "gas",
    lesson: baseFee.lesson,
  },
}

const stuck = getLesson("gas", "stuck")!

/** Includes the nonce-queue widget (replace the stuck transaction) */
export const StuckTransaction: Story = {
  args: {
    courseId: "gas",
    lesson: stuck.lesson,
  },
}

const penalties = getLesson("proof-of-stake", "penalties")!

/** Includes the validator-sort widget (sort skin, three groups) */
export const ValidatorPenalties: Story = {
  args: {
    courseId: "proof-of-stake",
    lesson: penalties.lesson,
  },
}

const ethWhat = getLesson("eth", "what")!

/** Includes the ether-sort widget (Ethereum the network or ETH the money) */
export const EthereumVsEth: Story = {
  args: {
    courseId: "eth",
    lesson: ethWhat.lesson,
  },
}

const supply = getLesson("eth", "supply")!

/** Includes the supply-balance widget (snap slider, find where burn matches issuance) */
export const EtherSupply: Story = {
  args: {
    courseId: "eth",
    lesson: supply.lesson,
  },
}

const contractWhat = getLesson("smart-contracts", "what")!

/** Includes the jar-contract sandbox (a payout, a refused creator and a refused edit unlock Continue) */
export const SmartContractJar: Story = {
  args: {
    courseId: "smart-contracts",
    lesson: contractWhat.lesson,
  },
}

/** Sending course: the number-free fee-meter sandbox (find all three outcomes) */
export const SendingFees: Story = {
  args: {
    courseId: "sending",
    lesson: getLesson("sending", "fees")!.lesson,
  },
}

/** Sending course: the next-block puzzle (fill a block with the biggest tips) */
export const SendingLine: Story = {
  args: {
    courseId: "sending",
    lesson: getLesson("sending", "line")!.lesson,
  },
}

/** Sending course: `failed-sorter`, the call sorter's failed-payment set */
export const SendingFailed: Story = {
  args: {
    courseId: "sending",
    lesson: getLesson("sending", "failed")!.lesson,
  },
}

/** Everyday course: the shared-notebook sandbox (add a line, then edit an old one) */
export const EverydayNotebook: Story = {
  args: {
    courseId: "everyday",
    lesson: getLesson("everyday", "notebook")!.lesson,
  },
}

/** Everyday course: the mailbox sandbox (drop a letter, try a wrong key, open) */
export const EverydayMailbox: Story = {
  args: {
    courseId: "everyday",
    lesson: getLesson("everyday", "mailbox")!.lesson,
  },
}

/** Everyday course: `snack-machine`, the vending machine with coins */
export const EverydaySnackMachine: Story = {
  args: {
    courseId: "everyday",
    lesson: getLesson("everyday", "machine")!.lesson,
  },
}

/** Everyday course: `cash-sort`, a two-group skin of the sort widget */
export const EverydayCashSort: Story = {
  args: {
    courseId: "everyday",
    lesson: getLesson("everyday", "cash")!.lesson,
  },
}

/** Everyday course: the postage puzzle (more stamps for bigger parcels, the check inside never counts) */
export const EverydayPostage: Story = {
  args: {
    courseId: "everyday",
    lesson: getLesson("everyday", "stamp")!.lesson,
  },
}

/** Everyday course: `spare-key-sort`, where to hide a spare key */
export const EverydaySpareKeySort: Story = {
  args: {
    courseId: "everyday",
    lesson: getLesson("everyday", "undo")!.lesson,
  },
}

/** Wallets course: the restore-wallet sandbox (viem, loaded on demand) and `phrase-sort` */
export const WalletRecovery: Story = {
  args: {
    courseId: "wallets",
    lesson: getLesson("wallets", "recovery")!.lesson,
  },
}

/** Wallets course: `popup-sort`, a three-group skin of the sort widget */
export const WalletConnectSignSend: Story = {
  args: {
    courseId: "wallets",
    lesson: getLesson("wallets", "connect")!.lesson,
  },
}

/** Layer 2 course: `fee-lanes` (quiet or busy day, Ethereum or a layer 2) */
export const Layer2Lanes: Story = {
  args: {
    courseId: "layer-2",
    lesson: getLesson("layer-2", "lanes")!.lesson,
  },
}

/** Layer 2 course: `parcel-pack` (two trips of different sizes) */
export const Layer2Parcels: Story = {
  args: {
    courseId: "layer-2",
    lesson: getLesson("layer-2", "parcels")!.lesson,
  },
}

/** Layer 2 course: `network-match` (graded, one network per payment) */
export const Layer2Networks: Story = {
  args: {
    courseId: "layer-2",
    lesson: getLesson("layer-2", "networks")!.lesson,
  },
}

/** Layer 2 course: `bridge-move`, the wrap-eth widget as a bridge with coin icons */
export const Layer2Bridge: Story = {
  args: {
    courseId: "layer-2",
    lesson: getLesson("layer-2", "bridge")!.lesson,
  },
}

/** Layer 2 course: `wallet-network` (graded, spot the network on a wallet screen) */
export const Layer2Check: Story = {
  args: {
    courseId: "layer-2",
    lesson: getLesson("layer-2", "check")!.lesson,
  },
}

/** Rollups course: `rollup-replay` (rebuild state from the posted batch) */
export const RollupsPosted: Story = {
  args: {
    courseId: "rollups",
    lesson: getLesson("rollups", "posted")!.lesson,
  },
}

/** Rollups course: `fraud-challenge` (graded, challenge the bad batch) */
export const RollupsOptimistic: Story = {
  args: {
    courseId: "rollups",
    lesson: getLesson("rollups", "optimistic")!.lesson,
  },
}

/** Rollups course: `proof-check` (verify, tamper, verify again) */
export const RollupsZk: Story = {
  args: {
    courseId: "rollups",
    lesson: getLesson("rollups", "zk")!.lesson,
  },
}

/** Rollups course: `exit-race` (own bridge vs fast bridge, through time) */
export const RollupsExits: Story = {
  args: {
    courseId: "rollups",
    lesson: getLesson("rollups", "exits")!.lesson,
  },
}

/** Rollups course: `bridge-backing` (redeem, exploit, redeem again) */
export const RollupsRisk: Story = {
  args: {
    courseId: "rollups",
    lesson: getLesson("rollups", "risk")!.lesson,
  },
}

/** Trading and lending: `pool-swap` sandbox (bigger trade, worse price) */
export const TradingPool: Story = {
  args: {
    courseId: "trading-and-lending",
    lesson: getLesson("trading-and-lending", "pool")!.lesson,
  },
}

/** Trading and lending: `swap-limit` puzzle (pick a price limit, see two cases) */
export const TradingLimit: Story = {
  args: {
    courseId: "trading-and-lending",
    lesson: getLesson("trading-and-lending", "limit")!.lesson,
  },
}

/** Trading and lending: `collateral` sandbox (borrow, then let the deposit drop) */
export const TradingBorrow: Story = {
  args: {
    courseId: "trading-and-lending",
    lesson: getLesson("trading-and-lending", "borrow")!.lesson,
  },
}

/** Trading and lending: `reward-sort`, a four-group skin of the sort widget */
export const TradingRewards: Story = {
  args: {
    courseId: "trading-and-lending",
    lesson: getLesson("trading-and-lending", "rewards")!.lesson,
  },
}

/** Scams: `red-flag-sort`, a four-group skin of the sort widget */
export const ScamsPlaybook: Story = {
  args: {
    courseId: "scams",
    lesson: getLesson("scams", "playbook")!.lesson,
  },
}

/** Scams: `site-check`, the address-check puzzle with web addresses */
export const ScamsLookalike: Story = {
  args: {
    courseId: "scams",
    lesson: getLesson("scams", "lookalike")!.lesson,
  },
}

/** Scams: `sign-request`, a skin of the risk-spot widget (flag every risky row) */
export const ScamsSignatures: Story = {
  args: {
    courseId: "scams",
    lesson: getLesson("scams", "signatures")!.lesson,
  },
}

/** Scams: `claim-site`, a skin of the risk-spot widget (a free token's claim page) */
export const ScamsBait: Story = {
  args: {
    courseId: "scams",
    lesson: getLesson("scams", "bait")!.lesson,
  },
}

const wallets = getCourse("wallets")!

/** Course check (`exam`): one attempt per question, answer revealed, results and review at the end */
export const CourseCheck: Story = {
  args: {
    courseId: "wallets",
    lesson: { id: EXAM_ID, steps: wallets.exam },
    exam: true,
    nextCourseId: "blockchains",
  },
}

/** How Ethereum changes: `eip-sort`, a two-group skin of the sort widget */
export const UpgradesEipSort: Story = {
  args: {
    courseId: "upgrades",
    lesson: getLesson("upgrades", "eips")!.lesson,
  },
}

/** How Ethereum changes: the client-bug sandbox (break a client in three networks) */
export const UpgradesClientBug: Story = {
  args: {
    courseId: "upgrades",
    lesson: getLesson("upgrades", "clients")!.lesson,
  },
}

/** Smart accounts: the account-rules puzzle (pick rules for three situations) */
export const SmartAccountRules: Story = {
  args: {
    courseId: "smart-accounts",
    lesson: getLesson("smart-accounts", "rules")!.lesson,
  },
}

/** Smart accounts: the delegation-check puzzle (spot the dangerous request) */
export const SmartAccountDelegationCheck: Story = {
  args: {
    courseId: "smart-accounts",
    lesson: getLesson("smart-accounts", "risks")!.lesson,
  },
}

const onlySteps = (courseId: string, lessonId: string, types: string[]) => {
  const { lesson } = getLesson(courseId, lessonId)!
  return {
    ...lesson,
    steps: lesson.steps.filter(({ type }) => types.includes(type)),
  }
}

/** Match step on its own: tap a term, then its match */
export const MatchPairs: Story = {
  args: {
    courseId: "wallets",
    lesson: onlySteps("wallets", "custody", ["match"]),
  },
}

/** Fill step on its own: tap words from the bank into the gaps */
export const FillTheGaps: Story = {
  args: {
    courseId: "eth",
    lesson: onlySteps("eth", "supply", ["fill"]),
  },
}

/** Tokens course: `token-check`, pick the real token by its contract address */
export const TokensRealToken: Story = {
  args: {
    courseId: "tokens",
    lesson: onlySteps("tokens", "name", ["interactive"]),
  },
}

/** Tokens course: `backing-vaults` sandbox (drop the price until both vaults fall short) */
export const TokensBackingVaults: Story = {
  args: {
    courseId: "tokens",
    lesson: onlySteps("tokens", "steady", ["interactive"]),
  },
}

/** NFTs course: `nft-host` sandbox (take the picture host offline) */
export const NftsPictureHost: Story = {
  args: {
    courseId: "nfts",
    lesson: onlySteps("nfts", "own", ["interactive"]),
  },
}

/** NFTs course: `nft-approval`, pick the narrowest listing permission */
export const NftsApproveAll: Story = {
  args: {
    courseId: "nfts",
    lesson: onlySteps("nfts", "approve", ["interactive"]),
  },
}
