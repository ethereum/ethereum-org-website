import React from "react"
import styled from "styled-components"

const StyledPill = styled.div`
  display: flex;
  background: ${(props) => props.theme.colors.primary100};
  text-transform: uppercase;
  text-align: center;
  color: ${(props) => props.theme.colors.black300};
  margin-bottom: 0rem;
  margin-right: 0.5rem;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  text-align: center;
`

const Pill = ({ children }) => {
  return <StyledPill>{children}</StyledPill>
}

export default Pill
