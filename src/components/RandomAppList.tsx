import { useEffect, useState } from "react"
import { shuffle } from "lodash"

import type { TranslationKey } from "@/lib/types"

import InlineLink from "./ui/Link"
import Translation from "./Translation"

interface App {
  name: string
  url: string
  description: TranslationKey
}

const appList: Array<App> = [
  {
    name: "Gitcoin",
    url: "https://gitcoin.co",
    description: "page-apps-dapp-description-gitcoin",
  },
  {
    name: "Cent",
    url: "https://beta.cent.co",
    description: "page-apps-dapp-description-cent",
  },
  {
    name: "Gods Unchained",
    url: "https://godsunchained.com/",
    description: "page-apps-dapp-description-gods-unchained",
  },
  {
    name: "DAI",
    url: "https://makerdao.com/en/",
    description: "page-stablecoins-accordion-earn-project-2-description",
  },
  {
    name: "Decentraland",
    url: "https://decentraland.org/",
    description: "page-apps-dapp-description-decentraland",
  },
  {
    name: "Augur",
    url: "https://www.augur.net/",
    description: "page-apps-dapp-description-augur",
  },
  {
    name: "Ethereum Name Service",
    url: "http://ens.domains/",
    description: "page-apps-dapp-description-ens",
  },
]

const RandomAppList = () => {
  const [randomAppList, setRandomAppList] = useState<Array<App>>([])

  useEffect(() => {
    const list = shuffle(appList)
    setRandomAppList(list)
  }, [])

  return (
    <ul>
      {randomAppList.map((item, idx) => (
        <li key={idx}>
          <InlineLink href={item.url}>{item.name}</InlineLink>
          , <Translation id={item.description} />
        </li>
      ))}
    </ul>
  )
}

export default RandomAppList
