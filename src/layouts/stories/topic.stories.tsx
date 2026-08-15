import type { Meta, StoryObj } from "@storybook/nextjs"

import { staking } from "@/data/topics/staking"

import { langViewportModes, variantMode } from "@/storybook/modes"

import { TopicLayout } from "../Topic"

import {
  ArticleBody,
  CONTRIBUTORS,
  LANG,
  LAST_EDIT,
  TOC_ITEMS,
} from "./fixtures"

const meta = {
  title: "Layouts / Topic",
  component: TopicLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    chromatic: { modes: variantMode },
    docs: {
      description: {
        component:
          "The hub layout shared by the multi-page topic sections -- staking, use-cases, roadmap, upgrade, ai-agents. On top of `ContentLayout` it adds a hero built from frontmatter (`image`, `summaryPoints`, `buttons`) and a section dropdown for moving between sibling pages.\n\n`config` is a `TopicConfig` from `src/data/topics/` -- it supplies the dropdown items and the translation namespace, and the layout throws without it. The type marks it optional only so `TopicLayout` can sit in `layoutMapping` beside layouts that don't take one; the slug router never renders it without a successful config lookup. These stories use the real `staking` config rather than a hand-rolled fixture, so the dropdown keys resolve against the shipped `page-staking` namespace.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-screen-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TopicLayout>

export default meta

type Story = StoryObj<typeof meta>

const baseArgs = {
  slug: "/staking/",
  tocItems: TOC_ITEMS,
  lastEditLocaleTimestamp: LAST_EDIT,
  contributors: CONTRIBUTORS,
  contentNotTranslated: false,
  config: staking,
  frontmatter: {
    title: "Stake your ETH",
    description: "Earn rewards for helping secure Ethereum.",
    lang: LANG,
    image: "/images/staking/leslie-solo.png",
    alt: "",
    blurDataURL: "",
    summaryPoints: [
      "Staking secures the network and earns rewards.",
      "You can stake alone, through a pool, or with a service.",
      "Solo staking needs 32 ETH; pooled staking needs far less.",
    ],
  },
  children: <ArticleBody />,
}

// Carries the full responsive + RTL contract for the layout -- the other
// stories below only need to prove their variant renders.
export const Default: Story = {
  parameters: { chromatic: { modes: langViewportModes } },
  args: baseArgs,
}

export const WithSummaryProse: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`summary` replaces the bulleted `summaryPoints` with a single paragraph in the hero.",
      },
    },
  },
  args: {
    ...baseArgs,
    frontmatter: {
      ...baseArgs.frontmatter,
      summaryPoints: undefined,
      summary:
        "Staking is how Ethereum stays secure. Lock ETH, run or delegate a validator, and earn rewards for honest participation.",
    },
  },
}

export const WithoutDropdown: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`showDropdown: false` hides the sibling-page selector, for a topic rendered as a single page.",
      },
    },
  },
  args: {
    ...baseArgs,
    frontmatter: { ...baseArgs.frontmatter, showDropdown: false },
  },
}
