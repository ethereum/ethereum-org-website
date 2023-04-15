import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Box, HStack, Link, VStack } from "@chakra-ui/react"
import { TbSquareRoundedNumber8Filled } from "react-icons/tb"
import Tag from "."
import { MdInfoOutline, MdLanguage } from "react-icons/md"

type TagType = typeof Tag

const meta: Meta<TagType> = {
  title: "Molecules / Display Content / Tags",
  component: Tag,
}

export default meta

type Story = StoryObj<TagType>

// "normal" is default status
const statusArray = ["normal", "tag", "success", "error", "warning"] as const

// "subtle" is default variant
const variantArray = ["subtle", "solid", "outline"]

export const StyleVariantsAndStatuses: Story = {
  args: {
    label: "Tag Name",
  },
  render: (args) => (
    <>
      <Box textAlign="center" mb={8}>
        They are all rendered as links to hover, click, and focus
      </Box>
      <HStack>
        {statusArray.map((status) => (
          <VStack key={status}>
            {variantArray.map((variant) => (
              <Tag
                key={variant}
                as={Link}
                href="#"
                status={status}
                variant={variant}
                isCloseable
                {...args}
              />
            ))}
          </VStack>
        ))}
      </HStack>
    </>
  ),
}

export const ElementVariants: Story = {
  args: {
    status: "tag",
  },
  render: (args) => (
    <HStack>
      <Tag {...args} label="Tag name" />
      <Tag {...args} label="Tag name too big" />
      <Tag
        {...args}
        label="Tag name"
        rightIcon={TbSquareRoundedNumber8Filled}
      />
      <Tag {...args} label="Tag name" isCloseable />
      <Tag {...args} label="Tag name" leftIcon={MdLanguage} />
      <Tag {...args} label="Tag name" rightIcon={MdInfoOutline} />
      <Tag {...args} label="Tag name too big" maxW="100px" />
    </HStack>
  ),
}
