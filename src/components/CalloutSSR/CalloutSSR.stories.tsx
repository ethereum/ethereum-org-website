import { Meta, StoryObj } from "@storybook/nextjs"

import { ButtonLink } from "@/components/ui/buttons/Button"

import CalloutSSR from "."

import devBlocksImg from "@/public/images/developers-eth-blocks.png"

const meta = {
  title: "Components / Callouts / CalloutSSR",
  component: CalloutSSR,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Pre-unification visual reference for the existing `CalloutSSR` (server). Takes `title` and `description` as plain strings (no translation resolution -- the caller resolves keys). The optical anchor is the optional `image` that floats above the box, or an `emoji` heading if no image is supplied. This component is one of the inputs to the unified `Callout` work in #18133.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mt-32 max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CalloutSSR>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Start building on Ethereum",
    description:
      "Get the tools, frameworks and tutorials to ship your first dapp.",
    image: devBlocksImg,
    alt: "Stylised developer blocks illustration",
    children: (
      <ButtonLink href="/developers/">Open the developers hub</ButtonLink>
    ),
  },
}

export const WithEmoji: Story = {
  args: {
    emoji: ":sparkles:",
    title: "Try smart contracts",
    description:
      "Smart contracts let you write programs that run on Ethereum and settle without a trusted intermediary.",
    children: <ButtonLink href="/smart-contracts/">Learn more</ButtonLink>,
  },
}

export const TitleOnly: Story = {
  args: {
    title: "Start building on Ethereum",
    image: devBlocksImg,
    alt: "Developer blocks illustration",
  },
}

export const ChildrenOnly: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <p>
          Any custom content can sit inside the box -- this story passes only
          children with no title, description, image, or emoji.
        </p>
        <ButtonLink href="#">Continue</ButtonLink>
      </div>
    ),
  },
}
