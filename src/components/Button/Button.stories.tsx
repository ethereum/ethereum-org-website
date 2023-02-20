import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import Button from "."

export default {
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Solid = Template.bind({})
Solid.args = {
  children: "What is Ethereum?",
}

export const Outline = Template.bind({})
Outline.args = {
  children: "More on digital money",
  variant: "outline",
}

export const OutlineColor = Template.bind({})
OutlineColor.args = {
  children: "More on digital money",
  variant: "outline-color",
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: "I am disabled",
  disabled: true,
}
