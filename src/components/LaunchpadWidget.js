import React, { useState } from "react"
import styled from "styled-components"

import Link from "./Link"
import ButtonLink from "./ButtonLink"
import Emoji from "./Emoji"
import Icon from "./Icon"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.layer2Gradient};
  border-radius: 0.25rem;
  padding: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 1.5rem;
  }
  span {
    color: ${({ theme }) => theme.colors.text200};
  }
`

const SelectContainer = styled.div`
  margin: 1rem 0;
`

const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  border-radius: 0.25rem;
  background: none;
  padding: 0.75rem 3rem 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
`

const StyledIcon = styled(Icon)`
  position: relative;
  left: -2.25rem;
  top: 0.5rem;
  pointer-events: none;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    a {
      width: 100%;
    }
  }
`

const LaunchpadWidget = () => {
  const [selection, setSelection] = useState("testnet")

  const handleChange = (e) => {
    setSelection(e.target.value)
  }

  const data = {
    testnet: {
      label: "Goerli/Prater testnet",
      url: "https://prater.launchpad.ethereum.org",
    },
    mainnet: {
      label: "Mainnet",
      url: "https://launchpad.ethereum.org",
    },
  }

  return (
    <Container>
      <div>
        <span>Choose network</span>
        <SelectContainer>
          <Select onChange={handleChange}>
            <option value="testnet">{data.testnet.label}</option>
            <option value="mainnet">{data.mainnet.label}</option>
          </Select>
          <StyledIcon name="chevronDown" />
        </SelectContainer>
        <p>
          Solo validators are expected to <strong>test their setup</strong> and
          operational skills on the {data.testnet.label} before risking funds.
          Remember it is important to choose a{" "}
          <Link to="/developers/docs/nodes-and-clients/client-diversity/">
            minority client
          </Link>{" "}
          as it improves the security of the network, and limits your risk.
        </p>
        <p>
          If you're comfortable with it, you can set up everything needed from
          the <code>command line</code> using the Staking Launchpad alone.
        </p>
        <ButtonContainer style={{ marginBottom: "1rem" }}>
          <ButtonLink to={data[selection].url}>
            Start staking on {data[selection].label}
          </ButtonLink>
        </ButtonContainer>
        <p>
          To make things easier, check out some of the tools and guides below
          that can help you alongside the Staking Launchpad to get your clients
          set up with ease.
        </p>
        <ButtonContainer>
          <ButtonLink to="#node-and-client-tools" isSecondary>
            <Emoji text="🛠" mr="1rem" /> Software tools and guide
          </ButtonLink>
        </ButtonContainer>
      </div>
    </Container>
  )
}

export default LaunchpadWidget
