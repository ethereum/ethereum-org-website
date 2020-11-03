import styled from "styled-components"
import { motion } from "framer-motion"
import ButtonLink from "./ButtonLink"
import { FakeLink } from "./SharedStyledComponents"
import Emoji from "./Emoji"

import React, { useState } from "react"

const OptionTag = styled.div`
  border-radius: 32px;
  border: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem;
`

const OptionTagText = styled.p`
  font-size: 24px;
  line-height: 100%;
  margin: 0rem;
`

const OptionEmoji = styled(Emoji)`
  padding: 0rem;
  margin: 0rem;
`

const Content = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
  margin: 2rem 20rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem 1rem;
  }
`

const StyledButton = styled(ButtonLink)`
  margin-bottom: 2rem;
`

const TagRow = styled.div`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  margin-bottom: 2rem;
`

const OptionTagActive = styled(OptionTag)`
  border-radius: 32px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem;
`

const Tag = ({ isActive }) => {
  return isActive ? <OptionTagActive /> : <OptionTag />
}

const StakingPaths = ({
  children,
  contentPreview,
  title,
  isActive = true,
  onSelect,
  value,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const handleSelect = () => {
    onSelect(value)
  }
  return (
    <Container>
      <TagRow>
        <OptionTag
          onClick={handleSelect}
          isActive={isActive}
          onClick={() => setIsVisible(!isVisible)}
        >
          <OptionEmoji marginRight={1} text=":moneybag:" />
          <OptionTagText>32 ETH</OptionTagText>
        </OptionTag>
        <OptionTag
          onClick={handleSelect}
          isActive={isActive}
          onClick={() => setIsVisible(!isVisible)}
        >
          <OptionEmoji marginRight={1} text=":swimmer:" />
          <OptionTagText>Less than 32 ETH</OptionTagText>
        </OptionTag>
      </TagRow>
      <Content>
        {!isVisible && (
          <div>
            <h3>Stake solo and run a validator</h3>
            <p>
              To begin the staking process, you’ll need to use the Eth2
              launchpad. This will walk you through all the setup. Part of
              staking is running an Eth2 client, which is a local copy of the
              blockchain. This can take a while to download onto your computer.
            </p>
            <StyledButton to="#">Start staking</StyledButton>
            <p>
              If you’ve already followed the setup instructions on the
              launchpad, you’ll know you need to send a transaction to the
              staking deposit contract. We recommend you check the address very
              carefully. You can find the official address on ethereum.org and a
              number of other trusted sites.
            </p>
            <StyledButton to="/en/eth2/deposit-contract/">
              Check deposit address
            </StyledButton>
          </div>
        )}
        {isVisible && (
          <div>
            <h3>Stake in a pool</h3>
            <p>
              If you have less than 32 ETH, you can add a smaller stake to
              staking pools. You acn even get a company to do it all on your
              behalf so you don’t have to worry about staying online. Here are
              some companies to check out.
            </p>
          </div>
        )}
      </Content>
    </Container>
  )
}

export default StakingPaths
