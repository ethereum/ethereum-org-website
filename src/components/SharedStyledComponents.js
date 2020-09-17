import styled from "styled-components"

import { Mixins } from "./Theme"
import Card from "./Card"

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 4rem auto 0;
`

export const EdnPage = styled(Page)`
  margin: 8.75rem auto 0; /* Account for subnav */
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin: 5rem auto 0;
  }
`

export const Divider = styled.div`
  margin-bottom: 4rem;
  margin-top: 4rem;
  width: 10%;
  height: 0.25rem;
  background-color: ${(props) => props.theme.colors.homeDivider};
`

export const Content = styled.div`
  padding: 1rem 2rem;
  width: 100%;
`

export const TwoColumnContent = styled(Content)`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  margin-bottom: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

export const LeftColumn = styled.div`
  flex: 0 0 50%;
  max-width: 75%;
  margin-right: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 100%;
    margin-right: 0;
  }
`

export const RightColumn = styled(LeftColumn)`
  margin-right: 0;
  flex: 0 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 3rem;
  }
`

export const Intro = styled.div`
  max-width: 608px;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-bottom: 3rem;
  }
`

export const GrayContainer = styled.div`
  width: 100%;
  padding: 4rem 0rem;
  margin-top: 2rem;
  background: ${(props) => props.theme.colors.grayBackground};
  box-shadow: inset 0px 1px 0px
    ${(props) => props.theme.colors.tableItemBoxShadow};
`

// TODO merge these w/ standard page
export const PageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 6rem;
  padding-right: 2rem;
  padding-left: 2rem;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 10rem;
  }
`

export const FakeLink = styled.div`
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`

// Avoid DOM error for nested links
export const FakeLinkExternal = styled.div`
  color: ${(props) => props.theme.colors.primary};
  &:after {
    margin-left: 0.125em;
    margin-right: 0.3em;
    display: inline;
    content: "↗";
    transition: all 0.1s ease-in-out;
    font-style: normal;
  }
  &:hover {
    &:after {
      transform: translate(0.15em, -0.2em);
    }
  }
`

export const H1 = styled.h1`
  ${Mixins.textLevel1}
`
export const H2 = styled.h2`
  ${Mixins.textLevel2}
`
export const H3 = styled.h3`
  ${Mixins.textLevel3}
`

// TODO roll out as consistent warning banner
// TODO move `background` to Theme.js as `warning` color?
export const Warning = styled.div`
  width: 100%;
  max-width: 876px;
  color: ${(props) => props.theme.colors.black300};
  padding: 16px 24px;
  background: #ffe3d3;
  border-radius: 4px;
  border: #ff7324 1px solid;
`

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
`

export const StyledCard = styled(Card)`
  margin: 1rem;
  padding: 1.5rem;
  flex: 1 0 30%;
  min-width: 280px;
  max-width: 31%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 46%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
`

export const StyledCardMaxWidth = styled(StyledCard)`
  max-width: 420px;
`

// Fake buttons

export const FakeButton = styled.div`
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25em;
  text-align: center;
  cursor: pointer;
`

export const FakeButtonPrimary = styled(FakeButton)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.buttonColor};
  border: 1px solid transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.primaryActive};
  }
`

export const FakeButtonSecondary = styled(FakeButton)`
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.text};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundActive};
  }
`
