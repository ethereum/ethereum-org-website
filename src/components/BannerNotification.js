import React from "react"
import styled from "styled-components"

const Banner = styled.div`
  display: ${(props) => (props.shouldShow ? `flex` : `none`)};
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  padding: 1rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

  a {
    color: ${(props) => props.theme.colors.background} !important;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: ${(props) => props.theme.variables.maxPageWidth};
  }
`

const BannerNotification = ({ children, className, shouldShow }) => (
  <Banner shouldShow={shouldShow} className={className}>
    {children}
  </Banner>
)

export default BannerNotification
