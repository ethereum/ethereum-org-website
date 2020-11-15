import React from "react"
import styled from "styled-components"
import Emoji from "./Emoji"
import Icon from "./Icon"
import Link from "./Link"

const Container = styled(Link)`
  text-decoration: none;
  background: ${(props) => props.theme.colors.searchBackground};
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  color: ${(props) => props.theme.colors.text};
  padding: 0.75rem;
  &:hover {
    background: ${(props) => props.theme.colors.tableBackgroundHover};
  }
  &:hover svg {
    fill: ${(props) => props.theme.colors.primary};
  }
`

const StyledIcon = styled(Icon)`
  float: left;
  margin-top: 2px;
`

const Pill = styled.div`
  text-align: center;
  padding: 0 0.5rem;
`

const StarPill = styled(Pill)`
  color: ${(props) => props.theme.colors.text};
  float: right;
  font-size: ${(props) => props.theme.fontSizes.s};
`

const LanguagePill = styled(Pill)`
  color: ${(props) => props.theme.colors.black300};
  float: left;
  background: ${({ theme, language }) => {
    switch (language) {
      case "JavaScript":
        return theme.colors.tagYellow
      case "TypeScript":
        return theme.colors.tagBlue
      case "Go":
        return theme.colors.tagTurqouise
      case "Shell":
        return theme.colors.tagRed
      case "Python":
        return theme.colors.tagMint
      case "Rust":
        return theme.colors.tagOrange
      case "C#":
        return theme.colors.tagBlue
      case "Java":
        return theme.colors.tagPink
      default:
        return theme.colors.tagGray
    }
  }};
  font-size: ${(props) => props.theme.fontSizes.xs};
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  border-radius: 4px;
  margin-left: 0.75rem;
`

const GitBar = ({ gitHubUrl, gitHubRepo, className }) => {
  // Stringify with commas
  let starsString = gitHubRepo.stargazerCount.toString()
  const rgx = /(\d+)(\d{3})/
  while (rgx.test(starsString)) {
    starsString = starsString.replace(rgx, "$1" + "," + "$2")
  }
  // Populate languages array
  const languages = []
  gitHubRepo.languages.nodes[0] &&
    languages.push(gitHubRepo.languages.nodes[0].name)
  gitHubRepo.languages.nodes[1] &&
    languages.push(gitHubRepo.languages.nodes[1].name)

  return (
    <Container className={className} to={gitHubUrl} hideArrow={true}>
      <StyledIcon name="github" />
      {languages.map((language, idx) => (
        <LanguagePill key={idx} language={language}>
          {language}
        </LanguagePill>
      ))}
      <StarPill>
        <Emoji text=":star:" size={1} mr={`0.25rem`} />
        <span>{starsString}</span>
      </StarPill>
    </Container>
  )
}

export default GitBar
