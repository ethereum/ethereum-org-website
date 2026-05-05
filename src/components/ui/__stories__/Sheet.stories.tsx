import type { Meta, StoryObj } from "@storybook/nextjs"

import { Button } from "../buttons/Button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet"

const meta = {
  title: "UI / Primitives / Sheet",
  component: Sheet,
  parameters: {
    docs: {
      description: {
        component:
          "Side-panel overlay built on Radix Dialog. Use `side` to choose entry edge, and `hideOverlay` when the sheet should appear without dimming the page (e.g., persistent filter panels). For lazy-mount + stay-mounted behavior, see `PersistentPanel`.",
      },
    },
  },
} satisfies Meta<typeof Sheet>

export default meta

type Story = StoryObj<typeof meta>

const SAMPLE_BODY = (
  <p className="text-sm text-body-medium">
    Sheets are good for secondary tasks that should not pull the user away from
    the main page context, like filters, settings, or a navigation drawer.
  </p>
)

export const Default: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>A short description of the sheet.</SheetDescription>
        </SheetHeader>
        <div className="py-4">{SAMPLE_BODY}</div>
      </SheetContent>
    </Sheet>
  ),
}

export const SideRight: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open right</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Right sheet</SheetTitle>
        </SheetHeader>
        <div className="py-4">{SAMPLE_BODY}</div>
      </SheetContent>
    </Sheet>
  ),
}

export const SideLeft: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left sheet</SheetTitle>
        </SheetHeader>
        <div className="py-4">{SAMPLE_BODY}</div>
      </SheetContent>
    </Sheet>
  ),
}

export const SideTop: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Top sheet</SheetTitle>
        </SheetHeader>
        <div className="py-4">{SAMPLE_BODY}</div>
      </SheetContent>
    </Sheet>
  ),
}

export const SideBottom: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom sheet</SheetTitle>
        </SheetHeader>
        <div className="py-4">{SAMPLE_BODY}</div>
      </SheetContent>
    </Sheet>
  ),
}

export const WithoutOverlay: Story = {
  args: { defaultOpen: true },
  parameters: {
    docs: {
      description: {
        story:
          "`hideOverlay` skips the dimmed backdrop so the sheet sits beside live page content.",
      },
    },
  },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open without overlay</Button>
      </SheetTrigger>
      <SheetContent hideOverlay>
        <SheetHeader>
          <SheetTitle>No overlay</SheetTitle>
          <SheetDescription>
            The page behind stays interactive.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">{SAMPLE_BODY}</div>
      </SheetContent>
    </Sheet>
  ),
}

export const WithHeaderAndFooter: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open settings</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile and save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 py-4">{SAMPLE_BODY}</div>
        <SheetFooter>
          <SheetClose>Cancel</SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}
