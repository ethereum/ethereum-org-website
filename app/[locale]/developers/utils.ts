import { getLocale, getTranslations } from "next-intl/server"

import type { DevelopersPath, VideoCourse } from "./types"

import cyfrinBasicBanner from "@/public/images/developers/cyfrin-basic-banner.webp"
import cyfrinFoundryAdvancedBanner from "@/public/images/developers/cyfrin-foundry-advanced-banner.webp"
import cyfrinFoundryFundamentalsBanner from "@/public/images/developers/cyfrin-foundry-fundamentals-banner.webp"
import cyfrinSecurityBanner from "@/public/images/developers/cyfrin-security-banner.webp"
import cyfrinSolidityBanner from "@/public/images/developers/cyfrin-solidity-banner.webp"
import speedrunNFT from "@/public/images/developers/speedrun-nft.png"
import speedrunStakingApp from "@/public/images/developers/speedrun-staking-app.png"
import speedrunTokenVendor from "@/public/images/developers/speedrun-token-vendor.png"

export const getBuilderPaths = async (): Promise<DevelopersPath[]> => {
  const locale = await getLocale()
  const t = await getTranslations({
    locale,
    namespace: "page-developers-index",
  })

  return [
    {
      imgSrc: speedrunNFT,
      imgAlt: "Speedrun Ethereum NFT banner",
      title: "Simple NFT Example", // t("page-developers-learn"),
      description: "Create a public NFT to learn the basics of scaffold-eth.", // t("page-developers-learn-desc"),
      href: "https://speedrunethereum.com/challenge/simple-nft-example",
      button: t("page-developers-start-quest"),
      tag: "Challenge #0",
    },
    {
      imgSrc: speedrunStakingApp,
      imgAlt: "Speedrun Ethereum staking app banner",
      title: "Staking App", // t("page-developers-learn-tutorials"),
      description: "Write a smart contract where users pool funds together.", // t("page-developers-learn-tutorials-desc"),
      href: "https://speedrunethereum.com/challenge/decentralized-staking",
      button: t("page-developers-start-quest"),
      tag: "Challenge #1",
    },
    {
      imgSrc: speedrunTokenVendor,
      imgAlt: "Speedrun Ethereum token vendor project banner",
      title: "Create a token", // t("page-developers-resources"),
      description:
        "Build a digital currency and a smart conract that trades it.", // t("page-developers-start-desc"),
      href: "https://speedrunethereum.com/challenge/token-vendor",
      button: t("page-developers-start-quest"),
      tag: "Challenge #2",
    },
  ]
}

export const getVideoCourses = async (): Promise<VideoCourse[]> => {
  // const locale = await getLocale()
  // const t = await getTranslations({
  //   locale,
  //   namespace: "page-developers-index",
  // })

  return [
    {
      title: "Blockchain basics",
      description:
        "Learn how blockchains and smart contracts work, create a wallet, and sign your first transaction.",
      hours: 3,
      imgSrc: cyfrinBasicBanner,
      imgAlt: "Cyfrin Updraft Blockchain basics course banner",
      href: "https://updraft.cyfrin.io/courses/blockchain-basics",
    },
    {
      title: "Solidity smart contract development",
      description:
        "Solidity Programming is your gateway to web3 development in Ethereum compatible ecosystems.",
      hours: 5,
      imgSrc: cyfrinSolidityBanner,
      imgAlt:
        "Cyfrin Updraft Solidity smart contract development course banner",
      href: "https://updraft.cyfrin.io/courses/solidity",
    },
    {
      title: "Foundry fundamentals",
      description:
        "Level up your Solidity development skills with Foundry and advanced web3 development concepts and tools.",
      hours: 10,
      imgSrc: cyfrinFoundryFundamentalsBanner,
      imgAlt: "Cyfrin Updraft Foundry fundamentals course banner",
      href: "https://updraft.cyfrin.io/courses/foundry",
    },
    {
      title: "Advanced foundry",
      description:
        "Master web3 development techniques with Advanced Foundry for Solidity smart contract development.",
      hours: 13,
      imgSrc: cyfrinFoundryAdvancedBanner,
      imgAlt: "Cyfrin Updraft Advanced foundry course banner",
      href: "https://updraft.cyfrin.io/courses/advanced-foundry",
    },
    {
      title: "Smart contract security", // "Learn smart contract auditing, security, and DeFi",
      description:
        "Start your career as a smart contract security researcher! Learn smart contract auditing and the best practices.",
      hours: 24,
      imgSrc: cyfrinSecurityBanner,
      imgAlt: "Cyfrin Updraft Blockchain basics course banner",
      href: "https://updraft.cyfrin.io/courses/security",
    },
  ]

  return []
}
