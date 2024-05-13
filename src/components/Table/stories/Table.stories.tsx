import * as React from "react"
import { Flex } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import TableComponent from ".."

import {
  MdxDemoData,
  MdxEnergyConsumpData,
  MdxTypesOfBridgesData,
} from "./mockMdxData"

const meta = {
  title: "Molecules / Display Content / Tables",
  component: TableComponent,
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

export const MockDocContent = {
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
