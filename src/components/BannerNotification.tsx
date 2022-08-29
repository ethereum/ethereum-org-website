import React from "react"
import styled from "@emotion/styled"

export interface IStyledBanner {
  shouldShow: boolean
}

export interface IProps {
  shouldShow?: boolean
  className?: string
}

const Banner = styled.div<IStyledBanner>`
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

const BannerNotification: React.FC<IProps> = ({
  children,
  className,
  shouldShow = false,
}) => (
  <Banner shouldShow={shouldShow} className={className}>
    {children}
  </Banner>
)

export default BannerNotification
