import { Meta, StoryObj } from "@storybook/react"
import Button from "."

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
    disabled: true,
  },
}
