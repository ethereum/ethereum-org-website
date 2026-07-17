import { Check, Clipboard } from "lucide-react"
import { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "@/components/ui/flex"

import CopyToClipboard, { CopyButton } from "."

const meta = {
  title: "Components / Content / CopyToClipboard",
  component: CopyToClipboard,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          'Bare clipboard trigger that uses the render-prop pattern: pass a function child that receives `isCopied: boolean` and returns the label / icon for each state. Use `inline` to render as `<button class="inline">` for use inside running prose. The named export `CopyButton` is a pre-styled icon-only variant for compact UIs.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CopyToClipboard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "0x742d35Cc6634C0532925a3b844Bc9e7595f7E0d8",
    children: (isCopied) =>
      isCopied ? (
        <span className="inline-flex items-center gap-2 text-success">
          <Check className="size-4" /> Copied
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 text-primary">
          <Clipboard className="size-4" /> Copy address
        </span>
      ),
  },
}

export const Inline: Story = {
  args: {
    text: "Ethereum is a global, decentralized platform for money and new kinds of applications.",
    inline: true,
    children: (isCopied) => (
      <span className="underline">{isCopied ? "Copied!" : "Copy quote"}</span>
    ),
  },
}

export const TextLabel: Story = {
  args: {
    text: "ethereum.org",
    children: (isCopied) => (
      <span>{isCopied ? "Copied to clipboard" : "Copy link"}</span>
    ),
  },
}

export const CopyButtonVariant = {
  render: () => (
    <VStack className="items-start gap-3">
      <p className="text-sm text-body-medium">
        The `CopyButton` named export -- icon-only, no render prop.
      </p>
      <CopyButton message="0x742d35Cc6634C0532925a3b844Bc9e7595f7E0d8" />
    </VStack>
  ),
}
