import { Meta, StoryObj } from "@storybook/react"
import Nav from "."

const meta = {
  title: "Organisms / Layouts / Header",
  component: Nav,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Nav>

export default meta

export const Header: StoryObj<typeof meta> = {
  args: {
    path: "/en/get-eth",
  },
}
