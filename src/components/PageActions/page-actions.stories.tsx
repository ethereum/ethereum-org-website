import type { Meta, StoryObj } from "@storybook/nextjs"

import PageActions from "."

const meta = {
  title: "Components / PageActions",
  component: PageActions,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "The row of per-page utilities that sits under an article: copy-page-as-markdown, edit-on-GitHub, and the listen-to player. Which controls appear is derived, not configured -- the player only renders when `getPlaylistBySlug(slug)` finds a playlist for the slug, so passing a slug without one is the normal case rather than an error state.",
      },
    },
  },
} satisfies Meta<typeof PageActions>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { slug: "/developers/docs/intro-to-ethereum/" },
}

export const WithEditPath: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`editPath` points the GitHub link at a specific source file rather than the slug-derived default.",
      },
    },
  },
  args: {
    slug: "/developers/docs/intro-to-ethereum/",
    editPath:
      "https://github.com/ethereum/ethereum-org-website/tree/dev/public/content/developers/docs/intro-to-ethereum/index.md",
  },
}

export const EditButtonHidden: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`hideEditButton` drops the GitHub link -- used on pages whose source isn't editable in this repo.",
      },
    },
  },
  args: { slug: "/developers/docs/intro-to-ethereum/", hideEditButton: true },
}

export const Translated: Story = {
  parameters: {
    docs: {
      description: {
        story: "`isTranslated` marks the page as having localized content.",
      },
    },
  },
  args: { slug: "/developers/docs/intro-to-ethereum/", isTranslated: true },
}
