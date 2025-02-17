import { Meta, StoryObj } from "@storybook/react"

import { HStack, VStack } from "../flex"
import { Tag, TagButton } from "../tag"

const meta = {
  title: "Molecules / Display Content / Tags",
  component: Tag,
} satisfies Meta<typeof Tag>

export default meta

type Story = StoryObj<typeof meta>

// "normal" is default status
const statusArray = ["normal", "tag", "success", "error", "warning"] as const

// "subtle" is default variant
const variantArray = ["subtle", "high-contrast", "solid", "outline"] as const
const sizeArray = ["small", "medium"] as const

export const StyleVariantsBasic: Story = {
  render: () => (
    <HStack>
      {statusArray.map((status) => (
        <VStack key={status}>
          {variantArray.map((variant) => (
            <Tag key={variant} status={status} variant={variant}>
              Tag Name
            </Tag>
          ))}
        </VStack>
      ))}
    </HStack>
  ),
}

export const StyleVariantsButton: Story = {
  render: () => (
    <HStack>
      {statusArray.map((status) => (
        <VStack key={status}>
          {variantArray.map((variant) => (
            <TagButton key={variant} status={status} variant={variant}>
              Tag Name
            </TagButton>
          ))}
        </VStack>
      ))}
    </HStack>
  ),
}

export const StyleVariantsSize: Story = {
  render: () => (
    <VStack>
      {sizeArray.map((size) => (
        <Tag key={size} status="tag" variant="subtle" size={size}>
          {size}
        </Tag>
      ))}
    </VStack>
  ),
}
