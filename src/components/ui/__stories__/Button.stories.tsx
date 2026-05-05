import { ChevronDown, ChevronRight } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { Button, type ButtonVariantProps } from "../buttons/Button"
import { HStack, VStack } from "../flex"

const meta = {
  title: "UI / Button",
  component: Button,
  args: {
    children: "What is Ethereum?",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Action button. `variant`: `solid | outline | ghost | link`. `size`: `lg | md | sm`. `isSecondary` switches the text/border tone from primary to body color, but is a no-op on `solid` and `link`. Pass `asChild` to render as another element (e.g. anchor) while keeping the button styling.",
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const VARIANTS: ButtonVariantProps["variant"][] = [
  "solid",
  "outline",
  "ghost",
  "link",
]

const SIZES: ButtonVariantProps["size"][] = ["lg", "md", "sm"]

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <VStack className="items-start gap-4">
      {VARIANTS.map((variant) => (
        <HStack key={variant} className="gap-4">
          <Button variant={variant} {...args} />
          <Button variant={variant} disabled {...args} />
        </HStack>
      ))}
    </VStack>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <HStack className="items-center gap-4">
      {SIZES.map((size) => (
        <Button key={size} size={size} {...args} />
      ))}
    </HStack>
  ),
}

export const SizeVariantMatrix: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Each variant rendered at each size. Use this to spot regressions across the matrix.",
      },
    },
  },
  render: (args) => (
    <table className="border-separate border-spacing-3 text-xs">
      <thead>
        <tr>
          <th className="text-left text-body-medium" />
          {SIZES.map((size) => (
            <th key={size} className="text-left text-body-medium">
              {size}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((variant) => (
          <tr key={variant}>
            <td className="pe-4 text-left text-body-medium">{variant}</td>
            {SIZES.map((size) => (
              <td key={size}>
                <Button variant={variant} size={size} {...args} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
}

export const IsSecondary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`isSecondary` switches the primary tone to the body tone. No-op on `solid` and `link` variants -- they keep their canonical styling.",
      },
    },
  },
  render: (args) => (
    <VStack className="items-start gap-4">
      {VARIANTS.map((variant) => (
        <HStack key={variant} className="gap-4">
          <Button variant={variant} {...args}>
            {variant}
          </Button>
          <Button variant={variant} isSecondary {...args}>
            {variant} + isSecondary
          </Button>
        </HStack>
      ))}
    </VStack>
  ),
}

export const AsChild: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`asChild` renders the button styling on the child element. Useful for wrapping non-button elements (anchors, custom components) without losing button styles.",
      },
    },
  },
  render: () => (
    <HStack className="gap-4">
      <Button asChild>
        <a href="#asChild">Anchor as button</a>
      </Button>
      <Button variant="outline" asChild>
        <a href="#asChild">Outline anchor</a>
      </Button>
    </HStack>
  ),
}

export const IconVariants: Story = {
  render: (args) => (
    <HStack>
      <VStack>
        <Button {...args} />
        <Button size="sm" {...args} />
      </VStack>
      <VStack>
        <Button {...args}>
          <ChevronDown />
          {args.children}
        </Button>
        <Button size="sm" {...args}>
          <ChevronDown />
          {args.children}
        </Button>
      </VStack>
      <VStack>
        <Button {...args}>
          {args.children}
          <ChevronRight />
        </Button>
        <Button size="sm" {...args}>
          {args.children}
          <ChevronRight />
        </Button>
      </VStack>
      <VStack>
        <Button aria-label="next" {...args}>
          <ChevronRight />
        </Button>
        <Button aria-label="next" size="sm" {...args}>
          <ChevronRight />
        </Button>
      </VStack>
    </HStack>
  ),
}

export const MultiLineText: Story = {
  args: {
    children: "Button label can have two lines",
  },
  render: (args) => (
    <HStack>
      <VStack className="max-w-[171px]">
        <Button variant="outline" isSecondary {...args} />
        <Button variant="outline" size="sm" isSecondary {...args} />
      </VStack>
      <VStack className="max-w-[171px]">
        <Button {...args} />
        <Button size="sm" {...args} />
      </VStack>
      <VStack className="max-w-[209px]">
        <Button {...args}>
          {args.children}
          <ChevronRight />
        </Button>
        <Button size="sm" {...args}>
          {args.children}
          <ChevronRight />
        </Button>
      </VStack>
    </HStack>
  ),
}
