import type { Meta, StoryObj } from "@storybook/nextjs"
import type { ColumnDef } from "@tanstack/react-table"

import DataTable from "."

type Network = {
  name: string
  type: string
  settlement: string
  detail: string
}

const DATA: Network[] = [
  {
    name: "Arbitrum One",
    type: "Optimistic rollup",
    settlement: "Ethereum",
    detail: "Fraud proofs with a seven-day challenge window.",
  },
  {
    name: "Base",
    type: "Optimistic rollup",
    settlement: "Ethereum",
    detail: "Built on the OP Stack.",
  },
  {
    name: "Starknet",
    type: "Validity rollup",
    settlement: "Ethereum",
    detail: "STARK proofs; a non-EVM execution environment.",
  },
]

const COLUMNS: ColumnDef<Network>[] = [
  { accessorKey: "name", header: "Network" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "settlement", header: "Settles to" },
]

// Instantiated up front: `satisfies Meta<typeof DataTable<Network, unknown>>`
// alone leaves the args inferred as `ColumnDef<unknown, unknown>[]`.
const NetworkDataTable = DataTable<Network, unknown>

const meta = {
  title: "Components / DataTable",
  component: NetworkDataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "TanStack Table bound to the `ui/table` primitives, backing the filterable product/network directories. Pass `columns` and `data`; `subComponent` adds an expandable detail row per record.\n\nThe filter-related props are reporting inputs, not behavior: `allDataLength` and `activeFiltersCount` describe the *unfiltered* set and the active filter count so the table can render an accurate empty state. Filtering itself happens upstream -- this component only receives the result. `matomoEventCategory` is required because row expansion is tracked.",
      },
    },
  },
} satisfies Meta<typeof NetworkDataTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: COLUMNS,
    data: DATA,
    allDataLength: DATA.length,
    activeFiltersCount: 0,
    matomoEventCategory: "storybook demo table",
  },
}

export const WithExpandableRows: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`subComponent` renders a detail panel under a row when it is expanded.",
      },
    },
  },
  args: {
    columns: COLUMNS,
    data: DATA,
    allDataLength: DATA.length,
    activeFiltersCount: 0,
    matomoEventCategory: "storybook demo table",
    subComponent: (row: Network) => (
      <div className="p-4 text-sm text-body-medium">{row.detail}</div>
    ),
  },
}

export const NoResults: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Empty `data` with a non-zero `activeFiltersCount` -- the filtered-to-nothing state, distinct from having no data at all.",
      },
    },
  },
  args: {
    columns: COLUMNS,
    data: [],
    allDataLength: DATA.length,
    activeFiltersCount: 2,
    matomoEventCategory: "storybook demo table",
    noResultsComponent: () => (
      <div className="p-8 text-center text-body-medium">
        No networks match the current filters.
      </div>
    ),
  },
}
