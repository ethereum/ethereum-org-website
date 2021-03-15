import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { motion } from "framer-motion"
import Emoji from "./Emoji"
import Icon from "./Icon"
import Translation from "./Translation"
import ButtonLink from "./ButtonLink"

const Container = styled.div`
  /* TODO: dynamic height? */
  height: 500px;
  perspective: 1000px;
`

const Card = styled.div`
  position: relative;
  transform-style: preserve-3d;
  height: 100%;
  width: 100%;
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const CardFace = styled(motion.div)`
  position: absolute;
  backface-visibility: hidden;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07),
    0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05);
  background: ${({ theme }) => theme.colors.searchBackground};
`

const CardFront = styled(CardFace)`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  text-decoration: none;
`

const CardBack = styled(CardFace)`
  &:hover {
    cursor: pointer;
  }
  &:hover path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${({ background }) => background};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  min-height: 200px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  &:hover path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const Image = styled(Img)`
  width: 100%;
  align-self: center;
  max-width: 372px;
  max-height: 257px;
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    max-width: 311px;
  }
`

const FlipIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
`

const Content = styled.div`
  padding: 1.5rem;
  text-align: left;
  height: 100%;
  position: relative;
`

const Title = styled.h3`
  margin-bottom: 0.75rem;
  margin-top: 1rem;
`

const Description = styled.p`
  opacity: 0.8;
  font-size: ${({ theme }) => theme.fontSizes.s};
  margin-bottom: 0.5rem;
  line-height: 140%;
`

const StyledButtonLink = styled(ButtonLink)`
  margin: 1rem;
`

const WalletCard = ({ wallet }) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false)
  const duration = 0.3
  const flipVariants = {
    shown: {
      rotateY: 0,
      transition: {
        duration,
      },
    },
    frontFlipped: {
      rotateY: -180,
      transition: {
        duration,
      },
    },
    backFlipped: {
      rotateY: 180,
      transition: {
        duration,
      },
    },
  }

  const getFeatureStatus = (feature) =>
    feature === "TRUE" ? (
      <Emoji size="0.75rem" text="❌" />
    ) : (
      <Emoji size="0.75rem" text="✅" />
    )

  return (
    <Container>
      <Card>
        <CardFront
          variants={flipVariants}
          animate={isCardFlipped ? "frontFlipped" : "shown"}
        >
          <ImageWrapper
            background={wallet.brand_color}
            onClick={() => setIsCardFlipped(!isCardFlipped)}
          >
            <Image
              fixed={wallet.image.childImageSharp.fixed}
              alt={wallet.alt}
            />
            <FlipIcon>
              <Icon name="flip" size="1.5rem" />
            </FlipIcon>
          </ImageWrapper>
          <Content>
            <Title>{wallet.name}</Title>
            <Description>{wallet.description}</Description>
          </Content>
          <StyledButtonLink to={wallet.url} hideArrow={true}>
            <Translation id="more" />
          </StyledButtonLink>
        </CardFront>
        <CardBack
          variants={flipVariants}
          initial={{ rotateY: 180 }}
          animate={isCardFlipped ? "shown" : "backFlipped"}
          onClick={() => setIsCardFlipped(!isCardFlipped)}
        >
          <Content>
            <FlipIcon>
              <Icon name="flip" size="1.5rem" />
            </FlipIcon>
            <Title>{wallet.name}</Title>
            <p>
              {wallet.has_desktop === "TRUE" && (
                <Emoji size="1rem" text=":desktop_computer:" mr="0.5rem" />
              )}
              {wallet.has_mobile === "TRUE" && (
                <Emoji size="1rem" text=":mobile_phone:" mr="0.5rem" />
              )}
              {wallet.has_web === "TRUE" && (
                <Emoji size="1rem" text=":globe_with_meridians:" mr="0.5rem" />
              )}
              {wallet.has_hardware === "TRUE" && (
                <Emoji size="1rem" text=":minidisc:" mr="0.5rem" />
              )}
            </p>
            <table>
              <tr>
                {/* TODO: intl extraction */}
                <td>Bank Withdrawals:</td>
                <td>{getFeatureStatus(wallet.has_bank_withdrawals)}</td>
              </tr>
              <tr>
                <td>Card Deposits:</td>
                <td>{getFeatureStatus(wallet.has_card_deposits)}</td>
              </tr>
              <tr>
                <td>DeFi Integrations:</td>
                <td>{getFeatureStatus(wallet.has_defi_integrations)}</td>
              </tr>
              <tr>
                <td>DEX Integrations:</td>
                <td>{getFeatureStatus(wallet.has_dex_integrations)}</td>
              </tr>
              <tr>
                <td>Explore Dapps:</td>
                <td>{getFeatureStatus(wallet.has_explore_dapps)}</td>
              </tr>
              <tr>
                <td>High Volume Purchases:</td>
                <td>{getFeatureStatus(wallet.has_high_volume_purchases)}</td>
              </tr>
              <tr>
                <td>Limit Orders:</td>
                <td>{getFeatureStatus(wallet.has_limits_protection)}</td>
              </tr>
              <tr>
                <td>MultiSig:</td>
                <td>{getFeatureStatus(wallet.has_multisig)}</td>
              </tr>
            </table>
          </Content>
        </CardBack>
      </Card>
    </Container>
  )
}

export default WalletCard
