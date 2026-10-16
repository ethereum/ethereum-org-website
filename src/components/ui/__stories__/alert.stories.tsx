import { Info } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  Alert,
  AlertCloseButton,
  AlertContent,
  AlertDescription,
  AlertEmoji,
  AlertIcon,
  AlertTitle,
} from "../alert"
import { VStack } from "../flex"

const meta = {
  title: "UI / Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Inline alert/callout. Six `variant` colors (`info | error | success | warning | update | banner`); `banner` renders edge-to-edge with no border-radius for top-of-page use. Sub-components: `AlertContent`, `AlertTitle`, `AlertDescription`, `AlertIcon` (lucide or other SVG), `AlertEmoji` (deprecated), `AlertCloseButton`.",
      },
    },
    layout: "none",
  },
  decorators: [
    (Story) => (
      <VStack className="min-h-screen">
        <Story />
      </VStack>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

const DEMO_TITLE = "Alert or callout title"
const DEMO_DESC = "This is an alert to be used for important information."

const VARIANTS = ["info", "error", "success", "warning", "update"] as const

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: (args) => (
    <Alert className="w-lg" {...args}>
      <AlertContent>
        <AlertTitle>{DEMO_TITLE}</AlertTitle>
        <AlertDescription>{DEMO_DESC}</AlertDescription>
      </AlertContent>
    </Alert>
  ),
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: "All five `variant` options stacked for visual comparison.",
      },
    },
  },
  render: (args) => (
    <div className="flex w-lg flex-col gap-4">
      {VARIANTS.map((variant) => (
        <Alert key={variant} variant={variant} className="w-full" {...args}>
          <AlertContent>
            <AlertTitle>{DEMO_TITLE}</AlertTitle>
            <AlertDescription>This is a {variant} alert</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  ),
}

export const WithCloseButton: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {VARIANTS.map((variant) => (
        <Alert key={variant} variant={variant} {...args}>
          <AlertContent>
            <AlertTitle>{DEMO_TITLE}</AlertTitle>
            <AlertDescription>{DEMO_DESC}</AlertDescription>
          </AlertContent>
          <AlertCloseButton aria-label="Close" />
        </Alert>
      ))}
    </div>
  ),
}

export const WithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`AlertIcon` wraps an SVG icon, constraining it to 24px; `size="lg"` (40px) and `size="xl"` (48px) scale it up. Icon color inherits from the variant via the alert\'s `**:[svg]:text-*` class.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {VARIANTS.map((variant) => (
        <Alert key={variant} variant={variant} {...args}>
          <AlertIcon>
            <Info />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>{DEMO_TITLE}</AlertTitle>
            <AlertDescription>{DEMO_DESC}</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  ),
}

export const TitleSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`AlertTitle` accepts a `size` variant: `base` (default, bold body size) or `lg` for prominent callout headings.",
      },
    },
  },
  render: (args) => (
    <div className="flex w-lg flex-col gap-4">
      <Alert {...args}>
        <AlertContent>
          <AlertTitle>{DEMO_TITLE}</AlertTitle>
          <AlertDescription>{DEMO_DESC}</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert variant="update" {...args}>
        <AlertContent>
          <AlertTitle size="lg">{DEMO_TITLE}</AlertTitle>
          <AlertDescription>{DEMO_DESC}</AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  ),
}

export const WithEmoji: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "**Deprecated** -- use `AlertIcon` with a Lucide icon for new content. `AlertEmoji` renders the project's `Emoji` component at `text-4xl` aligned to the start of the alert.",
      },
    },
  },
  render: (args) => (
    <div className="flex w-lg flex-col gap-4">
      <Alert variant="update" {...args}>
        <AlertEmoji text=":party_popper:" />
        <AlertContent>
          <AlertTitle>New feature</AlertTitle>
          <AlertDescription>
            Layer 2 network filtering is now live across the dapps directory.
          </AlertDescription>
        </AlertContent>
      </Alert>
      <Alert variant="info" {...args}>
        <AlertEmoji text=":information_source:" />
        <AlertContent>
          <AlertTitle>Did you know?</AlertTitle>
          <AlertDescription>
            Validators secure the Ethereum network by proposing and attesting to
            blocks.
          </AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  ),
}

export const Banner: Story = {
  render: (args) => (
    <div className="w-full max-w-(--breakpoint-2xl)">
      <Alert variant="banner" {...args}>
        {DEMO_DESC}
      </Alert>
    </div>
  ),
}
