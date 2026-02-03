/**
 * Page-section stories for Chromatic visual regression testing.
 * These render representative homepage section markup with mocked data
 * so that component migrations show up as Chromatic diffs.
 */
import { Meta, StoryObj } from "@storybook/react"

import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import {
  Section,
  SectionBody,
  SectionContent,
  SectionHeader,
  SectionSubheader,
  SectionTag,
} from "@/components/ui/section"

const meta = {
  title: "Pages / Homepage / Sections",
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
      <div className="w-full space-y-32 px-4 md:mx-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const mockEvents = [
  {
    id: "1",
    title: "Devconnect 2025",
    dateRange: "Nov 12 – 19, 2025",
    location: "Istanbul, Turkey",
  },
  {
    id: "2",
    title: "ETHGlobal Bangkok",
    dateRange: "Dec 1 – 3, 2025",
    location: "Bangkok, Thailand",
  },
  {
    id: "3",
    title: "EthCC 2025",
    dateRange: "Jul 8 – 10, 2025",
    location: "Cannes, France",
  },
]

const mockBlogPosts = [
  { name: "Ethereum Foundation Blog", href: "https://blog.ethereum.org" },
  { name: "Attestant", href: "https://www.attestant.io/posts/" },
  { name: "Bankless", href: "https://www.bankless.com/" },
  { name: "Week in Ethereum News", href: "https://weekinethereumnews.com/" },
]

/**
 * Recent Posts section — uses SectionSubheader + inline spacing on swiper.
 * The h3 and paragraph below it are what we're migrating.
 */
export const RecentPosts: Story = {
  render: () => (
    <Section id="recent">
      <SectionSubheader>Recent posts</SectionSubheader>
      <p>What the Ethereum community is saying</p>

      {/* RecentPostsSwiper placeholder — mt-4 md:mt-16 is on the component */}
      <SectionBody>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Card key={i}>
              <CardBanner background="accent-a">
                <div className="flex h-32 items-center justify-center text-2xl">
                  Blog {i + 1}
                </div>
              </CardBanner>
              <CardContent>
                <CardTitle>Blog Post Title {i + 1}</CardTitle>
                <CardParagraph variant="light" size="sm">
                  Jan {i + 1}, 2025
                </CardParagraph>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionBody>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border p-8">
        <p className="text-lg">Read more from the community</p>
        <div className="flex flex-wrap gap-x-6 gap-y-4">
          {mockBlogPosts.map(({ name, href }) => (
            <a key={name} href={href} className="text-primary underline">
              {name}
            </a>
          ))}
        </div>
      </div>
    </Section>
  ),
}

/**
 * Events section — uses SectionSubheader + SectionBody wrapping a card grid.
 * The h3, paragraph, spacing div, and grid are what we're migrating.
 */
export const Events: Story = {
  render: () => (
    <Section id="events">
      <SectionSubheader>Upcoming events</SectionSubheader>
      <p>Come to an Ethereum event</p>
      <SectionBody>
        <div className="grid grid-cols-1 gap-8 self-stretch sm:grid-cols-2 md:grid-cols-3">
          {mockEvents.map((event) => (
            <Card key={event.id} href="#">
              <CardBanner background="accent-b">
                <div className="flex h-40 items-center justify-center text-body-medium">
                  Event image
                </div>
              </CardBanner>
              <CardContent>
                <CardTitle>{event.title}</CardTitle>
                <CardParagraph variant="subtitle" size="sm">
                  {event.dateRange}
                </CardParagraph>
                <CardParagraph variant="uppercase">
                  {event.location}
                </CardParagraph>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionBody>
      <div className="flex py-8 sm:justify-center">
        <ButtonLink href="/community/events/" size="lg">
          See all events
        </ButtonLink>
      </div>
    </Section>
  ),
}

/**
 * What is Ethereum section — uses Section compound pattern with
 * SectionTag, SectionHeader, SectionContent, and SectionBanner.
 * This pattern is already migrated; here for regression coverage.
 */
export const WhatIsEthereum: Story = {
  render: () => (
    <Section id="what-is-ethereum" variant="responsiveFlex">
      <SectionContent>
        <SectionTag>The network</SectionTag>
        <SectionHeader>What is Ethereum?</SectionHeader>
        <div className="space-y-6 py-8 text-lg text-body">
          <p>
            Ethereum is a technology for building apps and organizations,
            holding assets, transacting and communicating without being
            controlled by a central authority.
          </p>
          <p>
            You don&apos;t need to hand over all your personal details to use
            Ethereum — you keep control of your own data.
          </p>
        </div>
        <div className="flex">
          <ButtonLink href="/what-is-ethereum/" size="lg">
            Learn about Ethereum
          </ButtonLink>
        </div>
      </SectionContent>
    </Section>
  ),
}
