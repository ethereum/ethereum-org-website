import { expect, fireEvent, waitFor, within } from "storybook/test"
import { Meta, StoryObj } from "@storybook/nextjs"

import ContentFeedback from "./ContentFeedback"

const meta = {
  title: "Components / ContentFeedback",
  component: ContentFeedback,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ContentFeedback>

export default meta

type Story = StoryObj<typeof meta>

// Default page-level prompt -- "Was this page helpful?"
export const Default: Story = {}

// Inside an article/doc -- "Was this article helpful?"
export const Article: Story = {
  args: { isArticle: true },
}

// A caller-provided prompt overrides the contextual defaults
export const CustomPrompt: Story = {
  args: { prompt: "Did this guide help you get started?" },
}

// Post-submit state: thank-you message + survey CTA
export const Submitted: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    fireEvent.click(canvas.getByRole("button", { name: /yes/i }))
    await waitFor(() =>
      expect(canvas.getByText("Thank you for your feedback!")).toBeVisible()
    )
  },
}
