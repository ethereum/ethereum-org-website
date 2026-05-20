import { Meta, StoryObj } from "@storybook/nextjs"

import Footer from "."

const meta = {
  title: "Components / Layout / Footer",
  component: Footer,
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Site footer rendered through `BaseLayout`. Async server component (`getTranslations`), so the linked labels come from the active locale. Surfaces five link-section columns, social icons, dipper links (privacy, terms, etc.), and the `GoToTopButton`. `lastDeployLocaleTimestamp` is a pre-formatted string -- the caller is responsible for locale-formatting before passing it in.",
      },
    },
  },
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    lastDeployLocaleTimestamp: "May 15, 2026, 9:42 AM",
  },
}

export const MobileViewport: Story = {
  args: {
    lastDeployLocaleTimestamp: "May 15, 2026, 9:42 AM",
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}
