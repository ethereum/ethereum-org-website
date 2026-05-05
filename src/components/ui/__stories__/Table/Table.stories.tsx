import type { Meta, StoryObj } from "@storybook/nextjs"

import { Flex } from "../../flex"
import { Table } from "../../table"

import {
  MdxDemoData,
  MdxEnergyConsumpData,
  MdxTypesOfBridgesData,
} from "./mockMdxData"

const meta = {
  title: "UI / Table",
  component: Table,
  decorators: [
    (Story) => (
      <Flex className="max-w-screen-md flex-col gap-12">
        <Story />
      </Flex>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Tabular data primitive. Six `variant` styles cover most layouts: `simple` (default, header bg), `minimal` (no header bg), `simple-striped`, `minimal-striped`, `product` (sm text, hover row), `highlight-first-column`.",
      },
    },
  },
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const Simple: Story = {
  args: { variant: "simple", children: <MdxDemoData /> },
}

export const Minimal: Story = {
  args: { variant: "minimal", children: <MdxDemoData /> },
}

export const SimpleStriped: Story = {
  args: { variant: "simple-striped", children: <MdxDemoData /> },
}

export const MinimalStriped: Story = {
  args: { variant: "minimal-striped", children: <MdxDemoData /> },
}

export const Product: Story = {
  args: { variant: "product", children: <MdxDemoData /> },
}

export const HighlightFirstColumn: Story = {
  args: {
    variant: "highlight-first-column",
    children: <MdxEnergyConsumpData />,
  },
}

export const MockDocContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Realistic doc-content composition using the markdown table mock data.",
      },
    },
  },
  render: () => (
    <>
      <Table variant="simple">
        <MdxEnergyConsumpData />
      </Table>
      <Table>
        <MdxTypesOfBridgesData />
      </Table>
    </>
  ),
}
