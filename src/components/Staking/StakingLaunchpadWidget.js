import React, { useState } from "react"
import styled from "styled-components"

import { StyledSelect as Select } from "../SharedStyledComponents"
import Link from "../Link"
import ButtonLink from "../ButtonLink"
import Emoji from "../Emoji"

import { trackCustomEvent } from "../../utils/matomo"

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

const StyledSelect = styled(Select)`
  max-width: 50%;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    max-width: 100%;
  }
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

const StakingLaunchpadWidget = () => {
  const [selection, setSelection] = useState("testnet")

  const handleChange = (e) => {
    trackCustomEvent({
      eventCategory: `Selected testnet vs mainnet for Launchpad link`,
      eventAction: `Clicked`,
      eventName: `${e.label} bridge selected`,
      eventValue: `${e.value}`,
    })
    setSelection(e.value)
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

  const selectOptions = Object.keys(data).map((key) => ({
    label: data[key].label,
    value: key,
  }))

  return (
    <Container>
      <div>
        <span>Choose network</span>
        <SelectContainer>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={selectOptions}
            onChange={handleChange}
            defaultValue={selectOptions[0]}
          />
        </SelectContainer>
        <p>
          Solo validators are expected to <strong>test their setup</strong> and
          operational skills on the {data.testnet.label} before risking funds.
          Remember it is important to choose a{" "}
          <Link to="/developers/docs/nodes-and-clients/client-diversity/">
            minority client
          </Link>{" "}
          as it improves the security of the network and limits your risk.
        </p>
        <p>
          If you're comfortable with it, you can set up everything needed from
          the command line using the Staking Launchpad alone.
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

export default StakingLaunchpadWidget
