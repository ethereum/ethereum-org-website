import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import Emoji from "./Emoji"
import Icon from "./Icon"
import Link from "./Link"

const Container = styled(Link)`
  background: ${(props) => props.theme.colors.searchBackground};
  border-left: 1px solid ${(props) => props.theme.colors.lightBorder};
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBorder};
  border-right: 1px solid ${(props) => props.theme.colors.lightBorder};
  color: ${(props) => props.theme.colors.text};
  text-align: left;
  display: inline-block;
  padding: 0.5rem;
  font-size: 0.75rem;
  &:hover {
    background: ${(props) => props.theme.colors.tableBackgroundHover};
  }
  &:hover svg {
    fill: ${(props) => props.theme.colors.primary};
  }
`

const StyledIcon = styled(Icon)`
  text-decoration: none;
  float: left;
  margin-top: 2px;
  padding: 0;
`

const Pill = styled.div`
  // display: flex;
  // display: inline-block;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  border-radius: 4px;
`

const StarPill = styled(Pill)`
  float: right;
`

const LanguagePill = styled(Pill)`
  float: left;
  margin-left: 0.75rem;
  background: ${({ color }) => color}; // TODO: Change to language-color
`

const StyledEmoji = styled(Emoji)`
  display: inline;
  align-items: center;
`

const CountSpan = styled.span`
  text-decoration: none;
  display: inline;
`

const languagesColors = {
  JavaScript: "#fc03",
  TypeScript: "#08d3",
  Java: "#8f83",
  Python: "#48a3",
  Shell: "#6663",
  Solidity: "#8883",
  HTML: "#a423",
  CSS: "#26f3",
  SCSS: "#f223",
  "C#": "#07a3",
  Rust: "#f553",
  Go: "#08c3",
}

const GitBar = ({ gitAccount, gitRepo, className }) => {
  const [stars, setStars] = useState(0)
  const [languages, setLanguages] = useState([])

  // TODO: Refactor api calls to use graphql
  useEffect(() => {
    const baseUrl = "https://api.github.com/repos"
    const getUrl = `${baseUrl}/${gitAccount}/${gitRepo}`

    axios
      .get(getUrl)
      .then((response) => {
        if (response.data.stargazers_count) {
          setStars(response.data.stargazers_count)
        }
      })
      .catch((error) => {
        console.error(error)
      })
    axios
      .get(`${getUrl}/languages`)
      .then((response) => {
        if (response.data) {
          const { data } = response
          const keysSorted = Object.keys(data).sort((a, b) => data[b] - data[a])
          setLanguages(keysSorted)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <Container
      className={className}
      to={`https://github.com/${gitAccount}/${gitRepo}`}
      hideArrow={true}
    >
      <StyledIcon name="github" />
      {languages.length >= 1 && (
        <LanguagePill color={languagesColors[languages[0]]}>
          {languages[0]}
        </LanguagePill>
      )}
      {languages.length >= 2 && (
        <LanguagePill color={languagesColors[languages[1]]}>
          {languages[1]}
        </LanguagePill>
      )}
      <StarPill>
        <StyledEmoji text=":star:" size={1} mr={`0.25rem`} />
        <CountSpan>{stars}</CountSpan>
      </StarPill>
    </Container>
  )
}

export default GitBar
