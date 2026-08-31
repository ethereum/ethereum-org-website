import type { Meta, StoryObj } from "@storybook/nextjs"

import Blockquote from "../blockquote"

const meta = {
  title: "UI / Blockquote",
  component: Blockquote,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Quoted passage on a tinted accent-a panel with a leading border. Wired as the `blockquote` MDX element, so markdown `>` quotes render through this -- it is rarely imported directly in app code. The leading border uses the logical `border-s` so it flips in RTL.",
      },
    },
  },
} satisfies Meta<typeof Blockquote>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children:
      "Ethereum is a technology that's home to digital money, global payments, and applications.",
  },
}

export const MultipleParagraphs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`space-y-[1lh]` puts exactly one line-height between children, so a multi-paragraph quote keeps the surrounding text rhythm.",
      },
    },
  },
  render: () => (
    <Blockquote>
      <p>
        The community has built a booming digital economy, bold new ways for
        creators to earn online, and so much more.
      </p>
      <p>
        It&apos;s open to everyone, wherever you are in the world -- all you
        need is the internet.
      </p>
    </Blockquote>
  ),
}

export const WithAttribution: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Attribution is not a built-in slot -- compose it as a child, since `Blockquote` passes through to a plain `<blockquote>`.",
      },
    },
  },
  render: () => (
    <Blockquote>
      <p>Ethereum is whatever we want it to be.</p>
      <footer className="text-sm text-body-medium">-- the community</footer>
    </Blockquote>
  ),
}
