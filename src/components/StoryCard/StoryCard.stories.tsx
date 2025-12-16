import { Meta, type StoryObj } from "@storybook/react"

import { StoryCategory } from "@/lib/types"

import StoryCard from "."

const meta = {
  component: StoryCard,
  decorators: [
    (Story) => (
      <div className="max-w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StoryCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    story: {
      slug: "maria-venezuela-remittances",
      name: "Maria",
      role: "Small Business Owner",
      location: {
        country: "Venezuela",
        region: "Latin America",
      },
      date: "2024-03-15",
      category: StoryCategory.FINANCIAL_INCLUSION,
      tags: ["remittances", "stablecoins", "developing-nations", "payments"],
      storyEnglish:
        "When hyperinflation made our currency worthless, my family in the US couldn't send money through traditional channels - the fees were 15% and it took weeks. Now they send USDC on Ethereum L2s, and I receive it in minutes for less than a dollar.",
      storyOriginal: null,
      relatedPages: ["/defi/", "/stablecoins/", "/layer-2/"],
      featured: true,
    },
  },
}

export const WithOriginalLanguage: Story = {
  args: {
    story: {
      slug: "priya-india-artisan",
      name: "Priya",
      role: "Textile Artisan",
      location: {
        country: "India",
        region: "Asia",
      },
      date: "2024-08-14",
      category: StoryCategory.CREATOR_ECONOMY,
      tags: ["artisans", "nft", "fair-trade", "creators"],
      storyEnglish:
        "For generations, middlemen took most of the profit from our traditional textile work. Now I sell my designs directly as NFTs, and smart contracts ensure I receive royalties every time my work is resold.",
      storyOriginal:
        "पीढ़ियों से, बिचौलिये हमारे पारंपरिक कपड़ा काम से ज्यादातर मुनाफा ले जाते थे।",
      originalLanguage: "hi",
      relatedPages: ["/nft/", "/dao/"],
    },
  },
}

export const Healthcare: Story = {
  args: {
    story: {
      slug: "chen-taiwan-medical",
      name: "Dr. Chen Wei-Lin",
      role: "Hospital Administrator",
      location: {
        country: "Taiwan",
        region: "Asia",
      },
      date: "2024-04-05",
      category: StoryCategory.HEALTHCARE,
      tags: ["medical-records", "privacy", "data-ownership"],
      storyEnglish:
        "Our hospital network implemented an Ethereum-based system for patient medical records. Patients control access to their own data through their wallets.",
      storyOriginal: null,
      relatedPages: ["/wallets/", "/developers/docs/"],
    },
  },
}
