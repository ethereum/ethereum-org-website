import { Meta, StoryObj } from "@storybook/nextjs"

import Nav from "."

const meta = {
  title: "Components / Layout / Nav",
  component: Nav,
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Top-level site navigation wrapper rendered through `BaseLayout`. Composes the home-icon logo, the desktop nav (`DesktopNav`), the mobile nav (`MobileNav`), and the SEO `CrawlableNav`. Async server component -- async `getTranslations` is supported by Storybook's `experimentalRSC` flag. Sub-components are intentionally not storied separately; the top-level composition is the visual canon.",
      },
    },
  },
} satisfies Meta<typeof Nav>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MobileViewport: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}
