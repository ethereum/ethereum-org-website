import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { Button } from "../buttons/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog"
import { Flex } from "../flex"

const meta = {
  title: "UI / Primitives / Dialog",
  component: Dialog,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Vanilla shadcn `Dialog`. For most app use, prefer `Modal` (`UI / Modal`), which wraps this primitive with `size`, `variant`, and `actionButton` props. The overlay is always rendered as part of `DialogContent`. Width is constrained to `max-w-lg` by default; override via `className` on `DialogContent`.",
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>
            A short description of what this dialog does.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}

export const WithFooter: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Flex className="justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" isSecondary>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={fn()}>Confirm</Button>
          </Flex>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Widths: Story = {
  args: { defaultOpen: true },
  parameters: {
    docs: {
      description: {
        story:
          "`DialogContent` defaults to `max-w-lg`. Override via `className` for narrower or wider dialogs.",
      },
    },
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Open wide dialog</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Wide dialog (max-w-2xl)</DialogTitle>
          <DialogDescription>
            For wider content, pass a Tailwind width class to `DialogContent`.
            For canonical app sizing, use `Modal` instead.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}

export const LongContent: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of use</DialogTitle>
          <DialogDescription>
            Long-form content scrolls within the dialog when it overflows the
            viewport. Ethereum is a decentralized, open-source blockchain
            featuring smart-contract functionality. Ether is the native
            cryptocurrency of the platform. Among cryptocurrencies, ether is
            second only to bitcoin in market capitalization.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}
