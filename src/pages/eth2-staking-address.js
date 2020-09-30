import React, { useState } from "react"
import styled from "styled-components"
import Card from "../components/Card"
import Button from "../components/Button"
import Link from "../components/Link"
import Warning from "../components/Warning"
import Tooltip from "../components/Tooltip"
import CopyToClipboard from "../components/CopyToClipboard"
import { Twemoji } from "react-emoji-render"
import Checkbox from "../components/Checkbox"

import { FakeButtonPrimary } from "../components/SharedStyledComponents"

const Page = styled.div`
  width: 100%;
  display: flex;
  margin-top: 4rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const LeftColumn = styled.div`
  width: 100%;
  padding: 3rem;
  padding-left: 2rem;
  padding-top: 5rem;
`

const RightColumn = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.cardGradient};
  padding: 3rem;
  padding-right: 2rem;
  padding-top: 5rem;
  align-items: center;
`

const Title = styled.h1`
  font-weight: normal;
  font-size: 2rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 2rem;
  }
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-bottom: 3.5rem;
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
`

const StyledButton = styled(Button)`
  margin-top: 0rem;
`
const StyledLink = styled(Link)`
  margin-left: 1rem;
`

const DumbTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 8px;
  width: 100%;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  background: ${(props) => props.theme.colors.cardGradient};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  border-radius: 4px 4px 0px 0px;
  text-transform: uppercase;
  font-size: 14px;
`

const AddressCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: 2rem;
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  margin-left: 5.5rem;
  margin-right: 3rem;
  max-width: 460px;
  margin-bottom: 3rem;
`

const Address = styled.div`
    /* background: ${(props) => props.theme.colors.ednBackground};
    color: ${(props) => props.theme.colors.fail400};
    padding: 0.5rem; */
    font-family: "SFMono-Regular", monospace;
    border-radius: 2px;
    font-size: 2rem;
    flex-wrap: wrap;
    text-transform: uppercase;
    line-height: 140%;
    margin-bottom: 1rem;
`

const CopyButton = styled(FakeButtonPrimary)`
  margin-top: 1.5rem;
`

const CardContainer = styled.div`
  margin: 2rem;
  margin-bottom: 0rem;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 2rem;
  margin-bottom: 2rem;
`

const CardTitle = styled.h2``

const Caption = styled.h6`
  color: ${(props) => props.theme.colors.text200};
  font-weight: 500;
`

const StakingAddressPage = () => {
  const [showAddress, setShowAddress] = useState(false)

  return (
    <Page>
      <LeftColumn>
        <Title>Check the Phase 0 staking address</Title>
        <Subtitle>
          This is the address for the Eth2 staking contract. Use this page to
          confirm you’re using the correct deposit address.
        </Subtitle>
        <Card
          emoji=":octagonal_sign:"
          title="This is not where you stake"
          description="To stake your ETH in Eth2 you must use the launchpad and follow the instructions. Sending ETH to this address will not make you a staker and will result in a failed transaction."
        >
          <ButtonRow>
            <StyledButton to="#">Stake using launchpad</StyledButton>
            <StyledLink to="#">More on staking</StyledLink>
          </ButtonRow>
        </Card>
      </LeftColumn>
      <RightColumn>
        <AddressCard>
          <DumbTag>Eth2 Staking address</DumbTag>
          <CardContainer>
            {showAddress && (
              <>
                <Row>
                  <CardTitle>Check the address:</CardTitle>
                  <div>
                    <Link to="#">Read address</Link>{" "}
                    <Twemoji svg text=":cheering_megaphone:" />
                  </div>
                </Row>
                <Tooltip content="Check each character carefully.">
                  <Address>
                    0x 94fc e6c9 0537 f04b 9725 3d64 9c15 dbbc cb50 79c2
                  </Address>
                </Tooltip>
                <Caption>We have added spaces for legibility</Caption>
                <Link to="https://etherscan.io">
                  View contract on Etherscan
                </Link>
                <br />
                <CopyButton isSecondary>
                  <Twemoji svg text=":clipboard:" /> Copy address
                </CopyButton>{" "}
                <CopyButton isSecondary>
                  <Twemoji svg text=":cheering_megaphone:" /> Read address aloud
                </CopyButton>
              </>
            )}
            {!showAddress && (
              <>
                <h3>Confirm to reveal address</h3>

                <CopyButton onClick={() => setShowAddress(!showAddress)}>
                  <Twemoji svg text=":eyes:" /> Reveal address
                </CopyButton>
              </>
            )}
            <Warning emoji=":warning:">
              <div>
                Sending funds to this address won’t work and won’t make you a
                staker. Follow the instructions on <a href="#">the launchpad</a>
              </div>
            </Warning>
          </CardContainer>
        </AddressCard>
      </RightColumn>
    </Page>
  )
}

export default StakingAddressPage
