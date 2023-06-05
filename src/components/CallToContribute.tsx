import {
  Flex,
  FlexProps,
  Heading,
  Icon,
  Text,
  useToken,
} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"
import React, { ReactNode } from "react"
import Link from "./Link"
import ButtonLink from "./ButtonLink"

import Translation from "./Translation"

export interface IProps {
  editPath: string
}

export type ChildOnlyType = {
  children: ReactNode
}

const ContentColumn = (props: {
  children: ReactNode
  hideBelow?: FlexProps["hideBelow"]
}) => (
  <Flex
    direction="column"
    flexGrow={1}
    flexShrink={1}
    flexBasis="50%"
    p={4}
    color="text"
    textAlign={{ base: "center", lg: "left" }}
    {...props}
  />
)

const DescriptionParagraph = ({ children }: ChildOnlyType) => (
  <Text lineHeight="140%" color="text" fontFamily="monospace">
    {children}
  </Text>
)

const CallToContribute: React.FC<IProps> = ({ editPath }) => {
  /**
   * TODO: After completion of the UI migration,
   * Remove this and pass the token value directly
   * into the `hideBelow` prop
   */
  const largeBp = useToken("breakpoints", "lg")

  return (
    <Flex
      as="aside"
      bg="ednBackground"
      align="center"
      mt={8}
      border="1px"
      borderColor="primary"
      borderRadius="base"
      boxShadow="inset 0 -2px 0 0 var(--eth-colors-primary400)"
    >
      <ContentColumn hideBelow={largeBp}>
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
      </ContentColumn>
      <ContentColumn>
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
        <DescriptionParagraph>
          <Translation id="page-calltocontribute-desc-1" />
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-calltocontribute-desc-2" />
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-calltocontribute-desc-3" />{" "}
          <Link to="https://www.notion.so/efdn/Writer-template-4b40d196cde7422ca6a2091de33550bd">
            <Translation id="page-calltocontribute-link" />
          </Link>
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-calltocontribute-desc-4" />{" "}
          <Link to="https://discord.gg/CetY6Y4">
            <Translation id="page-calltocontribute-link-2" />
          </Link>{" "}
        </DescriptionParagraph>
        <ButtonLink
          to={editPath}
          leftIcon={
            <Icon fill="background" w={6} h={6} as={FaGithub} name="github" />
          }
        >
          <Translation id="page-calltocontribute-span" />
        </ButtonLink>
      </ContentColumn>
    </Flex>
  )
}

export default CallToContribute
