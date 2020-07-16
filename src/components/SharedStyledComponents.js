import styled from "styled-components"
import { Mixins } from "./Theme"

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

// Orange warning banner
// TODO roll out as consistent warning banner
/* TODO move `background` to Theme.js as `warning` color? */
export const Warning = styled.p`
  width: 100%;
  max-width: 876px;
  color: ${(props) => props.theme.colors.black300};
  margin-top: 4rem;
  margin-bottom: 0;
  padding: 16px 24px;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    #ff7324;
  border-radius: 2px;
  border: #ff7324 1px solid;
`
