import { Meta, StoryObj } from "@storybook/react"

import { Center, HStack, VStack } from "../flex"
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
const variantArray = ["subtle", "solid", "outline"] as const

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
  render: (args) => (
    <VStack className="gap-8">
      <Center>
        Click anywhere in the whitespace and then tab to see the button styling
        on `:focus-visible`
      </Center>
      <StyleVariantList {...args} />
    </VStack>
  ),
}
