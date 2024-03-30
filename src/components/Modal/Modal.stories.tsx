import { Meta, StoryObj } from "@storybook/react"

import ModalComponent from "."

const meta = {
  title: "Molecules/Overlay Content/Modal",
  component: ModalComponent,
} satisfies Meta<typeof ModalComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Modal: Story = {
  args: {
    isOpen: true,
    title: "Modal Title",
    children:
      "This is the base component to be used in the modal window. Please change the text to preview final content for ethereum.org",
    actionButtonLabel: "Save",
  },
}
