import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
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

const GitBar = ({ gitAccount, gitRepo, className }) => {
  // DEV Static dummy data
  const [stars, setStars] = useState(12345)
  const [languages, setLanguages] = useState(["TypeScript", "JavaScript"])

  // TODO: Refactor api calls to use graphql
  // const [stars, setStars] = useState(0)
  // const [languages, setLanguages] = useState([])

  // useEffect(() => {
  //   const baseUrl = "https://api.github.com/repos"
  //   const getUrl = `${baseUrl}/${gitAccount}/${gitRepo}`

  //   axios
  //     .get(getUrl)
  //     .then((response) => {
  //       if (response.data.stargazers_count) {
  //         setStars(response.data.stargazers_count)
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  //   axios
  //     .get(`${getUrl}/languages`)
  //     .then((response) => {
  //       if (response.data) {
  //         const { data } = response
  //         const keysSorted = Object.keys(data).sort((a, b) => data[b] - data[a])
  //         setLanguages(keysSorted)
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }, [])

  // Stringify with commas
  let starsString = stars.toString()
  const rgx = /(\d+)(\d{3})/
  while (rgx.test(starsString)) {
    starsString = starsString.replace(rgx, "$1" + "," + "$2")
  }

  return (
    <Container
      className={className}
      to={`https://github.com/${gitAccount}/${gitRepo}`}
      hideArrow={true}
    >
      <StyledIcon name="github" />
      {languages.length >= 1 && (
        <LanguagePill language={languages[0]}>{languages[0]}</LanguagePill>
      )}
      {languages.length >= 2 && (
        <LanguagePill language={languages[1]}>{languages[1]}</LanguagePill>
      )}
      <StarPill>
        <Emoji text=":star:" size={1} mr={`0.25rem`} />
        <span>{starsString}</span>
      </StarPill>
    </Container>
  )
}

export default GitBar
