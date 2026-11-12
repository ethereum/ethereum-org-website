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

const gas = getLesson("gas", "gas")!
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

const supply = getLesson("eth", "supply")!

/** Includes the supply-balance widget (snap slider, find where burn matches issuance) */
export const EtherSupply: Story = {
  args: {
    courseId: "eth",
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
