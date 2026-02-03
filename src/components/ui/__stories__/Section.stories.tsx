import { Meta, StoryObj } from "@storybook/react"

import {
  Section,
  SectionBanner,
  SectionBody,
  SectionContent,
  SectionHeader,
  SectionSubheader,
  SectionTag,
} from "../section"

const meta = {
  title: "Atoms / Layout / Section",
  component: Section,
  parameters: {
    layout: "none",
    chromatic: {
      modes: {
        "en-base": { viewport: "base", locale: "en" },
        "en-md": { viewport: "md", locale: "en" },
        "en-lg": { viewport: "lg", locale: "en" },
        "ar-base": { viewport: "base", locale: "ar" },
        "ar-md": { viewport: "md", locale: "ar" },
        "ar-lg": { viewport: "lg", locale: "ar" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Section>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Section>
      <SectionTag>Tag label</SectionTag>
      <SectionHeader>Section Header</SectionHeader>
      <SectionContent>
        <p>
          This is the default Section layout with SectionTag, SectionHeader, and
          SectionContent.
        </p>
        <p>SectionContent uses a vertical stack with consistent spacing.</p>
      </SectionContent>
    </Section>
  ),
}

export const WithSubheader: Story = {
  render: () => (
    <Section>
      <SectionTag>Tag label</SectionTag>
      <SectionHeader>Section Header</SectionHeader>
      <SectionSubheader>Subsection Heading</SectionSubheader>
      <SectionBody>
        <p>
          SectionSubheader renders as an h3 by default, one level below
          SectionHeader&apos;s h2.
        </p>
        <p>
          SectionBody provides consistent vertical spacing (mt-4 md:mt-16)
          between the heading and content below.
        </p>
      </SectionBody>
    </Section>
  ),
}

export const SubheaderHeadingLevels: Story = {
  render: () => (
    <Section>
      <SectionHeader>Heading Levels Demo</SectionHeader>
      <div className="space-y-4">
        <SectionSubheader as="h2">as h2</SectionSubheader>
        <SectionSubheader as="h3">as h3 (default)</SectionSubheader>
        <SectionSubheader as="h4">as h4</SectionSubheader>
        <SectionSubheader as="h5">as h5</SectionSubheader>
        <SectionSubheader as="h6">as h6</SectionSubheader>
      </div>
    </Section>
  ),
}

export const WithBanner: Story = {
  render: () => (
    <Section variant="responsiveFlex">
      <SectionBanner>
        <div className="flex h-64 items-center justify-center bg-primary-low-contrast text-body-medium">
          Banner image area
        </div>
      </SectionBanner>
      <SectionContent>
        <SectionTag>Tag label</SectionTag>
        <SectionHeader>Section with Banner</SectionHeader>
        <p>
          The responsiveFlex variant creates a side-by-side layout at md
          breakpoint, with SectionBanner and SectionContent as children.
        </p>
      </SectionContent>
    </Section>
  ),
}

export const CompositionExample: Story = {
  render: () => (
    <div className="space-y-16">
      <Section>
        <SectionTag>Explore</SectionTag>
        <SectionHeader>What is Ethereum?</SectionHeader>
        <SectionContent>
          <p>
            Ethereum is a technology for building apps and organizations,
            holding assets, transacting and communicating without being
            controlled by a central authority.
          </p>
        </SectionContent>
        <SectionSubheader>Get started</SectionSubheader>
        <SectionBody>
          <div className="grid grid-cols-fill-4 gap-8">
            <div className="rounded-lg border p-4">Card 1</div>
            <div className="rounded-lg border p-4">Card 2</div>
            <div className="rounded-lg border p-4">Card 3</div>
            <div className="rounded-lg border p-4">Card 4</div>
          </div>
        </SectionBody>
      </Section>
    </div>
  ),
}
