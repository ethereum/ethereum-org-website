import React from "react"
import styled from "styled-components"
import Emoji from "./Emoji"
import Icon from "./Icon"
import Link from "./Link"

const Container = styled(Link)`
  float: right;
  display: flex;
  text-decoration: none;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  color: ${(props) => props.theme.colors.text};
  &:hover {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
  }
  &:hover path {
    fill: ${(props) => props.theme.colors.primary};
  }
  background: ${(props) => props.theme.colors.lightBorder};
`

const Pill = styled.div`
  text-align: center;
`

const StyledIcon = styled(Icon)`
  margin: 0.25rem;
`

const GlyphPill = styled(Pill)`
  display: flex;
  align-items: center;
  width: 36px;
  justify-content: space-between;
  margin: 0 0.325rem;
  path {
    fill: ${(props) => props.theme.colors.text};
  }
  float: left;
  font-size: ${(props) => props.theme.fontSizes.s};
`

const Text = styled.div`
  padding: 0 0.325rem;
  font-size: 0.8125rem;
  background: ${(props) => props.theme.colors.searchBackgroundEmpty};
`

const GitStars = ({ gitHubRepo, className, hideStars }) => {
  // Stringify with commas
  let starsString = gitHubRepo.stargazerCount.toString()
  const rgx = /(\d+)(\d{3})/
  while (rgx.test(starsString)) {
    starsString = starsString.replace(rgx, "$1,$2")
  }
  if (hideStars) {
    return (
      <Container className={className} to={gitHubRepo.url} hideArrow={true}>
        <StyledIcon name="github" size="16px" />
      </Container>
    )
  }
  return (
    <Container className={className} to={gitHubRepo.url} hideArrow={true}>
      <GlyphPill>
        <Icon name="github" size="16px" />
        <Emoji text=":star:" size={1} />
      </GlyphPill>
      <Text>{starsString}</Text>
    </Container>
  )
}

export default GitStars
