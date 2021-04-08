import React from "react"
import styled from "styled-components"

import Emoji from "./Emoji"
import Translation from "./Translation"

const Card = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.textTableOfContents};
  margin-top: 3rem;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1.5rem;
  padding-bottom: 0rem;
`

const Title = styled.h2`
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.04em;
  margin-left: 1.5rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textTableOfContents};
`

const TopContent = styled.div`
  display: flex;
  align-items: flex-start;
`

const SectionNav = ({ children }) => (
  <Card>
    <TopContent>
      <Emoji text=":point_right:" mb={`1em`} />
      <Title>
        <Translation id="in-this-section" />
      </Title>
    </TopContent>
    {children}
  </Card>
)

export default SectionNav
