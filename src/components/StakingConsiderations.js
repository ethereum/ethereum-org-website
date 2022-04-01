import React, { useState } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
// SVG imports
import GreenCheck from "../assets/staking/green-check-product-glyph.svg"
import Caution from "../assets/staking/caution-product-glyph.svg"
import Warning from "../assets/staking/warning-product-glyph.svg"
import OpenSource from "../assets/staking/open-source.svg"
import Audited from "../assets/staking/audited.svg"
import BugBounty from "../assets/staking/bug-bounty.svg"
import BattleTested from "../assets/staking/battle-tested.svg"
import Trustless from "../assets/staking/trustless.svg"
import Permissionless from "../assets/staking/permissionless.svg"
import MultiClient from "../assets/staking/multi-client.svg"
import SelfCustody from "../assets/staking/self-custody.svg"
import Economical from "../assets/staking/economical.svg"
import LiquidityToken from "../assets/staking/liquidity-token.svg"

const Container = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const List = styled.div`
  flex: 1;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`

// TODO: Make mobile responsive

const ListItem = styled.li`
  padding: 0.125rem 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  height: 2rem;
  ${({ theme, active }) =>
    active
      ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
    &::after{
        content:"";
        position:absolute;
        height:0;
        width:0;
        left:100%;
        top:0;
        border: 1rem solid transparent;
        border-left: 1rem solid ${theme.colors.primary};
    }`
      : `
    color: ${theme.colors.primary};
    `};
`

const Content = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.offBackground};
  padding: 1.5rem;
  h3 {
    font-weight: 700;
    font-size: 27px;
  }
`

const IndicatorRow = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    gap: 1rem;
  }
`

const Indicator = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 10ch;
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    width: 7ch;
  }
  gap: 0.5rem;
  p {
    font-size: 0.75rem;
    padding: 0;
    text-align: center;
  }
`

const data = {
  solo: [
    {
      title: "Open source",
      description:
        "Essential code is 100% open source and available to the public to fork and use",
      valid: "Open source",
      caution: "",
      warning: "Closed source",
      Svg: OpenSource,
    },
    {
      title: "Audited",
      description:
        "Essential code has undergone formal auditing with results published and available publicly",
      valid: "Audited",
      caution: "",
      warning: "None",
      Svg: Audited,
    },
    {
      title: "Bug bounty",
      description:
        "A public bug bounty has been performed on any essential code to rewards users for safely reporting and/or fixing vulnerabilities",
      valid: "Currently active",
      caution: "Completed",
      warning: "None",
      Svg: BugBounty,
    },
    {
      title: "Battle tested",
      description:
        "Software has been available and used by the public for the indicated period of time",
      valid: "Live > 1 year",
      caution: "Live > 6 months",
      warning: "Newly released",
      Svg: BattleTested,
    },
    {
      title: "Trustless",
      description:
        "Validator keys are not entrusted to any other human at any time in the validator lifecycle.<br/>Any smart contracts involved are free of back doors, without reliance on privileged permissions for execution.",
      valid: "Trustless",
      caution: "",
      warning: "Trusted",
      Svg: Trustless,
    },
    {
      title: "Permissionless",
      description:
        "User does not require any special permission to operate a validator using the software or service",
      valid: "No permission",
      caution: "",
      warning: "Permission required",
      Svg: Permissionless,
    },
    {
      title: "Multi-client",
      description:
        "Software enables users to pick from and switch between at least two or more CL clients",
      valid: "Easy client switching",
      caution: "",
      warning: "Limited to majority client",
      Svg: MultiClient,
    },
    {
      title: "Self custody",
      description:
        "User maintains custody of any validator credentials, including signing and withdrawal keys",
      valid: "Self custody",
      caution: "",
      warning: "Third-party custodian",
      Svg: SelfCustody,
    },
    {
      title: "Economical",
      description:
        "Users can operate a validator by staking less than 32 ETH, utilizing pooled funds from others",
      valid: "< 32 ETH",
      caution: "",
      warning: "32 ETH",
      Svg: Economical,
    },
  ],
  saas: [
    {
      title: "Open source",
      description:
        "Essential code is 100% open source and available to the public to fork and use",
      valid: "Open source",
      caution: "",
      warning: "Closed source",
      Svg: OpenSource,
    },
    {
      title: "Audited",
      description:
        "Essential code has undergone formal auditing with results published and available publicly",
      valid: "Audited",
      caution: "",
      warning: "None",
      Svg: Audited,
    },
    {
      title: "Bug bounty",
      description:
        "A public bug bounty has been performed on any essential code to rewards users for safely reporting and/or fixing vulnerabilities",
      valid: "Currently active",
      caution: "Completed",
      warning: "None",
      Svg: BugBounty,
    },
    {
      title: "Battle tested",
      description:
        "Service has been available and used by the public for the indicated period of time",
      valid: "Live > 1 year",
      caution: "Live > 6 months",
      warning: "Newly released",
      Svg: BattleTested,
    },
    {
      title: "Permissionless",
      description:
        "User does not require any special permission, account sign up or KYC to participate with the service",
      valid: "Anyone can join",
      caution: "",
      warning: "Permission required",
      Svg: Permissionless,
    },
    {
      title: "Diverse clients",
      description:
        "Service should not run more than 50% of their aggregate validators with a majority validator client",
      valid: "Less than 50%",
      caution: "Currently unknown",
      warning: "More than 50%",
      Svg: MultiClient,
    },
    {
      title: "Self custody",
      description:
        "User maintains custody of any validator credentials, including signing and withdrawal keys",
      valid: "Self custody",
      caution: "",
      warning: "Third-party custodian",
      Svg: SelfCustody,
    },
  ],
  pools: [
    {
      title: "Open source",
      description:
        "Essential code is 100% open source and available to the public to fork and use",
      valid: "Open source",
      caution: "",
      warning: "Closed source",
      Svg: OpenSource,
    },
    {
      title: "Audited",
      description:
        "Essential code has undergone formal auditing with results published and available publicly",
      valid: "Audited",
      caution: "",
      warning: "None",
      Svg: Audited,
    },
    {
      title: "Bug bounty",
      description:
        "A public bug bounty has been performed on any essential code to rewards users for safely reporting and/or fixing vulnerabilities",
      valid: "Currently active",
      caution: "Completed",
      warning: "None",
      Svg: BugBounty,
    },
    {
      title: "Battle tested",
      description:
        "Service has been available and used by the public for the indicated period of time",
      valid: "Live > 1 year",
      caution: "Live > 6 months",
      warning: "Newly released",
      Svg: BattleTested,
    },
    {
      title: "Trustless",
      description:
        "Service does not require trusting any humans to custody your keys or distribute rewards",
      valid: "Trustless",
      caution: "",
      warning: "Trusted",
      Svg: Trustless,
    },
    {
      title: "Permissionless nodes",
      description:
        "Service allows anyone to join as a node operator for the pool, without permission",
      valid: "Anyone can join",
      caution: "",
      warning: "Permission required",
      Svg: Permissionless,
    },
    {
      title: "Diverse clients",
      description:
        "Service should not run more than 50% of their aggregate validators with a supermajority validator client",
      valid: "Less than 50%",
      caution: "Currently unknown",
      warning: "More than 50%",
      Svg: MultiClient,
    },
    {
      title: "Liquidity token",
      description:
        "Offers tradable liquidity token representing your staked ETH, held in your own wallet",
      valid: "Liquidity token(s)",
      caution: "",
      warning: "No liquidity token",
      Svg: LiquidityToken,
    },
  ],
}

const StakingConsiderations = ({ page }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const intl = useIntl()

  const pageData = data[page]
  const { title, description, valid, caution, warning, Svg } =
    pageData[activeIndex]

  const handleSelection = (idx) => {
    setActiveIndex(idx)
  }

  const selectionSvgStyle = { width: 72, height: "auto" }
  const indicatorSvgStyle = { width: 20, height: "auto" }
  const StyledSvg = !!Svg
    ? styled(Svg)`
        path {
          fill: ${({ theme }) => theme.colors.text};
        }
      `
    : styled.div`
        display: none;
      `

  return (
    <Container>
      <List>
        {!!pageData && (
          <ul>
            {pageData.map(({ title }, idx) => (
              <ListItem
                key={idx}
                onClick={(e) => handleSelection(idx)}
                active={idx === activeIndex}
              >
                {title}
              </ListItem>
            ))}
          </ul>
        )}
      </List>
      <Content>
        <StyledSvg style={selectionSvgStyle} />
        <h3>{title}</h3>
        <p>{description}</p>
        <IndicatorRow>
          {!!valid && (
            <Indicator>
              <GreenCheck style={indicatorSvgStyle} />
              <p>{valid}</p>
            </Indicator>
          )}
          {!!caution && (
            <Indicator>
              <Caution style={indicatorSvgStyle} />
              <p>{caution}</p>
            </Indicator>
          )}
          {!!warning && (
            <Indicator>
              <Warning style={indicatorSvgStyle} />
              <p>{warning}</p>
            </Indicator>
          )}
        </IndicatorRow>
      </Content>
    </Container>
  )
}

export default StakingConsiderations
