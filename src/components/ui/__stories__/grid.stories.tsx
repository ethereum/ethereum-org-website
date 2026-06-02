import { ComponentProps } from "react"
import { Meta, StoryObj } from "@storybook/nextjs"

import { Grid } from "@/components/ui/grid"

const meta = {
  title: "UI / Primitives / Grid",
  component: Grid,
  parameters: {
    layout: "fullscreen",
    // Variant-axis reference stories; opt out of Chromatic by default.
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    // Constrain every story to the site's page max-width (96rem / 1536px) so
    // `columns={N}` previews as N columns at full-width desktop, then folds as
    // the canvas narrows. Bounds drawn with `outline` (not border/padding) so
    // nothing is stolen from the measured width.
    (Story) => (
      <div className="mx-auto w-full max-w-384 py-4 outline-2 outline-body-medium outline-dashed">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Grid>

export default meta

type Story = StoryObj<typeof meta>

type Columns = NonNullable<ComponentProps<typeof Grid>["columns"]>
type Size = NonNullable<ComponentProps<typeof Grid>["size"]>

// Minimal placeholder tiles so the focus stays on the grid layout, not content.
const Items = ({ count }: { count: number }) =>
  Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className="flex min-h-20 items-center justify-center rounded-lg bg-background-highlight text-sm text-body-medium"
    >
      {i + 1}
    </div>
  ))

// Default: 4 columns at the base size, folds down as the viewport narrows.
export const Default: Story = {
  args: { columns: 4, size: "base" },
  render: (args) => (
    <Grid {...args}>
      <Items count={8} />
    </Grid>
  ),
}

// One grid per `columns` value at a given `size`. Each renders exactly N
// tiles so it fills a single row at full width; narrow the canvas to fold it.
const SizeRange = ({
  size,
  counts,
}: {
  size: Size
  counts: readonly Columns[]
}) => (
  <div className="flex flex-col gap-8">
    {counts.map((columns) => (
      <div key={columns}>
        <p className="mb-2 font-mono text-xs text-body-medium">
          columns={columns} size=&quot;{size}&quot;
        </p>
        <Grid columns={columns} size={size}>
          <Items count={columns} />
        </Grid>
      </div>
    ))}
  </div>
)

// The three `size` presets, each across the column range it can express at
// full width (a larger min item width caps the usable count). Larger sizes wrap
// sooner; fewer columns hold their layout longer.

// small (7rem min): small items / badges.
export const Small: Story = {
  render: () => (
    <SizeRange size="small" counts={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
  ),
}

// narrow (12rem min): small items / badges.
export const Narrow: Story = {
  render: () => (
    <SizeRange size="narrow" counts={[2, 3, 4, 5, 6, 7, 8, 9, 10]} />
  ),
}

// base (18rem min, default): standard content cards.
export const Medium: Story = {
  render: () => <SizeRange size="base" counts={[2, 3, 4, 5, 6]} />,
}

// wide (22rem min): horizontal items like callouts.
export const Wide: Story = {
  render: () => <SizeRange size="wide" counts={[2, 3, 4]} />,
}

// wider (26rem min): horizontal items like callouts.
export const Wider: Story = {
  render: () => <SizeRange size="wider" counts={[2, 3]} />,
}

// `fit` (auto-fit) collapses empty tracks so a partially-filled row stretches
// to fill the width; the default (auto-fill) keeps them. Both render 2 items in
// a columns={4} grid -- compare the trailing space.
export const Fit: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 font-mono text-xs text-body-medium">
          default (auto-fill)
        </p>
        <Grid columns={4}>
          <Items count={2} />
        </Grid>
      </div>
      <div>
        <p className="mb-2 font-mono text-xs text-body-medium">
          fit (auto-fit)
        </p>
        <Grid columns={4} fit>
          <Items count={2} />
        </Grid>
      </div>
    </div>
  ),
}
