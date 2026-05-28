import { Info } from "lucide-react"
import { Meta, StoryObj } from "@storybook/nextjs"

import {
  Alert,
  AlertCloseButton,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "../alert"
import { VStack } from "../flex"

const meta = {
  title: "Molecules / Action Feedback / Alerts",
  component: Alert,
  parameters: {
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

export const Variants: Story = {
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
          <AlertCloseButton />
        </Alert>
      ))}
    </div>
  ),
}

export const WithIcon: Story = {
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

export const Banner: Story = {
  render: (args) => (
    <div className="w-full max-w-(--breakpoint-2xl)">
      <Alert variant="banner" {...args}>
        {DEMO_DESC}
      </Alert>
    </div>
  ),
}
