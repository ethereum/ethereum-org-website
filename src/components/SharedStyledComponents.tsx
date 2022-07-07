import styled from "styled-components"
import { margin, MarginProps } from "styled-system"
import Select from "react-select"

import Card from "./Card"
import Link from "./Link"

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 0 auto;
`

export const Divider = styled.div`
  margin-bottom: 4rem;
  margin-top: 4rem;
  width: 10%;
  height: 0.25rem;
  background-color: ${(props) => props.theme.colors.homeDivider};
`

export const CenterDivider = styled.div`
  margin-bottom: 4rem;
  margin-top: 4rem;
  height: 0.25rem;
  width: 10%;
  display: flex;
  justify-content: center;
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

export const Width60 = styled.div`
  flex: 3;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
  }
`

export const Width40 = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-self: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    width: 100%;
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

export const GradientContainer = styled.div`
  width: 100%;
  padding: 4rem 0rem;
  margin-top: 2rem;
  background: ${(props) => props.theme.colors.cardGradient};
  box-shadow: inset 0px 1px 0px
    ${(props) => props.theme.colors.tableItemBoxShadow};
`

export const SloganGradient = styled.div`
  font-weight: 800;
  font-size: 3rem;
  line-height: 140%;
  max-width: 720px;
  margin-top: 1rem;
  background-clip: text;
  background-image: ${(props) => props.theme.colors.upgradesGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 2.5rem;
  }
`

export const NavLink = styled(Link)`
  text-decoration: none;
  margin-right: 2rem;
  color: ${(props) => props.theme.colors.text};
  svg {
    fill: ${(props) => props.theme.colors.text200};
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

// Avoid DOM error for nested links
export const FakeLink = styled.span`
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`

// Avoid DOM error for nested links
export const FakeLinkExternal = styled.span`
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

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
`

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 2rem;
`

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: 2rem;
  & > div {
    height: fit-content;
    margin: 0;
    &:hover {
      transition: 0.1s;
      transform: scale(1.01);
      svg {
        transition: 0.1s;
        transform: scale(1.1);
      }
    }
  }
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

// Buttons

const Button = styled.button<MarginProps>`
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25em;
  text-align: center;
  cursor: pointer;
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  ${margin}
`

export const ButtonPrimary = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.buttonColor};
  border: 1px solid transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
    box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.primaryActive};
  }
`

export const ButtonSecondary = styled(Button)`
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.text};
  background-color: transparent;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundActive};
  }
`

// MDX components

export const Paragraph = styled.p`
  font-size: 1rem;
  margin: 2rem 0 1rem;
  color: ${(props) => props.theme.colors.text300};
`

export const Header1 = styled.h1`
  font-weight: 700; // This overrides base h1 styling of 400

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 140px;
    margin-top: -140px;
    visibility: hidden;
  }

  /* Hide anchor link */
  a {
    display: none;
  }
`

export const Header2 = styled.h2`
  font-weight: 700; // This overrides base h2 styling of 600

  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }
`

export const Header3 = styled.h3`
  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }
`

export const Header4 = styled.h4`
  font-weight: 600; // This overrides base h2 styling of 400

  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: unset !important;

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }
`

export const KBD = styled.kbd`
  vertical-align: middle;
  padding: 0.15rem 0.45rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.primary};
`

export const ListItem = styled.li`
  color: ${(props) => props.theme.colors.text300};
`

// Variants (for `framer-motion`)

export const dropdownIconContainerVariant = {
  open: {
    rotate: 0,
    y: 3,
    transition: {
      duration: 0.4,
    },
  },
  closed: { rotate: -90, y: 0 },
}

// Common styled item card for languages/about

export const CardItem = styled(Link)`
  text-decoration: none;
  margin: 1rem 1rem 1rem 0;
  padding: 1rem;
  flex: 0 1 240px;
  list-style: none;
  border-radius: 2px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: ${(props) => props.theme.colors.text};

  &:hover {
    box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
    border: 1px solid ${(props) => props.theme.colors.black300};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex: 1 1 240px;
    margin: 1rem 0;
  }
`

// Common styled option buttons
export const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    width: 100%;
  }
`

export const Option = styled.button<{ isActive?: boolean }>`
  border-radius: 2rem;
  border: 1px solid
    ${(props) =>
      props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.tableBoxShadow : `none`};
  display: flex;
  color: ${(props) =>
    props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
  background-color: transparent;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`

export const OptionText = styled.span<{ fontSize?: string }>`
  font-size: ${({ fontSize = "1.5rem" }) => fontSize};
  line-height: 100%;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1rem;
    font-weight: 600;
  }
`

// https://react-select.com/styles#using-classnames
// Pass menuIsOpen={true} to component to debug
export const StyledSelect = styled(Select)`
  width: 100%;
  color: black;
  /* Component */
  .react-select__control {
    border: 1px solid ${({ theme }) => theme.colors.searchBorder};
    background: ${({ theme }) => theme.colors.searchBackground};
    /* Dropdown arrow */
    .react-select__indicator {
      color: ${({ theme }) => theme.colors.searchBorder};
    }
    &.react-select__control--is-focused {
      border-color: ${({ theme }) => theme.colors.primary} !important;
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary} !important;
      .react-select__value-container {
        border-color: ${({ theme }) => theme.colors.primary} !important;
      }
    }
  }
  .react-select__placeholder {
    color: ${({ theme }) => theme.colors.text200};
  }
  .react-select__single-value {
    color: ${({ theme }) => theme.colors.text};
  }
  .react-select__menu {
    background: ${({ theme }) => theme.colors.searchBackground};
    color: ${({ theme }) => theme.colors.text};
  }
  .react-select__input {
    color: ${({ theme }) => theme.colors.text};
  }
  .react-select__option {
    &:hover {
      background-color: ${({ theme }) => theme.colors.selectHover};
    }
    &:active {
      background-color: ${({ theme }) => theme.colors.selectActive};
      color: ${({ theme }) => theme.colors.buttonColor} !important;
    }
  }
  .react-select__option--is-focused {
    background-color: ${({ theme }) => theme.colors.selectHover};
  }
  .react-select__option--is-selected {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.buttonColor};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export const NoWrapText = styled.span`
  white-space: nowrap;
`
