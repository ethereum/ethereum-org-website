import { Wallet } from "lucide-react"
import Image from "next/image"
import { Meta, StoryObj } from "@storybook/nextjs"

import PathwayCard from "@/components/ui/cards/pathway-card"

import walletCardImg from "@/public/images/homepage/features/global.png"

const meta = {
  title: "UI / Cards / PathwayCard",
  component: PathwayCard,
  parameters: {
    layout: "centered",
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PathwayCard>

export default meta

type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  args: {
    href: "#",
    title: "Download a wallet",
    description:
      "A wallet lets you send, receive, store and interact with stablecoins on Ethereum.",
    banner: (
      <Image
        src={walletCardImg}
        alt=""
        sizes="(max-width: 640px) 100vw, 176px"
      />
    ),
  },
}

export const WithBadge: Story = {
  args: {
    ...WithImage.args,
    badge: { label: "Recommended", status: "success" },
  },
}

export const WithSvgIcon: Story = {
  args: {
    href: "#",
    title: "Set up your wallet",
    description:
      "A non-image banner slot — any ReactNode works. Here we pass a lucide icon directly.",
    banner: <Wallet className="size-12 text-primary" />,
  },
}

export const WithoutBanner: Story = {
  args: {
    href: "#",
    title: "Text-only card",
    description:
      "Banner is optional. Omitting it collapses the card to title + description + chevron.",
  },
}

export const Rtl: Story = {
  args: WithBadge.args,
  parameters: {
    direction: "rtl",
  },
  decorators: [
    (Story) => (
      <div dir="rtl" className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}
