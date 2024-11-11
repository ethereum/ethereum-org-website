import type { Meta, StoryObj } from "@storybook/react/*"

import { ButtonLink as ButtonLinkComponent } from "../buttons/Button"

const meta = {
  title: "Atoms / Form / Buttons",
  component: ButtonLinkComponent,
} satisfies Meta<typeof ButtonLinkComponent>

export default meta

export const ButtonLink: StoryObj<typeof meta> = {
  args: {
    href: "#",
    children: "What is Ethereum?",
  },
}
