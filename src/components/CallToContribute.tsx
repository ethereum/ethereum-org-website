import React from "react"
import styled from "@emotion/styled"
import Link from "./Link"
import ButtonLink from "./ButtonLink"
import Icon from "./Icon"

import Translation from "./Translation"
import { Flex, Heading, Text } from "@chakra-ui/react"

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

export interface IProps {
  editPath: string
}

const CallToContribute: React.FC<IProps> = ({ editPath }) => (
  <Flex
    bg="ednBackground"
    alignItems="center"
    mt={8}
    borderWidth="1px"
    borderStyle="solid"
    borderColor="primary"
    borderRadius="base"
    boxShadow="inset 0 -2px 0 0 primary400"
  >
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
    <Flex
      direction="column"
      flexGrow={1}
      flexShrink={1}
      flexBasis="50%"
      p={4}
      color="text"
      textAlign={{ base: "center", lg: "left" }}
    >
      <Heading
        as="h2"
        fontFamily="monospace"
        textTransform="uppercase"
        bg="border"
        p={1}
        fontSize="2rem"
        lineHeight={1.4}
      >
        <Translation id="page-calltocontribute-title" />
      </Heading>
      <Text lineHeight="140%" color="text" fontFamily="monospace">
        <Translation id="page-calltocontribute-desc-1" />
      </Text>
      <Text lineHeight="140%" color="text" fontFamily="monospace">
        <Translation id="page-calltocontribute-desc-2" />
      </Text>
      <Text lineHeight="140%" color="text" fontFamily="monospace">
        <Translation id="page-calltocontribute-desc-3" />{" "}
        <Link to="https://www.notion.so/efdn/Writer-template-4b40d196cde7422ca6a2091de33550bd">
          <Translation id="page-calltocontribute-link" />
        </Link>
      </Text>
      <Text lineHeight="140%" color="text" fontFamily="monospace">
        <Translation id="page-calltocontribute-desc-4" />{" "}
        <Link to="https://discord.gg/CetY6Y4">
          <Translation id="page-calltocontribute-link-2" />
        </Link>{" "}
      </Text>
      <GithubButton to={editPath}>
        <GithubIcon name="github" />{" "}
        <span>
          <Translation id="page-calltocontribute-span" />
        </span>
      </GithubButton>
    </Flex>
  </Flex>
)

export default CallToContribute
