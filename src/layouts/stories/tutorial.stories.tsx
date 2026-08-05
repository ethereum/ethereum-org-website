import type { Meta, StoryObj } from "@storybook/nextjs"

import { langViewportModes } from "@/storybook/modes"

import { TutorialLayout } from "../Tutorial"

import {
  ArticleBody,
  CONTRIBUTORS,
  LANG,
  LAST_EDIT,
  TOC_ITEMS,
} from "./fixtures"

const meta = {
  title: "Layouts / Tutorial",
  component: TutorialLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    chromatic: { modes: { ...langViewportModes } },
    docs: {
      description: {
        component:
          "The community-tutorial layout (`/developers/tutorials/**`). Its header carries the things a tutorial needs and an article doesn't: author attribution, skill level, tags, and `timeToRead`.\n\n`timeToRead` is a required prop rather than frontmatter -- it's computed from the source at build time, not authored. The edit button is suppressed automatically for `latest/` slugs, since those are mirrored from external sources.",
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
} satisfies Meta<typeof TutorialLayout>

export default meta

type Story = StoryObj<typeof meta>

const baseArgs = {
  slug: "/developers/tutorials/",
  tocItems: TOC_ITEMS,
  lastEditLocaleTimestamp: LAST_EDIT,
  contributors: CONTRIBUTORS,
  contentNotTranslated: false,
  timeToRead: 8,
  frontmatter: {
    title: "Sign and verify a message",
    description: "Prove control of an address without spending anything.",
    lang: LANG,
    author: "Ethereum community",
    published: "2025-04-20",
    skill: "beginner",
    tags: ["wallets", "signatures", "javascript"],
  },
  children: <ArticleBody />,
}

export const Default: Story = { args: baseArgs }

export const WithSourceAttribution: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`source` and `sourceUrl` credit a tutorial republished from elsewhere.",
      },
    },
  },
  args: {
    ...baseArgs,
    frontmatter: {
      ...baseArgs.frontmatter,
      source: "Ethereum Foundation blog",
      sourceUrl: "https://blog.ethereum.org",
    },
  },
}

export const LongRead: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A larger `timeToRead` and an advanced skill tag -- checks that the header metadata row holds its shape as values grow.",
      },
    },
  },
  args: {
    ...baseArgs,
    timeToRead: 45,
    frontmatter: {
      ...baseArgs.frontmatter,
      skill: "advanced",
      tags: ["solidity", "testing", "foundry", "gas optimization", "security"],
    },
  },
}
