import React from "react"
import styled from "styled-components"
import Emoji from "./Emoji"
import { margin } from "styled-system"

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Banner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-radius: 2px;
  max-width: ${(props) => (props.shouldCenter ? `55rem` : `100%`)};
  color: ${(props) => props.theme.colors.black300};
  background: ${(props) =>
    props.isWarning
      ? props.theme.colors.warning
      : props.theme.colors.infoBanner};

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
  }

  a {
    color: ${(props) =>
      props.isWarning
        ? props.theme.colors.warningLink
        : props.theme.colors.infoLink};
    &:hover {
      color: ${(props) =>
        props.isWarning
          ? props.theme.colors.warningLinkHover
          : props.theme.colors.infoLinkHover};
    }
  }
  ${margin}
`

const StyledEmoji = styled(Emoji)`
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    align-self: flex-start;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`

const Content = styled.div`
  display: ${(props) => (props.shouldSpaceBetween ? `flex` : `block`)};
  align-items: ${(props) => (props.shouldSpaceBetween ? `center` : `auto`)};
  width: ${(props) => (props.shouldSpaceBetween ? `100%` : `auto`)};
  justify-content: ${(props) =>
    props.shouldSpaceBetween ? `space-between` : `auto`};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: block;
  }
`

const InfoBanner = ({
  children,
  className,
  emoji,
  isWarning = false,
  shouldCenter = false,
  shouldSpaceBetween = false,
  ...props
}) => {
  const banner = (
    <Banner
      className={className}
      isWarning={isWarning}
      shouldCenter={shouldCenter}
      {...props}
    >
      {emoji && <StyledEmoji text={emoji} size={2} />}
      <Content shouldSpaceBetween={shouldSpaceBetween}>{children}</Content>
    </Banner>
  )
  return shouldCenter ? <Container>{banner}</Container> : banner
}

export default InfoBanner
