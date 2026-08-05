import type { Meta, StoryObj } from "@storybook/nextjs"

import FeaturedText from "."

const meta = {
  title: "Components / FeaturedText",
  component: FeaturedText,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Marks a passage with a dashed primary border on the leading edge. Uses logical properties (`-ms-4` / `ps-4` / `border-s`), so the accent flips to the right edge in RTL. The negative inline-start margin pulls the border into the gutter, keeping the text itself aligned with the surrounding column.",
      },
    },
  },
} satisfies Meta<typeof FeaturedText>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="max-w-prose">
      <p>
        Ordinary paragraph above, for alignment reference against the featured
        block below.
      </p>
      <FeaturedText>
        <p>
          Ethereum is open to everyone. All you need is a wallet to participate.
        </p>
      </FeaturedText>
    </div>
  ),
}

export const RTL: Story = {
  parameters: {
    docs: {
      description: {
        story: "The dashed accent moves to the right edge in an RTL container.",
      },
    },
  },
  render: () => (
    <div dir="rtl" className="max-w-prose">
      <FeaturedText>
        <p>إيثريوم مفتوح للجميع. كل ما تحتاجه هو محفظة للمشاركة.</p>
      </FeaturedText>
    </div>
  ),
}
