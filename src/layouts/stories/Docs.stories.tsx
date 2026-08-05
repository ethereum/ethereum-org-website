import type { Meta, StoryObj } from "@storybook/nextjs"

import { langViewportModes } from "@/storybook/modes"

import { DocsLayout } from "../Docs"

import {
  ArticleBody,
  CONTRIBUTORS,
  LANG,
  LAST_EDIT,
  TOC_ITEMS,
} from "./fixtures"

const meta = {
  title: "Layouts / Docs",
  component: DocsLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    // DocsNav does `pathname.indexOf(...)` to mark the active page; without a
    // router pathname that read is null and the layout throws.
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/developers/docs/" },
    },
    chromatic: { modes: { ...langViewportModes } },
    docs: {
      description: {
        component:
          "The developer-docs layout (`/developers/docs/**`). Adds the docs side navigation and the previous/next pager to the article column, and owns the `docsComponents` MDX registry.\n\nThe distinguishing behavior is `frontmatter.incomplete`, which raises a banner warning readers the page is unfinished -- worth seeing, because it is the only layout that self-labels its own content as untrustworthy.",
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
} satisfies Meta<typeof DocsLayout>

export default meta

type Story = StoryObj<typeof meta>

const baseArgs = {
  slug: "/developers/docs/",
  tocItems: TOC_ITEMS,
  lastEditLocaleTimestamp: LAST_EDIT,
  contributors: CONTRIBUTORS,
  contentNotTranslated: false,
  frontmatter: {
    title: "Ethereum developer resources",
    description: "A developer's starting point.",
    lang: LANG,
  },
  children: <ArticleBody />,
}

export const Default: Story = { args: baseArgs }

export const Incomplete: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`frontmatter.incomplete` raises the page-incomplete banner above the article.",
      },
    },
  },
  args: {
    ...baseArgs,
    frontmatter: { ...baseArgs.frontmatter, incomplete: true },
  },
}

export const NotTranslated: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`contentNotTranslated` pins the article to `dir="ltr"` while the surrounding chrome follows the locale.',
      },
    },
  },
  args: { ...baseArgs, contentNotTranslated: true },
}
