import { StaticImageData } from "next/image"

import type { TranslationKey } from "@/lib/types"

import ArbitrumImage from "@/public/layer-2/arbitrum.png"
import AztecImage from "@/public/layer-2/aztec.png"
import BaseImage from "@/public/layer-2/base.png"
import BobaImage from "@/public/layer-2/boba.png"
import LoopringImage from "@/public/layer-2/loopring.png"
import OptimismImage from "@/public/layer-2/optimism.png"
import StarknetImage from "@/public/layer-2/starknet.png"
import ZKSpaceImage from "@/public/layer-2/zkspace.png"
import zkSyncImage from "@/public/layer-2/zksync.png"

export type RollupType = "optimistic" | "zk"

export interface Rollup {
  name: string
  website: string
  developerDocs: string
  l2beat: string
  bridge: string
  bridgeWallets: Array<string>
  blockExplorer: string
  ecosystemPortal: string
  tokenLists: string
  noteKey: TranslationKey
  purpose: Array<string>
  descriptionKey: string
  image: StaticImageData
  background: string
}

export type Rollups = { [type in RollupType]: Array<Rollup> }

export const layer2Data: Rollups = {
  optimistic: [
    {
      name: "Arbitrum One",
      website: "https://arbitrum.io/",
      developerDocs: "https://docs.arbitrum.io/welcome/get-started",
      l2beat: "https://l2beat.com/projects/arbitrum/",
      bridge: "https://bridge.arbitrum.io/",
      bridgeWallets: ["MetaMask", "WalletConnect", "Coinbase Wallet"],
      blockExplorer: "https://arbiscan.io/",
      ecosystemPortal: "https://portal.arbitrum.one/",
      tokenLists: "https://www.coingecko.com/en/categories/arbitrum-ecosystem",
      noteKey: "layer-2-arbitrum-note",
      purpose: ["universal"],
      descriptionKey: "arbitrum-description",
      image: ArbitrumImage,
      background: "white",
    },
    {
      name: "Optimism",
      website: "https://optimism.io/",
      developerDocs: "https://docs.optimism.io/",
      l2beat: "https://l2beat.com/projects/optimism/",
      bridge: "https://app.optimism.io/bridge/deposit",
      bridgeWallets: ["MetaMask", "WalletConnect", "Coinbase Wallet"],
      blockExplorer: "https://optimistic.etherscan.io/",
      ecosystemPortal: "https://www.optimism.io/apps",
      tokenLists:
        "https://tokenlists.org/token-list?url=https://static.optimism.io/optimism.tokenlist.json",
      noteKey: "layer-2-optimism-note",
      purpose: ["universal"],
      descriptionKey: "optimism-description",
      image: OptimismImage,
      background: "white",
    },
    {
      name: "Boba Network",
      website: "https://boba.network/",
      developerDocs: "https://docs.boba.network/",
      l2beat: "https://l2beat.com/projects/bobanetwork/",
      bridge: "https://gateway.boba.network/",
      bridgeWallets: ["MetaMask"],
      blockExplorer: "https://blockexplorer.boba.network/",
      ecosystemPortal: "",
      tokenLists: "",
      noteKey: "layer-2-boba-note",
      purpose: ["universal"],
      descriptionKey: "boba-description",
      image: BobaImage,
      background: "black",
    },
    {
      name: "Base",
      website: "https://base.org/",
      developerDocs: "https://docs.base.org/",
      l2beat: "https://l2beat.com/scaling/projects/base",
      bridge: "https://bridge.base.org/deposit",
      bridgeWallets: ["MetaMask", "WalletConnect", "Coinbase Wallet"],
      blockExplorer: "https://basescan.org/",
      ecosystemPortal: "https://www.base.org/ecosystem",
      tokenLists: "",
      noteKey: "layer-2-base-note",
      purpose: ["universal"],
      descriptionKey: "base-description",
      image: BaseImage,
      background: "white",
    },
  ],
  zk: [
    {
      name: "Loopring",
      website: "https://loopring.org/#/",
      developerDocs: "https://docs.loopring.io/",
      l2beat: "https://l2beat.com/projects/loopring/",
      bridge: "https://loopring.io/#/layer2",
      bridgeWallets: ["MetaMask", "WalletConnect"],
      blockExplorer: "https://explorer.loopring.io/",
      ecosystemPortal: "",
      tokenLists: "",
      noteKey: "",
      purpose: ["payments", "exchange"],
      descriptionKey: "loopring-description",
      image: LoopringImage,
      background: "white",
    },
    {
      name: "zkSync",
      website: "https://zksync.io/",
      developerDocs: "https://docs.zksync.io/",
      l2beat: "https://l2beat.com/projects/zksync/",
      bridge: "https://portal.zksync.io/bridge/",
      bridgeWallets: [
        "MetaMask",
        "WalletConnect",
        "Formatic",
        "Trezor",
        "Ledger",
        "Keystone",
        "Lattice",
        "Portis",
        "Opera",
        "Torus",
        "Coinbase Wallet",
      ],
      blockExplorer: "https://explorer.zksync.io/",
      ecosystemPortal: "",
      tokenLists: "",
      noteKey: "",
      purpose: ["tokens", "nft"],
      descriptionKey: "zksync-description",
      image: zkSyncImage,
      background: "#11142b",
    },
    {
      name: "ZKSpace",
      website: "https://zkbase.org/",
      developerDocs: "https://en.wiki.zks.org/",
      l2beat: "https://l2beat.com/projects/zkswap/",
      bridge: "https://zks.app/wallet/token",
      bridgeWallets: [
        "MetaMask",
        "WalletConnect",
        "imToken",
        "TokenPocket",
        "MathWallet",
        "Trust Wallet",
      ],
      blockExplorer: "",
      ecosystemPortal: "",
      tokenLists: "",
      noteKey: "",
      purpose: ["payments", "exchange"],
      descriptionKey: "zkspace-description",
      image: ZKSpaceImage,
      background: "black",
    },
    {
      name: "Aztec",
      website: "https://aztec.network/",
      developerDocs: "https://docs.aztec.network/",
      l2beat: "https://l2beat.com/projects/aztec",
      bridge: "https://zk.money/",
      bridgeWallets: ["MetaMask", "WalletConnect"],
      blockExplorer: "https://aztec-connect-prod-explorer.aztec.network/",
      ecosystemPortal: "",
      tokenLists: "",
      noteKey: "",
      purpose: ["payments", "integrations"],
      descriptionKey: "aztec-description",
      image: AztecImage,
      background: "white",
    },
    {
      name: "Starknet",
      website: "https://www.starknet.io",
      developerDocs: "https://docs.starknet.io/documentation/",
      l2beat: "https://l2beat.com/scaling/projects/starknet",
      bridge: "https://starkgate.starknet.io",
      bridgeWallets: [
        "MetaMask",
        "Coinbase Wallet",
        "WalletConnect",
        "Trust Wallet",
        "Rainbow",
        "Argent X",
        "Braavos",
      ],
      blockExplorer: "https://starkscan.co",
      ecosystemPortal: "https://www.starknet-ecosystem.com",
      tokenLists:
        "https://github.com/starknet-io/starknet-addresses/blob/master/bridged_tokens/mainnet.json",
      noteKey: "",
      purpose: ["universal"],
      descriptionKey: "starknet-description",
      image: StarknetImage,
      background: "white",
    },
  ],
}
