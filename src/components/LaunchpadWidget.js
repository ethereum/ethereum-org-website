import React from "react"
import styled from "styled-components"

import Link from "./Link"
import ButtonLink from "./ButtonLink"
import Emoji from "./Emoji"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const LaunchpadWidget = () => {
  return (
    <Container>
      <div>
        <p>Choose network</p>
        <select>
          <option value="prater">Goerli/Prater Testnet</option>
          <option value="mainnet">Mainnet</option>
        </select>
        <p>
          <Emoji text="🧪" mr="1rem" /> Solo validators are expected to{" "}
          <strong>test their setup</strong> and operational skills on the prater
          testnet before risking funds. Remember it is important to choose a{" "}
          <Link to="/client-diversity">minority client</Link> as it improves the
          security of the network, and limits your risk.
        </p>
        <p>
          <code>
            If you're comfortable with it, you can set up everything needed from
            the command line using the Staking Launchpad alone.
          </code>
        </p>
        <p>
          <Emoji text="🛠" mr="1rem" /> To make things easier, check out some of
          the tools and guides below that can help you alongside the Staking
          Launchpad to get your clients set up with ease.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <ButtonLink to="https://prater.launchpad.ethereum.org">
            Start staking
          </ButtonLink>

          <ButtonLink to="#tools">Software tools and guide</ButtonLink>
        </div>
      </div>
    </Container>
  )
}

export default LaunchpadWidget
