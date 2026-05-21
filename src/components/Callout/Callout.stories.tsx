import { Meta, StoryObj } from "@storybook/nextjs"

import { ButtonLink } from "@/components/ui/buttons/Button"

import Callout from "."

import devBlocksImg from "@/public/images/developers-eth-blocks.png"

const meta = {
  title: "Components / Callouts / Callout",
  component: Callout,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Pre-unification visual reference for the existing `Callout` (client thunk over `CalloutSSR`). Resolves `titleKey` / `descriptionKey` translation keys against the `common` namespace before forwarding to `CalloutSSR`. Cross-namespace lookups use the `ns:key` syntax (consumers in the codebase do this regularly). This component is one of the inputs to the unified `Callout` work in #18133.",
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
} satisfies Meta<typeof Callout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    titleKey: "smart-contracts",
    image: devBlocksImg,
    alt: "Developer blocks illustration",
    children: (
      <>
        <p className="mb-6 text-xl leading-[140%] text-body-medium">
          Smart contracts let you write programs that run on Ethereum and settle
          without a trusted intermediary.
        </p>
        <ButtonLink href="/smart-contracts/">Learn more</ButtonLink>
      </>
    ),
  },
}

export const NoTitleKey: Story = {
  args: {
    emoji: ":wallet:",
    children: (
      <>
        <h3 className="mb-8 text-2xl leading-[1.4]">Choose a wallet</h3>
        <p className="mb-6 text-xl leading-[140%] text-body-medium">
          Self-custody wallets let you hold your own keys and connect to dapps.
        </p>
        <ButtonLink href="/wallets/find-wallet/">Find a wallet</ButtonLink>
      </>
    ),
  },
}
