import React from "react"
import styled from "styled-components"
import Emoji from "./Emoji"
import Card from "./Card"
import ButtonLink from "./ButtonLink"
import Icon from "./Icon"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Pill from "./Pill"

const StyledCard = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? `column-reverse` : `column`)};
  justify-content: space-between;
  background: ${(props) => props.theme.colors.background};
  border-radius: 4px;
  border: ${(props) =>
    props.isMobile
      ? `0px`
      : `1px solid ${(props) => props.theme.colors.lightBorder}`};
  width: ${(props) => (props.isMobile ? `100%` : `320px`)};
`

const Avatar = styled.div`
  border-radius: 64px;
  height: 32px;
  width: 32px;
  background: ${(props) => props.theme.colors.searchBorder};
  border: 0.5px solid ${(props) => props.theme.colors.primary};
  margin-left: -1rem;
`

const Content = styled.p`
  margin-bottom: 0;
`

const FirstAvatar = styled.div`
  border-radius: 64px;
  height: 32px;
  width: 32px;
  background: ${(props) => props.theme.colors.searchBorder};
  border: 0.5px solid ${(props) => props.theme.colors.primary};
`

const AvatarContainer = styled.div`
  display: flex;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`

const StyledRow = styled.div`
  display: flex;
  align-items: center;
`

const Description = styled.p`
  opacity: 0.8;
  margin-left: 1rem;
  margin-bottom: 0;
`

const DiscordDescription = styled.p`
  opacity: 0.8;
  margin-left: 0.25rem;
  margin-bottom: 0;
`

const TopContent = styled.div`
  margin: ${(props) => (props.isMobile ? `0rem` : `1rem`)};
  margin-bottom: 1.5rem;
`

const Online = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 64px;
  background: ${(props) => props.theme.colors.success400};
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.buttonColor};
  margin-left: 0.5rem;
`

const StyledButtonLink = styled(ButtonLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  margin-left: ${(props) => (props.isMobile ? `0rem` : `1rem`)};
  margin-right: ${(props) => (props.isMobile ? `0rem` : `1rem`)};
`

const DiscordStats = styled.div`
  background: ${(props) => props.theme.colors.ednBackground};
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${(props) => (props.isMobile ? `8px` : `3px 3px 0px 0px`)};
`

const StyledPill = styled(Pill)`
  background: ${(props) => props.theme.colors.beta};
  display: flex;
  color: ${(props) => props.theme.colors.text};
`

const StyledEmoji = styled(Emoji)`
  margin-left: 0.25rem;
`

const TitleRow = styled(Row)`
  align-items: flex-start;
  margin-bottom: 1rem;
`

const Help = ({ data, className, isMobile }) => {
  return (
    <StyledCard className={className} isMobile={isMobile}>
      <>
        <DiscordStats>
          <AvatarContainer>
            <FirstAvatar />
            <Avatar />
            <Avatar />
            <Avatar />
            <Avatar />
          </AvatarContainer>
          <StyledRow>
            <Online />
            <DiscordDescription>
              <strong>34</strong> mentors online
            </DiscordDescription>
          </StyledRow>
        </DiscordStats>
      </>
      <div>
        <TopContent isMobile={isMobile}>
          <TitleRow>
            <Content>
              <strong>Need some help?</strong> Join the Enter Ethereum discord
              for support.{" "}
            </Content>
            {!isMobile && (
              <StyledPill>
                NEW <StyledEmoji size={2} text=":sparkles:" />
              </StyledPill>
            )}
          </TitleRow>
          <Row>
            <Emoji size={2} text=":earth_globe_asia-australia:" />
            <Description>Multi-lingual support</Description>
          </Row>
          <Row>
            <Emoji size={2} text=":mage:" />
            <Description>Experts in every topic</Description>
          </Row>
          <Row>
            <Emoji size={2} text=":rainbow:" />
            <Description>Friendly vibes</Description>
          </Row>
        </TopContent>
        <StyledButtonLink isMobile={isMobile} to="#">
          Enter Ethereum <StyledIcon size={20} name="discord" />
        </StyledButtonLink>
      </div>
    </StyledCard>
  )
}

export default Help

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fixed(width: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
