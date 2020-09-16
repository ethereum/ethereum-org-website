import React from "react"
import styled from "styled-components"
import Link from "../components/Link"
import Button from "../components/Button"
import Icon from "../components/Icon"

const StyledCard = styled.div`
  display: flex;
  background: ${(props) => props.theme.colors.ednBackground};
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  box-shadow: inset 0 -2px 0 0 ${(props) => props.theme.colors.primary400};

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    margin-bottom: 1rem;
    margin: 4rem 0rem;
  }
`

const LeftContent = styled.div`
  flex: 1 0 50%;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.text};
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
`

const RightContent = styled.div`
  flex: 1 0 50%;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    margin-bottom: 1rem;
    width: 100%;
  }
`

const GithubButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.secondaryButtonColor};
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
  fill: ${(props) => props.theme.colors.text};
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

// TODO fix style - content bleeds over border
const CallToContribute = () => {
  return (
    <StyledCard>
      <LeftContent>
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
      </LeftContent>
      <RightContent>
        <Title>Help us with this page</Title>
        <Description>
          If you’re an expert on the topic and want to contribute, edit this
          page and sprinkle it with your wisdom.
        </Description>
        <Description>
          You'll be credited and you'll be helping the Ethereum community!
        </Description>
        <Description>
          Use this flexible{" "}
          <Link to="https://www.notion.so/efdn/Writer-template-4b40d196cde7422ca6a2091de33550bd">
            documentation template
          </Link>
        </Description>
        <Description>
          Questions? Ask us in the #content channel on our{" "}
          <Link to="https://discord.gg/CetY6Y4">Discord server</Link>{" "}
        </Description>
        <GithubButton to="https://github.com">
          <GithubIcon name="github" /> <span>Edit page</span>
        </GithubButton>
      </RightContent>
    </StyledCard>
  )
}

export default CallToContribute
