import pickBy from "lodash/pickBy"
import { Box } from "@chakra-ui/react"
import type { Meta, StoryObj } from "@storybook/react"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"

import { langViewportModes } from "../../../.storybook/modes"

import {
  MobileButton,
  MobileButtonDropdown as MobileButtonDropdownComponent,
} from "./index"

const meta = {
  title: "MdComponents",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      // Largest width of the parent of `ContentContainer`
      <Box maxW="1008px" marginInline="auto">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export default meta

const dropdownLinks: ButtonDropdownList = {
  text: "common:nav-roadmap-options",
  ariaLabel: "common:nav-roadmap-options-alt",
  items: [
    {
      text: "common:nav-roadmap-home",
      to: "/roadmap/",
      matomo: {
        eventCategory: `Roadmap dropdown`,
        eventAction: `Clicked`,
        eventName: "clicked roadmap home",
      },
    },
    {
      text: "common:nav-roadmap-security",
      to: "/roadmap/security",
      matomo: {
        eventCategory: `Roadmap security dropdown`,
        eventAction: `Clicked`,
        eventName: "clicked roadmap security",
      },
    },
    {
      text: "common:nav-roadmap-scaling",
      to: "/roadmap/scaling",
      matomo: {
        eventCategory: `Roadmap scaling dropdown`,
        eventAction: `Clicked`,
        eventName: "clicked roadmap scaling home",
      },
    },
    {
      text: "common:nav-roadmap-user-experience",
      to: "/roadmap/user-experience/",
      matomo: {
        eventCategory: `Roadmap user experience dropdown`,
        eventAction: `Clicked`,
        eventName: "clicked roadmap user experience home",
      },
    },
    {
      text: "common:nav-roadmap-future-proofing",
      to: "/roadmap/future-proofing",
      matomo: {
        eventCategory: `Roadmap future-proofing dropdown`,
        eventAction: `Clicked`,
        eventName: "clicked roadmap future-proofing home",
      },
    },
  ],
}

export const MobileButtonDropdown: StoryObj<
  typeof MobileButtonDropdownComponent
> = {
  parameters: {
    layout: "centered",
    chromatic: {
      modes: pickBy(langViewportModes, (args) =>
        ["md", "lg"].includes(args.viewport)
      ),
    },
  },
  args: {
    list: dropdownLinks,
  },
  render: (args) => {
    return (
      <>
        <Box hideBelow="lg">
          `MobileButtonDropdown` is hidden at the `lg` breakpoint and higher
        </Box>
        <MobileButton>
          <MobileButtonDropdownComponent {...args} />
        </MobileButton>
      </>
    )
  },
}
