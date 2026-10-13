import { Meta, StoryObj } from "@storybook/nextjs"

import ProductList, { type ProductListContent } from "."

import aaveLogo from "@/public/images/dapps/aave.png"
import compoundLogo from "@/public/images/dapps/compound.png"
import morphoLogo from "@/public/images/dapps/morpho.png"
import sparkfiLogo from "@/public/images/dapps/sparkfi.png"
import uniLogo from "@/public/images/dapps/uni.png"

const meta = {
  title: "Components / ProductList",
  component: ProductList,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          'List of product / tool entries used on directory pages (wallets, dapps, dev tools). Each entry is a ghost `Card` whose whole surface links to the product: an optional logo thumbnail beside the title and description, and a required outlined CTA (`ctaLabel`, a complete self-descriptive label such as "Visit Uniswap") as the sole action. Pass `category` to render a heading above the list, and `columns={2}` to lay entries out in two columns when there\'s room.',
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
} satisfies Meta<typeof ProductList>

export default meta

type Story = StoryObj<typeof meta>

const sampleContent: ProductListContent[] = [
  {
    title: "Uniswap",
    description:
      "A decentralized exchange protocol that lets users swap tokens without intermediaries.",
    image: uniLogo,
    alt: "Uniswap logo",
    href: "https://uniswap.org",
    ctaLabel: "Visit Uniswap",
  },
  {
    title: "Aave",
    description:
      "An open-source, non-custodial protocol for earning interest on deposits and borrowing assets.",
    image: aaveLogo,
    alt: "Aave logo",
    href: "https://aave.com",
    ctaLabel: "Visit Aave",
  },
  {
    title: "Compound",
    description:
      "An algorithmic, autonomous interest rate protocol for lending and borrowing crypto assets.",
    image: compoundLogo,
    alt: "Compound logo",
    href: "https://compound.finance",
    ctaLabel: "Visit Compound",
  },
]

export const Default: Story = {
  args: {
    content: sampleContent,
  },
}

export const WithCategory: Story = {
  args: {
    category: "Decentralized exchanges",
    content: sampleContent,
    columns: 2,
  },
}

export const WithoutImages: Story = {
  args: {
    content: sampleContent.map((item) => ({
      title: item.title,
      description: item.description,
      href: item.href,
      ctaLabel: item.ctaLabel,
    })),
  },
}

export const MultipleParagraphs: Story = {
  args: {
    category: "Lending markets",
    content: [
      {
        title: "Morpho",
        description: [
          "Permissionless lending markets with isolated risk and curated vaults.",
          "Isolated markets, audited contracts.",
        ],
        image: morphoLogo,
        alt: "Morpho logo",
        href: "https://morpho.org",
        ctaLabel: "Visit Morpho",
      },
      {
        title: "Spark",
        description: [
          "Borrow and save against blue-chip collateral on Ethereum mainnet.",
          "Predictable savings rates, backed by the DAI stablecoin.",
        ],
        image: sparkfiLogo,
        alt: "Spark logo",
        href: "https://spark.fi",
        ctaLabel: "Visit Spark",
      },
    ],
  },
}
