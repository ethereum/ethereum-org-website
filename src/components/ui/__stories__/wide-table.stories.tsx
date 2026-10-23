import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table"
import WideTable from "../wide-table"

const meta = {
  title: "UI / WideTable",
  component: WideTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Wrapper that forces a contained `<table>` to `min-w-5xl table-fixed`, so a table with many columns keeps readable column widths and overflows instead of crushing. It only sets those two rules -- pair it with a scrolling ancestor (`EdgeScrollContainer`, or a plain `overflow-x-auto`) or the overflow will push the page sideways.",
      },
    },
  },
} satisfies Meta<typeof WideTable>

export default meta

type Story = StoryObj<typeof meta>

const COLUMNS = [
  "Network",
  "Type",
  "Consensus",
  "Settlement",
  "Data availability",
  "Sequencer",
  "Proof system",
]

const ROWS = [
  ["Ethereum", "L1", "Proof-of-stake", "--", "On-chain", "--", "--"],
  [
    "Optimistic L2",
    "L2",
    "Inherited",
    "Ethereum",
    "Ethereum",
    "Centralized",
    "Fraud proofs",
  ],
  [
    "Validity L2",
    "L2",
    "Inherited",
    "Ethereum",
    "Ethereum",
    "Centralized",
    "Validity proofs",
  ],
]

const SevenColumnTable = () => (
  <Table variant="simple">
    <TableHeader>
      <TableRow>
        {COLUMNS.map((c) => (
          <TableHead key={c}>{c}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {ROWS.map((row) => (
        <TableRow key={row[0]}>
          {row.map((cell, i) => (
            <TableCell key={i}>{cell}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export const Wrapped: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Seven columns inside `WideTable`, with `overflow-x-auto` on the ancestor supplying the scroll. Columns stay legible and the table scrolls horizontally.",
      },
    },
  },
  render: () => (
    <div className="overflow-x-auto">
      <WideTable>
        <SevenColumnTable />
      </WideTable>
    </div>
  ),
}

export const Unwrapped: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The same seven columns with no wrapper, for comparison -- the table shrinks to the container and the cells wrap.",
      },
    },
  },
  render: () => <SevenColumnTable />,
}
