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
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  padding: 0 0.5rem;
`

const StarPill = styled(Pill)`
  float: right;
  font-size: ${(props) => props.theme.fontSizes.s};
`

const LanguagePill = styled(Pill)`
  float: left;
  background: ${({ color }) => color};
  font-size: ${(props) => props.theme.fontSizes.xs};
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  border-radius: 4px;
  margin-left: 0.75rem;
`

const languagesColors = {
  JavaScript: "#fc05",
  TypeScript: "#08d5",
  Java: "#8f85",
  Python: "#48a5",
  Shell: "#6665",
  Solidity: "#8885",
  HTML: "#a425",
  CSS: "#26f5",
  SCSS: "#f225",
  "C#": "#07a5",
  Rust: "#f555",
  Go: "#08c5",
}

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
        <Emoji text=":star:" size={1} mr={`0.25rem`} />
        <span>{starsString}</span>
      </StarPill>
    </Container>
  )
}

export default GitBar
