import { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Button from "."
import Translation from "../Translation"

export default {
  component: Button,
} as Meta<typeof Button>

export const Solid: StoryObj<typeof Button> = {
  args: {
    children: "What is Ethereum?",
  },
}

export const Outline: StoryObj<typeof Button> = {
  args: {
    children: "More on digital money",
    variant: "outline",
  },
}

export const OutlineColor: StoryObj<typeof Button> = {
  args: {
    children: "More on digital money",
    variant: "outline-color",
  },
}

export const Disabled: StoryObj<typeof Button> = {
  args: {
    children: "I am disabled",
    isDisabled: true,
  },
}

export const Test = {
  render: () => (
    <Button>
      <Translation id="page-about-h2" />
    </Button>
  ),
}
