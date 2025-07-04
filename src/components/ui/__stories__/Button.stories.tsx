import { ChevronDown, ChevronRight } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/react"

import { Button, type ButtonVariantProps } from "../buttons/Button"
import { HStack, VStack } from "../flex"

const meta = {
  title: "Atoms / Form / Buttons",
  component: Button,
  args: {
    children: "What is Ethereum?",
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const variants: ButtonVariantProps["variant"][] = [
  "solid",
  "outline",
  "ghost",
  "link",
]

export const StyleVariants: Story = {
  render: (args) => (
    <VStack className="gap-4">
      {variants.map((variant) => (
        <HStack key={variant} className="gap-4">
          <Button variant={variant} {...args} />
          <Button disabled variant={variant} {...args} />
        </HStack>
      ))}
    </VStack>
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
