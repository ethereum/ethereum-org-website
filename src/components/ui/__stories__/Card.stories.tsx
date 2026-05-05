import Image from "next/image"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { Button } from "../buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardParagraph,
  CardTitle,
} from "../card"
import { VStack } from "../flex"

const meta = {
  title: "UI / Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          "Composable card primitive. Compose `Card` with `CardBanner`, `CardTitle`, `CardParagraph`, `CardContent`, and `CardFooter`. When `Card` receives an `href`, it renders as a link with hover/focus group classes that propagate to the banner image (scale) and title (underline).",
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

const SAMPLE_IMG = (
  <Image src="/images/dapps/uni.png" alt="" width={400} height={200} />
)

export const Default: Story = {
  render: () => (
    <Card className="w-[320px]">
      <CardContent>
        <CardTitle>Default card</CardTitle>
        <CardParagraph>
          Basic card with a title and paragraph. The simplest valid usage.
        </CardParagraph>
      </CardContent>
    </Card>
  ),
}

export const BannerBackgrounds: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All `CardBanner` `background` options: `accent-a | accent-b | accent-c | primary | body | none`.",
      },
    },
  },
  render: () => (
    <VStack className="max-w-md items-stretch gap-4">
      {(
        ["accent-a", "accent-b", "accent-c", "primary", "body", "none"] as const
      ).map((bg) => (
        <div key={bg}>
          <p className="mb-2 text-sm text-body-medium">background: {bg}</p>
          <CardBanner background={bg}>{SAMPLE_IMG}</CardBanner>
        </div>
      ))}
    </VStack>
  ),
}

export const BannerSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`size: full` (default) is a wide hero-style banner; `size: thumbnail` is a 64px square for compact list/row cards.",
      },
    },
  },
  render: () => (
    <VStack className="max-w-md items-stretch gap-6">
      <div>
        <p className="mb-2 text-sm text-body-medium">size: full (default)</p>
        <CardBanner background="accent-a" size="full">
          {SAMPLE_IMG}
        </CardBanner>
      </div>
      <div>
        <p className="mb-2 text-sm text-body-medium">size: thumbnail</p>
        <CardBanner background="accent-a" size="thumbnail">
          {SAMPLE_IMG}
        </CardBanner>
      </div>
    </VStack>
  ),
}

export const BannerFit: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`fit: cover` (default) crops to fill; `fit: contain` keeps the full image and auto-generates a blurred background from the same image.",
      },
    },
  },
  render: () => (
    <VStack className="max-w-md items-stretch gap-4">
      <div>
        <p className="mb-2 text-sm text-body-medium">fit: cover (default)</p>
        <CardBanner background="accent-a" fit="cover">
          {SAMPLE_IMG}
        </CardBanner>
      </div>
      <div>
        <p className="mb-2 text-sm text-body-medium">
          fit: contain (auto-blur background)
        </p>
        <CardBanner background="accent-a" fit="contain">
          <Image src="/images/dapps/uni.png" alt="" width={368} height={92} />
        </CardBanner>
      </div>
    </VStack>
  ),
}

export const TitleWeights: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`CardTitle` weights: `semibold` (text-lg), `bold` (text-2xl, default), `black` (text-3xl).",
      },
    },
  },
  render: () => (
    <VStack className="max-w-md items-stretch gap-3">
      <CardTitle variant="semibold">Title weight: semibold</CardTitle>
      <CardTitle variant="bold">Title weight: bold (default)</CardTitle>
      <CardTitle variant="black">Title weight: black</CardTitle>
    </VStack>
  ),
}

export const ParagraphVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`CardParagraph` `variant`: `base | light | uppercase | subtitle`. `size`: `base | sm`.",
      },
    },
  },
  render: () => (
    <VStack className="max-w-md items-stretch gap-2">
      <CardParagraph variant="base">base (default)</CardParagraph>
      <CardParagraph variant="light">light (muted)</CardParagraph>
      <CardParagraph variant="uppercase">uppercase</CardParagraph>
      <CardParagraph variant="subtitle">subtitle (italic)</CardParagraph>
      <CardParagraph size="sm">size: sm</CardParagraph>
    </VStack>
  ),
}

export const HeroCard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Realistic hero composition: full banner + title + paragraph + footer.",
      },
    },
  },
  render: () => (
    <Card className="w-[420px]">
      <CardBanner background="accent-a">{SAMPLE_IMG}</CardBanner>
      <CardContent>
        <CardTitle>Decentralized exchange</CardTitle>
        <CardParagraph>
          Swap tokens directly from your wallet without giving up custody.
        </CardParagraph>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline">
          Learn more
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const LinkCard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `Card` has an `href`, it renders as a link. Hovering propagates `group-hover/link` to the banner image (scale) and the title (underline).",
      },
    },
  },
  render: () => (
    <Card href="/dapps" className="w-[420px]">
      <CardBanner background="accent-b">{SAMPLE_IMG}</CardBanner>
      <CardContent>
        <CardTitle>Hover me</CardTitle>
        <CardParagraph>
          The whole card is clickable. The banner image scales and the title
          underlines on hover.
        </CardParagraph>
      </CardContent>
    </Card>
  ),
}
