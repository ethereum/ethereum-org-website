import type { Meta, StoryObj } from "@storybook/nextjs"

import { BaseLink } from "../Link"
import { LinkBox, LinkOverlay } from "../link-box"

const meta = {
  title: "UI / LinkBox",
  component: LinkBox,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Whole-card-clickable pattern. `LinkBox` is the positioned wrapper (`relative z-10`); `LinkOverlay` (built on `BaseLink`) places a `::before` pseudo-element across the entire box so any click within the card navigates. Other interactive children stay accessible because they have higher z-index.",
      },
    },
  },
} satisfies Meta<typeof LinkBox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <LinkBox className="block w-[320px] rounded-md border p-4 hover:bg-background-highlight">
      <h3 className="font-semibold">
        <LinkOverlay href="/layer-2">Layer 2 networks</LinkOverlay>
      </h3>
      <p className="mt-1 text-sm text-body-medium">
        Anywhere on this card is a click target. The overlay covers the whole
        box via the `before:absolute` pseudo-element.
      </p>
    </LinkBox>
  ),
}

export const WithNestedInteractive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Nested interactive elements (like a secondary link or button) need a higher stacking context to remain clickable. Use `relative z-10` on them.",
      },
    },
  },
  render: () => (
    <LinkBox className="flex w-[320px] items-start gap-3 rounded-md border p-4 hover:bg-background-highlight">
      <div className="flex-1">
        <h3 className="font-semibold">
          <LinkOverlay href="/dapps">Decentralized applications</LinkOverlay>
        </h3>
        <p className="mt-1 text-sm text-body-medium">
          Clicking the card navigates to dapps. The badge below stays
          independently clickable because it sits above the overlay.
        </p>
      </div>
      <BaseLink
        href="/dapps?filter=defi"
        className="relative z-10 rounded-full border bg-background px-2 py-1 text-xs no-underline hover:bg-background-highlight"
        hideArrow
      >
        DeFi
      </BaseLink>
    </LinkBox>
  ),
}

export const ExternalLink: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `LinkOverlay`'s href is external, `BaseLink` would normally apply `relative` positioning; `LinkOverlay` overrides this with `!static` so the `::before` overlay still anchors to the parent `LinkBox`.",
      },
    },
  },
  render: () => (
    <LinkBox className="block w-[320px] rounded-md border p-4 hover:bg-background-highlight">
      <h3 className="font-semibold">
        <LinkOverlay href="https://ethresear.ch">
          ethresear.ch (external)
        </LinkOverlay>
      </h3>
      <p className="mt-1 text-sm text-body-medium">
        Even with an external destination, the entire card is the click target.
      </p>
    </LinkBox>
  ),
}
