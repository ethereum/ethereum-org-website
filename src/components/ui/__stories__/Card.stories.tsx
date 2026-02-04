import type { Meta, StoryObj } from "@storybook/react"

import { HStack, VStack } from "@/components/atoms/flex"

import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "../card"

const meta = {
  title: "Molecules / Display Content / Card",
  component: Card,
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

// Common card styling used across the codebase
const cardClass = "border border-body-light bg-background-highlight"

export const Default: Story = {
  render: () => (
    <Card className={`max-w-sm ${cardClass}`}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <CardParagraph>
          This is the canonical Card component using the compound pattern.
        </CardParagraph>
      </CardContent>
    </Card>
  ),
}

export const WithBanner: Story = {
  render: () => (
    <Card className={`max-w-sm overflow-hidden ${cardClass}`}>
      <CardBanner background="accent-a">
        <div className="flex h-full items-center justify-center text-4xl">
          🎨
        </div>
      </CardBanner>
      <CardContent>
        <CardTitle>Card with Banner</CardTitle>
        <CardParagraph>
          Using CardBanner with accent background gradient.
        </CardParagraph>
      </CardContent>
    </Card>
  ),
}

export const BannerBackgrounds: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4">
      {(
        ["accent-a", "accent-b", "accent-c", "primary", "body", "none"] as const
      ).map((bg) => (
        <Card key={bg} className={`overflow-hidden ${cardClass}`}>
          <CardBanner background={bg}>
            <div className="flex h-full items-center justify-center text-2xl">
              📦
            </div>
          </CardBanner>
          <CardContent>
            <CardParagraph size="sm">{bg}</CardParagraph>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

export const BannerSizes: Story = {
  render: () => (
    <HStack className="items-start gap-4">
      <Card className={`w-64 overflow-hidden ${cardClass}`}>
        <CardBanner size="full" background="accent-a">
          <div className="flex h-full items-center justify-center text-4xl">
            🖼️
          </div>
        </CardBanner>
        <CardContent>
          <CardParagraph>size=&quot;full&quot;</CardParagraph>
        </CardContent>
      </Card>
      <Card className={`overflow-hidden ${cardClass}`}>
        <CardContent className="flex items-center gap-4">
          <CardBanner size="thumbnail" background="accent-b">
            <div className="flex h-full items-center justify-center text-2xl">
              📷
            </div>
          </CardBanner>
          <div>
            <CardTitle>Thumbnail</CardTitle>
            <CardParagraph>size=&quot;thumbnail&quot;</CardParagraph>
          </div>
        </CardContent>
      </Card>
    </HStack>
  ),
}

export const TitleVariants: Story = {
  render: () => (
    <VStack className="gap-4">
      <Card className={`max-w-sm ${cardClass}`}>
        <CardContent>
          <CardTitle variant="bold">Bold Title (default)</CardTitle>
          <CardParagraph>variant=&quot;bold&quot;</CardParagraph>
        </CardContent>
      </Card>
      <Card className={`max-w-sm ${cardClass}`}>
        <CardContent>
          <CardTitle variant="black">Black Title</CardTitle>
          <CardParagraph>variant=&quot;black&quot;</CardParagraph>
        </CardContent>
      </Card>
    </VStack>
  ),
}

export const ParagraphVariants: Story = {
  render: () => (
    <Card className={`max-w-md ${cardClass}`}>
      <CardContent className="space-y-4">
        <CardParagraph variant="base">
          Base paragraph (default) - standard body text
        </CardParagraph>
        <CardParagraph variant="light">
          Light paragraph - secondary/muted text
        </CardParagraph>
        <CardParagraph variant="uppercase">
          Uppercase paragraph - labels/categories
        </CardParagraph>
        <CardParagraph variant="subtitle">
          Subtitle paragraph - italic emphasis
        </CardParagraph>
        <CardParagraph size="sm">Small size paragraph</CardParagraph>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className={`max-w-sm ${cardClass}`}>
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
      </CardHeader>
      <CardContent>
        <CardParagraph>
          Cards can have a footer section for actions or metadata.
        </CardParagraph>
      </CardContent>
      <CardFooter>
        <CardParagraph variant="light" size="sm">
          Last updated: Jan 2025
        </CardParagraph>
      </CardFooter>
    </Card>
  ),
}

export const AsLink: Story = {
  render: () => (
    <Card
      href="https://ethereum.org"
      className={`max-w-sm transition-shadow hover:shadow-md ${cardClass}`}
    >
      <CardContent>
        <CardTitle>Clickable Card</CardTitle>
        <CardParagraph>
          Pass href prop to make the entire card a link. Title underlines on
          hover.
        </CardParagraph>
      </CardContent>
    </Card>
  ),
}

export const CompositionExample: Story = {
  render: () => (
    <VStack className="gap-6">
      {/* Testimonial pattern */}
      <Card className={`max-w-md ${cardClass}`}>
        <CardContent className="flex gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-c text-xl text-body-inverse">
            V
          </div>
          <div>
            <CardTitle>Vitalik Buterin</CardTitle>
            <CardParagraph variant="light" size="sm">
              Co-founder of Ethereum
            </CardParagraph>
            <CardParagraph className="mt-2">
              &quot;Ethereum is a technology that lets you send cryptocurrency
              to anyone for a small fee.&quot;
            </CardParagraph>
          </div>
        </CardContent>
      </Card>

      {/* Feature card pattern */}
      <Card className={`max-w-md ${cardClass}`}>
        <CardContent className="flex gap-4">
          <div className="shrink-0 text-4xl">🔐</div>
          <div>
            <CardTitle>Security</CardTitle>
            <CardParagraph>
              Ethereum is secured by thousands of validators around the world.
            </CardParagraph>
          </div>
        </CardContent>
      </Card>

      {/* Stat card pattern */}
      <Card className={`max-w-sm ${cardClass}`}>
        <CardContent className="text-center">
          <CardParagraph variant="uppercase" size="sm">
            Total Value Locked
          </CardParagraph>
          <CardTitle variant="black">$50B+</CardTitle>
          <CardParagraph variant="light">across DeFi protocols</CardParagraph>
        </CardContent>
      </Card>
    </VStack>
  ),
}
