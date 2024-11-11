import * as React from "react"
import { Meta, type StoryObj } from "@storybook/react"

import SwitchComponent from "../Switch"

const meta = {
  title: "Atoms / Form / ShadCN Switch",
  component: SwitchComponent,
} satisfies Meta<typeof SwitchComponent>

export default meta

export const Switch: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 items-center gap-x-1 lg:grid-cols-4">
      <span>default:</span>
      <SwitchComponent id="default" />

      <span>checked:</span>
      <SwitchComponent id="checked" checked />

      <span>disabled:</span>
      <SwitchComponent id="disabled" disabled />

      <span>disabled and checked:</span>
      <SwitchComponent id="disabled-checked" disabled defaultChecked />
    </div>
  ),
}
