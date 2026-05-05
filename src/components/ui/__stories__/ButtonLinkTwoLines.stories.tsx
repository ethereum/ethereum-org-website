import { ChevronRight, Circle, Download } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { ButtonLinkTwoLines } from "../buttons/ButtonTwoLines"
import { HStack, Stack } from "../flex"

const meta = {
  title: "UI / ButtonLinkTwoLines",
  component: ButtonLinkTwoLines,
  args: {
    icon: Circle,
    mainText: "Main text",
    helperText: "Helper text",
    href: "#",
    className: "w-[300px]",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Anchor variant of `ButtonTwoLines`. Same `variant`, `size`, `iconAlignment`, `reverseTextOrder`. Inherits `BaseLink`'s auto-detected behaviors (external/file/hash).",
      },
    },
  },
} satisfies Meta<typeof ButtonLinkTwoLines>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <Stack className="gap-4">
      <ButtonLinkTwoLines variant="solid" {...args} />
      <ButtonLinkTwoLines variant="outline" {...args} />
    </Stack>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <Stack className="gap-4">
      <ButtonLinkTwoLines size="md" {...args} />
      <ButtonLinkTwoLines size="sm" {...args} />
    </Stack>
  ),
}

export const VariantSizeMatrix: Story = {
  render: (args) => (
    <HStack className="items-start gap-4">
      <Stack className="gap-4">
        <ButtonLinkTwoLines variant="solid" size="md" {...args} />
        <ButtonLinkTwoLines variant="solid" size="sm" {...args} />
      </Stack>
      <Stack className="gap-4">
        <ButtonLinkTwoLines variant="outline" size="md" {...args} />
        <ButtonLinkTwoLines variant="outline" size="sm" {...args} />
      </Stack>
    </HStack>
  ),
}

export const ExternalLink: Story = {
  args: {
    href: "https://ethresear.ch",
    icon: ChevronRight,
    iconAlignment: "end",
    mainText: "ethresear.ch",
    helperText: "Opens in a new tab",
  },
}

export const FileDownload: Story = {
  args: {
    href: "/ethereum-whitepaper.pdf",
    icon: Download,
    mainText: "Whitepaper",
    helperText: "PDF, 2.4 MB",
  },
}

export const ReverseTextOrder: Story = {
  args: { reverseTextOrder: true },
}
