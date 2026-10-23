import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "../button-group"
import { Button } from "../buttons/Button"
import { VStack } from "../flex"

const meta = {
  title: "UI / ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Joins adjacent buttons into one segmented control by stripping the inner radii and collapsing the shared border. The seam is pure CSS on `:not(:first-child)` / `:not(:last-child)`, so it adapts to however many children you pass -- no index bookkeeping. Focus rings are lifted with `z-10` so they aren't clipped by the neighbour.\n\n`ButtonGroupText` adds a non-interactive segment (prefix, suffix, unit). Nesting a `ButtonGroup` inside another one gaps the two clusters apart instead of joining them.",
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`orientation="vertical"` stacks the segments and moves the seam to the top/bottom edges.',
      },
    },
  },
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
}

export const WithText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`ButtonGroupText` is a non-interactive segment on the highlight background -- use it for a unit or a static prefix.",
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Gas</ButtonGroupText>
      <Button variant="outline">Slow</Button>
      <Button variant="outline">Average</Button>
      <Button variant="outline">Fast</Button>
      <ButtonGroupText>gwei</ButtonGroupText>
    </ButtonGroup>
  ),
}

export const WithSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`ButtonGroupSeparator` draws an explicit rule between segments -- useful when neighbouring buttons share a fill and the collapsed border alone doesn't read as a division.",
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <Button variant="solid">Save</Button>
      <ButtonGroupSeparator />
      <Button variant="solid">Publish</Button>
    </ButtonGroup>
  ),
}

export const NestedGroups: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A `ButtonGroup` whose direct children are themselves groups gets `gap-2` instead of a seam, so the clusters read as separate controls on one row.",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-4">
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Bold</Button>
          <Button variant="outline">Italic</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </ButtonGroup>
    </VStack>
  ),
}
