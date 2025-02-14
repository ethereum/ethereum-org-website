import type { CSSProperties } from "react"
import { Meta, StoryObj } from "@storybook/react"

import { HStack } from "@/components/ui/flex"

import { screens } from "@/lib/utils/screen"

import { langViewportModes } from "../../../../.storybook/modes"

import MdxHeroComponent from "./"

const meta = {
  title: "Organisms / Layouts / Hero",
  component: MdxHeroComponent,
  parameters: {
    layout: "none",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
  decorators: [
    (Story) => (
      <HStack
        style={{ "--hero-decorator-max-w": screens["2xl"] } as CSSProperties}
        className="mx-auto h-[100vh] max-w-[var(--hero-decorator-max-w)]"
      >
        <Story />
      </HStack>
    ),
  ],
} satisfies Meta<typeof MdxHeroComponent>

export default meta

export const MdxHero: StoryObj<typeof meta> = {
  args: {
    breadcrumbs: { slug: "/en/staking/solo/" },
    title: "Solo stake your Eth",
  },
}
