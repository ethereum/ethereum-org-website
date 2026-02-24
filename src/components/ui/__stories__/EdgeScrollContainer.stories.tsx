import { Meta, StoryObj } from "@storybook/react"

import { EdgeScrollContainer, EdgeScrollItem } from "../edge-scroll-container"

const meta = {
  title: "Molecules / Navigation / EdgeScrollContainer",
  component: EdgeScrollContainer,
  decorators: [
    // Simulate page container to demonstrate edge-to-edge effect
    (Story) => (
      <div className="mx-auto max-w-screen-2xl px-4 py-8 md:px-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof EdgeScrollContainer>

export default meta

type Story = StoryObj<typeof meta>

const SampleCard = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-48 w-72 items-center justify-center rounded-2xl border border-body-light bg-background-highlight p-6 shadow-md">
    {children}
  </div>
)

const cardsArray = Array.from({ length: 10 }).map((_, idx) => idx + 1)

export const Basic: Story = {
  render: () => (
    <EdgeScrollContainer>
      {cardsArray.map((i) => (
        <EdgeScrollItem key={i} className="ms-6">
          <SampleCard>Card {i}</SampleCard>
        </EdgeScrollItem>
      ))}
    </EdgeScrollContainer>
  ),
}

export const WithoutSnap: Story = {
  render: () => (
    <EdgeScrollContainer snap={false}>
      {cardsArray.map((i) => (
        <EdgeScrollItem key={i} className="ms-6">
          <SampleCard>Card {i}</SampleCard>
        </EdgeScrollItem>
      ))}
    </EdgeScrollContainer>
  ),
}

export const AsChildExample: Story = {
  render: () => (
    <EdgeScrollContainer>
      {cardsArray.map((i) => (
        <EdgeScrollItem key={i} asChild className="ms-6">
          <a
            href="#"
            className="flex h-48 w-72 items-center justify-center rounded-2xl border border-body-light bg-background-highlight p-6 shadow-md transition-colors hover:bg-primary-low-contrast"
          >
            Clickable Card {i}
          </a>
        </EdgeScrollItem>
      ))}
    </EdgeScrollContainer>
  ),
}
