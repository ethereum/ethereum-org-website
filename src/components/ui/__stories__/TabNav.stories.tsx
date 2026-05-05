import { useState } from "react"
import { Boxes, GraduationCap, Layers, Users } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import type { SectionNavDetails } from "@/lib/types"

import TabNav, { StickyContainer } from "../TabNav"

const meta = {
  title: "UI / TabNav",
  component: TabNav,
  parameters: {
    docs: {
      description: {
        component:
          "URL-fragment-driven section navigation. Each entry in `sections` becomes a `ButtonLink` with `href = '#' + key` (or its own `href`). Active section is auto-detected from the URL hash via `useActiveHash`; pass `activeSection` + `onSelect` for controlled use. Wrap in `StickyContainer` for sticky behavior.",
      },
    },
  },
} satisfies Meta<typeof TabNav>

export default meta

type Story = StoryObj<typeof meta>

const SECTIONS: SectionNavDetails[] = [
  { key: "overview", label: "Overview" },
  { key: "developers", label: "Developers" },
  { key: "community", label: "Community" },
  { key: "research", label: "Research" },
]

const SECTIONS_WITH_ICONS: SectionNavDetails[] = [
  { key: "layers", label: "Layers", icon: <Layers /> },
  { key: "apps", label: "Apps", icon: <Boxes /> },
  { key: "learn", label: "Learn", icon: <GraduationCap /> },
  { key: "community", label: "Community", icon: <Users /> },
]

export const Default: Story = {
  args: { sections: SECTIONS, activeSection: "overview" },
}

export const WithIcons: Story = {
  args: { sections: SECTIONS_WITH_ICONS, activeSection: "layers" },
}

const ControlledTabs = () => {
  const [active, setActive] = useState("developers")
  return (
    <TabNav sections={SECTIONS} activeSection={active} onSelect={setActive} />
  )
}

export const Controlled: Story = {
  args: { sections: SECTIONS },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `onSelect` to render `Button`s instead of `ButtonLink`s and drive the active state from React state.",
      },
    },
  },
  render: () => <ControlledTabs />,
}

export const WithMotion: Story = {
  args: {
    sections: SECTIONS,
    activeSection: "developers",
    useMotion: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "`useMotion` swaps the active-tab highlight for a Framer Motion `layoutId` so the highlight animates between tabs.",
      },
    },
  },
}

export const Sticky: Story = {
  args: { sections: SECTIONS, activeSection: "overview" },
  parameters: {
    docs: {
      description: {
        story:
          "Wrap in `StickyContainer` to make the nav stick at `top-20` while the page scrolls.",
      },
    },
  },
  render: (args) => (
    <div className="h-[600px] overflow-y-auto rounded-md border">
      <StickyContainer>
        <TabNav {...args} />
      </StickyContainer>
      <div className="space-y-4 p-6 text-sm text-body-medium">
        <p>
          Scroll to see the nav stay pinned. The actual active-section detection
          is driven by the page URL hash.
        </p>
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i}>Scrollable content row {i + 1}.</p>
        ))}
      </div>
    </div>
  ),
}
