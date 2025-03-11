import { RiInformationLine } from "react-icons/ri"
import { Meta, StoryObj } from "@storybook/react"

import Translation from "../Translation"
import { Center } from "../ui/flex"
import InlineLink from "../ui/Link"

// TODO: remove `index` when we delete the old tooltip
import TooltipComponent from "./index"

const TooltipContent = () => (
  <div>
    <Translation id="data-provided-by" />{" "}
    <InlineLink href="https://defillama.com/">defillama</InlineLink>
  </div>
)

const meta = {
  title: "Molecules / Overlay Content / Tooltip",
  component: TooltipComponent,
  args: {
    content: <TooltipContent />,
    children: (
      <span data-testid="tooltip-icon">
        <RiInformationLine />
      </span>
    ),
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    content: {
      table: {
        disable: true,
      },
    },
    onBeforeOpen: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <Center className="size-128">
        <Story />
      </Center>
    ),
  ],
} satisfies Meta<typeof TooltipComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

// for chromatic story snapshot showing the rendered popover
export const OnOpen: Story = {
  args: {
    open: true,
  },
}
