import { Meta, StoryObj } from "@storybook/react"

import { CardGrid } from "../card-grid"

const meta = {
  title: "Atoms / Layout / CardGrid",
  component: CardGrid,
  parameters: {
    layout: "none",
    chromatic: {
      modes: {
        "en-base": { viewport: "base", locale: "en" },
        "en-md": { viewport: "md", locale: "en" },
        "en-lg": { viewport: "lg", locale: "en" },
        "ar-base": { viewport: "base", locale: "ar" },
        "ar-md": { viewport: "md", locale: "ar" },
        "ar-lg": { viewport: "lg", locale: "ar" },
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
} satisfies Meta<typeof CardGrid>

export default meta

type Story = StoryObj<typeof meta>

const PlaceholderCard = ({ label }: { label: string }) => (
  <div className="rounded-lg border bg-background p-6">
    <p className="font-bold">{label}</p>
    <p className="text-sm text-body-medium">Placeholder card content</p>
  </div>
)

const cards = Array.from({ length: 8 }, (_, i) => (
  <PlaceholderCard key={i} label={`Card ${i + 1}`} />
))

export const Default: Story = {
  render: () => <CardGrid>{cards}</CardGrid>,
}

export const ThreeColumns: Story = {
  render: () => <CardGrid columns="fill-3">{cards.slice(0, 6)}</CardGrid>,
}

export const SmallItems: Story = {
  render: () => (
    <CardGrid columns="fill-8" gap="sm">
      {Array.from({ length: 16 }, (_, i) => (
        <div
          key={i}
          className="flex aspect-square items-center justify-center rounded-lg border bg-background"
        >
          {i + 1}
        </div>
      ))}
    </CardGrid>
  ),
}

export const GapVariants: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="mb-2 text-lg font-bold">gap=&quot;sm&quot; (gap-4)</h3>
        <CardGrid gap="sm">{cards.slice(0, 4)}</CardGrid>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold">gap=&quot;md&quot; (gap-6)</h3>
        <CardGrid gap="md">{cards.slice(0, 4)}</CardGrid>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold">gap=&quot;lg&quot; (gap-8)</h3>
        <CardGrid gap="lg">{cards.slice(0, 4)}</CardGrid>
      </div>
    </div>
  ),
}
