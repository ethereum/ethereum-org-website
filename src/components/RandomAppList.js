import React, { useEffect, useState } from "react"
import { shuffle } from "lodash"

import Link from "./Link"
import Translation from "./Translation"

const appList = [
  {
    name: "Gitcoin",
    url: "https://gitcoin.co",
    description: "page-dapps-dapp-description-gitcoin",
  },
  {
    name: "Cent",
    url: "https://beta.cent.co",
    description: "page-dapps-dapp-description-cent",
  },
  {
    name: "Gods Unchained",
    url: "https://godsunchained.com/",
    description: "page-dapps-dapp-description-gods-unchained",
  },
  {
    name: "DAI",
    url: "https://makerdao.com/en/",
    description: "page-stablecoins-accordion-earn-project-2-description",
  },
  {
    name: "Decentraland",
    url: "https://decentraland.org/",
    description: "page-dapps-dapp-description-decentraland",
  },
  {
    name: "Augur",
    url: "https://www.augur.net/",
    description: "page-dapps-dapp-description-augur",
  },
  {
    name: "Ethereum Name Service",
    url: "http://ens.domains/",
    description: "page-dapps-dapp-description-ens",
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
