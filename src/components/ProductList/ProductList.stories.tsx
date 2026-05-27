import { Meta, StoryObj } from "@storybook/nextjs"

import ProductList from "."

const meta = {
  title: "Components / Content / ProductList",
  component: ProductList,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Vertical list of product / tool entries used on directory pages (wallets, dapps, dev tools). Each row shows an optional 66x66 thumbnail, a title, a description, optional content items, and an optional outlined CTA labelled by `actionLabel`. Pass `category` to render a heading above the list. Items are visually separated by dividers between rows.",
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

const sampleContent = [
  {
    title: "Uniswap",
    description:
      "A decentralized exchange protocol that lets users swap tokens without intermediaries.",
    image: "/images/dapps/uni.png",
    alt: "Uniswap logo",
    link: "https://uniswap.org",
  },
  {
    title: "Aave",
    description:
      "An open-source, non-custodial protocol for earning interest on deposits and borrowing assets.",
    image: "/images/dapps/aave.png",
    alt: "Aave logo",
    link: "https://aave.com",
  },
  {
    title: "Compound",
    description:
      "An algorithmic, autonomous interest rate protocol for lending and borrowing crypto assets.",
    image: "/images/dapps/compound.png",
    alt: "Compound logo",
    link: "https://compound.finance",
  },
]

export const Default: Story = {
  args: {
    actionLabel: "Visit",
    content: sampleContent,
  },
}

export const WithCategory: Story = {
  args: {
    actionLabel: "Visit",
    category: "Decentralized exchanges",
    content: sampleContent,
  },
}

export const WithoutImages: Story = {
  args: {
    actionLabel: "Open",
    content: sampleContent.map(({ title, description, link }) => ({
      title,
      description,
      link,
    })),
  },
}

export const WithoutLinks: Story = {
  args: {
    actionLabel: "Visit",
    content: sampleContent.map(({ title, description, image, alt }) => ({
      title,
      description,
      image,
      alt,
    })),
  },
}

export const WithContentItems: Story = {
  args: {
    actionLabel: "Visit",
    category: "Lending markets",
    content: [
      {
        title: "Morpho",
        description:
          "Permissionless lending markets with isolated risk and curated vaults.",
        image: "/images/dapps/morpho.png",
        alt: "Morpho logo",
        link: "https://morpho.org",
        contentItems: [
          <span key="markets">Isolated markets</span>,
          <span key="audited">Audited contracts</span>,
        ],
      },
      {
        title: "Spark",
        description:
          "Borrow and save against blue-chip collateral on Ethereum mainnet.",
        image: "/images/dapps/sparkfi.png",
        alt: "Spark logo",
        link: "https://spark.fi",
        contentItems: [
          <span key="rates">Predictable savings rates</span>,
          <span key="dai">Backed by the DAI stablecoin</span>,
        ],
      },
    ],
  },
}
