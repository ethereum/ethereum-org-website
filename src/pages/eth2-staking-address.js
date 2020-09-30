import React from "react"
import styled from "styled-components"
import Card from "../components/Card"
import Button from "../components/Button"
import Link from "../components/Link"
import Warning from "../components/Warning"
import Tooltip from "../components/Tooltip"
import CopyToClipboard from "../components/CopyToClipboard"
import { Twemoji } from "react-emoji-render"
import Checkbox from "../components/Checkbox"

const Page = styled.div`
  width: 100%;
  display: flex;
  margin-top: 4rem;
`

const LeftColumn = styled.div`
  width: 100%;
  padding: 3rem;
  padding-left: 2rem;
  padding-top: 5rem;
`

const RightColumn = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.ednBackground};
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
  padding: 4px 8px;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.colors.border};
  margin-top: -3rem;
`

const AddressCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 2rem;
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

const CopyButton = styled(Button)`
  margin-top: 1.5rem;
`

const StakingAddressPage = ({ data, isSelected }) => {
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
          <h3>Triple check the address:</h3>
          <Tooltip content="Check each character carefully.">
            <Address>
              0x 94fc e6c9 0537 f04b 9725 3d64 9c15 dbbc cb50 79c2
            </Address>
          </Tooltip>
          <Link to="https://etherscan.io">View contract on Etherscan</Link>
          <br />
          <CopyButton isSecondary to="#">
            <Twemoji svg text=":clipboard:" /> Copy address
          </CopyButton>
          <Warning emoji=":warning:">
            <div>
              Sending funds to this address won’t work and won’t make you a
              staker. Follow the instructions on <a href="#">the launchpad</a>
            </div>
          </Warning>
        </AddressCard>
        <AddressCard>
          <DumbTag>Eth2 Staking address</DumbTag>
          <h3>Confirm to reveal address</h3>

          <CopyButton to="#">
            <Twemoji svg text=":eyes:" /> Reveal address
          </CopyButton>
          <Warning emoji=":warning:">
            <div>
              Sending funds to this address won’t work and won’t make you a
              staker. Follow the instructions on <a href="#">the launchpad</a>
            </div>
          </Warning>
        </AddressCard>
      </RightColumn>
    </Page>
  )
}

export default StakingAddressPage
