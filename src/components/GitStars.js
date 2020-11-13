import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"

import Icon from "./Icon"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background: ${(props) => props.theme.colors.ednBackground};
  color: ${(props) => props.theme.colors.text200};
  max-width: 4rem;
`

const StarDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0.5rem;
`

const StarIcon = styled(Icon)`
  width: 1rem;
`

const CountDiv = styled.div`
  align-items: center;
`

const Count = styled.span`
  font-size: 14px;
`

const GitStars = ({ gitAccount, gitRepo }) => {
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
    <Container>
      <StarDiv>
        <StarIcon name="star" />
      </StarDiv>
      <CountDiv>
        <Count>{stars}</Count>
      </CountDiv>
    </Container>
  )
}

export default GitStars
