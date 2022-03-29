// Libraries
import React, { useState } from "react"
import Select from "react-select"
import styled from "styled-components"

// Components
import ButtonLink from "../../components/ButtonLink"
import Link from "../../components/Link"

// Data
import cexSupport from "../../data/layer-2/cex-layer-2-support.json"

// Styles
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
  width: 100%;
  max-width: 640px;
  color: black;
  /* Component */
  .react-select__control {
    border: 1px solid ${(props) => props.theme.colors.searchBorder};
    background: ${(props) => props.theme.colors.searchBackground};
    /* Dropdown arrow */
    .react-select__indicator {
      color: ${(props) => props.theme.colors.searchBorder};
    }
    &.react-select__control--is-focused {
      border-color: ${(props) => props.theme.colors.primary} !important;
      box-shadow: 0 0 0 1px ${(props) => props.theme.colors.primary} !important;
      .react-select__value-container {
        border-color: ${(props) => props.theme.colors.primary} !important;
      }
    }
  }
  .react-select__placeholder {
    color: ${(props) => props.theme.colors.text200};
  }
  .react-select__single-value {
    color: ${(props) => props.theme.colors.text};
  }
  .react-select__menu {
    background: ${(props) => props.theme.colors.searchBackground};
    color: ${(props) => props.theme.colors.text};
  }
  .react-select__input {
    color: ${(props) => props.theme.colors.text};
  }
  .react-select__option {
    &:hover {
      background-color: ${(props) => props.theme.colors.selectHover};
    }
    &:active {
      background-color: ${(props) => props.theme.colors.selectActive};
      color: ${(props) => props.theme.colors.buttonColor} !important;
    }
  }
  .react-select__option--is-focused {
    background-color: ${(props) => props.theme.colors.selectHover};
  }
  .react-select__option--is-selected {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.buttonColor};
    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`

const ButtonLinkMargin = styled(ButtonLink)`
  margin-top: 2.5rem;
`

const Layer2Onboard = ({ layer2DataCombined }) => {
  const [selectedExchange, setSelectedExchange] = useState(undefined)
  const [selectedL2, setSelectedL2] = useState(undefined)

  return (
    <div>
      <h2>How to get onto a layer 2</h2>
      <p>
        There are two primary ways to get your assets onto a layer 2: bridge
        funds from Ethereum via a smart contract or withdraw your funds on an
        exchange directly onto the layer 2 network.
      </p>
      <TwoColumnContent>
        <Flex50>
          <h3>Funds in your wallet?</h3>
          <p>
            If you've already got your ETH in your wallet, you'll need to use a
            bridge to move it from Ethereum Mainnet to a layer 2.{" "}
            <Link to="/bridges/">More on bridges</Link>.
          </p>
          {/* Make card list instead of dropdown. */}
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={layer2DataCombined.map((l2) => {
              l2.label = l2.name
              l2.value = l2.name
              return l2
            })}
            onChange={(selectedOption) => setSelectedL2(selectedOption)}
            placeholder={"Select L2 you want to bridge to"}
          />
          {selectedL2 && (
            <ButtonLinkMargin to={selectedL2.bridge}>
              {selectedL2.name} Bridge
            </ButtonLinkMargin>
          )}
        </Flex50>
        <Flex50>
          <h4>Funds on an exchange?</h4>
          <p>
            Some centralized exchanges now offer direct withdrawals and deposits
            to layer 2s. Check which exchanges support layer 2 withdrawals and
            which layer 2s they support.
          </p>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={cexSupport.map((cex) => {
              cex.label = cex.name
              cex.value = cex.name
              return cex
            })}
            onChange={(selectedOption) => setSelectedExchange(selectedOption)}
            placeholder={"Check exchanges that support L2"}
          />
          {selectedExchange && (
            <div>
              <TwoColumnContent>
                <Flex50>
                  <h3>Deposits</h3>
                  <ul>
                    {selectedExchange.supports_deposits.map((l2) => (
                      <li>{l2}</li>
                    ))}
                  </ul>
                </Flex50>
                <Flex50>
                  <h3>Withdrawals</h3>
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
            </div>
          )}
        </Flex50>
      </TwoColumnContent>
    </div>
  )
}

export default Layer2Onboard
