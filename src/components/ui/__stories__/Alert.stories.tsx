import * as React from "react"
import { MdInfoOutline } from "react-icons/md"
import { Meta, StoryObj } from "@storybook/react"

import {
  Alert,
  AlertCloseButton,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "../alert"
import { Center } from "../flex"

const meta = {
  title: "Molecules / Action Feedback / Alerts",
  component: Alert,
  parameters: {
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

const DEMO_TITLE = "Alert or callout title"
const DEMO_DESC = "This is an alert to be used for important information."

const VARIANTS = ["info", "error", "success", "warning", "update"] as const

export const Variants: Story = {
  render: (args) => (
    <div className="flex w-[500px] flex-col gap-4">
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

export const Banner: Story = {
  render: (args) => (
    <div className="mx-8 flex w-full flex-col gap-4">
      {VARIANTS.map((variant) => (
        <Alert key={variant} variant={variant} size="full" {...args}>
          <MdInfoOutline className="h-6 w-6" />
          <AlertContent>
            <AlertTitle>Banner use case</AlertTitle>
            <AlertDescription>
              <p>{DEMO_DESC}</p>
              <p>{DEMO_DESC}</p>
            </AlertDescription>
          </AlertContent>
          <AlertCloseButton />
        </Alert>
      ))}
    </div>
  ),
}
