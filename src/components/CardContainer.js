import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

// TODO delete this file after #1206 is merged
// Use as a SharedStyledComponents
const CardContainer = ({ children }) => {
  return <Container>{children}</Container>
}

export default CardContainer
