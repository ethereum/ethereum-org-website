import React from "react"
import styled from "styled-components"
import { mix } from "polished"
import Icon from "./Icon"
import Link from "./Link"

const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 100%;
  min-width: 300px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  border-radius: 4px;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.02);
  }
  background: ${({ theme, platform }) => {
    if (platform && socialPlatforms[platform]) {
      return `linear-gradient(90deg, ${
        socialPlatforms[platform].color
      } 25%, ${mix(0.5, socialPlatforms[platform].color, "#FFFFFF80")} 100%)`
    }
    return `linear-gradient(90deg, ${theme.colors.ednBackground} 0%, ${mix(
      0.5,
      theme.colors.ednBackground,
      "#FFFFFF80"
    )} 100%)`
  }};

    socialPlatforms[platform].color};
`

const Row = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
  }
  justify-content: flex-start;
  align-items: center;
`

const Pill = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  float: left;
  align-items: center;
  height: 3rem;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  border-radius: 4px;
  margin-right: 1rem;
  background: ${(props) => props.theme.colors.dropdownBorder};
  color: ${(props) => props.theme.colors.text};
  &:after {
    color: ${(props) => props.theme.colors.text};
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    &:after {
      color: ${(props) => props.theme.colors.primary};
    }
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.dropdownBorder};
  }
  &:hover path {
    fill: ${(props) => props.theme.colors.primary};
  }
  path {
    fill: ${(props) => props.theme.colors.text};
  }
`

const PlatformName = styled.span`
  margin: 0 1rem;
  font-weight: 500;
  line-height: 1rem;
  text-align: center;
`

const PlatformIcon = styled(Icon)`
  margin-left: 0.5rem;
`

const Name = styled.span`
  font-style: normal;
  font-weight: normal;
  font-weight: 300;
  font-size: 2rem;
  line-height: 110%;
  padding: 0.25rem;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    font-size: 1.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1.25rem;
    font-weight: 400;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-top: 1rem;
    text-align: center;
  }
`

const Description = styled.p`
  margin: 1rem 0 0 0;
  color: ${(props) => props.theme.colors.text300};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    text-align: center;
  }
`

const socialPlatforms = {
  discord: {
    title: `Discord`,
    color: `#7689D4A0`,
  },
  gitter: {
    title: `Gitter`,
    color: `#6C3F84A0`,
  },
  reddit: {
    title: `Reddit`,
    color: `#E85428A0`,
  },
  stackExchange: {
    title: `Stack Exchange`,
    color: `#5379B2A0`,
  },
  twitter: {
    title: `Hive.one Leaderboards`,
    color: `#51A0EBA0`,
  },
  github: {
    title: `GitHub`,
    color: `#2C3136A0`,
  },
  youtube: {
    title: `YouTube`,
    color: `#E73223A0`,
  },
}

const ForumCard = ({ platform, name, description, to }) => {
  return (
    <Container platform={platform}>
      <Row>
        <Pill to={to} hideArrow={true}>
          <PlatformIcon name={platform ? platform : "language"} />
          <PlatformName>
            {socialPlatforms[platform]
              ? socialPlatforms[platform].title
              : "Visit"}
          </PlatformName>
        </Pill>
        <Name>{name}</Name>
      </Row>
      <Row>
        <Description>{description}</Description>
      </Row>
    </Container>
  )
}

export default ForumCard
