import React from "react"
import styled from "styled-components"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import Icon from "../components/Icon"

import Translation from "../components/Translation"

const StyledCard = styled.div`
  display: flex;
  background: ${(props) => props.theme.colors.ednBackground};
  align-items: center;
  margin-top: 2rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  box-shadow: inset 0 -2px 0 0 ${(props) => props.theme.colors.primary400};
`

const Column = styled.div`
  flex: 1 1 50%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    text-align: center;
  }
`

const ImageColumn = styled(Column)`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const GithubButton = styled(ButtonLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.secondaryButtonBackground};
  border: 1px solid ${(props) => props.theme.colors.secondaryButtonBorder};
  &:hover {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundHover};
    color: ${(props) => props.theme.colors.secondaryButtonHoverColor};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundActive};
    color: ${(props) => props.theme.colors.secondaryButtonHoverColor};
  }
`

const GithubIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.background};
  margin-right: 0.5rem;
`

const Description = styled.p`
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  font-family: "SFMono-Regular", monospace;
`

const Title = styled.h2`
  font-family: "SFMono-Regular", monospace;
  text-transform: uppercase;
  background: ${(props) => props.theme.colors.border};
  padding: 0.25rem;
`

const CallToContribute = ({ editPath }) => (
  <StyledCard>
    <ImageColumn>
      ░░░░░░░░░▄░░░░░░░░░░░░░░▄░░░░ ░░░░░░░░▌▒█░░░░░░░░░░░▄▀▒▌░░░
      ░░░░░░░░▌▒▒█░░░░░░░░▄▀▒▒▒▐░░░ ░░░░░░░▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐░░░
      ░░░░░▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐░░░ ░░░▄▀▒▒▒░░░▒▒▒░░░▒▒▒▀██▀▒▌░░░
      ░░▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▒▒▒▒▀▄▒▒▌░░ ░░▌░░▌█▀▒▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐░░
      ░▐░░░▒▒▒▒▒▒▒▒▌██▀▒▒░░░▒▒▒▀▄▌░ ░▌░▒▄██▄▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▌░
      ▀▒▀▐▄█▄█▌▄░▀▒▒░░░░░░░░░░▒▒▒▐░ ▐▒▒▐▀▐▀▒░▄▄▒▄▒▒▒▒▒▒░▒░▒░▒▒▒▒▌
      ▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒▒▒░▒░▒░▒▒▐░ ░▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒░▒░▒░▒░▒▒▒▌░
      ░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▒▄▒▒▐░░ ░░▀▄▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▄▒▒▒▒▌░░
      ░░░░▀▄▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▒▒▄▀░░░ ░░░░░░▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▄▄▀░░░░░
      ░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▀▀░░░░░░░░
    </ImageColumn>
    <Column>
      <Title>
        <Translation id="page-calltocontribute-title" />
      </Title>
      <Description>
        <Translation id="page-calltocontribute-desc-1" />
      </Description>
      <Description>
        <Translation id="page-calltocontribute-desc-2" />
      </Description>
      <Description>
        <Translation id="page-calltocontribute-desc-3" />{" "}
        <Link to="https://www.notion.so/efdn/Writer-template-4b40d196cde7422ca6a2091de33550bd">
          <Translation id="page-calltocontribute-link" />
        </Link>
      </Description>
      <Description>
        <Translation id="page-calltocontribute-desc-4" />{" "}
        <Link to="https://discord.gg/CetY6Y4">
          <Translation id="page-calltocontribute-link-2" />
        </Link>{" "}
      </Description>
      <GithubButton to={editPath}>
        <GithubIcon name="github" />{" "}
        <span>
          <Translation id="page-calltocontribute-span" />
        </span>
      </GithubButton>
    </Column>
  </StyledCard>
)

export default CallToContribute
