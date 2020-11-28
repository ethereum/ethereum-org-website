import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  display: inline-flex;
  user-select: none;
  cursor: pointer;
`

const Content = styled.div`
  text-align: center;
  width: 200px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  position: absolute;
  z-index: 10;
  padding: 1rem 0.5rem;
  text-transform: none;
  font-size: ${(props) => props.theme.fontSizes.s};
  font-weight: 500;
  cursor: default;
  border-radius: 4px;
  bottom: calc(100% + 1rem);
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 140px;
  }
`

const Arrow = styled.span`
  position: absolute;
  bottom: -0.5rem;
  left: calc(50% - 6px);
  border-right: 10px solid transparent;
  border-top: 10px solid ${(props) => props.theme.colors.background};
  border-left: 10px solid transparent;
`

// TODO add `position` prop
const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  // TODO add hover effects
  // onMouseLeave={() => setIsVisible(false)}
  // onMouseEnter={() => setIsVisible(true)}
  return (
    <Container onClick={() => setIsVisible(!isVisible)}>
      {children}
      {isVisible && (
        <Content>
          <Arrow />
          {content}
        </Content>
      )}
    </Container>
  )
}

export default Tooltip
