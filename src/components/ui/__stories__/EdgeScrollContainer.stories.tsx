import type { Meta, StoryObj } from "@storybook/nextjs"

import { EdgeScrollContainer, EdgeScrollItem } from "../edge-scroll-container"

const meta = {
  title: "UI / EdgeScrollContainer",
  component: EdgeScrollContainer,
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-screen-2xl px-4 py-8 md:px-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Horizontal scroll container that bleeds to the screen edges while keeping content aligned with the page gutter. Items snap by default; pass `snap={false}` to disable. CSS variables (`--edge-spacing`, `--edge-mask-size`, `--edge-overflow-y-pad`) are configurable via props or `className` for responsive overrides.",
      },
    },
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

export const Default: Story = {
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
  parameters: {
    docs: {
      description: {
        story:
          "`snap={false}` disables snap-mandatory scrolling. Use for free-scroll content where snap points would feel constrained.",
      },
    },
  },
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

export const AsChild: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`EdgeScrollItem asChild` renders the wrapper as the child element so each card can be a single `<a>` with the same scroll-snap behavior.",
      },
    },
  },
  render: () => (
    <EdgeScrollContainer>
      {cardsArray.map((i) => (
        <EdgeScrollItem key={i} asChild className="ms-6">
          <button
            type="button"
            className="flex h-48 w-72 items-center justify-center rounded-2xl border border-body-light bg-background-highlight p-6 shadow-md transition-colors hover:bg-primary-low-contrast"
          >
            Clickable card {i}
          </button>
        </EdgeScrollItem>
      ))}
    </EdgeScrollContainer>
  ),
}

export const CustomSpacing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Override edge spacing via the `spacing` prop. For responsive overrides, pass via `className` (e.g. `[--edge-spacing:0.5rem] md:[--edge-spacing:1rem]`).",
      },
    },
  },
  render: () => (
    <EdgeScrollContainer spacing="0.5rem">
      {cardsArray.map((i) => (
        <EdgeScrollItem key={i} className="ms-4">
          <SampleCard>Card {i}</SampleCard>
        </EdgeScrollItem>
      ))}
    </EdgeScrollContainer>
  ),
}

export const FewItems: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When content does not overflow, the container behaves like a regular flex row. Useful for confirming the no-scroll state.",
      },
    },
  },
  render: () => (
    <EdgeScrollContainer>
      {[1, 2].map((i) => (
        <EdgeScrollItem key={i} className="ms-6">
          <SampleCard>Card {i}</SampleCard>
        </EdgeScrollItem>
      ))}
    </EdgeScrollContainer>
  ),
}
