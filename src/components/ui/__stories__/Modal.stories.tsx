import { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import ModalComponent from "../dialog-modal"

const meta = {
  title: "Molecules/Overlay Content/Modal",
  component: ModalComponent,
  args: {
    defaultOpen: true,
    title: "Modal Title",
    children:
      "This is the base component to be used in the modal window. Please change the text to preview final content for ethereum.org",
    actionButton: {
      label: "Save",
      onClick: fn(),
    },
  },
} satisfies Meta<typeof ModalComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Modal: Story = {}

export const Xl: Story = {
  args: {
    size: "xl",
  },
}
