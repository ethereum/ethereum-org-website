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

const gas = getLesson("transactions", "gas")!
const keys = getLesson("wallets", "keys")!
const lifecycle = getLesson("transactions", "lifecycle")!

/** Includes the gas-fee slider widget */
export const GasFees: Story = {
  args: {
    courseId: "transactions",
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
    courseId: "transactions",
    lesson: lifecycle.lesson,
  },
}

const chain = getLesson("blockchain", "chain")!

/** Includes the chain-tamper widget */
export const BreakTheChain: Story = {
  args: {
    courseId: "blockchain",
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

const failed = getLesson("transactions", "failed")!

/** Includes the gas-limit widget (snap slider, find the lowest limit that succeeds) */
export const FailedTransactions: Story = {
  args: {
    courseId: "transactions",
    lesson: failed.lesson,
  },
}

const nodes = getLesson("blockchain", "nodes")!

/** Includes the node-network widget (switch nodes off and on, watch one sync) */
export const BlockchainNodes: Story = {
  args: {
    courseId: "blockchain",
    lesson: nodes.lesson,
  },
}

const supply = getLesson("ether", "supply")!

/** Includes the supply-balance widget (snap slider, find where burn matches issuance) */
export const EtherSupply: Story = {
  args: {
    courseId: "ether",
    lesson: supply.lesson,
  },
}

const contractWhat = getLesson("smart-contracts", "what")!

/** Includes the vending-machine sandbox (one purchase plus one rejected call unlocks Continue) */
export const SmartContractVendingMachine: Story = {
  args: {
    courseId: "smart-contracts",
    lesson: contractWhat.lesson,
  },
}

const wallets = getCourse("wallets")!

/** Course check (`exam`): one attempt per question, answer revealed, results and review at the end */
export const CourseCheck: Story = {
  args: {
    courseId: "wallets",
    lesson: { id: EXAM_ID, icon: "badge", steps: wallets.exam },
    exam: true,
    nextCourseId: "blockchain",
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
    courseId: "ether",
    lesson: onlySteps("ether", "supply", ["fill"]),
  },
}
