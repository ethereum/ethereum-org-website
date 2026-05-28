import { Code, Compass, GraduationCap, Hammer, Map, Wrench } from "lucide-react"
import { Meta, StoryObj } from "@storybook/nextjs"

import SubpageCard from "."

const meta = {
  title: "Components / Cards / SubpageCard",
  component: SubpageCard,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Linkable card with an icon, title and description. The entire card is a link via `LinkBox` / `LinkOverlay`. Pass `inlineLink` to surface a visible CTA inside the card; otherwise the card body acts as the click target invisibly.",
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
} satisfies Meta<typeof SubpageCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Frameworks",
    description:
      "Pre-built tools that handle a lot of the heavy lifting for building a decentralized application.",
    icon: <Hammer className="size-8" />,
    href: "/developers/tools/frameworks/",
  },
}

export const WithInlineLink: Story = {
  args: {
    title: "The Ethereum roadmap",
    description:
      "A look at how Ethereum is being improved over time, and the priorities driving those upgrades.",
    icon: <Map className="size-8" />,
    href: "/roadmap/",
    inlineLink: {
      text: "See the roadmap",
    },
  },
}

export const ToolsPageGrid = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <SubpageCard
        title="Frameworks"
        description="Pre-built scaffolding for full-stack dapp development."
        icon={<Hammer className="size-8" />}
        href="/developers/tools/frameworks/"
      />
      <SubpageCard
        title="IDEs"
        description="Integrated development environments tuned for Solidity and Vyper."
        icon={<Code className="size-8" />}
        href="/developers/tools/ides/"
      />
      <SubpageCard
        title="Block explorers"
        description="Read on-chain data, inspect transactions, and verify contracts."
        icon={<Compass className="size-8" />}
        href="/developers/tools/block-explorers/"
      />
      <SubpageCard
        title="Testing"
        description="Frameworks and patterns for writing and running smart-contract tests."
        icon={<Wrench className="size-8" />}
        href="/developers/tools/testing/"
      />
      <SubpageCard
        title="Tutorials"
        description="Step-by-step walkthroughs from the community and the Ethereum Foundation."
        icon={<GraduationCap className="size-8" />}
        href="/developers/tutorials/"
      />
      <SubpageCard
        title="Roadmap"
        description="A look at how Ethereum is being improved over time."
        icon={<Map className="size-8" />}
        href="/roadmap/"
      />
    </div>
  ),
}
