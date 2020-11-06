import React from "react"
import styled from "styled-components"
import Icon from "./Icon"
import Link from "./Link"
import Emoji from "./Emoji"

const Container = styled(Link)`
  text-decoration: none;
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 2rem;
  border-radius: 2px;
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.border};
  &:hover {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    border-radius: 4px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
  }
`

const TextDiv = styled.div`
  flex: 1;
  flex-direction: column;
  color: ${(props) => props.theme.colors.text};
  margin-top: 1rem;
`

const Arrow = styled(Icon)`
  margin: 0rem 1.5rem;
  align-self: center;
  min-width: 2rem;
`

const Title = styled.p`
  color: ${(props) => props.theme.colors.text300};
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
`

const Description = styled.p`
  color: ${(props) => props.theme.colors.text200};
  font-size: 14px;
  margin-bottom: 1rem;
`

const StyledCode = styled.code`
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary};
`

const StyledDesktopCode = styled(StyledCode)`
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`

const StyledMobileCode = styled(StyledCode)`
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`

const EmojiRow = styled.div`
  display: flex;
  align-items: center;
`

const mobileTo = (to) => {
  const path = to.split("/").filter((item) => item !== "")
  let pathAbbrev
  if (path[path.length - 1].startsWith("#") && path.length > 1) {
    pathAbbrev = path[path.length - 2]
  } else if (path[path.length - 1].includes("#")) {
    pathAbbrev = path[path.length - 1].split("#")[0]
  } else {
    pathAbbrev = path[path.length - 1]
  }
  return `/${pathAbbrev}/`
}

const DocLink = ({ to, title, description }) => {
  return (
    <Container to={to}>
      <TitleRow>
        <EmojiRow>
          <Emoji size={1} text=":page_with_curl:" mr={3} />
          <StyledMobileCode>{mobileTo(to)}</StyledMobileCode>
          <StyledDesktopCode>{to}</StyledDesktopCode>
        </EmojiRow>
        <TextDiv>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextDiv>
      </TitleRow>
      <Arrow
        name="arrowRight"
        color={(props) => props.theme.colors.text}
      ></Arrow>
    </Container>
  )
}

export default DocLink
