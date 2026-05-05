import { ChevronDown, ChevronUp } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { Button } from "../buttons/Button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible"
import { HStack, VStack } from "../flex"

const meta = {
  title: "UI / Primitives / Collapsible",
  component: Collapsible,
  parameters: {
    docs: {
      description: {
        component:
          "Disclosure primitive built on Radix Collapsible. Compose `Collapsible` > `CollapsibleTrigger` (use `asChild` to wrap any focusable element) + `CollapsibleContent`. For multi-section flows, prefer `Accordion`.",
      },
    },
  },
} satisfies Meta<typeof Collapsible>

export default meta

type Story = StoryObj<typeof meta>

export const Closed: Story = {
  render: () => (
    <Collapsible className="w-[320px] rounded border p-3">
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm">
          Show details
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3 text-sm">
        Hidden content. The trigger toggles the open state.
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const Open: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-[320px] rounded border p-3">
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm">
          Hide details
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3 text-sm">
        Visible content. Use `defaultOpen` to start expanded.
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const WithCustomTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`CollapsibleTrigger` renders as a `button` by default; pass `asChild` to render a custom element. Use `data-state` to swap the icon based on open state.",
      },
    },
  },
  render: () => (
    <Collapsible className="w-[320px] rounded border">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="group flex w-full items-center justify-between p-3 text-left text-sm font-medium"
        >
          <span>Frequently asked questions</span>
          <ChevronDown className="size-4 transition-transform group-data-[state=open]:hidden" />
          <ChevronUp className="hidden size-4 transition-transform group-data-[state=open]:block" />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 px-3 pb-3 text-sm">
        <p>Custom triggers can pull in any element via `asChild`.</p>
        <p>The chevron flips using `data-state=open` on the trigger.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const ListOfDetails: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Multiple independent collapsibles in a list. Each manages its own state. For grouped behavior, use `Accordion` instead.",
      },
    },
  },
  render: () => (
    <VStack className="w-[420px] gap-2">
      {[
        {
          title: "What is a layer 2?",
          body: "Layer 2 networks scale Ethereum by handling transactions off the main chain.",
        },
        {
          title: "What is a rollup?",
          body: "Rollups bundle many transactions into a single proof posted to layer 1.",
        },
        {
          title: "What is a validator?",
          body: "Validators secure the network by proposing and attesting to blocks.",
        },
      ].map(({ title, body }) => (
        <Collapsible key={title} className="rounded border">
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="group flex w-full items-center justify-between p-3 text-left text-sm font-medium"
            >
              <span>{title}</span>
              <HStack className="gap-1 text-xs text-body-medium">
                <span className="group-data-[state=open]:hidden">Show</span>
                <span className="hidden group-data-[state=open]:inline">
                  Hide
                </span>
                <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
              </HStack>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-3 pb-3 text-sm text-body-medium">
            {body}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </VStack>
  ),
}
