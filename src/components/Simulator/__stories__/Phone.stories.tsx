import type { Meta, StoryObj } from "@storybook/react/*"

import { Center } from "@/components/ui/flex"

import { Phone as PhoneComponent } from "../Phone"
import { Template } from "../Template"

const meta = {
  title: "Molecules / Display Content / Simulator / Phone",
  component: PhoneComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="mt-8">
        <Template>
          <Story />
        </Template>
      </div>
    ),
  ],
} satisfies Meta<typeof PhoneComponent>

export default meta

export const Phone: StoryObj<typeof meta> = {
  render: () => (
    <PhoneComponent>
      <div className="grid size-full items-center">
        <Center className="h-1/2 bg-gray-200">Centered Child Content</Center>
      </div>
    </PhoneComponent>
  ),
}
