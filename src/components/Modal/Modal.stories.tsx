import { Meta, StoryObj } from "@storybook/react"
import Modal from "."

const meta = {
  title: "Molecules/Overlay Content/Modal/BaseModal",
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>
export const BaseModal: Story = {
  args: {
    isOpen: true,
    title: "Modal Title",
    description:
      "This is the base component to be used in the modal window.Please change the text to preview final content for ethereum.org",
    ButtonLabel: "Cancel",
    actionButtonLabel: "Save",
  },
}
