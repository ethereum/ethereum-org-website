import { Meta, StoryObj } from "@storybook/react"

import { Lang } from "@/lib/types"

import FindWalletProductTable from "@/components/FindWalletProductTable"

import OneInchWalletImage from "@/public/images/wallets/1inch.png"
import FoxWalletImage from "@/public/images/wallets/foxwallet.png"

const walletsData = [
  {
    last_updated: "2024-08-30",
    name: "1inch Wallet",
    image: OneInchWalletImage,
    twBackgroundColor: "bg-[#2F8AF5]",
    twGradiantBrandColor: "from-[#2F8AF5]",
    url: "https://1inch.io/wallet",
    active_development_team: true,
    languages_supported: [
      "en",
      "ru",
      "zh",
      "fr",
      "de",
      "hi",
      "id",
      "ja",
      "ko",
      "pt",
      "es",
      "tr",
      "vi",
    ],
    twitter: "https://x.com/1inchwallet",
    discord: "https://discord.com/invite/1inch",
    reddit: "https://www.reddit.com/r/1inch/",
    telegram: "https://t.me/OneInchNetwork",
    ios: true,
    android: true,
    linux: false,
    windows: false,
    macOS: false,
    firefox: false,
    chromium: false,
    hardware: false,
    open_source: false,
    repo_url: "https://github.com/1inch",
    non_custodial: true,
    security_audit: [
      "https://blog.1inch.io/the-1inch-wallet-security-explained/",
    ],
    scam_protection: true,
    hardware_support: true,
    rpc_importing: false,
    nft_support: true,
    connect_to_dapps: true,
    staking: false,
    swaps: true,
    layer_2: true,
    gas_fee_customization: true,
    ens_support: true,
    erc_20_support: true,
    buy_crypto: true,
    withdraw_crypto: true,
    multisig: false,
    social_recovery: false,
    onboard_documentation:
      "https://help.1inch.io/en/collections/2897068-1inch-wallet",
    documentation: "",
  },
  {
    last_updated: "2022-06-24",
    name: "FoxWallet",
    image: FoxWalletImage,
    twBackgroundColor: "bg-[#ffffff]",
    twGradiantBrandColor: "from-[#ffffff]",
    url: "https://foxwallet.com/en",
    active_development_team: true,
    languages_supported: ["en", "zh", "uk", "ru", "es", "id"],
    twitter: "https://twitter.com/FoxWallet",
    discord: "https://discord.com/invite/JVjVbe3Zth",
    reddit: "",
    telegram: "https://t.me/FoxWallet_EN",
    ios: true,
    android: true,
    linux: false,
    windows: false,
    macOS: false,
    firefox: false,
    chromium: false,
    hardware: false,
    open_source: false,
    repo_url: "",
    non_custodial: true,
    security_audit: ["https://www.certik.com/projects/fox-wallet"],
    scam_protection: false,
    hardware_support: false,
    rpc_importing: true,
    nft_support: true,
    connect_to_dapps: true,
    staking: false,
    swaps: false,
    layer_2: true,
    gas_fee_customization: true,
    ens_support: false,
    erc_20_support: true,
    buy_crypto: false,
    withdraw_crypto: false,
    multisig: false,
    social_recovery: false,
    onboard_documentation: "https://hc.foxwallet.com/docs/",
    documentation: "https://hc.foxwallet.com/docs/faq",
  },
]

const meta = {
  title: "Pages / Special cases / Find Wallet Product Table",
  component: FindWalletProductTable,
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-screen-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FindWalletProductTable>

export default meta

type Story = StoryObj<typeof meta>

export const WalletProductTableStory: Story = {
  args: {
    wallets: walletsData.map((wallet) => {
      return {
        ...wallet,
        languages_supported: wallet.languages_supported as Lang[],
        supportedLanguages: wallet.languages_supported as Lang[],
        supported_chains: [],
      }
    }),
  },
  render: (args) => {
    return <FindWalletProductTable {...args} />
  },
}
