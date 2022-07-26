import React, { useState } from "react"
import styled from "styled-components"
import { useIntl } from "react-intl"

import { StyledSelect as Select } from "../SharedStyledComponents"
import ButtonLink from "../ButtonLink"
import Emoji from "../Emoji"
import Translation from "../Translation"

import { trackCustomEvent } from "../../utils/matomo"
import { translateMessageId } from "../../utils/translations"

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
export interface IProps {}

const StakingLaunchpadWidget: React.FC<IProps> = () => {
  const intl = useIntl()
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
        <span>
          <Translation id="page-staking-launchpad-widget-span" />
        </span>
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
          <Translation id="page-staking-launchpad-widget-p1" />
        </p>
        <p>
          <Translation id="page-staking-launchpad-widget-p2" />
        </p>
        <ButtonContainer style={{ marginBottom: "1rem" }}>
          <ButtonLink to={data[selection].url}>
            {selection === "mainnet"
              ? translateMessageId(
                  "page-staking-launchpad-widget-mainnet-start",
                  intl
                )
              : translateMessageId(
                  "page-staking-launchpad-widget-testnet-start",
                  intl
                )}
          </ButtonLink>
        </ButtonContainer>
        <p>
          <Translation id="page-staking-launchpad-widget-p3" />
        </p>
        <ButtonContainer>
          <ButtonLink to="#node-and-client-tools" isSecondary>
            <Emoji text="🛠" mr="1rem" />
            <Translation id="page-staking-launchpad-widget-link" />
          </ButtonLink>
        </ButtonContainer>
      </div>
    </Container>
  )
}

export default StakingLaunchpadWidget
