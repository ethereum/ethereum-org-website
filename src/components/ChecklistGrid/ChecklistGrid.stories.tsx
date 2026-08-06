import { Meta, StoryObj } from "@storybook/nextjs"

import ChecklistGrid from "."

const meta = {
  title: "Components / ChecklistGrid",
  component: ChecklistGrid,
  parameters: {
    docs: {
      description: {
        component:
          "Tinted two-column panel of check-marked value props, shared across pages (e.g. /developers and /community). The caller supplies already-translated `items`; the panel owns the check icon, tint, and layout.",
      },
    },
  },
} satisfies Meta<typeof ChecklistGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        heading: "Room for every skill",
        description:
          "Design, writing, community, research, operations. Ethereum runs on far more than code, and it needs your kind of talent.",
      },
      {
        heading: "Back your own idea",
        description:
          "Have a project or community of your own? Grants across the ecosystem help you grow your vision.",
      },
      {
        heading: "Build what lasts",
        description:
          "Contribute to open, public infrastructure that can't be silenced by governments, corporations, or algorithms.",
      },
      {
        heading: "Digital sovereignty",
        description:
          "Own your identity, assets, and creations online without relying on platforms that can delete you.",
      },
    ],
  },
}
