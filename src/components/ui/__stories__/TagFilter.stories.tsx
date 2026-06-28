import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import TagFilter, { type TagFilterProps } from "../tag-filter"

const meta = {
  title: "UI / TagFilter",
  component: TagFilter,
  decorators: [
    (Story) => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Controlled, presentational multi-select tag filter: a wrapping row of toggle chips with an optional show-more / show-less expander. Selection state and match semantics (AND vs OR) live in the parent -- the component only renders chips and reports toggles via `onChange`. The caller passes `[name, count]` entries already ordered and filtered to taste; `defaultVisible` controls how many show before the expander. Selected tags beyond the cutoff stay visible while collapsed so an active filter never disappears.",
      },
    },
  },
} satisfies Meta<typeof TagFilter>

export default meta

type Story = StoryObj

// Count-descending entries, the shape `getTagCounts` returns.
const TAGS: Array<[string, number]> = [
  ["solidity", 42],
  ["smart contracts", 31],
  ["security", 24],
  ["defi", 19],
  ["nft", 15],
  ["testing", 12],
  ["hardhat", 9],
  ["foundry", 7],
  ["layer 2", 6],
  ["oracles", 5],
  ["governance", 4],
  ["staking", 3],
  ["zk", 2],
  ["mev", 2],
]

const Controlled = ({
  initial = [],
  ...props
}: { initial?: Array<string> } & Omit<
  TagFilterProps,
  "value" | "onChange"
>) => {
  const [value, setValue] = useState<Array<string>>(initial)
  return <TagFilter {...props} value={value} onChange={setValue} />
}

export const Collapsed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With `defaultVisible`, tags beyond the cutoff collapse behind a show-more toggle that reports the hidden count.",
      },
    },
  },
  render: () => <Controlled tags={TAGS} defaultVisible={8} />,
}

export const Expanded: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "No `defaultVisible` -- every tag is shown and there is no expander.",
      },
    },
  },
  render: () => <Controlled tags={TAGS} />,
}

export const WithSelection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Selected chips render in the solid/active style. Match semantics are the parent's concern.",
      },
    },
  },
  render: () => (
    <Controlled tags={TAGS} defaultVisible={8} initial={["solidity", "defi"]} />
  ),
}

export const ActiveHiddenTag: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A selected tag that falls beyond `defaultVisible` (`mev`) stays pinned-visible while collapsed, so the active filter is never hidden.",
      },
    },
  },
  render: () => <Controlled tags={TAGS} defaultVisible={6} initial={["mev"]} />,
}

export const NoCount: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`showCount={false}` renders bare tag names without the occurrence count.",
      },
    },
  },
  render: () => <Controlled tags={TAGS} defaultVisible={8} showCount={false} />,
}
