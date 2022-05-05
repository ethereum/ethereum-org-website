// Libraries
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import styled from "styled-components"

// Components
import ButtonLink from "../../components/ButtonLink"
import Link from "../../components/Link"
import { StyledSelect as Select } from "../SharedStyledComponents"

// Data
import cexSupport from "../../data/layer-2/cex-layer-2-support.json"

//Utils
import { trackCustomEvent } from "../../utils/matomo"

// Styles
const Content = styled.div`
  background: ${(props) => props.theme.colors.layer2Gradient};
  padding: 2.5rem;
  border-radius: 2px;
`

const Description = styled.div`
  text-align: center;
  max-width: 75ch;
  margin: auto;
`

const H3 = styled.h3`
  margin-top: 0;
`

const Flex50 = styled.div`
  flex: 50%;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex: 100%;
  }
`

const TwoColumnContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

// https://react-select.com/styles#using-classnames
// Pass menuIsOpen={true} to component to debug
const StyledSelect = styled(Select)`
  max-width: none;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    .react-select__control {
      padding: 14px 0;
    }
  }
`

const SelectedContainer = styled.div`
  background: rgba(255, 255, 255, 0.02);
  margin-top: 0.5rem;
  padding: 21px;
`

const ButtonLinkMargin = styled(ButtonLink)`
  margin-top: 2.5rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(21, 1fr);
  gap: 10px;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: repeat(11, 1fr);
    margin: auto;
  }
`

const LeftDescription = styled.div`
  grid-column: 1/11;
  grid-row: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 1;
  }
`

const LeftSelect = styled.div`
  grid-column: 1/11;
  grid-row: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 2;
  }
`

const RightDescription = styled.div`
  grid-column: 12/22;
  grid-row: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 5;
  }
`

const RightSelect = styled.div`
  grid-column: 12/22;
  grid-row: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 6;
  }
`

const LeftSelected = styled.div`
  grid-column: 1/11;
  grid-row: 3/6;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 3;
  }
`

const EthLogo = styled.div`
  grid-column: 11;
  grid-row: 4;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 4;
  }
`

const Image = styled(GatsbyImage)`
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 1.5rem;
  }
`

const RightSelected = styled.div`
  grid-column: 12/22;
  grid-row: 3/6;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-column: 1/12;
    grid-row: 7;
  }
`

const Layer2Onboard = ({ layer2DataCombined, ethIcon }) => {
  const [selectedExchange, setSelectedExchange] = useState(undefined)
  const [selectedL2, setSelectedL2] = useState(undefined)

  return (
    <Content>
      <Description>
        <h2>How to get onto a layer 2</h2>
        <p>
          There are two primary ways to get your assets onto a layer 2: bridge
          funds from Ethereum via a smart contract or withdraw your funds on an
          exchange directly onto the layer 2 network.
        </p>
      </Description>
      <Grid>
        <LeftDescription>
          <h4>Funds in your wallet?</h4>
          <p>
            If you've already got your ETH in your wallet, you'll need to use a
            bridge to move it from Ethereum Mainnet to a layer 2.{" "}
            <Link to="/bridges/">More on bridges</Link>.
          </p>
        </LeftDescription>
        <LeftSelect>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={layer2DataCombined.map((l2) => {
              l2.label = l2.name
              l2.value = l2.name
              return l2
            })}
            onChange={(selectedOption) => {
              trackCustomEvent({
                eventCategory: `Selected layer 2 to bridge to`,
                eventAction: `Clicked`,
                eventName: `${selectedOption.name} bridge selected`,
                eventValue: `${selectedOption.name}`,
              })
              setSelectedL2(selectedOption)
            }}
            placeholder={"Select L2 you want to bridge to"}
          />
        </LeftSelect>
        {selectedL2 && (
          <LeftSelected>
            <SelectedContainer>
              <p>
                <b>You can connect to {selectedL2.name} using these wallets:</b>
              </p>
              <p>{selectedL2.bridgeWallets.join(", ")}</p>
              <ButtonLinkMargin to={selectedL2.bridge}>
                {selectedL2.name} Bridge
              </ButtonLinkMargin>
            </SelectedContainer>
          </LeftSelected>
        )}
        <RightDescription>
          <h4>Funds on an exchange?</h4>
          <p>
            Some centralized exchanges now offer direct withdrawals and deposits
            to layer 2s. Check which exchanges support layer 2 withdrawals and
            which layer 2s they support.
          </p>
          <p>
            You'll also need a wallet to withdraw your funds to.{" "}
            <Link to="/wallets/find-wallet/">Find an Ethereum wallet</Link>.
          </p>
        </RightDescription>
        <RightSelect>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={cexSupport.map((cex) => {
              cex.label = cex.name
              cex.value = cex.name
              return cex
            })}
            onChange={(selectedOption) => {
              trackCustomEvent({
                eventCategory: `Selected cex to onboard`,
                eventAction: `Clicked`,
                eventName: `${selectedOption.name} selected`,
                eventValue: `${selectedOption.name}`,
              })
              setSelectedExchange(selectedOption)
            }}
            placeholder={"Check exchanges that support L2"}
          />
        </RightSelect>
        <EthLogo>
          <Image image={ethIcon} objectFit="contain" />
        </EthLogo>
        {selectedExchange && (
          <RightSelected>
            <SelectedContainer>
              <TwoColumnContent>
                <Flex50>
                  <H3>Deposits</H3>
                  <ul>
                    {selectedExchange.supports_deposits.map((l2) => (
                      <li>{l2}</li>
                    ))}
                  </ul>
                </Flex50>
                <Flex50>
                  <H3>Withdrawals</H3>
                  <ul>
                    {selectedExchange.supports_withdrawals.map((l2) => (
                      <li>{l2}</li>
                    ))}
                  </ul>
                </Flex50>
              </TwoColumnContent>
              <ButtonLink to={selectedExchange.url}>
                Go to {selectedExchange.name}
              </ButtonLink>
            </SelectedContainer>
          </RightSelected>
        )}
      </Grid>
    </Content>
  )
}

export default Layer2Onboard
