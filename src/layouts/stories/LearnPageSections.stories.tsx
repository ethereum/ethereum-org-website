/**
 * Page-section stories for Chromatic visual regression testing.
 * These render representative learn page patterns with mocked data
 * so that CardGrid migrations show up as Chromatic diffs.
 */
import { Meta, StoryObj } from "@storybook/react"

import { ButtonLink } from "@/components/ui/buttons/Button"
import { CardGrid } from "@/components/ui/card-grid"

const meta = {
  title: "Pages / Learn / Sections",
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
      <div className="mx-auto max-w-screen-lg p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const MockCard = ({
  title,
  description,
}: {
  title: string
  description: string
}) => (
  <div className="flex flex-col justify-between rounded-sm border bg-background p-6 [&_h3]:mt-0">
    <div>
      <div className="mb-4 flex justify-center">
        <div className="flex h-[200px] w-auto items-center justify-center rounded bg-background-highlight px-8 text-body-medium">
          Image
        </div>
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-body-medium">{description}</p>
    </div>
    <ButtonLink href="#" className="mt-4">
      {title}
    </ButtonLink>
  </div>
)

const mockCards = [
  {
    title: "What is Ethereum?",
    description: "Learn about the technology behind Ethereum.",
  },
  {
    title: "What is ETH?",
    description: "Learn about ETH, the native currency of Ethereum.",
  },
  {
    title: "What is Web3?",
    description: "Explore how Web3 differs from Web2.",
  },
  { title: "DeFi", description: "Decentralized finance built on Ethereum." },
  {
    title: "Stablecoins",
    description: "Crypto tokens pegged to stable assets.",
  },
  { title: "NFTs", description: "Non-fungible tokens on Ethereum." },
]

/**
 * Learn page CardGrid — the local CardGrid definition is being replaced
 * with the atomic <CardGrid> component. Both render grid-cols-fill-4 gap-8.
 */
export const CardGridSection: Story = {
  render: () => (
    <section className="mt-24">
      <h2 className="text-2xl leading-[1.4] md:text-[2rem]">
        What is crypto and Ethereum?
      </h2>
      <p className="mt-8">
        Ethereum is a technology that lets you send cryptocurrency to anyone for
        a small fee.
      </p>
      <CardGrid className="mt-8">
        {mockCards.slice(0, 3).map((card) => (
          <MockCard key={card.title} {...card} />
        ))}
      </CardGrid>
    </section>
  ),
}

/**
 * Learn page with 6 cards — tests the fill-4 grid wrapping behavior.
 */
export const CardGridSixCards: Story = {
  render: () => (
    <section className="mt-24">
      <h2 className="text-2xl leading-[1.4] md:text-[2rem]">
        What is Ethereum used for?
      </h2>
      <p className="mt-8">
        Ethereum has led to the creation of new products and services.
      </p>
      <CardGrid className="mt-8">
        {mockCards.map((card) => (
          <MockCard key={card.title} {...card} />
        ))}
      </CardGrid>
    </section>
  ),
}
