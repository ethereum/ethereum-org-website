import type { Meta, StoryObj } from "@storybook/react"

import { Heading } from "../heading"
import { Section } from "../section"

const meta = {
  title: "Atoms / Layout / Section",
  component: Section,
  parameters: {
    layout: null,
    chromatic: {
      modes: {
        "en-base": { viewport: "base", locale: "en" },
        "en-md": { viewport: "md", locale: "en" },
        "en-lg": { viewport: "lg", locale: "en" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Section>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Default Section — no gap, no flex. Just scroll-margin and semantic `<section>`.
 */
export const Default: Story = {
  render: () => (
    <Section className="border border-dashed border-body-light p-4">
      <Heading as="h2" size="md">
        Default Section
      </Heading>
      <p>No gap prop — just scroll-margin and semantic markup.</p>
    </Section>
  ),
}

/**
 * gap="section" — largest gap (48px mobile, 64px desktop).
 * Used between major page sections in a page wrapper.
 */
export const GapSection: Story = {
  render: () => (
    <Section gap="section" className="border border-dashed border-body-light">
      <div className="rounded bg-background-highlight p-6">
        <Heading as="h2" size="md">
          First content block
        </Heading>
        <p>This is a major page section.</p>
      </div>
      <div className="rounded bg-background-highlight p-6">
        <Heading as="h2" size="md">
          Second content block
        </Heading>
        <p>Another major page section.</p>
      </div>
      <div className="rounded bg-background-highlight p-6">
        <Heading as="h2" size="md">
          Third content block
        </Heading>
        <p>One more major page section.</p>
      </div>
    </Section>
  ),
}

/**
 * gap="block" — medium gap (24px mobile, 32px desktop).
 * Used between content groups within a section (e.g., heading + grid).
 */
export const GapBlock: Story = {
  render: () => (
    <Section gap="block" className="border border-dashed border-body-light">
      <Heading as="h2" size="md">
        Section heading
      </Heading>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded bg-background-highlight p-6">
          <p>Left column content with some descriptive text.</p>
        </div>
        <div className="rounded bg-background-highlight p-6">
          <p>Right column content with some descriptive text.</p>
        </div>
      </div>
      <p>
        Footer text after the grid — spaced at block level from the grid above.
      </p>
    </Section>
  ),
}

/**
 * Demonstrates that className overrides the gap via tailwind-merge.
 */
export const GapOverride: Story = {
  render: () => (
    <Section
      gap="block"
      className="gap-1 border border-dashed border-body-light"
    >
      <Heading as="h2" size="md">
        Overridden gap
      </Heading>
      <p>gap=&quot;block&quot; overridden with className=&quot;gap-1&quot;</p>
      <p>These paragraphs should be tightly spaced.</p>
    </Section>
  ),
}

/**
 * Side-by-side comparison of both gap levels.
 */
export const GapComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <div>
        <p className="mb-2 text-sm font-bold uppercase text-body-medium">
          gap=&quot;section&quot; (48px / 64px)
        </p>
        <Section
          gap="section"
          className="border border-dashed border-body-light"
        >
          <div className="rounded bg-background-highlight p-4">Block A</div>
          <div className="rounded bg-background-highlight p-4">Block B</div>
          <div className="rounded bg-background-highlight p-4">Block C</div>
        </Section>
      </div>
      <div>
        <p className="mb-2 text-sm font-bold uppercase text-body-medium">
          gap=&quot;block&quot; (24px / 32px)
        </p>
        <Section gap="block" className="border border-dashed border-body-light">
          <div className="rounded bg-background-highlight p-4">Block A</div>
          <div className="rounded bg-background-highlight p-4">Block B</div>
          <div className="rounded bg-background-highlight p-4">Block C</div>
        </Section>
      </div>
      <div>
        <p className="mb-2 text-sm font-bold uppercase text-body-medium">
          No gap (default — no flex layout)
        </p>
        <Section className="border border-dashed border-body-light">
          <div className="rounded bg-background-highlight p-4">Block A</div>
          <div className="rounded bg-background-highlight p-4">Block B</div>
          <div className="rounded bg-background-highlight p-4">Block C</div>
        </Section>
      </div>
    </div>
  ),
}
