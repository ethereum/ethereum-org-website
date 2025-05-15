// eslint-disable-next-line simple-import-sort/imports
import ProductListComponent from "@/components/ProductList"
import { ButtonLink } from "@/components/ui/buttons/Button"

import axie from "@/public/images/gaming/axie.png"
import dimensionals from "@/public/images/gaming/Dimensionals.png"
import gods_unchained from "@/public/images/gaming/gods_unchained.png"
import guildOfGuardians from "@/public/images/gaming/guildOfGuardians.png"
import illuviem from "@/public/images/gaming/illuviem.png"
import parallel from "@/public/images/gaming/parallel.png"
import sandbox from "@/public/images/gaming/sandbox.png"
import wagmi_defense from "@/public/images/gaming/wagmi_defense.png"
import worldShards from "@/public/images/gaming/worldShards.png"

const OnchainGamingProductList = ({ list }: { list: string }) => {
  const productListSets = {
    game: [
      {
        title: "WAGMI Defense",
        description:
          "WAGMI Defense is a futuristic tower defense game where you protect your base from alien invaders. You can earn NFTs for in-game assets, which you can keep or trade.",
        image: wagmi_defense,
        alt: "WAGMI Defense logo",
        contentItems: [
          <ul key="wagmi-features">
            <li>Deploy various units and defenses to thwart enemy attacks.</li>
            <li>Each unit is an NFT you can upgrade, trade, or sell.</li>
            <li>
              Engage in player-versus-player battles to climb the leaderboards.
            </li>
          </ul>,
          <div key="wagmi-button">
            <ButtonLink
              href="https://wagmi.game/"
              target="_blank"
              variant="outline"
            >
              Try WAGMI
            </ButtonLink>
          </div>,
        ],
        tag: "TOWER DEFENSE",
      },
      {
        title: "Illuvium",
        description:
          "Open world RPG with arena mode. Illuvium is considered one of the first AAA games within the blockchain gaming community, due to its high production values, use of Unreal Engine, and substantial team and funding.",
        image: illuviem,
        alt: "Illuvium logo",
        contentItems: [
          <div key="illuvium-button">
            <ButtonLink
              href="https://illuvium.io/"
              target="_blank"
              variant="outline"
            >
              Try Illuvium
            </ButtonLink>
          </div>,
        ],
        tag: "RPG",
      },
      {
        title: "Gods Unchained",
        description:
          "Gods Unchained is a free-to-play, trading card game where players own their cards as NFTs and battle in strategic matches to earn rewards.",
        image: gods_unchained,
        alt: "Gods Unchained logo",
        contentItems: [
          <div key="gods-unchained-button">
            <ButtonLink
              href="https://godsunchained.com/"
              target="_blank"
              variant="outline"
            >
              Try Gods Unchained
            </ButtonLink>
          </div>,
        ],
        tag: "CARD GAME",
      },
    ],
    p2e: [
      {
        title: "Parallel",
        description:
          "Parallel is a sci-fi trading card game where you collect and own cards as NFT.",
        image: parallel,
        alt: "Parallel logo",
        link: "https://parallel.life/",
      },
      {
        title: "Axie Infinity",
        description:
          "Collect, breed, and battle NFT creatures called Axies, earning crypto rewards.",
        image: axie,
        alt: "Axie Infinity logo",
        link: "https://axieinfinity.com/",
      },
      {
        title: "WorldShards",
        description:
          "MMORPG where players build, explore, and trade in a fantasy world of floating islands.",
        image: worldShards,
        alt: "WorldShards logo",
        link: "https://worldshards.com/",
      },
      {
        title: "Sandbox",
        description:
          "This is a virtual world where you can create, own, and monetize your gaming experiences. It uses NFTs to ensure you have true ownership of your creations.",
        image: sandbox,
        alt: "Sandbox logo",
        link: "https://www.sandbox.game/",
      },
      {
        title: "Guild of Guardians",
        description:
          "A mobile RPG on Immutable X. Focusing on quick, team-based play and NFT heroes suggests.",
        image: guildOfGuardians,
        alt: "Guild of Guardians logo",
        link: "https://www.guildofguardians.com/",
      },
      {
        title: "Dimensionals",
        description:
          "Dimensionals is a turn-based role-playing game where you assemble a team of heroes, each represented as NFTs on the Ethereum blockchain.",
        image: dimensionals,
        alt: "Dimensionals logo",
        link: "https://dimensionals.com/",
      },
    ],
  }

  return (
    <ProductListComponent content={productListSets[list]} actionLabel="Go" />
  )
}

export default OnchainGamingProductList
