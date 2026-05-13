import type { Meta, StoryObj } from "@storybook/nextjs"

import { Center, Flex, HStack, Stack, VStack } from "../flex"

const meta = {
  title: "UI / Flex",
  component: Flex,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Flex layout primitives. `Flex` is the base (no axis or alignment defaults beyond `display: flex`). `Center` aligns and centers with `gap-2`. `Stack` is `flex-col gap-2` and accepts a `separator` element rendered between children. `HStack` and `VStack` extend `Stack` with horizontal/vertical orientation and centered cross-axis alignment.",
      },
    },
  },
} satisfies Meta<typeof Flex>

export default meta

type Story = StoryObj<typeof meta>

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded bg-primary-low-contrast px-3 py-2 text-sm text-primary">
    {children}
  </div>
)

export const FlexBase: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`Flex` only applies `display: flex`. Add direction, alignment, and gap with Tailwind utilities.",
      },
    },
  },
  render: () => (
    <Flex className="gap-2">
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Flex>
  ),
}

export const CenterBase: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`Center` is `flex items-center justify-center gap-2`. Use for centered icon + text pairs or single-element centering.",
      },
    },
  },
  render: () => (
    <Center className="h-32 rounded-md border">
      <Box>Centered</Box>
    </Center>
  ),
}

export const StackBase: Story = {
  parameters: {
    docs: {
      description: {
        story: "`Stack` is `flex flex-col gap-2` (vertical, no separator).",
      },
    },
  },
  render: () => (
    <Stack>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
}

export const StackWithSeparator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass a `separator` element to render it between children. The separator is cloned with `border self-stretch`.",
      },
    },
  },
  render: () => (
    <Stack separator={<hr />}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
}

export const HStackBase: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`HStack` lays out children horizontally with centered cross-axis alignment.",
      },
    },
  },
  render: () => (
    <HStack>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </HStack>
  ),
}

export const VStackBase: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`VStack` lays out children vertically with centered cross-axis alignment (each item is centered horizontally).",
      },
    },
  },
  render: () => (
    <VStack>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </VStack>
  ),
}

export const HStackWithSeparator: Story = {
  render: () => (
    <HStack separator={<hr />}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </HStack>
  ),
}

export const VStackWithSeparator: Story = {
  render: () => (
    <VStack separator={<hr />}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </VStack>
  ),
}
