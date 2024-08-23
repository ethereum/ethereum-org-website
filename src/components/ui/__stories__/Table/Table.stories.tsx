import * as React from "react"
import { Flex } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import {
  MdxDemoData,
  MdxEnergyConsumpData,
  MdxTypesOfBridgesData,
} from "./mockMdxData"
import { Table as TableComponent } from "./Table"

const meta = {
  title: "Molecules / Display Content / ShadCN Tables",
  component: TableComponent,
  parameters: {
    // TODO: Remove this when this story file becomes the primary one
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => (
      <Flex flexDir="column" gap={16} maxW="container.md">
        <Story />
      </Flex>
    ),
  ],
} satisfies Meta<typeof TableComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Tables: Story = {
  args: {
    children: <MdxDemoData />,
  },
  render: (args) => (
    <>
      <TableComponent {...args} />
      <TableComponent {...args} variant="minimal" />
      <TableComponent {...args} variant="minimal-striped" />
      <TableComponent {...args} variant="simple-striped" />
    </>
  ),
}

export const MockDocContent: StoryObj = {
  render: () => (
    <>
      <TableComponent variant="simple">
        <MdxEnergyConsumpData />
      </TableComponent>
      <TableComponent>
        <MdxTypesOfBridgesData />
      </TableComponent>
    </>
  ),
}
