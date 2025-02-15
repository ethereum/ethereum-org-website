import * as React from "react"
import { Flex } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import { Table as TableComponent } from "../../table"

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
