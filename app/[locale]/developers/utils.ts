import { getLocale, getTranslations } from "next-intl/server"

import type { DevelopersPath } from "./types"

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
      url: "https://speedrunethereum.com/challenge/simple-nft-example",
      button: t("page-developers-start-quest"),
      tag: "Challenge #0",
    },
    {
      imgSrc: speedrunStakingApp,
      imgAlt: "Speedrun Ethereum staking app banner",
      title: "Staking App", // t("page-developers-learn-tutorials"),
      description: "Write a smart contract where users pool funds together.", // t("page-developers-learn-tutorials-desc"),
      url: "https://speedrunethereum.com/challenge/decentralized-staking",
      button: t("page-developers-start-quest"),
      tag: "Challenge #1",
    },
    {
      imgSrc: speedrunTokenVendor,
      imgAlt: "Speedrun Ethereum token vendor project banner",
      title: "Create a token", // t("page-developers-resources"),
      description:
        "Build a digital currency and a smart conract that trades it.", // t("page-developers-start-desc"),
      url: "https://speedrunethereum.com/challenge/token-vendor",
      button: t("page-developers-start-quest"),
      tag: "Challenge #2",
    },
  ]
}
