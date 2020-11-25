import React, { useEffect, useState } from "react"
import ButtonLink from "./ButtonLink"
import Link from "./Link"
import Translation from "../components/Translation"

const clients = [
  {
    name: "Cortex",
    language: ".NET",
    url: "https://nethermind.io/",
    getStartedUrl: "https://nethermind.io/client",
  },
  {
    name: "Lighthouse",
    language: "Rust",
    url: "https://sigmaprime.io/",
    getStartedUrl:
      "https://lighthouse-book.sigmaprime.io/become-a-validator.html",
  },
  {
    name: "Lodestar",
    language: "JavaScript",
    url: "https://github.com/chainsafe/lodestar#getting-started",
    getStartedUrl: "https://chainsafe.github.io/lodestar/installation/",
  },
  {
    name: "Nimbus",
    language: "Nim",
    url: "https://nimbus.team/",
    getStartedUrl: "https://status-im.github.io/nim-beacon-chain/intro.html",
  },
  {
    name: "Prysm",
    language: "Go",
    url: "https://prysmaticlabs.com/",
    getStartedUrl: "https://docs.prylabs.network/docs/getting-started",
  },
  {
    name: "Teku",
    language: "Java",
    url: "https://pegasys.tech/teku-ethereum-2-for-enterprise/",
    getStartedUrl: "https://docs.teku.pegasys.tech/en/latest/",
  },
  {
    name: "Trinity",
    language: "Python",
    url: "https://trinity.ethereum.org/",
    getStartedUrl: "https://trinity.ethereum.org/#install",
  },
]

const Eth2Clients = () => {
  const [randomClientList, setClients] = useState([])

  useEffect(() => {
    const list = clients.map((item) => {
      item.randomNumber = Math.floor(Math.random() * clients.length)
      return item
    })
    list.sort((a, b) => a.randomNumber - b.randomNumber)
    setClients(list)
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>
            <Translation id="page-eth2clients-client" />
          </th>
          <th>
            <Translation id="page-eth2clients-setup" />
          </th>
        </tr>
      </thead>
      <tbody>
        {randomClientList.map((client, idx) => {
          return (
            <tr key={idx}>
              <td>
                <Link to={client.url}>
                  {client.name} <em>({client.language})</em>
                </Link>
              </td>
              <td>
                <ButtonLink to={client.getStartedUrl}>
                  <Translation id="edn-home-title" />
                </ButtonLink>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Eth2Clients
