import React, { useEffect, useState } from "react"
import { shuffle } from "lodash"

import Link from "./Link"
import Translation from "./Translation"

const appList = [
  {
    name: "Gitcoin",
    url: "https://gitcoin.co",
    description: "random-app-list-gitcoin",
  },
  {
    name: "Cent",
    url: "https://beta.cent.co",
    description: "random-app-list-cent",
  },
  {
    name: "Gods Unchained",
    url: "https://godsunchained.com/",
    description: "random-app-list-gods-unchained",
  },
  {
    name: "DAI",
    url: "https://makerdao.com/en/",
    description: "random-app-list-makerdao",
  },
  {
    name: "Decentraland",
    url: "https://decentraland.org/",
    description: "random-app-list-decentraland",
  },
  {
    name: "Dharma",
    url: "https://www.dharma.io/",
    description: "random-app-list-dharma",
  },
  {
    name: "Augur",
    url: "https://www.augur.net/",
    description: "random-app-list-augur",
  },
  {
    name: "Ethereum Name Service",
    url: "http://ens.domains/",
    description: "random-app-list-ens",
  },
]

const RandomAppList = () => {
  const [randomAppList, setRandomAppList] = useState([])

  useEffect(() => {
    const list = shuffle(appList)
    setRandomAppList(list)
  }, [])

  return (
    <ul>
      {randomAppList.map((item, idx) => (
        <li key={idx}>
          <Link to={item.url}>{item.name}</Link>
          , <Translation id={item.description} />
        </li>
      ))}
    </ul>
  )
}

export default RandomAppList
