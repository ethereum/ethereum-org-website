import React from "react"
import styled from "styled-components"
import Icon from "./Icon"
import Link from "./Link"

const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  // margin: 1rem 0;
  // justify-content: space-between;
  max-width: 100%;
  min-width: 300px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  border-radius: 4px;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  &:hover {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
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
  // width: 9rem;
  border: 1px solid black;
  border-radius: 4px;
  margin-right: 1rem;
  background: ${(props) => props.theme.colors.dropdownBackground};
  color: ${(props) => props.theme.colors.text};
  &:after {
    color: ${(props) => props.theme.colors.text};
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    &:after {
      color: ${(props) => props.theme.colors.primary};
    }
    background: ${(props) => props.theme.colors.searchResultBackground};
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
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1.25rem;
    font-weight: 400;
  }
`

const Description = styled.p`
  margin: 1rem 0 0 0;
  color: ${(props) => props.theme.colors.text300};
`

const socialPlatforms = {
  discord: {
    key: `discord`,
    title: `Discord`,
    color: `rgba(10, 80, 150, 1)`,
  },
  gitter: {
    key: `gitter`,
    title: `Gitter`,
    color: `rgba(20, 60, 50, 1)`,
  },
  reddit: {
    key: `reddit`,
    title: `Reddit`,
    color: `rgba(250, 80, 150, 1)`,
  },
  stackExchange: {
    key: `stackExchange`,
    title: `Stack Exchange`,
    color: `rgba(50, 280, 150, 1)`,
  },
  twitter: {
    key: `twitter`,
    title: `Twitter`,
    color: `rgba(70, 70, 250, 1)`,
  },
  github: {
    key: `github`,
    title: `GitHub`,
    color: `rgba(40, 40, 40, 1)`,
  },
  youtube: {
    key: `youtube`,
    title: `YouTube`,
    color: `rgba(250, 0, 0, 1)`,
  },
}

const ForumCard = ({ platform, name, description, to }) => {
  return (
    <Container>
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
