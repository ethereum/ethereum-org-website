import * as React from "react"
import { MdChevronRight, MdExpandMore, MdNightlight } from "react-icons/md"
import { HStack, Text, ThemingProps, VStack } from "@chakra-ui/react"
import { getThemingArgTypes } from "@chakra-ui/storybook-addon"
import { Meta, StoryObj } from "@storybook/react"

import theme from "../../@chakra-ui/theme"
import Translation from "../Translation"

import Button from "./Button"
import ButtonLink from "./ButtonLink"
import IconButton from "./IconButton"

const meta = {
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
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

const variants: ThemingProps<"Button">["variant"][] = [
  "solid",
  "outline",
  "ghost",
  "link",
]

export const StyleVariants: Story = {
  argTypes: {
    size: {
      ...getThemingArgTypes(theme, "Button")?.size,
      defaultValue: "md",
    },
  },
  render: (args) => (
    <VStack spacing={4}>
      {variants.map((variant, idx) => (
        <HStack spacing={4} key={idx}>
          <Button variant={variant} {...args} />
          <Button variant={variant} isDisabled {...args} />
        </HStack>
      ))}
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

export const OverrideStyles: Story = {
  render: () => (
    <>
      <Text>
        Show custom styling examples here for visual testing of overrides from
        the theme config
      </Text>
      <VStack>
        <IconButton aria-label="toggle" icon={<MdNightlight />} px="1.5" />
        <ButtonLink href="#" borderRadius="full" px="0" py="0">
          <Translation id="get-involved" />
        </ButtonLink>
      </VStack>
    </>
  ),
}
