import type { Meta, StoryObj } from "@storybook/nextjs"

import HR from "../hr"

const meta = {
  title: "UI / HR",
  component: HR,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "The canonical horizontal rule, also wired as the `hr` MDX element. Always carries `my-space-3x` vertical rhythm, so it spaces itself -- don't add margins at the call site. For dividing content inside a component (menu, button group), reach for `Separator` instead.\n\nThe `narrow` variant and the `Divider` named export are deprecated and deliberately not shown -- a rendered example reads as an endorsement. Use a plain `<HR />`.",
      },
    },
  },
} satisfies Meta<typeof HR>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "No props -- a plain full-width rule. This is the going-forward separator.",
      },
    },
  },
  render: () => (
    <div className="w-full">
      <p>Above the rule.</p>
      <HR />
      <p>Below the rule.</p>
    </div>
  ),
}

export const Indented: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`position="indent"` insets both ends by the responsive page gutter (`mx-page`). Only for a full-bleed rule -- inside an already-padded section it doubles the gutter. The inset uses margin, not padding: a default `HR` draws its line as the top border, which spans the full border-box and ignores padding.',
      },
    },
  },
  render: () => (
    <div className="w-full">
      <HR position="indent" />
    </div>
  ),
}
