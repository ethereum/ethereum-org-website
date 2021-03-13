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
  background: ${({ background }) => background};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  min-height: 200px;
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
  font-size: ${({ theme }) => theme.fontSizes.s};
  margin-bottom: 0.5rem;
  line-height: 140%;
`

const Container = styled.div`
  /* TODO: Fix dimensions */
  height: 460px;
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
  &:hover {
    /* box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15); */
    background: ${(props) => props.theme.colors.tableBackgroundHover};
  }
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

const CardBack = styled(CardFace)``

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
      rotateY: 180,
      transition: {
        duration,
      },
    },
    backFlipped: {
      rotateY: -180,
      transition: {
        duration,
      },
    },
  }

  return (
    <Container onClick={() => setIsCardFlipped(!isCardFlipped)}>
      <Card>
        <CardFront
          wallet={wallet}
          variants={flipVariants}
          animate={isCardFlipped ? "frontFlipped" : "shown"}
        >
          <ImageWrapper background={wallet.brand_color}>
            <Image
              fixed={wallet.image.childImageSharp.fixed}
              alt={wallet.alt}
            />
          </ImageWrapper>
          <Content>
            <Title>{wallet.name}</Title>
            <Description>{wallet.description}</Description>
          </Content>
        </CardFront>
        <CardBack
          wallet={wallet}
          variants={flipVariants}
          initial={{ rotateY: -180 }}
          animate={isCardFlipped ? "shown" : "backFlipped"}
        >
          <Content>
            <Title>Wallet Facts</Title>
            <table>
              <tr>
                <td>Bank Withdrawals:</td>
                <td>{wallet.has_bank_withdrawals === "TRUE" ? "✅" : "❌"}</td>
              </tr>
              <tr>
                <td>Card Deposits:</td>
                <td>{wallet.has_card_deposits === "TRUE" ? "✅" : "❌"}</td>
              </tr>
              <tr>
                <td>DeFi Integrations:</td>
                <td>{wallet.has_defi_integrations === "TRUE" ? "✅" : "❌"}</td>
              </tr>
              {/* <tr>desktop: {wallet.has_desktop === "TRUE" ? "✅" : "❌"}</tr> */}
              <tr>
                <td>DEX Integrations:</td>
                <td>{wallet.has_dex_integrations === "TRUE" ? "✅" : "❌"}</td>
              </tr>
              <tr>
                <td>Explore Dapps:</td>
                <td>{wallet.has_explore_dapps === "TRUE" ? "✅" : "❌"}</td>
              </tr>
              {/* <tr>
                <td>Hardware:</td>
                <td>{wallet.has_hardware === "TRUE" ? "✅" : "❌"}</td>
              </tr> */}
              <tr>
                <td>High Volume Purchases:</td>
                <td>
                  {wallet.has_high_volume_purchases === "TRUE" ? "✅" : "❌"}
                </td>
              </tr>
              <tr>
                <td>Limits Protection:</td>
                <td>{wallet.has_limits_protection === "TRUE" ? "✅" : "❌"}</td>
              </tr>
              {/* <tr>mobile: {wallet.has_mobile === "TRUE" ? "✅" : "❌"}</tr> */}
              <tr>
                <td>MultiSig:</td>
                <td>{wallet.has_multisig === "TRUE" ? "✅" : "❌"}</td>
              </tr>
              {/* <tr>web: {wallet.has_web === "TRUE" ? "✅" : "❌"}</tr> */}
            </table>
          </Content>
        </CardBack>
      </Card>
    </Container>
  )
  //     {/* <Card to={wallet.url} hideArrow={true}> */}
  //     <CardDiv>
  //       <ImageWrapper background={wallet.brand_color}>
  //         <Image fixed={wallet.image.childImageSharp.fixed} alt={wallet.alt} />
  //       </ImageWrapper>
  //       <Content>
  //         <Title>{wallet.name}</Title>
  //         <Description>{wallet.description}</Description>
  //       </Content>
  //     </CardDiv>
  //     {/* </Card> */}
  // )
}

export default WalletCard
