import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { motion } from "framer-motion"

import Link from "./Link"

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.background};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  min-height: 200px;
`

const Image = styled(Img)`
  width: 100%;
  align-self: center;
  max-width: 372px;
  max-height: 257px;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-width: 311px;
  }
`

const Container = styled(motion.div)``

const Card = styled(Link)`
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07),
    0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  text-decoration: none;

  &:hover {
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const CardDiv = styled.div`
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07),
    0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  text-decoration: none;

  &:hover {
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const Content = styled.div`
  padding: 1.5rem;
  text-align: left;
  height: 100%;
`

const Title = styled.h3`
  margin-bottom: 0.75rem;
  margin-top: 1rem;
`

const Description = styled.p`
  opacity: 0.8;
  font-size: ${(props) => props.theme.fontSizes.s};
  margin-bottom: 0.5rem;
  line-height: 140%;
`

const WalletCardBack = ({ wallet, isFlipped, setIsFlipped }) => (
  <Container
    variants={flipVariants}
    animate={isFlipped ? "backShown" : "backFlipped"}
    onClick={() => setIsFlipped(!isFlipped)}
  >
    <CardDiv>
      <Content>
        <Title>Wallet Facts</Title>
        <ul>
          <li>
            bank_withdrawals:{" "}
            {wallet.has_bank_withdrawals === "TRUE" ? "✅" : "❌"}
          </li>
          <li>
            card_deposits: {wallet.has_card_deposits === "TRUE" ? "✅" : "❌"}
          </li>
          <li>
            defi_integrations:{" "}
            {wallet.has_defi_integrations === "TRUE" ? "✅" : "❌"}
          </li>
          <li>desktop: {wallet.has_desktop === "TRUE" ? "✅" : "❌"}</li>
          <li>
            dex_integrations:{" "}
            {wallet.has_dex_integrations === "TRUE" ? "✅" : "❌"}
          </li>
          <li>
            explore_dapps: {wallet.has_explore_dapps === "TRUE" ? "✅" : "❌"}
          </li>
          <li>hardware: {wallet.has_hardware === "TRUE" ? "✅" : "❌"}</li>
          <li>
            high_volume_purchases:{" "}
            {wallet.has_high_volume_purchases === "TRUE" ? "✅" : "❌"}
          </li>
          <li>
            limits_protection:{" "}
            {wallet.has_limits_protection === "TRUE" ? "✅" : "❌"}
          </li>
          <li>mobile: {wallet.has_mobile === "TRUE" ? "✅" : "❌"}</li>
          <li>multisig: {wallet.has_multisig === "TRUE" ? "✅" : "❌"}</li>
          <li>web: {wallet.has_web === "TRUE" ? "✅" : "❌"}</li>
        </ul>
      </Content>
    </CardDiv>
  </Container>
)

const flipVariants = {
  frontShown: {
    rotateY: [180, 90, 90, 0],
    // opacity: [0, 0, 1, 1],
    transition: {
      duration: 0.2,
    },
  },
  frontFlipped: {
    rotateY: [0, 90, 90, 180],
    // opacity: [1, 1, 0, 0],
    transition: {
      duration: 0.2,
    },
  },
  backShown: {
    rotateY: [-180, -90, -90, 0],
    // opacity: [0, 0, 1, 1],
    transition: {
      duration: 0.2,
    },
  },
  backFlipped: {
    rotateY: [0, -90, -90, -180],
    // opacity: [1, 1, 0, 0],
    transition: {
      duration: 0.2,
    },
  },
}

const WalletCard = ({ wallet }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  console.log({ wallet })
  return isFlipped ? (
    <WalletCardBack
      wallet={wallet}
      isFlipped={isFlipped}
      setIsFlipped={setIsFlipped}
    />
  ) : (
    <Container
      variants={flipVariants}
      animate={isFlipped ? "frontFlipped" : "frontShown"}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* <Card to={wallet.url} hideArrow={true}> */}
      <CardDiv>
        <ImageWrapper background={wallet.brand_color}>
          <Image fixed={wallet.image.childImageSharp.fixed} alt={wallet.alt} />
        </ImageWrapper>
        <Content>
          <Title>{wallet.name}</Title>
          <Description>{wallet.description}</Description>
        </Content>
      </CardDiv>
      {/* </Card> */}
    </Container>
  )
}

export default WalletCard
