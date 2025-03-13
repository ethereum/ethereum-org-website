import type { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "../../../.storybook/modes"
import { BaseLayout as BaseLayoutComponent } from "../../layouts/BaseLayout"

import ListenToPlayer from "."

const meta = {
  title: "Atoms / Media & Icons / ListenToPlayer / ListenToPlayer",
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
      <div className="flex w-full flex-col items-center gap-4 px-8 py-9 md:flex-row">
        <ListenToPlayer slug="/eth" />
      </div>
    ),
    contentIsOutdated: false,
    contentNotTranslated: false,
    lastDeployLocaleTimestamp: "May 14, 2021",
  },
}
