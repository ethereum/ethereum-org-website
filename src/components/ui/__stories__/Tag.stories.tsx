import { Meta, StoryObj } from "@storybook/react"

import { HStack, VStack } from "../flex"
import { Tag } from "../tag"

const meta = {
  title: "Molecules / Display Content / New Tags",
  component: Tag,
} satisfies Meta<typeof Tag>

export default meta

type Story = StoryObj<typeof meta>

// "normal" is default status
const statusArray = ["normal", "tag", "success", "error", "warning"] as const

// "subtle" is default variant
const variantArray = ["subtle", "highContrast", "solid", "outline"] as const

const StyleVariantList = () => (
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
)

export const StyleVariantsBasic: Story = {
  render: (args) => <StyleVariantList {...args} />,
}
