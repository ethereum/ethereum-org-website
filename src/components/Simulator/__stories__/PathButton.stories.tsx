import type { Meta, StoryObj } from "@storybook/react/*"
import { fn } from "@storybook/test"

import { CreateAccountIcon } from "../icons"
import { PathButton as PathButtonComponent } from "../PathButton"

const meta = {
  title: "Molecules / Display Content / Simulator / PathButton",
  component: PathButtonComponent,
  decorators: [
    (Story) => (
      <div className="grid w-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PathButtonComponent>

export default meta

export const PathButton: StoryObj<typeof meta> = {
  args: {
    pathSummary: {
      primaryText: "Create account",
      secondaryText: "How to?",
      Icon: CreateAccountIcon,
    },
    handleClick: fn(),
  },
  render: (args) => <PathButtonComponent {...args} />,
}
