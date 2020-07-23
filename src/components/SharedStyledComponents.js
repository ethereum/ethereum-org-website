import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import { Mixins } from "./Theme"

export const InfoBanner = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 1px solid #a4a4f3; /* TODO add color to theme */
  background-color: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  margin: 2rem 2rem 0;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 876px;
    margin: 2rem auto 0;
  }
`

export const InfoCopy = styled.p`
  margin-bottom: 0px;
  color: ${(props) => props.theme.colors.text};
`

export const InfoEmoji = styled(Twemoji)`
  margin-right: 1rem;
  & > img {
    width: 1.5em !important;
    height: 1.5em !important;
    min-width: 24px;
    min-height: 24px;
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

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 4rem auto 0;
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

// Avoid DOM error for nested links
export const FakeLink = styled.div`
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
