import type { Meta, StoryObj } from "@storybook/react"

import { Center } from "@/components/ui/flex"

import { langViewportModes } from "../../../.storybook/modes"
import { ContentLayout as ContentLayoutComponent } from "../ContentLayout"

const meta = {
  title: "Templates / ContentLayout",
  component: ContentLayoutComponent,
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-screen-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContentLayoutComponent>

export default meta

export const ContentLayout: StoryObj<typeof meta> = {
  args: {
    children: (
      <Center className="h-[497px] border-2 border-dashed border-primary">
        Content Here
      </Center>
    ),
    tocItems: [
      {
        title: "Section 1",
        url: "/",
        items: [],
      },
      {
        title: "Section 2",
        url: "/",
        items: [],
      },
    ],
    dropdownLinks: {
      text: "More content",
      ariaLabel: "More content",
      items: [
        {
          text: "Another page",
          href: "/",
        },
        {
          text: "Another page 2",
          href: "/",
        },
      ],
    },
    maxDepth: 2,
    heroSection: (
      <Center className="h-[400px] border-2 border-dashed border-primary">
        Hero section
      </Center>
    ),
  },
}
