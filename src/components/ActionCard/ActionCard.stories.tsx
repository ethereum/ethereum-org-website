import { Meta, StoryObj } from "@storybook/nextjs"

import { ButtonLink } from "@/components/ui/buttons/Button"

import ActionCard from "."

import devBlocksImg from "@/public/images/hand-with-3d-eth-glyph-lego-blocks.png"
import communityHeroImg from "@/public/images/heroes/forest-deck-campfire-gathering-people-robot.png"
import enterpriseImg from "@/public/images/three-people-one-standing-carpet-building-blocks.png"

const meta = {
  title: "Components / Cards / ActionCard",
  component: ActionCard,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Large dual-pane action card with a tinted image area and content side, used to surface a single high-emphasis link (e.g. community subpage entry points). The whole card is a single link via `LinkBox` / `LinkOverlay`. Use `isRight` and `isBottom` to nudge the image alignment inside its pane.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Get involved",
    description:
      "The Ethereum community includes people from all backgrounds, working on many different projects.",
    href: "/community/",
    image: communityHeroImg,
    alt: "Community illustration",
  },
}

export const WithoutDescription: Story = {
  args: {
    title: "Get involved",
    href: "/community/",
    image: communityHeroImg,
    alt: "Community illustration",
  },
}

export const WithChildren: Story = {
  args: {
    title: "Enterprise on Ethereum",
    description:
      "Public, permissionless infrastructure for building secure, transparent business applications.",
    href: "/enterprise/",
    image: enterpriseImg,
    alt: "Enterprise illustration",
    children: (
      <ButtonLink href="/enterprise/" variant="outline">
        Learn more
      </ButtonLink>
    ),
  },
}

export const ImagePositioning: Story = {
  args: {
    title: "Image positioning",
    description:
      "Combine `isRight` and `isBottom` to control where the image sits inside its tinted pane.",
    href: "#",
    image: devBlocksImg,
    alt: "Developer blocks illustration",
    isRight: true,
    isBottom: false,
  },
}

export const CommunityPageStyle = {
  render: () => (
    <div className="grid gap-6 lg:grid-cols-2">
      <ActionCard
        className="m-0 flex-col rounded-xs border lg:m-4"
        title="Get involved"
        description="The Ethereum community is the best place to start contributing."
        href="/community/"
        image={communityHeroImg}
        alt="Community illustration"
        imageWidth={320}
      />
      <ActionCard
        className="m-0 flex-col rounded-xs border lg:m-4"
        title="Build with Ethereum"
        description="Documentation, tools and tutorials for builders of every skill level."
        href="/developers/"
        image={devBlocksImg}
        alt="Developer blocks illustration"
        imageWidth={320}
      />
    </div>
  ),
}
