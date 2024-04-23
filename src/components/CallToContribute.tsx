import React, { ReactNode } from "react"
import { FaGithub } from "react-icons/fa"
import { Flex, FlexProps, Icon, useToken } from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

import { ButtonLink } from "./Buttons"
import InlineLink from "./Link"
import OldHeading from "./OldHeading"
import Text from "./OldText"
import Translation from "./Translation"

export type CallToContributeProps = {
  editPath: string
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
    textAlign={{ base: "center", lg: "start" }}
    {...props}
  />
)

const DescriptionParagraph = ({ children }: ChildOnlyProp) => (
  <Text lineHeight="140%" color="text" fontFamily="monospace">
    {children}
  </Text>
)

const CallToContribute = ({ editPath }: CallToContributeProps) => {
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
      borderColor="primary.base"
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
        <OldHeading
          as="h2"
          fontFamily="monospace"
          textTransform="uppercase"
          bg="border"
          p={1}
          fontSize="2rem"
          lineHeight={1.4}
        >
          <Translation id="page-developers-docs:page-calltocontribute-title" />
        </OldHeading>
        <DescriptionParagraph>
          <Translation id="page-developers-docs:page-calltocontribute-desc-1" />
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-developers-docs:page-calltocontribute-desc-2" />
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-developers-docs:page-calltocontribute-desc-3" />{" "}
          <InlineLink to="https://www.notion.so/efdn/Writer-template-4b40d196cde7422ca6a2091de33550bd">
            <Translation id="page-developers-docs:page-calltocontribute-link" />
          </InlineLink>
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-developers-docs:page-calltocontribute-desc-4" />{" "}
          <InlineLink to="https://discord.gg/ethereum-org">
            <Translation id="page-developers-docs:page-calltocontribute-link-2" />
          </InlineLink>{" "}
        </DescriptionParagraph>
        <ButtonLink
          to={editPath}
          leftIcon={
            <Icon
              fill="background.base"
              w={6}
              h={6}
              as={FaGithub}
              name="github"
            />
          }
        >
          <Translation id="page-developers-docs:page-calltocontribute-span" />
        </ButtonLink>
      </ContentColumn>
    </Flex>
  )
}

export default CallToContribute
