// Libraries
import React from "react"

// Components
import CardList from "../CardList"

const StakingGuides = () => {
  const guides = [
    {
      title: "CoinCashew's Ethereum 2.0 Guide",
      link: "https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet",
      description: "Linux (CLI)",
    },
    {
      title: "Somer Esat",
      link: "https://github.com/SomerEsat/ethereum-staking-guide",
      description: "Linux (CLI)",
    },
    {
      title: "Rocket Pool Node Operators",
      link: "https://rocketpool.net/node-operators",
      description: "Linux, macOS (CLI)",
    },
  ]

  return <CardList content={guides} />
}

export default StakingGuides
