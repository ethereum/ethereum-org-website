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
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.colors.tableBoxShadow};
  position: absolute;
  z-index: 10;
  padding: 1rem 0.5rem;
  text-transform: none;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: 500;
  cursor: default;
  border-radius: 4px;
  bottom: calc(100% + 1rem);
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 140px;
  }
`

const Arrow = styled.span`
  position: absolute;
  bottom: -0.5rem;
  left: calc(50% - 6px);
  border-right: 10px solid transparent;
  border-top: 10px solid ${({ theme }) => theme.colors.background};
  border-left: 10px solid transparent;
`

// Invisible full screen div "below" the clickable link
// Added so clicking away anywhere will hide Tooltip
const ModalReturn = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

// TODO add `position` prop
const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  // TODO add hover effects
  // onMouseLeave={() => setIsVisible(false)}
  // onMouseEnter={() => setIsVisible(true)}
  return (
    <>
      {isVisible && <ModalReturn onClick={() => setIsVisible(false)} />}
      <Container onClick={() => setIsVisible(!isVisible)}>
        {children}
        {isVisible && (
          <Content>
            <Arrow />
            {content}
          </Content>
        )}
      </Container>
    </>
  )
}

export default Tooltip
