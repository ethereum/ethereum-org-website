import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"

import { Center, Stack } from "../flex"

const meta = {
  title: "Atoms / Typography / Heading",
  parameters: {
    layout: null,
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
  decorators: [
    (Story) => (
      <Center className="min-h-[100vh] flex-col">
        <Story />
      </Center>
    ),
  ],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"] as const

export const Heading: Story = {
  render: () => (
    <>
      <div>
        Adjust the viewport to below &quot;md&quot; to see the font size and
        line height change
      </div>
      <Stack>
        {headings.map((Heading) => (
          <Heading key={Heading}>{`${Heading} base component`}</Heading>
        ))}
      </Stack>
    </>
  ),
}
