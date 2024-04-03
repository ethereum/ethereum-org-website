import * as React from "react"
import { SimpleGrid, Switch as SwitchComponent } from "@chakra-ui/react"
import { Meta } from "@storybook/react"

const meta = {
  title: "Atoms / Form / Switch",
  component: SwitchComponent,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      expanded: false,
    },
  },
} satisfies Meta<typeof SwitchComponent>

export default meta

export const Switch = {
  render: () => (
    <SimpleGrid columns={{ base: 2, lg: 4 }} columnGap={1} alignItems="center">
      <span>isChecked:</span>
      <SwitchComponent id="isChecked" isChecked />

      <span>isDisabled and checked:</span>
      <SwitchComponent id="isDisabled" isDisabled defaultChecked />

      <span>isFocusable & isDisabled:</span>
      <SwitchComponent id="isFocusable" isFocusable isDisabled />

      <span>isReadOnly:</span>
      <SwitchComponent id="isReadOnly" isReadOnly />

      <span>isRequired:</span>
      <SwitchComponent id="isRequired" isRequired />
    </SimpleGrid>
  ),
}
