import type { Meta, StoryObj } from "@storybook/nextjs"

import type { CatalogItem, ChainName } from "@/lib/types"

import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"

import CatalogItemLayout, { RelatedCatalogItems } from "."

import pandaOpsBanner from "@/public/images/panda-ops-banner.png"
import solidityBanner from "@/public/images/solidity-banner.png"
import walletLogo from "@/public/images/wallets/1inch.png"
import alphaLogo from "@/public/images/wallets/alpha.png"

const allChains = [
  ethereumNetworkData.chainName,
  ...layer2Data.map(({ chainName }) => chainName),
] as ChainName[]

const appLike: CatalogItem = {
  kind: "app",
  slug: "across",
  name: "Across",
  logo: alphaLogo,
  banner: solidityBanner,
  screenshots: [pandaOpsBanner, solidityBanner],
  tags: [{ label: "Bridge", status: "accent-a" }],
  chains: allChains.slice(0, 6),
  description:
    "Across is a cross-chain bridge for L2s and rollups secured by UMA's optimistic oracle.",
  primaryLink: { href: "https://across.to", label: "Visit website" },
  socialLinks: [
    { kind: "github", href: "https://github.com/across-protocol" },
    { kind: "x", href: "https://x.com/AcrossProtocol" },
    { kind: "discord", href: "https://discord.gg/across" },
  ],
  infoRows: [
    { label: "Founded", value: "2021" },
    { label: "Creator", value: "Risk Labs" },
    { label: "Languages", value: "English" },
    {
      label: "Last updated",
      value: "12 days ago",
      tooltip:
        "When the information about this app on ethereum.org was last updated.",
    },
  ],
  breadcrumbs: [
    { label: "ethereum.org", href: "/" },
    { label: "Apps", href: "/apps/" },
  ],
  next: { name: "Meson", href: "/apps/meson/" },
}

const longTool: CatalogItem = {
  kind: "tool",
  slug: "diamondscaffold",
  name: "Diamondscaffold: Simplifying EIP-2535 Diamond Architecture Development",
  screenshots: [],
  tags: [
    { label: "Contract tooling" },
    { label: "Archived", status: "warning" },
  ],
  subtitle: "Contract frameworks",
  chains: [],
  description: Array.from(
    { length: 12 },
    (_, i) =>
      `## Section ${i + 1}\n\nA **markdown** paragraph with a [link](https://ethereum.org) and a list:\n\n- one\n- two`
  ).join("\n\n"),
  primaryLink: {
    href: "https://github.com/example/diamondscaffold",
    label: "View on GitHub",
  },
  socialLinks: [{ kind: "code", href: "https://gitlab.com/example/repo" }],
  infoRows: [
    { label: "Type", value: "Contract frameworks" },
    { label: "GitHub stars", value: "1.2K" },
    { label: "License", value: "MIT" },
  ],
  breadcrumbs: [
    { label: "ethereum.org", href: "/" },
    { label: "Developers", href: "/developers/" },
    { label: "Tools", href: "/developers/tools/" },
  ],
}

const manyChainWallet: CatalogItem = {
  kind: "wallet",
  slug: "1inch-wallet",
  name: "1inch Wallet",
  logo: walletLogo,
  screenshots: [],
  tags: [{ label: "New to crypto" }, { label: "NFTs" }],
  subtitle: "Mobile · Browser",
  chains: allChains.slice(0, 24),
  primaryLink: { href: "https://1inch.io/wallet", label: "Visit website" },
  socialLinks: [
    { kind: "github", href: "https://github.com/1inch" },
    { kind: "reddit", href: "https://reddit.com/r/1inch" },
    { kind: "telegram", href: "https://t.me/OneInchNetwork" },
    { kind: "discord", href: "https://discord.gg/1inch" },
    { kind: "x", href: "https://x.com/1inch" },
  ],
  infoRows: [
    { label: "Last updated", value: "445 days ago" },
    { label: "Languages", value: "English, Russian, Chinese + 9" },
    { label: "Fees", value: "Swap fee: variable" },
  ],
  breadcrumbs: [
    { label: "ethereum.org", href: "/" },
    { label: "Wallets", href: "/wallets/" },
    { label: "Find wallet", href: "/wallets/find-wallet/" },
  ],
  next: { name: "Zerion Wallet", href: "/wallets/find-wallet/zerion-wallet/" },
}

const meta = {
  title: "Components / CatalogItem",
  component: CatalogItemLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: { navigation: { pathname: "/apps/across/" } },
    docs: {
      description: {
        component:
          "Detail page shared by apps, developer tools and wallets. Pages map their source data to a `CatalogItem` with a converter rather than passing source types in. Every section hides when its data is missing: banner, gallery (screenshots only, never the banner), Info card (no rows), See next, and related items (pass `related` only when there are cards). `children` fills the About panel for type-specific content such as wallet features. Descriptions are markdown and collapse past ~600 characters.",
      },
    },
  },
} satisfies Meta<typeof CatalogItemLayout>

export default meta

type Story = StoryObj<typeof meta>

export const App: Story = {
  args: {
    item: appLike,
    related: (
      <RelatedCatalogItems title="More apps like this">
        {["Layerswap", "Hop", "Stargate"].map((name) => (
          <div key={name} className="rounded-base bg-background p-4">
            {name}
          </div>
        ))}
      </RelatedCatalogItems>
    ),
  },
}

export const LongToolWithoutImages: Story = {
  args: { item: longTool },
}

export const WalletWithManyChains: Story = {
  args: {
    item: manyChainWallet,
    children: (
      <p className="text-body-medium">Wallet feature groups render here.</p>
    ),
  },
}
