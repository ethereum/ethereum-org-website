import type { Meta, StoryObj } from "@storybook/nextjs"

import { ButtonLink, type ButtonVariantProps } from "../buttons/Button"
import { HStack, VStack } from "../flex"

const meta = {
  title: "UI / ButtonLink",
  component: ButtonLink,
  args: {
    href: "#",
    children: "What is Ethereum?",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Anchor styled as a `Button`. Same `variant`, `size`, and `isSecondary` props as `Button`. Inherits auto-detected behaviors from `BaseLink`: external links open in a new tab, file links get a download icon, hash links smooth-scroll within the page.",
      },
    },
  },
} satisfies Meta<typeof ButtonLink>

export default meta

type Story = StoryObj<typeof meta>

const VARIANTS: ButtonVariantProps["variant"][] = [
  "solid",
  "outline",
  "ghost",
  "link",
]

const SIZES: ButtonVariantProps["size"][] = ["lg", "md", "sm"]

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <VStack className="items-start gap-4">
      {VARIANTS.map((variant) => (
        <ButtonLink key={variant} variant={variant} {...args}>
          {variant}
        </ButtonLink>
      ))}
    </VStack>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <HStack className="items-center gap-4">
      {SIZES.map((size) => (
        <ButtonLink key={size} size={size} {...args} />
      ))}
    </HStack>
  ),
}

export const IsSecondary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Same `isSecondary` semantics as `Button`: no-op on `solid` and `link`.",
      },
    },
  },
  render: (args) => (
    <VStack className="items-start gap-4">
      {VARIANTS.map((variant) => (
        <HStack key={variant} className="gap-4">
          <ButtonLink variant={variant} {...args}>
            {variant}
          </ButtonLink>
          <ButtonLink variant={variant} isSecondary {...args}>
            {variant} + isSecondary
          </ButtonLink>
        </HStack>
      ))}
    </VStack>
  ),
}

export const ExternalLink: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "External URLs open in a new tab and get a small external-link arrow appended via `BaseLink`'s auto-detection.",
      },
    },
  },
  args: {
    href: "https://ethresear.ch",
    children: "ethresear.ch",
  },
}

export const FileDownload: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "URLs ending in a recognized file extension are detected by `BaseLink` and rendered with a download icon.",
      },
    },
  },
  args: {
    href: "/ethereum-whitepaper.pdf",
    children: "Download whitepaper",
  },
}

export const HashLink: Story = {
  parameters: {
    docs: {
      description: {
        story: "Hash-only hrefs scroll within the page rather than navigating.",
      },
    },
  },
  args: {
    href: "#section",
    children: "Jump to section",
  },
}
