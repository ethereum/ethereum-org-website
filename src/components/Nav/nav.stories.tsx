import { userEvent, within } from "storybook/test"
import { Meta, StoryObj } from "@storybook/nextjs"

import Nav from "."

const meta = {
  title: "Components / Site Chrome / Nav",
  component: Nav,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/what-is-ethereum/" },
    },
    docs: {
      description: {
        component:
          "Top-level site navigation wrapper rendered through `BaseLayout`. Composes the home-icon logo, the desktop mega menu (`DesktopNav`), the mobile drill-down menu (`MobileNav`) chosen by `ResponsiveNav` from measured widths (full, compact, then mobile), and the SEO `CrawlableNav`. Menu sections and their links come from `buildNavigation`, aligned to the breadcrumb hubs; the section holding the current page is marked. Async server component -- async `getTranslations` is supported by Storybook's `experimentalRSC` flag. Sub-components are intentionally not storied separately; the top-level composition is the visual canon.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Nav>

export default meta

type Story = StoryObj<typeof meta>

const desktop = { viewport: { value: "xl", isRotated: false } }
const mobile = { viewport: { value: "base", isRotated: false } }

const openSection =
  (name: string): Story["play"] =>
  async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(await canvas.findByRole("button", { name }))
  }

export const Default: Story = { globals: desktop }

export const LearnMenu: Story = { globals: desktop, play: openSection("Learn") }

export const UseMenu: Story = { globals: desktop, play: openSection("Use") }

export const BuildMenu: Story = { globals: desktop, play: openSection("Build") }

export const RoadmapMenu: Story = {
  globals: desktop,
  play: openSection("Roadmap"),
}

export const CommunityMenu: Story = {
  globals: desktop,
  play: openSection("Community"),
}

// The bar drops to icon-only utilities when its full form doesn't fit
export const CompactBar: Story = {
  globals: { viewport: { value: "lg", isRotated: false } },
}

export const MobileViewport: Story = { globals: mobile }

export const MobileMenu: Story = {
  globals: mobile,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      await canvas.findByRole("button", { name: /toggle menu button/i })
    )
    const sheet = within(canvasElement.ownerDocument.body)
    await userEvent.click(await sheet.findByTestId("mobile-menu-section-use"))
  },
}
