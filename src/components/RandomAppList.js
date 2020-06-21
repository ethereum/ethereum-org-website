import React from "react"
import Link from "./Link"
import Translation from "./Translation"

const appList = [
  {
    name: "Gitcoin",
    url: "https://gitcoin.co",
    description: "dapp-desc-gitcoin",
  },
  {
    name: "Cent",
    url: "https://beta.cent.co",
    description: "dapp-desc-cent",
  },
  {
    name: "Gods Unchained",
    url: "https://godsunchained.com/",
    description: "dapp-desc-gods-unchained",
  },
  {
    name: "DAI",
    url: "https://makerdao.com/en/",
    description: "dapp-desc-makerdao",
  },
  {
    name: "Decentraland",
    url: "https://decentraland.org/",
    description: "dapp-desc-decentraland",
  },
  {
    name: "Dharma",
    url: "https://www.dharma.io/",
    description: "dapp-desc-dharma",
  },
  {
    name: "Augur",
    url: "https://www.augur.net/",
    description: "dapp-desc-augur",
  },
]

const RandomAppList = () => {
  const list = appList.map((item) => {
    item.randomNumber = Math.random()
    return item
  })
  list.sort((a, b) => a.randomNumber - b.randomNumber)
  return (
    <ul>
      {list.map((item, idx) => {
        return (
          <li key={idx}>
            <Link to={item.url}>
              <Translation id={item.name} />
            </Link>
            , <Translation id={item.description} />
          </li>
        )
      })}
    </ul>
  )
}

export default RandomAppList
