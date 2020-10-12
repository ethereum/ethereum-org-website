import React from "react"
import styled from "styled-components"

// Note: to avoid width overlfow, parent element
// should have `position: relative;`
const Banner = styled.div`
  position: absolute;
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  padding: 1rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

  a {
    color: ${(props) => props.theme.colors.background} !important;
  }
`

const BannerNotification = ({ children, className }) => {
  return <Banner className={className}>{children}</Banner>
}

export default BannerNotification
