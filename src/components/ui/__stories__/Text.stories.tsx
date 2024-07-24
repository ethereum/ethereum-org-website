import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"

import { cn } from "@/lib/utils/cn"

import LinkComponent from "../../Link"
import Translation from "../../Translation"
import { Center, Flex, Stack, VStack } from "../flex"

const meta = {
  title: "Atoms / Typography / Text",
  parameters: {
    layout: "none",
  },
  decorators: [
    (Story) => (
      <Center className="min-h-[100vh]">
        <Story />
      </Center>
    ),
  ],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const textSizes = [
  "text-6xl",
  "text-5xl",
  "text-4xl",
  "text-3xl",
  "text-2xl",
  "text-xl",
  "text-lg",
  "text-sm",
  "text-xs",
]

const SINGLE_TEXT_CHILD = <Translation id="page-index:page-index-title" />

export const Normal = {
  decorators: [
    (Story) => (
      <VStack className="w-full">
        <div>
          Adjust the viewport to below &quot;md&quot; to see the font size and
          line height change
        </div>
        <Stack>
          <Story />
        </Stack>
      </VStack>
    ),
  ],
  render: () => {
    return (
      <>
        {textSizes.map((size) => (
          <Flex key={size} className="gap-6">
            <p className={cn(size, "flex-1 text-end")}>
              {size.replace("text-", "")}
            </p>
            <p className={cn(size, "flex-[9]")}>{SINGLE_TEXT_CHILD}</p>
          </Flex>
        ))}
      </>
    )
  },
} satisfies Story

export const Bold: Story = {
  decorators: Normal.decorators,
  render: () => {
    return (
      <>
        {textSizes.map((size) => (
          <Flex key={size} className="gap-6">
            <p className={cn(size, "flex-1 text-end")}>
              {size.replace("text-", "")}
            </p>
            <p className={cn(size, "flex-[9] font-bold")}>
              {SINGLE_TEXT_CHILD}
            </p>
          </Flex>
        ))}
      </>
    )
  },
}
export const Italic: Story = {
  decorators: Normal.decorators,
  render: () => {
    return (
      <>
        {textSizes.map((size) => (
          <Flex key={size} className="gap-6">
            <p className={cn(size, "flex-1 text-end")}>
              {size.replace("text-", "")}
            </p>
            <p className={cn(size, "flex-[9] italic")}>{SINGLE_TEXT_CHILD}</p>
          </Flex>
        ))}
      </>
    )
  },
}

export const Link: Story = {
  decorators: Normal.decorators,
  render: () => {
    return (
      <>
        {textSizes.map((size) => (
          <Flex key={size} className="gap-6">
            <p className={cn(size, "flex-1 text-end")}>
              {size.replace("text-", "")}
            </p>
            <LinkComponent href="#" className={cn(size, "flex-[9]")}>
              {SINGLE_TEXT_CHILD}
            </LinkComponent>
          </Flex>
        ))}
      </>
    )
  },
}

export const BodyCopy: Story = {
  parameters: {
    chromatic: {
      modes: {
        md: {
          viewport: "md",
        },
        "2xl": {
          viewport: "2xl",
        },
      },
    },
  },
  render: () => (
    <div className="max-w-prose px-4">
      <p>
        Text body normal. Ethereum is open access to digital money and
        data-friendly services for everyone - no matter your background or
        location. It&apos;s a community-built technology behind the
        cryptocurrency ether (ETH) and thousands of applications you can use
        today!
      </p>
    </div>
  ),
}
