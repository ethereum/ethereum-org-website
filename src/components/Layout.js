import React from "react"
import styled from "styled-components"

import "./layout.css"

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Layout = ({ children }) => {
  return <Container>{children}</Container>
}

export default Layout
