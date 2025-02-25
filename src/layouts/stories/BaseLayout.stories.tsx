import type { Meta, StoryObj } from "@storybook/react"

import { Center } from "@/components/ui/flex"

import { langViewportModes } from "../../../.storybook/modes"
import { BaseLayout as BaseLayoutComponent } from "../BaseLayout"

const meta = {
  title: "Templates/BaseLayout",
  component: BaseLayoutComponent,
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    lastDeployLocaleTimestamp: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof BaseLayoutComponent>

export default meta

export const BaseLayout: StoryObj<typeof meta> = {
  args: {
    children: (
      <Center className="h-[497px] border-2 border-dashed border-primary">
        Content Here
      </Center>
    ),
    contentIsOutdated: false,
    contentNotTranslated: false,
    lastDeployLocaleTimestamp: "May 14, 2021",
  },
}
