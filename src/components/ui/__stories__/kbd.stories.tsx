import type { Meta, StoryObj } from "@storybook/nextjs"

import { HStack } from "../flex"
import KBD from "../kbd"

const meta = {
  title: "UI / KBD",
  component: KBD,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Keyboard key. Renders a real `<kbd>` with a primary outline, and is wired as the `kbd` MDX element so markdown docs get it for free. `align-middle` keeps it on the baseline when it sits inside a sentence.",
      },
    },
  },
} satisfies Meta<typeof KBD>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: "Esc" },
}

export const Combination: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A chord is separate `KBD` elements with the joining character as plain text between them.",
      },
    },
  },
  render: () => (
    <HStack className="items-center gap-1">
      <KBD>Ctrl</KBD>
      <span>+</span>
      <KBD>K</KBD>
    </HStack>
  ),
}

export const Inline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Inside running text -- the common case, since this backs the markdown `kbd` element.",
      },
    },
  },
  render: () => (
    <p className="max-w-prose">
      Press <KBD>/</KBD> to focus search, then <KBD>Enter</KBD> to open the
      first result. <KBD>Esc</KBD> closes the dialog.
    </p>
  ),
}
