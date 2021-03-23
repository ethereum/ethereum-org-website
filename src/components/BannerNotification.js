import React from "react"
import styled from "styled-components"

const Banner = styled.div`
  display: ${(props) => (props.shouldShow ? `block` : `none`)};
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  padding: 1rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  text-align: center;

  a {
    color: ${(props) => props.theme.colors.background} !important;
  }
`

const BannerNotification = ({ children, className, shouldShow }) => (
  <Banner shouldShow={shouldShow} className={className}>
    {children}
  </Banner>
)

export default BannerNotification
