import { Center } from "@chakra-ui/react"
import type { Meta, StoryObj } from "@storybook/react"

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
      <Center h="497px" border="2px dashed" borderColor="primary.base">
        Content Here
      </Center>
    ),
    contentIsOutdated: false,
    contentNotTranslated: false,
    lastDeployLocaleTimestamp: "May 14, 2021",
  },
}
