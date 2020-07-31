import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const CardContainer = ({ children }) => {
  return <Container>{children}</Container>
}

export default CardContainer
