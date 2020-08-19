import React from "react"
import styled from "styled-components"

const Mixin = {
  pill: `
    display: inline-block;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 0.25rem;
    text-align: center;
  `,
}

const StyledPill = styled.div`
  text-decoration: none;
  ${Mixin.pill}
`

const PillMessage = styled.p`
  padding: 0rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.black300};
  margin-bottom: 0rem;
  margin-left: 0.5rem;
`

const PillContent = styled.div`
  display: flex;
`

const Done = styled(StyledPill)`
  background-color: ${(props) => props.theme.colors.success100};
  border: 1px solid ${(props) => props.theme.colors.success300};
`

const InProgress = styled(StyledPill)`
  background-color: #ffe3d3;
  border: 1px solid #ff7324;
`
const Todo = styled(StyledPill)`
  background-color: ${(props) => props.theme.colors.fail100};
  border: 1px solid ${(props) => props.theme.colors.fail300};
`

// TODO rename to ButtonLink?
const Pill = ({ isTodo, isInProgress, message, isDone, children }) => {
  if (isTodo) {
    return (
      <Todo>
        <PillContent>
          {children}
          <PillMessage>{message}</PillMessage>
        </PillContent>
      </Todo>
    )
  }
  if (isInProgress) {
    return (
      <InProgress>
        <PillContent>
          {children}
          <PillMessage>{message}</PillMessage>
        </PillContent>
      </InProgress>
    )
  }
  if (isDone) {
    return (
      <Done>
        <PillContent>
          {children}
          <PillMessage>{message}</PillMessage>
        </PillContent>
      </Done>
    )
  }
}

export default Pill
