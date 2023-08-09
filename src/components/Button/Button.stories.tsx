import * as React from "react"
import { HStack, IconButton, ThemingProps, VStack } from "@chakra-ui/react"
import { getThemingArgTypes } from "@chakra-ui/storybook-addon"
import { Meta, StoryObj } from "@storybook/react"
import { MdExpandMore, MdChevronRight } from "react-icons/md"
import Button from "."
import theme from "../../@chakra-ui/gatsby-plugin/theme"

type ButtonType = typeof Button

const meta: Meta<ButtonType> = {
  title: "Atoms / Form / Buttons",
  component: Button,
  args: {
    children: "What is Ethereum?",
  },
  argTypes: {
    isSecondary: {
      defaultValue: false,
      type: "boolean",
      name: "Is a secondary color?",
      if: { arg: "variant", neq: "solid" },
    },
  },
}

export default meta

type Story = StoryObj<ButtonType>

const variants: ThemingProps<"Button">["variant"][] = [
  "solid",
  "outline",
  "ghost",
  "link",
]

export const StyleVariants: Story = {
  argTypes: {
    size: {
      //@ts-expect-error
      ...getThemingArgTypes(theme, "Button")?.size,
      defaultValue: "md",
    },
  },
  render: (args) => (
    <VStack spacing={4}>
      {variants.map((variant, idx) => {
        if (args.isSecondary && variant === "solid") return
        return (
          <HStack spacing={4} key={idx}>
            <Button variant={variant} {...args} />
            <Button variant={variant} isDisabled {...args} />
          </HStack>
        )
      })}
    </VStack>
  ),
}

export const IconVariants: Story = {
  argTypes: {
    variant: {
      control: "radio",
      options: ["solid", "outline", "ghost", "link"],
    },
  },
  render: (args) => (
    <HStack>
      <VStack>
        <Button {...args} />
        <Button size="sm" {...args} />
      </VStack>
      <VStack>
        <Button leftIcon={<MdExpandMore />} {...args} />
        <Button leftIcon={<MdExpandMore />} size="sm" {...args} />
      </VStack>
      <VStack>
        <Button rightIcon={<MdChevronRight />} {...args} />
        <Button rightIcon={<MdChevronRight />} size="sm" {...args} />
      </VStack>
      <VStack>
        <IconButton aria-label="next" icon={<MdChevronRight />} {...args} />
        <IconButton
          aria-label="next"
          icon={<MdChevronRight />}
          size="sm"
          {...args}
        />
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
      <VStack maxW="171px">
        <Button variant="outline" isSecondary {...args} />
        <Button variant="outline" size="sm" isSecondary {...args} />
      </VStack>
      <VStack maxW="171px">
        <Button {...args} />
        <Button size="sm" isSecondary {...args} />
      </VStack>
      <VStack maxW="209px">
        <Button rightIcon={<MdChevronRight />} {...args} />
        <Button
          rightIcon={<MdChevronRight />}
          size="sm"
          isSecondary
          {...args}
        />
      </VStack>
    </HStack>
  ),
}
