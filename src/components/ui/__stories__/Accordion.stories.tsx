import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion"

const meta = {
  title: "UI / Accordion",
  component: Accordion,
  decorators: [
    (Story) => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Vertically-stacked disclosure built on Radix Accordion. `type='single'` allows only one open at a time (with optional `collapsible`); `type='multiple'` allows any combination. The chevron icon flips for RTL via `:dir(rtl)` and rotates open via `data-state=open`. Pass `hideIcon` to suppress the chevron and provide your own visual cue.",
      },
    },
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj

const SAMPLE = [
  {
    id: "item-1",
    title: "What is Ethereum?",
    body: "Ethereum is open access to digital money and data-friendly services for everyone -- no matter your background or location.",
  },
  {
    id: "item-2",
    title: "What is a layer 2?",
    body: "Layer 2 networks scale Ethereum by handling transactions off the main chain while inheriting its security guarantees.",
  },
  {
    id: "item-3",
    title: "What is a validator?",
    body: "Validators secure the network by proposing and attesting to blocks.",
  },
]

export const SingleCollapsible: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`type='single' collapsible` allows only one item open at a time, with the option to close the active item.",
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1">
      {SAMPLE.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`type='multiple'` allows any combination of items to be open simultaneously.",
      },
    },
  },
  render: () => (
    <Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
      {SAMPLE.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

export const HideIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`hideIcon` on `AccordionTrigger` removes the default chevron. Useful when supplying a custom visual cue.",
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1">
      {SAMPLE.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger hideIcon>{item.title}</AccordionTrigger>
          <AccordionContent>{item.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

export const CustomTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Build a custom trigger by passing structured children to `AccordionTrigger`. The default chevron stays at the end.",
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible>
      {SAMPLE.map((item, idx) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <span className="grid size-6 place-items-center rounded-full bg-primary-low-contrast text-xs text-primary-high-contrast">
                {idx + 1}
              </span>
              <span>{item.title}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>{item.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

export const RtlChevron: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The chevron uses `ChevronNext`, which rotates for RTL locales via `:dir(rtl)`. Toggle the locale in the Storybook toolbar to see the flip.",
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Toggle locale to test RTL flip</AccordionTrigger>
        <AccordionContent>
          When the locale is RTL (Arabic, Urdu), the chevron points the other
          way to match reading direction.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
