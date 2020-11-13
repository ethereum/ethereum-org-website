import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import Emoji from "./Emoji"

const Container = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 4px;
  align-vertrical: center;
`

const StyledEmoji = styled(Emoji)`
  align-vertrical: center;
`

const CountSpan = styled.span`
  text-decoration: none;
  display: inline;
`

const GitStars = ({ gitAccount, gitRepo, className }) => {
  const [stars, setStars] = useState(0)

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
  }, [])

  return (
    <Container className={className}>
      <StyledEmoji text=":star:" size={1} mr={`0.25rem`} />
      <CountSpan>{stars}</CountSpan>
    </Container>
  )
}

export default GitStars
