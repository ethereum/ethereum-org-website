import React, { useState } from "react"
import ButtonLink from "./ButtonLink"
import Link from "./Link"
import Emoji from "./Emoji"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    margin: 4rem 0rem;
    height: 640px;
    border-radius: 2px;
    /* border: 1px solid ${(props) => props.theme.colors.text}; */
    @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    height: auto;
  }
`

const ExpandedCard = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.primary300};
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 50%;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 1.5rem;
  padding-top: 0.5rem;
  &:hover {
    background: ${(props) => props.theme.colors.ednBackground};
    transition: transform 0.5s;
    transform: skewX(-5deg);
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: row;
    padding-top: 2rem;
  }
`

const Column = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    /* border: 1px solid ${(props) => props.theme.colors.text}; */
`

const Title = styled.h3`
  font-size: 40px;
  font-weight: 400;
  margin-top: 0.75rem;
`

const ActiveTitle = styled.h3`
  font-size: 40px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.black300};
`

const Body = styled.p`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.black300};
`

const DappsFeatures = (
  {
    /* children, contentPreview, title */
  }
) => {
  /* const [isVisible, setIsVisible] = useState(false) */
  const [isNoOwners, setIsNoOwners] = useState(true)
  const [isCensorshipProof, setIsCensorshipProof] = useState(false)
  const [isLikeLegos, setIsLikeLegos] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isPayments, setIsPayments] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isDownTime, setIsDownTime] = useState(false)
  return (
    <div>
      {isNoOwners && (
        <Container isActive={isNoOwners}>
          <ExpandedCard>
            <Body>
              Some dapps even launch a token to users that allows them to vote
              in the dapp’s strategy.
            </Body>
            <Body>
              Once published, dapp code can’t be taken down. And anyone can use
              the dapp’s features.
            </Body>
            <ActiveTitle>No owners</ActiveTitle>
            <Emoji size="6" text=":bust_in_silhouette:" />
          </ExpandedCard>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(true),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Censorship proof</Title>
              <Emoji size="6" text=":shield:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(true),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Built-in payments</Title>
              <Emoji size="6" text=":money-mouth_face:" />
            </Box>
          </Column>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(true),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Like legos</Title>
              <Emoji size="6" text=":brick:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(true),
                setIsDownTime(false),
              ]}
            >
              <Title>Global login</Title>
              <Emoji size="6" text=":key:" />
            </Box>
          </Column>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(true),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Open and transparent</Title>
              <Emoji size="6" text=":window:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(true),
              ]}
            >
              <Title>No down time</Title>
              <Emoji size="6" text=":antenna_with_bars:" />
            </Box>
          </Column>
        </Container>
      )}
      {isCensorshipProof && (
        <Container isActive={isCensorshipProof}>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(true),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>No owners</Title>
              <Emoji size="6" text=":bust_in_silhouette:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(true),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Built-in payments</Title>
              <Emoji size="6" text=":money-mouth_face:" />
            </Box>
          </Column>
          <Column>
            <ExpandedCard>
              <Body>
                Some dapps even launch a token to users that allows them to vote
                in the dapp’s strategy.
              </Body>
              <Body>
                Once published, dapp code can’t be taken down. And anyone can
                use the dapp’s features.
              </Body>
              <ActiveTitle>Censorship proof</ActiveTitle>
              <Emoji size="6" text=":bust_in_silhouette:" />
            </ExpandedCard>
          </Column>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(true),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Like legos</Title>
              <Emoji size="6" text=":brick:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(true),
                setIsDownTime(false),
              ]}
            >
              <Title>Global login</Title>
              <Emoji size="6" text=":key:" />
            </Box>
          </Column>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(true),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Open and transparent</Title>
              <Emoji size="6" text=":window:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(true),
              ]}
            >
              <Title>No down time</Title>
              <Emoji size="6" text=":antenna_with_bars:" />
            </Box>
          </Column>
        </Container>
      )}
      {isLikeLegos && (
        <Container isActive={isLikeLegos}>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(true),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>No owners</Title>
              <Emoji size="6" text=":bust_in_silhouette:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(true),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Built-in payments</Title>
              <Emoji size="6" text=":money-mouth_face:" />
            </Box>
          </Column>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(true),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Censorship proof</Title>
              <Emoji size="6" text=":shield:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(true),
                setIsDownTime(false),
              ]}
            >
              <Title>Global login</Title>
              <Emoji size="6" text=":key:" />
            </Box>
          </Column>
          <Column>
            <ExpandedCard>
              <Body>
                Some dapps even launch a token to users that allows them to vote
                in the dapp’s strategy.
              </Body>
              <Body>
                Once published, dapp code can’t be taken down. And anyone can
                use the dapp’s features.
              </Body>
              <ActiveTitle>Like legos</ActiveTitle>
              <Emoji size="6" text=":brick:" />
            </ExpandedCard>
          </Column>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(true),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Open and transparent</Title>
              <Emoji size="6" text=":window:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(true),
              ]}
            >
              <Title>No down time</Title>
              <Emoji size="6" text=":antenna_with_bars:" />
            </Box>
          </Column>
        </Container>
      )}
      {isLogin && (
        <Container isActive={isLogin}>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(true),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>No owners</Title>
              <Emoji size="6" text=":bust_in_silhouette:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(true),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Built-in payments</Title>
              <Emoji size="6" text=":money-mouth_face:" />
            </Box>
          </Column>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(true),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Censorship proof</Title>
              <Emoji size="6" text=":shield:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(true),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Like legos</Title>
              <Emoji size="6" text=":brick:" />
            </Box>
          </Column>
          <Column>
            <ExpandedCard>
              <Body>
                Some dapps even launch a token to users that allows them to vote
                in the dapp’s strategy.
              </Body>
              <Body>
                Once published, dapp code can’t be taken down. And anyone can
                use the dapp’s features.
              </Body>
              <ActiveTitle>Global login</ActiveTitle>
              <Emoji size="6" text=":key:" />
            </ExpandedCard>
          </Column>
          <Column>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(true),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(false),
              ]}
            >
              <Title>Open and transparent</Title>
              <Emoji size="6" text=":window:" />
            </Box>
            <Box
              onClick={() => [
                setIsNoOwners(false),
                setIsCensorshipProof(false),
                setIsLikeLegos(false),
                setIsOpen(false),
                setIsPayments(false),
                setIsLogin(false),
                setIsDownTime(true),
              ]}
            >
              <Title>No down time</Title>
              <Emoji size="6" text=":antenna_with_bars:" />
            </Box>
          </Column>
        </Container>
      )}
    </div>
  )
}

export default DappsFeatures
