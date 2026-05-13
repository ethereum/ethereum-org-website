import { CheckCircle2, Info, TriangleAlert } from "lucide-react"
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
import { Center, VStack } from "../flex"

const meta = {
  title: "UI / Alert",
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          "Inline alert/callout. Five `variant` colors (`info | error | success | warning | update`) and a `size: full` for full-width banners. Sub-components: `AlertContent`, `AlertTitle`, `AlertDescription`, `AlertIcon` (lucide or other SVG), `AlertEmoji`, `AlertCloseButton`.",
      },
    },
    layout: "none",
  },
  decorators: [
    (Story) => (
      <Center className="min-h-[100vh]">
        <Story />
      </Center>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

const TITLE = "Alert or callout title"
const DESC = "This is an alert to be used for important information."

const VARIANTS = ["info", "error", "success", "warning", "update"] as const

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Alert className="w-[500px]">
      <AlertContent>
        <AlertTitle>{TITLE}</AlertTitle>
        <AlertDescription>{DESC}</AlertDescription>
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
  render: () => (
    <VStack className="w-[500px] items-stretch gap-4">
      {VARIANTS.map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertContent>
            <AlertTitle>{TITLE}</AlertTitle>
            <AlertDescription>This is a {variant} alert.</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </VStack>
  ),
}

export const WithCloseButton: Story = {
  render: () => (
    <VStack className="w-[500px] items-stretch gap-4">
      {VARIANTS.map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertContent>
            <AlertTitle>{TITLE}</AlertTitle>
            <AlertDescription>{DESC}</AlertDescription>
          </AlertContent>
          <AlertCloseButton />
        </Alert>
      ))}
    </VStack>
  ),
}

export const WithIcon: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "`AlertIcon` wraps an SVG icon with `[&>svg]:size-6` to constrain size. Icon color inherits from the variant via `[&_svg]:text-*` class on the alert.",
      },
    },
  },
  render: () => (
    <VStack className="w-[500px] items-stretch gap-4">
      <Alert variant="info">
        <AlertIcon>
          <Info />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>{DESC}</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert variant="success">
        <AlertIcon>
          <CheckCircle2 />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>All set</AlertTitle>
          <AlertDescription>Action completed successfully.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert variant="warning">
        <AlertIcon>
          <TriangleAlert />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Be careful</AlertTitle>
          <AlertDescription>Double-check before continuing.</AlertDescription>
        </AlertContent>
      </Alert>
    </VStack>
  ),
}

export const WithEmoji: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "`AlertEmoji` renders the project's `Emoji` component at `text-4xl` aligned to the start of the alert.",
      },
    },
  },
  render: () => (
    <VStack className="w-[500px] items-stretch gap-4">
      <Alert variant="update">
        <AlertEmoji text=":party_popper:" />
        <AlertContent>
          <AlertTitle>New feature</AlertTitle>
          <AlertDescription>
            Layer 2 network filtering is now live across the dapps directory.
          </AlertDescription>
        </AlertContent>
      </Alert>
      <Alert variant="info">
        <AlertEmoji text=":information_source:" />
        <AlertContent>
          <AlertTitle>Did you know?</AlertTitle>
          <AlertDescription>
            Validators secure the Ethereum network by proposing and attesting to
            blocks.
          </AlertDescription>
        </AlertContent>
      </Alert>
    </VStack>
  ),
}

export const SizeFull: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "`size: full` renders edge-to-edge with no border-radius for top-of-page banner use.",
      },
    },
  },
  render: () => (
    <VStack className="w-full items-stretch gap-4">
      {VARIANTS.map((variant) => (
        <Alert key={variant} variant={variant} size="full">
          <AlertIcon>
            <Info />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Banner: {variant}</AlertTitle>
            <AlertDescription>
              <p>{DESC}</p>
            </AlertDescription>
          </AlertContent>
          <AlertCloseButton />
        </Alert>
      ))}
    </VStack>
  ),
}
