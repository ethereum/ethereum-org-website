import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  Section,
  SectionBanner,
  SectionContent,
  SectionHeader,
  SectionTag,
} from "../section"

const meta = {
  title: "UI / Section",
  component: Section,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Top-level page section. `variant: responsiveFlex` enables a column-on-mobile / row-on-desktop layout. `scrollMargin: tabNav` adds extra scroll-margin so sticky-nav layouts land below the nav. Sub-components: `SectionBanner`, `SectionTag`, `SectionHeader`, `SectionContent`.",
      },
    },
  },
} satisfies Meta<typeof Section>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Section id="overview" className="space-y-4">
      <SectionTag>Overview</SectionTag>
      <SectionHeader>What is Ethereum?</SectionHeader>
      <SectionContent>
        <p>
          Ethereum is a decentralized, open-source blockchain featuring smart
          contract functionality.
        </p>
      </SectionContent>
    </Section>
  ),
}

export const ResponsiveFlex: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`variant: responsiveFlex` stacks on mobile and switches to a row at `md`.",
      },
    },
  },
  render: () => (
    <Section id="responsive" variant="responsiveFlex">
      <SectionBanner>
        <div className="grid h-48 place-items-center text-sm text-body-medium">
          Banner area
        </div>
      </SectionBanner>
      <SectionContent>
        <SectionTag>Layer 2</SectionTag>
        <SectionHeader>Scaling Ethereum</SectionHeader>
        <p>
          Layer 2 networks bundle transactions off-chain and post proofs to
          mainnet, reducing fees and increasing throughput.
        </p>
      </SectionContent>
    </Section>
  ),
}

export const TabNavScrollMargin: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`scrollMargin: tabNav` adds the extra scroll-margin needed when the page has a sticky tab nav above the fold. The visual effect is invisible at rest; observe by hash-navigating to `#tab-nav-section`.",
      },
    },
  },
  render: () => (
    <Section
      id="tab-nav-section"
      scrollMargin="tabNav"
      className="space-y-4 rounded-md border bg-background-highlight p-6"
    >
      <SectionTag>Sticky-nav layout</SectionTag>
      <SectionHeader>Lands below the tab nav</SectionHeader>
      <SectionContent>
        <p>
          Linking to `#tab-nav-section` will scroll so the section starts below
          the sticky nav, not under it.
        </p>
      </SectionContent>
    </Section>
  ),
}

export const TagVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`SectionTag` has two variants: `pill` (default, low-contrast bg) and `plain` (semibold uppercase, no background).",
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <SectionTag variant="pill">Pill (default)</SectionTag>
      <SectionTag variant="plain">Plain</SectionTag>
    </div>
  ),
}
